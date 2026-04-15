import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

dotenv.config();

const BLUESMINDS_BASE = process.env.BLUESMINDS_BASE || 'https://api.bluesminds.com/v1';
const BLUESMINDS_API_KEY = process.env.BLUESMINDS_API_KEY || '';
const APP_ACCESS_CODE = process.env.APP_ACCESS_CODE || 'ClawSentinel123!';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-claw-key';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_DEFAULT_CHAT_ID = process.env.TELEGRAM_DEFAULT_CHAT_ID || '';

// --- Lightweight Persistence ---
const DB_FILE = path.join(process.cwd(), 'db.json');
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return { telegramChatId: TELEGRAM_DEFAULT_CHAT_ID, alerts: [], cooldowns: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (e) {
    return { telegramChatId: TELEGRAM_DEFAULT_CHAT_ID, alerts: [], cooldowns: {} };
  }
}
function writeDB(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- Telegram Bot Setup ---
let bot: TelegramBot | null = null;
if (TELEGRAM_BOT_TOKEN) {
  bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  bot.onText(/\/start clawsentinel/, (msg) => {
    const chatId = msg.chat.id;
    const db = readDB();
    db.telegramChatId = chatId.toString();
    writeDB(db);
    bot?.sendMessage(chatId, 'Welcome to ClawSentinel! You will now receive alerts here.');
  });
}

let selectedModel = '';

async function initializeBluesMinds() {
  if (!BLUESMINDS_API_KEY) {
    console.warn('BLUESMINDS_API_KEY is not set. AI features will fail.');
    return;
  }
  try {
    const res = await fetch(`${BLUESMINDS_BASE}/models`, {
      headers: { 'Authorization': `Bearer ${BLUESMINDS_API_KEY}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch models: ${res.statusText}`);
    const data = await res.json();
    
    const models = data.data || [];
    const kimi25 = models.find((m: any) => m.id.toLowerCase().includes('kimi-2.5') || m.id.toLowerCase() === 'kimi-2.5');
    
    if (kimi25) {
      selectedModel = kimi25.id;
    } else if (models.length > 0) {
      selectedModel = models[0].id;
    }
    console.log(`[BluesMinds] Selected model: ${selectedModel}`);
  } catch (error) {
    console.error('[BluesMinds] Error initializing:', error);
  }
}

async function callBluesMinds(messages: any[], temperature = 0.7) {
  if (!selectedModel) await initializeBluesMinds();
  if (!selectedModel) throw new Error('No BluesMinds model available');

  const res = await fetch(`${BLUESMINDS_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BLUESMINDS_API_KEY}`
    },
    body: JSON.stringify({
      model: selectedModel,
      messages,
      temperature
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`BluesMinds API error: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  initializeBluesMinds();

  // --- API ROUTES ---
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // --- AUTH ROUTES ---
  app.post('/api/auth/verify', (req, res) => {
    const { code } = req.body;
    if (code === APP_ACCESS_CODE) {
      const token = jwt.sign({ authenticated: true }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid access code' });
    }
  });

  app.get('/api/auth/check', (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) return res.json({ authenticated: false });
    try {
      jwt.verify(token, JWT_SECRET);
      res.json({ authenticated: true });
    } catch (e) {
      res.json({ authenticated: false });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.json({ success: true });
  });

  // --- TELEGRAM ROUTES ---
  app.get('/api/telegram/status', (req, res) => {
    const db = readDB();
    res.json({ connected: !!db.telegramChatId, chatId: db.telegramChatId });
  });

  app.post('/api/telegram/test', async (req, res) => {
    const db = readDB();
    if (!db.telegramChatId || !bot) {
      return res.status(400).json({ error: 'Telegram not connected' });
    }
    try {
      await bot.sendMessage(db.telegramChatId, '🚨 ClawSentinel Test Alert: Connection successful!');
      res.json({ success: true });
    } catch (error) {
      console.error('Telegram error:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  // Mocking real Ave API / Market Data for the frontend
  app.get('/api/market/trending', async (req, res) => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=ETH');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching trending data:', error);
      res.status(500).json({ error: 'Failed to fetch trending data' });
    }
  });

  app.get('/api/market/token/:address', async (req, res) => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${req.params.address}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching token data:', error);
      res.status(500).json({ error: 'Failed to fetch token data' });
    }
  });

  // AI Summary Route
  app.post('/api/ai/analyze', async (req, res) => {
    try {
      const { context, type } = req.body;
      
      let prompt = '';
      if (type === 'dashboard_risk') {
        prompt = `You are an expert on-chain risk analyst. Analyze the following market context and provide a brief, professional risk verdict (max 2 sentences) focusing on liquidity, volume shifts, and smart contract anomalies. Context: ${JSON.stringify(context)}`;
      } else if (type === 'deep_dive') {
        prompt = `You are an expert on-chain risk analyst. Analyze the following token data and provide a deep dive summary. Return a JSON object with exactly these keys: "confidence" (number 0-100), "findings" (array of 3 short sentences), "recommendation" (short action phrase), "reasoning" (1 sentence). Context: ${JSON.stringify(context)}`;
      } else {
        prompt = `Analyze the following on-chain data: ${JSON.stringify(context)}`;
      }

      let summary = await callBluesMinds([{ role: 'user', content: prompt }]);
      
      if (type === 'deep_dive') {
        try {
          // Extract JSON if wrapped in markdown
          const jsonMatch = summary.match(/```json\n([\s\S]*?)\n```/) || summary.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            summary = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          } else {
            summary = JSON.parse(summary);
          }
        } catch (e) {
          // Fallback if parsing fails
          summary = {
            confidence: 85,
            findings: ["Analysis completed.", "Data processed.", "Awaiting further signals."],
            recommendation: "Monitor",
            reasoning: summary.substring(0, 100)
          };
        }
      }

      res.json({ summary });
    } catch (error) {
      console.error('Error generating AI summary:', error);
      res.status(500).json({ error: 'Failed to generate AI summary' });
    }
  });

  // AI Chat Route
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages, context } = req.body;
      
      const systemPrompt = `You are the ClawSentinel AI Analyst. You help users understand on-chain risk, token metrics, and market events.
Keep your answers concise, professional, and grounded in the provided context. Do NOT invent data.
If the user asks about something not in the context, politely state that you don't have that data currently.

Current Context:
${JSON.stringify(context, null, 2)}`;

      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ];

      const reply = await callBluesMinds(fullMessages);
      res.json({ reply });
    } catch (error) {
      console.error('Error in AI chat:', error);
      res.status(500).json({ error: 'Failed to generate chat response' });
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

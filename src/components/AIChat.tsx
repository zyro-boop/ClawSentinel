import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, X, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Gather context based on current route
      let currentContext: any = { route: location.pathname };
      
      try {
        if (location.pathname.includes('dashboard') || location.pathname.includes('deep-dive') || location.pathname.includes('watchlist')) {
          const trending = await api.getTrendingTokens();
          if (trending.length > 0) {
            currentContext.topToken = trending[0];
            currentContext.marketOverview = "Top trending token is " + trending[0].symbol;
          }
        }
      } catch (e) {
        console.warn("Could not fetch context for chat", e);
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: currentContext
        })
      });

      if (!res.ok) throw new Error('Failed to send message');
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-96 bg-surface-container border-l border-outline-variant/15 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-high">
        <div className="flex items-center gap-2">
          <Brain className="text-[#0066FF]" size={20} />
          <h3 className="font-headline font-bold text-white">Sentinel AI</h3>
        </div>
        <button onClick={onClose} className="text-outline hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-on-surface-variant text-sm mt-8">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Ask me anything about the current page context, token metrics, or market events.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
              msg.role === 'user' 
                ? 'bg-primary-container text-on-primary-container rounded-tr-sm' 
                : 'bg-surface-container-highest text-white rounded-tl-sm border border-outline-variant/10'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-container-highest p-3 rounded-xl rounded-tl-sm border border-outline-variant/10">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-outline-variant/15 bg-surface-container-high">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Sentinel AI..."
            className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-primary-container disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

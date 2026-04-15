// Frontend API Client

export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  priceUsd: string;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  isAnomaly?: boolean;
}

export const api = {
  async getTrendingTokens(): Promise<TokenData[]> {
    const res = await fetch('/api/market/trending');
    if (!res.ok) throw new Error('Failed to fetch trending tokens');
    const data = await res.json();
    
    if (!data.pairs) return [];
    
    return data.pairs.slice(0, 5).map((pair: any) => ({
      address: pair.baseToken.address,
      name: pair.baseToken.name,
      symbol: pair.baseToken.symbol,
      priceUsd: pair.priceUsd,
      priceChange24h: pair.priceChange?.h24 || 0,
      volume24h: pair.volume?.h24 || 0,
      liquidity: pair.liquidity?.usd || 0,
      fdv: pair.fdv || 0,
    }));
  },

  async getTokenData(address: string): Promise<TokenData | null> {
    const res = await fetch(`/api/market/token/${address}`);
    if (!res.ok) throw new Error('Failed to fetch token data');
    const data = await res.json();
    
    if (!data.pairs || data.pairs.length === 0) return null;
    
    const pair = data.pairs[0];
    return {
      address: pair.baseToken.address,
      name: pair.baseToken.name,
      symbol: pair.baseToken.symbol,
      priceUsd: pair.priceUsd,
      priceChange24h: pair.priceChange?.h24 || 0,
      volume24h: pair.volume?.h24 || 0,
      liquidity: pair.liquidity?.usd || 0,
      fdv: pair.fdv || 0,
    };
  },

  async getAiRiskSummary(context: any) {
    const res = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, type: 'dashboard_risk' }),
    });
    if (!res.ok) throw new Error('Failed to get AI summary');
    return res.json();
  },

  async getDeepDiveAiSummary(context: any) {
    const res = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, type: 'deep_dive' }),
    });
    if (!res.ok) throw new Error('Failed to get Deep Dive AI summary');
    return res.json();
  },

  // Mocking historical chart data for the UI since DexScreener public API doesn't provide free klines
  async getChartData(address: string, timeframe: '1H' | '1D' | '1W'): Promise<ChartDataPoint[]> {
    // In a real app, this would call Ave API or Binance API for klines
    // We generate deterministic mock data based on the address to simulate the real chart
    const points = 24;
    const basePrice = 2400;
    const data: ChartDataPoint[] = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < points; i++) {
      const time = new Date();
      if (timeframe === '1H') time.setMinutes(time.getMinutes() - (points - i) * 2.5);
      if (timeframe === '1D') time.setHours(time.getHours() - (points - i));
      if (timeframe === '1W') time.setDate(time.getDate() - (points - i) * 0.3);
      
      currentPrice = currentPrice * (1 + (Math.random() * 0.04 - 0.02));
      
      data.push({
        time: time.toISOString(),
        value: currentPrice,
        isAnomaly: i === Math.floor(points * 0.7) && Math.random() > 0.5 // Random anomaly
      });
    }
    
    return data;
  }
};

import React, { useState, useEffect } from 'react';
import { Shield, Brain, Grid, ShieldAlert, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { api, TokenData, ChartDataPoint } from '../services/api';
import { formatCurrency, formatPercent } from '../lib/utils';
import { format } from 'date-fns';

export function Dashboard() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'1H' | '1D' | '1W'>('1D');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch trending tokens to pick the top one for the dashboard
        const trending = await api.getTrendingTokens();
        if (trending.length > 0) {
          const topToken = trending[0];
          setTokenData(topToken);
          
          // Fetch chart data
          const chart = await api.getChartData(topToken.address, timeframe);
          setChartData(chart);
          
          // Generate AI Summary
          try {
            const aiRes = await api.getAiRiskSummary({
              token: topToken.symbol,
              priceChange: topToken.priceChange24h,
              volume: topToken.volume24h,
              liquidity: topToken.liquidity
            });
            setAiSummary(aiRes.summary);
          } catch (e) {
            setAiSummary('AI analysis temporarily unavailable.');
          }
        }
      } catch (err) {
        setError('Failed to load dashboard data. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDashboardData();
  }, [timeframe]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary-container animate-spin" />
          <p className="text-on-surface-variant text-sm font-mono tracking-widest uppercase">Syncing On-Chain Data...</p>
        </div>
      </div>
    );
  }

  if (error || !tokenData) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="bg-surface-container p-8 rounded-xl border border-error/20 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-white font-headline font-bold mb-2">Data Unavailable</h3>
          <p className="text-on-surface-variant text-sm">{error || 'No token data found.'}</p>
        </div>
      </div>
    );
  }

  const isPositive = tokenData.priceChange24h >= 0;
  const priceColor = isPositive ? 'text-tertiary' : 'text-error';

  // Find anomaly for chart
  const anomalyPoint = chartData.find(d => d.isAnomaly);

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto w-full">
      {/* Section 1: Top Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Asset</p>
          <p className="text-lg font-headline font-bold text-white">{tokenData.symbol}</p>
        </div>
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Price</p>
          <p className="text-lg font-headline font-bold text-white">{formatCurrency(tokenData.priceUsd)}</p>
        </div>
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">24h Change</p>
          <p className={`text-lg font-headline font-bold ${priceColor}`}>{formatPercent(tokenData.priceChange24h)}</p>
        </div>
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Liquidity</p>
          <p className="text-lg font-headline font-bold text-white">{formatCurrency(tokenData.liquidity)}</p>
        </div>
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Market Cap</p>
          <p className="text-lg font-headline font-bold text-white">{formatCurrency(tokenData.fdv)}</p>
        </div>
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Trend Rank</p>
          <p className="text-lg font-headline font-bold text-white">#1</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/5 flex flex-col justify-center items-end">
          <p className="text-[8px] text-on-surface-variant uppercase tracking-widest">Live Sync</p>
          <p className="text-[10px] font-mono text-[#8E8E8E]">{format(new Date(), 'HH:mm:ss')} UTC</p>
        </div>
      </div>

      {/* Section 2: Dashboard Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Risk & Decision */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container p-8 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-colors"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h2 className="text-on-surface-variant text-sm font-medium mb-2 uppercase tracking-widest">Risk Intelligence Score</h2>
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-headline font-bold text-white">84<span className="text-2xl text-on-surface-variant">/100</span></span>
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-bold uppercase tracking-widest border border-tertiary/20">Stable</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-on-surface-variant text-xs mb-1 italic">Last evaluated just now</p>
                <Shield className="text-primary-container ml-auto" size={36} />
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/15">
                <h3 className="text-white font-headline font-bold mb-4 flex items-center gap-2">
                  <Grid className="text-tertiary" size={20} />
                  Decision Matrix
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-center p-3 border border-outline-variant/10 rounded-lg w-1/2 mr-2">
                    <p className="text-[10px] text-on-surface-variant uppercase">Current</p>
                    <p className="text-lg font-headline font-bold text-white">WATCH</p>
                  </div>
                  <div className="text-center p-3 bg-error-container/10 border border-error/20 rounded-lg w-1/2 ml-2">
                    <p className="text-[10px] text-error uppercase">Action</p>
                    <p className="text-lg font-headline font-bold text-error">REDUCE</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/15 flex flex-col justify-center">
                <p className="text-on-surface-variant text-xs mb-2">Exposure Recommendation</p>
                <p className="text-xl font-headline font-bold text-white">Limit <span className="text-[#0066FF]">$4.5M</span> USD</p>
                <p className="text-[10px] text-[#8E8E8E] mt-2">Based on current volatility & depth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Intelligence Rail */}
        <div className="lg:col-span-4 bg-surface-container p-6 rounded-xl border border-outline-variant/15 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-headline font-bold flex items-center gap-2">
              <Brain className="text-[#0066FF]" size={20} />
              AI Analyst
            </h3>
            <div className="flex items-center gap-1">
              <span className="text-xs text-on-surface-variant">Confidence</span>
              <span className="text-xs font-bold text-tertiary">98.2%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Live Assessment</p>
            <p className="text-sm text-white leading-relaxed">{aiSummary || 'Analyzing on-chain signals...'}</p>
          </div>
          <div className="pt-4 border-t border-outline-variant/10 mt-auto">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">Suggested Action</p>
            <button className="w-full bg-white text-black py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-on-surface-variant transition-colors">
              <ShieldAlert size={16} /> Review Hedge Recommendation
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Main Chart */}
      <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-headline font-bold text-white">Intelligence Trend</h2>
            <p className="text-sm text-on-surface-variant">Macro-risk variance vs Asset Performance ({timeframe})</p>
          </div>
          <div className="flex gap-2">
            {(['1H', '1D', '1W'] as const).map((t) => (
              <button 
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  timeframe === t 
                    ? 'bg-[#201F1F] text-[#0066FF] border border-[#0066FF]/30' 
                    : 'bg-surface-container-high text-[#8E8E8E] hover:text-white border border-transparent'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                hide 
              />
              <YAxis 
                domain={['auto', 'auto']} 
                hide 
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-surface-container-high border border-outline-variant/20 p-3 rounded-lg shadow-xl">
                        <p className="text-xs text-on-surface-variant mb-1">
                          {format(new Date(payload[0].payload.time), 'MMM d, HH:mm')}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {formatCurrency(payload[0].value as number)}
                        </p>
                        {payload[0].payload.isAnomaly && (
                          <p className="text-[10px] text-error font-bold mt-1 uppercase tracking-wider">
                            Anomaly Detected
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0066FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#chartGradient)" 
                activeDot={{ r: 6, fill: '#0066FF', stroke: '#fff', strokeWidth: 2 }}
              />
              {anomalyPoint && (
                <ReferenceDot 
                  x={anomalyPoint.time} 
                  y={anomalyPoint.value} 
                  r={6} 
                  fill="#FFB4AB" 
                  stroke="none" 
                  className="animate-pulse"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4">
          {chartData.length > 0 && (
            <>
              <span className="text-[10px] text-[#424656]">{format(new Date(chartData[0].time), 'MMM d, HH:mm')}</span>
              <span className="text-[10px] text-[#424656]">{format(new Date(chartData[Math.floor(chartData.length/2)].time), 'MMM d, HH:mm')}</span>
              <span className="text-[10px] text-[#424656]">{format(new Date(chartData[chartData.length-1].time), 'MMM d, HH:mm')}</span>
            </>
          )}
        </div>
      </div>

      {/* Section 4: Analytical Grid (Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Contract Risk Summary */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <h4 className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Contract Risk</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">Re-entrancy</span>
              <span className="text-xs font-bold text-tertiary">Passed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">Flash Loan Resistance</span>
              <span className="text-xs font-bold text-tertiary">Passed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">Ownership Centralization</span>
              <span className="text-xs font-bold text-error">Critical</span>
            </div>
          </div>
        </div>

        {/* Holder Concentration */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <h4 className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Top Wallets</h4>
          <ul className="space-y-3">
            <li className="flex justify-between text-xs">
              <span className="text-on-surface-variant font-mono">0x71...e21</span>
              <span className="text-white font-bold">12.4%</span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="text-on-surface-variant font-mono">0xac...f44</span>
              <span className="text-white font-bold">8.1%</span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="text-on-surface-variant font-mono">0x22...10a</span>
              <span className="text-white font-bold">5.3%</span>
            </li>
          </ul>
        </div>

        {/* Pressure Visualizer */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <h4 className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Market Pressure</h4>
          <div className="flex justify-between text-[10px] mb-2">
            <span className="text-tertiary font-bold uppercase">Buy (42%)</span>
            <span className="text-error font-bold uppercase">Sell (58%)</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden flex">
            <div className="h-full bg-tertiary" style={{ width: '42%' }}></div>
            <div className="h-full bg-error" style={{ width: '58%' }}></div>
          </div>
          <p className="text-[10px] text-[#8E8E8E] mt-4 text-center">Net delta: -16.4 {tokenData.symbol}/min</p>
        </div>

        {/* Anomaly Events */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
          <h4 className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Live Anomalies</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-error mt-1"></div>
              <div>
                <p className="text-[11px] text-white font-medium">Flash Liquidity Drain</p>
                <p className="text-[9px] text-[#8E8E8E]">2m ago · Uniswap V3</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-error mt-1"></div>
              <div>
                <p className="text-[11px] text-white font-medium">Sudden Hashrate Drop</p>
                <p className="text-[9px] text-[#8E8E8E]">15m ago · Network</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


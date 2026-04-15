import React, { useState, useEffect } from 'react';
import { Download, ShieldAlert, Code, Users, ArrowLeftRight, Grid, History, Brain, Radio, CheckCircle, Loader2 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { api, TokenData } from '../services/api';
import { formatCurrency } from '../lib/utils';
import { format } from 'date-fns';

export function DeepDive() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDeepDiveData() {
      setIsLoading(true);
      setError(null);
      try {
        const trending = await api.getTrendingTokens();
        if (trending.length > 0) {
          const topToken = trending[0];
          setTokenData(topToken);
          
          try {
            const aiRes = await api.getDeepDiveAiSummary({
              token: topToken.symbol,
              priceChange: topToken.priceChange24h,
              volume: topToken.volume24h,
              liquidity: topToken.liquidity,
              fdv: topToken.fdv
            });
            setAiSummary(aiRes.summary);
          } catch (e) {
            setAiSummary({
              confidence: 82,
              findings: [
                "Concentration at 42.8% indicates a high risk of coordinated sell-offs by early seed holders.",
                "Contract proxy structure allows for non-audit changes, although current parameters are safe.",
                "Transaction pressure is currently bearish; sell orders are outpacing buys by 1.5x in the last hour."
              ],
              recommendation: "Monitor with Alerts",
              reasoning: "Wait for sell pressure to equalize before entry. Set price floor alert."
            });
          }
        }
      } catch (err) {
        setError('Failed to load deep dive data. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDeepDiveData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary-container animate-spin" />
          <p className="text-on-surface-variant text-sm font-mono tracking-widest uppercase">Running Deep Scan...</p>
        </div>
      </div>
    );
  }

  if (error || !tokenData) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="bg-surface-container p-8 rounded-xl border border-error/20 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-white font-headline font-bold mb-2">Scan Failed</h3>
          <p className="text-on-surface-variant text-sm">{error || 'No token data found.'}</p>
        </div>
      </div>
    );
  }

  // Mock distribution data for the BarChart
  const distributionData = [
    { value: 40 }, { value: 60 }, { value: 80 }, { value: 100, active: true },
    { value: 30 }, { value: 50 }, { value: 90 }, { value: 45 }, { value: 65 }, { value: 75 }
  ];

  return (
    <div className="flex gap-8 max-w-screen-2xl mx-auto w-full">
      {/* CONTENT GRID AREA */}
      <div className="flex-1 max-w-[calc(100%-24rem)]">
        {/* HEADER SECTION */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#0066FF]/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0066FF]">token</span>
              </div>
              <h2 className="text-4xl font-headline font-bold tracking-tight">{tokenData.symbol}</h2>
              <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold text-outline border border-outline-variant/10 uppercase">Base Chain</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-error-container/10 border border-error-container/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <span className="text-xs font-bold text-error uppercase tracking-wider">Medium Risk</span>
              </div>
              <p className="text-xs text-outline italic">Analyzed {format(new Date(), 'HH:mm')} UTC</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-highest text-on-surface rounded-xl text-sm font-medium hover:bg-surface-bright transition-all">
              <Download size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/10">
              <ShieldAlert size={16} />
              Run Deep Scan
            </button>
          </div>
        </div>

        {/* GRID MODULES */}
        <div className="grid grid-cols-2 gap-6">
          {/* GRID MODULE 1: Contract Risk */}
          <section className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/5">
            <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center">
              <h3 className="text-sm font-headline font-bold text-on-surface-variant">Contract Risk</h3>
              <Code className="text-outline" size={18} />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <ShieldAlert className="text-error" size={18} />
                    <div>
                      <p className="text-sm font-semibold">Proxy Pattern Detected</p>
                      <p className="text-xs text-outline">Implementation can be swapped without notice.</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-error-container/20 text-error font-bold rounded-full border border-error-container/30 uppercase">High</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <CheckCircle className="text-tertiary" size={18} />
                    <div>
                      <p className="text-sm font-semibold">Renounced Ownership</p>
                      <p className="text-xs text-outline">Owner cannot mint or pause contract functions.</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-tertiary-container/20 text-tertiary font-bold rounded-full border border-tertiary-container/30 uppercase">Low</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-surface-container-low rounded-lg border-l-4 border-error">
                <p className="text-[10px] uppercase font-bold text-outline mb-1 tracking-widest">Verdict</p>
                <p className="text-sm italic text-on-surface-variant">"Structure is technically secure but governance is opaque. Exercise caution with large positions."</p>
              </div>
            </div>
          </section>

          {/* GRID MODULE 2: Holder Health */}
          <section className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/5">
            <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center">
              <h3 className="text-sm font-headline font-bold text-on-surface-variant">Holder Health</h3>
              <Users className="text-outline" size={18} />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-surface-container-lowest rounded-lg">
                  <p className="text-[10px] text-outline font-bold uppercase mb-1">Top 10 Holders</p>
                  <p className="text-xl font-headline font-bold">42.8%</p>
                  <p className="text-[10px] text-error">Conc. High</p>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-lg">
                  <p className="text-[10px] text-outline font-bold uppercase mb-1">Whale Exposure</p>
                  <p className="text-xl font-headline font-bold">12.1%</p>
                  <p className="text-[10px] text-tertiary">Stable</p>
                </div>
              </div>
              <div className="h-24 relative bg-surface-container-lowest rounded-lg p-2 flex items-end gap-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.active ? '#0066FF' : '#0066FF33'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="absolute top-2 left-3 text-[9px] font-bold text-outline">DISTRIBUTION TREND (7D)</p>
              </div>
            </div>
          </section>

          {/* GRID MODULE 3: Transaction Pressure */}
          <section className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/5">
            <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center">
              <h3 className="text-sm font-headline font-bold text-on-surface-variant">Transaction Pressure</h3>
              <ArrowLeftRight className="text-outline" size={18} />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-headline font-bold text-tertiary">1.4k</p>
                  <p className="text-[10px] text-outline uppercase font-bold">Buy Count (24h)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-headline font-bold text-error">2.1k</p>
                  <p className="text-[10px] text-outline uppercase font-bold">Sell Count (24h)</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-surface-container-lowest rounded-full flex overflow-hidden mb-6">
                <div className="h-full bg-tertiary" style={{ width: '40%' }}></div>
                <div className="h-full bg-error" style={{ width: '60%' }}></div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-outline font-bold uppercase mb-2">Recent Swaps</p>
                <div className="flex justify-between items-center text-[11px] border-b border-outline-variant/10 pb-2">
                  <span className="text-error font-medium">SELL 12.4 {tokenData.symbol}</span>
                  <span className="text-outline">2m ago</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded">0x4a...f2</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-outline-variant/10 pb-2">
                  <span className="text-tertiary font-medium">BUY 2.1 {tokenData.symbol}</span>
                  <span className="text-outline">5m ago</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded">0x12...a9</span>
                </div>
              </div>
            </div>
          </section>

          {/* GRID MODULE 4: Market Structure */}
          <section className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/5">
            <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center">
              <h3 className="text-sm font-headline font-bold text-on-surface-variant">Market Structure</h3>
              <Grid className="text-outline" size={18} />
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-outline font-bold uppercase">Volatility</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="bg-error h-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">High</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-outline font-bold uppercase">Liquidity Depth</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">Fair</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-outline font-bold uppercase">Trend Stability</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="bg-outline h-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">Weak</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-outline font-bold uppercase">Narrative Mom.</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">Viral</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM: Anomaly Timeline */}
        <section className="mt-8 bg-surface-container rounded-xl overflow-hidden border border-outline-variant/5">
          <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center">
            <h3 className="text-sm font-headline font-bold text-on-surface-variant">Anomaly Timeline</h3>
            <History className="text-outline" size={18} />
          </div>
          <div className="p-8">
            <div className="relative flex justify-between">
              {/* Connecting Line */}
              <div className="absolute top-4 left-0 w-full h-[1px] bg-outline-variant/30 z-0"></div>
              
              {/* Timeline Points */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-32 group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-sm">trending_up</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-on-surface">Price Spike</p>
                  <p className="text-[9px] text-outline">08:14 UTC</p>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3 w-32 group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-error flex items-center justify-center">
                  <span className="material-symbols-outlined text-error text-sm">water_drop</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-on-surface">Liquidity Pull</p>
                  <p className="text-[9px] text-outline">09:30 UTC</p>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3 w-32 group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline text-sm">person_search</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-on-surface">Large Transfer</p>
                  <p className="text-[9px] text-outline">10:05 UTC</p>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3 w-32 group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-on-surface">Sentiment Peak</p>
                  <p className="text-[9px] text-outline">12:50 UTC</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT RAIL: AI ANALYST */}
      <aside className="w-80 h-[calc(100vh-8rem)] sticky top-24 bg-surface-container rounded-2xl border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-outline-variant/10 bg-surface-container-high">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="text-[#0066FF]" size={20} />
            <h4 className="text-sm font-headline font-bold">Sentinel AI Analyst</h4>
          </div>
          <p className="text-[10px] text-outline uppercase tracking-widest font-semibold">Deep Reasoning Engine</p>
        </div>
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-on-surface-variant">Confidence Score</span>
              <span className="text-xl font-headline font-bold text-primary">{aiSummary?.confidence || 88}%</span>
            </div>
            <div className="w-full h-1 bg-surface-container-lowest rounded-full">
              <div className="h-full bg-primary" style={{ width: `${aiSummary?.confidence || 88}%` }}></div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Key Findings</p>
            <ul className="space-y-3">
              {aiSummary?.findings?.map((finding: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0"></div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{finding}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-primary-container/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">recommend</span>
              <p className="text-[10px] font-bold text-primary uppercase">Recommendation</p>
            </div>
            <p className="text-sm font-bold text-on-primary-container mb-1">{aiSummary?.recommendation || 'Monitor with Alerts'}</p>
            <p className="text-[11px] text-on-primary-container/70">{aiSummary?.reasoning || 'Wait for sell pressure to equalize before entry.'}</p>
          </div>
        </div>
        <div className="p-6 mt-auto">
          <button className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl text-xs font-bold shadow-ambient flex items-center justify-center gap-2 hover:brightness-110 transition-all">
            {aiSummary?.recommendation || 'Monitor with Alerts'} <Radio size={16} />
          </button>
        </div>
      </aside>

      {/* Background Decorative Gradient */}
      <div className="fixed bottom-0 right-0 w-[60vw] h-[614px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 translate-y-1/2"></div>
      <div className="fixed top-0 left-0 w-[40vw] h-[409px] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Plus, Filter, ArrowUpDown, MoreHorizontal, ShieldAlert, Brain, TrendingDown, Activity, Loader2 } from 'lucide-react';
import { api, TokenData } from '../services/api';
import { formatCurrency, formatPercent } from '../lib/utils';

export function Watchlist() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWatchlist() {
      setIsLoading(true);
      setError(null);
      try {
        const trending = await api.getTrendingTokens();
        setTokens(trending);
      } catch (err) {
        setError('Failed to load watchlist data.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadWatchlist();
  }, []);

  // Helper to generate a deterministic risk score based on address
  const getRiskScore = (address: string) => {
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      hash = address.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary-container animate-spin" />
          <p className="text-on-surface-variant text-sm font-mono tracking-widest uppercase">Loading Watchlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="bg-surface-container p-8 rounded-xl border border-error/20 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-white font-headline font-bold mb-2">Data Unavailable</h3>
          <p className="text-on-surface-variant text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto w-full">
      {/* HEADER & ACTIONS */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold text-white tracking-tight">Operational Risk Board</h2>
          <p className="text-on-surface-variant text-sm mt-1">On-Chain Risk Intelligence</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-surface-container rounded-lg border border-outline-variant/15 p-1">
            <button className="px-4 py-1.5 text-xs font-bold bg-surface-container-high text-white rounded shadow-sm">All</button>
            <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant hover:text-white">High Risk</button>
            <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant hover:text-white">Anomalies</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/10">
            <Plus size={16} />
            Add Asset
          </button>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
            <ShieldAlert className="text-error" size={20} />
          </div>
          <div>
            <p className="text-2xl font-headline font-bold text-white">{tokens.filter(t => getRiskScore(t.address) > 75).length}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Critical Alerts</p>
          </div>
        </div>
        <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
            <Brain className="text-primary-container" size={20} />
          </div>
          <div>
            <p className="text-2xl font-headline font-bold text-white">8</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">AI Interventions</p>
          </div>
        </div>
        <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
            <Activity className="text-tertiary" size={20} />
          </div>
          <div>
            <p className="text-2xl font-headline font-bold text-white">{tokens.filter(t => getRiskScore(t.address) <= 40).length}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Stable Assets</p>
          </div>
        </div>
        <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 flex flex-col justify-center">
          <p className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Sentinel Priority</p>
          <p className="text-sm font-medium text-white line-clamp-2">Review Risk <span className="text-error font-bold">AERO</span> and <span className="text-error font-bold">PENDLE</span> due to sudden liquidity shifts.</p>
        </div>
      </div>

      {/* MAIN DATA TABLE */}
      <div className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/15 rounded text-xs text-on-surface-variant hover:text-white transition-colors">
              <Filter size={14} /> Risk Level
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/15 rounded text-xs text-on-surface-variant hover:text-white transition-colors">
              <Filter size={14} /> Chain
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/15 rounded text-xs text-on-surface-variant hover:text-white transition-colors">
              <Filter size={14} /> Sector
            </button>
          </div>
          <div className="text-xs text-on-surface-variant">
            Showing 1-{tokens.length} of {tokens.length}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-lowest/50">
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">Asset</th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">Risk Score <ArrowUpDown size={12} className="inline ml-1" /></th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">Status</th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">24h Volatility</th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">Liquidity Depth</th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">AI Verdict</th>
                <th className="p-4 text-[10px] font-bold text-outline uppercase tracking-widest font-headline text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {tokens.map((token, i) => {
                const riskScore = getRiskScore(token.address);
                const isHighRisk = riskScore > 75;
                const isMediumRisk = riskScore > 40 && riskScore <= 75;
                
                let riskColor = 'text-tertiary';
                let riskBg = 'bg-tertiary-container/20';
                let riskBorder = 'border-tertiary-container/30';
                let riskLabel = 'Stable';
                let volatilityWidth = '20%';
                
                if (isHighRisk) {
                  riskColor = 'text-error';
                  riskBg = 'bg-error-container/20';
                  riskBorder = 'border-error-container/30';
                  riskLabel = 'Critical';
                  volatilityWidth = '85%';
                } else if (isMediumRisk) {
                  riskColor = 'text-orange-400';
                  riskBg = 'bg-orange-500/10';
                  riskBorder = 'border-orange-500/20';
                  riskLabel = 'Elevated';
                  volatilityWidth = '60%';
                }

                return (
                  <tr key={token.address} className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs">
                          {token.symbol.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{token.symbol}</p>
                          <p className="text-[10px] text-outline">DEX Pair</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-headline font-bold ${riskColor}`}>{riskScore}</span>
                        {isHighRisk && <TrendingDown size={14} className="text-error" />}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 ${riskBg} ${riskColor} text-[10px] font-bold rounded border ${riskBorder} uppercase`}>
                        {riskLabel}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                          <div className={`h-full ${isHighRisk ? 'bg-error' : isMediumRisk ? 'bg-orange-400' : 'bg-tertiary'}`} style={{ width: volatilityWidth }}></div>
                        </div>
                        <span className="text-xs text-white">{isHighRisk ? 'High' : isMediumRisk ? 'Med' : 'Low'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white">
                      {formatCurrency(token.liquidity)} 
                      <span className={`text-[10px] ml-1 ${token.priceChange24h >= 0 ? 'text-tertiary' : 'text-error'}`}>
                        ({formatPercent(token.priceChange24h)})
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-on-surface-variant line-clamp-1 max-w-[200px]">
                        {isHighRisk ? 'Liquidity drain detected in primary pool.' : isMediumRisk ? 'Whale wallet accumulation observed.' : 'Normal market conditions.'}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-outline hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                );
              })}
              
              {tokens.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                    No assets in watchlist.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Play, Filter, SlidersHorizontal, RefreshCw, LogIn, TrendingDown, ArrowLeftRight, Users, Code, Activity, ShieldAlert, CheckCircle, Brain } from 'lucide-react';

export function Replay() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-headline font-bold text-white tracking-tight">Strategy Replay</h2>
          <div className="h-6 w-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Asset:</span>
            <span className="px-3 py-1 bg-surface-container-high rounded-md text-sm font-bold text-white border border-outline-variant/10">ETH/USD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Timeframe:</span>
            <span className="px-3 py-1 bg-surface-container-high rounded-md text-sm font-bold text-white border border-outline-variant/10">Oct 12 - Oct 18, 2023</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-surface-container-high rounded-lg border border-outline-variant/10 hover:bg-surface-bright transition-colors">
            <Filter size={18} className="text-on-surface-variant" />
          </button>
          <button className="p-2 bg-surface-container-high rounded-lg border border-outline-variant/10 hover:bg-surface-bright transition-colors">
            <SlidersHorizontal size={18} className="text-on-surface-variant" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/10">
            <Play size={16} fill="currentColor" />
            Run Test
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* MAIN CHART AREA */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-6 flex-1 flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-headline font-bold text-on-surface-variant">ClawSentinel Risk-Aware Strategy vs Buy & Hold</h3>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
                  <span className="text-on-surface-variant">Buy & Hold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div>
                  <span className="text-white">Sentinel Strategy</span>
                </div>
              </div>
            </div>
            
            {/* Chart Canvas */}
            <div className="flex-1 relative w-full h-full min-h-[200px]">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="h-px w-full bg-outline-variant/10"></div>
                <div className="h-px w-full bg-outline-variant/10"></div>
                <div className="h-px w-full bg-outline-variant/10"></div>
                <div className="h-px w-full bg-outline-variant/10"></div>
                <div className="h-px w-full bg-outline-variant/10"></div>
              </div>
              
              {/* SVG Chart */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Baseline Line */}
                <path d="M0 100 Q 150 90, 300 150 T 600 200 T 900 250 T 1200 280" fill="none" stroke="#424656" strokeWidth="2" strokeDasharray="4 4"></path>
                
                {/* Strategy Line */}
                <path d="M0 100 Q 150 90, 300 150 T 600 120 T 900 80 T 1200 60" fill="none" stroke="#0066FF" strokeWidth="3"></path>
                <path d="M0 100 Q 150 90, 300 150 T 600 120 T 900 80 T 1200 60 L 1200 300 L 0 300 Z" fill="url(#replayGradient)" opacity="0.15"></path>
                
                <defs>
                  <linearGradient id="replayGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0066FF"></stop>
                    <stop offset="100%" stopColor="#0066FF" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                
                {/* Signal Markers */}
                <g transform="translate(300, 150)">
                  <circle cx="0" cy="0" r="6" fill="#FFB4AB" className="animate-pulse"></circle>
                  <circle cx="0" cy="0" r="3" fill="#93000A"></circle>
                  <line x1="0" y1="0" x2="0" y2="-40" stroke="#FFB4AB" strokeWidth="1"></line>
                  <rect x="-30" y="-60" width="60" height="20" rx="4" fill="#1C1B1B" stroke="#FFB4AB" strokeWidth="1"></rect>
                  <text x="0" y="-47" fill="#FFB4AB" fontSize="9" fontWeight="bold" textAnchor="middle">Reduce Exposure</text>
                </g>
                
                <g transform="translate(600, 120)">
                  <circle cx="0" cy="0" r="6" fill="#6BD8CB" className="animate-pulse"></circle>
                  <circle cx="0" cy="0" r="3" fill="#008075"></circle>
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#6BD8CB" strokeWidth="1"></line>
                  <rect x="-30" y="40" width="60" height="20" rx="4" fill="#1C1B1B" stroke="#6BD8CB" strokeWidth="1"></rect>
                  <text x="0" y="53" fill="#6BD8CB" fontSize="9" fontWeight="bold" textAnchor="middle">Hedge Recommended</text>
                </g>
              </svg>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="grid grid-cols-4 gap-4 h-24 shrink-0">
            <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Net Return</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-headline font-bold text-tertiary">+14.2%</p>
                <p className="text-[10px] text-outline line-through">-8.4%</p>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Max Drawdown</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-headline font-bold text-white">-4.1%</p>
                <p className="text-[10px] text-error line-through">-22.5%</p>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Signals Fired</p>
              <p className="text-2xl font-headline font-bold text-white">12</p>
            </div>
            <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Capital Preserved</p>
              <p className="text-2xl font-headline font-bold text-[#0066FF]">$1.24M</p>
            </div>
          </div>
        </div>

        {/* RIGHT RAIL: TIMELINE & ANALYSIS */}
        <div className="w-96 flex flex-col gap-6 min-w-0">
          {/* Signal Timeline */}
          <div className="bg-surface-container rounded-xl border border-outline-variant/10 flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-outline-variant/10 bg-surface-container-high flex justify-between items-center">
              <h3 className="text-sm font-headline font-bold text-white">Signal Timeline</h3>
              <span className="text-[10px] bg-surface-container-lowest px-2 py-1 rounded text-outline">12 Events</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {/* Event 1 */}
              <div className="relative pl-6 pb-4 border-l border-outline-variant/20">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-error ring-4 ring-surface-container"></div>
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-error/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-error">Reduce Exposure</span>
                    <span className="text-[10px] text-outline">Oct 13, 14:20</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Risk Score exceeded 85. Triggered by sudden liquidity drain in primary pool.</p>
                </div>
              </div>
              
              {/* Event 2 */}
              <div className="relative pl-6 pb-4 border-l border-outline-variant/20">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant ring-4 ring-surface-container"></div>
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white">HOLD</span>
                    <span className="text-[10px] text-outline">Oct 14, 09:15</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Volatility spike detected. Awaiting confirmation of trend reversal.</p>
                </div>
              </div>
              
              {/* Event 3 */}
              <div className="relative pl-6 pb-4 border-l border-outline-variant/20">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-tertiary ring-4 ring-surface-container"></div>
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-tertiary/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-tertiary">Hedge Recommended</span>
                    <span className="text-[10px] text-outline">Oct 15, 11:40</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Risk Score normalized below 40. Buy pressure increasing steadily.</p>
                </div>
              </div>
              
              {/* Event 4 */}
              <div className="relative pl-6">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant ring-4 ring-surface-container"></div>
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white">HOLD</span>
                    <span className="text-[10px] text-outline">Oct 16, 16:00</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Stable consolidation phase. No anomalies detected.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sentinel Analysis */}
          <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-5 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="text-[#0066FF]" size={18} />
              <h4 className="text-sm font-headline font-bold text-white">Replay Analysis</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed italic">
              "The strategy successfully avoided the 22% drawdown on Oct 13 by reacting to the liquidity drain 14 minutes before the price impact. Re-entry was optimized, capturing 85% of the subsequent recovery."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

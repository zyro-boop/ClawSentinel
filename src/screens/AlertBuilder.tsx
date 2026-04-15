import React from 'react';
import { Star, Bell, MessageSquare, Send, Webhook, ShieldAlert, Brain, CheckCircle } from 'lucide-react';

export function AlertBuilder() {
  return (
    <div className="flex gap-8 max-w-screen-2xl mx-auto w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Pane: Builder (2/3) */}
      <div className="w-2/3 overflow-y-auto space-y-10 pb-24 pr-4 no-scrollbar">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-headline font-bold text-white tracking-tight">Alert Builder</h2>
            <p className="text-on-surface-variant text-sm mt-1">Ready for active monitoring and alert delivery.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface bg-surface-container-highest hover:bg-white/10 transition-colors">Discard</button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-container shadow-lg shadow-blue-900/20">Save Alert Rule</button>
          </div>
        </div>

        {/* Section 1: Target Asset */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 text-sm font-bold">1</span>
            <h3 className="text-lg font-headline font-semibold text-white">Target Asset</h3>
          </div>
          <div className="bg-surface-container rounded-xl p-6 border border-white/5 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Asset Search</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">token</span>
                  <input 
                    type="text" 
                    placeholder="Search token or address..." 
                    className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-primary/50 focus:ring-0 transition-all text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Network Chain</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-0 appearance-none text-white">
                  <option>Ethereum Mainnet</option>
                  <option>Solana</option>
                  <option>Base</option>
                  <option>Polygon</option>
                  <option>Arbitrum</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <Star className="text-tertiary" size={20} />
                <div>
                  <p className="text-sm font-medium text-white">Watchlist Source</p>
                  <p className="text-xs text-on-surface-variant">Automatically apply this rule to all tokens in your primary watchlist.</p>
                </div>
              </div>
              <button className="w-10 h-5 bg-outline-variant rounded-full relative flex items-center px-1">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Trigger Conditions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 text-sm font-bold">2</span>
            <h3 className="text-lg font-headline font-semibold text-white">Trigger Conditions</h3>
          </div>
          <div className="bg-surface-container rounded-xl p-6 border border-white/5 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Condition</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white">
                  <option>Risk Score</option>
                  <option>Price Change</option>
                  <option>Sell Pressure</option>
                  <option>Holder Concentration</option>
                  <option>Contract Risk</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Operator</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white">
                  <option>Greater Than</option>
                  <option>Less Than</option>
                  <option>Increases By</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Threshold</label>
                <input type="number" placeholder="85" className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Eval Period</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white">
                  <option>1m</option>
                  <option>5m</option>
                  <option>1h</option>
                  <option>24h</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Smart Presets</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 border border-outline-variant/30 rounded-lg text-xs hover:border-blue-500 hover:text-blue-500 transition-all text-on-surface">Flash Crash</button>
                <button className="px-3 py-1.5 border border-outline-variant/30 rounded-lg text-xs hover:border-blue-500 hover:text-blue-500 transition-all text-on-surface">Whale Inflow</button>
                <button className="px-3 py-1.5 border border-outline-variant/30 rounded-lg text-xs hover:border-blue-500 hover:text-blue-500 transition-all text-on-surface">Smart Money Sell</button>
                <button className="px-3 py-1.5 border border-outline-variant/30 rounded-lg text-xs hover:border-blue-500 hover:text-blue-500 transition-all text-on-surface">Rugpull Risk</button>
                <button className="px-3 py-1.5 border border-outline-variant/30 rounded-lg text-xs hover:border-blue-500 hover:text-blue-500 transition-all text-on-surface">LP Drain</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Delivery and Severity */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 text-sm font-bold">3</span>
            <h3 className="text-lg font-headline font-semibold text-white">Delivery and Severity</h3>
          </div>
          <div className="bg-surface-container rounded-xl p-6 border border-white/5 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Channels</label>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-surface-container-low border border-blue-600/30 rounded-xl text-white">
                  <Bell className="text-blue-500" size={20} />
                  <span className="text-sm font-medium">Push</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low border border-white/5 rounded-xl opacity-60 text-white">
                  <MessageSquare size={20} />
                  <span className="text-sm font-medium">Discord</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low border border-white/5 rounded-xl opacity-60 text-white">
                  <Send size={20} />
                  <span className="text-sm font-medium">Telegram</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low border border-white/5 rounded-xl opacity-60 text-white">
                  <Webhook size={20} />
                  <span className="text-sm font-medium">Webhook</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Severity Level</label>
                <span className="text-xs font-bold text-error">CRITICAL</span>
              </div>
              <input type="range" min="0" max="3" step="1" className="w-full h-1.5 bg-surface-container-low rounded-lg appearance-none cursor-pointer accent-blue-600" defaultValue="3" />
              <div className="flex justify-between text-[10px] text-neutral-500 font-medium px-1">
                <span>LOW</span>
                <span>MEDIUM</span>
                <span>HIGH</span>
                <span>CRITICAL</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Cadence (Alerts per hour)</label>
                <input type="number" defaultValue="1" className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-on-surface-variant">Cooldown (Minutes)</label>
                <input type="number" defaultValue="30" className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Pane: Live Preview & AI (1/3) */}
      <div className="w-1/3 bg-surface-container-low border-l border-white/5 p-8 space-y-8 flex flex-col overflow-y-auto no-scrollbar">
        {/* Live Preview Card */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Live Preview</h4>
          <div className="bg-surface-container-highest rounded-xl p-5 shadow-ambient relative overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-error/20 rounded-md flex items-center justify-center">
                  <ShieldAlert className="text-error" size={14} />
                </div>
                <span className="text-xs font-bold text-white tracking-tight">ALERT: $ETH RISK</span>
              </div>
              <span className="text-[10px] text-neutral-400">Just Now</span>
            </div>
            <p className="text-sm font-medium text-on-surface leading-snug">
              Ethereum Risk Score exceeded <span className="text-error font-bold">85</span>. Current value: <span className="text-white">87.4</span>.
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
              <span className="px-2 py-1 bg-surface-container rounded text-[10px] font-bold text-on-surface-variant">REDUCE RECOMMENDED</span>
              <span className="px-2 py-1 bg-surface-container rounded text-[10px] font-bold text-on-surface-variant">HIGH_VOL</span>
            </div>
          </div>
        </div>

        {/* AI Insight Rail */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">AI Logic Audit</h4>
            <div className="bg-surface-container rounded-xl p-6 border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant">Confidence Score</p>
                  <p className="text-2xl font-headline font-bold text-tertiary">94.2%</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-tertiary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-tertiary border-r-transparent rounded-full animate-pulse"></div>
                  <CheckCircle className="text-tertiary" size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Signal Frequency</span>
                  <span className="text-white font-medium">Low (1.2/day)</span>
                </div>
                <div className="w-full h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Risk Analyst Note</h4>
            <div className="bg-surface-container rounded-xl p-5 border border-white/5 italic">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                "The proposed rule captures 98% of historical contract-level anomalies in the last 12 months. Threshold 85 provides the optimal balance between early warning and noise reduction. Recommendation: Deploy to active monitors for real-time risk hedging."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-800">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuk9CJuJ8Ix7Ggo7M3uFKVRUzKCy0J2_nNw7RylWtjGH7_TObQXXJZy-MKb5-Hxg3AKDuB5DflOFF0Ogb11xd2AfDOLBAn9Q-lOw8NcFuWcMPHB9znaOhqSxg0KJxTtD7fO6UAjRpkQhWhPZohrrG139Obk27b-bjYgllYAuKh_PTKiTZi_wiosfy7dsIQCYHkVCzddzUOM8Kxf6cReIw37VC_47JPxtJuY3IKTM0mmqXeDFAXb9zqPCfLDmEqIPbbZB_cmSb3MGav" alt="AI Agent" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-blue-500 uppercase">Sentinel Analyst</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Rule Performance Preview</h4>
            <div className="bg-surface-container rounded-xl p-5 border border-white/5 h-32 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Hist. Detection</p>
                  <p className="text-lg font-headline font-bold text-white">98.4%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">False Positives</p>
                  <p className="text-lg font-headline font-bold text-white">0.2%</p>
                </div>
              </div>
              <div className="mt-3 h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Architecture() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <div className="pt-8 px-8 max-w-screen-2xl mx-auto">
        <Link to="/" className="inline-flex items-center text-outline hover:text-white transition-colors text-sm font-medium mb-8">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>
      </div>

      <main className="px-8 pb-20 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Signal Pipeline */}
        <section className="lg:col-span-8 space-y-12">
          <header>
            <h1 className="text-3xl font-headline font-bold tracking-tight mb-2">How it Works</h1>
            <p className="text-on-surface-variant max-w-2xl">Visualizing the real-time ingestion and processing stages for the active risk perimeter.</p>
          </header>

          {/* Pipeline Step 1: Raw Signal Inputs */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-surface-container-high p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>input</span>
              </div>
              <h2 className="font-headline font-semibold uppercase tracking-widest text-xs text-on-surface-variant">Raw Signal Inputs</h2>
              <div className="flex-1 h-[1px] bg-outline-variant opacity-15"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Market Liquidity Card */}
              <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-on-surface-variant">Market Liquidity</span>
                  <span className="text-tertiary text-xs">+2.4%</span>
                </div>
                <div className="h-16 flex items-end gap-1">
                  <div className="flex-1 bg-tertiary/20 h-[40%] rounded-t-sm"></div>
                  <div className="flex-1 bg-tertiary/20 h-[55%] rounded-t-sm"></div>
                  <div className="flex-1 bg-tertiary/20 h-[45%] rounded-t-sm"></div>
                  <div className="flex-1 bg-tertiary/20 h-[70%] rounded-t-sm"></div>
                  <div className="flex-1 bg-tertiary/20 h-[60%] rounded-t-sm"></div>
                  <div className="flex-1 bg-tertiary/20 h-[85%] rounded-t-sm"></div>
                </div>
                <div className="mt-4 text-xl font-headline font-bold">4.2M <span className="text-sm font-normal text-on-surface-variant">USD</span></div>
              </div>

              {/* Volume Shift */}
              <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-on-surface-variant">Volume Shift</span>
                  <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>trending_up</span>
                </div>
                <div className="text-3xl font-headline font-bold text-on-surface">12.8<span className="text-lg">x</span></div>
                <p className="text-[10px] text-error mt-1 font-medium">Standard deviation breach</p>
                <div className="mt-6 flex gap-2">
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-error"></div>
                  </div>
                </div>
              </div>

              {/* Anomaly Feed */}
              <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/10 font-mono text-[10px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span className="text-on-surface-variant uppercase">Anomaly Stream</span>
                </div>
                <div className="space-y-2 text-[#a1a1a1]">
                  <p className="border-l border-tertiary pl-2">09:42:01 <span className="text-on-surface">RPC_CALL_LAG</span></p>
                  <p className="border-l border-outline-variant pl-2">09:41:58 <span className="text-on-surface">MEMPOOL_SPIKE</span></p>
                  <p className="border-l border-outline-variant pl-2">09:41:45 <span className="text-on-surface">S_DEPTH_LOW</span></p>
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent"></div>
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>keyboard_arrow_down</span>
            </div>
          </div>

          {/* Pipeline Step 2: Risk Processing Layer */}
          <div className="relative pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-surface-container-high p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>memory</span>
              </div>
              <h2 className="font-headline font-semibold uppercase tracking-widest text-xs text-on-surface-variant">Risk Processing Layer</h2>
              <div className="flex-1 h-[1px] bg-outline-variant opacity-15"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contract Risk */}
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                <h3 className="text-sm font-headline font-semibold mb-4 text-on-surface">Smart Contract Security</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-outline-variant/5">
                    <span className="text-xs">Re-entrancy Vector</span>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-[10px] font-bold">SECURE</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-outline-variant/5">
                    <span className="text-xs">Owner Centralization</span>
                    <span className="px-2 py-0.5 rounded-full bg-error-container/20 text-error text-[10px] font-bold">CRITICAL</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-outline-variant/5">
                    <span className="text-xs">Proxy Implementation</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold">UPGRADABLE</span>
                  </div>
                </div>
              </div>

              {/* Holder Concentration */}
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                <h3 className="text-sm font-headline font-semibold mb-4 text-on-surface">Supply Architecture</h3>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-4 border-outline-variant/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-t-primary-container border-r-primary border-l-transparent border-b-transparent rounded-full rotate-45"></div>
                    <span className="text-lg font-headline font-bold">64%</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                      <span className="text-xs text-on-surface-variant">Top 10 Wallets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-xs text-on-surface-variant">Exchanges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                      <span className="text-xs text-on-surface-variant">Retail Distribution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent"></div>
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>keyboard_arrow_down</span>
            </div>
          </div>

          {/* Pipeline Step 3: Synthesis & Verdict */}
          <div className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-surface-container-high p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>verified</span>
              </div>
              <h2 className="font-headline font-semibold uppercase tracking-widest text-xs text-on-surface-variant">Synthesis & Verdict</h2>
              <div className="flex-1 h-[1px] bg-outline-variant opacity-15"></div>
            </div>
            
            <div className="bg-surface-container rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_40px_rgba(0,102,255,0.05)]">
              <div className="bg-primary/5 p-8 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Aggregated Pipeline Output</span>
                  <h3 className="text-4xl font-headline font-bold">System Risk Score</h3>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-headline font-bold text-error tracking-tighter">84<span className="text-2xl opacity-50">/100</span></div>
                  <div className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full mt-2 inline-block">ELEVATED THREAT</div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-4 gap-4 border-t border-outline-variant/10">
                <div className="text-center p-4 border-r border-outline-variant/10">
                  <p className="text-[10px] text-on-surface-variant uppercase mb-1">Integrity</p>
                  <p className="text-lg font-headline font-bold">98.2%</p>
                </div>
                <div className="text-center p-4 border-r border-outline-variant/10">
                  <p className="text-[10px] text-on-surface-variant uppercase mb-1">Latency</p>
                  <p className="text-lg font-headline font-bold">14ms</p>
                </div>
                <div className="text-center p-4 border-r border-outline-variant/10">
                  <p className="text-[10px] text-on-surface-variant uppercase mb-1">Signal S/N</p>
                  <p className="text-lg font-headline font-bold">High</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-[10px] text-on-surface-variant uppercase mb-1">Confidence</p>
                  <p className="text-lg font-headline font-bold">94%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: AI Analyst Rail */}
        <aside className="lg:col-span-4 h-full">
          <div className="sticky top-8 bg-surface-container-low rounded-2xl border border-outline-variant/15 overflow-hidden flex flex-col max-h-[calc(100vh-64px)]">
            {/* AI Header */}
            <div className="p-6 border-b border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary-container/20">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>psychology</span>
                </div>
                <div>
                  <h2 className="text-lg font-headline font-bold">Sentinel AI Analyst</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="text-[10px] font-medium text-tertiary uppercase">Active Reasoning</span>
                  </div>
                </div>
              </div>
              <div className="bg-error-container/10 border border-error/20 rounded-xl p-4">
                <p className="text-[10px] text-error font-bold uppercase tracking-wide mb-1">Current Risk Verdict</p>
                <p className="text-sm font-headline font-semibold text-on-surface">Elevated Risk Detected</p>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Detected high-velocity capital exit combined with suspicious contract upgrade patterns.</p>
              </div>
            </div>

            {/* AI Content Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Key Drivers */}
              <div>
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Key Drivers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>dangerous</span>
                    <span className="text-xs text-on-surface/80 leading-relaxed">Admin wallet initiated unauthorized proxy implementation update @ block #1842.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>info</span>
                    <span className="text-xs text-on-surface/80 leading-relaxed">Liquidity depth decreased by 42% across primary DEX pools within 120 seconds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>info</span>
                    <span className="text-xs text-on-surface/80 leading-relaxed">Social sentiment volatility spike detected (+240% volume).</span>
                  </li>
                </ul>
              </div>

              {/* System Changes */}
              <div>
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Trigger Sequence</h3>
                <div className="space-y-2 border-l-2 border-outline-variant/15 ml-2 pl-4">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <p className="text-[10px] text-on-surface-variant">T-14m: Anomaly feed alert</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <p className="text-[10px] text-on-surface-variant">T-08m: Sentiment drift detected</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <p className="text-[10px] text-on-surface">T-01m: Risk score escalated to 84</p>
                  </div>
                </div>
              </div>

              {/* Evidence Blocks */}
              <div>
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Evidence Blocks</h3>
                <div className="bg-surface-container-lowest p-3 rounded-lg font-mono text-[9px] text-[#a1a1a1] border border-outline-variant/10">
                  <pre><code>{`{
  "trace_id": "9x42f..b1",
  "op": "delegatecall",
  "target": "0x4fe...22a",
  "risk_factor": 0.94,
  "status": "UNVERIFIED"
}`}</code></pre>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-surface-container border-t border-outline-variant/10 space-y-3">
              <button className="w-full py-3 bg-primary-container text-on-primary-container font-headline font-bold rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>rate_review</span>
                Review Recommendation
              </button>
              <button className="w-full py-3 bg-surface-container-highest text-on-surface font-headline font-bold rounded-xl text-xs hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center gap-2 border border-outline-variant/10">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>description</span>
                Generate Risk Memo
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

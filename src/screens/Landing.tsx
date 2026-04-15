import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Search, Brain, History, Activity, MessageSquare, Zap, FileText, Users, TrendingDown, CheckCircle } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-body selection:bg-primary-container selection:text-white relative">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
          <div className="text-xl font-bold text-[#0066FF] tracking-tighter font-headline">
            ClawSentinel
          </div>
          <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight">
            <Link to="/how-it-works" className="text-[#8E8E8E] hover:text-white transition-colors">How it Works</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#8E8E8E] hover:text-white transition-colors">GitHub</a>
          </div>
          <button 
            onClick={() => navigate('/access')}
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-headline font-bold hover:opacity-80 transition-opacity active:scale-95 duration-100"
          >
            Get Started
          </button>
        </div>
        <div className="bg-gradient-to-b from-[#201F1F] to-transparent h-px w-full"></div>
      </nav>

      <main className="relative pt-24">
        {/* Grid Background Overlay */}
        <div className="fixed inset-0 grid-pattern pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative px-8 py-20 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-container/10 border border-primary-container/20 px-3 py-1 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="text-xs font-headline font-bold tracking-widest text-primary">LIVE RISK INTELLIGENCE</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-headline font-bold leading-[1.1] tracking-tight text-on-surface">
              Detect risk <br/><span className="text-primary">before the dump.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Institutional-grade on-chain monitoring that identifies anomalies, holder concentration shifts, and transaction pressure before they hit the order book.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('/access')}
                className="bg-primary-container text-white px-8 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all flex items-center group"
              >
                Open Dashboard
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-bright transition-all">
                View Live Signals
              </button>
            </div>
          </div>

          <div className="relative lg:scale-110">
            <div className="bg-surface-container-low rounded-xl p-1 shadow-ambient border border-outline-variant/15">
              <div className="bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10 aspect-[4/3] flex flex-col">
                {/* Dashboard Mockup Header */}
                <div className="p-4 bg-surface-container-high flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary-container/20 flex items-center justify-center">
                      <Shield className="text-primary" size={16} />
                    </div>
                    <span className="text-sm font-headline font-bold">SENTINEL_DASHBOARD_V2</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
                  </div>
                </div>
                {/* Dashboard Mockup Content */}
                <div className="flex-1 p-6 grid grid-cols-12 gap-4 bg-surface">
                  <div className="col-span-8 space-y-4">
                    <div className="h-48 bg-surface-container-low rounded-lg p-4 border border-outline-variant/5">
                      <div className="flex justify-between items-end h-full space-x-1">
                        <div className="w-full bg-primary-container/20 h-[40%] rounded-t-sm"></div>
                        <div className="w-full bg-primary-container/20 h-[55%] rounded-t-sm"></div>
                        <div className="w-full bg-primary-container/20 h-[30%] rounded-t-sm"></div>
                        <div className="w-full bg-primary-container/60 h-[85%] rounded-t-sm relative">
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-error text-[10px] px-1 rounded text-on-error font-bold">ANOMALY</div>
                        </div>
                        <div className="w-full bg-primary-container/20 h-[45%] rounded-t-sm"></div>
                        <div className="w-full bg-primary-container/20 h-[60%] rounded-t-sm"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">Concentration</div>
                        <div className="text-lg font-headline font-bold text-tertiary">Safe</div>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">Liquidity</div>
                        <div className="text-lg font-headline font-bold text-error">Volatile</div>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">Risk Score</div>
                        <div className="text-lg font-headline font-bold text-primary">84/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-surface-container-low rounded-lg border border-outline-variant/5 flex flex-col p-4">
                    <div className="text-xs font-bold text-on-surface-variant mb-4">AI ANALYSIS RAIL</div>
                    <div className="flex-1 space-y-3">
                      <div className="h-1 bg-outline-variant/20 rounded-full w-full"></div>
                      <div className="h-1 bg-outline-variant/20 rounded-full w-[80%]"></div>
                      <div className="h-1 bg-outline-variant/20 rounded-full w-[90%]"></div>
                      <div className="h-1 bg-outline-variant/20 rounded-full w-[40%]"></div>
                      <div className="pt-4 mt-auto">
                        <div className="bg-error/10 border border-error/20 p-3 rounded-lg text-center">
                          <div className="text-[10px] text-error font-bold uppercase tracking-widest mb-2">SUGGESTED ACTION</div>
                          <button className="bg-error text-on-error text-xs font-bold py-1.5 px-4 rounded w-full">REDUCE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tertiary/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="px-8 py-24 max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-on-surface">Deep anomaly detection</h3>
              <p className="leading-relaxed text-on-surface">Multivariate analysis that identifies transaction patterns invisible to standard block explorers.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-on-surface">Explainable AI decisions</h3>
              <p className="leading-relaxed text-on-surface">No black boxes. Get a natural language breakdown of exactly why a risk score has shifted.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <History className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-on-surface">Strategy replay</h3>
              <p className="leading-relaxed text-on-surface">Backtest your exit strategies against historical on-chain anomalies and market crashes.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-8 py-24 bg-surface-container-lowest relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold tracking-tight">How ClawSentinel works</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Three pillars of enterprise risk protection across the entire asset lifecycle.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
              {/* Workflow Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col items-center p-8 text-center">
                <div className="w-16 h-16 bg-surface-container-high rounded-full border-4 border-surface flex items-center justify-center mb-8">
                  <Activity className="text-primary" size={28} />
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant/15 w-full">
                  <div className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">STEP 01</div>
                  <h4 className="text-xl font-headline font-bold mb-2">Monitor</h4>
                  <p className="text-sm text-on-surface-variant">Continuous scanning of 25+ on-chain metrics across all major L1 and L2 networks.</p>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center p-8 text-center">
                <div className="w-16 h-16 bg-surface-container-high rounded-full border-4 border-surface flex items-center justify-center mb-8">
                  <MessageSquare className="text-tertiary" size={28} />
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant/15 w-full">
                  <div className="text-xs font-bold text-tertiary mb-2 tracking-widest uppercase">STEP 02</div>
                  <h4 className="text-xl font-headline font-bold mb-2">Explain</h4>
                  <p className="text-sm text-on-surface-variant">AI explains signal context using on-chain activity and market structure.</p>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center p-8 text-center">
                <div className="w-16 h-16 bg-surface-container-high rounded-full border-4 border-surface flex items-center justify-center mb-8">
                  <Zap className="text-error" size={28} />
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant/15 w-full">
                  <div className="text-xs font-bold text-error mb-2 tracking-widest uppercase">STEP 03</div>
                  <h4 className="text-xl font-headline font-bold mb-2">Respond</h4>
                  <p className="text-sm text-on-surface-variant">Review risk shifts and respond with the right next step.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Section */}
        <section className="px-8 py-24 max-w-screen-2xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-2">Evidence-based Intelligence</h2>
            <p className="text-on-surface-variant">Granular risk breakdown for any contract address.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Contract Risk</span>
                <FileText className="text-primary" size={20} />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Code Verified</span>
                  <span className="text-tertiary font-bold">YES</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Proxy Contract</span>
                  <span className="text-error font-bold">YES</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[85%]"></div>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Holders</span>
                <Users className="text-primary" size={20} />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl font-headline font-bold">12.4%</div>
                <div className="text-xs text-error font-bold">Top 10 Wallets</div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface"></div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface"></div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface"></div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface flex items-center justify-center text-[10px] font-bold">+8</div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Sell Pressure</span>
                <TrendingDown className="text-primary" size={20} />
              </div>
              <div className="h-20 flex items-end space-x-1">
                <div className="flex-1 bg-outline-variant/20 h-1/2"></div>
                <div className="flex-1 bg-outline-variant/20 h-2/3"></div>
                <div className="flex-1 bg-error/40 h-[90%]"></div>
                <div className="flex-1 bg-error/60 h-full"></div>
                <div className="flex-1 bg-outline-variant/20 h-3/4"></div>
              </div>
              <div className="mt-4 text-xs font-bold text-error">Net outflow increasing</div>
            </div>
            
            {/* Card 4 */}
            <div className="bg-surface-container-high rounded-xl p-6 border-2 border-primary-container/30 ring-4 ring-primary-container/5">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">AI Verdict</span>
                <CheckCircle className="text-primary" size={20} />
              </div>
              <div className="text-sm font-medium leading-relaxed mb-4">
                "Multiple 'soft-rug' signals detected in the liquidity provision patterns over the last 48h."
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="text-xs font-bold text-error uppercase">CRITICAL ALERT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Replay Section */}
        <section className="px-8 py-24 max-w-screen-2xl mx-auto relative z-10">
          <div className="bg-surface-container rounded-xl p-10 border border-outline-variant/10 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold mb-6">Risk-Aware Replay</h2>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  See how much capital you could have preserved by reacting to on-chain signals before they were reflected in the price action.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                    <span className="text-on-surface-variant">Buy & Hold Return</span>
                    <span className="text-error font-bold">-42.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary-container/10 border border-primary-container/20 rounded-lg">
                    <span className="font-bold">Sentinel Risk-Aware</span>
                    <span className="text-tertiary font-bold">+12.8%</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-lg p-6 border border-outline-variant/10 aspect-video flex flex-col justify-center">
                {/* Chart Comparison Mockup */}
                <div className="relative h-48 w-full">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                    <path d="M0 80 Q 50 70, 100 100 T 200 120 T 300 160 T 400 180" fill="none" stroke="#424656" strokeWidth="2"></path>
                    <circle cx="180" cy="115" fill="#0066FF" r="5"></circle>
                    <text fill="#0066FF" fontSize="10" fontWeight="bold" textAnchor="middle" x="180" y="100">EXIT SIGNAL</text>
                  </svg>
                </div>
              </div>
            </div>
            {/* Subtle Gradient Background */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-8 py-32 text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-headline font-bold mb-8 leading-tight">Turn market noise into clear action.</h2>
          <button 
            onClick={() => navigate('/access')}
            className="bg-primary-container text-white px-10 py-5 rounded-xl font-headline font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-primary-container/20"
          >
            Open Risk Dashboard
          </button>
          <p className="mt-8 text-on-surface-variant font-medium">Trusted by analysts and risk teams monitoring on-chain volatility.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center border-t border-[#424656]/15 bg-[#0E0E0E] relative z-10">
        <div className="text-lg font-bold text-[#8E8E8E] mb-4 md:mb-0">
          ClawSentinel
        </div>
        <div className="font-body text-sm text-[#8E8E8E] order-last md:order-none">
          © 2024 ClawSentinel On-Chain Risk Intelligence. Powered by ClawSentinel intelligence.
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <button className="text-[#424656] hover:text-[#0066FF] transition-colors">Terms</button>
          <button className="text-[#424656] hover:text-[#0066FF] transition-colors">Privacy</button>
          <button className="text-[#424656] hover:text-[#0066FF] transition-colors">Status</button>
          <button className="text-[#424656] hover:text-[#0066FF] transition-colors">Security</button>
        </div>
      </footer>
    </div>
  );
}

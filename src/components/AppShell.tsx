import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  BellRing, 
  History, 
  Eye, 
  Settings,
  Search,
  Bell,
  Brain
} from 'lucide-react';
import { AIChat } from './AIChat';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/deep-dive', label: 'Deep Dive', icon: BarChart2 },
    { path: '/app/alerts', label: 'Alerts', icon: BellRing },
    { path: '/app/replay', label: 'Replay', icon: History },
    { path: '/app/watchlist', label: 'Watchlist', icon: Eye },
    { path: '/app/settings', label: 'Settings', icon: Settings },
  ];

  const contextualAction = location.pathname === '/app/dashboard' ? (
    <button className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/10">
      Create Alert
    </button>
  ) : undefined;

  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 w-64 border-r border-[#424656]/15 bg-[#0E0E0E] z-50">
        <div className="px-6 mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-xl font-bold text-[#0066FF] font-headline tracking-tight uppercase">ClawSentinel</h1>
          <p className="text-[10px] text-outline font-bold tracking-widest uppercase opacity-60">On-Chain Risk Intelligence</p>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg group ${
                  isActive 
                    ? 'text-[#0066FF] bg-[#201F1F]/50 border-r-2 border-[#0066FF]' 
                    : 'text-[#424656] hover:text-white hover:bg-[#201F1F]'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#0066FF]' : 'group-hover:text-white'} />
                <span className="font-headline font-bold text-sm tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 pt-6 mt-auto border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAatyya90Ub19I2Cvr2Ptl8VghCcWuD99ZIT_hPQxMU98mH8d6tCLBoU3RLqsb4rlGLZvqfTx-lyV-h3VeA_7uq1dk9tJF6xYHtkITMi71t2s1KEHmCskzV34cB4FmNIaIGlfxU7xZVskLljkNhDlUSfQhLRqNFzrARDmkgzr1DA8W-lyoJIObG9mWbzNqwauUt_IMDJ48kWyfRKDEcocvFtXdFNOp1AfNwALHDmA076ZaCC4vP9LietLzmlKXMf2y2-GY0BEbX-X-" 
                alt="User Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold truncate text-white">Analyst</p>
              <p className="text-[10px] text-outline truncate">Active Session</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-8 w-auto h-16 border-b border-[#424656]/15 bg-[#131313]/80 backdrop-blur-md">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input 
                type="text" 
                placeholder="Global search assets, contracts, or wallets..." 
                className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-outline/50 transition-all text-white"
              />
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <button className="text-[#0066FF] font-bold border-b-2 border-[#0066FF] pb-1 font-headline tracking-tight text-sm">Ethereum</button>
              <button className="text-[#8E8E8E] hover:text-white transition-colors font-headline tracking-tight text-sm">Solana</button>
              <button className="text-[#8E8E8E] hover:text-white transition-colors font-headline tracking-tight text-sm">Base</button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center pr-4 border-r border-outline-variant/20 gap-4">
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`transition-colors ${isChatOpen ? 'text-[#0066FF]' : 'text-outline hover:text-white'}`}
              >
                <Brain size={20} />
              </button>
              <button className="text-outline hover:text-white transition-colors"><Bell size={20} /></button>
              <button onClick={() => navigate('/app/settings')} className="text-outline hover:text-white transition-colors"><Settings size={20} /></button>
            </div>
            {contextualAction}
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 pt-24 px-8 pb-12 transition-all duration-300 ${isChatOpen ? 'mr-96' : ''}`}>
          {children}
        </main>

        {/* AI Chat Slide-over */}
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

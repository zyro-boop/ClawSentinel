import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Key, Database, Webhook, Save, MessageCircle } from 'lucide-react';

export function Settings() {
  const [telegramStatus, setTelegramStatus] = useState({ connected: false, chatId: '' });
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);

  useEffect(() => {
    fetch('/api/telegram/status')
      .then(res => res.json())
      .then(data => setTelegramStatus(data))
      .catch(console.error);
  }, []);

  const handleConnectTelegram = () => {
    // Replace with actual bot username if available in env, or hardcode for now
    const botUsername = 'ClawSentinelBot'; // Ideally from env
    window.open(`https://t.me/${botUsername}?start=clawsentinel`, '_blank');
  };

  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    try {
      const res = await fetch('/api/telegram/test', { method: 'POST' });
      if (res.ok) {
        alert('Test alert sent successfully!');
      } else {
        alert('Failed to send test alert. Make sure you have started the bot.');
      }
    } catch (e) {
      alert('Error sending test alert.');
    } finally {
      setIsTestingTelegram(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-headline font-bold text-white tracking-tight">Settings</h2>
        <p className="text-on-surface-variant text-sm mt-1">Manage your account, security, and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-3 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface-container-high text-white rounded-xl border border-outline-variant/20 font-medium text-sm transition-colors">
            <User size={18} className="text-primary" />
            Profile & Account
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-colors font-medium text-sm">
            <Shield size={18} />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-colors font-medium text-sm">
            <Bell size={18} />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-colors font-medium text-sm">
            <Key size={18} />
            API Keys
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-colors font-medium text-sm">
            <Database size={18} />
            Data Sources
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-colors font-medium text-sm">
            <Webhook size={18} />
            Webhooks
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-9 space-y-6">
          {/* Profile Section */}
          <section className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container-high">
              <h3 className="text-lg font-headline font-bold text-white">Profile Information</h3>
              <p className="text-xs text-on-surface-variant mt-1">Update your account details and public profile.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-surface-container-highest overflow-hidden border-2 border-outline-variant/20">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAatyya90Ub19I2Cvr2Ptl8VghCcWuD99ZIT_hPQxMU98mH8d6tCLBoU3RLqsb4rlGLZvqfTx-lyV-h3VeA_7uq1dk9tJF6xYHtkITMi71t2s1KEHmCskzV34cB4FmNIaIGlfxU7xZVskLljkNhDlUSfQhLRqNFzrARDmkgzr1DA8W-lyoJIObG9mWbzNqwauUt_IMDJ48kWyfRKDEcocvFtXdFNOp1AfNwALHDmA076ZaCC4vP9LietLzmlKXMf2y2-GY0BEbX-X-" 
                    alt="User Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <button className="px-4 py-2 bg-surface-container-highest text-white rounded-lg text-sm font-medium hover:bg-surface-bright transition-colors border border-outline-variant/10">
                    Change Avatar
                  </button>
                  <p className="text-[10px] text-outline mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin"
                    className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-0 transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="User"
                    className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-0 transition-all text-white"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@clawsentinel.io"
                    className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-0 transition-all text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Telegram Integration Section */}
          <section className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container-high flex items-center justify-between">
              <div>
                <h3 className="text-lg font-headline font-bold text-white flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#0088cc]" />
                  Telegram Alerts
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">Receive critical risk alerts directly to your Telegram.</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${telegramStatus.connected ? 'bg-tertiary/20 text-tertiary' : 'bg-surface-variant text-on-surface-variant'}`}>
                {telegramStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Bot Connection</p>
                  <p className="text-xs text-on-surface-variant">Link your Telegram account to receive notifications.</p>
                </div>
                <div className="flex gap-3">
                  {telegramStatus.connected && (
                    <button 
                      onClick={handleTestTelegram}
                      disabled={isTestingTelegram}
                      className="px-4 py-2 bg-surface-container-highest text-white rounded-lg text-sm font-medium hover:bg-surface-bright transition-colors border border-outline-variant/10 disabled:opacity-50"
                    >
                      {isTestingTelegram ? 'Sending...' : 'Test Alert'}
                    </button>
                  )}
                  <button 
                    onClick={handleConnectTelegram}
                    className="px-4 py-2 bg-[#0088cc] text-white rounded-lg text-sm font-medium hover:brightness-110 transition-colors shadow-lg shadow-[#0088cc]/20"
                  >
                    {telegramStatus.connected ? 'Reconnect Bot' : 'Connect Telegram'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container-high">
              <h3 className="text-lg font-headline font-bold text-white">System Preferences</h3>
              <p className="text-xs text-on-surface-variant mt-1">Customize your dashboard and analysis settings.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Default Network</p>
                  <p className="text-xs text-on-surface-variant">The primary chain shown on login.</p>
                </div>
                <select className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2 text-sm focus:border-primary/50 focus:ring-0 appearance-none text-white w-48">
                  <option>Ethereum Mainnet</option>
                  <option>Solana</option>
                  <option>Base</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <div>
                  <p className="text-sm font-medium text-white">Compact Mode</p>
                  <p className="text-xs text-on-surface-variant">Reduce padding to show more data.</p>
                </div>
                <button className="w-10 h-5 bg-outline-variant rounded-full relative flex items-center px-1">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <div>
                  <p className="text-sm font-medium text-white">AI Auto-Analysis</p>
                  <p className="text-xs text-on-surface-variant">Automatically generate insights for high-risk assets.</p>
                </div>
                <button className="w-10 h-5 bg-primary-container rounded-full relative flex items-center px-1 justify-end">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2.5 bg-surface-container-highest text-white rounded-xl text-sm font-medium hover:bg-surface-bright transition-colors border border-outline-variant/10">
              Cancel
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/10">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

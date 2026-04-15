import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export function Access() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (res.ok) {
        navigate('/app/dashboard');
      } else {
        setError('Invalid access code.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col items-center justify-center p-4 selection:bg-primary-container selection:text-on-primary-container font-body relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0066FF]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0066FF]/5 rounded-full blur-[120px]"></div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-outline hover:text-white transition-colors text-sm font-medium z-10"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0066FF] font-headline tracking-tight uppercase mb-2">ClawSentinel</h1>
          <p className="text-on-surface-variant text-sm">Secure Access Gateway</p>
        </div>

        <div className="bg-surface-container border border-outline-variant/15 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
              <Lock className="text-[#0066FF]" size={24} />
            </div>
          </div>

          <h2 className="text-xl font-headline font-bold text-white text-center mb-2">Enter Access Code</h2>
          <p className="text-sm text-on-surface-variant text-center mb-8">
            Please enter your 15-character secure access code to proceed to the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="•••••••••••••••"
                className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl px-4 py-3 text-center tracking-widest focus:outline-none focus:border-[#0066FF]/50 focus:ring-1 focus:ring-[#0066FF]/50 transition-all text-white font-mono"
                maxLength={15}
                required
              />
              {error && (
                <p className="text-error text-xs text-center mt-2 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || code.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-[#0066FF]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Authenticate'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-[10px] text-outline uppercase tracking-widest">Enterprise Grade Security</p>
        </div>
      </div>
    </div>
  );
}

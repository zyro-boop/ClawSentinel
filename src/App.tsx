/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Landing } from './screens/Landing';
import { Dashboard } from './screens/Dashboard';
import { DeepDive } from './screens/DeepDive';
import { AlertBuilder } from './screens/AlertBuilder';
import { Replay } from './screens/Replay';
import { Watchlist } from './screens/Watchlist';
import { Architecture } from './screens/Architecture';
import { Settings } from './screens/Settings';
import { Access } from './screens/Access';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/access" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<Architecture />} />
        <Route path="/access" element={<Access />} />
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/dashboard" element={<ProtectedRoute><AppShell><Dashboard /></AppShell></ProtectedRoute>} />
        <Route path="/app/deep-dive" element={<ProtectedRoute><AppShell><DeepDive /></AppShell></ProtectedRoute>} />
        <Route path="/app/alerts" element={<ProtectedRoute><AppShell><AlertBuilder /></AppShell></ProtectedRoute>} />
        <Route path="/app/replay" element={<ProtectedRoute><AppShell><Replay /></AppShell></ProtectedRoute>} />
        <Route path="/app/watchlist" element={<ProtectedRoute><AppShell><Watchlist /></AppShell></ProtectedRoute>} />
        <Route path="/app/settings" element={<ProtectedRoute><AppShell><Settings /></AppShell></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}


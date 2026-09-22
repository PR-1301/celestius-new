import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound({ setActivePage }) {
  const handleGoHome = () => {
    if (typeof setActivePage === 'function') {
      setActivePage('home');
    } else {
      window.location.href = '/';
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-6 py-20 select-none">
      {/* Subtle ambient glow matching Home/Team design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
          <span className="tracking-wider">STATUS // 404</span>
        </div>

        {/* 404 Large Display */}
        <div className="space-y-3">
          <h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white leading-none font-mono"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-zinc-200 tracking-tight">
            Page Not Found
          </h2>
        </div>


        {/* Action Button: Navigate to Home */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs sm:text-sm font-bold tracking-wide hover:bg-white active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,204,0,0.25)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>
        </div>

      </div>
    </div>
  );
}

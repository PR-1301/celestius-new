import React from 'react';

export default function CircularLoader() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center select-none">
      <div className="relative flex items-center justify-center">
        {/* Subtle warm glow behind spinner */}
        <div className="absolute w-20 h-20 rounded-full bg-[#FFCC00]/10 blur-xl pointer-events-none" />
        
        {/* Simple Circular Spinner */}
        <div className="w-9 h-9 rounded-full border-[2.5px] border-white/10 border-t-[#FFCC00] animate-spin shadow-[0_0_15px_rgba(255,204,0,0.25)]" />
      </div>
    </div>
  );
}

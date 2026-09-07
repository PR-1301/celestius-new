import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

export default function IntroAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1); // 1: dot expand, 2: logo reveal, 3: ready exit
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Step 1 -> 2: Reveal logo
    const t1 = setTimeout(() => setStep(2), 300);

    // Smooth charging progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    // Step 2 -> 3: Finish & Exit
    const t2 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 450);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060608] text-white transition-opacity duration-500 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Nothing OS Dot Matrix Grid */}
      <div className="absolute inset-0 nothing-dot-grid opacity-30 pointer-events-none" />

      {/* Subtle Celestius Gold Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 font-mono text-[10px] text-zinc-500 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/30 transition-colors"
      >
        [SKIP ↵]
      </button>

      {/* Center Cinematic Brand Reveal */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center px-4">
        
        {/* Glowing Expanding Gold Dot -> Logo Transition */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-4 bg-[#FFCC00]/20 rounded-full blur-xl animate-pulse" />
          
          <div 
            className={`relative p-3 rounded-2xl bg-black border border-[#FFCC00]/40 transition-all duration-700 ease-out shadow-[0_0_40px_rgba(255,204,0,0.25)] ${
              step >= 2 ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'
            }`}
          >
            <img 
              src={logoImg} 
              alt="Celestius Logo" 
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>
        </div>

        {/* Wordmark & Catchy Welcome Subtitle */}
        <div className="space-y-2">
          <h2 
            style={{ fontFamily: "'VT323', monospace" }} 
            className="font-ndot text-4xl sm:text-5xl text-white tracking-[0.25em] uppercase"
          >
            CELESTIUS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#FFCC00] tracking-[0.25em] font-bold uppercase">
            HAPPILY WELCOMES YOU
          </p>
        </div>

        {/* Clean Pixel Progress Bar */}
        <div className="w-52 sm:w-64 space-y-2 pt-2">
          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
            <span>LOADING_ENVIRONMENT</span>
            <span className="text-[#FFCC00] font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div 
              className="h-full bg-[#FFCC00] rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_#FFCC00]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-6 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
        CIT // TECHNICAL_SOCIETY_PORTAL
      </div>
    </div>
  );
}

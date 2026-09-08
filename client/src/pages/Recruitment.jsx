import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Code2, 
  Server, 
  Palette, 
  CalendarCheck, 
  FileEdit, 
  Camera, 
  Mic2, 
  Sparkles,
  X,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Layers,
  Compass
} from 'lucide-react';
import { recruitmentDivisions } from '../data/recruitmentData';

export default function Recruitment({ introCompleted = true }) {
  const [activeDivision, setActiveDivision] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);
  const wasIntroPlayingOnMount = useRef(!introCompleted);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        wasIntroPlayingOnMount.current = false;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  const getAnimStyle = (animName, delaySec, duration = '0.65s') => {
    if (!introCompleted) {
      return { opacity: 0 };
    }
    const base = wasIntroPlayingOnMount.current ? 0.65 : 0.05;
    return {
      animation: `${animName} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${(base + delaySec).toFixed(2)}s both`
    };
  };

  const getCardAnimStyle = (animName, index) => {
    if (!introCompleted) {
      return { opacity: 0 };
    }
    const base = wasIntroPlayingOnMount.current ? 0.95 : 0.22;
    return {
      animation: `${animName} 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${(base + index * 0.07).toFixed(2)}s both`
    };
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRole]);

  // Dynamic Typewriter Effect
  const phrases = [
    "WE ARE ABOUT TO LET YOU JOIN US SOON.",
    "PREPARE YOUR GITHUB & PORTFOLIOS.",
    "ADMISSIONS WILL UNLOCK SHORTLY.",
    "GEAR UP TO BUILD WITH CELESTIUS."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRole(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const roleIcons = {
    'frontend': Code2,
    'backend': Server,
    'designing': Palette,
    'event-coordinator': CalendarCheck,
    'editor': FileEdit,
    'photography-videography': Camera,
    'public-speaking': Mic2
  };

  const getDisplayedRoles = () => {
    if (activeDivision === 'technical') {
      return recruitmentDivisions.technical.teams;
    }
    if (activeDivision === 'nonTechnical') {
      return recruitmentDivisions.nonTechnical.teams;
    }
    return [
      ...recruitmentDivisions.technical.teams,
      ...recruitmentDivisions.nonTechnical.teams
    ];
  };

  const cardAnimations = [
    'cardDiagonalLeft',
    'cardVerticalRise',
    'cardDiagonalRight',
    'cardFlipUp',
    'cardPopScale',
    'cardFocusBlur',
    'cardGlideRight'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 text-left space-y-16">
      
      {/* 1. Dynamic Hero Section */}
      <section className="relative space-y-6 pt-2 pb-2">
        
        {/* Display Typography with Typewriter Effect */}
        <div className="space-y-5 max-w-4xl">
          <h1 
            className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08]"
            style={{ 
              fontFamily: "'VT323', monospace",
              ...getAnimStyle('recruitTitleReveal', 0, '0.7s')
            }}
          >
            STAY TUNED. <br />
            <span className="text-[#FFCC00] inline-block min-h-[1.2em]">
              {displayText}
              <span className="inline-block w-3 sm:w-4 h-7 sm:h-12 bg-[#FFCC00] ml-1.5 align-middle animate-pulse" />
            </span>
          </h1>

          <p 
            className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl"
            style={getAnimStyle('recruitSlideLeft', 0.12, '0.65s')}
          >
            We are not opening applications right now, but recruitment for our upcoming semester cohort will begin shortly. Review the role specifications below, prepare your GitHub or portfolios, and register to receive an instant dispatch the moment submissions go live.
          </p>
        </div>

      </section>

      {/* 2. Interactive Role Directory & Division Switcher */}
      <section id="roles-taxonomy" className="space-y-8 scroll-mt-28">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div 
            className="space-y-1"
            style={getAnimStyle('recruitHeaderZoom', 0.22, '0.6s')}
          >
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">
              Available Roles & Tracks
            </span>
            <h2 
              className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              PICK A ROLE THAT SUITS YOU
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              [ CLICK ANY ROLE CARD TO VIEW BRIEF SPECIFICATIONS POPUP ]
            </p>
          </div>

          {/* Filter Pill Switcher with Celestius Gold Active Tab */}
          <div 
            className="flex items-center gap-1 bg-black p-1 rounded-full border border-white/15"
            style={getAnimStyle('recruitSlideRight', 0.28, '0.6s')}
          >
            <button
              onClick={() => setActiveDivision('all')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeDivision === 'all'
                  ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ALL_TEAMS [7]
            </button>
            <button
              onClick={() => setActiveDivision('technical')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeDivision === 'technical'
                  ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              TECHNICAL [2]
            </button>
            <button
              onClick={() => setActiveDivision('nonTechnical')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeDivision === 'nonTechnical'
                  ? 'bg-sky-400 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              NON_TECHNICAL [5]
            </button>
          </div>
        </div>

        {/* Roles Grid (Cyber-Minimalist Bento Cards Inspired by Nothing OS & Celestius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDisplayedRoles().map((role, i) => {
            const IconComp = roleIcons[role.id] || Sparkles;
            const isTech = role.division === 'Technical';
            const animName = cardAnimations[i % cardAnimations.length];

            return (
              <div 
                key={`${activeDivision}-${role.id}`}
                onClick={() => setSelectedRole(role)}
                style={getCardAnimStyle(animName, i)}
                className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ease-out border flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:scale-[1.015] ${
                  isTech
                    ? 'border-[#FFCC00]/50 bg-gradient-to-b from-[#16140b] via-[#0b0c0f] to-[#060608] shadow-[0_0_30px_rgba(255,204,0,0.18)] hover:border-[#FFCC00] hover:shadow-[0_16px_50px_rgba(255,204,0,0.32)]'
                    : 'border-sky-400/50 bg-gradient-to-b from-[#091522] via-[#0b0c0f] to-[#060608] shadow-[0_0_30px_rgba(56,189,248,0.18)] hover:border-sky-400 hover:shadow-[0_16px_50px_rgba(56,189,248,0.32)]'
                }`}
              >
                {/* Ambient radial glow - persistent with hover bloom */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl ${
                    isTech ? 'from-[#FFCC00]/20' : 'from-sky-400/20'
                  }`} 
                />

                <div className="relative z-10">
                  {/* Top Bar: Icon */}
                  <div className="flex items-center justify-between">
                    <div 
                      className={`w-12 h-12 rounded-2xl bg-black/60 border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${
                        isTech
                          ? 'border-[#FFCC00]/40 text-[#FFCC00] group-hover:border-[#FFCC00] group-hover:bg-[#FFCC00]/20 group-hover:shadow-[0_0_15px_rgba(255,204,0,0.3)]'
                          : 'border-sky-400/40 text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-400/20 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      }`}
                    >
                      <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Team Title & Tagline */}
                  <div className="mt-5">
                    <h3 
                      className={`font-ndot text-3xl sm:text-4xl tracking-wide uppercase leading-none transition-all duration-300 ${
                        isTech 
                          ? 'text-[#FFCC00] group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(255,204,0,0.5)]' 
                          : 'text-sky-400 group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                      }`}
                    >
                      {role.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed line-clamp-2">
                      {role.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Divider & Footer */}
                <div className="relative z-10 pt-5 mt-6">
                  <div 
                    className={`w-full h-px mb-4 transition-colors ${
                      isTech 
                        ? 'bg-[#FFCC00]/25 group-hover:bg-[#FFCC00]/50' 
                        : 'bg-sky-400/25 group-hover:bg-sky-400/50'
                    }`} 
                  />
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span 
                      className={`font-bold tracking-wider uppercase ${
                        isTech ? 'text-[#FFCC00]' : 'text-sky-400'
                      }`}
                    >
                      {isTech ? 'Technical' : 'Non-Technical'}
                    </span>
                    <span 
                      className={`font-bold flex items-center gap-1.5 transition-all duration-300 group-hover:translate-x-1.5 ${
                        isTech ? 'text-[#FFCC00]' : 'text-sky-400'
                      }`}
                    >
                      <span>VIEW BRIEF</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Redesigned Role Brief Description Popup Modal (Cyber Bento Deck) */}
      {selectedRole && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedRole(null)}
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {(() => {
            const isRoleTech = selectedRole.division === 'Technical';
            const roleBorder = isRoleTech ? 'border-[#FFCC00]/40' : 'border-sky-400/40';
            const roleShadow = isRoleTech ? 'shadow-[0_20px_70px_rgba(255,204,0,0.18)]' : 'shadow-[0_20px_70px_rgba(56,189,248,0.18)]';
            const roleBg = isRoleTech ? 'bg-[#FFCC00]/10' : 'bg-sky-400/10';
            const roleText = isRoleTech ? 'text-[#FFCC00]' : 'text-sky-400';
            const roleBtn = isRoleTech ? 'bg-[#FFCC00] text-black hover:bg-[#FFE066]' : 'bg-sky-400 text-black hover:bg-sky-300';

            return (
              <div 
                className={`relative w-full max-w-3xl max-h-[92vh] bg-[#0a0a0e]/95 ${roleBorder} rounded-3xl ${roleShadow} flex flex-col overflow-hidden text-left animate-modal-pop border backdrop-blur-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Ambient background glows */}
                <div className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'}`} />
                <div className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-15 ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'}`} />
                <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

                {/* 1. Modal Top Navigation & Title Bar */}
                <div className="relative z-10 p-5 sm:p-7 pb-5 border-b border-white/10 shrink-0 bg-black/40 backdrop-blur-md">
                  
                  {/* Top Status & Close Line */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${roleBg} border ${roleBorder} ${roleText}`}>
                        [ {selectedRole.division.toUpperCase()} DIVISION ]
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        <span className={`w-1.5 h-1.5 rounded-full ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'} animate-pulse`} />
                        <span>STATUS: STANDBY COHORT</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedRole(null)}
                      className={`w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95 ${
                        isRoleTech ? 'hover:border-[#FFCC00]/50 hover:text-[#FFCC00]' : 'hover:border-sky-400/50 hover:text-sky-400'
                      }`}
                      title="Close popup"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Icon Podium */}
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${roleBg} border ${roleBorder} ${roleText} flex items-center justify-center shrink-0 shadow-lg`}>
                      {React.createElement(roleIcons[selectedRole.id] || Sparkles, { className: 'w-7 h-7 sm:w-8 sm:h-8' })}
                    </div>

                    <div className="space-y-1">
                      <h3 
                        className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase leading-none"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {selectedRole.name}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-zinc-300">
                        // {selectedRole.tagline}
                      </p>
                    </div>
                  </div>

                </div>

                {/* 2. Scrollable Content Bento Deck */}
                <div className="relative z-10 p-5 sm:p-7 overflow-y-auto space-y-6 text-zinc-200">
                  
                  {/* Mission Briefing Overview Card */}
                  <div className="relative p-5 rounded-2xl bg-black/60 border border-white/10 overflow-hidden space-y-2">
                    <div className={`absolute top-0 left-0 bottom-0 w-1 ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'}`} />
                    <div className="flex items-center gap-2">
                      <Terminal className={`w-4 h-4 ${roleText}`} />
                      <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${roleText}`}>
                        MISSION BRIEFING & SCOPE
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed pl-1">
                      {selectedRole.description}
                    </p>
                  </div>

                  {/* Responsive Two-Column Bento Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* Left Column: Key Responsibilities (7 cols) */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
                          // KEY_RESPONSIBILITIES [{selectedRole.responsibilities.length}]
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {selectedRole.responsibilities.map((resp, i) => (
                          <div 
                            key={i}
                            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 group"
                          >
                            <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md ${roleBg} ${roleText} shrink-0 mt-0.5`}>
                              0{i + 1}
                            </span>
                            <span className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans group-hover:text-white transition-colors">
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Skills & Profile Expectations (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
                          // PROFILE_EXPECTATIONS
                        </span>
                      </div>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.skillsLookedFor.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 rounded-xl bg-black border border-white/15 hover:border-white/30 font-mono text-xs text-zinc-300 flex items-center gap-2 transition-colors"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'}`} />
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Preparation Standby Advice Box */}
                      <div className={`p-4 rounded-2xl ${roleBg} border ${roleBorder} space-y-1.5 mt-4`}>
                        <div className="flex items-center gap-1.5">
                          <Layers className={`w-3.5 h-3.5 ${roleText}`} />
                          <span className={`font-mono text-[10px] font-bold tracking-wider uppercase ${roleText}`}>
                            STANDBY ADVICE
                          </span>
                        </div>
                        <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                          {isRoleTech
                            ? "Curate your GitHub repositories with clean code, README docs, or deployment links to stand out when submissions unlock."
                            : "Organize your Figma files, poster designs, video reels, or past event organizing achievements in a shareable link."}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* 3. Modal Bottom Action Bar */}
                <div className="relative z-10 p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/60 shrink-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span className={`w-2 h-2 rounded-full ${isRoleTech ? 'bg-[#FFCC00]' : 'bg-sky-400'} animate-pulse`} />
                    <span>ADMISSIONS STANDBY // SEMESTER COHORT</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
                    >
                      DISMISS
                    </button>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl ${roleBtn} font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>GOT IT</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>,
        document.body
      )}

      {/* 3. Redesigned Preparation Hub for Applicants (Nothing OS Cyber Bento) */}
      <section 
        className="relative rounded-3xl p-6 sm:p-8 md:p-10 border border-white/15 bg-gradient-to-b from-[#0f0f15]/90 via-[#0a0a0e]/95 to-[#060608] shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-8 overflow-hidden backdrop-blur-xl"
        style={getAnimStyle('recruitBentoExpand', 0.65, '0.75s')}
      >
        {/* Subtle Ambient Radial Gradients & Texture */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FFCC00]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-400/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        {/* Header Block with Metadata */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
              <span className="font-mono text-[11px] text-[#FFCC00] uppercase tracking-widest font-bold">
                CANDIDATE_GUIDE // PREPARATION_PROTOCOL
              </span>
            </div>
            <h3 
              className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide leading-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              HOW TO PREPARE WHILE IN STANDBY
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Applications will unlock shortly for our upcoming semester cohort. Ensure your proof-of-work, repositories, and portfolios are ready to present before submissions go live.
            </p>
          </div>
        </div>

        {/* Three Multi-Layered Interactive Track Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 01 Technical Card */}
          <div 
            className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#18150d] via-[#0d0d12] to-[#070709] border border-[#FFCC00]/40 shadow-[0_0_25px_rgba(255,204,0,0.12)] hover:border-[#FFCC00] hover:shadow-[0_12px_40px_rgba(255,204,0,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            style={getAnimStyle('checklistStepFade', 0.75, '0.6s')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-black/70 border border-[#FFCC00]/40 text-[#FFCC00] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFCC00]/20 transition-all duration-300 shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#FFCC00] bg-[#FFCC00]/10 px-2.5 py-1 rounded-lg border border-[#FFCC00]/25">
                  01 TECH
                </span>
              </div>

              <div>
                <h4 
                  className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-[#FFCC00] transition-colors"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  CODEBASE & GITHUB
                </h4>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
                  Curate your public repositories with clean code, README documentation, deployed project demos, or course experiments.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#FFCC00]/15 flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Clean Git History</span>
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Live Demos</span>
            </div>
          </div>

          {/* 02 Creative Card */}
          <div 
            className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#0a1827] via-[#0d0d12] to-[#070709] border border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.12)] hover:border-sky-400 hover:shadow-[0_12px_40px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            style={getAnimStyle('checklistStepFade', 0.83, '0.6s')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-black/70 border border-sky-400/40 text-sky-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-400/20 transition-all duration-300 shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-lg border border-sky-400/25">
                  02 MEDIA
                </span>
              </div>

              <div>
                <h4 
                  className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-sky-400 transition-colors"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  PORTFOLIO & ASSETS
                </h4>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
                  Assemble your Figma mockups, event poster designs, video reels, motion clips, or photography showcases into a shareable link.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-sky-400/15 flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Figma Files</span>
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Showreels</span>
            </div>
          </div>

          {/* 03 Operations Card */}
          <div 
            className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#1c1405] via-[#0d0d12] to-[#070709] border border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.12)] hover:border-amber-400 hover:shadow-[0_12px_40px_rgba(251,191,36,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            style={getAnimStyle('checklistStepFade', 0.91, '0.6s')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-black/70 border border-amber-400/40 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300 shadow-sm">
                  <Mic2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/25">
                  03 ORATORY
                </span>
              </div>

              <div>
                <h4 
                  className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  STAGE & OPERATIONS
                </h4>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
                  Prepare your event organizing achievements, stage anchoring experiences, team management examples, or club contributions.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-amber-400/15 flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Event Logistics</span>
              <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded-md bg-black/60 border border-white/10">Public Speaking</span>
            </div>
          </div>

        </div>

        {/* Bottom Callout Bar */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 font-mono text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FFCC00]" />
            <span>Open to all department students across 1st years.</span>
          </div>
        </div>
      </section>

    </div>
  );
}

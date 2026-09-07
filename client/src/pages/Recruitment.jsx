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
  ArrowUpRight
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
              ROLES THAT YOU CAN BE CHOOSE
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

      {/* Role Brief Description Popup Modal */}
      {selectedRole && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedRole(null)}
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {(() => {
            const isRoleTech = selectedRole.division === 'Technical';
            const roleBorder = isRoleTech ? 'border-[#FFCC00]/40' : 'border-sky-400/40';
            const roleShadow = isRoleTech ? 'shadow-[0_0_50px_rgba(255,204,0,0.18)]' : 'shadow-[0_0_50px_rgba(56,189,248,0.18)]';
            const roleBg = isRoleTech ? 'bg-[#FFCC00]/10' : 'bg-sky-400/10';
            const roleText = isRoleTech ? 'text-[#FFCC00]' : 'text-sky-400';
            const roleBtn = isRoleTech ? 'bg-[#FFCC00] text-black hover:bg-[#FFE066]' : 'bg-sky-400 text-black hover:bg-sky-300';

            return (
              <div 
                className={`relative w-full max-w-xl max-h-[88vh] bg-[#0d0d0f] ${roleBorder} rounded-2xl ${roleShadow} flex flex-col overflow-hidden text-left animate-scaleUp`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${roleBg} border ${roleBorder} ${roleText} flex items-center justify-center shrink-0`}>
                      {React.createElement(roleIcons[selectedRole.id] || Sparkles, { className: 'w-5 h-5' })}
                    </div>
                    <div>
                      <span className={`font-mono text-[9px] ${roleText} uppercase tracking-widest block`}>
                        [{selectedRole.division.toUpperCase()} DIVISION]
                      </span>
                      <h3 
                        className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight"
                      >
                        {selectedRole.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRole(null)}
                    className={`w-8 h-8 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-400 hover:text-black ${
                      isRoleTech ? 'hover:bg-[#FFCC00] hover:border-[#FFCC00]' : 'hover:bg-sky-400 hover:border-sky-400'
                    } transition-all flex items-center justify-center shrink-0 ml-2 cursor-pointer`}
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Modal Content */}
                <div className="p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-xs text-zinc-300">
                  
                  {/* Tagline Badge */}
                  <div className={`font-mono text-xs ${roleText} ${roleBg} px-3 py-1.5 rounded-lg border ${roleBorder} inline-block`}>
                    // {selectedRole.tagline}
                  </div>

                  {/* Brief Description */}
                  <div className="p-3.5 rounded-xl bg-black border border-white/10 space-y-1">
                    <span className={`font-mono text-[9px] ${roleText} uppercase tracking-widest block`}>
                      // BRIEF_DESCRIPTION
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {selectedRole.description}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                      // KEY_RESPONSIBILITIES:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {selectedRole.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${roleText} font-mono text-xs font-bold shrink-0`}>›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Skills */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                      // PROFILE_EXPECTATIONS:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {selectedRole.skillsLookedFor.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/15 font-mono text-[10px] text-zinc-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-3.5 sm:p-4 border-t border-white/10 flex items-center justify-between font-mono text-xs shrink-0 bg-black/40">
                  <div className="text-zinc-500 text-[10px]">
                    <span className={`font-semibold uppercase tracking-wider ${roleText}`}>{selectedRole.division}</span>
                    <span className={`ml-2.5 ${roleText} font-bold`}>[STANDBY]</span>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className={`px-4 py-1.5 rounded-full ${roleBtn} font-mono text-xs font-bold active:scale-95 transition-all shadow-sm cursor-pointer`}
                  >
                    DISMISS
                  </button>
                </div>

              </div>
            );
          })()}
        </div>,
        document.body
      )}

      {/* 3. Preparation Checklist for Applicants */}
      <section 
        className="nothing-card p-8 border border-white/10 space-y-6"
        style={getAnimStyle('recruitBentoExpand', 0.65, '0.75s')}
      >
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">
            (CANDIDATE_GUIDE // PREPARATION)
          </span>
          <h3 
            className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            How to Prepare While in Standby
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div 
            className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors"
            style={getAnimStyle('checklistStepFade', 0.75, '0.6s')}
          >
            <span className="text-[#FFCC00] font-bold">[01] TECHNICAL TRACKS</span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Curate your GitHub profile with clean code repositories, personal projects, or course experiments.
            </p>
          </div>

          <div 
            className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors"
            style={getAnimStyle('checklistStepFade', 0.83, '0.6s')}
          >
            <span className="text-[#FFCC00] font-bold">[02] CREATIVE & MEDIA</span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Assemble your Figma mockups, poster designs, video edits, or photography samples into a shareable link.
            </p>
          </div>

          <div 
            className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors"
            style={getAnimStyle('checklistStepFade', 0.91, '0.6s')}
          >
            <span className="text-[#FFCC00] font-bold">[03] OPERATIONS & PUBLIC SPEAKING</span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Note down your event organizing experience, stage presentations, or school/college involvement.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

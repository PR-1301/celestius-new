import React, { useState, useEffect } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { recruitmentDivisions } from '../data/recruitmentData';

export default function Recruitment() {
  const [activeDivision, setActiveDivision] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 text-left space-y-16 animate-fadeIn">
      
      {/* 1. Dynamic Hero Section */}
      <section className="relative space-y-6 pt-2 pb-2">
        
        {/* Display Typography with Typewriter Effect */}
        <div className="space-y-5 max-w-4xl">
          <h1 
            className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            STAY TUNED. <br />
            <span className="text-[#FFCC00] inline-block min-h-[1.2em]">
              {displayText}
              <span className="inline-block w-3 sm:w-4 h-7 sm:h-12 bg-[#FFCC00] ml-1.5 align-middle animate-pulse" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
            We are not opening applications right now, but recruitment for our upcoming semester cohort will begin shortly. Review the role specifications below, prepare your GitHub or portfolios, and register to receive an instant dispatch the moment submissions go live.
          </p>
        </div>

      </section>

      {/* 2. Interactive Role Directory & Division Switcher */}
      <section id="roles-taxonomy" className="space-y-8 scroll-mt-28">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">
              (TAXONOMY // DISCIPLINES)
            </span>
            <h2 
              className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Available Roles & Tracks
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              [ CLICK ANY ROLE CARD TO VIEW BRIEF SPECIFICATIONS POPUP ]
            </p>
          </div>

          {/* Filter Pill Switcher with Celestius Gold Active Tab */}
          <div className="flex items-center gap-1 bg-black p-1 rounded-full border border-white/15">
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
                  ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              NON_TECHNICAL [5]
            </button>
          </div>
        </div>

        {/* Roles Grid (Unique Cyber-Minimalist Bento Cards with Popups) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {getDisplayedRoles().map((role) => {
            const IconComp = roleIcons[role.id] || Sparkles;
            const isTech = role.division === 'Technical';

            return (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border border-white/10 bg-gradient-to-b from-[#0e0e0e] to-black hover:border-[#FFCC00] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(255,204,0,0.14)] flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient radial glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Tech corner crosshair accent */}
                <div className="absolute top-3 right-3 font-mono text-[11px] text-zinc-600 group-hover:text-[#FFCC00] group-hover:rotate-90 transition-all duration-300 select-none">
                  +
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon + Division Pill */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/15 text-[#FFCC00] group-hover:border-[#FFCC00] group-hover:bg-[#FFCC00]/15 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-sm">
                      <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isTech 
                          ? 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/30' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                      }`}>
                        [{role.division.toUpperCase()}]
                      </span>
                    </div>
                  </div>

                  {/* Team Title & Tagline */}
                  <div>
                    <h3 
                      className="font-ndot text-2xl sm:text-3xl tracking-wide uppercase text-white group-hover:text-[#FFCC00] transition-colors"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {role.name}
                    </h3>
                    <p className="font-mono text-xs text-zinc-400 mt-1 line-clamp-2">
                      {role.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tag & Popup Trigger */}
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] relative z-10">
                  <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    CIT.ROLE_{role.id.toUpperCase()}
                  </span>
                  <span className="text-[#FFCC00] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>VIEW BRIEF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Role Brief Description Popup Modal (Rendered directly in body via Portal to eliminate layout offsets and excess space) */}
      {selectedRole && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedRole(null)}
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            className="relative w-full max-w-xl max-h-[88vh] bg-[#0d0d0f] border border-[#FFCC00]/40 rounded-2xl shadow-[0_0_50px_rgba(255,204,0,0.18)] flex flex-col overflow-hidden text-left animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFCC00]/10 border border-[#FFCC00]/30 text-[#FFCC00] flex items-center justify-center shrink-0">
                  {React.createElement(roleIcons[selectedRole.id] || Sparkles, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#FFCC00] uppercase tracking-widest block">
                    [{selectedRole.division.toUpperCase()} DIVISION]
                  </span>
                  <h3 
                    className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    {selectedRole.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedRole(null)}
                className="w-8 h-8 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-400 hover:text-black hover:bg-[#FFCC00] hover:border-[#FFCC00] transition-all flex items-center justify-center shrink-0 ml-2"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-xs text-zinc-300">
              
              {/* Tagline Badge */}
              <div className="font-mono text-xs text-[#FFCC00] bg-[#FFCC00]/10 px-3 py-1.5 rounded-lg border border-[#FFCC00]/25 inline-block">
                // {selectedRole.tagline}
              </div>

              {/* Brief Description */}
              <div className="p-3.5 rounded-xl bg-black border border-white/10 space-y-1">
                <span className="font-mono text-[9px] text-[#FFCC00] uppercase tracking-widest block">
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
                      <span className="text-[#FFCC00] font-mono text-xs font-bold shrink-0">›</span>
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
                <span>CIT.ROLE_{selectedRole.id.toUpperCase()}</span>
                <span className="ml-2.5 text-[#FFCC00] font-bold">[STANDBY]</span>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="px-4 py-1.5 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-sm"
              >
                DISMISS
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* 3. Preparation Checklist for Applicants */}
      <section className="nothing-card p-8 border border-white/10 space-y-6">
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
          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors">
            <span className="text-[#FFCC00] font-bold">[01] TECHNICAL TRACKS</span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Curate your GitHub profile with clean code repositories, personal projects, or course experiments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors">
            <span className="text-[#FFCC00] font-bold">[02] CREATIVE & MEDIA</span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Assemble your Figma mockups, poster designs, video edits, or photography samples into a shareable link.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2 hover:border-[#FFCC00]/40 transition-colors">
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

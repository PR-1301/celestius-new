import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Code2, 
  Palette, 
  Megaphone,
  CalendarCheck,
  Mic2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { teamData } from '../data/teamData';

// Fixed 3 distinct accent colors strictly per category:
// 1. Technical -> Yellow (#FFCC00)
// 2. Events -> Purple (#a855f7)
// 3. Non-Technical (Design, Social Media, PS) -> Aqua (#38bdf8)
const CATEGORY_CONFIG = {
  technical: {
    label: "TECHNICAL",
    accent: "#FFCC00",
    badgeBg: "bg-[#FFCC00]/10",
    badgeBorder: "border-[#FFCC00]/30",
    badgeText: "text-[#FFCC00]",
    cardBorder: "border-[#FFCC00]/25 hover:border-[#FFCC00]/70",
    cardGlow: "group-hover:shadow-[0_16px_40px_rgba(255,204,0,0.18)]",
    ambientFrom: "from-[#FFCC00]/12",
    iconBoxBg: "bg-[#FFCC00]/10",
    iconBoxBorder: "border-[#FFCC00]/30 group-hover:border-[#FFCC00]",
    iconColor: "text-[#FFCC00]",
    titleHover: "group-hover:text-[#FFCC00]",
    lineBg: "bg-[#FFCC00]/20",
    linkHover: "hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00]"
  },
  events: {
    label: "EVENTS",
    accent: "#a855f7",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-400",
    cardBorder: "border-purple-500/25 hover:border-purple-500/70",
    cardGlow: "group-hover:shadow-[0_16px_40px_rgba(168,85,247,0.18)]",
    ambientFrom: "from-purple-500/12",
    iconBoxBg: "bg-purple-500/10",
    iconBoxBorder: "border-purple-500/30 group-hover:border-purple-400",
    iconColor: "text-purple-400",
    titleHover: "group-hover:text-purple-400",
    lineBg: "bg-purple-500/20",
    linkHover: "hover:bg-purple-500 hover:text-white hover:border-purple-500"
  },
  nonTechnical: {
    label: "NON-TECHNICAL",
    accent: "#38bdf8",
    badgeBg: "bg-sky-400/10",
    badgeBorder: "border-sky-400/30",
    badgeText: "text-sky-400",
    cardBorder: "border-sky-400/25 hover:border-sky-400/70",
    cardGlow: "group-hover:shadow-[0_16px_40px_rgba(56,189,248,0.18)]",
    ambientFrom: "from-sky-400/12",
    iconBoxBg: "bg-sky-400/10",
    iconBoxBorder: "border-sky-400/30 group-hover:border-sky-400",
    iconColor: "text-sky-400",
    titleHover: "group-hover:text-sky-400",
    lineBg: "bg-sky-400/20",
    linkHover: "hover:bg-sky-400 hover:text-black hover:border-sky-400"
  }
};

export default function Team({ introCompleted = true }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const wasIntroPlayingOnMount = useRef(!introCompleted);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        wasIntroPlayingOnMount.current = false;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  const getAnimStyle = (animName, delaySec, duration = '0.55s') => {
    if (!introCompleted) {
      return { opacity: 0 };
    }
    const base = wasIntroPlayingOnMount.current ? 0.35 : 0.0;
    return {
      animation: `${animName} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${(base + delaySec).toFixed(2)}s both`
    };
  };

  const getRoleIcon = (role) => {
    const r = role.toLowerCase();
    if (r.includes('tech')) return Code2;
    if (r.includes('design')) return Palette;
    if (r.includes('social')) return Megaphone;
    if (r.includes('event')) return CalendarCheck;
    if (r.includes('ps') || r.includes('public')) return Mic2;
    return Sparkles;
  };

  const filteredMembers = teamData.filter(member => {
    if (activeFilter === 'all') return true;
    return member.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left space-y-12 select-none">
      
      {/* 1. Header Section: Minimal Cyber HUD */}
      <section className="relative space-y-5 border-b border-white/10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Top Tag */}
            <div 
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[11px] text-[#FFCC00] font-bold tracking-wider uppercase"
              style={getAnimStyle('recruitSlideLeft', 0.02, '0.55s')}
            >
              <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
              <span>CELESTIUS // LEADERSHIP_CORE // 8 DIRECTORS</span>
            </div>

            {/* Main Title */}
            <h1 
              className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
              style={getAnimStyle('recruitFadeUp', 0.06, '0.6s')}
            >
              TEAM LEADERSHIP
            </h1>

            {/* Description */}
            <p 
              className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl"
              style={getAnimStyle('recruitFadeUp', 0.1, '0.6s')}
            >
              Meet the directors leading Celestius across engineering, live symposiums, creative design, and community discourse.
            </p>
          </div>

          {/* Color Key Indicator Bar */}
          <div 
            className="flex items-center gap-4 p-3 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md text-xs font-mono"
            style={getAnimStyle('recruitFadeUp', 0.12, '0.6s')}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] shadow-[0_0_8px_#FFCC00]" />
              <span className="text-zinc-300">TECHNICAL</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <span className="text-zinc-300">EVENTS</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="text-zinc-300">NON-TECH</span>
            </div>
          </div>
        </div>

        {/* 2. Filter Capsule Controls */}
        <div 
          className="pt-2 flex flex-wrap items-center gap-2.5"
          style={getAnimStyle('recruitFadeUp', 0.14, '0.6s')}
        >
          {[
            { id: 'all', label: `ALL LEADS [${teamData.length}]` },
            { id: 'technical', label: `TECHNICAL [${teamData.filter(m => m.category === 'technical').length}]`, color: '#FFCC00' },
            { id: 'events', label: `EVENTS [${teamData.filter(m => m.category === 'events').length}]`, color: '#a855f7' },
            { id: 'nonTechnical', label: `NON-TECHNICAL [${teamData.filter(m => m.category === 'nonTechnical').length}]`, color: '#38bdf8' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Dedicated Separate Bento Team Cards Grid (No Popups, No Terminals, Separate Cards) */}
      <section className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => {
            const config = CATEGORY_CONFIG[member.category] || CATEGORY_CONFIG.technical;
            const RoleIcon = getRoleIcon(member.role);

            return (
              <div
                key={member.id}
                className={`group relative rounded-3xl p-6 bg-[#0a0a0f]/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 ${config.cardBorder} ${config.cardGlow}`}
                style={getAnimStyle('recruitFadeUp', 0.1 + index * 0.04, '0.55s')}
              >
                {/* Ambient Corner Glow */}
                <div 
                  className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${config.ambientFrom} to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />

                {/* Card Top: Role Badge & Icon Box */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    {/* Monospace Lead Tag Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.badgeBg} border ${config.badgeBorder} font-mono text-[10px] ${config.badgeText} font-bold tracking-wider uppercase`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.accent }} />
                      {member.leadTag}
                    </span>

                    {/* Role Icon */}
                    <div className={`w-9 h-9 rounded-xl ${config.iconBoxBg} border ${config.iconBoxBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                      <RoleIcon className={`w-4 h-4 ${config.iconColor}`} />
                    </div>
                  </div>

                  {/* Member Name */}
                  <h3 className={`font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight transition-colors duration-200 ${config.titleHover}`}>
                    {member.name}
                  </h3>

                  {/* Member Official Role */}
                  <p className="font-mono text-xs font-semibold tracking-wider text-zinc-300 mt-1 uppercase">
                    {member.role}
                  </p>

                  {/* Domain / Focus */}
                  <p className="font-sans text-xs text-zinc-400 mt-2 line-clamp-1">
                    {member.domain}
                  </p>

                  {/* Bio */}
                  <p className="font-sans text-xs text-zinc-400/90 mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Skills Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 font-mono text-[10px] text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Division & Pure GitHub / LinkedIn Icons */}
                <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                      DIVISION
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-300 uppercase">
                      {member.division}
                    </span>
                  </div>

                  {/* ONLY GitHub & LinkedIn Icons */}
                  <div className="flex items-center gap-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-200 ${config.linkHover}`}
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-200 ${config.linkHover}`}
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Footer Strip */}
      <section 
        className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500"
        style={getAnimStyle('recruitFadeUp', 0.35, '0.6s')}
      >
        <span>CELESTIUS // LEADERSHIP ARCHITECTURE // CIT CHENNAI</span>
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400">ACTIVE DIRECTORS ROSTER</span>
        </div>
      </section>

    </div>
  );
}

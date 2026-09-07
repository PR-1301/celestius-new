import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { teamData } from '../data/teamData';

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'ALL_MEMBERS' },
    { id: 'core', label: 'EXECUTIVE_BOARD' },
    { id: 'technical', label: 'TECH_LEADS' },
    { id: 'operations', label: 'OPERATIONS_PR' },
    { id: 'advisory', label: 'ADVISORY' }
  ];

  const filteredTeam = teamData.filter((member) => {
    if (activeFilter === 'all') return true;
    return member.category === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 text-left space-y-12 animate-fadeIn">
      
      {/* Header section */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
          <span>(DIRECTORY // COHORT_LEADERSHIP)</span>
        </div>

        <h1 className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          Our Team
        </h1>

        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          The student engineers, creative leads, and faculty advisors directing initiatives at Celestius, Chennai Institute of Technology.
        </p>
      </div>

      {/* Filter Tabs with Celestius Gold */}
      <div className="flex items-center gap-1.5 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3.5 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                : 'bg-black text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            [{filter.label}]
          </button>
        ))}
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member, idx) => (
          <div
            key={member.id}
            className="nothing-card p-6 flex flex-col justify-between space-y-6 group hover:border-[#FFCC00]/40"
          >
            <div className="space-y-4">
              {/* Header with Pixel Initial Box */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-black border border-white/20 flex items-center justify-center font-ndot text-[#FFCC00] text-base tracking-wider group-hover:border-[#FFCC00]/60 group-hover:bg-[#FFCC00]/10 transition-colors">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/25 uppercase">
                  [{member.category}]
                </span>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="font-ndot text-lg text-white group-hover:text-[#FFCC00] transition-colors tracking-wide uppercase">
                  {member.name}
                </h3>
                <p className="font-mono text-xs text-[#FFCC00]">
                  {member.role}
                </p>
                <p className="font-sans text-[11px] text-zinc-400">
                  {member.department}
                </p>
              </div>

              {/* Bio */}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                    aria-label={`${member.name} Email`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <span className="font-mono text-[9px] text-zinc-600">
                CIT // CEL_{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

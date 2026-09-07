import React, { useState } from 'react';
import { Search, Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { eventsData } from '../data/eventsData';

export default function Events({ setSelectedEvent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Workshop', 'Cybersecurity', 'Open Source', 'DevOps'];

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      (event.tracks && event.tracks.some(t => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 text-left space-y-12 animate-fadeIn">
      
      {/* Header section */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
          <span>(SCHEDULE // CALENDAR_2026)</span>
        </div>

        <h1 className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          Events & Workshops
        </h1>

        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          National hackathons, engineering bootcamps, and CTF challenges curated by Celestius for students at Chennai Institute of Technology.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        
        {/* Category Pills with Celestius Gold */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                  : 'bg-black text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="FILTER_TOPICS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
          />
        </div>

      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-2xl bg-black border border-white/10 font-mono text-xs">
          <p className="text-zinc-400">NO_ENTRIES_FOUND_MATCHING_QUERY</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-[#FFCC00] underline hover:opacity-80"
          >
            [CLEAR_FILTERS]
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="nothing-card p-6 flex flex-col justify-between space-y-6 group hover:border-[#FFCC00]/40"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/25">
                    [{event.category.toUpperCase()}]
                  </span>
                  <span className="font-mono text-[#FFCC00] flex items-center gap-1.5">
                    {event.status === 'Registrations Open' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />}
                    [{event.status.toUpperCase()}]
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-ndot text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-[#FFCC00] transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Meta details */}
                <div className="space-y-1.5 pt-2 font-mono text-[11px] text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  {event.prizePool && (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                      <span>{event.prizePool}</span>
                    </div>
                  )}
                </div>

                {/* Tracks list */}
                {event.tracks && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {event.tracks.slice(0, 3).map((t, i) => (
                      <span key={i} className="font-mono text-[9px] px-2 py-0.5 rounded bg-black text-zinc-400 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] transition-colors shadow-sm"
                >
                  <span>INSPECT_SCHEDULE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

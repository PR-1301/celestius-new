import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [registered, setRegistered] = useState(false);
  const [regData, setRegData] = useState({ name: '', email: '', regNo: '' });
  const [showRegForm, setShowRegForm] = useState(false);

  if (!event) return null;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regData.name && regData.email) {
      setRegistered(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0d] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black border border-white/15 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
              [{event.category.toUpperCase()}]
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
              STATUS: {event.status.toUpperCase()}
            </span>
          </div>

          <h2 className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase">
            {event.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-black border border-white/10 font-mono text-xs">
          <div className="flex items-start gap-2 text-zinc-300">
            <Calendar className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
            <div>
              <span className="block text-zinc-500 text-[10px] uppercase">DATE:</span>
              <span className="text-white text-[11px]">{event.date}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
            <div>
              <span className="block text-zinc-500 text-[10px] uppercase">TIME:</span>
              <span className="text-white text-[11px]">{event.time}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
            <div>
              <span className="block text-zinc-500 text-[10px] uppercase">LOCATION:</span>
              <span className="text-white text-[11px]">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Tracks */}
        {event.tracks && (
          <div className="space-y-2 mb-6">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              // DISCIPLINES_COVERED:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {event.tracks.map((track, i) => (
                <span 
                  key={i} 
                  className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-black text-zinc-300 border border-white/10"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites & Rewards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-1">
            <span className="block text-zinc-500 text-[10px] uppercase">// PREREQUISITES:</span>
            <p className="font-sans text-xs text-zinc-300">{event.prerequisites || 'Open to all CIT students.'}</p>
          </div>
          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-1">
            <span className="block text-zinc-500 text-[10px] uppercase">// PRIZE_OR_AWARD:</span>
            <div className="flex items-center gap-1.5 text-white font-sans text-xs font-semibold">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>{event.prizePool}</span>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="space-y-3 mb-6 font-mono text-xs">
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-400">
              // ITINERARY_TIMELINE:
            </h4>
            <div className="space-y-2 border-l border-white/20 ml-2 pl-3">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="relative text-[11px]">
                  <div className="absolute -left-[17px] top-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-zinc-500 mr-2">[{item.time}]</span>
                  <span className="text-zinc-200 font-sans">{item.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action / Registration */}
        <div className="pt-4 border-t border-white/10 font-mono text-xs">
          {registered ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/20 flex items-center gap-3 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#d92638] shrink-0" />
              <div>
                <p className="font-bold">REGISTRATION_LOGGED: CONFIRMED</p>
                <p className="font-sans text-[11px] text-zinc-400">We have recorded your details. Check your college inbox for event dispatch.</p>
              </div>
            </div>
          ) : showRegForm ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <h4 className="font-mono text-xs text-white uppercase">// REGISTER_CANDIDATE:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"
                />
                <input
                  type="email"
                  required
                  placeholder="College Email (@citchennai.net)"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"
                />
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowRegForm(false)}
                  className="px-3 py-1.5 rounded-full font-mono text-xs text-zinc-400 hover:text-white"
                >
                  [CANCEL]
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  CONFIRM_REGISTRATION
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-zinc-500">
                {event.status === 'Completed' ? '// SESSION_CONCLUDED' : '// CIT_STUDENT_OPEN_ADMISSION'}
              </span>
              {event.status !== 'Completed' ? (
                <button
                  onClick={() => setShowRegForm(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  <span>REGISTER_SLOT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-black border border-white/20 font-mono text-xs text-zinc-400 hover:text-white"
                >
                  [DISMISS]
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

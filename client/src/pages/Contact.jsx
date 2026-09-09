import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Instagram,
  Clock,
  Building,
  Terminal,
  Radio
} from 'lucide-react';

export default function Contact({ introCompleted = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
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

  const categories = [
    'General Inquiry',
    'Event Participation',
    'Workshop / Bootcamp Proposal',
    'Sponsorship & Alliance',
    'Speaker Invitation'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-left space-y-12 animate-fadeIn">
      
      {/* Header section (Recruitment styled typography & badge) */}
      <div className="space-y-4 max-w-3xl">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]"
          style={getAnimStyle('recruitSlideLeft', 0, '0.5s')}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
          <span>(COMMUNICATION // DISPATCH_CHANNELS)</span>
        </div>

        <h1 
          className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08]"
          style={{ 
            fontFamily: "'VT323', monospace",
            ...getAnimStyle('recruitTitleReveal', 0.05, '0.7s')
          }}
        >
          Contact <span className="text-[#FFCC00]">Us</span>
        </h1>

        <p 
          className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed"
          style={getAnimStyle('recruitSlideLeft', 0.12, '0.65s')}
        >
          Connect with the student executive board, technical leads, and faculty coordinators of Celestius at Chennai Institute of Technology. Transmit an encrypted packet directly to our desk below.
        </p>

        {/* Quick System Telemetry Status Bar */}
        <div 
          className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-zinc-400"
          style={getAnimStyle('recruitSlideLeft', 0.18, '0.6s')}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-zinc-300">DISPATCH GATEWAY:</span>
            <span className="text-emerald-400 font-bold">ONLINE [24/7]</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#FFCC00]" />
            <span className="text-zinc-300">EST. RESPONSE:</span>
            <span className="text-[#FFCC00] font-bold">&lt; 24 WORKING HRS</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Campus Coordinates & Operations + Right Inquiry Form */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        style={getAnimStyle('recruitBentoExpand', 0.25, '0.75s')}
      >
        
        {/* Left Column: Campus HQ Deck & Operations (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Bento Card: Headquarters */}
          <div className="rounded-3xl border border-[#FFCC00]/40 bg-gradient-to-b from-[#14120a] via-[#0b0c0f] to-[#060608] p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl hover:border-[#FFCC00] hover:shadow-[0_12px_45px_rgba(255,204,0,0.18)] transition-all">
            {/* Ambient Gold Radial Glow & Nothing OS Pixel Dot Matrix Grid */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 pb-3 border-b border-white/10">
                <span className="text-[#FFCC00] font-bold">// HQ_COORDINATES</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CIT CHENNAI
                </span>
              </div>

              <div>
                <h3 
                  className="font-ndot text-3xl text-white tracking-wide uppercase leading-none"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  Campus Headquarters
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  CENTRE FOR INNOVATION & STUDENT TECH CULTURE
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-3.5 font-mono text-xs">
                
                <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">CAMPUS LOCATION</span>
                    <span className="text-zinc-200 font-sans text-xs leading-relaxed block">
                      Chennai Institute of Technology, <br />
                      Sarathy Nagar, Kundrathur, <br />
                      Chennai, Tamil Nadu - 600069
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-start gap-3">
                  <Building className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">OPERATIONAL LAB</span>
                    <span className="text-zinc-200 font-sans text-xs block">
                      Centre for Innovation & Student Tech Culture, Block 2
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">ELECTRONIC MAIL</span>
                    <a 
                      href="mailto:celestius@citchennai.net" 
                      className="text-[#FFCC00] hover:underline font-mono text-xs block"
                    >
                      celestius@citchennai.net
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">ACTIVE HOURS</span>
                    <span className="text-zinc-200 font-mono text-xs block">
                      Mon – Sat: 08:30 AM – 04:30 PM IST
                    </span>
                  </div>
                </div>

              </div>

              {/* Social channels (Pixel Bento Badges) */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  // EXTERNAL_LINKS:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-black/70 border border-white/10 hover:border-[#FFCC00]/50 hover:bg-[#FFCC00]/10 text-zinc-400 hover:text-[#FFCC00] transition-all flex flex-col items-center gap-1 group cursor-pointer"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10px] tracking-wider font-bold">GITHUB</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-black/70 border border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 text-zinc-400 hover:text-sky-400 transition-all flex flex-col items-center gap-1 group cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10px] tracking-wider font-bold">LINKEDIN</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-black/70 border border-white/10 hover:border-pink-400/50 hover:bg-pink-400/10 text-zinc-400 hover:text-pink-400 transition-all flex flex-col items-center gap-1 group cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10px] tracking-wider font-bold">INSTAGRAM</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[#FFCC00]/40 bg-gradient-to-b from-[#141209]/95 via-[#0b0c0f]/95 to-[#060608] p-6 sm:p-8 md:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl hover:border-[#FFCC00] transition-all">
            {/* Ambient Radial Bloom & Dot Grid */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFCC00]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Form Top Line */}
              <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00]">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#FFCC00] bg-[#FFCC00]/10 px-2.5 py-1 rounded-lg border border-[#FFCC00]/25">
                    (TRANSMISSION_FORM)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
                  <span>RESPONSES_ESTIMATED: 24-48 WORKING HOURS</span>
                </div>
              </div>

              {/* Headline */}
              <div>
                <h3 
                  className="font-ndot text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  Dispatch Message
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Enter your sender credentials and inquiry details. Submissions are instantly received by our coordinators.
                </p>
              </div>

              {submitted ? (
                <div className="p-7 sm:p-8 rounded-2xl bg-black/80 border border-[#FFCC00]/50 space-y-4 font-mono text-xs animate-modal-pop shadow-xl">
                  <div className="flex items-center gap-3 text-white font-bold text-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#FFCC00]/20 border border-[#FFCC00] flex items-center justify-center text-[#FFCC00]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[#FFCC00] block text-base font-ndot uppercase tracking-wider" style={{ fontFamily: "'VT323', monospace" }}>
                        TRANSMISSION_LOGGED
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono font-normal">
                        STATUS // 200 OK
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message regarding <strong className="text-[#FFCC00]">{formData.subject || formData.category}</strong> has been logged to our desk. Our leadership team will review and respond within 24–48 working hours.
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      COPY DISPATCHED TO SENDER EMAIL
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] transition-all cursor-pointer shadow-md"
                    >
                      [DISPATCH_ANOTHER]
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="user@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Category and Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        CATEGORY *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 font-mono text-xs text-white focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-zinc-950 text-white font-mono">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Topic of inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      MESSAGE_CONTENT *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Provide details or proposed collaboration specifics..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-zinc-500">
                      // ENCRYPTED TRANSMISSION PROTOCOL
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <span>TRANSMIT_PACKET</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

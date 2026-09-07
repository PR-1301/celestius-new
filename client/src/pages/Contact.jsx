import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Instagram,
  Clock,
  Building
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 text-left space-y-12 animate-fadeIn">
      
      {/* Header section */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
          <span>(COMMUNICATION // DISPATCH_CHANNELS)</span>
        </div>

        <h1 className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          Contact Us
        </h1>

        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          Connect with the student executive board, technical leads, and faculty coordinators of Celestius at Chennai Institute of Technology.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Campus Coordinates & Operations */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="nothing-card p-6 sm:p-8 space-y-6 hover:border-[#FFCC00]/40">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="text-[#FFCC00]">(HQ_COORDINATES)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
            </div>

            <h3 className="font-ndot text-xl text-white uppercase tracking-wide">
              Campus Headquarters
            </h3>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">CAMPUS LOCATION:</span>
                  <span className="font-sans text-xs text-zinc-300 leading-relaxed block mt-0.5">
                    Chennai Institute of Technology, <br />
                    Sarathy Nagar, Kundrathur, <br />
                    Chennai, Tamil Nadu - 600069
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">OPERATIONAL LAB:</span>
                  <span className="font-sans text-xs text-zinc-300 block mt-0.5">
                    Centre for Innovation & Student Tech Culture, Block 2
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">ELECTRONIC MAIL:</span>
                  <a href="mailto:celestius@citchennai.net" className="text-[#FFCC00] hover:underline block mt-0.5">
                    celestius@citchennai.net
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">ACTIVE HOURS:</span>
                  <span className="font-sans text-xs text-zinc-300 block mt-0.5">
                    Mon – Sat: 08:30 AM – 04:30 PM IST
                  </span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-3">
                // EXTERNAL_LINKS:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/40 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="nothing-card p-6 sm:p-8 space-y-6 hover:border-[#FFCC00]/40">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="text-[#FFCC00]">(TRANSMISSION_FORM)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
            </div>

            <div>
              <h3 className="font-ndot text-xl text-white uppercase tracking-wide">
                Dispatch Message
              </h3>
              <p className="font-mono text-[11px] text-zinc-500 mt-1">
                RESPONSES_ESTIMATED: 24-48 WORKING HOURS
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-black border border-[#FFCC00]/30 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#FFCC00]" />
                  <span>TRANSMISSION_LOGGED</span>
                </div>
                <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your message regarding <strong className="text-[#FFCC00]">{formData.subject || formData.category}</strong> has been received by our desk.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
                  }}
                  className="mt-2 text-[#FFCC00] underline"
                >
                  [DISPATCH_ANOTHER]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase">
                      NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="user@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase">
                      CATEGORY *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 font-mono text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    >
                      <option>General Inquiry</option>
                      <option>Event Participation</option>
                      <option>Workshop / Boot Camp Proposal</option>
                      <option>Sponsorship & Corporate Alliance</option>
                      <option>Speaker Invitation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Topic of inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase">
                    MESSAGE_CONTENT *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details or proposed collaboration specifics..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-md shadow-[#FFCC00]/15"
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
  );
}

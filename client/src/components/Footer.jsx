import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import PolicyModal from './PolicyModal';

export default function Footer({ setActivePage, onReplayIntro }) {
  const [activePolicy, setActivePolicy] = useState(null);
  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="w-full bg-[#050507] border-t border-[#FFCC00]/20 text-zinc-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#FFCC00]/15 text-left">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Celestius Logo" className="h-7 w-auto object-contain" />
            </div>

            <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-md">
              The premier student-driven technical society of Chennai Institute of Technology. 
              Fostering software engineering, open-source innovation, research exploration, and high-impact systems.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/50 hover:bg-[#FFCC00]/5 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/50 hover:bg-[#FFCC00]/5 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/50 hover:bg-[#FFCC00]/5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="mailto:celestius@citchennai.net" 
                className="p-2 rounded-lg bg-black border border-white/10 text-zinc-400 hover:text-[#FFCC00] hover:border-[#FFCC00]/50 hover:bg-[#FFCC00]/5 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">// DIRECTORY</h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button 
                  onClick={() => handlePageChange('home')}
                  className="hover:text-[#FFCC00] transition-colors text-left text-zinc-300"
                >
                  [01] HOME // OVERVIEW
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('events')}
                  className="hover:text-[#FFCC00] transition-colors text-left text-zinc-300"
                >
                  [02] EVENTS // HACKATHONS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('team')}
                  className="hover:text-[#FFCC00] transition-colors text-left text-zinc-300"
                >
                  [03] TEAM // LEADERSHIP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('recruitment')}
                  className="hover:text-[#FFE066] transition-colors text-left flex items-center gap-1 text-[#FFCC00] font-semibold"
                >
                  <span>[04] RECRUITMENT</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('contact')}
                  className="hover:text-[#FFCC00] transition-colors text-left text-zinc-300"
                >
                  [05] CONTACT // CHANNELS
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Details Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">// INSTITUTION</h4>
            <div className="font-mono text-xs space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC00] shrink-0 mt-0.5" />
                <span className="font-sans text-xs text-zinc-300 leading-snug">
                  Chennai Institute of Technology, <br />
                  Sarathy Nagar, Kundrathur, <br />
                  Chennai, Tamil Nadu - 600069
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                <a href="mailto:celestius@citchennai.net" className="text-[#FFCC00] hover:underline">
                  celestius@citchennai.net
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & policy links row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <p className="text-zinc-400">© {new Date().getFullYear()} <span className="text-[#FFCC00] font-bold">CELESTIUS</span>. CIT CHENNAI. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setActivePolicy('privacy')}
              className="text-zinc-400 hover:text-[#FFCC00] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-zinc-700">//</span>
            <button
              type="button"
              onClick={() => setActivePolicy('refund')}
              className="text-zinc-400 hover:text-[#FFCC00] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>
        </div>

      </div>

      {/* Privacy Policy & Refund Policy Modal Popup */}
      {activePolicy && (
        <PolicyModal 
          type={activePolicy} 
          onClose={() => setActivePolicy(null)} 
        />
      )}
    </footer>
  );
}

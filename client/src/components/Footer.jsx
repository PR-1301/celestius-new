import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import PolicyModal from './PolicyModal';

export default function Footer({ setActivePage }) {
  const [activePolicy, setActivePolicy] = useState(null);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { id: 'home', code: '01', label: 'Home' },
    { id: 'events', code: '02', label: 'Events' },
    { id: 'team', code: '03', label: 'Team' },
    { id: 'recruitment', code: '04', label: 'Recruitment', badge: 'Standby' },
    { id: 'contact', code: '05', label: 'Contact' }
  ];

  return (
    <footer className="relative w-full bg-[#060609] border-t border-white/10 text-zinc-400 mt-28 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#FFCC00]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-sky-400/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 text-left">
          
          {/* Column 1: Brand & Bio (6 cols) */}
          <div className="md:col-span-6 space-y-5">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3">
              <div>
                <span 
                  className="font-ndot text-3xl sm:text-4xl text-white tracking-wider uppercase leading-none block font-bold"
                  style={{ fontFamily: "'VT323', monospace", color: 'gold' }}
                >
                  CELESTIUS
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mt-0.5">
                  CHENNAI INSTITUTE OF TECHNOLOGY
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              The premier student-driven technical society of Chennai Institute of Technology. 
              Architecting open-source software, competitive engineering systems, artificial intelligence, and digital craftsmanship.
            </p>

            {/* Minimal Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#FFCC00]/50 text-zinc-400 hover:text-[#FFCC00] hover:bg-[#FFCC00]/10 transition-all flex items-center justify-center cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 hover:border-sky-400/50 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all flex items-center justify-center cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#FFCC00]/50 text-zinc-400 hover:text-[#FFCC00] hover:bg-[#FFCC00]/10 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="mailto:celestius@citchennai.net" 
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 hover:border-sky-400/50 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) - Clean text without bulky containers */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-[#FFCC00] font-bold uppercase tracking-widest flex items-center gap-2">
              Navigation
            </h4>

            <ul className="space-y-3 font-mono text-xs">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handlePageChange(item.id)}
                    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <span className="text-zinc-600 group-hover:text-[#FFCC00] transition-colors">
                      [{item.code}]
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                    {item.badge ? (
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/30 animate-pulse">
                        {item.badge}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-[#FFCC00] transition-all" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Campus & Contact (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest flex items-center gap-2">
              Institution
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <span className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Chennai Institute of Technology,<br />
                  Sarathy Nagar, Kundrathur,<br />
                  Chennai, Tamil Nadu - 600069
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href="mailto:celestius@citchennai.net" 
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  celestius@citchennai.net
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright on Left, Privacy & Refund Policies on the Right */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p className="text-zinc-400 text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-[#FFCC00] font-bold">CELESTIUS</span>. CIT CHENNAI. ALL RIGHTS RESERVED.
          </p>

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

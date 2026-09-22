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
    { id: 'team', code: '03', label: 'WE' },
    { id: 'recruitment', code: '04', label: 'Recruitment' },
    { id: 'contact', code: '05', label: 'Contact' }
  ];

  return (
    <footer className="relative w-full bg-[#050508] border-t border-white/10 text-zinc-400 mt-28 overflow-hidden select-none">
      {/* Top subtle neon horizon accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFCC00]/50 to-transparent" />

      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#FFCC00]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-sky-400/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-28 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 text-left">
          
          {/* Column 1: Brand & Bio (6 cols) */}
          <div className="md:col-span-6 space-y-5">
            {/* Logo + Motto Below (matching Navbar) */}
            <div className="flex flex-col items-start gap-1">
              <img 
                src={logoImg} 
                alt="Celestius · Chennai Institute of Technology" 
                className="h-8 sm:h-9 w-auto object-contain shrink-0 drop-shadow-[0_0_12px_rgba(255,204,0,0.3)]"
              />
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 tracking-wider">
                Innovate. Build. Collaborate.
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              The student-led engineering & innovation community at Chennai Institute of Technology. Fostering software development, creative media, and hackathons.
            </p>

            {/* Minimal Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://github.com/Club-Celestius" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FFCC00]/50 text-zinc-400 hover:text-[#FFCC00] hover:bg-[#FFCC00]/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.linkedin.com/company/club-celestius-cit/" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/50 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.instagram.com/celestius_cit/" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FFCC00]/50 text-zinc-400 hover:text-[#FFCC00] hover:bg-[#FFCC00]/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://chat.whatsapp.com/HP3gqZe9BFPDqu1qowiurT" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#25D366]/60 text-zinc-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="WhatsApp Community"
                title="WhatsApp Community"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current transition-transform group-hover:scale-110">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.245-.586-.494-.506-.677-.516-.175-.01-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508 0 1.479 1.078 2.908 1.228 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.721.23 1.377.198 1.896.12.578-.087 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.577-.35zM12.042 21.84c-1.77 0-3.504-.475-5.029-1.375l-.36-.213-3.738.98.997-3.644-.235-.374a9.78 9.78 0 0 1-1.502-5.234c0-5.419 4.409-9.828 9.832-9.828 2.625 0 5.093 1.023 6.949 2.88 1.856 1.856 2.878 4.325 2.877 6.95 0 5.42-4.408 9.83-9.786 9.83zm0-17.75c-4.367 0-7.92 3.553-7.92 7.92 0 1.396.365 2.76 1.058 3.966l.164.286-.628 2.296 2.348-.616.276.164a7.886 7.886 0 0 0 4.698 1.5c4.366 0 7.92-3.554 7.92-7.92 0-2.115-.824-4.103-2.32-5.598a7.883 7.883 0 0 0-5.596-2.098z"/>
                </svg>
              </a>
              <a 
                href="https://discord.gg/D4C6kdASd" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#5865F2]/60 text-zinc-400 hover:text-[#5865F2] hover:bg-[#5865F2]/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="Discord Community"
                title="Discord Community"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current transition-transform group-hover:scale-110">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a 
                href="mailto:celestius.club@gmail.com" 
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/50 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="Email"
                title="Email"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 
              className="text-lg text-[#FFCC00] font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              NAVIGATION
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
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-[#FFCC00] transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Campus & Contact (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 
              className="text-lg text-sky-400 font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              INSTITUTION
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
                  href="mailto:celestius.club@gmail.com" 
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  celestius.club@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright on Left, Privacy & Refund Policies on the Right */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p className="text-zinc-400 text-center sm:text-left flex items-center gap-1.5">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-[#FFCC00] font-bold">CELESTIUS</span>
            <span className="text-zinc-600">//</span>
            <span>CIT CHENNAI. ALL RIGHTS RESERVED.</span>
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

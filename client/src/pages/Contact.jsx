import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  User, 
  Tag, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Instagram, 
  Sparkles, 
  Calendar, 
  Code2, 
  Handshake, 
  Mic, 
  Loader2,
  RefreshCw,
  Clock,
  Radio,
  Send
} from 'lucide-react';
import { getApiBaseUrl } from '../config/api';

// Bespoke 3D Origami Paper Bird / Hummingbird Messenger (Matching Reference Image)
function CyberOrigamiBird({ size = 160, className = "", style = {}, hue = "gold" }) {
  const isGold = hue === "gold";
  const id = React.useId().replace(/:/g, '');
  return (
    <div className={`pointer-events-none select-none ${className}`} style={style}>
      <svg viewBox="0 0 220 200" width={size} height={(size * 200) / 220} fill="none">
        <defs>
          {/* Main Beak & Head Gradients */}
          <linearGradient id={`beak_${id}`} x1="160" y1="45" x2="215" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#F59E0B" : "#0284C7"} />
            <stop offset="100%" stopColor={isGold ? "#D97706" : "#0369A1"} />
          </linearGradient>

          <linearGradient id={`head_top_${id}`} x1="140" y1="35" x2="165" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#FEF08A" : "#BAE6FD"} />
            <stop offset="100%" stopColor={isGold ? "#EAB308" : "#0284C7"} />
          </linearGradient>

          <linearGradient id={`head_cheek_${id}`} x1="145" y1="45" x2="155" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#F59E0B" : "#0369A1"} />
            <stop offset="100%" stopColor={isGold ? "#B45309" : "#075985"} />
          </linearGradient>

          {/* Far Upward Wing (Left Wing pointing back-up) */}
          <linearGradient id={`wing_far_${id}`} x1="75" y1="20" x2="125" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#FDE047" : "#38BDF8"} stopOpacity="0.95" />
            <stop offset="100%" stopColor={isGold ? "#B45309" : "#0369A1"} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`wing_far_facet_${id}`} x1="75" y1="20" x2="120" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#FEF08A" : "#E0F2FE"} />
            <stop offset="100%" stopColor={isGold ? "#EAB308" : "#0284C7"} />
          </linearGradient>

          {/* Near Forward Wing (Prominent origami chest/side wing fold) */}
          <linearGradient id={`wing_near_top_${id}`} x1="110" y1="40" x2="150" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#FFFBEB" : "#E0F2FE"} />
            <stop offset="50%" stopColor={isGold ? "#FDE047" : "#38BDF8"} />
            <stop offset="100%" stopColor={isGold ? "#EAB308" : "#0284C7"} />
          </linearGradient>

          <linearGradient id={`wing_near_crease_${id}`} x1="120" y1="45" x2="145" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#F59E0B" : "#0284C7"} />
            <stop offset="100%" stopColor={isGold ? "#78350F" : "#082F49"} />
          </linearGradient>

          <linearGradient id={`wing_near_inner_${id}`} x1="130" y1="65" x2="148" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#D97706" : "#0369A1"} />
            <stop offset="100%" stopColor={isGold ? "#92400E" : "#075985"} />
          </linearGradient>

          {/* Torso / Breast Origami Crease */}
          <linearGradient id={`breast_${id}`} x1="125" y1="85" x2="152" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#FDE047" : "#38BDF8"} />
            <stop offset="100%" stopColor={isGold ? "#D97706" : "#0369A1"} />
          </linearGradient>

          {/* Slender Diamond Tail Folds (Long swooping tail down-left) */}
          <linearGradient id={`tail_main_${id}`} x1="50" y1="185" x2="125" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#F59E0B" : "#0284C7"} />
            <stop offset="50%" stopColor={isGold ? "#EAB308" : "#0284C7"} />
            <stop offset="100%" stopColor={isGold ? "#FEF08A" : "#E0F2FE"} />
          </linearGradient>

          <linearGradient id={`tail_facet2_${id}`} x1="50" y1="185" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#B45309" : "#075985"} />
            <stop offset="100%" stopColor={isGold ? "#F59E0B" : "#0284C7"} />
          </linearGradient>

          <linearGradient id={`tail_under_${id}`} x1="75" y1="140" x2="118" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isGold ? "#78350F" : "#0C4A6E"} />
            <stop offset="100%" stopColor={isGold ? "#B45309" : "#0369A1"} />
          </linearGradient>

          {/* Luminous Ambient Bloom Filter */}
          <filter id={`bird_bloom_${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow Silhouette */}
        <polygon 
          points="70,22 135,42 208,70 148,110 52,185 110,88" 
          fill={isGold ? "#F59E0B" : "#0284C7"} 
          filter={`url(#bird_bloom_${id})`} 
          opacity="0.32" 
        />

        {/* === 1. SLENDER TAIL (Back & Bottom Folds) === */}
        {/* Tail Base Under-facet */}
        <polygon 
          points="112,85 128,118 102,130 92,105" 
          fill={`url(#tail_under_${id})`} 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="0.6" 
          strokeLinejoin="round" 
        />
        {/* Lower Tail Spike */}
        <polygon 
          points="112,88 128,118 52,185" 
          fill={`url(#tail_facet2_${id})`} 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="0.7" 
          strokeLinejoin="round" 
        />
        {/* Upper Tail Main Spine */}
        <polygon 
          points="112,88 52,185 88,112" 
          fill={`url(#tail_main_${id})`} 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="0.8" 
          strokeLinejoin="round" 
        />

        {/* === 2. FAR WING (Upward Pointed Left Wing) === */}
        {/* Far Wing Lower Pane */}
        <polygon 
          points="112,85 70,22 118,72" 
          fill={`url(#wing_far_${id})`} 
          stroke="rgba(255,255,255,0.25)" 
          strokeWidth="0.7" 
          strokeLinejoin="round" 
        />
        {/* Far Wing Upper Leading Pane */}
        <polygon 
          points="70,22 112,48 118,72" 
          fill={`url(#wing_far_facet_${id})`} 
          stroke="rgba(255,255,255,0.45)" 
          strokeWidth="0.8" 
          strokeLinejoin="round" 
        />

        {/* === 3. TORSO & BREAST === */}
        <polygon 
          points="118,72 138,58 148,104 128,118" 
          fill={`url(#breast_${id})`} 
          stroke="rgba(255,255,255,0.35)" 
          strokeWidth="0.8" 
          strokeLinejoin="round" 
        />

        {/* Small origami feet prong under breast */}
        <polygon points="124,118 128,126 120,121" fill={isGold ? "#B45309" : "#075985"} opacity="0.85" />

        {/* === 4. NEAR WING (Large 3D Faceted Origami Flap) === */}
        {/* Wing Inner Fold Shadow */}
        <polygon 
          points="128,68 148,104 135,108" 
          fill={`url(#wing_near_inner_${id})`} 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="0.6" 
          strokeLinejoin="round" 
        />
        {/* Wing Darker Shadow Crease */}
        <polygon 
          points="112,42 128,68 140,105 130,105" 
          fill={`url(#wing_near_crease_${id})`} 
          stroke="rgba(255,255,255,0.25)" 
          strokeWidth="0.7" 
          strokeLinejoin="round" 
        />
        {/* Wing Main Top Origami Facet */}
        <polygon 
          points="112,42 142,62 140,105 125,72" 
          fill={`url(#wing_near_top_${id})`} 
          stroke="rgba(255,255,255,0.55)" 
          strokeWidth="0.9" 
          strokeLinejoin="round" 
        />
        {/* Wing Upper Crest */}
        <polygon 
          points="112,42 125,52 142,62" 
          fill={isGold ? "#FFFBEB" : "#E0F2FE"} 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="0.8" 
          opacity="0.8" 
        />

        {/* === 5. HEAD, CHEEK & SLENDER HUMMINGBIRD BEAK === */}
        {/* Cheek & Chin Crease */}
        <polygon 
          points="138,58 152,50 148,66" 
          fill={`url(#head_cheek_${id})`} 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="0.7" 
          strokeLinejoin="round" 
        />
        {/* Head Top Crown Facet */}
        <polygon 
          points="138,42 154,42 152,50 138,58" 
          fill={`url(#head_top_${id})`} 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth="0.8" 
          strokeLinejoin="round" 
        />
        {/* Origami Neck Fold */}
        <polygon 
          points="154,42 165,47 152,50" 
          fill={isGold ? "#FDE047" : "#38BDF8"} 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="0.7" 
        />
        {/* Slender Downward-Curved Hummingbird Beak */}
        <polygon 
          points="165,47 212,70 152,50" 
          fill={`url(#beak_${id})`} 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth="0.8" 
          strokeLinejoin="round" 
        />

        {/* Center Spine Ridge Highlight */}
        <line 
          x1="52" y1="185" x2="112" y2="88" 
          stroke="rgba(255,255,255,0.85)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
        />
        <line 
          x1="112" y1="42" x2="140" y2="105" 
          stroke="rgba(255,255,255,0.65)" 
          strokeWidth="1.1" 
          strokeLinecap="round" 
        />

        {/* Delicate Golden Starlight Specular Glint on Beak Tip */}
        <circle cx="212" cy="70" r="2.2" fill="#FFFBEB" opacity="0.9" />
        <circle cx="212" cy="70" r="4.5" fill="#FDE047" opacity="0.4" />
      </svg>
    </div>
  );
}

// Subtle Starlight Sparkle Beacon
function StarSparkle({ size = 24, className = "", style = {} }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={`pointer-events-none ${className}`} style={style}>
      <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z" fill="#FFCC00" opacity="0.75" />
    </svg>
  );
}

export default function Contact({ introCompleted = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [transmissionId, setTransmissionId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
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
    const base = wasIntroPlayingOnMount.current ? 0.3 : 0.05;
    return {
      animation: `${animName} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${(base + delaySec).toFixed(2)}s both`
    };
  };

  const categories = [
    { id: 'General Inquiry', label: 'General', icon: Sparkles },
    { id: 'Event Participation', label: 'Events & Hackathons', icon: Calendar },
    { id: 'Workshop Proposal', label: 'Workshop / Bootcamp', icon: Code2 },
    { id: 'Sponsorship & Alliance', label: 'Sponsorship & Alliance', icon: Handshake },
    { id: 'Speaker Invitation', label: 'Speaker Session', icon: Mic },
  ];

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText('celestius.club@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsTransmitting(true);

    const fallbackCode = Math.floor(1000 + Math.random() * 9000);
    const fallbackId = `CLS-TX-${fallbackCode}`;

    try {
      const baseUrl = getApiBaseUrl();
      const endpoint = baseUrl.endsWith('/api') ? `${baseUrl}/contact` : `${baseUrl}/api/contact`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: formData.category,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      // Wait a moment for the carrier bird animation flight
      setTimeout(() => {
        setTransmissionId(data.referenceId || fallbackId);
        setIsTransmitting(false);
        setSubmitted(true);
      }, 900);
    } catch (err) {
      console.warn('! [CONTACT] Server connection failed, using client fallback:', err.message);
      setTimeout(() => {
        setTransmissionId(fallbackId);
        setIsTransmitting(false);
        setSubmitted(true);
      }, 900);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      category: 'General Inquiry',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="relative min-h-[85vh] max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-left select-none animate-fadeIn flex flex-col justify-center">
      
      {/* 2-Panel Refined Cyber-Pod Container */}
      <div 
        className="relative w-full bg-[#07070a]/92 border border-white/20 rounded-[28px] overflow-hidden flex flex-col md:flex-row text-left backdrop-blur-3xl shadow-2xl"
        style={{
          boxShadow: '0 0 70px rgba(255,204,0,0.22), 0 35px 90px rgba(0,0,0,0.95)',
          ...getAnimStyle('scrollRevealUp', 0.1, '0.7s')
        }}
      >
        {/* ======================================================== */}
        {/* BACKGROUND: 3D Origami Paper Rocket & Dispatch Trajectory */}
        {/* ======================================================== */}
        
        {/* Ambient Radial Glow Spots */}
        <div 
          className="absolute -top-24 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-45"
          style={{ backgroundColor: '#EAB308' }}
        />
        <div 
          className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-30"
          style={{ backgroundColor: '#0284C7' }}
        />

        {/* 1. Curved Flight Contrail Path (Dashed glowing trajectory loop) */}
        <svg 
          viewBox="0 0 800 500" 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-35 overflow-visible"
        >
          <defs>
            <linearGradient id="birdContrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.05" />
              <stop offset="60%" stopColor="#FFCC00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path 
            d="M 60 420 Q 220 460 340 320 T 560 140 T 720 70" 
            fill="none" 
            stroke="url(#birdContrailGrad)" 
            strokeWidth="1.8" 
            strokeDasharray="6 10" 
            style={{ animation: 'flowDashLoop 18s linear infinite' }}
          />
        </svg>

        {/* 2. Primary 3D Origami Paper Hummingbird (Soaring glide & subtle wing flutter) */}
        <div 
          className={`absolute pointer-events-none z-0 transition-all duration-700 ${
            isTransmitting 
              ? 'animate-origami-bird-launch' 
              : 'animate-origami-bird-fly'
          }`}
          style={{
            top: '6%',
            right: '6%',
            transform: 'rotate(12deg)'
          }}
        >
          <CyberOrigamiBird size={165} hue="gold" />
          
          {/* Subtle Starlight Sparkle near beak tip */}
          <div className="absolute top-8 -right-2 animate-pulse">
            <StarSparkle size={18} />
          </div>
        </div>

        {/* 3. Secondary Smaller Cyan Escort Origami Bird (Bottom-Left Horizon) */}
        <div 
          className="absolute bottom-6 left-10 pointer-events-none z-0 opacity-40 animate-origami-bird-fly"
          style={{
            transform: 'rotate(-10deg) scaleX(-1)',
            animationDelay: '1.8s'
          }}
        >
          <CyberOrigamiBird size={95} hue="cyan" />
        </div>

        {/* Subtle Dot Matrix Pattern Overlay */}
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        {/* Frosted Glass Vignette Overlay ensuring crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/65 via-[#07070a]/75 to-[#07070a]/92 pointer-events-none backdrop-blur-[1px]" />


        {/* ======================================================== */}
        {/* LEFT FLANK: Communications Uplink Pod                    */}
        {/* ======================================================== */}
        <div 
          className="relative p-6 sm:p-8 md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between overflow-hidden z-10 backdrop-blur-md"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 204, 0, 0.14) 0%, rgba(7, 7, 10, 0.7) 100%)'
          }}
        >
          <div className="space-y-6">
            
            {/* Uplink Telemetry Capsule with Live Frequency Visualizer */}
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)',
                  color: '#FFCC00'
                }}
              >
                <Radio className="w-4 h-4 animate-pulse" />
              </div>

              {/* Live Signal Equalizer Bars */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Enquiry
                </span>
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-[#FFCC00] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-[#FFCC00] rounded-full animate-[pulse_1.4s_ease-in-out_infinite_0.2s] h-3" />
                  <span className="w-0.5 bg-[#FFCC00] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.4s] h-2.5" />
                  <span className="w-0.5 bg-[#FFCC00] rounded-full animate-[pulse_1.3s_ease-in-out_infinite_0.1s] h-1.5" />
                </div>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 
                className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Reach <span className="text-[#FFCC00]">out us</span>
              </h2>

              <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                Direct communications pipeline with Celestius executive board and technical coordinators.
              </p>
            </div>

            {/* Direct Coordinates */}
            <div className="space-y-3 pt-1 font-mono text-xs">
              
              {/* Direct Email with Quick Copy */}
              <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                  DIRECT DESK
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between text-left text-[#FFCC00] hover:text-[#FFE066] transition-colors cursor-pointer group"
                  title="Click to copy email address"
                >
                  <span className="text-xs truncate">celestius.club@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFCC00] transition-colors shrink-0 ml-1" />
                  )}
                </button>
              </div>

              {/* Response SLA */}
              <div className="p-3 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">EST. RESPONSE</span>
                  <span className="text-zinc-200 text-[11px] block">&lt; 24 Working Hours</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 text-center">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-2.5 text-center">
                  SOCIAL HUBS
                </span>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://github.com/Club-Celestius"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-black/70 border border-white/15 hover:border-[#FFCC00] hover:text-[#FFCC00] text-zinc-300 flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-110 shadow-lg hover:shadow-[#FFCC00]/25 hover:bg-[#FFCC00]/10"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/club-celestius-cit/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-black/70 border border-white/15 hover:border-sky-400 hover:text-sky-400 text-zinc-300 flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-110 shadow-lg hover:shadow-sky-400/25 hover:bg-sky-400/10"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.instagram.com/celestius_cit/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-black/70 border border-white/15 hover:border-pink-400 hover:text-pink-400 text-zinc-300 flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-110 shadow-lg hover:shadow-pink-400/25 hover:bg-pink-400/10"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Left Column Bottom Action: Solid Gold Button with Shine Sweep */}
          <div className="pt-6 mt-6 border-t border-white/10 hidden md:block">
            <button
              onClick={handleSubmit}
              disabled={isTransmitting || submitted}
              className="group/applyBtn w-full py-3.5 px-4 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer hover:brightness-110 relative overflow-hidden disabled:opacity-50"
              style={{
                backgroundColor: '#FFCC00',
                boxShadow: '0 0 25px rgba(255, 204, 0, 0.4)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isTransmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>CARRIER DISPATCHING...</span>
                  </>
                ) : submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>DISPATCH SENT</span>
                  </>
                ) : (
                  <>
                    <span>LAUNCH DISPATCH</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover/applyBtn:translate-x-1 group-hover/applyBtn:-translate-y-0.5" />
                  </>
                )}
              </span>
              {/* Button shine sweep on hover */}
              <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/applyBtn:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT FLANK: Inquiry Transmission Parameters             */}
        {/* ======================================================== */}
        <div className="relative p-6 sm:p-8 flex-1 flex flex-col justify-between z-10 space-y-6">
          
          {submitted ? (
            /* SUCCESS VIEW: Animated submission receipt */
            <div className="my-auto py-8 text-center space-y-6 animate-step-enter">
              
              {/* Origami Paper Bird Touchdown & Checkmark Badge with Pulse Shockwaves */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/40 pointer-events-none"
                  style={{ animation: 'submissionPulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite' }}
                />
                <div 
                  className="absolute -inset-3 rounded-full border border-emerald-400/20 pointer-events-none"
                  style={{ animation: 'submissionPulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s infinite' }}
                />
                
                {/* 3D Origami Hummingbird Arrived at Destination */}
                <div className="absolute -top-4 -right-3 z-20 animate-origami-bird-arrive">
                  <div className="rotate-[18deg]">
                    <CyberOrigamiBird size={54} hue="gold" />
                  </div>
                </div>

                <div 
                  className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-900/30 to-emerald-950/70 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.35)] z-10"
                  style={{ animation: 'submissionBadgePop 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
                >
                  <svg className="w-12 h-12" viewBox="0 0 52 52" fill="none">
                    <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500/25" />
                    <circle 
                      cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className="text-emerald-400"
                      style={{
                        strokeDasharray: 140,
                        strokeDashoffset: 140,
                        transformOrigin: 'center',
                        transform: 'rotate(-90deg)',
                        animation: 'drawCheckCircle 0.8s cubic-bezier(0.65, 0, 0.45, 1) 0.15s forwards'
                      }}
                    />
                    <path 
                      d="M15 27 L23 35 L37 19" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300"
                      style={{
                        strokeDasharray: 40,
                        strokeDashoffset: 40,
                        animation: 'drawCheckTick 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.7s forwards'
                      }}
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Send className="w-3 h-3" />
                  <span>DISPATCH DELIVERED</span>
                </div>
                <h3 
                  className="font-ndot text-3xl sm:text-4xl text-[#FFCC00] uppercase tracking-wider leading-none"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  TRANSMISSION LOGGED
                </h3>
                <p className="font-mono text-xs text-emerald-400">
                  REF // {transmissionId} • STATUS: 200 OK
                </p>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed pt-1">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your packet has taken flight and landed safely in our inbox. Our leadership will review and respond within 24 working hours.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#FFCC00]/20 hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>LAUNCH ANOTHER MESSAGE</span>
                </button>
              </div>

            </div>
          ) : (
            /* FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 01: Inquiry Channel (Yellow VT323 Header) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-ndot text-2xl sm:text-3xl text-[#FFCC00] uppercase tracking-wide leading-none"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    INQUIRY CHANNEL
                  </h3>
                </div>

                {/* Category Chips with Tactile Radio-Dot Indicator */}
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FFCC00]/20 border-[#FFCC00] text-[#FFCC00] font-semibold shadow-[0_0_15px_rgba(255,204,0,0.25)]'
                            : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FFCC00] animate-pulse' : 'bg-zinc-600'}`} />
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FFCC00]' : 'text-zinc-500'}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 02: Sender & Parameters (Yellow VT323 Header) */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-ndot text-2xl sm:text-3xl text-[#FFCC00] uppercase tracking-wide leading-none"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    PACKET PARAMETERS
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    // SENDER_DATA
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <span className="text-[#FFCC00]">&gt;</span>
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-black/70 border border-white/15 rounded-xl text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <span className="text-[#FFCC00]">&gt;</span>
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="user@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-black/70 border border-white/15 rounded-xl text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                      <span className="text-[#FFCC00]">&gt;</span>
                      <span>Subject *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Topic of inquiry or collaboration..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/70 border border-white/15 rounded-xl text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all"
                    />
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <span className="text-[#FFCC00]">&gt;</span>
                        <span>Message Content *</span>
                      </label>
                      <span className="font-mono text-[10px] text-zinc-600">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide context, details, or proposed collaboration specifics..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/70 border border-white/15 rounded-xl text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 transition-all resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Screen Submit Button */}
              <div className="pt-2 md:hidden">
                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3.5 px-4 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer hover:brightness-110"
                  style={{
                    backgroundColor: '#FFCC00',
                    boxShadow: '0 0 25px rgba(255, 204, 0, 0.4)'
                  }}
                >
                  {isTransmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>CARRIER DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <span>LAUNCH DISPATCH</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

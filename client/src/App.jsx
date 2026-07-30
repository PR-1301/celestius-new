import React, { useState, useEffect, useRef } from 'react';
import clubLogo from './assets/logo.png';
import logoImg from './assets/logo.png';
import { 
  Instagram, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  Rocket, 
  Users, 
  ArrowUpRight,
  Hammer,
  Terminal,
  Cpu,
  Activity,
  Wifi,
  Settings,
  AlertCircle,
  Shield,
  RotateCcw,
  Globe,
  Linkedin,
  Github
} from 'lucide-react';

// Twinkling Starfield Component with interactive mouse-gravitational dust particles
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create static background stars
    const stars = [];
    const starCount = Math.min(150, Math.floor((width * height) / 8000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.8 ? '#FFCC00' : '#FFFFFF',
        alpha: Math.random(),
        speed: Math.random() * 0.01 + 0.003,
        dir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Interactive floating cosmic dust particles
    const dustParticles = [];
    const dustCount = 40;
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.4 + 0.15,
        color: '#FFCC00',
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.dir;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.dir = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.dir = 1;
        }
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render & Drift Interactive Dust
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle pull towards the cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          p.x += (dx / dist) * 0.2;
          p.y += (dy / dist) * 0.2;
        }

        // Screen boundary wrap-around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const email = "celestius.club@gmail.com";
  const instagramUrl = "https://www.instagram.com/celestius_cit/";

  // Form State
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'refund' | null

  // Intro Loader State
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Typewriter Badge state
  const [badgeText, setBadgeText] = useState('');
  
  useEffect(() => {
    const fullText = "Under Active Construction";
    let index = 0;
    let isDeleting = false;
    let speed = 100;
    let timer;
    
    const type = () => {
      const current = fullText.substring(0, index);
      setBadgeText(current);
      
      if (!isDeleting && index < fullText.length) {
        index++;
        speed = 100;
      } else if (isDeleting && index > 0) {
        index--;
        speed = 50;
      } else if (!isDeleting && index === fullText.length) {
        isDeleting = true;
        speed = 2500; // Hold typed text
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        speed = 500; // Delay before typing again
      }
      
      timer = setTimeout(type, speed);
    };
    
    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, []);

  // Simulation loader progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // fade out wait
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 140);
    return () => clearInterval(timer);
  }, []);

  const getLoadingMessage = (val) => {
    if (val < 25) return "Initializing core modules...";
    if (val < 50) return "Page is currently under construction...";
    if (val < 75) return "Assembling celestial orbital engines...";
    if (val < 95) return "Syncing dashboard protocols...";
    return "System ready. Check back soon!";
  };

  // Live Diagnostics Telemetry State
  const [metrics, setMetrics] = useState({ ping: 12, temp: 34.2, load: 24 });
  const [logs, setLogs] = useState([
    "SYS_INIT: Booting Celestius Core Engine...",
    "SYS_INIT: Establishing secure connection to CIT API servers...",
    "SYS_INIT: Connection successful. Latency 12ms.",
    "SYS_CORE: Activating celestial orbital rings...",
    "SYS_CORE: Syncing rotation alignment with primary nodes... OK"
  ]);

  const consoleRef = useRef(null);

  // Simulated live logging activity
  useEffect(() => {
    const logTemplates = [
      "SYS_WEB: Caching static assets. 182 files loaded successfully.",
      "SYS_DB: Connecting to local databases... CONNECTED",
      "SYS_SEC: Integrity checked. Security protocols active.",
      "SYS_EVT: Loading future events: Athena's Hack, Build-A-Thon...",
      "SYS_INC: Scanning incubator projects... 4 active items found.",
      "SYS_NET: Ready to broadcast. Waiting for platform launch...",
      "SYS_CORE: Re-calibrating quantum cores... Temp 34.5°C",
      "SYS_API: Webhook verified with Instagram API.",
      "SYS_ENG: Core synchronization status: 100% aligned.",
      "SYS_ASSEMBLY: Forging digital ecosystem framework..."
    ];

    const interval = setInterval(() => {
      // Vary metrics slightly
      setMetrics({
        ping: Math.floor(Math.random() * 5) + 10,
        temp: parseFloat((33.5 + Math.random() * 1.5).toFixed(1)),
        load: Math.floor(Math.random() * 12) + 18
      });

      // Add a random log
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => {
        const next = [...prev, `[${timeStr}] ${randomLog}`];
        if (next.length > 30) next.shift(); // Keep logs buffer manageable
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Autoscroll terminal console container internally (does not scroll page)
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailInput) {
      setErrorMsg('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative selection:bg-celestius-gold selection:text-black font-sans overflow-x-hidden">
      
      {/* Intro Loading Screen Overlay */}
      {loading && (
        <div className={`fixed inset-0 bg-[#020204] z-50 flex flex-col items-center justify-center p-6 transition-opacity duration-700 ease-out select-none ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Starfield />
          
          {/* Ambient center nebula */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-celestius-gold/5 blur-3xl pointer-events-none animate-pulse" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center">
            
            {/* The Radar Tracking Grid */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
              
              {/* Concentric grid circles */}
              <div className="absolute inset-0 rounded-full border border-celestius-gold/10 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-dashed border-celestius-gold/15 pointer-events-none animate-spin-slow" />
              <div className="absolute inset-10 rounded-full border border-dotted border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-celestius-gold/5 pointer-events-none" />

              {/* Crosshair lines */}
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/5 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 pointer-events-none" />

              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,204,0,0.25)_0deg,transparent_180deg)] animate-spin-medium pointer-events-none z-10" />

              {/* Glowing targets on the radar */}
              <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-celestius-gold shadow-[0_0_10px_#FFCC00] animate-ping [animation-delay:0.5s]" />
              <div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_#FFCC00] animate-pulse [animation-delay:1.2s]" />
              <div className="absolute top-[40%] right-[35%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF] animate-pulse [animation-delay:2s]" />

              {/* Centered logo inside the radar */}
              <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/90 border border-celestius-gold/40 flex items-center justify-center p-3.5 shadow-[0_0_25px_rgba(255,204,0,0.15)] animate-subtle-float">
                <img 
                  src={clubLogo} 
                  alt="Celestius Radar Core" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

            </div>

            {/* Radar status telemetry */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono tracking-[0.3em] text-celestius-gold uppercase animate-pulse">
                System Scan In Progress
              </h2>
              
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Page Under Construction
              </h1>
              
              <p className="text-xs font-mono text-zinc-500 tracking-wider">
                Target coordinates mapped. Please check back soon.
              </p>
            </div>

            {/* Progress Readout */}
            <div className="mt-8 text-[10px] font-mono text-zinc-400 bg-zinc-950/60 border border-zinc-900 rounded-full px-4 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-celestius-gold animate-ping" />
              <span>ALIGNMENT COMPLETED: <strong>{progress}%</strong></span>
            </div>

          </div>
        </div>
      )}
      
      {/* Background Starfield and Ambient Glowing Nebulae */}
      <Starfield />
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Subtle Space Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 204, 0, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 204, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src={logoImg} 
              alt="Celestius Logo" 
              className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl"
            />
          </div>
        </div>

        {/* CIT Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-400 font-medium hover:border-celestius-gold/30 hover:text-white transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celestius-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-celestius-gold"></span>
          </span>
          Student Tech Club @ CIT
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-10 sm:py-14 flex flex-col items-center">
        
        {/* Under Active Construction Typewriter Header Text */}
        <div className="flex items-center gap-2.5 mb-8 tracking-[0.25em] uppercase text-xs font-mono select-none">
          <Hammer className="w-3.5 h-3.5 text-celestius-gold animate-bounce shrink-0" />
          <span className="font-bold text-celestius-gold min-h-[16px] flex items-center">
            {badgeText}
            <span className="animate-pulse font-light text-celestius-gold ml-[2px]">|</span>
          </span>
        </div>

        {/* Core Layout Split: Orbiting Engine & Telemetry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full mb-16">
          
          {/* LEFT: Redesigned Central Orbiting Celestial Engine */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
            
            {/* The Celestial Forge System wrapper */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center perspective-1000 preserve-3d">
              
              {/* Outer Glow Halo behind the core */}
              <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full bg-celestius-gold/10 blur-3xl animate-pulse-glow" />

              {/* Pulsing ring emitters */}
              <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-celestius-gold/20 animate-pulse-ring" />
              <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-yellow-500/10 animate-pulse-ring [animation-delay:2s]" />

              {/* ORBIT TRACK 1: 3D Angle 1 */}
              <div className="absolute inset-0 rounded-full border border-dashed border-celestius-gold/20 preserve-3d orbit-3d-1 pointer-events-none">
                <div className="w-full h-full relative animate-spin-slow">
                  {/* Orbiting Badge 1 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin-reverse-slow bg-black/90 border border-celestius-gold/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,204,0,0.15)] text-[10px] font-semibold text-white font-mono">
                      <Code2 className="w-3.5 h-3.5 text-celestius-gold" />
                      <span>DEVELOP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT TRACK 2: 3D Angle 2 (Reverse Rotation) */}
              <div className="absolute inset-0 rounded-full border border-dotted border-white/10 preserve-3d orbit-3d-2 pointer-events-none">
                <div className="w-full h-full relative animate-spin-reverse-medium">
                  {/* Orbiting Badge 2 */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="animate-spin-medium bg-black/90 border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,255,255,0.05)] text-[10px] font-semibold text-zinc-300 font-mono">
                      <Rocket className="w-3.5 h-3.5 text-yellow-400" />
                      <span>LAUNCH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT TRACK 3: 3D Angle 3 */}
              <div className="absolute inset-0 rounded-full border border-dashed border-celestius-gold/10 preserve-3d orbit-3d-3 pointer-events-none">
                <div className="w-full h-full relative animate-spin-medium">
                  {/* Orbiting Badge 3 */}
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin-reverse-medium bg-black/90 border border-celestius-gold/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,204,0,0.1)] text-[10px] font-semibold text-white font-mono">
                      <Users className="w-3.5 h-3.5 text-celestius-gold" />
                      <span>NETWORK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Engine Shield containing Logo */}
              <div className="relative z-10 w-[220px] h-[120px] sm:w-[260px] sm:h-[140px] rounded-[1.8rem] bg-zinc-950/85 border border-celestius-gold/30 backdrop-blur-xl flex flex-col items-center justify-center p-6 shadow-[0_0_35px_rgba(255,204,0,0.15)] group animate-subtle-float overflow-hidden animate-shine-reflection">
                
                {/* Logo Image */}
                <img 
                  src={clubLogo} 
                  alt="Celestius Core" 
                  className="w-full h-full object-contain rounded-2xl filter drop-shadow-[0_0_8px_rgba(255,204,0,0.25)]"
                />
              </div>

              {/* Interactive Info Ring labels */}
              <div className="absolute bottom-0 text-[10px] font-mono text-zinc-500 flex gap-4 uppercase tracking-wider">
                <span>Core: ACTIVE</span>
                <span>•</span>
                <span>Shield: ENGAGED</span>
              </div>

            </div>

          </div>

          {/* RIGHT: High-tech System telemetry & progress stats */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* System Title */}
            <div>
              <div className="text-celestius-gold text-xs font-mono font-bold tracking-[0.3em] uppercase mb-1">
                Platform v2.0
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white font-sans">
                Something New is <br />
                <span className="animate-text-shimmer text-glow-gold">
                  Under Construction
                </span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-xl">
                Our launchpad is currently under active construction. We will be back online soon with a brand-new space engineered for student developers and creators. Check back soon for launch confirmation!
              </p>
            </div>

            {/* Simulated Live Diagnostic Logger Console */}
            <div className="w-full bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-celestius-gold" />
                  <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300">CELESTIUS_DIAGNOSTICS_V2.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Telemetry Stats Rows */}
              <div className="grid grid-cols-3 gap-1 px-4 py-3 bg-zinc-950 border-b border-zinc-900 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wifi className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>LATENCY: <strong className="text-green-400">{metrics.ping}ms</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>LOAD: <strong className="text-yellow-400">{metrics.load}%</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Activity className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>CORE TEMP: <strong className="text-orange-400">{metrics.temp}°C</strong></span>
                </div>
              </div>

              {/* Logs Content Window */}
              <div ref={consoleRef} className="p-4 h-[120px] overflow-y-auto font-mono text-[11px] text-zinc-400 space-y-1.5 select-none scrollbar-thin">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="text-celestius-gold shrink-0">&gt;</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Visual Progress Indicator */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 animate-spin text-celestius-gold" />
                  DEPLOYING MODULES
                </span>
                <span className="text-celestius-gold font-bold">40% COMPLETE</span>
              </div>
              
              {/* Progress Track */}
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden p-[1px] border border-zinc-800">
                <div className="h-full bg-gradient-to-r from-amber-600 via-celestius-gold to-yellow-300 rounded-full shadow-[0_0_10px_#FFCC00] animate-forge-spark" style={{ width: '40%' }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-1.5">
                <span>EST: Q3 2026</span>
                <span>SYSTEM STATE: STABLE</span>
              </div>
            </div>

          </div>

        </div>

        {/* What's Coming Preview Cards */}
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-center text-zinc-300 mb-8 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-celestius-gold" /> What We Are Engineering
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Hackathons & Labs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Hands-on coding challenges and collaborative technology workshops.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Project Incubator</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Supporting student ideas from blueprints to finished open-source projects.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-celestius-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start gap-4 text-left group border-glow-gold-hover">
            <div className="p-3 rounded-xl bg-celestius-gold/10 text-celestius-gold group-hover:bg-celestius-gold/20 transition-colors shadow-[0_0_12px_rgba(255,204,0,0.05)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-celestius-gold transition-colors">Tech Network</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Connecting curious minds through mentorship and industry networking.
              </p>
            </div>
          </div>

        </div>

        {/* Redesigned Stay Updated & Social Panel */}
        <div className="w-full max-w-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl text-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-celestius-gold/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-celestius-gold/5 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex p-2.5 rounded-full bg-celestius-gold/10 border border-celestius-gold/20 text-celestius-gold mb-4 animate-bounce">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide mb-2 uppercase font-sans">
            Stay Tuned
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mb-6 max-w-md mx-auto">
            Subscribe below to receive updates and notifications as we prepare for launch.
          </p>

          {/* Subscribed Success Box / Form */}
          {subscribed ? (
            <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 animate-fade-in flex flex-col items-center gap-2 max-w-md mx-auto">
              <Check className="w-8 h-8 p-1.5 rounded-full bg-green-500 text-black font-extrabold" />
              <h4 className="text-sm font-bold text-white">Initialization Complete!</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You've successfully subscribed. We'll send deployment logs to <strong className="text-white">{emailInput}</strong> as we approach launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-2.5 mb-6">
              <div className="flex-grow relative">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your developer email..." 
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-celestius-gold/50 focus:ring-1 focus:ring-celestius-gold/30 transition-all font-light"
                />
                {errorMsg && (
                  <div className="absolute left-1 -bottom-5 text-[10px] text-red-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-celestius-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-celestius-gold-light hover:shadow-[0_0_15px_rgba(255,204,0,0.3)] active:scale-95 transition-all shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 pt-4 border-t border-white/5 max-w-md mx-auto">
            {/* Instagram Button */}
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:bg-white/[0.08] hover:border-celestius-gold/30 transition-all group"
            >
              <Instagram className="w-4 h-4 text-celestius-gold group-hover:rotate-12 transition-transform duration-300" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email Contact / Copy Button */}
            <div className="w-full sm:w-1/2">
              <button 
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:bg-white/[0.08] hover:border-celestius-gold/30 transition-all group"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Mail className="w-4 h-4 text-celestius-gold" />}
                <span className="truncate">{copied ? 'Email Copied!' : 'Email Us'}</span>
                {!copied && <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
              </button>
            </div>
          </div>

          <p className="text-[10px] text-zinc-600 mt-4 font-mono select-all">
            {email}
          </p>

        </div>

      </main>

      {/* Redesigned 3-Column Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-zinc-950/40 backdrop-blur-md pt-12 pb-6 px-6 text-left mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative group w-fit">
              <div className="absolute -inset-1 bg-gradient-to-r from-celestius-gold to-yellow-500 rounded-xl blur opacity-35 transition duration-500"></div>
              <img 
                src={clubLogo} 
                alt="Celestius Logo" 
                className="relative h-12 w-auto object-contain rounded-xl border border-celestius-gold/35 shadow-[0_0_15px_rgba(255,204,0,0.25)]"
              />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              <strong className="text-white font-semibold">Club Celestius</strong> is a student-run community driving innovation, open source, and collaboration through technology and shared knowledge
            </p>
          </div>

          {/* Column 2: Social Connect */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-normal tracking-[0.25em] text-zinc-500 uppercase">
              Social Connect
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Follow our channels to stay up to date.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-celestius-gold/40 text-zinc-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,204,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-celestius-gold group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 3: Legalities & Policies */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-normal tracking-[0.25em] text-zinc-500 uppercase">
              Terms & Legalities
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-2">
              Read our policies regarding your personal records, registration parameters, and payment processing rules.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={() => setActiveModal('privacy')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-celestius-gold/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:shadow-[0_0_12px_rgba(255,204,0,0.05)] active:scale-95 group"
              >
                <Shield className="w-3.5 h-3.5 text-celestius-gold group-hover:rotate-12 transition-transform duration-300" />
                <span>Privacy Policy</span>
              </button>
              <button 
                onClick={() => setActiveModal('refund')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-red-500/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.05)] active:scale-95 group"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-500 group-hover:-rotate-45 transition-transform duration-300" />
                <span>Refund Policy</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-1.5 font-light">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span>© 2026 Celestius CIT. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider">
            <span className="text-zinc-400">CIT.CLUB_CELESTIUS</span>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>VERIFIED_PAYMENT_PORTAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals rendering */}
      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 border-t-2 border-t-celestius-gold rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all z-10"
              aria-label="Close modal"
            >
              <span className="text-xl font-light">×</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-celestius-gold/10 border border-celestius-gold/30 text-celestius-gold shadow-[0_0_15px_rgba(255,204,0,0.1)]">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  Privacy Policy
                </h2>
                <span className="text-[10px] font-mono text-celestius-gold tracking-[0.2em] font-semibold mt-1 block uppercase">
                  CONFIDENTIAL DATA PROTOCOL
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base text-left leading-relaxed mb-8 border-b border-white/5 pb-6">
              At Club Celestius, we implement robust measures to protect your digital records and ensure a secure registration pipeline.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    1. Confidentiality
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  All student details collected during registration (name, email address, phone number, and department) are kept strictly confidential and stored on encrypted databases.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    2. Zero Sharing
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Your data is never shared, sold, leased, or distributed to third-party advertisers, sponsors, or outer corporate organizations. Your consent remains absolute.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-celestius-gold/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-celestius-gold">
                  <Check className="w-4 h-4 p-0.5 rounded-full bg-celestius-gold text-black font-extrabold" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    3. Operational Purpose
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Data gathered is solely utilized for verification, generating certificate credentials, and distributing workshop coordinate links and source code repositories.
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 italic">
              By joining the PromptVerse workshop, you affirm consent to these secure parameters.
            </p>
          </div>
        </div>
      )}

      {/* Refund Policy Modal */}
      {activeModal === 'refund' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 border-t-2 border-t-red-500 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all z-10"
              aria-label="Close modal"
            >
              <span className="text-xl font-light">×</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  Refund Policy
                </h2>
                <span className="text-[10px] font-mono text-red-500 tracking-[0.2em] font-semibold mt-1 block uppercase">
                  REGISTRATION POLICY
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base text-left leading-relaxed mb-8 border-b border-white/5 pb-6">
              Please review our registration guidelines before completing your booking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-500/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    1. Booking Commitments
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  All workshop bookings are final. Since seats are limited and event resources are allocated in advance, we are unable to process cancellations or refunds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-500/20 transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    2. Absence & Schedule
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  We are unable to issue refunds or transfer registration passes due to personal absences, schedule conflicts, or technical connectivity issues during the live sessions.
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 italic">
              By finalizing your registration, you acknowledge and agree to these terms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

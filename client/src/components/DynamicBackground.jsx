import React, { useEffect, useRef } from 'react';

/**
 * DynamicBackground - Minimal, animated, cyber-celestial background common across all pages.
 * Features:
 * - Fluid celestial particle constellation on an optimized HTML5 Canvas
 * - Gentle mouse interaction with subtle particle deflection
 * - Floating, breathing dual-tone nebula gradient orbs (Celestius Gold + Deep Celestial Cyan)
 * - Ultra-subtle radar horizon scanbeam
 * - Cyber-minimalist Nothing OS corner telemetry crosshairs
 * - Iconic pixel dot matrix grid overlay
 */
export default function DynamicBackground({ mousePos = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Sync mouse position from parent or local listener
  useEffect(() => {
    if (mousePos && mousePos.x !== undefined && mousePos.y !== undefined) {
      mouseRef.current = { x: mousePos.x, y: mousePos.y, active: true };
    }
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count: fewer on mobile for optimal battery & performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 24 : 45;
    const connectionDist = isMobile ? 75 : 105;
    const mouseRadius = isMobile ? 90 : 135;

    // Palette: Celestius Gold, Celestial Cyan, Pure Starlight White
    const colors = [
      'rgba(255, 204, 0, ',   // Celestius Gold
      'rgba(56, 189, 248, ',   // Celestial Cyan
      'rgba(244, 244, 245, ',  // Starlight Zinc White
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : Math.random() < 0.5 ? -10 : height + 10;
        this.baseRadius = Math.random() * 1.3 + 0.7; // 0.7px - 2px
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.35 + 0.15; // 0.15 - 0.5
        this.alpha = this.baseAlpha;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        // Organic gentle pulse
        this.alpha = this.baseAlpha + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.12;

        // Mouse deflection / subtle gravity
        if (mouseRef.current.active) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.75;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
          }
        }

        // Standard drift velocity
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around viewport edges smoothly
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorPrefix}${Math.max(0, this.alpha)})`;
        ctx.shadowBlur = this.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = this.colorPrefix.includes('255, 204')
          ? 'rgba(255, 204, 0, 0.4)'
          : 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let frameCount = 0;
    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Draw connective constellation filaments between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 204, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(frameCount);
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. Deep Atmospheric Nebula Gradient Orbs (Slow Organic Drifting) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255, 204, 0, 0.08) 0%, rgba(255, 204, 0, 0.02) 45%, transparent 70%)',
          animation: 'nebulaDriftA 22s ease-in-out infinite',
          willChange: 'transform'
        }}
      />

      <div 
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full pointer-events-none opacity-35 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, rgba(56, 189, 248, 0.015) 50%, transparent 70%)',
          animation: 'nebulaDriftB 26s ease-in-out infinite',
          willChange: 'transform'
        }}
      />

      <div 
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255, 204, 0, 0.06) 0%, rgba(234, 88, 12, 0.015) 50%, transparent 70%)',
          animation: 'nebulaDriftA 28s ease-in-out infinite reverse',
          willChange: 'transform'
        }}
      />

      {/* 2. Responsive Celestial Constellation Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* 3. Subtle Horizon Radar Scanbeam Sweep */}
      <div 
        className="absolute inset-x-0 h-40 pointer-events-none opacity-[0.035]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 204, 0, 0.4) 50%, transparent 100%)',
          animation: 'scanbeamSweep 16s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          willChange: 'transform, opacity'
        }}
      />

      {/* 4. Iconic Nothing OS Pixel Dot Matrix Grid Canvas */}
      <div className="absolute inset-0 nothing-dot-grid opacity-25 pointer-events-none" />

    </div>
  );
}

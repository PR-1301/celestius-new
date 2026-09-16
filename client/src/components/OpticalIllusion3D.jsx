import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * MemberWelcomePass3D
 * Bespoke 3D Holographic Celestius Membership Access Pass illustrating
 * welcoming new members into Club Celestius.
 * Strictly 3 Colors: Aqua (#00F5FF), Yellow (#FFCC00), and Pure Black (#000000).
 * Features:
 * - Floating 3D Member Credential Pass with extruded bevels & holographic sheen
 * - Dynamic sweeping laser scan line welcoming new recruits
 * - Glowing Celestius star compass crest & holographic security chip
 * - Magnetic docking lanyard ring & drifting starlight particles
 * - Smooth 3D mouse parallax tracking & 60fps GPU acceleration
 */
export default function OpticalIllusion3D({ 
  className = "w-full h-full",
  mousePosition = { x: 0, y: 0 }
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    mouseRef.current.targetX = Math.max(-1, Math.min(1, mousePosition.x));
    mouseRef.current.targetY = Math.max(-1, Math.min(1, mousePosition.y));
  }, [mousePosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. Renderer with Antialiasing
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (Strictly Aqua & Yellow on Black)
    const ambientLight = new THREE.AmbientLight(0x05080c, 2.5);
    scene.add(ambientLight);

    const keyAqua = new THREE.PointLight(0x00F5FF, 38, 20);
    keyAqua.position.set(-4.5, 4.0, 4.5);
    scene.add(keyAqua);

    const keyYellow = new THREE.PointLight(0xFFCC00, 42, 20);
    keyYellow.position.set(4.5, -3.5, 4.0);
    scene.add(keyYellow);

    const rimLight = new THREE.DirectionalLight(0x00F5FF, 2.8);
    rimLight.position.set(0, 6, 2);
    scene.add(rimLight);

    const bottomRimLight = new THREE.DirectionalLight(0xFFCC00, 2.2);
    bottomRimLight.position.set(0, -6, -2);
    scene.add(bottomRimLight);

    // 4. Generate Ultra-Crisp Member Card Face Texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');

    // Pitch Black Background
    ctx.fillStyle = '#050509';
    ctx.fillRect(0, 0, 1024, 1536);

    // Card Outer Laser Border (Dual Aqua & Yellow)
    ctx.lineWidth = 14;
    const borderGrad = ctx.createLinearGradient(0, 0, 1024, 1536);
    borderGrad.addColorStop(0, '#00F5FF');
    borderGrad.addColorStop(0.3, '#00F5FF');
    borderGrad.addColorStop(0.7, '#FFCC00');
    borderGrad.addColorStop(1, '#FFCC00');
    ctx.strokeStyle = borderGrad;
    ctx.strokeRect(28, 28, 968, 1480);

    // Subtle Inner Guide Rim
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
    ctx.strokeRect(50, 50, 924, 1436);

    // Top Header: Monospace telemetry
    ctx.font = 'bold 30px monospace';
    ctx.fillStyle = '#FFCC00';
    ctx.letterSpacing = '8px';
    ctx.fillText('CELESTIUS // MEMBER PASS', 72, 120);

    ctx.font = '22px monospace';
    ctx.fillStyle = '#00F5FF';
    ctx.letterSpacing = '4px';
    ctx.fillText('CIT CHENNAI · TECHNICAL COMMUNITY', 72, 160);

    // Header divider line
    ctx.beginPath();
    ctx.moveTo(72, 185);
    ctx.lineTo(952, 185);
    ctx.strokeStyle = 'rgba(255, 204, 0, 0.35)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Holographic Cyber Smart Chip (Golden Yellow Contacts + Aqua Core)
    ctx.fillStyle = '#101016';
    ctx.fillRect(72, 230, 190, 140);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFCC00';
    ctx.strokeRect(72, 230, 190, 140);

    // Chip contact divider lines
    ctx.strokeStyle = '#FFCC00';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(102, 255, 130, 90);
    ctx.beginPath();
    ctx.moveTo(167, 230); ctx.lineTo(167, 370);
    ctx.moveTo(72, 300); ctx.lineTo(102, 300);
    ctx.moveTo(232, 300); ctx.lineTo(262, 300);
    ctx.stroke();

    // Chip Aqua Core dot
    ctx.fillStyle = '#00F5FF';
    ctx.beginPath();
    ctx.arc(167, 300, 10, 0, Math.PI * 2);
    ctx.fill();

    // Telemetry label next to chip
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#00F5FF';
    ctx.fillText('ACCESS LEVEL : 01', 300, 275);
    ctx.fillStyle = '#FFCC00';
    ctx.fillText('CREW RECRUIT // 2026', 300, 315);
    ctx.font = '18px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('AUTHENTICATION: VERIFIED', 300, 350);

    // Centerpiece: Glowing Celestius Celestial Compass Star (The Welcome Crest)
    const centerX = 512;
    const centerY = 740;

    // Glowing concentric rings
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 204, 0, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 190, 0, Math.PI * 2);
    ctx.stroke();

    // 8-Pointed Star Crest
    ctx.fillStyle = '#FFCC00';
    ctx.shadowColor = '#FFCC00';
    ctx.shadowBlur = 35;

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    drawStar(centerX, centerY, 8, 140, 55);
    ctx.shadowBlur = 0;

    // Center Core Aqua Dot
    ctx.fillStyle = '#00F5FF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
    ctx.fill();

    // Welcoming Member Title
    ctx.textAlign = 'center';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('WELCOME ABOARD', centerX, 1080);

    ctx.font = 'bold 36px monospace';
    ctx.fillStyle = '#00F5FF';
    ctx.fillText('JOIN THE CELESTIUS CREW', centerX, 1140);

    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FFCC00';
    ctx.fillText('STATUS: INVITATION ACTIVE', centerX, 1190);

    // Bottom Barcode & Verification Strip
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0, 245, 255, 0.15)';
    ctx.fillRect(72, 1260, 880, 170);
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(72, 1260, 880, 170);

    // Realistic Barcode Lines
    ctx.fillStyle = '#00F5FF';
    let barX = 100;
    while (barX < 720) {
      const barW = Math.random() > 0.5 ? 8 : 4;
      ctx.fillRect(barX, 1290, barW, 90);
      barX += barW + (Math.random() > 0.4 ? 9 : 5);
    }

    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#FFCC00';
    ctx.fillText('CLS-CIT-2026', 750, 1345);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '16px monospace';
    ctx.fillText('OFFICIAL REGISTRATION', 740, 1375);

    const cardTexture = new THREE.CanvasTexture(canvas);
    cardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 5. Card 3D Geometry
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Extruded Rounded Member Pass
    const cardWidth = 2.4;
    const cardHeight = 3.6;
    const cardRadius = 0.22;
    const cardDepth = 0.08;

    const shape = new THREE.Shape();
    const x = -cardWidth / 2;
    const y = -cardHeight / 2;
    shape.moveTo(x + cardRadius, y);
    shape.lineTo(x + cardWidth - cardRadius, y);
    shape.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + cardRadius);
    shape.lineTo(x + cardWidth, y + cardHeight - cardRadius);
    shape.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - cardRadius, y + cardHeight);
    shape.lineTo(x + cardRadius, y + cardHeight);
    shape.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - cardRadius);
    shape.lineTo(x, y + cardRadius);
    shape.quadraticCurveTo(x, y, x + cardRadius, y);

    const extrudeSettings = {
      depth: cardDepth,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const cardGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    cardGeo.center();

    // Materials: Front has texture, back and sides have deep metallic finish
    const frontMat = new THREE.MeshStandardMaterial({
      map: cardTexture,
      roughness: 0.2,
      metalness: 0.7,
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x07070d,
      roughness: 0.25,
      metalness: 0.9,
    });

    const cardMesh = new THREE.Mesh(cardGeo, [frontMat, bodyMat]);
    masterGroup.add(cardMesh);

    // Holographic Sweeping Laser Scan Line (Aqua)
    const scanGeo = new THREE.PlaneGeometry(cardWidth * 1.08, 0.06);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const scanLine = new THREE.Mesh(scanGeo, scanMat);
    scanLine.position.z = cardDepth / 2 + 0.055;
    masterGroup.add(scanLine);

    // Magnetic Docking Lanyard Ring at Top
    const ringGeo = new THREE.TorusGeometry(0.32, 0.05, 24, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x181824,
      emissive: 0x00222a,
      roughness: 0.15,
      metalness: 0.95,
    });
    const lanyardRing = new THREE.Mesh(ringGeo, ringMat);
    lanyardRing.position.set(0, cardHeight / 2 + 0.28, 0);
    masterGroup.add(lanyardRing);

    // Orbiting Starlight Particles (Stars welcoming the recruit)
    const starCount = 80;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorAqua = new THREE.Color(0x00F5FF);
    const colorYellow = new THREE.Color(0xFFCC00);

    for (let i = 0; i < starCount; i++) {
      const radius = 1.4 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const zOffset = (Math.random() - 0.5) * 1.8;

      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = Math.sin(angle) * radius;
      starPositions[i * 3 + 2] = zOffset;

      const pick = Math.random() > 0.4 ? colorAqua : colorYellow;
      starColors[i * 3] = pick.r;
      starColors[i * 3 + 1] = pick.g;
      starColors[i * 3 + 2] = pick.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const starParticles = new THREE.Points(starGeo, starMat);
    masterGroup.add(starParticles);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Floating sin oscillation (Levitation)
      masterGroup.position.y = Math.sin(t * 1.6) * 0.14;

      // Sweeping Holographic Laser Scanner across the card
      scanLine.position.y = Math.sin(t * 2.2) * (cardHeight * 0.44);

      // Rotating starlight halo
      starParticles.rotation.z = t * 0.25;

      // Interactive 3D Perspective Tilt
      masterGroup.rotation.x = mouseRef.current.y * 0.45 + 0.12;
      masterGroup.rotation.y = mouseRef.current.x * 0.55 + Math.sin(t * 0.8) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardGeo.dispose();
      scanGeo.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      cardTexture.dispose();
      frontMat.dispose();
      bodyMat.dispose();
      scanMat.dispose();
      ringMat.dispose();
      starMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
    />
  );
}

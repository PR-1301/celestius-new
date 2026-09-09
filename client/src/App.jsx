import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import IntroAnimation from './components/IntroAnimation';
import DynamicBackground from './components/DynamicBackground';

import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';

export default function App() {
  const getInitialPage = () => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'events', 'team', 'recruitment', 'contact'];

    if (validPages.includes(rawPath)) {
      if (rawPath === 'home') {
        window.history.replaceState(null, '', '/');
      }
      return rawPath;
    }

    // Redirect obsolete auth paths directly to home
    if (['login', 'auth', 'sign-in', 'sign-up', 'dashboard', 'profile', 'sso-callback'].includes(rawPath)) {
      window.history.replaceState(null, '', '/');
      return 'home';
    }

    // Automatically migrate any legacy #hash links (e.g. /#recruitment -> /recruitment)
    if (validPages.includes(rawHash)) {
      const cleanPath = rawHash === 'home' ? '/' : `/${rawHash}`;
      window.history.replaceState(null, '', cleanPath);
      return rawHash;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Always show intro animation on load
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
  };

  const handleReplayIntro = () => {
    setIntroCompleted(false);
    setShowIntro(true);
  };

  // Browser back/forward navigation support
  useEffect(() => {
    const handlePopState = () => {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const validPages = ['home', 'events', 'team', 'recruitment', 'contact'];
      const page = validPages.includes(rawPath) ? rawPath : 'home';
      setActivePage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    const targetPath = newPage === 'home' ? '/' : `/${newPage}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col bg-[#060608] text-zinc-100 antialiased selection:bg-[#FFCC00] selection:text-black overflow-x-hidden font-sans"
    >
      {/* Intro Boot Animation featuring Athena & Hephaestus */}
      {showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Minimal Animated Dynamic Celestial Background (Common across all pages) */}
      <DynamicBackground mousePos={mousePos} />

      {/* Floating Nothing OS Navbar with Mechanical Holder */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        introCompleted={introCompleted}
      />

      {/* Main Page Container */}
      <main key={activePage} className="relative z-10 flex-1 w-full animate-page-enter">
        {activePage === 'home' && (
          <Home 
            setActivePage={handlePageChange} 
            setSelectedEvent={setSelectedEvent} 
            introCompleted={introCompleted}
          />
        )}
        {activePage === 'events' && (
          <Events 
            setSelectedEvent={setSelectedEvent} 
          />
        )}
        {activePage === 'team' && (
          <Team />
        )}
        {activePage === 'recruitment' && (
          <Recruitment introCompleted={introCompleted} />
        )}
        {activePage === 'contact' && (
          <Contact introCompleted={introCompleted} />
        )}
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Celestius Gold Minimal Footer with Replay Intro trigger */}
      <Footer setActivePage={handlePageChange} onReplayIntro={handleReplayIntro} />

    </div>
  );
}

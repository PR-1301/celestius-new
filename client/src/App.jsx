import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import IntroAnimation from './components/IntroAnimation';

import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'auth'];
    return validPages.includes(hash) ? hash : 'home';
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'auth'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    window.location.hash = newPage;
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

      {/* Nothing OS Iconic Pixel Dot Grid Canvas */}
      <div className="fixed inset-0 nothing-dot-grid opacity-25 pointer-events-none z-0" />
      
      {/* Subtle Celestius Gold Ambient Glow following cursor */}
      <div 
        className="pointer-events-none fixed -inset-px opacity-60 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 204, 0, 0.04), transparent 80%)`
        }}
      />

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
          <Contact />
        )}
        {activePage === 'auth' && (
          <Auth 
            setActivePage={handlePageChange} 
          />
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

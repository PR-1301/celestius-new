import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import OnboardingModal from './components/OnboardingModal';
import IntroAnimation from './components/IntroAnimation';
import DynamicBackground from './components/DynamicBackground';
import { useAuthContext, isClerkKeyValid } from './context/AuthContext';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function App() {
  const { isOnboardingOpen, setIsOnboardingOpen } = useAuthContext();

  const getInitialPage = () => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'login', 'dashboard', 'profile'];

    if (rawPath === 'sso-callback') {
      return 'sso-callback';
    }

    if (rawPath === 'sign-in' || rawPath === 'sign-up' || rawPath === 'auth' || rawPath === 'login') {
      window.history.replaceState(null, '', '/login');
      return 'login';
    }

    if (validPages.includes(rawPath)) {
      if (rawPath === 'home') {
        window.history.replaceState(null, '', '/');
      }
      return rawPath;
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
      const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'login', 'dashboard', 'profile'];
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
          <Contact />
        )}
        {activePage === 'login' && (
          <Login 
            setActivePage={handlePageChange} 
          />
        )}
        {activePage === 'dashboard' && (
          <Dashboard 
            setActivePage={handlePageChange} 
          />
        )}
        {activePage === 'profile' && (
          <Profile 
            setActivePage={handlePageChange} 
          />
        )}
        {activePage === 'sso-callback' && isClerkKeyValid && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono text-xs text-zinc-400">
            <AuthenticateWithRedirectCallback 
              signInUrl="/login"
              signUpUrl="/login"
              continueSignUpUrl="/login"
              signInForceRedirectUrl="/dashboard" 
              signUpForceRedirectUrl="/dashboard" 
            />
            <span className="mt-4 text-[#FFCC00] animate-pulse">SYNCHRONIZING CIT CREDENTIALS...</span>
          </div>
        )}
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* 1st-Time Student Onboarding Modal */}
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />

      {/* Celestius Gold Minimal Footer with Replay Intro trigger */}
      <Footer setActivePage={handlePageChange} onReplayIntro={handleReplayIntro} />

    </div>
  );
}

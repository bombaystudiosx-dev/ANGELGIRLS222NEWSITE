/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import TextReveal from './components/TextReveal';
import GirlsShowcase, { eliteGirls } from './components/GirlsShowcase';
import BookingForm from './components/BookingForm';
import LocationSEOView from './components/LocationSEOView';
import AgeGate from './components/AgeGate';
import { ParticleConfig, ActiveView, BookingState, HiringApplication, Girl } from './types';
// @ts-ignore
import gateBg from './assets/images/gate_background_1779823298841.png';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Flame, 
  PhoneCall, 
  MessageSquare, 
  Heart, 
  Info, 
  Menu, 
  X, 
  Star, 
  DollarSign, 
  Smartphone, 
  UserPlus, 
  Calendar, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  BookOpen,
  Send,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // 1. Centralized Flowfield Configuration for gorgeous background pink particles
  const [bgConfig, setBgConfig] = useState<ParticleConfig>({
    mode: 'WAVES',
    speed: 0.8,
    color: 'CRIMSON',
    density: 3500,
    repelForce: 1.4,
    mouseEffect: 'REPEL',
  });

  // 2. Navigation Routing & Age Verification State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 3. Selection of Dancers & Active Booking State
  const [selectedGirlIds, setSelectedGirlIds] = useState<string[]>([]);
  const [currentBooking, setCurrentBooking] = useState<BookingState | null>(null);

  // 4. Hiring applications simulation
  const [hiringFormSubmitted, setHiringFormSubmitted] = useState(false);
  const [hiringData, setHiringData] = useState<HiringApplication>({
    name: '',
    age: '',
    phone: '',
    instagram: '',
    height: '',
    experience: '',
    message: '',
    referredBy: ''
  });

  // 5. Clock state for the upper status ticker
  const [timeStr, setTimeStr] = useState('');

  // Custom states for handling immersive video player states/fallbacks resiliently
  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // 6. Contact & Legal configurations
  const phoneNumberVal = '702-556-3772';

  useEffect(() => {
    // Check localStorage for 21+ verification
    const verified = localStorage.getItem('ag222_age_verified');
    if (verified === 'true') {
      setAgeVerified(true);
    } else {
      setAgeVerified(false);
    }

    // Hash routing listener to allow browser forward/back buttons in SPA
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/booking') setActiveView('booking');
      else if (hash === '#/about') setActiveView('about');
      else if (hash === '#/hiring') setActiveView('hiring');
      else if (hash === '#/terms') setActiveView('terms');
      else if (hash === '#/privacy') setActiveView('privacy');
      else if (hash === '#/thank-you') setActiveView('thank-you');
      else if (hash === '#/locations/mid-strip') setActiveView('location-mid-strip');
      else if (hash === '#/locations/north-strip') setActiveView('location-north-strip');
      else if (hash === '#/locations/south-strip') setActiveView('location-south-strip');
      else if (hash === '#/locations/downtown') setActiveView('location-downtown');
      else if (hash === '#/locations/off-strip-west') setActiveView('location-off-strip-west');
      else if (hash === '#/locations/off-strip-east') setActiveView('location-off-strip-east');
      else setActiveView('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(timer);
    };
  }, []);

  // 2B. Direct SEO Metadata Dynamics Injection for Search Engine Crawlers & Real-Time Hydration
  useEffect(() => {
    const seoData: Record<ActiveView, { title: string; desc: string }> = {
      home: {
        title: "Angel Girls 222 | Elite Las Vegas Outcall Dancers & VIP Companions",
        desc: "Angel Girls 222 is the select provider of luxury Las Vegas outcall companions, sensual party dancers, and elegant hostesses for casino hospitality hotels, suites, and private events."
      },
      booking: {
        title: "Reserve Luxury Las Vegas Companions & Showgirls | Angel Girls 222",
        desc: "Explore our active verified companion lineups. Choose single or multi-performer reservations, configure outcall location guidelines, and secure on-demand hotel dancer dispatch."
      },
      about: {
        title: "Licensed Las Vegas Outcall Companion Agency | About Angel Girls 222",
        desc: "Learn about Angel Girls 222. Voted #1 Vegas dancer hostesses. Highly professional, background-screened independent contractors operating under strict outcall agency compliance."
      },
      hiring: {
        title: "Vegas Dancer Jobs & Hostess Auditions | Become a Vegas Angel",
        desc: "Calling top-tier local entertainers & dancers. Apply to join Angel Girls 222. Legal and vetted companion registry. Flexible scheduling, high compensation, and luxury resort safety measures."
      },
      terms: {
        title: "Agency Terms of Service & Legal Outcall Compliance | Angel Girls 222",
        desc: "Review and access standard booking contracts, outcall service rules, legal disclaimer, and strict compliance with Nevada outcall regulations."
      },
      privacy: {
        title: "Privacy Guard Policies & Secure Anonymity Standards | Angel Girls 222",
        desc: "We protect our clients' confidential details, booking records, payment receipts, and dispatch addresses with 100% encrypted, secure double-blind verification."
      },
      'thank-you': {
        title: "Reservation Initialized | Angel Girls 222 Las Vegas",
        desc: "Your booking details are secured in our dispatch queue. Check your mobile device for our immediate deposit invoice callback locks."
      },
      'location-mid-strip': {
        title: "Mid-Strip Luxury Outcall Companions - Caesars & Bellagio | Angel Girls 222",
        desc: "Providing instant 15-minute dispatch companions to Caesars Palace, Bellagio, Cosmo, Aria, Venetian & Palazzo luxury resort towers on Las Vegas Boulevard, NV."
      },
      'location-north-strip': {
        title: "North-Strip & Convention Dancers - Wynn & Fontainebleau | Angel Girls 222",
        desc: "Upscale companion entertainment and table dancer services serving Fontainebleau, Resorts World, Encore, and Circus Circus conventions and suites."
      },
      'location-south-strip': {
        title: "South Strip Resort Hostesses - MGM Grand & Luxor | Angel Girls 222",
        desc: "Authorized dancer hostesses for south Las Vegas Blvd hotel suites. Dispatching to MGM Grand, Tropicana, Excalibur, and Mandalay Bay hotel towers."
      },
      'location-downtown': {
        title: "Downtown Fremont Street Outcalls - Circa & Golden Nugget | Angel Girls 222",
        desc: "Historic downtown Fremont Street experiences. Classy custom showgirls and party companions dispatched to Circa Resort, Golden Nugget, and boutique suites."
      },
      'location-off-strip-west': {
        title: "Off-Strip West & Summerlin Mansions Companions | Angel Girls 222",
        desc: "Exclusive private residential villa dancers and luxury tower outcall hostesses serving Summerlin estates, Palms Place, and Rio towers."
      },
      'location-off-strip-east': {
        title: "Off-Strip East & Henderson Estates Companion Services | Angel Girls 222",
        desc: "Serving Virgin Hotels, Hard Rock area, business complexes, corporate suites, and Henderson luxury golf estate villas. Private, quiet elite escort services."
      }
    };

    const currentSeo = seoData[activeView] || seoData.home;
    document.title = currentSeo.title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', currentSeo.desc);
      document.head.appendChild(metaDesc);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const pageUrl = window.location.href;
    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', pageUrl);
      document.head.appendChild(canonical);
    }
  }, [activeView]);

  // Set view helper with hash update
  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view.startsWith('location-')) {
      const region = view.replace('location-', '');
      window.location.hash = `#/locations/${region}`;
    } else {
      window.location.hash = `#/${view === 'home' ? '' : view}`;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Age verification handler
  const handleAgeVerified = () => {
    setAgeVerified(true);
  };

  // Booking submit pipeline
  const handleConfirmReservation = (booking: BookingState) => {
    setCurrentBooking(booking);
    navigateTo('thank-you');
  };

  // Hiring Application submit handler
  const handleApplyToAngel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiringData.name || !hiringData.phone || !hiringData.age) {
      alert('Please fill out Name, Age, and Contact Phone to proceed, Angel.');
      return;
    }
    setHiringFormSubmitted(true);
  };

  // Quick reset to build application
  const handleResetForms = () => {
    setSelectedGirlIds([]);
    setCurrentBooking(null);
    setHiringFormSubmitted(false);
    setHiringData({
      name: '',
      age: '',
      phone: '',
      instagram: '',
      height: '',
      experience: '',
      message: '',
      referredBy: ''
    });
    navigateTo('home');
  };

  return (
    <div className="relative min-h-screen bg-[#07070A] text-white font-sans overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* 1. REAL-TIME COMPREHENSIVE SEO & LOCALBUSINESS JSON-LD SCHEMA INJECTION */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Angel Girls 222",
          "description": "Premium Las Vegas Outcall Dancers & Luxury Companions delivering private entertainment to hotels, villas, and bachelor parties.",
          "url": "https://angelgirls222.com",
          "telephone": "+1-702-556-3772",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Las Vegas",
            "addressRegion": "NV",
            "addressCountry": "US"
          },
          "areaServed": "Las Vegas, Nevada",
          "priceRange": "$$$",
          "image": gateBg,
          "sameAs": ["https://instagram.com/angelgirls222lv"]
        })}
      </script>

      {/* 3D WebGL Glowing Hot Pink Particle Wave Background */}
      <ParticleBackground config={bgConfig} />

      {/* Premium Lag-Compensated Custom Cursor */}
      <CustomCursor />

      {/* Real-time Ambient Darkening Vignette Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07070a75] to-[#07070Ae6] -z-10" />

      {/* Interactive Age Verification gate Blocking Layer */}
      <AnimatePresence>
        {ageVerified === false && (
          <AgeGate onVerified={handleAgeVerified} />
        )}
      </AnimatePresence>

      {/* Main Navigation Header (Sticky Glassmorphic Panel) */}
      <header className="fixed top-0 left-0 w-full px-6 py-4 md:py-6 lg:px-12 flex justify-between items-center z-40 bg-[#07070A50] backdrop-blur-md border-b border-white/5">
        
        {/* Brand Trigger Logo (Left aligned) */}
        <div className="flex-1 flex justify-start">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }} 
            className="font-display text-xl md:text-2xl font-black tracking-normal flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <span className="w-4 h-4 rounded-full bg-accent relative flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            </span>
            <span className="glow-pink tracking-widest text-white uppercase flex items-baseline">
              ANGEL GIRLS <span className="text-accent ml-1 italic font-mono font-bold text-lg md:text-xl">222</span>
            </span>
          </a>
        </div>

        {/* Centered Navigation Link Tabs (Absolute Center) */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
          <button 
            onClick={() => navigateTo('home')} 
            className={`font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'home' ? 'text-accent glow-pink font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('booking')} 
            className={`font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'booking' ? 'text-accent glow-pink font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Angels Roster
          </button>
          <button 
            onClick={() => navigateTo('about')} 
            className={`font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'about' ? 'text-accent glow-pink font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            About Us
          </button>
          <button 
            onClick={() => navigateTo('hiring')} 
            className={`font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'hiring' ? 'text-accent glow-pink font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Hiring
          </button>
        </nav>

        {/* Action button & Clock utilities (Right aligned) */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Dynamic ticking universal UTC clock for elite agency security feel */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-white/30 tracking-widest bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-[#0ad6ff]" />
            <span>{timeStr || 'CALIBRATING SECURITY CLOCK...'}</span>
          </div>

          <button 
            onClick={() => navigateTo('booking')} 
            className="hidden md:inline-block font-mono text-[11px] text-white bg-accent hover:bg-accent-hover font-black uppercase tracking-widest px-5 py-2.5 rounded shadow-lg shadow-accent/15 transition-all cursor-pointer hover:scale-102"
          >
            Book Now
          </button>

          {/* TOP Hamburger trigger for Mobile drawer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-accent cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Spring Sidebar Drawer for Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm h-full bg-[#07070Af8] backdrop-blur-2xl border-l border-white/5 z-55 p-8 flex flex-col justify-between"
          >
            <div className="space-y-10">
              {/* Header inside drawer */}
              <div className="flex justify-between items-center pb-5 border-b border-white/5">
                <span className="font-display font-black text-white tracking-widest glow-pink text-lg">
                  ANGEL NAV
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/40 hover:text-white cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation link stacks */}
              <nav className="flex flex-col gap-6 text-left">
                <button
                  onClick={() => navigateTo('home')}
                  className="font-display text-2xl font-extrabold hover:text-accent text-white/80 transition-colors text-left"
                >
                  01 // Home
                </button>
                <button
                  onClick={() => navigateTo('booking')}
                  className="font-display text-2xl font-extrabold hover:text-accent text-white/80 transition-colors text-left"
                >
                  02 // Book Angels
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="font-display text-2xl font-extrabold hover:text-accent text-white/80 transition-colors text-left"
                >
                  03 // About Agency
                </button>
                <button
                  onClick={() => navigateTo('hiring')}
                  className="font-display text-2xl font-extrabold hover:text-accent text-white/80 transition-colors text-left"
                >
                  04 // Join The Team
                </button>
                <button
                  onClick={() => navigateTo('terms')}
                  className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest text-left"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest text-left"
                >
                  Privacy Policy
                </button>
              </nav>
            </div>

            {/* Quick click contacts footer in drawer */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <span className="block font-mono text-[9px] tracking-widest text-white/30 uppercase">
                [EXECUTIVE ASSISTANCE]
              </span>
              <a
                href={`tel:${phoneNumberVal}`}
                className="flex items-center gap-3 text-lg font-extrabold text-accent glow-pink"
              >
                <PhoneCall className="w-5 h-5" /> {phoneNumberVal}
              </a>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Call/text available 24/7. Verified galleries unlocked instantly on deposit.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER CONTENT BODY */}
      <main className="relative z-10 w-full pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          
          {/* VIEW CASE 1: HOME PAGE */}
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-24 md:space-y-36"
            >
              
              {/* IMMERSIVE VIDEO LOOP CONTAINER (WORDS REMOVED FOR CLEAN KINETIC LOOK) */}
              <section className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,46,136,0.15)] bg-black flex items-center justify-center">
                {!videoError ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      console.warn("Video failed to play/load. Enforcing beautiful local gateway poster fallback.");
                      setVideoError(true);
                    }}
                    onPlay={() => setVideoPlaying(true)}
                    className="absolute inset-0 w-full h-full object-cover scale-100 transition-opacity duration-700"
                    style={{ opacity: videoPlaying ? 0.9 : 0 }}
                  >
                    {/* Source list of several ultra-reliable premium nightscape/las vegas background loop streams */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-building-on-the-las-vegas-strip-40244-large.mp4" type="video/mp4" />
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-las-vegas-strip-neon-lights-and-casinos-at-night-40348-large.mp4" type="video/mp4" />
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-city-lights-at-night-from-above-4435-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                
                {/* Custom animated Ken-Burns image overlay if video hasn't loaded yet or failed completely */}
                {(!videoPlaying || videoError) && (
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out scale-105 animate-pulse" 
                    style={{ 
                      backgroundImage: `url(${gateBg})`, 
                      filter: 'brightness(0.6) contrast(1.1) saturate(1.2) hue-rotate(-5deg)' 
                    }}
                  />
                )}
                
                {/* Radial and Linear twilight neon overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-black/35 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#07070A50] pointer-events-none" />

                {/* Highly focused elegant call to actions overlaying the loop video */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full px-6 flex flex-wrap gap-4 justify-center items-center">
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-8 py-3.5 bg-gradient-to-r from-accent to-pink-500 rounded-xl font-mono text-xs tracking-widest uppercase font-black shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 text-white"
                  >
                    <Star className="w-4 h-4 text-white animate-pulse" /> BOOK DANCERS
                  </button>
                  <a
                    href={`tel:${phoneNumberVal}`}
                    className="px-8 py-3.5 bg-[#07070A]/85 backdrop-blur-md border border-white/10 hover:border-[#FF2E88]/45 text-white/95 hover:text-white rounded-xl font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-2.5 transition-all hover:scale-105"
                  >
                    <PhoneCall className="w-4 h-4 text-accent" /> CALL 24/7 HOTLINE
                  </a>
                </div>
              </section>

              {/* MEETS CUSTOMER SEPARATOR SECTION: INTRODUCTORY BRIEF */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 select-text text-left">
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-xs font-mono tracking-[0.25em] font-extrabold uppercase">// VEGAS DISCREET OUT CALLS</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-black tracking-normal leading-tight text-white m-0">
                    Why Choose Angel Girls 222 Dancers?
                  </h2>
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                    Las Vegas NV is synonymous with high-stakes thrills, glamorous casinos, and ultimate VIP freedom. At <strong className="text-white font-bold">Angel Girls 222</strong>, we extend those standards in our booking files. We are not a low-grade directory; we are an elite companion agency supplying fully vetted, legally compliant sensual dancers and luxury companions to VIP clients, conventioneers, and private events.
                  </p>
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                    Our dynamic performers specialize in high-energy custom choreography, exotic pool party hosting, and elegant arm candy companion roles for your casino dinners and table configurations. Each entertainer undergoes regular medical screening and legal registry, ensuring your complete comfort and safety.
                  </p>
                </div>

                {/* Side interactive visual bento card showing roster count */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white/5 to-[#07070A] border border-white/10 rounded-2xl p-6.5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
                  <span className="block text-[#FF2E88] font-mono text-[10px] tracking-widest font-bold uppercase mb-2">
                    [REAL-TIME SPOTLIGHT ROSTER STATUS]
                  </span>
                  <div className="text-6xl font-display font-black text-white py-4 flex justify-center items-baseline gap-1.5 glow-pink">
                    <span>24</span>
                    <span className="text-accent text-3xl animate-pulse">/</span>
                    <span className="text-3xl text-white/50">7</span>
                  </div>
                  <span className="text-xs font-mono uppercase font-black text-white/80 block mb-6">
                    Angels On-Call Status Las Vegas
                  </span>

                  <div className="space-y-3">
                    <button
                      onClick={() => navigateTo('booking')}
                      className="w-full py-3.5 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow hover:bg-accent-hover transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Browse Available Angels <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] text-white/40 block leading-normal italic select-none">
                      * All bookings undergo SMS mobile caller verification for performer protection.
                    </span>
                  </div>
                </div>
              </section>

              {/* THREE DYNAMIC CHROME BLOCKS PROMOTING PRESTIGE SERVICES */}
              <section className="space-y-12">
                <div className="text-center md:text-left">
                  <span className="text-accent font-mono text-xs tracking-widest uppercase font-black">// SERVICE PORTFOLIO</span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-normal text-white mt-1">Our Elite Adult Show Configurations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      h: 'Full Nude Dancers',
                      p: 'Ultimate private exotic shows formatted for luxury penthouse suites. Highly sensuous, breathtaking choreographic routines.',
                      r: '$750 / Hr per Angel',
                      clr: 'text-accent border-[#FF2E88]/15 hover:border-[#FF2E88]/40 bg-[#FF2E88]/5'
                    },
                    {
                      h: 'Topless Exotic Dancers',
                      p: 'Tasteful, high-vibe sensual dancing designed for private pools, casino villas, and VIP hospitality tables.',
                      r: '$600 / Hr per Angel',
                      clr: 'text-[#0ad6ff] border-[#0ad6ff]/15 hover:border-[#0ad6ff]/40 bg-[#0ad6ff]/5'
                    },
                    {
                      h: 'Pool Parties & Events',
                      p: 'Aesthetic, bikini-dressed social dancers hosting private cabanas, yacht layouts, or premium bachelor party groups.',
                      r: '$500 / Hr per Angel',
                      clr: 'text-amber-400 border-amber-400/15 hover:border-amber-400/40 bg-amber-400/5'
                    },
                    {
                      h: 'Arm Candy Dates',
                      p: 'Highly sophisticated, glamorous companion accompaniment for dinners, high-stakes poker, and VIP clubs in Vegas.',
                      r: '$500 / Hr per Angel',
                      clr: 'text-green-400 border-green-400/15 hover:border-green-400/40 bg-green-400/5'
                    }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${srv.clr}`}
                    >
                      <div className="space-y-4">
                        <span className="font-display text-xl font-bold text-white block">{srv.h}</span>
                        <p className="text-xs text-white/50 leading-relaxed font-light">{srv.p}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-baseline">
                        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Rate starting:</span>
                        <span className="font-mono text-sm font-bold text-white">{srv.r}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* TESTIMONIALS & TRUST HIGH-CONVERSION CAROUSEL GRID */}
              <section className="py-12 border-y border-white/5 bg-white/5 rounded-3xl p-8 relative overflow-hidden select-text">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <span className="font-mono text-xs tracking-widest text-accent uppercase font-bold">// VERIFIED HIGH-ROLLER REVIEWS</span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-normal text-white">Vegas VIP Clientele Feedback</h2>
                  
                  <div className="space-y-4 pt-4">
                    <p className="font-serif italic text-lg text-white/80 leading-relaxed tracking-wide">
                      "Absolutely breathtaking performance. We booked Bella and Chloe for my partner's bachelor suite party at the Caesars Octavius Villa. The physical dancing routines were hypnotic, and the girls' hospitality and discretion were unparalleled. Angel Girls 222 is the gold standard of real Las Vegas companions."
                    </p>
                    <div className="flex justify-center items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="block font-mono text-xs uppercase text-white/50 tracking-widest">
                      VIP Cardholder // Executive Recruiter NY
                    </span>
                  </div>
                </div>
              </section>

              {/* VIP REGIONAL OUTPOSTS & HOTEL DISPATCH GUIDES (HIGHLY OPTIMIZED FOR SEO & CRAWLERS) */}
              <section className="space-y-10 text-left">
                <div className="text-center md:text-left space-y-2">
                  <span className="text-accent font-mono text-xs tracking-widest uppercase font-black">// LOCAL GEOGRAPHIC DISPATCH SITEMAP</span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-normal text-white m-0">Vegas Regional Outposts &amp; Hotel Guides</h2>
                  <p className="text-white/55 text-xs md:text-sm font-light max-w-2xl leading-relaxed tracking-normal">
                    Select your proximity outpost coordinate to unlock localized independent performer lists, custom resort landmark directories, and active dispatch ETAs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      id: 'mid-strip',
                      name: 'Mid-Strip / Luxury Core',
                      eta: '15 - 25 Min Dispatch',
                      hotels: 'Bellagio, Caesars, Cosmo, Aria, Venetian',
                      color: 'border-[#FF2E88]/30 hover:border-[#FF2E88]',
                      glyphColor: '#FF2E88',
                      desc: 'Premium suite dispatch covering central Las Vegas Boulevard hotel towers and VIP pool cabanas.'
                    },
                    {
                      id: 'north-strip',
                      name: 'North-Strip / Convention',
                      eta: '20 - 30 Min Dispatch',
                      hotels: 'Wynn, Fontainebleau, Resorts World, Encore',
                      color: 'border-[#0ad6ff]/30 hover:border-[#0ad6ff]',
                      glyphColor: '#0ad6ff',
                      desc: 'Convention lofts and luxury penthouse support. Refined showgirls for dining and lounge accompaniment.'
                    },
                    {
                      id: 'south-strip',
                      name: 'South Strip Area',
                      eta: '20 - 30 Min Dispatch',
                      hotels: 'MGM Grand, Mandalay Bay, Luxor, Excalibur',
                      color: 'border-[#9d4edd]/30 hover:border-[#9d4edd]',
                      glyphColor: '#9d4edd',
                      desc: 'Serving the south end towers close to airport suites. Energetic dancers for private bachelor events.'
                    },
                    {
                      id: 'downtown',
                      name: 'Downtown / Fremont St',
                      eta: '25 - 35 Min Dispatch',
                      hotels: 'Circa Resort, Golden Nugget, The D Casino',
                      color: 'border-[#39ff14]/30 hover:border-[#39ff14]',
                      glyphColor: '#39ff14',
                      desc: 'Vintage Vegas high-energy Casinos, historic neon suites, and private downtown penthouse party lofts.'
                    },
                    {
                      id: 'off-strip-west',
                      name: 'Off-Strip West / Summerlin',
                      eta: '30 - 45 Min Dispatch',
                      hotels: 'Palms Place, Summerlin Estates, Rio Towers',
                      color: 'border-[#ff9f1c]/30 hover:border-[#ff9f1c]',
                      glyphColor: '#ff9f1c',
                      desc: 'Residential villas, luxury estate properties, and boutique high-rise towers of West Flamingo.'
                    },
                    {
                      id: 'off-strip-east',
                      name: 'Off-Strip East / Henderson',
                      eta: '35 - 50 Min Dispatch',
                      hotels: 'Virgin Hotels, Henderson Mansions, Green Valley',
                      color: 'border-[#f72585]/30 hover:border-[#f72585]',
                      glyphColor: '#f72585',
                      desc: 'Gated golf estates, Paradise corridor corporate pads, and quiet Henderson luxury villa outcalls.'
                    }
                  ].map((loc) => (
                    <a 
                      key={loc.id}
                      href={`#/locations/${loc.id}`}
                      onClick={(e) => { e.preventDefault(); navigateTo(`location-${loc.id}` as any); }}
                      className={`block bg-[#0b0b14]/50 border backdrop-blur-sm rounded-2xl p-6 hover:bg-[#0b0b14] transition-all scale-100 hover:scale-102 duration-300 group select-text ${loc.color}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ 
                              backgroundColor: loc.glyphColor,
                              boxShadow: `0 0 10px ${loc.glyphColor}`
                            }} 
                          />
                          <span className="font-display font-extrabold text-white text-base group-hover:text-[#FF2E88] transition-colors">
                            {loc.name}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-[#39ff14] bg-[#39ff14]/10 border border-[#39ff14]/30 px-1.5 py-0.5 rounded tracking-wider uppercase font-extrabold shrink-0 animate-pulse">
                          {loc.eta.split(' ')[0]}m ETA
                        </span>
                      </div>
                      
                      <p className="text-white/45 text-xs font-light leading-relaxed mb-4 min-h-[48px]">
                        {loc.desc}
                      </p>

                      <div className="font-mono text-[10px] text-white/35 leading-normal border-t border-white/5 pt-3">
                        <span className="text-white/60 font-bold block mb-1">Resorts Index:</span>
                        <p className="truncate text-white/50">{loc.hotels}</p>
                      </div>

                      <div className="font-mono text-[10px] text-accent font-bold mt-4 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        Explore Local Listings &amp; Landmark Guides ➔
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* DENSE LOCAL CONVERSION HIGH SEO VALUE FAQS ACCORDION SECTION */}
              <section className="max-w-4xl mx-auto space-y-12 text-left">
                <div className="text-center space-y-2">
                  <span className="text-[#FF2E88] font-mono text-xs tracking-widest uppercase font-bold">// LAS VEGAS COMPLIANCE & PROTOCOLS</span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-normal text-white mt-1">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      q: 'Are your Las Vegas companion and outcall services 100% legal?',
                      a: 'Absolutely. All performers represented by Angel Girls 222 are legally registered independent contractors providing only legal outcall sensual dancing, party hosting, companion date accompaniment, and private social entertainment because Las Vegas legal regulations fully permit adult outcall dancing. We strictly enforce a Zero-Tolerance policy regarding any solicitation or illegal operations.'
                    },
                    {
                      q: 'How does the deposit system work?',
                      a: 'To guarantee performer safety during outcall companion appointments, we require a standard booking deposit of $150 per entertainer. This deposit is non-refundable, stored securely, and fully credited towards your total companion reservation price due at your hotel suite upon arrival.'
                    },
                    {
                      q: 'How fast can an Angel arrive at my Vegas hotel penthouse?',
                      a: 'Normally, our scheduled outcall dancers depart instantly upon reservation verification. For locations on the Las Vegas Strip, arrival times generally average under 60 minutes. We recommend booking 2-3 hours in advance on busy weekend party cycles.'
                    },
                    {
                      q: 'Will the dancers look exactly like the profiles shown in your booking galleries?',
                      a: 'Yes. Discretion, honesty, and verified companion representations are our primary values. Our interactive portfolio contains actual real-life pictures of the dancers. Once your booking deposit of $150 completes, you receive private, live-verified video and gallery confirmations via secure text to guarantee absolute identity match.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="p-6 md:p-8 bg-white/5 rounded-xl border border-white/5 space-y-3.5">
                      <span className="font-display text-lg md:text-xl font-bold text-white block flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-[#FF2E88] shrink-0 mt-0.5" />
                        {faq.q}
                      </span>
                      <p className="text-sm text-white/60 leading-relaxed font-light pl-8">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CALL-TO-ACTION PANEL DESIGNED TO CAPTURE HIGHEST CONVERSION */}
              <section className="bg-gradient-to-r from-accent/20 via-transparent to-pink-500/10 border border-accent/30 rounded-2xl p-8 md:p-12 text-center select-text">
                <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-normal text-white mb-4">
                  Ready to Initiate Booking?
                </h2>
                <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-normal font-light mb-8">
                  Begin your reservation below by selecting your favorite Las Vegas outcall performers. Fully secure, fully verified, and legally registered.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-8.5 py-4.5 bg-accent hover:bg-accent-hover text-white font-mono text-xs font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-accent/30 hover:scale-102 transition-all cursor-pointer"
                  >
                    Select Angels Roster // Proceed
                  </button>
                  <a
                    href={`tel:${phoneNumberVal}`}
                    className="px-8.5 py-4.5 bg-white/5 border border-white/10 hover:border-accent/40 text-white font-mono text-xs font-black uppercase tracking-widest rounded-lg hover:text-accent flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#39ff14]" /> Call Hot Desk (24/7)
                  </a>
                </div>
              </section>

            </motion.div>
          )}

          {/* VIEW CASE 2: BOOKING FLOW & SHOWCASE GRID */}
          {activeView === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              <div className="max-w-3xl text-left">
                <div className="flex items-center gap-2 text-accent mb-4">
                  <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold">// EXPEDITE CONVERSION DESK</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-normal mb-4 text-white">
                  Reserve Las Vegas Dancers
                </h2>
                <p className="text-white/65 text-sm md:text-base font-light leading-relaxed tracking-normal">
                  Swipe or select elite specialties to coordinate your companion lineup. Select 1 or more Angels downwards to access reservation pricing calculations, deposit processing, and dispatch files.
                </p>
              </div>

              {/* Interactive Showcase component (Filter, Grid, Carousel, Mini Specs) */}
              <div className="space-y-12">
                <div>
                  <span className="block font-mono text-xs text-white/30 uppercase tracking-widest mb-3 text-left">
                    Step A: Compile Outcall Angel Lineup
                  </span>
                  <GirlsShowcase
                    onSelectedGirlsChange={setSelectedGirlIds}
                    selectedGirlIds={selectedGirlIds}
                  />
                </div>

                {/* Vertical form step */}
                <div className="pt-8 border-t border-white/5">
                  <span className="block font-mono text-xs text-white/30 uppercase tracking-widest mb-6 text-left">
                    Step B: Input Hotel Information & File Security Form
                  </span>
                  
                  <BookingForm
                    selectedGirlIds={selectedGirlIds}
                    onSubmitBooking={handleConfirmReservation}
                    appliedGidList={eliteGirls.filter((g) => selectedGirlIds.includes(g.id))}
                  />
                </div>
              </div>

            </motion.div>
          )}

          {/* VIEW CASE 3: ABOUT US DESCRIPTION SECTION */}
          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16 text-left max-w-4xl mx-auto"
            >
              
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-widest text-[#FF2E88] font-bold uppercase block">// ESTABLISHED VEGAS METROPOLIS</span>
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-normal text-white m-0">
                  Elegant, Discreet &amp; Completely Legal
                </h2>
              </div>

              <div className="space-y-6 text-white/75 font-light text-base leading-relaxed">
                <p>
                  Established in the focal point of the entertainment capital, <strong className="text-[#FF2E88] font-bold">Angel Girls 222</strong> emerged to fill a critical void in upscale Vegas adult entertainment: high-end, visual elegance and impeccable companion services that treat client discretion with military-grade respect.
                </p>
                <p>
                  We are specialized in catering to high-profile business developers, luxury convention delegates, local high-rollers, and premium bachelor party hosts. By keeping our operation strictly compliant with municipal Las Vegas laws governing independent contract dancing and outcall permits, we secure our clients' transactions on solid professional ground.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 font-sans">
                  <div className="p-6 bg-white/5 border border-white/5 rounded-xl">
                    <span className="font-display text-lg font-bold text-white mb-2 block flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-accent" /> Performers' Protection Protocols
                    </span>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      We value safety above all else. Every outcall representative is registered, regularly validated, and dispatches in contact with our centralized safety desk. Discretion means protecting both performer and host.
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/5 rounded-xl">
                    <span className="font-display text-lg font-bold text-white mb-2 block flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-[#0ad6ff]" /> Direct Seamless Text Assistance
                    </span>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      No automated bots or artificial wait timers. Our live booking dispatcher is available 24 hours a day, 7 days a week, standing by to verify deposits, process custom performer parameters, and manage security.
                    </p>
                  </div>
                </div>

                <p>
                  All entertainers acting on client dispatch briefs are autonomous contractors who decide their schedule, coordinate their specific routines, and represent themselves with taste. We reject low-quality practices, maintaining a fully verified archive from which you can choose your dancers. Thank you for booking the finest.
                </p>
              </div>

              {/* Call desk trigger */}
              <div className="pt-10 flex flex-wrap gap-4 items-center justify-start border-t border-white/5">
                <button
                  onClick={() => navigateTo('booking')}
                  className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                >
                  Configure VIP Booking Booking
                </button>
                <a
                  href={`tel:${phoneNumberVal}`}
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 hover:text-accent font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF2E88]" /> Connect Outcall Desk
                </a>
              </div>

            </motion.div>
          )}

          {/* VIEW CASE 4: RECRUITMENT PAGE */}
          {activeView === 'hiring' && (
            <motion.div
              key="hiring"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16 max-w-4xl mx-auto text-left"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-widest text-[#39ff14] font-bold uppercase block">// VEGAS INDEPENDENT CONTRACTING</span>
                <img
                  src={gateBg}
                  alt="Become an Angel Dancer"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover rounded-xl opacity-60 border border-white/10 my-4"
                />
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-normal text-white">
                  Become an Angel — High-Income Vegas Outcalls
                </h2>
                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                  Are you an ambitious, elegant, and professional dancer based in Las Vegas? Do you want to work with premium, high-paying clients, luxury penthouse suites, and secure verified hotel bookings? Angel Girls 222 offers the most supportive, organized, and high-payout contracting network on the Vegas Strip.
                </p>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans my-8">
                <div className="p-5.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[#39ff14] font-mono text-xs uppercase font-extrabold block mb-2">[MAXIMUM PAY]</span>
                  <span className="block font-bold text-white text-base mb-2">Highest Industry Split</span>
                  <span className="block text-xs text-white/50 leading-relaxed font-light">
                    Keep 70% to 80% of all dancer premiums. No hidden service charges, cage deductions, or promotional deductions. Direct cash/crypto payments.
                  </span>
                </div>
                <div className="p-5.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-accent font-mono text-xs uppercase font-extrabold block mb-2">[SAFETY CRITICAL]</span>
                  <span className="block font-bold text-white text-base mb-2">Military-Grade Security</span>
                  <span className="block text-xs text-white/50 leading-relaxed font-light">
                    Every guest booking undergoes mobile SMS verification, hotel room registry tracking, and check-in/check-out callbacks for complete safety of our entertainers.
                  </span>
                </div>
                <div className="p-5.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[#0ad6ff] font-mono text-xs uppercase font-extrabold block mb-2">[VIP TRANSFER]</span>
                  <span className="block font-bold text-white text-base mb-2">High-Roller Guest List</span>
                  <span className="block text-xs text-white/50 leading-relaxed font-light">
                    Skip sketchy motel blocks or back-alley arrangements. We operate strictly in high-end Vegas complexes (Caesars, Wynn, Cosmopolitan, Bellagio).
                  </span>
                </div>
              </div>

              {/* $200 Referral Program Banner */}
              <div className="bg-gradient-to-r from-emerald-500/15 via-[#0c0c11]/80 to-[#0c0c11]/45 border border-emerald-500/25 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between shadow-lg shadow-emerald-500/5 my-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                <div className="space-y-2 text-left">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-mono text-[9px] text-[#39ff14] bg-[#39ff14]/10 border border-[#39ff14]/35 px-2 py-0.5 rounded tracking-widest uppercase font-bold animate-pulse">
                      // REFERRAL CASH INCENTIVE
                    </span>
                    <span className="text-[#39ff14] text-[10px] font-mono font-bold">[active recruitment program]</span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-black text-white m-0 tracking-tight">
                    Get a <span className="text-[#39ff14]">$200 CASH Referral Bonus</span>
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                    Refer a new angel girl dancer to our elite Vegas outcall hosting network! 
                    Once your referred recruit completes her very first successful booking, you will receive a 
                    <strong className="text-white"> $200 CASH bonus</strong> in your next payout package. 
                    This 1-time bonus applies for <em className="italic text-accent">every single recruit</em> you bring that passes casting! There is no limit to your earnings.
                  </p>
                </div>
                <div className="shrink-0 bg-white/5 border border-white/10 p-5 rounded-xl text-center space-y-1 w-full md:w-auto min-w-[170px]">
                  <span className="block font-mono text-[10px] text-white/40 uppercase font-black">Bonus Payout</span>
                  <span className="block font-display text-3xl font-black text-[#39ff14] glow-green leading-none">$200.00</span>
                  <span className="block font-mono text-[9px] text-white/50 lowercase">per verified recruit</span>
                </div>
              </div>

              {/* Hiring Form Submissions display */}
              <div className="bg-[#0c0c11] rounded-2xl border border-white/10 p-6 md:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent" />
                
                <AnimatePresence mode="wait">
                  {!hiringFormSubmitted ? (
                    <motion.form
                      key="hiring-form"
                      onSubmit={handleApplyToAngel}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-2xl font-black text-white">Apply to Join Angel Girls 222</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Your Preferred Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Scarlett"
                            value={hiringData.name}
                            onChange={(e) => setHiringData({ ...hiringData, name: e.target.value })}
                            className="w-full text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Your Age (Must be 21+)</label>
                          <input
                            type="number"
                            min="21"
                            max="39"
                            required
                            placeholder="e.g. 23"
                            value={hiringData.age}
                            onChange={(e) => setHiringData({ ...hiringData, age: e.target.value })}
                            className="w-full text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Contact Mobile Phone</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 702-555-5555"
                            value={hiringData.phone}
                            onChange={(e) => setHiringData({ ...hiringData, phone: e.target.value })}
                            className="w-full text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Instagram Handle (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. @angel_scarlett"
                            value={hiringData.instagram}
                            onChange={(e) => setHiringData({ ...hiringData, instagram: e.target.value })}
                            className="w-full text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Your Height</label>
                          <input
                            type="text"
                            placeholder="e.g. 5ft 7in"
                            value={hiringData.height}
                            onChange={(e) => setHiringData({ ...hiringData, height: e.target.value })}
                            className="w-full text-xs text-white bg-black/40 border border-[#39ff14]/15 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Referral Name (Optional - Eligible for $200 Cash Bonus)</label>
                        <input
                          type="text"
                          placeholder="e.g. Name of the active Angel who referred you to claim the $200 bonus"
                          value={hiringData.referredBy || ''}
                          onChange={(e) => setHiringData({ ...hiringData, referredBy: e.target.value })}
                          className="w-full text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-white/45 uppercase tracking-widest mb-1.5 font-bold">Dance / Companion Bio or Experience</label>
                        <textarea
                          placeholder="Briefly describe your style, specialty (pole, topless, active companion), or prior experience in Las Vegas."
                          value={hiringData.experience}
                          onChange={(e) => setHiringData({ ...hiringData, experience: e.target.value })}
                          className="w-full h-24 text-xs text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39ff14] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-mono text-xs font-black uppercase tracking-widest text-[#07070A] hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 cursor-pointer"
                      >
                        <Send className="w-4 h-4" /> Submit Casting Portfolio Application
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="hiring-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center p-8 space-y-4"
                    >
                      <CheckCircle className="w-16 h-16 text-[#39ff14] mx-auto animate-subtle-bounce" />
                      <h3 className="font-display text-3xl font-extrabold text-white">Application Received, Angel!</h3>
                      <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
                        Casting records have compiled your metrics successfully. Our secure recruiter will contact your mobile number <strong className="text-white">{hiringData.phone}</strong> via encrypted text inside 2 hours to coordinate high-payout outcall interviews. Welcome aboard.
                      </p>
                      <button
                        onClick={handleResetForms}
                        className="px-6 py-3 border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-white/5 rounded font-mono text-xs uppercase"
                      >
                        Back to Home Screen
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* VIEW CASE 5: TERMS & COMPLIANCE */}
          {activeView === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 text-left max-w-4xl mx-auto select-text"
            >
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white">Terms & Conditions</h2>
              <div className="text-white/60 text-xs md:text-sm font-light leading-relaxed space-y-6">
                <p className="font-bold text-white text-sm">Effective: May 26, 2026</p>
                <p>
                  <strong>1. Services Scope:</strong> Under these terms, Angel Girls 222 functions selectively as an advertising agency dispatch booking agent for independent, self-employed legal sensual dancers, models, companions, and adult party hosts. Performers provide legal private art outcalls for pre-booked fees.
                </p>
                <p>
                  <strong>2. Proscribed solicitation / Legal Actions:</strong> Performers coordinates independent schedules and limits. Angel Girls 222 STRICTLY promotes 100% legal adult modeling, private dancing, and companionship. No solicitation, prostitution, or illegal activity of any kind is sponsored, tolerated, or promoted. Any request of an illegal nature instantly cancels the dispatch assignment without refund of deposit.
                </p>
                <p>
                  <strong>3. Booking Deposits & Fees:</strong> Booking deposits of $150 per entertainer are non-refundable and dedicated to covering marketing, dispatch safety registers, and administrative setup of dispatch files. The deposit is credited entirely to the final performance balance due upon performer arrival.
                </p>
                <p>
                  <strong>4. Client Conduct:</strong> Clients must maintain strict courtesy, compliance, and respect for performers' terms, physical boundaries, and safety policies. Failure results in immediate performer walk-out and immediate dispatch security reporting.
                </p>
              </div>
              <button
                onClick={() => navigateTo('home')}
                className="px-6 py-3 border border-white/5 hover:border-white/10 text-white/70 rounded bg-white/5 hover:bg-white/10 font-mono text-xs"
              >
                Return to Home Page
              </button>
            </motion.div>
          )}

          {/* VIEW CASE 6: PRIVACY POLICY */}
          {activeView === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 text-left max-w-4xl mx-auto select-text"
            >
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white">Privacy Policy</h2>
              <div className="text-white/60 text-xs md:text-sm font-light leading-relaxed space-y-6">
                <p className="font-bold text-white text-sm">Effective: May 26, 2026</p>
                <p>
                  <strong>1. Data Minimization:</strong> We protect your privacy with absolute military dedication. We do not store, distribute, or auction off your Las Vegas hotel room details, suite location numbers, or names after dispatch is completed. All database entries are sanitized.
                </p>
                <p>
                  <strong>2. Phone Contact:</strong> Callback telephone numbers are requested exclusively to manage SMS check-in safety protocols for dispatcher outcall callbacks.
                </p>
                <p>
                  <strong>3. Encryption protocols:</strong> Verified galleries, casting images, and payment receipt files are processed over standard cryptographically secured SSL channels.
                </p>
              </div>
              <button
                onClick={() => navigateTo('home')}
                className="px-6 py-3 border border-white/5 hover:border-white/10 text-white/70 rounded bg-white/5 hover:bg-white/10 font-mono text-xs"
              >
                Return to Home Page
              </button>
            </motion.div>
          )}

          {/* VIEW CASE 7: THANK YOU CONFIRMATION DESK */}
          {activeView === 'thank-you' && currentBooking && (
            <motion.div
              key="thank-you"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-xl mx-auto text-center space-y-8 select-text"
            >
              <div className="w-20 h-20 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-[#39ff14] animate-pulse" />
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-none">
                  Reservation Pending!
                </h2>
                <p className="text-xs text-[#39ff14] font-mono uppercase tracking-widest font-black">
                  [RESERVATION DEPOSIT RECEIPT REQUIRED TO DISPATCH]
                </p>
              </div>

              {/* Dynamic printable booking invoice values */}
              <div className="bg-[#0c0c11] border border-white/10 rounded-xl p-6 text-left space-y-4">
                <span className="block font-mono text-[9px] tracking-widest text-[#FF2E88] uppercase font-extrabold pb-2 border-b border-white/5">
                  [Vegas Outcall Dispatch Receipt Brief]
                </span>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono">
                  <div className="text-white/40">Client Name:</div>
                  <div className="text-white font-black text-right">{currentBooking.name}</div>

                  <div className="text-white/40">Secure Contact Email:</div>
                  <div className="text-white font-medium text-[#FF2E88] text-right truncate max-w-[220px] block justify-self-end">{currentBooking.email}</div>

                  <div className="text-white/40">Verified Callback Phone:</div>
                  <div className="text-[#39ff14] font-black text-right">{currentBooking.phone}</div>

                  <div className="text-white/40">Suite Coordinates:</div>
                  <div className="text-white text-right font-light truncate max-w-[200px] block">{currentBooking.location} // Suite {currentBooking.roomNumber}</div>

                  <div className="text-white/40">Starting Target:</div>
                  <div className="text-white text-right font-light">{currentBooking.date} @ {currentBooking.time}</div>

                  <div className="text-white/40">Duration Hours:</div>
                  <div className="text-white text-right font-black">{currentBooking.hours} Hours</div>
                  
                  <div className="text-[#FF2E88] font-bold">Unrefundable Dispatch Deposit:</div>
                  <div className="text-[#FF2E88] font-black text-right glow-pink font-display text-sm">${currentBooking.depositAmount} USD</div>

                  <div className="text-white/50 border-t border-white/5 pt-3">Cash Balance on Arrival:</div>
                  <div className="text-white border-t border-white/5 pt-3 text-right font-black text-sm">${currentBooking.totalPrice - currentBooking.depositAmount} USD</div>
                </div>

                <div className="rounded bg-white/5 border border-white/10 p-5 text-xs text-white/70 leading-relaxed font-sans space-y-3 font-light">
                  <span className="block font-bold text-white mb-2 uppercase font-mono tracking-wider text-[9px]">// STANDARD SECURITY PROTOCOLS & NO REFUNDS</span>
                  <p>1. Please transfer the escrow dispatch deposit equivalent of <strong className="text-accent font-bold">${currentBooking.depositAmount}</strong> via CashApp, Venmo, Apple Pay, or cryptocurrency to initiate dispatch status.</p>
                  <p>2. A dispatcher will instantly text dispatch confirmation files to <strong className="text-[#39ff14] font-bold">{currentBooking.phone}</strong> and email receipts to <strong className="text-white font-bold">{currentBooking.email}</strong> with private secured digital records inside 5 minutes.</p>
                  <p>3. Once confirmed, your <strong className="text-white font-bold">Private Identity Verification Link</strong> and active GPS tracker coordinates will unlock immediately on your device.</p>
                  
                  <div className="pt-2 border-t border-white/10 text-red-400 font-mono text-[10px] leading-relaxed">
                    <strong className="text-[#FF2E88] font-bold uppercase block mb-1">STRICT NO-REFUND & CHARGEBACK DISCLAIMER:</strong>
                    By proceeding, you explicitly agree that the booking deposit is 100% non-refundable under Nevada escort outcall companion dispatch terms. Any chargeback attempts, friendly fraud, or payment disputes are considered a material breach of reservation licensing, and will result in coordinate reporting to standard outcall billing registries.
                  </div>
                </div>
              </div>

              {/* Instant connection CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${phoneNumberVal}`}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-pink-500 font-mono text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2 hover:scale-102 transition-all cursor-pointer glow-pink"
                >
                  <Smartphone className="w-4 h-4 text-white animate-bounce" /> Call Agency Agent: 702-556-3772
                </a>
                
                <button
                  onClick={handleResetForms}
                  className="w-full py-4 border border-white/10 hover:border-white/30 text-white/60 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 font-mono text-xs uppercase"
                >
                  Return to Home Roster
                </button>
              </div>

            </motion.div>
          )}

          {/* VIEW CASE 8: REGIONAL CRAWLER SEO LANDING PAGES */}
          {activeView.startsWith('location-') && (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LocationSEOView 
                zoneId={activeView.replace('location-', '')} 
                onNavigate={navigateTo} 
                onSelectGirlForBooking={(girlId) => {
                  setSelectedGirlIds([girlId]);
                }} 
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Global liability / Legal disclaimer Footer (Required for legal outcall operation) */}
        <footer className="mt-24 pt-10 border-t border-white/10 select-text">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left pb-10">
            <div className="md:col-span-4 space-y-4">
              <span className="font-display font-black text-lg text-white tracking-widest block uppercase animate-pulse">
                ANGEL GIRLS <span className="text-accent italic font-mono text-lg font-bold">222</span>
              </span>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                Premium Las Vegas Outcall Dancers and Luxury Companions providing 100% legal adult entertainment and private showgirl dancers to luxury hotels, residential villas, and exclusive party suites. Serving all of Las Vegas Strip, NV.
              </p>
              <div className="pt-2 font-mono text-[10px] text-[#FF2E88]">
                Callback Phone Desk: <strong className="text-white hover:text-accent font-bold"><a href={`tel:${phoneNumberVal}`}>{phoneNumberVal}</a></strong> (SMS // CALL available 24/7)
              </div>
            </div>

            <div className="md:col-span-2 space-y-3 text-xs font-mono">
              <span className="block font-extrabold uppercase text-white/60 tracking-wider">Agency Index</span>
              <ul className="space-y-2 text-white/40 font-light">
                <li><a href="#/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-accent transition-colors block text-left">Home Base</a></li>
                <li><a href="#/booking" onClick={(e) => { e.preventDefault(); navigateTo('booking'); }} className="hover:text-accent transition-colors block text-left">Angels Roster</a></li>
                <li><a href="#/about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className="hover:text-accent transition-colors block text-left">About Agency</a></li>
                <li><a href="#/hiring" onClick={(e) => { e.preventDefault(); navigateTo('hiring'); }} className="hover:text-[#39ff14] transition-colors block text-left">Become an Angel</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs font-mono">
              <span className="block font-extrabold uppercase text-white/60 tracking-wider">Socials & Compliance</span>
              <ul className="space-y-2 text-white/40 font-light">
                <li><a href="https://instagram.com/angelgirls222lv" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors block">Instagram (@angelgirls222lv)</a></li>
                <li><a href="#/terms" onClick={(e) => { e.preventDefault(); navigateTo('terms'); }} className="hover:text-accent transition-colors block text-left">Terms &amp; Liability</a></li>
                <li><a href="#/privacy" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} className="hover:text-accent transition-colors block text-left">Privacy Policies</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs font-mono">
              <span className="block font-extrabold uppercase text-white/60 tracking-wider">Vegas Dispatch Sitemap</span>
              <ul className="space-y-2 text-white/40 font-light text-left">
                <li>
                  <a 
                    href="#/locations/mid-strip" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-mid-strip'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    Mid-Strip Dispatch
                  </a>
                </li>
                <li>
                  <a 
                    href="#/locations/north-strip" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-north-strip'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    North Convention Hub
                  </a>
                </li>
                <li>
                  <a 
                    href="#/locations/south-strip" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-south-strip'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    South Boulevard Patrol
                  </a>
                </li>
                <li>
                  <a 
                    href="#/locations/downtown" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-downtown'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    Downtown Fremont St
                  </a>
                </li>
                <li>
                  <a 
                    href="#/locations/off-strip-west" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-off-strip-west'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    Summerlin Mansions
                  </a>
                </li>
                <li>
                  <a 
                    href="#/locations/off-strip-east" 
                    onClick={(e) => { e.preventDefault(); navigateTo('location-off-strip-east'); }} 
                    className="hover:text-[#FF2E88] focus:text-[#FF2E88] transition-colors block text-left"
                  >
                    Henderson Golf Estates
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-mono text-center md:text-left leading-normal">
            <div className="max-w-xl">
              All entertainers representing Angel Girls 222 are independent legal contractors providing adult entertainment and host companionship only. No solicitation, escort prostitution, or illegal activity of any kind is allowed or promoted. All bookings comply with the Nevada Revised Statutes (NRS) outcall licensing clauses.
            </div>
            <div className="text-white/45 font-bold shrink-0">
              © 2026 Angel Girls 222 Las Vegas NV. Standard VIP License.
            </div>
          </div>
        </footer>

      </main>

      {/* STICKY PHONE/BOOK CONTACT HEADER FOR MOBILE / DESKTOP (High impact conversion) */}
      <div className="fixed bottom-0 left-0 w-full z-40 block">
        
        {/* Dynamic bottom action row (Mobile persistent outcall helper) */}
        <div className="md:hidden flex h-16 w-full items-center bg-[#07070Ad0] backdrop-blur-md justify-around border-t border-white/10 px-4">
          
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center justify-center p-2 text-[10px] font-bold font-mono tracking-wider transition-colors cursor-pointer uppercase ${
              activeView === 'home' ? 'text-accent' : 'text-white/40 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </button>

          {/* Centered Large Hot Pink FAB for Booking */}
          <div className="relative -top-3 scale-110 shrink-0">
            <button
              onClick={() => navigateTo('booking')}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white flex items-center justify-center shadow-lg shadow-[#FF2E88]/30 border-2 border-[#FF2E88] animate-pulse-pink cursor-pointer"
            >
              <Smartphone className="w-6 h-6 animate-subtle-bounce" />
            </button>
            <span className="absolute bottom-1 w-full text-center text-[7px] text-white font-mono font-bold uppercase tracking-widest select-none pointer-events-none">
              BOOK
            </span>
          </div>

          <button
            onClick={() => navigateTo('about')}
            className={`flex flex-col items-center justify-center p-2 text-[10px] font-bold font-mono tracking-wider transition-colors cursor-pointer uppercase ${
              activeView === 'about' ? 'text-accent' : 'text-white/40 hover:text-white'
            }`}
          >
            <Info className="w-5 h-5 mb-0.5" />
            <span>About</span>
          </button>
          
        </div>

        {/* Floating Quick Action Contacts for Desktop on lower-right */}
        <div className="hidden md:flex fixed bottom-6 right-6 z-40 gap-3">
          <a
            href={`sms:+17025563772`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#0ad6ff] hover:bg-[#09c2e6] text-black font-mono text-xs font-black uppercase tracking-wider shadow-lg transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-black shrink-0" /> Text Dispatcher
          </a>
          <a
            href={`tel:${phoneNumberVal}`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-mono text-xs font-black uppercase tracking-wider shadow-lg shadow-accent/25 transition-all hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-white shrink-0" /> Call 24/7 Hotline
          </a>
        </div>

      </div>

    </div>
  );
}

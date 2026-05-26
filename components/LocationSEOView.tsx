import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck, Clock, Star, PhoneCall, ArrowRight } from 'lucide-react';
import { eliteGirls } from './GirlsShowcase';
import { ActiveView } from '../types';

interface LocationSEOViewProps {
  zoneId: string;
  onNavigate: (view: ActiveView) => void;
  onSelectGirlForBooking: (girlId: string) => void;
}

const ZONE_DATA: Record<string, { title: string; resorts: string[]; description: string; eta: string }> = {
  'mid-strip': {
    title: 'Mid-Strip / Luxury Core',
    resorts: ['Bellagio', 'Caesars Palace', 'Cosmopolitan', 'Aria', 'Venetian', 'Palazzo'],
    description: 'The absolute elite heart of Las Vegas Boulevard. Broadest availability of active roster performers for luxury suites and VIP pool cabanas.',
    eta: '15 - 25 Min'
  },
  'north-strip': {
    title: 'North-Strip / Convention',
    resorts: ['Wynn', 'Encore', 'Fontainebleau', 'Resorts World', 'Sahara'],
    description: 'Convention lofts and luxury penthouse support. Refined showgirls for dining and lounge accompaniment near the Las Vegas Convention Center.',
    eta: '20 - 30 Min'
  },
  'south-strip': {
    title: 'South Strip Area',
    resorts: ['MGM Grand', 'Mandalay Bay', 'Delano', 'Luxor', 'Excalibur'],
    description: 'Serving the south end towers close to airport suites. Energetic dancers for private bachelor events and high-vibe pool parties.',
    eta: '20 - 30 Min'
  },
  'downtown': {
    title: 'Downtown / Fremont St',
    resorts: ['Circa Resort', 'Golden Nugget', 'The D Casino', 'Binion\'s'],
    description: 'Vintage Vegas high-energy Casinos, historic neon suites, and private downtown penthouse party lofts with a classic Vegas feel.',
    eta: '25 - 35 Min'
  },
  'off-strip-west': {
    title: 'Off-Strip West / Summerlin',
    resorts: ['Palms Place', 'Rio Towers', 'Summerlin Luxury Estates', 'Red Rock Resort'],
    description: 'Residential villas, luxury estate properties, and boutique high-rise towers of West Flamingo and the Summerlin corridor.',
    eta: '30 - 45 Min'
  },
  'off-strip-east': {
    title: 'Off-Strip East / Henderson',
    resorts: ['Virgin Hotels', 'Green Valley Ranch', 'Henderson Mansions', 'Lake Las Vegas'],
    description: 'Gated golf estates, Paradise corridor corporate pads, and quiet Henderson luxury villa outcalls for discreet entertainment.',
    eta: '35 - 50 Min'
  }
};

export default function LocationSEOView({ zoneId, onNavigate, onSelectGirlForBooking }: LocationSEOViewProps) {
  const zone = ZONE_DATA[zoneId] || ZONE_DATA['mid-strip'];

  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded">
            // Active Dispatch Zone
          </span>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1">
            <Clock className="w-3 h-3" /> ETA: {zone.eta}
          </span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          Elite Angels in <span className="text-accent glow-pink">{zone.title.split(' / ')[0]}</span>
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
          {zone.description} Providing 100% legal outcall entertainment and private showgirl dancers to the finest resorts in Las Vegas.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={() => onNavigate('booking')}
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-2"
          >
            View Full Roster <ArrowRight className="w-4 h-4" />
          </button>
          <a 
            href="tel:7025563772"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-accent" /> Call Dispatch
          </a>
        </div>
      </section>

      {/* Resorts Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="font-mono text-xs text-white/40 uppercase tracking-[0.3em] font-bold">Resorts Index</h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {zone.resorts.map((resort) => (
            <div key={resort} className="p-4 bg-white/5 border border-white/5 rounded-xl text-center group hover:border-accent/30 transition-all">
              <MapPin className="w-5 h-5 text-accent/40 mx-auto mb-2 group-hover:text-accent transition-colors" />
              <span className="text-xs font-bold text-white/80 group-hover:text-white">{resort}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Angels for this Zone */}
      <section className="space-y-10">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight">Available Angels Nearby</h2>
          <p className="text-white/40 text-sm font-light">Standby performers currently active near the {zone.title.split(' / ')[0]} dispatch hub.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eliteGirls.map((girl) => (
            <motion.div 
              key={girl.id}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c11]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={girl.image} 
                  alt={girl.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{girl.name}</h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-accent text-[9px] font-black text-white uppercase tracking-widest">
                      <Star className="w-2.5 h-2.5 fill-white" /> VIP
                    </div>
                  </div>
                  <p className="text-white/60 text-xs font-mono tracking-widest uppercase">{girl.age} Years // {girl.height}</p>
                </div>
                
                <button 
                  onClick={() => {
                    onSelectGirlForBooking(girl.id);
                    onNavigate('booking');
                  }}
                  className="mt-6 w-full py-3 bg-white text-black font-mono text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Book {girl.name} Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/5">
        <div className="flex gap-4">
          <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-sm tracking-tight">Vetted & Legal</h4>
            <p className="text-xs text-white/50 leading-relaxed">All performers are legally registered independent contractors complying with Las Vegas outcall regulations.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock className="w-8 h-8 text-[#0ad6ff] shrink-0" />
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-sm tracking-tight">Rapid Dispatch</h4>
            <p className="text-xs text-white/50 leading-relaxed">Strategic outpost positioning ensures our Angels arrive at your suite in as little as 15 minutes.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Star className="w-8 h-8 text-[#39ff14] shrink-0" />
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-sm tracking-tight">Elite Standard</h4>
            <p className="text-xs text-white/50 leading-relaxed">We maintain the highest standards of beauty, personality, and professionalism in the industry.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

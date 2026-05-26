/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Map, MapPin, Compass, Layers, Check, AlertTriangle, Eye, Sparkles } from 'lucide-react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// Fetch the platform secret at runtime (Vite maps platform codeassist requirements)
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim().length > 10;

export interface VegasZone {
  id: string;
  name: string;
  representativeAddress: string;
  keyHotels: string[];
  lat: number;
  lng: number;
  eta: string;
  fee: string;
  badge: string;
  color: string;
  description: string;
}

export const VEGAS_ZONES: VegasZone[] = [
  {
    id: 'mid-strip',
    name: 'Mid Strip / Luxury Core',
    representativeAddress: 'Bellagio Resort, 3600 S Las Vegas Blvd, Las Vegas, NV 89109',
    keyHotels: ['Bellagio', 'Cosmopolitan', 'Caesars Palace', 'Aria', 'Venetian', 'Palazzo'],
    lat: 36.1147,
    lng: -115.1728,
    eta: '15 - 25 Min Dispatch',
    fee: 'Free Outcall Dispatch',
    badge: 'VIP Core',
    color: '#FF2E88', // Magenta pink glow
    description: 'The absolute elite heart of Las Vegas Boulevard. Broadest availability of active roster performers.'
  },
  {
    id: 'north-strip',
    name: 'North Strip / Convention',
    representativeAddress: 'Wynn Las Vegas, 3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    keyHotels: ['Wynn Resort', 'Encore', 'Resorts World', 'Fontainebleau', 'Circus Circus'],
    lat: 36.1284,
    lng: -115.1654,
    eta: '20 - 30 Min Dispatch',
    fee: 'Free Outcall Dispatch',
    badge: 'Luxury Suite Hub',
    color: '#0ad6ff', // Cyan glow
    description: 'High-end penthouses and megaresorts surrounding the Fashion Show and Convention hub.'
  },
  {
    id: 'south-strip',
    name: 'South Strip Area',
    representativeAddress: 'MGM Grand, 3799 S Las Vegas Blvd, Las Vegas, NV 89109',
    keyHotels: ['MGM Grand', 'Mandalay Bay', 'Aria', 'Luxor', 'Excalibur', 'Tropicana'],
    lat: 36.0919,
    lng: -115.1752,
    eta: '20 - 30 Min Dispatch',
    fee: 'Free Outcall Dispatch',
    badge: 'Active Patrol',
    color: '#9d4edd', // Purple glow
    description: 'Spanning the MGM Grand hub down to Mandalay Bay and close to the Harry Reid Airport suites.'
  },
  {
    id: 'downtown',
    name: 'Downtown / Fremont St',
    representativeAddress: 'Circa Resort & Casino, 8 Fremont St, Las Vegas, NV 89101',
    keyHotels: ['Circa Las Vegas', 'Golden Nugget', 'The D Casino', 'Plaza Hotel', 'El Cortez'],
    lat: 36.1699,
    lng: -115.1439,
    eta: '25 - 35 Min Dispatch',
    fee: 'Free Outcall Dispatch',
    badge: 'Vintage Vegas',
    color: '#39ff14', // Acid green glow
    description: 'Vintage high-energy casinos, historic boutique suites, and Fremont street view lofts.'
  },
  {
    id: 'off-strip-west',
    name: 'Off-Strip West / Summerlin',
    representativeAddress: 'Palms Casino Resort, 4321 W Flamingo Rd, Las Vegas, NV 89103',
    keyHotels: ['Palms Place', 'Rio Hotel', 'Summerlin Mansions', 'Chinatown Luxury Lofts'],
    lat: 36.1146,
    lng: -115.1953,
    eta: '30 - 45 Min Dispatch',
    fee: '+$50 Escort Surcharge',
    badge: 'Residential / Villas',
    color: '#ff9f1c', // Gold/orange glow
    description: 'Chic off-strip towers, exclusive private residential villas, and suburban penthouse estates.'
  },
  {
    id: 'off-strip-east',
    name: 'Off-Strip East / Henderson',
    representativeAddress: 'Virgin Hotels Las Vegas, 4455 Paradise Rd, Las Vegas, NV 89169',
    keyHotels: ['Virgin Hotels', 'Hard Rock Area', 'UNLV Corporate Suites', 'Henderson Golf Estates'],
    lat: 36.1094,
    lng: -115.1541,
    eta: '35 - 50 Min Dispatch',
    fee: '+$50 Escort Surcharge',
    badge: 'Private Estates',
    color: '#f72585', // Coral pink glow
    description: 'Quiet premium hotel towers on Paradise Road, university business pads, and estate developments.'
  }
];

interface VegasStripMapProps {
  onSelectZone: (zone: VegasZone) => void;
  selectedZoneId: string;
}

export default function VegasStripMap({ onSelectZone, selectedZoneId }: VegasStripMapProps) {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone = VEGAS_ZONES.find((z) => z.id === selectedZoneId) || VEGAS_ZONES[0];

  const handleSelectZone = (zone: VegasZone) => {
    onSelectZone(zone);
  };

  return (
    <div className="space-y-4">
      
      {/* Header controls for map view */}
      <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FF2E88]" />
          <span className="font-mono text-xs text-white font-bold uppercase tracking-wider">
            Vegas Zone Dispatch Monitor
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded border border-white/5 font-mono text-[9px] text-[#39ff14] uppercase tracking-wider font-extrabold animate-pulse">
          ● SYSTEM ONLINE // 24/7 PATROL
        </div>
      </div>

      {/* Main Map Container Frame */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#07070A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Ambient Background Grid and Highway Strip Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, #ff2e8c 1px, transparent 1px), linear-gradient(0deg, #12121e 1px, transparent 1px), linear-gradient(90deg, #12121e 1px, transparent 1px)',
                backgroundSize: '16px 16px, 32px 32px, 32px 32px',
              }}
            />
          </div>

          {/* Simulated Neon Las Vegas Blvd Roadway Structure */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 400 300" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="strip-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#39ff14" />
                <stop offset="35%" stopColor="#0ad6ff" />
                <stop offset="70%" stopColor="#ff2e8c" />
                <stop offset="100%" stopColor="#9d4edd" />
              </linearGradient>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Las Vegas Blvd Strip - vertical roadway */}
            <line 
              x1="200" y1="20" x2="200" y2="280" 
              stroke="url(#strip-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              filter="url(#neon-glow)"
              opacity="0.6"
            />
            
            {/* Dashed highway center lines */}
            <line 
              x1="200" y1="20" x2="200" y2="280" 
              stroke="#111" 
              strokeWidth="1.5" 
              strokeDasharray="4 6"
              opacity="0.8"
            />

            {/* Distant Cross Streets (Flamingo, Tropicana, Sahara) */}
            <line x1="50" y1="70" x2="350" y2="70" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.15" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.25" />
            <line x1="50" y1="230" x2="350" y2="230" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.15" />

            {/* Connection lines from Off-Strip zones to the Strip highway */}
            <path d="M 90,150 L 195,150" stroke="#ff9f1c" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 310,150 L 205,150" stroke="#f72585" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          </svg>

          {/* Clickable Vector Nodes on the Map Screen Grid */}
          <div className="absolute inset-0 w-full h-full">
            
            {/* Node Positions on a 100% relative layout */}

            {/* Downtown Node */}
            <div 
              className="absolute top-[12%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[3])}
              onMouseEnter={() => setHoveredZoneId('downtown')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[3]} selected={selectedZoneId === 'downtown'} activePulse />
            </div>

            {/* North Strip Node */}
            <div 
              className="absolute top-[32%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[1])}
              onMouseEnter={() => setHoveredZoneId('north-strip')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[1]} selected={selectedZoneId === 'north-strip'} />
            </div>

            {/* Mid Strip Node */}
            <div 
              className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[0])}
              onMouseEnter={() => setHoveredZoneId('mid-strip')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[0]} selected={selectedZoneId === 'mid-strip'} />
            </div>

            {/* South Strip Node */}
            <div 
              className="absolute top-[76%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[2])}
              onMouseEnter={() => setHoveredZoneId('south-strip')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[2]} selected={selectedZoneId === 'south-strip'} />
            </div>

            {/* Off Strip West Node */}
            <div 
              className="absolute top-[52%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[4])}
              onMouseEnter={() => setHoveredZoneId('off-strip-west')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[4]} selected={selectedZoneId === 'off-strip-west'} />
            </div>

            {/* Off Strip East Node */}
            <div 
              className="absolute top-[52%] left-[78%] -translate-x-1/2 -translate-y-1/2 z-10"
              onClick={() => handleSelectZone(VEGAS_ZONES[5])}
              onMouseEnter={() => setHoveredZoneId('off-strip-east')}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <HotspotNode zone={VEGAS_ZONES[5]} selected={selectedZoneId === 'off-strip-east'} />
            </div>

          </div>

          {/* Quick floating status label helper */}
          <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded text-[9px] font-mono tracking-wider text-white/40 pointer-events-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E88] animate-ping" />
            <span>SELECT ANY REGION TO UPDATE DISPATCH RANGE</span>
          </div>

          {/* Custom Interactive Floating Neon Legend overlay for the highlighted zone */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#0a0a14ea] border border-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col sm:flex-row items-add sm:items-center justify-between gap-3 shadow-lg z-20">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ 
                    backgroundColor: activeZone.color,
                    boxShadow: `0 0 10px ${activeZone.color}`
                  }} 
                />
                <span className="font-display font-black text-sm text-white">
                  {activeZone.name}
                </span>
                <span className="bg-white/5 border border-white/10 text-[8px] text-white/50 font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                  {activeZone.badge}
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-light max-w-lg leading-normal">
                Hotels: <strong className="text-white font-bold">{activeZone.keyHotels.join(', ')}</strong> — {activeZone.description}
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0 flex items-center gap-4 text-right bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-lg">
              <div className="text-left sm:text-right font-mono text-[9px]">
                <div className="text-white font-bold leading-none mb-1 text-accent">{activeZone.eta}</div>
                <div className="text-white/40 leading-none">{activeZone.fee}</div>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Grid of clickable buttons for fast selecting */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {VEGAS_ZONES.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <button
              type="button"
              key={zone.id}
              onClick={() => handleSelectZone(zone)}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white/5 border-white/20 shadow-md'
                  : 'bg-black/20 border-white/5 hover:border-white/12'
              }`}
              style={{
                borderColor: isSelected ? zone.color : undefined
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-white leading-tight">
                  {zone.name.split('/')[0]}
                </span>
                <span 
                  className="w-2 h-2 rounded-full ring-2 ring-black"
                  style={{ 
                    backgroundColor: zone.color,
                    boxShadow: isSelected ? `0 0 8px ${zone.color}` : 'none'
                  }}
                />
              </div>
              <p className="text-[9px] text-white/40 leading-none truncate font-light">
                {zone.keyHotels[0]}, {zone.keyHotels[1]}
              </p>
            </button>
          );
        })}
      </div>

    </div>
  );
}

// Sub-component for vector nodes with premium radar/glowing rings
function HotspotNode({ 
  zone, 
  selected, 
  activePulse = false 
}: { 
  zone: VegasZone; 
  selected: boolean; 
  activePulse?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center group cursor-pointer">
      
      {/* Outer Pulse rings */}
      <div className={`absolute w-10 h-10 rounded-full -top-1 pointer-events-none transition-all duration-300 ${
        selected ? 'scale-120 opacity-30 animate-ping' : 'scale-50 opacity-0 group-hover:opacity-15 group-hover:scale-100'
      }`} style={{ backgroundColor: zone.color }} />

      <div className={`absolute w-14 h-14 rounded-full -top-3 pointer-events-none transition-all duration-500 ${
        selected ? 'scale-130 opacity-10 animate-pulse' : 'scale-50 opacity-0'
      }`} style={{ backgroundColor: zone.color }} />

      {/* Main Interactive Button Hotspot */}
      <div 
        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] ${
          selected 
            ? 'scale-125 border-white' 
            : 'border-white/20 group-hover:border-white/45'
        }`}
        style={{ 
          backgroundColor: zone.color,
          boxShadow: selected || activePulse ? `0 0 12px ${zone.color}` : undefined
        }}
      >
        <div className={`w-1 h-1 rounded-full bg-black ${selected ? 'scale-125 bg-white' : 'scale-75'}`} />
      </div>

      {/* Mini glowing tooltip header */}
      <div className="mt-1.5 shadow-md">
        <span 
          className={`block text-[9px] font-mono tracking-wide px-2 py-0.5 rounded border whitespace-nowrap transition-all duration-300 ${
            selected 
              ? 'bg-white text-black font-black border-white translate-y-[-2px]' 
              : 'bg-[#05050A]/95 text-white/70 border-white/5 group-hover:text-white group-hover:border-white/12'
          }`}
          style={{
            boxShadow: selected ? `0 0 14px ${zone.color}40` : undefined
          }}
        >
          {zone.name.split('/')[0]}
        </span>
      </div>

    </div>
  );
}

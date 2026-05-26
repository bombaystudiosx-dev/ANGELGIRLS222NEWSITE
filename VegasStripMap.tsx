/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookingState, ServiceOption } from '../types';
import { FileText, MapPin, Calendar, Clock, DollarSign, PenTool, CheckCircle, Smartphone, Flame, CreditCard } from 'lucide-react';
import VegasStripMap, { VEGAS_ZONES, VegasZone } from './VegasStripMap';

interface BookingFormProps {
  selectedGirlIds: string[];
  onSubmitBooking: (booking: BookingState) => void;
  appliedGidList: any[]; // List of selected girls to render custom portraits
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'nude',
    name: 'Full Nude Private Dancing',
    hourlyRate: 750,
    description: 'Breathtaking full nude exotic private dancing. High-sensual movement, absolute exclusivity, and elite performers.',
    badge: 'Elite Premium'
  },
  {
    id: 'topless',
    name: 'Topless Private Dancing',
    hourlyRate: 600,
    description: 'Tasteful, high-energy topless sensual routines. Perfect for Vegas hotel penthouses or premium VIP hospitality.',
    badge: 'Popular Choice'
  },
  {
    id: 'pool-party',
    name: 'Pool Party / VIP Club Events',
    hourlyRate: 500,
    description: 'Sensational social dancers and companions hosting your luxury cabanas, private pools, or high-roller suites.',
    badge: 'Bachelor Event'
  },
  {
    id: 'companion',
    name: 'Arm Candy / VIP Dinner Date',
    hourlyRate: 500,
    description: 'Sophisticated companion accompaniment for high-end restaurants, casino tables, private clubs, and exclusive events.',
    badge: 'Ultimate Discretion'
  }
];

export default function BookingForm({ selectedGirlIds, onSubmitBooking, appliedGidList }: BookingFormProps) {
  // 1. Booking parameters state
  const [serviceId, setServiceId] = useState('nude');
  const [hours, setHours] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('22:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('mid-strip');
  const [location, setLocation] = useState('Bellagio Resort, 3600 S Las Vegas Blvd, Las Vegas, NV 89109');
  const [roomNumber, setRoomNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errorText, setErrorText] = useState('');

  // 2. Calculations based on master parameters list
  const selectedService = serviceOptions.find((s) => s.id === serviceId) || serviceOptions[0];
  const girlCount = selectedGirlIds.length;
  
  // Calculate dynamic dispatch surcharge based on zone ($50 for off-strip)
  const isOffStrip = selectedZoneId.startsWith('off-strip');
  const dispatchSurcharge = isOffStrip ? 50 : 0;
  
  const totalPrice = (girlCount * selectedService.hourlyRate * hours) + dispatchSurcharge;
  const depositAmount = girlCount * 150; // $150 deposit per girl

  // 3. Pre-fill date to today for convenience
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // 4. Form validation
  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (girlCount === 0) {
      setErrorText('Please select at least 1 Angel from the list above before finalizing.');
      return;
    }
    if (!name.trim()) {
      setErrorText('Please specify your contact name for reservation files.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorText('Please configure a valid callback mobile number to receive the private verified gallery.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorText('Please provide a valid secure email address for transactional billing files and deposit receipt records.');
      return;
    }
    if (!location.trim()) {
      setErrorText('Vegas outcalls require a valid hotel or residential strip address.');
      return;
    }

    setErrorText('');
    onSubmitBooking({
      selectedGirlIds,
      serviceId,
      hours,
      date,
      time,
      name,
      phone,
      email,
      location,
      roomNumber,
      instructions,
      totalPrice,
      depositAmount,
    });
  };

  return (
    <form onSubmit={handleProceed} className="w-full bg-[#0a0a0ff8] border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Decorative gradient drop */}
      <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Step 1: Select Entertainment Service Type */}
        <div className="flex-1 space-y-10">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E88] animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-[#FF2E88] uppercase font-bold">
                Step 1: Choose VIP Entertainment Profile
              </span>
            </div>
            <h3 className="font-display text-2xl font-black text-white leading-snug tracking-normal">
              Select Private Outcall Service
            </h3>
          </div>

          <div className="space-y-4">
            {serviceOptions.map((opt) => {
              const active = serviceId === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setServiceId(opt.id)}
                  className={`w-full p-5 sm:p-6 rounded-xl border text-left flex items-start gap-4 transition-all cursor-pointer relative ${
                    active
                      ? 'bg-[#FF2E88]/5 border-accent shadow-lg shadow-[#FF2E88]/5'
                      : 'bg-black/20 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${
                    active ? 'border-accent text-accent' : 'border-white/15 text-transparent'
                  }`}>
                    {active && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                      <span className="text-base font-extrabold text-white leading-snug tracking-wide group-hover:text-accent">
                        {opt.name}
                      </span>
                      <span className="font-mono text-sm font-bold text-accent">
                        ${opt.hourlyRate}/hr / Angel
                      </span>
                    </div>
                    <p className="text-[12px] text-white/70 leading-relaxed font-light tracking-wide">
                      {opt.description}
                    </p>
                  </div>


                </button>
              );
            })}
          </div>

          {/* Duration Selector */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-bold">
                Step 2: Entertainment Duration
              </span>
              <span className="font-mono text-xs text-accent font-bold">{hours} Hours Total</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 6, 8, 12].map((hr) => (
                <button
                  type="button"
                  key={hr}
                  onClick={() => setHours(hr)}
                  className={`py-3.5 text-xs font-bold font-mono rounded cursor-pointer border transition-all ${
                    hours === hr
                      ? 'bg-accent border-accent text-white shadow-md shadow-[#FF2E88]/20'
                      : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {hr} {hr === 1 ? 'Hour' : 'Hrs'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2B: Interactive Strip Map Selector */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0ad6ff] animate-pulse" />
                <span className="font-mono text-[9px] tracking-widest text-[#0ad6ff] uppercase font-bold">
                  Step 2B: Interactive Outcall Zoning Map
                </span>
              </div>
              <h4 className="font-display text-base font-black text-white uppercase tracking-wider mb-2">
                Vegas Strip Location Selector
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed tracking-wide">
                Choose your hotel region below. Pre-fills coordinates automatically and focuses nearest standby performers.
              </p>
            </div>
            
            <VegasStripMap
              selectedZoneId={selectedZoneId}
              onSelectZone={(zone) => {
                setSelectedZoneId(zone.id);
                setLocation(zone.representativeAddress);
              }}
            />
          </div>

        </div>

        {/* Step 2: Strip Location & Security Data */}
        <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-[#0ad6ff] uppercase font-bold mb-2">
                Step 3: Coordinates & Contact
              </span>
              <h3 className="font-display text-xl font-bold text-white leading-normal">
                Vegas Security & Suite Details
              </h3>
            </div>

            {/* Target inputs layout */}
            <div className="space-y-4">
              
              {/* Hotel / Villa Address */}
              <div className="relative">
                <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                  Vegas Hotel / Villa Name
                </label>
                <div className="flex items-center bg-black/40 border border-white/10 hover:border-white/20 focus-within:border-accent rounded-lg px-4 py-3.5 transition-all">
                  <MapPin className="w-4 h-4 text-white/30 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cosmopolitan Penthouse"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-sm text-white bg-transparent placeholder-white/30 border-none focus:outline-none focus:ring-0 leading-normal p-0"
                  />
                </div>
              </div>

              {/* Suite / Room Number */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                    Suite / Room Number
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 focus-within:border-accent rounded-lg px-4 py-3.5 transition-all">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suite 6104"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      className="w-full text-sm text-white bg-transparent placeholder-white/30 border-none focus:outline-none focus:ring-0 leading-normal p-0"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                    Reservation Name
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 focus-within:border-accent rounded-lg px-4 py-3.5 transition-all">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mike Tyson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm text-white bg-transparent placeholder-white/30 border-none focus:outline-none focus:ring-0 leading-normal p-0"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Grid: Verified Phone & Secure Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 flex justify-between font-bold">
                    <span>Callback Phone</span>
                    <span className="text-[#39ff14] text-[7px] font-black uppercase tracking-wider">SMS REQ</span>
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 hover:border-white/20 focus-within:border-[#39ff14] rounded-lg px-4 py-3.5 transition-all">
                    <Smartphone className="w-4 h-4 text-[#39ff14]/50 mr-2 shrink-0" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (702) 556-3772"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm text-white bg-transparent placeholder-white/30 border-none focus:outline-none focus:ring-0 leading-normal p-0"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 flex justify-between font-bold">
                    <span>Secure Email</span>
                    <span className="text-white/30 text-[7px] font-black uppercase tracking-wider">BILLING SEC</span>
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 hover:border-white/20 focus-within:border-accent rounded-lg px-4 py-3.5 transition-all">
                    <span className="text-white/30 mr-2 font-mono text-xs font-bold shrink-0">@</span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@reserve.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm text-white bg-transparent placeholder-white/30 border-none focus:outline-none focus:ring-0 leading-normal p-0"
                    />
                  </div>
                </div>
              </div>

              {/* Time and Date Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                    Starting Date
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-4 py-3 transition-all">
                    <Calendar className="w-4 h-4 text-white/30 mr-2.5 shrink-0" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-sm text-white bg-transparent border-none focus:outline-none focus:ring-0 leading-normal shrink-0 p-0"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                    Start Hour
                  </label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-4 py-3 transition-all">
                    <Clock className="w-4 h-4 text-white/30 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. 10:30 PM"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full text-sm text-white bg-transparent border-none focus:outline-none focus:ring-0 leading-normal p-0"
                    />
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div className="relative">
                <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 font-bold">
                  Special requests & Vibe details
                </label>
                <textarea
                  placeholder="e.g. Champagne toast, absolute discretion requested, quiet entry..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full h-20 text-sm text-white bg-black/40 border border-white/10 rounded-lg px-4 py-3 placeholder-white/30 focus:outline-none focus:border-accent resize-none focus:ring-0 leading-relaxed"
                />
              </div>

            </div>
          </div>

          {/* Dynamic Billing Summary Box */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
            <span className="block font-mono text-[9px] tracking-widest text-[#39ff14] uppercase font-bold mb-2.5">
              // ESTIMATED RESERVATION RESORT RATES
            </span>

            {/* Selected stats lines */}
            <div className="space-y-1.5 pb-2.5 border-b border-white/5 text-xs text-white/50">
              <div className="flex justify-between font-mono">
                <span>Selected Angels:</span>
                <span className="text-white font-bold">{girlCount} Girls</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Hourly Rate:</span>
                <span className="text-white font-bold">${selectedService.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Duration Period:</span>
                <span className="text-white font-bold">{hours} hrs</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Dispatch Fee:</span>
                <span className={dispatchSurcharge > 0 ? "text-amber-400 font-bold font-black" : "text-green-400 font-bold"}>
                  {dispatchSurcharge > 0 ? `+$${dispatchSurcharge} Surcharge` : 'FREE (In-Zone)'}
                </span>
              </div>
            </div>

            {/* Totals */}
            <div className="pt-2.5 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[10px] text-white/60">Balance Due on Arrival:</span>
                <span className="font-mono text-lg font-black text-white">${totalPrice - depositAmount}</span>
              </div>
              
              <div className="flex justify-between items-baseline p-2 rounded bg-accent/15 border border-accent/25">
                <div className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-[9px] text-[#FF2E88] font-bold uppercase">Booking Escrow Deposit:</span>
                </div>
                <span className="font-mono text-base font-black text-[#FF2E88] glow-pink">${depositAmount}</span>
              </div>
              
              <div className="mt-2.5 p-3 rounded bg-red-500/10 border border-red-500/20 space-y-1.5">
                <span className="block font-mono text-[8px] font-black tracking-widest text-[#FF2E88] uppercase">// STRICT SECURITY DISCLAIMER POLICY</span>
                <p className="text-[9px] text-white/50 leading-normal font-sans">
                  The <strong className="text-white font-bold">${depositAmount} escrow dispatcher deposit</strong> is instantly allocated as a standby retainer fee and is <strong className="text-[#FF2E88] font-bold uppercase">100% NON-REFUNDABLE</strong>. 
                </p>
                <p className="text-[8.5px] text-white/40 leading-normal font-mono uppercase font-bold tracking-tight">
                  No chargebacks or payment disputes allowed. Breaches of contract immediately transmit billing coordinates to the independent outcall licensing registry lists.
                </p>
              </div>
            </div>
          </div>

          {/* Error notice */}
          {errorText && (
            <div className="bg-red-500/10 border border-red-500/30 rounded p-2.5 text-center">
              <p className="text-[10px] text-red-400 font-mono font-bold leading-normal">{errorText}</p>
            </div>
          )}

          {/* Core Booking Submit Trigger */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-pink-500 cursor-pointer hover:from-accent hover:to-accent text-white font-mono text-xs tracking-widest font-black uppercase shadow-lg shadow-[#FF2E88]/15 hover:shadow-[#FF2E88]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-white animate-pulse" /> Reserve Angels & Unlock Galleries
          </button>

        </div>

      </div>
    </form>
  );
}

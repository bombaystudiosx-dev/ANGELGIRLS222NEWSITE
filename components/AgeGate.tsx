/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AgeGateProps {
  onVerified: () => void;
}

export default function AgeGate({ onVerified }: AgeGateProps) {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [ageGateError, setAgeGateError] = useState('');

  const handleVerifyBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthYear || !birthMonth || !birthDay) {
      setAgeGateError('Please enter your complete birth date.');
      return;
    }

    const yearVal = parseInt(birthYear, 10);
    const monthVal = parseInt(birthMonth, 10);
    const dayVal = parseInt(birthDay, 10);

    if (isNaN(yearVal) || isNaN(monthVal) || isNaN(dayVal)) {
      setAgeGateError('Please enter valid numeric birth entries.');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (yearVal < 1920 || yearVal > currentYear) {
      setAgeGateError(`Please enter a valid year between 1920 and ${currentYear}.`);
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - yearVal;
    const m = (today.getMonth() + 1) - monthVal;
    if (m < 0 || (m === 0 && today.getDate() < dayVal)) {
      age--;
    }

    if (age >= 21) {
      setAgeGateError('');
      localStorage.setItem('ag222_age_verified', 'true');
      onVerified();
    } else {
      setAgeGateError(`Access Denied: Under Las Vegas NV regulation, you must be 21 or older to enter. You are currently ${age} years old.`);
    }
  };

  const handleDeclineAge = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-6"
      style={{ 
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(/hiring-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="max-w-md w-full border border-[#FF2E88]/30 bg-black/20 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 relative shadow-[0_0_50px_rgba(255,46,136,0.25)]">
        {/* Highlight branding glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-accent/25 blur-2xl pointer-events-none" />
        
        <div className="space-y-3">
          <span className="font-display text-4xl tracking-widest text-[#FF2E88] font-black block glow-pink uppercase">
            ANGEL GIRLS 222
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] font-bold text-white/40 uppercase block">
            Las Vegas Outcall Companion Matrix
          </span>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF2E88]/30 to-transparent" />

        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-white leading-snug uppercase tracking-wide">
            Age Verification Required
          </p>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            You must be <span className="text-[#FF2E88] font-bold">21 or older</span> to enter Angel Girls 222. Under Las Vegas NV regulations, booking records require valid birth date entry.
          </p>
        </div>

        {/* Birthday Entry Form Container */}
        <form onSubmit={handleVerifyBirthday} className="space-y-5 text-left pt-2">
          <div>
            <label htmlFor="birth-month" className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">
              Your Birth Date
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Month Dropdown */}
              <div>
                <select
                  id="birth-month"
                  value={birthMonth}
                  aria-label="Birth Month"
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-white/10 text-white text-xs rounded-xl px-2 py-3.5 focus:border-[#FF2E88] focus:ring-1 focus:ring-[#FF2E88]/50 transition-all focus:outline-none cursor-pointer font-sans"
                >
                  <option value="" disabled className="text-white/30 bg-neutral-900">Month</option>
                  {[
                    { name: 'January', val: '1' },
                    { name: 'February', val: '2' },
                    { name: 'March', val: '3' },
                    { name: 'April', val: '4' },
                    { name: 'May', val: '5' },
                    { name: 'June', val: '6' },
                    { name: 'July', val: '7' },
                    { name: 'August', val: '8' },
                    { name: 'September', val: '9' },
                    { name: 'October', val: '10' },
                    { name: 'November', val: '11' },
                    { name: 'December', val: '12' }
                  ].map((m) => (
                    <option key={m.val} value={m.val} className="bg-neutral-950 text-white font-mono">{m.name}</option>
                  ))}
                </select>
              </div>

              {/* Day Dropdown */}
              <div>
                <select
                  id="birth-day"
                  value={birthDay}
                  aria-label="Birth Day"
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-white/10 text-white text-xs rounded-xl px-2 py-3.5 focus:border-[#FF2E88] focus:ring-1 focus:ring-[#FF2E88]/50 transition-all focus:outline-none cursor-pointer font-sans"
                >
                  <option value="" disabled className="text-white/30 bg-neutral-900">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-neutral-950 text-white font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Input */}
              <div>
                <input
                  id="birth-year"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  placeholder="YYYY"
                  value={birthYear}
                  aria-label="Birth Year"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setBirthYear(val);
                  }}
                  className="w-full bg-neutral-900/90 border border-white/10 text-white text-xs text-center rounded-xl px-2 py-3.5 focus:border-[#FF2E88] focus:ring-1 focus:ring-[#FF2E88]/50 transition-all focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Validation Error Feedback */}
          {ageGateError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/50 border border-red-500/30 rounded-lg p-3"
            >
              <p className="text-xs text-red-200 font-mono font-bold">{ageGateError}</p>
            </motion.div>
          )}

          {/* Submit Buttons Container */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* I Decline Button */}
            <button
              type="button"
              onClick={handleDeclineAge}
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-700 transition-all duration-200"
            >
              I Decline
            </button>

            {/* I Confirm Button */}
            <button
              type="submit"
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF2E88] to-[#FF5EB3] text-white text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,46,136,0.5)] transition-all duration-200"
            >
              I Confirm
            </button>
          </div>
        </form>

        {/* Fine Print & Agreement Checkbox */}
        <div className="pt-2 space-y-2 border-t border-white/10">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 w-4 h-4 rounded accent-[#FF2E88] cursor-pointer"
            />
            <span className="text-[9px] text-white/40 font-light leading-tight group-hover:text-white/60 transition-colors">
              I acknowledge that I am 21+ years old and agree to Angel Girls 222 Terms of Service and all legal disclaimers.
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
,

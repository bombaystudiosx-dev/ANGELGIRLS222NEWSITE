import React from 'react';
import { Girl } from '../types';

export const eliteGirls: Girl[] = [
  {
    id: '1',
    name: 'Crystal',
    age: 22,
    height: "5'7\"",
    measurements: '34C-24-35',
    ethnicity: 'Caucasian',
    languages: ['English'],
    features: ['Blue Eyes', 'Blonde Hair'],
    bio: 'Elite companion with a passion for luxury and elegance.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    isVIP: true
  },
  {
    id: '2',
    name: 'Jade',
    age: 24,
    height: "5'6\"",
    measurements: '34D-25-36',
    ethnicity: 'Asian',
    languages: ['English', 'Mandarin'],
    features: ['Brown Eyes', 'Black Hair'],
    bio: 'Exotic beauty with a charming personality.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Bella',
    age: 21,
    height: "5'8\"",
    measurements: '34B-23-34',
    ethnicity: 'European',
    languages: ['English', 'French'],
    features: ['Green Eyes', 'Brunette'],
    bio: 'Sophisticated and elegant, perfect for dinner dates and high-end events.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    id: '4',
    name: 'Luna',
    age: 23,
    height: "5'5\"",
    measurements: '32C-24-35',
    ethnicity: 'Latina',
    languages: ['English', 'Spanish'],
    features: ['Hazel Eyes', 'Dark Brown Hair'],
    bio: 'High energy and fun-loving, Luna is the life of any pool party.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    isVIP: true
  },
  {
    id: '5',
    name: 'Amber',
    age: 25,
    height: "5'9\"",
    measurements: '36C-26-38',
    ethnicity: 'Mixed',
    languages: ['English'],
    features: ['Brown Eyes', 'Curly Hair'],
    bio: 'Stunning presence with a warm and engaging personality.',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    id: '6',
    name: 'Sienna',
    age: 22,
    height: "5'7\"",
    measurements: '34D-25-36',
    ethnicity: 'Caucasian',
    languages: ['English', 'Italian'],
    features: ['Blue Eyes', 'Red Hair'],
    bio: 'Classic beauty with a modern twist, Sienna is always in high demand.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    isFeatured: true
  }
];

interface GirlsShowcaseProps {
  onSelectGirl: (id: string) => void;
  selectedGirlIds: string[];
}

export default function GirlsShowcase({ onSelectGirl, selectedGirlIds }: GirlsShowcaseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {eliteGirls.map((girl) => (
        <div 
          key={girl.id}
          onClick={() => onSelectGirl(girl.id)}
          className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
            selectedGirlIds.includes(girl.id) ? 'border-accent scale-[1.02] shadow-2xl shadow-accent/20' : 'border-white/5 hover:border-white/20'
          }`}
        >
          <img src={girl.image} alt={girl.name} className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110" />
          
          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {girl.isVIP && (
              <span className="px-3 py-1 bg-gold text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                VIP Elite
              </span>
            )}
            {girl.isFeatured && (
              <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                Featured
              </span>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{girl.name}</h3>
            <p className="text-white/60 text-xs font-mono tracking-widest uppercase">
              {girl.age} years // {girl.height} // {girl.ethnicity}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {girl.features.slice(0, 2).map(feature => (
                <span key={feature} className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[9px] text-white/70 uppercase font-bold">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

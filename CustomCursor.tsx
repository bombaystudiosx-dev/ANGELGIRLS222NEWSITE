/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SimulationMode = 'WAVES' | 'VORTEX' | 'CHAOS' | 'TURBULENCE';
export type ActiveColor = 'CRIMSON' | 'CYBER_CYAN' | 'NEON_LIME' | 'CHROME_WHITE';

export interface ParticleConfig {
  mode: SimulationMode;
  speed: number;
  color: ActiveColor;
  density: number;
  repelForce: number;
  mouseEffect: 'REPEL' | 'ATTRACT' | 'VORTEX' | 'NONE';
}

export type ActiveView = 'home' | 'booking' | 'about' | 'hiring' | 'terms' | 'privacy' | 'thank-you' | 'location-mid-strip' | 'location-north-strip' | 'location-south-strip' | 'location-downtown' | 'location-off-strip-west' | 'location-off-strip-east';

export interface Girl {
  id: string;
  name: string;
  age: number;
  height: string; // e.g. "5'7\""
  hair: string; // e.g. "Brunette"
  cupSize: string; // e.g. "34D"
  measurements: string; // e.g. "34-24-35"
  tags: string[]; // e.g. ["Vegas Elite", "Bestseller", "New Featured"]
  image: string;
  bio: string;
  rating: number; // e.g. 5.0
  languages: string[];
  gallery?: string[];
}

export interface ServiceOption {
  id: string;
  name: string;
  hourlyRate: number;
  description: string;
  badge: string;
}

export interface BookingState {
  selectedGirlIds: string[];
  serviceId: string;
  hours: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  location: string; // Hotel/Villa name
  roomNumber: string;
  instructions: string;
  totalPrice: number;
  depositAmount: number;
}

export interface HiringApplication {
  name: string;
  age: string;
  phone: string;
  instagram: string;
  height: string;
  experience: string;
  message: string;
  referredBy?: string;
}

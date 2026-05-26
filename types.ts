export type ActiveView = 
  | 'home' 
  | 'booking' 
  | 'about' 
  | 'hiring' 
  | 'terms' 
  | 'privacy' 
  | 'thank-you'
  | 'location-mid-strip'
  | 'location-north-strip'
  | 'location-south-strip'
  | 'location-downtown'
  | 'location-off-strip-west'
  | 'location-off-strip-east';

export type ActiveColor = 'CRIMSON' | 'CYBER_CYAN' | 'NEON_LIME' | 'CHROME_WHITE';

export interface ParticleConfig {
  mode: 'WAVES' | 'VORTEX' | 'CHAOS' | 'TURBULENCE';
  speed: number;
  color: ActiveColor;
  density: number;
  repelForce: number;
  mouseEffect: 'REPEL' | 'ATTRACT' | 'VORTEX' | 'NONE';
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
  location: string;
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
  referredBy: string;
}

export interface Girl {
  id: string;
  name: string;
  age: number;
  height: string;
  measurements: string;
  ethnicity: string;
  languages: string[];
  features: string[];
  bio: string;
  image: string;
  gallery: string[];
  isVIP?: boolean;
  isFeatured?: boolean;
}

export interface ServiceOption {
  id: string;
  name: string;
  hourlyRate: number;
  description: string;
  badge: string;
}

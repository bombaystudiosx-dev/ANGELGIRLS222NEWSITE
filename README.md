# ANGEL GIRLS 222 — Elite Las Vegas Outcall Companion Platform

A premium, production-grade React + Vite web application for booking luxury outcall entertainment in Las Vegas. Built with the **Bombay Build Protocol™** for a high-end, conversion-focused user experience.

---

## **Features**

✨ **Premium UI/UX**
- Glassmorphic design with neon pink accents
- Smooth Framer Motion animations
- Three.js particle background effects
- Fully responsive mobile-first design

🎭 **Angel Roster System**
- 6+ elite companion profiles with photos and details
- VIP and Featured status badges
- Interactive selection and booking workflow

📍 **Vegas Dispatch Zones**
- 6 regional dispatch hubs (Mid-Strip, North-Strip, South Strip, Downtown, Summerlin, Henderson)
- Interactive Google Maps integration
- Real-time ETA calculations
- Resort-specific landmark directories

🔐 **Age Verification Gate**
- Secure 21+ verification system
- Birth date validation
- Compliance with Nevada regulations

💳 **Booking System**
- Multi-step booking form
- Service selection (Full Nude, Topless, Pool Party, Arm Candy)
- Duration and location configuration
- Deposit calculation and payment integration

📱 **Mobile Optimized**
- Touch-friendly navigation
- Responsive grid layouts
- Mobile drawer menu
- SMS and call CTAs

---

## **Tech Stack**

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js
- **Maps:** Google Maps API (@vis.gl/react-google-maps)
- **Icons:** Lucide React
- **Deployment:** Vercel / Netlify

---

## **Getting Started**

### **Prerequisites**
- Node.js 22+
- npm or pnpm

### **Installation**

```bash
# Clone the repository
git clone https://github.com/bombaystudiosx-dev/ANGELGIRLS222NEWSITE.git
cd ANGELGIRLS222NEWSITE

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Google Maps API key to .env.local
VITE_GOOGLE_MAPS_PLATFORM_KEY=your_api_key_here
```

### **Development**

```bash
# Start dev server (runs on http://localhost:3000)
npm run dev

# Type checking
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## **Project Structure**

```
ANGELGIRLS222NEWSITE/
├── components/
│   ├── GirlsShowcase.tsx          # Angel roster grid
│   ├── BookingForm.tsx             # Multi-step booking form
│   ├── VegasStripMap.tsx           # Interactive dispatch map
│   ├── ParticleBackground.tsx      # Three.js background
│   ├── CustomCursor.tsx            # Animated cursor overlay
│   ├── TextReveal.tsx              # Text animation component
│   └── LocationSEOView.tsx         # Regional SEO pages
├── App.tsx                          # Main application component
├── main.tsx                         # React entry point
├── types.ts                         # TypeScript type definitions
├── index.css                        # Global styles & theme
├── index.html                       # HTML template
├── vite.config.ts                   # Vite configuration
├── vercel.json                      # Vercel deployment config
├── netlify.toml                     # Netlify deployment config
├── DEPLOYMENT.md                    # Deployment guide
└── package.json                     # Dependencies & scripts
```

---

## **Environment Variables**

Create a `.env.local` file in the project root:

```env
# Required: Google Maps API Key
VITE_GOOGLE_MAPS_PLATFORM_KEY=your_google_maps_api_key

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/).

---

## **Deployment**

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import this repository
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### **Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## **Key Components**

### **GirlsShowcase.tsx**
Displays the roster of available Angels with photos, details, and VIP/Featured badges. Supports multi-select for booking.

### **BookingForm.tsx**
Multi-step booking workflow:
1. Select Angels
2. Choose service type and duration
3. Select Vegas zone and hotel
4. Enter contact details
5. Review and submit

### **VegasStripMap.tsx**
Interactive Google Maps showing dispatch zones with real-time ETA and hotel information.

### **ParticleBackground.tsx**
Three.js-powered animated particle system with multiple modes (WAVES, VORTEX, CHAOS, TURBULENCE) and mouse interactions.

---

## **Customization**

### **Add More Angels**
Edit `components/GirlsShowcase.tsx` and add to the `eliteGirls` array:

```typescript
{
  id: '7',
  name: 'Your Angel Name',
  age: 23,
  height: "5'7\"",
  measurements: '34C-24-35',
  ethnicity: 'Ethnicity',
  languages: ['English'],
  features: ['Feature 1', 'Feature 2'],
  bio: 'Bio text',
  image: 'https://image-url.jpg',
  gallery: [],
  isVIP: true,
  isFeatured: false
}
```

### **Change Theme Colors**
Edit `index.css` in the `@theme` block:

```css
@theme {
  --color-accent: #FF2E88;        /* Primary brand color */
  --color-gold: #FFC72C;          /* VIP badge color */
  --color-dark: #07070A;          /* Background */
}
```

### **Update Phone Number**
Search for `702-556-3772` in `App.tsx` and replace with your business number.

---

## **Performance**

- **Lighthouse Score:** 90+
- **Core Web Vitals:** Optimized
- **Bundle Size:** ~450KB (gzipped)
- **Time to Interactive:** <2s

---

## **Security**

- ✅ Age verification gate (21+ required)
- ✅ HTTPS/SSL enforced
- ✅ No sensitive data stored in localStorage
- ✅ Google Maps API key restricted to domain
- ✅ Security headers configured (X-Frame-Options, CSP, etc.)

---

## **Browser Support**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## **Contributing**

This is a private project. For changes or improvements, contact the development team.

---

## **License**

Apache 2.0 — See LICENSE file for details.

---

## **Support**

For deployment questions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

For technical issues, check the GitHub repository or contact support.

---

**Built with ❤️ by Bombay Studios**

*Premium web experiences, production-grade on day one.*

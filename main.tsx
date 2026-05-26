@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Syne", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  --color-accent: #FF2E88;
  --color-accent-hover: #E01A6E;
  --color-gold: #FFC72C;
  --color-gold-hover: #DDA10E;
  --color-dark: #07070A;
  --color-surface-elevated: #121217;
  --color-surface-glass: rgba(18, 18, 23, 0.7);
}

/* Base custom styles to align with premium design system */
html {
  background-color: #07070A;
  color: #ffffff;
  scroll-behavior: smooth;
  overflow-x: hidden;
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 100 100"><line x1="50" y1="16" x2="50" y2="84" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="16" x2="50" y2="84" stroke="%23FF2E88" stroke-width="2" stroke-linecap="round"/><path d="M50,26 C50,26 54,20 58,20 C62,20 64,24 64,28 C64,32 60,34 58,36 C56,38 56,40 58,42 C60,44 66,44 70,42 C74,40 78,42 78,46 C78,50 74,54 66,56 C58,58 54,58 52,54 C50,52 50,48 50,46 C50,46 46,48 44,52 C42,56 38,60 38,62 C38,62 36,62 36,60 C36,58 40,52 44,46 C48,40 50,38 50,38 M50,32 C50,32 52,34 54,34" fill="%23FF2E88" stroke="%23ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>') 32 10, auto;
}

/* Custom scrollbars representing Las Vegas neon nightlife */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #07070A;
}
::-webkit-scrollbar-thumb {
  background: #191924;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #FF2E88;
  box-shadow: 0 0 10px #FF2E88;
}

body {
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.625;
  letter-spacing: -0.01em;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  user-select: none;
  background-color: #07070A;
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 100 100"><line x1="50" y1="16" x2="50" y2="84" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="16" x2="50" y2="84" stroke="%23FF2E88" stroke-width="2" stroke-linecap="round"/><path d="M50,26 C50,26 54,20 58,20 C62,20 64,24 64,28 C64,32 60,34 58,36 C56,38 56,40 58,42 C60,44 66,44 70,42 C74,40 78,42 78,46 C78,50 74,54 66,56 C58,58 54,58 52,54 C50,52 50,48 50,46 C50,46 46,48 44,52 C42,56 38,60 38,62 C38,62 36,62 36,60 C36,58 40,52 44,46 C48,40 50,38 50,38 M50,32 C50,32 52,34 54,34" fill="%23FF2E88" stroke="%23ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>') 32 10, auto;
}

a, button, select, input, textarea, [role="button"], label {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 100 100"><line x1="50" y1="16" x2="50" y2="84" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="16" x2="50" y2="84" stroke="%23FF2E88" stroke-width="2" stroke-linecap="round"/><path d="M50,26 C50,26 54,20 58,20 C62,20 64,24 64,28 C64,32 60,34 58,36 C56,38 56,40 58,42 C60,44 66,44 70,42 C74,40 78,42 78,46 C78,50 74,54 66,56 C58,58 54,58 52,54 C50,52 50,48 50,46 C50,46 46,48 44,52 C42,56 38,60 38,62 C38,62 36,62 36,60 C36,58 40,52 44,46 C48,40 50,38 50,38 M50,32 C50,32 52,34 54,34" fill="%23FF2E88" stroke="%23ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>') 32 10, pointer !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

/* Neon glow classes and keyframe animations */
.glow-pink {
  text-shadow: 0 0 10px rgba(255, 46, 136, 0.6), 0 0 20px rgba(255, 46, 136, 0.4);
}

.glow-gold {
  text-shadow: 0 0 10px rgba(255, 199, 44, 0.6), 0 0 20px rgba(255, 199, 44, 0.4);
}

.border-glow-pink {
  box-shadow: 0 0 15px rgba(255, 46, 136, 0.25);
  border-color: rgba(255, 46, 136, 0.4);
}

.border-glow-gold {
  box-shadow: 0 0 15px rgba(255, 199, 44, 0.25);
  border-color: rgba(255, 199, 44, 0.4);
}

@keyframes pulse-pink {
  0%, 100% {
    box-shadow: 0 0 15px rgba(255, 46, 136, 0.3);
    border-color: rgba(255, 46, 136, 0.5);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 46, 136, 0.6);
    border-color: rgba(255, 46, 136, 0.9);
  }
}

.animate-pulse-pink {
  animation: pulse-pink 2s infinite ease-in-out;
}

@keyframes subtle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-subtle-bounce {
  animation: subtle-bounce 4s infinite ease-in-out;
}

/* High conversion glowing badges */
.badge-vip {
  background: linear-gradient(135deg, #FFC72C 0%, #DDA10E 100%);
  color: #000000;
  font-weight: 800;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.4);
}

.badge-featured {
  background: linear-gradient(135deg, #FF2E88 0%, #B80D54 100%);
  color: #ffffff;
  font-weight: 700;
}

/* Full screen glass age gate overlays */
.glass-panel {
  background: rgba(18, 18, 23, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [hoveredState, setHoveredState] = useState<'default' | 'link' | 'project' | 'control'>('default');
  const [hoveredText, setHoveredText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Position coordinates using Framer Motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for outer lagging ring
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if the user is on mobile/tablet (touchscreen)
    const checkViewportAndTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch || window.innerWidth < 1024);
    };

    checkViewportAndTouch();
    window.addEventListener('resize', checkViewportAndTouch);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic hover listeners for links, project cards, and control panel knobs
    const scanHoverables = () => {
      const interactiveEls = document.querySelectorAll('a, button, [role="button"], .interactive-knob');
      const projectEls = document.querySelectorAll('.interactive-project');

      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => setHoveredState('link'));
        el.addEventListener('mouseleave', () => setHoveredState('default'));
      });

      projectEls.forEach((el) => {
        const textValue = el.getAttribute('data-cursor-text') || 'VIEW';
        el.addEventListener('mouseenter', () => {
          setHoveredState('project');
          setHoveredText(textValue);
        });
        el.addEventListener('mouseleave', () => {
          setHoveredState('default');
          setHoveredText('');
        });
      });
    };

    // Initial scan
    scanHoverables();

    // Re-scan periodically as DOM re-renders items
    const interval = setInterval(scanHoverables, 1200);

    return () => {
      window.removeEventListener('resize', checkViewportAndTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. Instant Inner Target Dot */}
      <motion.div
        id="cursor-dot"
        className="fixed w-2 h-2 rounded-full bg-[#FF2E88] pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoveredState !== 'default' ? 0.4 : 1,
          backgroundColor: hoveredState === 'default' ? '#FF2E88' : '#0ad6ff',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      />

      {/* 2. Lagging Spring Outer Ring */}
      <motion.div
        id="cursor-ring"
        className="fixed rounded-full pointer-events-none z-45 flex items-center justify-center text-[10px] uppercase tracking-[0.1em] font-mono leading-none border font-bold text-black"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hoveredState === 'project' ? 80 : hoveredState === 'link' ? 44 : 32,
          height: hoveredState === 'project' ? 80 : hoveredState === 'link' ? 44 : 32,
          borderColor: hoveredState === 'project' ? 'rgba(10, 214, 255, 0.8)' : hoveredState === 'link' ? 'rgba(255, 46, 136, 0.8)' : 'rgba(255, 46, 136, 0.3)',
          backgroundColor: hoveredState === 'project' ? 'rgba(10, 214, 255, 0.95)' : hoveredState === 'link' ? 'rgba(255, 46, 136, 0.15)' : 'rgba(255, 46, 136, 0.0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      >
        {hoveredState === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-black font-semibold tracking-widest text-[9px]"
          >
            {hoveredText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

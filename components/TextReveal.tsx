/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordStagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  wordStagger = 0.05,
  highlightWords = [],
  highlightClass = 'text-[#ff2a5f]',
}: TextRevealProps) {
  // Split words
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordStagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', rotate: 2, scale: 0.95, opacity: 0 },
    visible: {
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-hidden p-0 m-0 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {words.map((word, wordIdx) => {
        // Check if word or cleaned word matches highlight target
        const isHighlighted = highlightWords.some(
          (hWord) =>
            word.toLowerCase().includes(hWord.toLowerCase()) ||
            hWord.toLowerCase().includes(word.toLowerCase().replace(/[^a-z]/g, ''))
        );

        return (
          <span
            key={`${word}-${wordIdx}`}
            className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isHighlighted ? highlightClass : ''}`}
            >
              {word === '' ? '\u00A0' : word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

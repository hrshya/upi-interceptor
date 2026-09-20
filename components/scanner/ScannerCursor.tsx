'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ScannerCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return <motion.div className="fixed top-0 left-0 w-8 h-8 border-2 border-[#ccff00] rounded-full pointer-events-none z-9999 mix-blend-difference flex items-center justify-center" style={{ x: cursorXSpring, y: cursorYSpring }}><div className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full" /></motion.div>;
};

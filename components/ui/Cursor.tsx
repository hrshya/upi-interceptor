"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";





export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('button') || (e.target as Element).closest('a') || (e.target as Element).closest('.interactive-element') || (e.target as Element).closest('input')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ccff00] rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: useTransform(cursorX, x => x - 4),
          y: useTransform(cursorY, y => y - 4),
        }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-[#ccff00]/50 rounded-full pointer-events-none z-[9999]"
        animate={{
          width: isHovering ? 70 : 32,
          height: isHovering ? 70 : 32,
          backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.1)' : 'rgba(204, 255, 0, 0)',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: useTransform(cursorXSpring, x => x - (isHovering ? 35 : 16)),
          y: useTransform(cursorYSpring, y => y - (isHovering ? 35 : 16)),
        }}
      />
    </div>
  );
};
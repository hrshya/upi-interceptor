'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

type CircularSonarProps = { isListening: boolean };

export const CircularSonar = ({ isListening }: CircularSonarProps) => {
  const bars = 36;
  const radius = 60;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-[#ccff00]/20" />
      <div className="absolute inset-4 rounded-full border border-[#ccff00]/10" />
      <div className="absolute inset-8 rounded-full border border-[#ccff00]/5 border-dashed" />
      {isListening && (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-r-2 border-[#ccff00] bg-gradient-to-r from-transparent to-[#ccff00]/10" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)' }} />
      )}
      {Array.from({ length: bars }).map((_, index) => {
        const rotation = (360 / bars) * index;
        return (
          <motion.div key={index} className="absolute origin-bottom w-1 rounded-full opacity-80" style={{ bottom: '50%', left: 'calc(50% - 2px)', transform: `rotate(${rotation}deg) translateY(-${radius}px)`, backgroundColor: isListening ? '#ccff00' : 'rgba(255,255,255,0.1)' }} animate={{ height: isListening ? ['4px', `${Math.random() * 25 + 5}px`, '4px'] : '4px' }} transition={{ repeat: Infinity, duration: isListening ? Math.random() * 0.3 + 0.1 : 0, ease: 'easeInOut' }} />
        );
      })}
      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-colors ${isListening ? 'bg-[#ccff00]/10 border-[#ccff00]' : 'bg-black border-white/20'}`}>
        {isListening ? <Mic size={18} className="text-[#ccff00] animate-pulse" /> : <MicOff size={18} className="text-gray-500" />}
      </div>
    </div>
  );
};

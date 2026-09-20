'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Cpu, X } from 'lucide-react';
import type { Transaction } from '@/app/dashboard/types';

type FraudModalProps = { transaction: Transaction | null; onClose: () => void };

export const FraudModal = ({ transaction, onClose }: FraudModalProps) => (
  <AnimatePresence>
    {transaction && transaction.details && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none select-none flex flex-wrap content-start">{Array.from({ length: 50 }).map((_, index) => <span key={index} className="text-[#ff003c] text-6xl font-black p-4">FRAUD_DETECTED</span>)}</div>
        <motion.div initial={{ scale: 1.1, filter: 'blur(10px)' }} animate={{ scale: 1, filter: 'blur(0px)' }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 400 }} className="w-full max-w-4xl bg-[#0a0000] border border-[#ff003c] relative overflow-hidden shadow-[0_0_100px_rgba(255,0,60,0.2)]">
          <div className="bg-[#ff003c] p-3 flex justify-between items-center text-black"><div className="flex items-center gap-3 font-bold font-['Space_Grotesk'] text-xl tracking-tight uppercase glitch-anim"><AlertTriangle size={20} /> CRITICAL: Interception Protocol Engaged</div><button onClick={onClose} className="hover:bg-black/20 p-1 rounded transition-colors"><X size={20} /></button></div>
          <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 relative z-10">
            <div className="w-full md:w-1/2 relative bg-black border border-white/10 aspect-video md:aspect-square flex flex-col"><div className="border-b border-white/10 bg-white/5 p-2 text-[10px] text-gray-500 flex justify-between"><span>VISION_BUFFER // {transaction.id}</span><span className="text-[#ff003c] animate-pulse">ANALYZING</span></div><div className="flex-1 relative overflow-hidden flex items-center justify-center bg-grid opacity-80"><div className="absolute left-0 w-full h-0.5 bg-[#ff003c] shadow-[0_0_15px_#ff003c] z-20 scanning-laser" /><motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[20%] left-[30%] w-[50%] h-[40%] border-2 border-[#ff003c] bg-[#ff003c]/10"><div className="absolute -top-6 left-[-2px] bg-[#ff003c] text-black text-[10px] font-bold px-2 py-0.5 uppercase">SPOOF_{Math.floor(transaction.details.confidence * 100)}%</div><div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#ff003c]" /><div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#ff003c]" /><div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#ff003c]" /><div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#ff003c]" /></motion.div></div></div>
            <div className="w-full md:w-1/2 flex flex-col justify-center"><div className="mb-8"><p className="text-[10px] text-[#ff003c] uppercase tracking-widest mb-2 flex items-center gap-2"><Cpu size={12} /> Execution Engine</p><p className="font-['Space_Grotesk'] text-2xl text-white uppercase">{transaction.details.engine}</p></div><div className="mb-8"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Identified Anomalies</p><div className="space-y-2">{transaction.details.flags.map((flag, index) => <motion.div key={flag} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (index * 0.1) }} className="flex items-center gap-3 text-xs text-white bg-[#ff003c]/10 border-l-2 border-[#ff003c] p-2"><span className="text-[#ff003c]">[{index + 1}]</span>{flag}</motion.div>)}</div></div><div className="flex gap-4 mt-auto"><button onClick={onClose} className="flex-1 py-3 bg-[#ff003c] text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Enforce Block</button><button onClick={onClose} className="px-6 py-3 border border-white/20 text-gray-400 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Ignore</button></div></div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

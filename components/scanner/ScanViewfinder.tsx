'use client';

import { AnimatePresence, motion, type MotionValue } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Cpu, ScanLine } from 'lucide-react';
import { ReceiptUpload, type ReceiptAnalysisResult } from '@/components/ReceiptUpload';
import type { ResultType, ScannerStatus } from '@/app/dashboard/scanner/types';
import { GlitchText } from './GlitchText';

type ScanViewfinderProps = {
  status: ScannerStatus;
  resultType: ResultType;
  sessionTrigger: number;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onUploadStart: (file: File) => void;
  onResult: (result: ReceiptAnalysisResult) => void;
  onError: (message: string) => void;
  onReset: () => void;
};

export const ScanViewfinder = ({ status, resultType, sessionTrigger, rotateX, rotateY, onUploadStart, onResult, onError, onReset }: ScanViewfinderProps) => {
  return (
    <motion.div style={{ rotateX, rotateY }} className="w-full max-w-3xl aspect-video bg-[#050505]/80 backdrop-blur-md border border-white/10 relative hud-wrapper shadow-[0_0_100px_rgba(0,0,0,0.8)]">
    <div className="hud-bracket border-t-4 border-l-4 top-0 left-0" /><div className="hud-bracket border-t-4 border-r-4 top-0 right-0" /><div className="hud-bracket border-b-4 border-l-4 bottom-0 left-0" /><div className="hud-bracket border-b-4 border-r-4 bottom-0 right-0" />
    <div className="absolute inset-4 border border-white/5 bg-black overflow-hidden flex items-center justify-center group">
      <AnimatePresence mode="wait">
        {status === 'IDLE' && <motion.div key="idle" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-gray-600 group-hover:text-white transition-colors"><ScanLine size={64} className="mb-4 opacity-50 group-hover:opacity-100 group-hover:text-[#ccff00] transition-all duration-500" /><h2 className="font-['Space_Grotesk'] text-2xl font-bold uppercase tracking-widest"><GlitchText text="Upload Receipt" trigger={sessionTrigger} /></h2><p className="font-['JetBrains_Mono'] text-xs mt-2 uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-[#ccff00]">Send a payment screenshot for verification</p><ReceiptUpload onUploadStart={onUploadStart} onResult={onResult} onError={onError} /></motion.div>}
        {status === 'ANALYZING' && <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative flex flex-col items-center justify-center"><div className="w-48 h-72 border border-white/10 bg-gray-900/50 p-4 opacity-30"><div className="w-1/2 h-2 bg-gray-700 mb-4" /><div className="w-full h-1 bg-gray-700 mb-2" /><div className="w-3/4 h-1 bg-gray-700 mb-8" /><div className="w-full h-8 border border-dashed border-gray-600 mt-auto" /></div><div className="absolute left-0 w-full h-px bg-[#ccff00] scanning-laser shadow-[0_0_15px_#ccff00]" /><div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"><div className="text-center"><Cpu size={48} className="text-[#ccff00] animate-pulse mx-auto mb-4" /><h2 className="font-['Space_Grotesk'] text-3xl font-black text-[#ccff00] tracking-widest uppercase"><GlitchText text="AI Inference Active" trigger={sessionTrigger} /></h2></div></div></motion.div>}
        {status === 'RESULT' && <motion.div key="result" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/90 backdrop-blur-md ${resultType === 'FRAUD' ? 'shadow-[inset_0_0_150px_rgba(255,42,42,0.2)]' : 'shadow-[inset_0_0_150px_rgba(204,255,0,0.1)]'}`}>
          {resultType === 'FRAUD' ? <><AlertTriangle size={80} className="text-[#ff2a2a] mb-6 animate-bounce" /><h2 className="font-['Space_Grotesk'] text-5xl font-black text-[#ff2a2a] uppercase tracking-tighter mb-4"><GlitchText text="THREAT INTERCEPTED" trigger={sessionTrigger} /></h2><p className="font-['JetBrains_Mono'] text-gray-400 mb-8 max-w-md">Neural engine detected synthetic anomalies in typography and cryptographic checksum failure. Payment origin blocked.</p><button onClick={(event) => { event.stopPropagation(); onReset(); }} className="px-8 py-4 bg-[#ff2a2a] text-black font-bold font-['Space_Grotesk'] tracking-widest hover:bg-white transition-colors z-50 relative pointer-events-auto">DISMISS &amp; PURGE</button></> : <><CheckCircle2 size={80} className="text-[#ccff00] mb-6" /><h2 className="font-['Space_Grotesk'] text-5xl font-black text-[#ccff00] uppercase tracking-tighter mb-4"><GlitchText text="PAYMENT VERIFIED" trigger={sessionTrigger} /></h2><p className="font-['JetBrains_Mono'] text-gray-400 mb-8 max-w-md">Pixel structure integrity nominal. Cryptographic checksum validated against banking ledger.</p><button onClick={(event) => { event.stopPropagation(); onReset(); }} className="px-8 py-4 bg-[#ccff00] text-black font-bold font-['Space_Grotesk'] tracking-widest hover:bg-white transition-colors z-50 relative pointer-events-auto">PROCESS NEXT</button></>}
        </motion.div>}
      </AnimatePresence>
    </div>
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-['JetBrains_Mono'] text-[9px] text-gray-600 bg-[#020202] px-4">SECURE_ENCLAVE_v4.1.0</div>
    </motion.div>
  );
};

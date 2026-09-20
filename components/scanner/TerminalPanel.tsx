'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import type { ScannerLog } from '@/app/dashboard/scanner/types';
import { GlitchText } from './GlitchText';

type TerminalPanelProps = { logs: ScannerLog[] };

export const TerminalPanel = ({ logs }: TerminalPanelProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  return (
    <div className="w-[400px] bg-[#050505] border-l border-white/10 flex flex-col relative z-20 h-full">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]"><div className="flex items-center gap-3"><TerminalIcon size={16} className="text-[#ccff00]" /><GlitchText text="AWS_EXEC_TRACE" trigger={logs.length} className="font-['Space_Grotesk'] text-sm font-bold tracking-widest text-[#ccff00]" /></div><div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-800" /><div className="w-2 h-2 rounded-full bg-gray-800" /><div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" /></div></div>
      <div className="flex-1 p-5 overflow-y-auto no-scrollbar font-['JetBrains_Mono'] text-xs text-gray-400 space-y-3 relative"><div className="absolute top-0 left-4 bottom-0 w-px bg-white/5" /><AnimatePresence>{logs.map((log, index) => <motion.div key={`${log.msg}-${index}`} initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} className={`leading-relaxed pl-4 relative ${log.type === 'ERR' ? 'text-[#ff2a2a]' : log.type === 'SUCCESS' ? 'text-[#ccff00]' : log.type === 'WARN' ? 'text-orange-400' : 'text-gray-300'}`}><div className={`absolute top-2 -left-1 w-2 h-2 rounded-full ${log.type === 'ERR' ? 'bg-[#ff2a2a] shadow-[0_0_10px_#ff2a2a]' : log.type === 'SUCCESS' ? 'bg-[#ccff00]' : 'bg-gray-600'}`} /><span className="text-gray-600 mr-2 opacity-50">[{log.timestamp}]</span><br /><span dangerouslySetInnerHTML={{ __html: log.msg }} /></motion.div>)}</AnimatePresence><div ref={endRef} className="h-4" /></div>
    </div>
  );
};

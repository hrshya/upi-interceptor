import Link from 'next/link';
import { ArrowLeft, Crosshair, Lock, Wifi } from 'lucide-react';
import { GlitchText } from './GlitchText';
import type { ScannerStatus } from '@/app/dashboard/scanner/types';

type TelemetryHeaderProps = { status: ScannerStatus; sessionTrigger: number };

export const TelemetryHeader = ({ status, sessionTrigger }: TelemetryHeaderProps) => (
  <header className="flex justify-between items-start mb-8"><div className="space-y-3"><Link href="/dashboard" title="Back to Live Radar" className="pointer-events-auto inline-flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#ccff00] transition-colors"><ArrowLeft size={14} /> Back to Live Radar</Link><h1 className="font-['Space_Grotesk'] text-4xl font-black tracking-tighter text-white flex items-center gap-3"><Crosshair size={32} className="text-[#ccff00]" />OPTICAL<span className="text-gray-600">_NODE</span></h1><p className="font-['JetBrains_Mono'] text-[10px] text-[#ccff00] uppercase tracking-[0.2em]"><GlitchText text="LAT: 22.7196 LON: 75.8577 INDORE, MP, IN" trigger={sessionTrigger} /></p></div><div className="text-right font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-gray-500 space-y-1"><p className="flex items-center justify-end gap-2">SYS_STATUS: <span className={status === 'ANALYZING' ? 'text-orange-400' : 'text-[#ccff00]'}><GlitchText text={status === 'IDLE' ? 'ONLINE' : status} trigger={sessionTrigger} /></span></p><p className="flex items-center justify-end gap-2"><Lock size={10} /> ENCRYPTION: ACTIVE</p><p className="flex items-center justify-end gap-2"><Wifi size={10} /> UPLINK: STABLE</p></div></header>
);

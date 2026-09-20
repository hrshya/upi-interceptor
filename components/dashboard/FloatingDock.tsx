import Link from 'next/link';
import { Activity, RefreshCw, Scan } from 'lucide-react';

type FloatingDockProps = { onRefresh: () => void };

export const FloatingDock = ({ onRefresh }: FloatingDockProps) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
    <div className="flex items-center gap-2 p-2 bg-black/80 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <Link href="/dashboard" title="Live Radar" aria-label="Live Radar" className="p-3 rounded-xl bg-white/10 text-[#ccff00] border border-[#ccff00]/30 transition-colors"><Activity size={20} /></Link>
      <Link href="/dashboard/scanner" title="Edge Scanner" aria-label="Edge Scanner" className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"><Scan size={20} /></Link>
      <div className="w-px h-8 bg-white/10 mx-2" />
      <button type="button" onClick={onRefresh} title="Refresh scans" aria-label="Refresh scans" className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"><RefreshCw size={20} /></button>
    </div>
  </div>
);

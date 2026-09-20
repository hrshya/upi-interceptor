import { BarChart2, Crosshair, ShieldCheck } from 'lucide-react';
import type { DashboardStats } from '@/app/dashboard/types';

type MetricsHudProps = { stats: DashboardStats };

export const MetricsHud = ({ stats }: MetricsHudProps) => (
  <div className="flex gap-4">
    <div className="flex-1 p-4 bg-black/40 border border-white/10 rounded-lg backdrop-blur-md relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-0.5 bg-[#ccff00] opacity-50" /><p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2"><ShieldCheck size={12} className="text-[#ccff00]" /> Verified TXNs</p><p className="font-['Space_Grotesk'] text-3xl font-bold text-white">{stats.verified}</p></div>
    <div className="flex-1 p-4 bg-[#ff003c]/10 border border-[#ff003c]/30 rounded-lg backdrop-blur-md relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-0.5 bg-[#ff003c]" /><p className="text-[10px] text-[#ff003c] uppercase tracking-widest flex items-center gap-2 mb-2"><Crosshair size={12} /> Intercepts</p><p className="font-['Space_Grotesk'] text-3xl font-bold text-[#ff003c]">{stats.flagged}</p></div>
    <div className="flex-1 p-4 bg-black/40 border border-white/10 rounded-lg backdrop-blur-md relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-0.5 bg-gray-500" /><p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2"><BarChart2 size={12} /> Vol (INR)</p><p className="font-['Space_Grotesk'] text-3xl font-bold text-gray-200">₹{stats.totalVolume.toLocaleString()}</p></div>
  </div>
);

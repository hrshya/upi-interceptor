'use client';
import SoundboxListener, { type ChimeDetection } from '@/components/SoundboxListener';

type RightRailProps = { onChimeDetected: (data: ChimeDetection) => void };

export const RightRail = ({ onChimeDetected }: RightRailProps) => (
  <div className="w-full md:w-80 md:h-full flex flex-col gap-6">
    <div className="p-6 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center relative overflow-hidden"><SoundboxListener onChimeDetected={onChimeDetected} /></div>
    <div className="flex-1 p-6 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md flex flex-col"><h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">Terminal Diagnostics</h3><div className="space-y-4 text-[10px] text-gray-400"><div className="flex justify-between"><span>Node ID</span><span className="text-white">MERCH_9921</span></div><div className="flex justify-between"><span>Location</span><span className="text-white">KIOSK_BETA</span></div><div className="flex justify-between"><span>AI Engine</span><span className="text-[#ccff00]">AWS Bedrock Vision</span></div><div className="flex justify-between"><span>Latency</span><span className="text-white">42ms</span></div></div></div>
  </div>
);

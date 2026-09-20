import { Activity, Scan, Terminal } from 'lucide-react';

type SidebarProps = { systemStatus: string };

export const Sidebar = ({ systemStatus }: SidebarProps) => (
  <aside className="w-72 border-r border-white/10 bg-[#0a0a0a] flex flex-col justify-between p-6 z-10 relative">
    <div>
      <div className="mb-12"><h1 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter text-[#ccff00]">UPI.INTERCEPTOR</h1><p className="font-['JetBrains_Mono'] text-[10px] text-gray-500 uppercase mt-1">Merchant Terminal v1.2.0</p></div>
      <nav className="space-y-2 font-['JetBrains_Mono'] text-sm">
        <a href="#" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-white border border-white/10"><Activity size={16} /> Live Radar</a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors"><Scan size={16} /> Edge Scanner</a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors"><Terminal size={16} /> Audit Logs</a>
      </nav>
    </div>
    <div>
      <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md mb-4"><p className="font-['JetBrains_Mono'] text-xs text-gray-400 mb-2 uppercase">System Status</p><div className="flex items-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-[#ccff00]" /></span><span className="font-['JetBrains_Mono'] text-sm text-[#ccff00]">{systemStatus}</span></div><p className="font-['JetBrains_Mono'] text-[10px] text-gray-500 mt-2">wss://gateway.aws.amazon.com</p></div>
      <div className="flex items-center gap-3 p-3 border border-white/10 rounded-lg"><div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs">SK</div><div><p className="text-sm font-medium">Store Kiosk #4</p><p className="text-xs text-gray-500 font-['JetBrains_Mono']">ID: MERCH_9921</p></div></div>
    </div>
  </aside>
);

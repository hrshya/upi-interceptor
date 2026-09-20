import type { ComponentType, ReactNode } from "react";

type TerminalWindowProps = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  borderColor?: string;
};

export const TerminalWindow = ({ title, icon: Icon, children, borderColor = "border-white/10" }: TerminalWindowProps) => (
  <div className={`bg-[#050505]/90 backdrop-blur-3xl border ${borderColor} rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-black relative z-10 transition-colors duration-500`}>
    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff2a2a]" />
        <div className="w-3 h-3 rounded-full bg-[#ffb800]" />
        <div className="w-3 h-3 rounded-full bg-[#00c853]" />
      </div>
      <div className="flex items-center gap-2 mono-font text-xs text-white/40">
        <Icon className="w-4 h-4" />
        {title}
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col h-full">
      {children}
    </div>
  </div>
);
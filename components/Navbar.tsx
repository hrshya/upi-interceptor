



export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 mix-blend-difference p-6 flex justify-between items-center pointer-events-none">
    <div className="text-xl font-bold tracking-tighter text-white">UPI.INTERCEPTOR</div>
    <div className="mono-font text-xs tracking-widest uppercase text-white/50 hidden md:flex items-center gap-2">
      <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse shadow-[0_0_10px_#ccff00]" />
      Edge Network [Active]
    </div>
  </nav>
);
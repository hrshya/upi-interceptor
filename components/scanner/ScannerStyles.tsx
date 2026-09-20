export const ScannerStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Space+Grotesk:wght@300..700&display=swap');
    body { background-color: #020202; margin: 0; overflow: hidden; color: white; font-family: 'Inter', sans-serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .bg-grid { background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); }
    .crt-overlay { background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 2px, 3px 100%; pointer-events: none; z-index: 50; }
    .scanning-laser { animation: scan-vertical 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate; }
    @keyframes scan-vertical { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; box-shadow: 0 0 20px #ccff00, 0 0 40px #ccff00; } 90% { opacity: 1; box-shadow: 0 0 20px #ccff00, 0 0 40px #ccff00; } 100% { top: 100%; opacity: 0; } }
    .hud-bracket { position: absolute; width: 40px; height: 40px; border-color: #ccff00; transition: all 0.3s ease; }
    .hud-wrapper:hover .hud-bracket { width: 60px; height: 60px; }
    .glitch-anim { animation: text-glitch 0.2s linear infinite; }
  `}</style>
);

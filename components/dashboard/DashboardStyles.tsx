export const DashboardStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Space+Grotesk:wght@300..700&display=swap');

    body { background-color: #000000; margin: 0; overflow: hidden; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .bg-grid {
      background-size: 30px 30px;
      background-image: linear-gradient(to right, rgba(204, 255, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(204, 255, 0, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    }
    .crt-overlay {
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 2px, 3px 100%; pointer-events: none; z-index: 50;
    }
    .glitch-anim { animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
    @keyframes glitch-skew { 0% { transform: skew(0deg); } 20% { transform: skew(-10deg); } 40% { transform: skew(10deg); } 60% { transform: skew(-5deg); } 80% { transform: skew(5deg); } 100% { transform: skew(0deg); } }
    .scanning-laser { animation: scan-vertical 3s linear infinite; }
    @keyframes scan-vertical { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
  `}</style>
);

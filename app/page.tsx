"use client";

import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Cpu, Database, Cloud, Fingerprint, VolumeX, Code } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CustomCursor } from '@/components/ui/Cursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { VisionModule, AudioModule } from '@/components/EnvironmentSection';
import { ROICalculator } from '@/components/RoiCalculator';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
    
    :root {
      --neon: #ccff00;
      --alert: #ff2a2a;
      --purple: #7000ff;
      --bg: #030303;
    }

    body {
      background-color: var(--bg);
      color: #ffffff;
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
      cursor: none;
      -webkit-font-smoothing: antialiased;
    }

    .mono-font { font-family: 'JetBrains Mono', monospace; }

    /* Film Grain Overlay */
    .noise {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.08;
      background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
      mix-blend-mode: overlay;
    }

    ::selection {
      background: var(--neon);
      color: #000;
    }

    ::-webkit-scrollbar { width: 0px; }
    
    .text-outline {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
      color: transparent;
    }

    .interactive-element {
      cursor: none;
    }
    
    /* Range Slider Styling */
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background: var(--neon);
      cursor: none;
      margin-top: -10px;
      box-shadow: 0 0 20px rgba(204, 255, 0, 0.5);
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: none;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }
  `}} />
);



export default function App() {
  return (
    <div className="relative min-h-screen">
      <GlobalStyles />
      <div className="noise" />
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <TheThreat />
        
        <section id="sandbox" className="py-32 px-6 md:px-12 lg:px-24 relative max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter uppercase mb-4">The Engine</h2>
              <p className="mono-font text-[#ccff00] tracking-widest text-sm border border-[#ccff00]/20 px-4 py-1.5 rounded-full inline-block bg-[#ccff00]/5">
                Interactive Threat Environment
              </p>
            </div>
            <p className="text-white/50 text-right max-w-sm hidden md:block">
              Simulate fraud payloads against the live Bedrock API sandbox below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <VisionModule />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <AudioModule />
            </motion.div>
          </div>
        </section>

        <Blueprint />
        <ROICalculator />
      </main>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-white/5 bg-[#000]">
        <p className="mono-font text-[10px] md:text-xs text-white/30 uppercase tracking-widest mb-4">
          © {new Date().getFullYear()} UPI INTERCEPTOR. AWS SERVERLESS POC.
        </p>
        <div className="flex justify-center gap-4 text-white/20">
          <span className="hover:text-white transition-colors cursor-none interactive-element">Privacy</span>
          <span>|</span>
          <span className="hover:text-white transition-colors cursor-none interactive-element">Terms</span>
          <span>|</span>
          <span className="hover:text-[#ccff00] transition-colors cursor-none interactive-element">Architecture Docs</span>
        </div>
      </footer>
    </div>
  );
}



const TheThreat = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:w-1/3"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">THE<br/>THREAT<br/>VECTOR</h2>
            <p className="text-white/50 text-lg mb-8">
              Merchants lose millions to sophisticated spoofing. Traditional validation is too slow.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-[#ff2a2a]/50 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <Fingerprint className="w-24 h-24 text-[#ff2a2a]" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff2a2a]/10 flex items-center justify-center mb-6">
                <Fingerprint className="text-[#ff2a2a]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Synthetic Screenshots</h3>
              <p className="text-white/40 mono-font text-sm">
                Generative AI and modded apps create pixel-perfect fake payment confirmations with spoofed UTR numbers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-[#ff2a2a]/50 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <VolumeX className="w-24 h-24 text-[#ff2a2a]" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff2a2a]/10 flex items-center justify-center mb-6">
                <VolumeX className="text-[#ff2a2a]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Acoustic Spoofing</h3>
              <p className="text-white/40 mono-font text-sm">
                Pre-recorded confirmation chimes injected via Bluetooth speakers deceive merchants without visual checks.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


type BlueprintNodeProps = {
  title: string;
  sub: string;
  delay: number;
  icon: LucideIcon;
  isAlert?: boolean;
  isDatabase?: boolean;
};

const BlueprintNode = ({ title, sub, delay, icon: Icon, isAlert, isDatabase }: BlueprintNodeProps) => {
  let bgColor = "bg-white/[0.02]";
  let borderColor = "border-white/10";
  let iconColor = "text-white";
  let iconBg = "bg-white/10";

  if (isAlert) {
    bgColor = "bg-[#ff2a2a]/5"; borderColor = "border-[#ff2a2a]/30"; 
    iconColor = "text-[#ff2a2a]"; iconBg = "bg-[#ff2a2a]/20";
  } else if (isDatabase) {
    bgColor = "bg-[#7000ff]/5"; borderColor = "border-[#7000ff]/30"; 
    iconColor = "text-[#7000ff]"; iconBg = "bg-[#7000ff]/20";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay }}
      className={`relative p-6 rounded-3xl border backdrop-blur-xl flex flex-col gap-3 z-10 shadow-2xl ${bgColor} ${borderColor}`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${iconBg} ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`mono-font text-sm font-bold tracking-wider ${iconColor}`}>{title}</div>
      <div className="text-sm text-white/50 font-light">{sub}</div>
    </motion.div>
  );
};

const Blueprint = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 relative bg-[#050505] overflow-hidden">
    
    <div className="max-w-[1600px] mx-auto mb-24 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">System Architecture</h2>
        <div className="inline-flex items-center gap-3 mono-font text-white/40 uppercase tracking-widest text-xs md:text-sm border border-white/10 rounded-full px-6 py-3 bg-white/[0.02]">
          <Code className="w-4 h-4" />
          <span>Ref: <span className="text-[#ccff00]">upi_interceptor_user_flow.svg</span></span>
        </div>
      </motion.div>
    </div>

    <div className="max-w-[1400px] mx-auto relative z-10">
      {/* Animated Connection Lines */}
      <div className="hidden lg:block absolute top-[110px] left-[10%] right-[10%] h-[2px] bg-white/5 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent w-1/3"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
        <BlueprintNode delay={0} icon={Activity} title="Next.js Client" sub="Merchant web app captures visual/audio input." />
        <BlueprintNode delay={0.15} icon={Cloud} title="Amazon API GW" sub="Ingests payloads, triggers serverless pipeline." />
        <BlueprintNode delay={0.3} icon={Cpu} title="AWS Lambda" sub="Core engine. Invokes Bedrock for multimodal AI." />
        <BlueprintNode delay={0.45} icon={Database} title="DynamoDB" sub="Persists fraud records and anomaly metrics." isDatabase />
        <BlueprintNode delay={0.6} icon={ShieldAlert} title="EventBridge" sub="Publishes alert topics for fraudulent TX." isAlert />
      </div>
    </div>
  </section>
);


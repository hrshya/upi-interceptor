"use client";

import { useEffect, useState } from "react";
import { TerminalWindow } from "./ui/Terminal";
import { CheckCircle2, Mic, Scan, ShieldAlert } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";



export const VisionModule = () => {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const runTest = () => {
    if (status !== 'idle') return;
    setStatus('scanning');
    setLogs(["> INITIALIZING BEDROCK VISION API..."]);
    
    setTimeout(() => setLogs(p => [...p, "> MODEL: anthropic.claude-3-5-sonnet-20241022-v2:0"]), 400);
    setTimeout(() => setLogs(p => [...p, "> ANALYZING UTR PIXEL DENSITY & KERNING..."]), 1200);
    setTimeout(() => {
      setLogs(p => [...p, "> <span class='text-[#ff2a2a] font-bold'>[ALERT]</span> MANIPULATION DETECTED AT [x:145, y:220]"]);
      setStatus('result');
    }, 2800);
  };

  const reset = () => {
    setStatus('idle');
    setLogs([]);
  };

  return (
    <TerminalWindow title="claude_vision.js" icon={Scan} borderColor={status === 'result' ? 'border-[#ff2a2a]/50' : 'border-white/10'}>
      <div className="relative w-full h-[280px] bg-[#0a0a0a] border border-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center group interactive-element">
        
        {/* Fake Receipt Asset */}
        <div className={`absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 transition-opacity duration-700 ${status === 'scanning' ? 'opacity-30' : 'opacity-100'}`}>
           <div className="w-40 h-56 bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col gap-3 shadow-xl">
              <div className="w-full h-8 flex justify-between items-center border-b border-zinc-800 pb-2">
                 <div className="w-1/2 h-2 bg-zinc-700 rounded-sm" />
                 <div className="w-6 h-6 rounded-full bg-zinc-700" />
              </div>
              <div className="w-3/4 h-2 bg-zinc-700 rounded-sm mt-2" />
              <div className="w-1/2 h-2 bg-zinc-700 rounded-sm" />
              <div className="w-full h-16 bg-[#ff2a2a]/5 border border-[#ff2a2a]/20 rounded mt-auto flex items-center justify-center relative overflow-hidden">
                <span className="text-[#ff2a2a] text-[10px] mono-font opacity-40 z-10 font-bold">MODDED APK GENERATED</span>
              </div>
           </div>
        </div>

        {/* CSS Scanning Beam */}
        {status === 'scanning' && (
          <motion.div 
            initial={{ top: "-10%" }} animate={{ top: "110%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[4px] bg-[#ccff00] shadow-[0_0_30px_#ccff00] z-20" 
          />
        )}
        
        {/* State Overlays */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <AnimatePresence>
            {status === 'idle' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onClick={runTest}
                className="pointer-events-auto px-8 py-4 bg-[#ccff00] text-black font-bold mono-font text-sm rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)] interactive-element"
              >
                EXECUTE PAYLOAD
              </motion.button>
            )}
            {status === 'result' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 bg-black/60 p-6 rounded-2xl backdrop-blur-md border border-[#ff2a2a]/20"
              >
                <div className="w-20 h-20 rounded-full bg-[#ff2a2a]/20 flex items-center justify-center border border-[#ff2a2a]/50">
                  <ShieldAlert className="text-[#ff2a2a] w-10 h-10" />
                </div>
                <button onClick={reset} className="pointer-events-auto text-xs mono-font text-white/50 hover:text-white underline tracking-widest interactive-element">RESET_ENV</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Embedded Terminal Logs */}
      <div className="flex-1 bg-[#020202] border border-white/5 rounded-2xl p-5 mono-font text-xs text-white/60 overflow-y-auto shadow-inner min-h-[160px]">
        <div className="flex flex-col gap-2">
          <span className="text-[#ccff00]">$ node analyze_vision.js</span>
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} dangerouslySetInnerHTML={{ __html: log }} />
          ))}
          {status === 'scanning' && <span className="animate-pulse">_</span>}
          {status === 'result' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[#ff2a2a] p-3 bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 rounded-lg">
              {`{`} <br/>
              &nbsp;&nbsp;"authentic": false,<br/>
              &nbsp;&nbsp;"confidence": 0.985,<br/>
              &nbsp;&nbsp;"flags": ["time_mismatch", "pixel_artifact"]<br/>
              {`}`}
            </motion.div>
          )}
        </div>
      </div>
    </TerminalWindow>
  );
};

export const AudioModule = () => {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [bars, setBars] = useState(Array(24).fill(15));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'listening') {
      interval = setInterval(() => {
        setBars(Array.from({ length: 24 }, () => Math.random() * 80 + 10));
      }, 60);
    } else if (status === 'result') {
       // Target specific frequency pattern
       const pattern = Array(24).fill(15);
       pattern[8] = 70; pattern[9] = 95; pattern[10] = 85; pattern[11] = 60; // Peak
       setBars(pattern);
    } else {
      setBars(Array(24).fill(10));
    }
    return () => clearInterval(interval);
  }, [status]);

  const runTest = () => {
    if (status !== 'idle') return;
    setStatus('listening');
    setLogs(["> REQUESTING MICROPHONE ACCESS..."]);
    
    setTimeout(() => setLogs(p => [...p, "> CAPTURING ENVIRONMENTAL AUDIO STREAM..."]), 800);
    setTimeout(() => setLogs(p => [...p, "> PERFORMING FFT ANALYSIS [SIZE: 1024]..."]), 1600);
    setTimeout(() => {
      setLogs(p => [...p, "> <span class='text-[#ccff00] font-bold'>[VERIFIED]</span> ACOUSTIC FINGERPRINT MATCHED."]);
      setStatus('result');
    }, 3200);
  };

  const reset = () => {
    setStatus('idle');
    setLogs([]);
  };

  return (
    <TerminalWindow title="fft_interceptor.js" icon={Mic} borderColor={status === 'result' ? 'border-[#ccff00]/50' : 'border-white/10'}>
      <div className="relative w-full h-[280px] bg-[#0a0a0a] border border-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-8 interactive-element">
        
        {/* FFT Visualizer Bars */}
        <div className="flex items-end justify-between w-full h-40 gap-1 opacity-90">
          {bars.map((height, i) => (
            <motion.div 
              key={i} 
              layout
              className={`w-full rounded-t-sm transition-all duration-300 ${status === 'result' && height > 50 ? 'bg-[#ccff00] shadow-[0_0_20px_#ccff00]' : 'bg-white/20'}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* State Overlays */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <AnimatePresence>
            {status === 'idle' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onClick={runTest}
                className="pointer-events-auto px-8 py-4 border border-white text-white font-bold mono-font text-sm rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-sm interactive-element"
              >
                LISTEN TO CHIME
              </motion.button>
            )}
            {status === 'result' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 bg-black/60 p-6 rounded-2xl backdrop-blur-md border border-[#ccff00]/20"
              >
                 <div className="w-20 h-20 rounded-full bg-[#ccff00]/20 flex items-center justify-center border border-[#ccff00]/50">
                  <CheckCircle2 className="text-[#ccff00] w-10 h-10" />
                </div>
                <button onClick={reset} className="pointer-events-auto text-xs mono-font text-white/50 hover:text-white underline tracking-widest interactive-element">RESET_ENV</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Embedded Terminal Logs */}
      <div className="flex-1 bg-[#020202] border border-white/5 rounded-2xl p-5 mono-font text-xs text-white/60 overflow-y-auto shadow-inner min-h-[160px]">
        <div className="flex flex-col gap-2">
          <span className="text-[#ccff00]">$ python3 listen_stream.py</span>
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} dangerouslySetInnerHTML={{ __html: log }} />
          ))}
          {status === 'listening' && <span className="animate-pulse">_</span>}
          {status === 'result' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[#ccff00] p-3 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-lg">
              {`{`} <br/>
              &nbsp;&nbsp;"source": "PAYTM_HW_V2",<br/>
              &nbsp;&nbsp;"synthetic": false,<br/>
              &nbsp;&nbsp;"target_freq_hz": 1850<br/>
              {`}`}
            </motion.div>
          )}
        </div>
      </div>
    </TerminalWindow>
  );
};
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export const ROICalculator = () => {
  const [txPerDay, setTxPerDay] = useState(500);
  const hardwareCostPerMonth = 125; // INR per hardware box
  const merchants = 1000; // Example base
  
  // Fake AWS calculation: ~0.008 INR per invocation
  const txPerMonth = txPerDay * 30;
  const serverlessCost = Math.round((txPerMonth * 0.008) * (merchants / 100)); // scaling factor for demo
  const totalHardwareCost = hardwareCostPerMonth * merchants;
  const savings = totalHardwareCost - serverlessCost;
  const savingsPercent = Math.round((savings / totalHardwareCost) * 100);

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 relative border-t border-white/5 overflow-hidden">
      
      {/* Background glow for ROI section */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#7000ff]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="lg:w-1/2 z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">Serverless ROI</h2>
            <p className="text-white/60 text-lg mb-10 font-light leading-relaxed">
              Ditch expensive, easily-spoofed physical soundboxes. Scale infinitely with AWS Lambda & Bedrock at a fraction of the cost per merchant.
            </p>
            
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="mono-font text-xs text-[#ccff00] mb-2 uppercase">Input Load Variable</div>
                  <div className="text-2xl font-bold">Daily Transactions</div>
                </div>
                <div className="mono-font text-2xl text-white">{txPerDay.toLocaleString()} <span className="text-sm text-white/40">/ day</span></div>
              </div>
              
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50"
                value={txPerDay} 
                onChange={(e) => setTxPerDay(Number(e.target.value))}
                className="interactive-element w-full accent-[#ccff00]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-4 mono-font">
                <span>50</span>
                <span>5000+</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 w-full z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Traditional Cost */}
            <div className="bg-[#050505] border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[240px]">
              <div className="mono-font text-xs text-white/50 uppercase">Hardware Boxes<br/>(1,000 Merchants)</div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">₹{totalHardwareCost.toLocaleString()}</div>
                <div className="text-sm text-white/40">/ month static rental</div>
              </div>
            </div>

            {/* Serverless Cost */}
            <div className="bg-[#ccff00]/10 border border-[#ccff00]/30 p-8 rounded-3xl flex flex-col justify-between min-h-[240px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/20 rounded-full blur-3xl" />
              <div className="mono-font text-xs text-[#ccff00] uppercase relative z-10">AWS Serverless<br/>(AI Firewall API)</div>
              <div className="relative z-10">
                <div className="text-5xl font-bold text-[#ccff00] mb-2">₹{serverlessCost.toLocaleString()}</div>
                <div className="text-sm text-[#ccff00]/60">/ month pure usage</div>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="md:col-span-2 bg-[#7000ff] text-white p-8 rounded-3xl flex items-center justify-between">
              <div>
                <div className="mono-font text-xs text-white/70 uppercase mb-2">Cost Reduction</div>
                <div className="text-4xl md:text-5xl font-bold">{savingsPercent}% Savings</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <ArrowRight className="w-8 h-8 -rotate-45" />
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
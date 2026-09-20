"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WobbleCard } from "../components/ui/WobbleCard";


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
        
        <div className="lg:w-1/2 z-10 flex justify-between">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">Serverless ROI</h2>
            <p className="text-white/60 text-lg mb-10 font-light leading-relaxed">
              Ditch expensive, easily-spoofed physical soundboxes. Scale infinitely with AWS Lambda & Bedrock at a fraction of the cost per merchant.
            </p>
            
            <WobbleCard
              containerClassName="rounded-3xl border border-[#f2b0d2]/40 bg-[#b85d87]"
              className="rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_25%),linear-gradient(135deg,#d97bb0,#a74c77)]"
            >
              <div className="flex h-full flex-col justify-between py-6 px-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mono-font mb-2 text-xs uppercase tracking-[0.18em] text-[#ccff00]">Input Load Variable</div>
                    <div className="text-2xl font-bold">Daily Transactions</div>
                  </div>
                  <div className="mono-font text-left text-2xl text-white sm:text-right">
                    {txPerDay.toLocaleString()} <span className="text-sm text-white/40">/ day</span>
                  </div>
                </div>

                <div className="mt-8 z-0">
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={txPerDay}
                    onChange={(e) => setTxPerDay(Number(e.target.value))}
                    className="interactive-element w-full accent-[#ccff00]"
                  />
                  <div className="mono-font mt-4 flex justify-between text-xs text-white/40">
                    <span>50</span>
                    <span>5000+</span>
                  </div>
                </div>
              </div>
            </WobbleCard>
          </motion.div>
        </div>

        <div className="lg:w-1/2 w-full z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:auto-rows-fr"
          >
            <WobbleCard
              containerClassName="rounded-3xl border border-[#9ab4ff]/45 bg-[#4d6de1]"
              className="min-h-[240px] rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,#7ca0ff,#4a67c6)]"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="mono-font text-xs uppercase text-white/50">Hardware Boxes<br/>(1,000 Merchants)</div>
                <div>
                  <div className="mb-2 text-5xl font-bold text-white">₹{totalHardwareCost.toLocaleString()}</div>
                  <div className="text-sm text-white/40">/ month static rental</div>
                </div>
              </div>
            </WobbleCard>

            <WobbleCard
              containerClassName="rounded-3xl border border-[#dfe98b]/55 bg-[#7d8b2d]"
              className="min-h-[240px] rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_26%),linear-gradient(135deg,#b8ca4a,#768a2b)]"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="mono-font relative z-10 text-xs uppercase text-[#ccff00]">AWS Serverless<br/>(AI Firewall API)</div>
                <div className="relative z-10">
                  <div className="mb-2 text-5xl font-bold text-[#ccff00]">₹{serverlessCost.toLocaleString()}</div>
                  <div className="text-sm text-[#ccff00]/60">/ month pure usage</div>
                </div>
              </div>
            </WobbleCard>

            <WobbleCard
              containerClassName="md:col-span-2 h-[220px] rounded-3xl border border-[#b3a4ff]/45 bg-[#5d4fc7]"
              className="h-full rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,#7d69ec,#4a3cab)]"
            >
              <div className="flex h-full items-center justify-between gap-4 px-2">
                <div className="flex-1 text-center md:text-left">
                  <div className="mono-font mb-2 text-xs uppercase tracking-[0.18em] text-white/70">Cost Reduction</div>
                  <div className="text-4xl font-bold leading-none md:text-5xl">{savingsPercent}% Savings</div>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <ArrowRight className="h-8 w-8 -rotate-45" />
                </div>
              </div>
            </WobbleCard>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
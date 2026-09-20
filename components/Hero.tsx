"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect } from "react";
import { MagneticButton } from "./ui/MagenticButton";
import { StaggeredText } from "./ui/StaggeredText";




export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [mouseX, mouseY]);

  const scrollToDemo = () => {
    document?.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden pt-20">
      
      {/* Ambient Mouse Tracking Glow */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #7000ff 0%, #030303 70%)',
          x: useTransform(mouseX, v => v - 400),
          y: useTransform(mouseY, v => v - 400),
        }}
      />
      
      <div className="z-10 w-full max-w-[1600px] mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="mono-font text-[#ccff00] mb-8 text-xs md:text-sm border border-[#ccff00]/30 rounded-full px-4 py-2 inline-flex items-center gap-3 bg-[#ccff00]/5 backdrop-blur-md"
        >
          <Zap className="w-4 h-4 text-[#ccff00]" />
          AWS SERVERLESS FRAUD ENGINE
        </motion.div>
        
        <h1 className="text-[14vw] lg:text-[11vw] font-bold leading-[0.8] tracking-tighter mb-10 uppercase flex flex-col -ml-[1vw]">
          <StaggeredText text="KILL" />
          <span className="text-outline">
            <StaggeredText text="FAKE" delay={0.2} />
          </span>
          <StaggeredText text="PAYMENTS" delay={0.4} />
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-16 border-t border-white/10 pt-8">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/60 text-lg md:text-2xl max-w-2xl font-light leading-relaxed"
          >
            A high-performance AI firewall. Inspecting transaction pixels and acoustic soundbox frequency spectrums at the edge using Amazon Bedrock.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}>
            <MagneticButton onClick={scrollToDemo} className="px-10 py-5 font-bold text-lg">
              Deploy Sandbox <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
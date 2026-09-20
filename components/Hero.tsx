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
    <section className="relative min-h-[100svh] overflow-hidden pt-20 pb-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg')" }}
      />

      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #7000ff 0%, #030303 70%)',
          x: useTransform(mouseX, v => v - 400),
          y: useTransform(mouseY, v => v - 400),
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1600px] flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="mono-font mb-8 inline-flex items-center gap-3 self-start rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 px-4 py-2 text-xs text-[#ccff00] backdrop-blur-md md:text-sm"
        >
          <Zap className="w-4 h-4 text-[#ccff00]" />
          AWS SERVERLESS FRAUD ENGINE
        </motion.div>

        <h1 className="mb-4 flex w-full max-w-[1200px] flex-col text-[14vw] font-bold uppercase leading-[0.78] tracking-[-0.06em] lg:text-[11vw]">
          <StaggeredText text="KILL" />
          <span className="text">
            <StaggeredText text="FAKE" delay={0.2} />
          </span>
          <span className="text">
            <StaggeredText text="PAYMENTS" delay={0.4} />
          </span>
        </h1>

        <div className="mt-4 flex w-full flex-col justify-between gap-8 border-t border-white/10 pt-4 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl text-lg font-light leading-relaxed text-white/60 md:text-2xl"
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
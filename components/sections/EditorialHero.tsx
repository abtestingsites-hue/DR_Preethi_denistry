"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export const EditorialHero: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Reveal triggers on:
    // 1. Mouse movement anywhere over the page
    // 2. Touch screen tap or touch movement on mobile
    // 3. Wheel or keyboard scroll
    const handleTrigger = () => {
      setIsRevealed(true);
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsRevealed(true);
      }
    };

    window.addEventListener("mousemove", handleTrigger, { once: true, passive: true });
    window.addEventListener("touchstart", handleTrigger, { once: true, passive: true });
    window.addEventListener("pointerdown", handleTrigger, { once: true, passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleTrigger);
      window.removeEventListener("touchstart", handleTrigger);
      window.removeEventListener("pointerdown", handleTrigger);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const triggerReveal = () => {
    setIsRevealed(true);
  };

  return (
    <section 
      onClick={triggerReveal}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#29291F] pt-24 pb-16 cursor-default select-none"
    >
      
      {/* Background authentic clinic interior with preserved original photograph and framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.02]"
        />
        {/* Soft atmospheric gradient to maintain high legibility for text while preserving wall branding */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#29291F]/30 to-[#29291F]/70" />
        <div className="absolute inset-0 bg-[#29291F]/20 backdrop-blur-[0.3px]" />
      </div>

      {/* Prompt cue before interaction: Minimalist architectural bouncing down arrow centered on lower third */}
      {!isRevealed && (
        <button
          onClick={triggerReveal}
          aria-label="Explore clinic"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center w-11 h-11 rounded-full bg-[#7B8052]/90 hover:bg-[#7B8052] text-white border border-white/30 backdrop-blur-sm transition-all animate-bounce cursor-pointer shadow-float group"
        >
          <ChevronDown className="w-5 h-5 text-[#FAF8F2] group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Grid Container: Shifted to balanced Right-Side Composition (Golden Ratio 60% right focal zone) */}
      <div className="relative z-10 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 flex justify-end">
        
        {/* Content Box: Occupies the right focal third without obscuring the left Invisalign wall branding */}
        <div
          className={`w-full md:w-[60%] lg:w-[52%] xl:w-[48%] space-y-6 text-left transition-all duration-700 ease-out ${
            isRevealed
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-95 pointer-events-none"
          }`}
        >
          
          {/* Eyebrow Label with Architectural Lines matching Reference Layout */}
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-12 h-[1.5px] bg-[#FAF8F2]/70" />
            <span className="text-[11px] sm:text-[12px] uppercase font-bold tracking-[0.22em] text-[#FAF8F2]/90 drop-shadow-sm font-sans">
              DR. PREETHI'S DENTISTRY
            </span>
            <div className="w-8 sm:w-12 h-[1.5px] bg-[#FAF8F2]/70" />
          </div>

          {/* Primary Golden Scale Headline (37px - 56px responsive scale) */}
          <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[54px] font-serif font-bold text-white leading-[1.08] tracking-tight drop-shadow-lg">
            Care Designed{" "}
            <span className="font-serif italic font-normal text-[#E2E8B8] block sm:inline">
              Around Your Smile
            </span>
          </h1>

          {/* Supporting Text at Golden Scale (20px - 23px) */}
          <p className="text-[17px] sm:text-[20px] lg:text-[23px] text-[#FAF8F2]/90 font-light leading-relaxed drop-shadow-md max-w-xl">
            Advanced Orthodontic &amp; Invisalign® Care in a Comfortable, Personalized Environment.
          </p>

          {/* Architectural divider line */}
          <div className="w-full max-w-md h-[1.5px] bg-[#A5A786]/50 pt-0.5" />

          {/* Action Buttons: Golden Scale Proportioned, Ergonomic Sizing */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link
              href="/booking"
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#7B8052] text-white font-semibold text-[12px] sm:text-[13px] uppercase tracking-[0.08em] hover:bg-[#555B38] transition-all shadow-card hover:shadow-elevated hover:scale-105 flex items-center gap-2 border border-white/20"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
            
            <a
              href="#treatments"
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#FAF8F2] text-[#29291F] font-semibold text-[12px] sm:text-[13px] uppercase tracking-[0.08em] hover:bg-white transition-all border border-[#A5A786]/50 shadow-card hover:shadow-elevated"
            >
              Explore Treatments
            </a>
          </div>

        </div>

      </div>

      {/* Clean blended base transition */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/20 z-20 pointer-events-none" />
    </section>
  );
};

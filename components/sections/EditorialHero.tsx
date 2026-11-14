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
      } else if (window.scrollY === 0) {
        // Return to clean pristine state when at very top
        // Optional: keeps it visible once touched or resets on top
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
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#29291F] pt-20 pb-16 cursor-default select-none"
    >
      
      {/* Background authentic clinic interior with balanced architectural framing (Center-anchored) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.06]"
        />
        {/* Architectural Vignette */}
        <div className="absolute inset-0 bg-[#29291F]/45 backdrop-blur-[0.5px]" />
      </div>

      {/* Prompt cue before interaction: Minimalist architectural bouncing down arrow centered on lower third line */}
      {!isRevealed && (
        <button
          onClick={triggerReveal}
          aria-label="Explore clinic"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-[#7B8052]/90 hover:bg-[#7B8052] text-white border border-white/30 backdrop-blur-sm transition-all animate-bounce cursor-pointer shadow-float group"
        >
          <ChevronDown className="w-6 h-6 text-[#FAF8F2] group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Center Hero Content: Strictly aligned to Golden Ratio vertical center (5/8 of viewport height) */}
      <div
        className={`relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center text-white space-y-4 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
          isRevealed
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-6 pointer-events-none"
        }`}
      >
        
        {/* The Medium Studio Style:
            Step 1: First writes the outline of the letters stroke by stroke
            Step 2: Then pencil crosshatch shading sketches inside the letters
            Stays as the authentic pencil sketch look with architectural drafting lines
        */}
        <div className="relative py-2 max-w-5xl mx-auto flex flex-col items-center justify-center">
          
          <div className="w-full flex justify-center">
            <svg
              viewBox="0 0 1100 160"
              className="w-full max-w-[950px] h-auto overflow-visible select-none"
              aria-label="DR. PREETHI'S DENTISTRY"
            >
              <defs>
                {/* Authentic Fine Pencil Shading Pattern */}
                <pattern
                  id="pencilShadePattern"
                  width="8"
                  height="8"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    opacity="0.88"
                  />
                  <line
                    x1="4"
                    y1="0"
                    x2="4"
                    y2="8"
                    stroke="#FAF8F2"
                    strokeWidth="0.8"
                    opacity="0.45"
                  />
                </pattern>

                {/* Charcoal Shadow */}
                <filter id="pencilSketchShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.7"/>
                </filter>
              </defs>

              {/* Architectural drafting guidelines matching The Medium studio UI */}
              <line
                x1="80"
                y1="30"
                x2="1020"
                y2="30"
                stroke="#FAF8F2"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.4"
              />
              <line
                x1="80"
                y1="130"
                x2="1020"
                y2="130"
                stroke="#FAF8F2"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.4"
              />

              {/* Step 2: Pencil Crosshatch Shading Fills In */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className={`font-serif font-bold text-[62px] sm:text-[78px] md:text-[88px] tracking-[0.14em] fill-[url(#pencilShadePattern)] pointer-events-none ${
                  isRevealed ? "animate-pencil-shading" : "opacity-0"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  filter: "url(#pencilSketchShadow)",
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>

              {/* Step 1: First writes the outline stroke by stroke */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className={`font-serif font-bold text-[62px] sm:text-[78px] md:text-[88px] tracking-[0.14em] fill-transparent stroke-white pointer-events-none ${
                  isRevealed ? "animate-draw-outline" : "opacity-0"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  strokeWidth: "2.2px",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  filter: "url(#pencilSketchShadow)",
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>
            </svg>
          </div>

          {/* Requested Tagline: CARE DESIGNED AROUND YOUR SMILE */}
          <div className="mt-1 mb-1">
            <span className="text-sm sm:text-base md:text-lg font-serif italic tracking-[0.25em] uppercase text-[#FAF8F2] font-bold drop-shadow-md">
              CARE DESIGNED AROUND YOUR SMILE
            </span>
          </div>

          {/* Elegant Olive divider line */}
          <div className="w-full max-w-xs h-[1.5px] bg-[#A5A786] my-1" />
        </div>

        {/* Action Buttons in Olive & Soft Cream with Balanced Proportions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/booking"
            className="px-7 py-3 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#555B38] transition-all shadow-card hover:shadow-elevated hover:scale-105 flex items-center gap-2.5 border border-white/20"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
          <a
            href="#treatments"
            className="px-7 py-3 rounded-full bg-[#FAF8F2]/95 text-[#29291F] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all border border-[#A5A786]/50 shadow-card hover:shadow-elevated"
          >
            Explore Treatments
          </a>
        </div>

      </div>

      {/* Clean blended base transition */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/20 z-20 pointer-events-none" />
    </section>
  );
};

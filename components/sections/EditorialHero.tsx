"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F5F0E6] pt-28 pb-20">
      
      {/* Background authentic clinic interior with Warm Cream & Olive color grade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.04]"
        />
        {/* Warm Overlay in Warm Charcoal tones */}
        <div className="absolute inset-0 bg-[#29291F]/50 backdrop-blur-[1px]" />
      </div>

      {/* Center Studio Content */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 text-center text-white space-y-6">
        
        {/* Small subtitle tag */}
        <div className="inline-block">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#FAF8F2] font-semibold bg-[#7B8052]/85 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            WELCOME TO OUR CLINIC
          </p>
        </div>

        {/* Dynamic Studio Headline: Writing -> Pencil Hatching Shading -> Smooth Realistic Solid Final Render */}
        <div className="relative py-2 max-w-5xl mx-auto flex flex-col items-center justify-center">
          
          <div className="w-full flex justify-center">
            <svg
              viewBox="0 0 1100 180"
              className="w-full max-w-[1050px] h-auto overflow-visible select-none"
              aria-label="DR. PREETHI'S DENTISTRY"
            >
              <defs>
                {/* Pencil Sketch / Shading Diagonal Hatch Pattern */}
                <pattern
                  id="pencilHatchPattern"
                  width="10"
                  height="10"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="10"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    opacity="0.9"
                  />
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="10"
                    stroke="#FAF8F2"
                    strokeWidth="1.0"
                    opacity="0.5"
                  />
                </pattern>

                {/* Subtle Charcoal Glow & Depth */}
                <filter id="studioTitleShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.75"/>
                </filter>
              </defs>

              {/* Architectural drafting guidelines matching The Medium studio UI */}
              <line
                x1="80"
                y1="35"
                x2="1020"
                y2="35"
                stroke="#FAF8F2"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.35"
              />
              <line
                x1="80"
                y1="135"
                x2="1020"
                y2="135"
                stroke="#FAF8F2"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.35"
              />

              {/* Layer 1: Pencil Hatching Texture Layer (Fills across during stage 2) */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-black text-[68px] sm:text-[88px] md:text-[98px] tracking-[0.1em] fill-[url(#pencilHatchPattern)] animate-pencil-hatch pointer-events-none"
                style={{
                  fontFamily: "'Montserrat', 'Special Elite', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  filter: "url(#studioTitleShadow)",
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>

              {/* Layer 2: Animated Drawing Pencil Outline Stroke (Draws stroke by stroke) */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-black text-[68px] sm:text-[88px] md:text-[98px] tracking-[0.1em] fill-transparent stroke-white animate-pencil-outline pointer-events-none"
                style={{
                  fontFamily: "'Montserrat', 'Special Elite', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  strokeWidth: "2.4px",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  filter: "url(#studioTitleShadow)",
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>

              {/* Layer 3: Realistic Solid Smoothened Typography Layer (Fades in seamlessly after shading) */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-black text-[68px] sm:text-[88px] md:text-[98px] tracking-[0.1em] fill-white stroke-white/20 animate-smooth-solid"
                style={{
                  fontFamily: "'Montserrat', 'Special Elite', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  strokeWidth: "0.5px",
                  filter: "url(#studioTitleShadow)",
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>
            </svg>
          </div>

          {/* Requested Tagline: CARE DESIGNED AROUND YOUR SMILE */}
          <div className="mt-2 mb-2">
            <span className="text-base sm:text-lg md:text-xl font-serif italic tracking-[0.25em] uppercase text-[#FAF8F2] font-bold drop-shadow-lg">
              CARE DESIGNED AROUND YOUR SMILE
            </span>
          </div>

          {/* Elegant Olive divider line */}
          <div className="w-full max-w-sm h-[2px] bg-[#A5A786] my-2" />
        </div>

        {/* Action Buttons in Olive & Soft Cream */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/booking"
            className="px-8 py-3.5 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#555B38] transition-all shadow-float hover:scale-105 flex items-center gap-3 border border-white/20"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
          <a
            href="#treatments"
            className="px-8 py-3.5 rounded-full bg-[#FAF8F2]/90 text-[#29291F] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all border border-[#A5A786]/50 shadow-sm"
          >
            Explore Treatments
          </a>
        </div>

      </div>

      {/* Torn Edge Bottom Divider into the Olive Care Banner */}
      <div className="absolute bottom-0 inset-x-0 h-5 bg-[#7B8052] torn-edge-top z-20 pointer-events-none" />
    </section>
  );
};

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  Sparkles, 
  Feather, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

export const NeedleFreeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jet" | "digital" | "topical">("jet");

  const technologies = [
    {
      id: "jet",
      name: "High-Velocity Jet Injectors",
      tagline: "Needle-Free Micro-Stream Anesthesia",
      description: "Utilises calibrated high-pressure fluid micro-jets to disperse local anesthetic uniformly across oral tissue in milliseconds—completely eliminating the mechanical prick of conventional hypodermic needles.",
      benefits: ["Instant absorption (< 100ms)", "Zero needle sight or fear", "Even distribution across target site"],
      icon: Zap,
    },
    {
      id: "digital",
      name: "Computer-Controlled Digital Delivery",
      tagline: "Sub-Sensory Flow Rate Regulation",
      description: "Automated microprocessor regulates anesthetic volume and delivery pressure below the patient's pain threshold, ensuring painless tissue infiltration during restorative and aesthetic procedures.",
      benefits: ["Pain-free pressure sensing", "Minimal collateral numbness", "Ideal for sensitive tissue"],
      icon: Sparkles,
    },
    {
      id: "topical",
      name: "Advanced Pre-Contact Topicals",
      tagline: "Profound Mucosal Desensitisation",
      description: "Pharmaceutical-grade topical anesthetic creams pre-condition and numb mucosal nerve endings prior to treatment, ensuring serene, calm appointments for children, teens, and anxious adults.",
      benefits: ["Rapid 60-second onset", "Pleasant non-metallic taste", "Zero tissue trauma"],
      icon: Feather,
    },
  ];

  return (
    <section id="needle-free" className="relative bg-[#FAF8F2]">
      
      {/* Top Olive Ribbon Banner matching other sections */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90">
              <span className="bg-[#555B38] px-3 py-1 rounded-full border border-white/20">
                CLINIC SPECIALITY INNOVATION
              </span>
              <span>·</span>
              <span className="text-white/95">OUR EXPERTISE</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-white/90">100% Injection Fear-Free</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-[#FAF8F2]/80">Saibaba Colony, Coimbatore</span>
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              NEEDLE-FREE DENTAL CARE
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/booking?treatment=Needle-Free%20Treatment"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
            >
              <span>Explore Needle-Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area - Full width alignment matching Navbar and Footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 relative z-10 space-y-8">
        
        {/* Supporting Narrative */}
        <div className="max-w-3xl space-y-1.5 text-left">
          <p className="text-[17px] sm:text-[19px] font-serif italic text-[#7B8052]">
            Gentle Anesthesia Delivered Without the Fear of Hypodermic Injections
          </p>
          <p className="text-[14px] sm:text-[15px] text-[#29291F]/80 leading-[1.6] font-light">
            At Dr. Preethi&apos;s Dentistry, we have engineered out the primary cause of dental anxiety. By employing high-velocity jet injectors, computer-guided digital anesthesia, and medical-grade topicals, our patients experience complete numbness and restorative comfort without a single hypodermic needle.
          </p>
        </div>

        {/* 2-Column Split: Compact and elegant alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column (5 Cols): Clinical Device Photograph with 3D Depth Shadow */}
          <div className="lg:col-span-5 relative max-w-sm sm:max-w-md mx-auto w-full">
            <div className="rounded-[18px] overflow-hidden border border-[#A5A786]/40 shadow-elevated bg-[#29291F] aspect-[16/11] relative group">
              <img
                src="/needle-free-device.jpg"
                alt="Clinical Needle-Free Jet Anesthesia Injector on Sterile Tray"
                className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FAF8F2]/95 backdrop-blur-md text-[10.5px] font-bold uppercase tracking-wider text-[#7B8052] border border-[#A5A786]/30 shadow-md">
                Next-Gen Comfort Care
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Technology Overview with Matching Depth */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-2 border-b border-[#A5A786]/30 pb-2.5">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveTab(tech.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                    activeTab === tech.id
                      ? "bg-[#7B8052] text-white shadow-md scale-[1.02]"
                      : "bg-[#F5F0E6] text-[#29291F]/80 hover:bg-[#E0DACB]"
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>

            {/* Selected Tech Card - Compacted Sizing */}
            {(() => {
              const current = technologies.find((t) => t.id === activeTab) || technologies[0];
              const Icon = current.icon;
              return (
                <div className="bg-[#F5F0E6] p-4 sm:p-5 rounded-[16px] border border-[#A5A786]/40 shadow-elevated space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#7B8052] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[17px] sm:text-[18px] font-serif font-bold text-[#29291F] leading-tight">
                        {current.name}
                      </h3>
                      <p className="text-[11px] text-[#7B8052] font-semibold uppercase tracking-wider">
                        {current.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#29291F]/85 leading-[1.5] font-light">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {current.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#29291F] bg-[#FAF8F2] px-2 py-1.5 rounded-md border border-[#A5A786]/25 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7B8052] shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="pt-0.5 flex items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-5 h-[40px] rounded-full bg-[#7B8052] text-white text-[12px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-elevated"
              >
                <span>Experience Needle-Free Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

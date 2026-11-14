"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Feather, 
  Smile, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  HeartHandshake 
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
    <section id="needle-free" className="relative bg-[#FAF8F2] py-16 md:py-24 border-b border-[#A5A786]/30 overflow-hidden">
      
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#7B8052]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#A5A786]/15 blur-3xl" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 space-y-12 md:space-y-16">
        
        {/* Section Header: Clinical Excellence & Painless Innovation */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7B8052]/10 border border-[#7B8052]/25 text-[#7B8052] text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em]">
            <Sparkles className="w-4 h-4 text-[#7B8052]" />
            <span>CLINIC SPECIALITY INNOVATION · OUR EXPERTISE</span>
          </div>

          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-serif font-bold text-[#29291F] tracking-tight leading-[1.12]">
            Needle-Free Dental Care
            <span className="block font-serif italic font-normal text-[#7B8052] text-[24px] sm:text-[28px] md:text-[32px] mt-1.5">
              Gentle Anesthesia Delivered Without the Fear of Injections
            </span>
          </h2>

          <p className="text-[16px] sm:text-[17px] text-[#29291F]/80 leading-[1.6] font-light max-w-2xl mx-auto">
            At Dr. Preethi&apos;s Dentistry, we have engineered out the primary cause of dental anxiety. By employing high-velocity jet injectors, computer-guided digital anesthesia, and medical-grade topicals, our patients experience complete numbness and restorative comfort without a single hypodermic needle.
          </p>
        </div>

        {/* 2-Column Split: Golden Ratio Proportion (5 Cols / 7 Cols ~ 38.2% / 61.8%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5 Cols ~ 38.2%): Clinical Device Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-[#A5A786]/40 shadow-card bg-[#29291F] aspect-[4/3] relative group">
              <img
                src="/needle-free-device.jpg"
                alt="Clinical Needle-Free Jet Anesthesia Injector on Sterile Tray"
                className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FAF8F2]/95 backdrop-blur-md text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#7B8052] border border-[#A5A786]/30 shadow-sm">
                Next-Gen Comfort Care
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols ~ 61.8%): Technology Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-2.5 border-b border-[#A5A786]/30 pb-4">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveTab(tech.id as any)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    activeTab === tech.id
                      ? "bg-[#7B8052] text-white shadow-sm"
                      : "bg-[#F5F0E6] text-[#29291F]/80 hover:bg-[#E0DACB]"
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>

            {/* Selected Tech Card */}
            {(() => {
              const current = technologies.find((t) => t.id === activeTab) || technologies[0];
              const Icon = current.icon;
              return (
                <div className="bg-[#F5F0E6] p-6 sm:p-7 rounded-2xl border border-[#A5A786]/40 shadow-subtle space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7B8052] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[20px] sm:text-[22px] font-serif font-bold text-[#29291F]">
                        {current.name}
                      </h3>
                      <p className="text-[13px] text-[#7B8052] font-semibold uppercase tracking-wider">
                        {current.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#29291F]/85 leading-[1.6] font-light">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    {current.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-[#29291F] bg-[#FAF8F2] p-2.5 rounded-lg border border-[#A5A786]/25">
                        <CheckCircle2 className="w-4 h-4 text-[#7B8052] shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 h-[46px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-card hover:shadow-elevated"
              >
                <span>Experience Needle-Free Care</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

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
    <section id="needle-free" className="relative bg-[#FAF8F2] py-20 md:py-28 border-b border-[#A5A786]/30 overflow-hidden">
      
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#7B8052]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#A5A786]/15 blur-3xl" />
      </div>

      <div className="w-full max-w-[1450px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header: Clinical Excellence & Painless Innovation */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8052]/10 border border-[#7B8052]/30 text-[#7B8052] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#7B8052]" />
            <span>CLINIC SPECIALITY INNOVATION · OUR EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#29291F] tracking-tight leading-tight">
            Needle-Free Dental Care
            <span className="block font-serif italic font-normal text-[#7B8052] text-2xl sm:text-3xl md:text-4xl mt-1">
              Gentle Anesthesia Delivered Without the Fear of Injections
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#29291F]/80 leading-relaxed font-light max-w-3xl mx-auto">
            At Dr. Preethi's Dentistry, we have engineered out the primary cause of dental anxiety. By employing high-velocity jet injectors, computer-guided digital anesthesia, and medical-grade topicals, our patients experience complete numbness and restorative comfort without a single hypodermic needle.
          </p>
        </div>

        {/* 2-Column Split: Clinical Showcase & Technology Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5 Cols): Clinical Photograph with Interactive Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#7B8052]/40 shadow-elevated bg-[#29291F] aspect-[4/5] max-h-[520px] mx-auto">
              <img
                src="/needle-free-dr-preethi.jpg"
                alt="Dr. Preethi Subramanian Explaining Needle-Free Dental Technology"
                className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02]"
              />
              
              {/* Subtle Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#FAF8F2]/95 backdrop-blur-md border border-[#A5A786]/40 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7B8052] text-[#FAF8F2] flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-[#FAF8F2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B8052]">
                      100% Needle-Less Comfort
                    </h4>
                    <p className="text-xs text-[#29291F]/75 font-medium leading-tight">
                      Designed for patients with dental anxiety & needle phobia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#7B8052] text-[#FAF8F2] px-4 py-2.5 rounded-2xl shadow-elevated border-2 border-white/80 text-center">
              <span className="text-xl font-bold font-serif block leading-none">0</span>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Needles Used</span>
            </div>
          </div>

          {/* Right Column (7 Cols): Technology Tabs & Clinical Highlights */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Tab Selector */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#F5F0E6] border border-[#A5A786]/40">
              {technologies.map((tech) => {
                const isCurrent = activeTab === tech.id;
                const IconComponent = tech.icon;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTab(tech.id as any)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#7B8052] text-[#FAF8F2] shadow-md scale-[1.02]"
                        : "text-[#29291F]/70 hover:text-[#29291F] hover:bg-white/50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-[11px] sm:text-xs text-center">{tech.name.split(" ")[0]} {tech.name.split(" ")[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Technology Card */}
            {technologies.map((tech) => {
              if (tech.id !== activeTab) return null;
              const IconComp = tech.icon;
              return (
                <div
                  key={tech.id}
                  className="bg-[#F5F0E6] p-6 sm:p-8 rounded-3xl border border-[#A5A786]/40 shadow-card space-y-5 animate-fade-in"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052]">
                        {tech.tagline}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-[#29291F]">
                        {tech.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#7B8052]/15 border border-[#7B8052]/30 flex items-center justify-center text-[#7B8052] shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-sm text-[#29291F]/85 leading-relaxed font-light">
                    {tech.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#A5A786]/30">
                    {tech.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#29291F]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#7B8052] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* 3 Core Patient Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#A5A786]/40 shadow-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7B8052]/15 text-[#7B8052] flex items-center justify-center shrink-0 mt-0.5">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#29291F]">No Needle Anxiety</h5>
                  <p className="text-[11px] text-[#29291F]/70 leading-snug mt-0.5">Gentle, panic-free procedures for all age groups.</p>
                </div>
              </div>

              <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#A5A786]/40 shadow-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7B8052]/15 text-[#7B8052] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#29291F]">Immediate Onset</h5>
                  <p className="text-[11px] text-[#29291F]/70 leading-snug mt-0.5">Faster anesthesia onset allows shorter chair times.</p>
                </div>
              </div>

              <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#A5A786]/40 shadow-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7B8052]/15 text-[#7B8052] flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#29291F]">Minimal Discomfort</h5>
                  <p className="text-[11px] text-[#29291F]/70 leading-snug mt-0.5">Zero lingering soreness at injection sites.</p>
                </div>
              </div>
            </div>

            {/* Direct CTA Link */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/booking?treatment=Needle-Free%20Treatment"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#555B38] transition-all shadow-md group"
              >
                <span>Book Needle-Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#treatments"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF8F2] border border-[#A5A786]/50 text-[#29291F] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-all shadow-sm"
              >
                <span>View All Specialities</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

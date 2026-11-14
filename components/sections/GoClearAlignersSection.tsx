"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  EyeOff, 
  Heart, 
  Smartphone, 
  Award, 
  CreditCard, 
  UserCheck, 
  Maximize2 
} from "lucide-react";

export const GoClearAlignersSection: React.FC = () => {
  const [activeCaseTab, setActiveCaseTab] = useState<number>(0);

  // 1. The 6 Pillars from the official GoClear Advantage
  const goclearAdvantages = [
    {
      title: "Nearly Invisible",
      desc: "Ultra-clear aligners that are virtually undetectable. Smile with full confidence every single day.",
      icon: EyeOff,
    },
    {
      title: "Maximum Comfort",
      desc: "Smooth, custom-fitted trays with no sharp edges. Eat, drink, and speak with zero discomfort.",
      icon: Heart,
    },
    {
      title: "Remote Monitoring",
      desc: "Track progress digitally. Your doctor monitors your smile from anywhere in real time.",
      icon: Smartphone,
    },
    {
      title: "FDA Approved",
      desc: "GoClear aligners meet international safety standards for certified dental devices worldwide.",
      icon: Award,
    },
    {
      title: "Affordable Plans",
      desc: "Flexible EMI options starting from ₹2,500/month. No-cost EMI available on leading cards.",
      icon: CreditCard,
    },
    {
      title: "Expert Doctors",
      desc: "Certified orthodontists and dentists trained and accredited in GoClear protocols.",
      icon: UserCheck,
    },
  ];

  // 2. The 9 Treatable Cases Matrix from the official GoClear site
  const treatableCases = [
    {
      title: "Crowded Teeth",
      category: "ALIGNMENT",
      desc: "Crowded teeth occur when there isn't enough space in the jaw for all teeth to fit normally. GoClear aligners gently shift teeth into their correct positions over time, giving you a straighter, healthier smile without metal brackets or wires.",
      metric: "Gentle Expansion",
    },
    {
      title: "Gapped Teeth",
      category: "SPACING",
      desc: "Spaces between teeth due to missing teeth, tongue thrusting, or teeth that do not fill the mouth properly. GoClear gradually brings separated teeth into uniform contact.",
      metric: "Gap Closure",
    },
    {
      title: "Spacing & Gaps",
      category: "AESTHETICS",
      desc: "Gaps between teeth (diastema) can affect your smile's aesthetics and make it harder to chew properly. GoClear's precision-engineered aligners close these spaces gradually and comfortably, restoring a full, even smile.",
      metric: "Balanced Arch",
    },
    {
      title: "Overbite",
      category: "BITE CORRECTION",
      desc: "An overbite is when the upper front teeth excessively overlap the lower front teeth. Left untreated, it can cause wear on tooth enamel and jaw pain. GoClear aligners are designed to correct mild to moderate overbites effectively.",
      metric: "Vertical Balance",
    },
    {
      title: "Underbite",
      category: "BITE CORRECTION",
      desc: "An underbite occurs when the lower teeth protrude further than the upper teeth. This can cause chewing difficulty and jaw discomfort. GoClear treatment plans target underbites to restore proper bite alignment.",
      metric: "Jaw Alignment",
    },
    {
      title: "Crossbite",
      category: "OCCLUSION",
      desc: "A crossbite happens when one or more upper teeth bite inside the lower teeth. It can lead to uneven tooth wear, gum disease, and bone loss. GoClear aligners move teeth into their correct alignment to fix crossbites efficiently.",
      metric: "Arch Correction",
    },
    {
      title: "Open Bite",
      category: "VERTICAL BITE",
      desc: "An open bite means the upper and lower teeth don't touch when the mouth is closed, often making it difficult to bite into food. GoClear can correct open bites caused by habits like thumb-sucking or tongue thrusting.",
      metric: "Contact Restoration",
    },
    {
      title: "Deep Bite",
      category: "DEEP OVERBITE",
      desc: "A deep bite (deep overbite) is a severe overbite where upper front teeth cover most of the lower front teeth. It can cause wear and damage to teeth over time. GoClear aligners help correct deep bites step by step.",
      metric: "Incisal Staging",
    },
    {
      title: "Mid-line Shift",
      category: "SYMMETRY",
      desc: "A mid-line discrepancy occurs when the center of your upper and lower teeth don't align. This affects facial symmetry and smile aesthetics. GoClear's customised treatment plans address mid-line issues for a perfectly balanced smile.",
      metric: "Facial Symmetry",
    },
  ];

  // 3. Official Comparison Matrix from GoClear website
  const comparisonRows = [
    { feature: "Visibility", goclear: "Nearly Invisible", traditional: "Clearly Visible" },
    { feature: "Comfort", goclear: "Smooth & Comfortable", traditional: "Sharp Wires & Brackets" },
    { feature: "Removable", goclear: "100% Removable", traditional: "Fixed Permanently" },
    { feature: "Diet Restrictions", goclear: "None — Eat Freely", traditional: "Many Restrictions" },
    { feature: "Oral Hygiene", goclear: "Easy to Maintain", traditional: "Difficult to Clean" },
    { feature: "Doctor Visits", goclear: "Fewer Required", traditional: "Every 4–6 Weeks" },
    { feature: "Sports Safe", goclear: "Safe for Active Sports", traditional: "Risk of Soft Tissue Cuts" },
    { feature: "Treatment Tracking", goclear: "Digital 3D Preview", traditional: "No Digital Preview" },
  ];

  return (
    <section id="goclear" className="relative bg-[#F5F0E6] py-20 md:py-28 border-b border-[#A5A786]/30 overflow-hidden">
      
      {/* Decorative Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#7B8052]/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#A5A786]/15 blur-3xl" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8052]/15 border border-[#7B8052]/30 text-[#7B8052] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#7B8052]" />
            <span>ORTHODONTIC EXCELLENCE · IN-HOUSE ALIGNER SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#29291F] tracking-tight leading-tight">
            GoClear Clear Aligners
            <span className="block font-serif italic font-normal text-[#7B8052] text-2xl sm:text-3xl md:text-4xl mt-1">
              Straight Teeth, Clear Confidence — Supervised by Dr. Preethi Subramanian
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#29291F]/80 leading-relaxed font-light max-w-2xl mx-auto">
            Experience the smartest, most comfortable way to straighten your teeth. GoClear aligners offer certified, virtually invisible orthodontic correction with flexible installments starting from ₹2,500/month.
          </p>
        </div>

        {/* 1. Hero Showcase: The GoClear Advantage & Authentic Product Packaging */}
        <div className="bg-[#FAF8F2] rounded-3xl border border-[#A5A786]/40 shadow-card p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 5 Cols: Authentic Product Packaging Held by Dr. Preethi */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7B8052]/30 shadow-elevated bg-[#29291F] aspect-[4/5] max-h-[460px] w-full max-w-sm group">
                <img
                  src="/goclear-box.jpg"
                  alt="Dr. Preethi Presenting GoClear Aligners Kit Box"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Rating Pill */}
                <div className="absolute top-4 left-4 bg-[#7B8052] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  From ₹2,500/Month
                </div>

                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-[#FAF8F2]/95 backdrop-blur-md border border-[#A5A786]/40 text-center">
                  <span className="text-[11px] font-bold text-[#7B8052] uppercase tracking-wider block">
                    98% Patient Satisfaction Rate
                  </span>
                  <span className="text-[10px] text-[#29291F]/70 font-medium">
                    Certified 3D Digital Intraoral Staging
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: The GoClear Advantage 6-Pillar Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
                  WHY CHOOSE GOCLEAR?
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F] mt-1">
                  The GoClear Advantage
                </h3>
                <p className="text-xs sm:text-sm text-[#29291F]/75 leading-relaxed mt-1.5 font-light">
                  Smooth, custom-fitted medical-grade trays engineered with zero sharp edges, providing maximum discretion and predictability.
                </p>
              </div>

              {/* 6 Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {goclearAdvantages.map((adv, idx) => {
                  const Icon = adv.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#F5F0E6] border border-[#A5A786]/35 flex items-start gap-3 transition-colors hover:border-[#7B8052]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#7B8052] text-[#FAF8F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-4 h-4 text-[#FAF8F2]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#29291F]">
                          {adv.title}
                        </h4>
                        <p className="text-[11px] text-[#29291F]/75 leading-relaxed mt-0.5">
                          {adv.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking?treatment=GoClear%20Aligners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#555B38] transition-all shadow-md group"
                >
                  <span>Request GoClear 3D Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:07812871829"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#A5A786]/50 text-[#29291F] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF8F2] transition-all shadow-sm"
                >
                  <span>Call 078128 71829</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Treatable Cases Matrix: 9 Distinct Clinical Conditions */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
              CLINICAL CAPABILITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F]">
              What Can GoClear Fix?
            </h3>
            <p className="text-xs text-[#29291F]/70">
              GoClear effectively treats a wide range of dental alignment and malocclusion issues.
            </p>
          </div>

          {/* 3x3 Grid of Treatable Cases matching GoClear official site */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatableCases.map((c, i) => (
              <div
                key={i}
                className="bg-[#FAF8F2] rounded-2xl p-5 border border-[#A5A786]/40 shadow-subtle hover:border-[#7B8052] hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7B8052] bg-[#7B8052]/10 px-2.5 py-0.5 rounded">
                      {c.category}
                    </span>
                    <span className="text-[10px] font-semibold text-[#29291F]/60">
                      {c.metric}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#29291F]">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#29291F]/75 leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>
                
                <div className="pt-4 mt-2 border-t border-[#A5A786]/20 flex items-center justify-between">
                  <Link
                    href={`/booking?case=${encodeURIComponent(c.title)}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#7B8052] hover:underline flex items-center gap-1.5"
                  >
                    <span>Check Suitability</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Clean Comparison Table: GoClear vs Conventional Metal Braces */}
        <div className="bg-[#FAF8F2] rounded-3xl border border-[#A5A786]/40 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
              SEE WHY THOUSANDS CHOOSE GOCLEAR
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#29291F]">
              GoClear Clear Aligners vs Conventional Metal Braces
            </h4>
            <p className="text-xs text-[#29291F]/70">
              Clear clinical and lifestyle advantages tailored for modern adult and teen convenience.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#A5A786]/40 text-[#29291F]">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#29291F]/70">
                    Feature
                  </th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#7B8052] bg-[#7B8052]/10 rounded-t-xl">
                    GoClear Clear Aligners
                  </th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#29291F]/70">
                    Traditional Braces
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A5A786]/20">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F5F0E6]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#29291F]">{row.feature}</td>
                    <td className="py-3.5 px-4 font-medium text-[#7B8052] bg-[#7B8052]/5">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7B8052] shrink-0" />
                        <span>{row.goclear}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#29291F]/70">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { treatmentsData } from "@/data/treatmentsData";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Treatments | Dr. Preethi's Dentistry Coimbatore",
  description: "Explore comprehensive dental treatments including Invisalign, Orthodontics, Teeth Whitening, Veneers, and Implants at Dr. Preethi's Dentistry, Saibaba Colony.",
};

export default function TreatmentsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-20 bg-[#F5F0E6]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-[#7B8052] font-bold bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
            Clinical Discovery
          </span>
          <h1 className="text-[34px] sm:text-[44px] lg:text-[54px] font-serif font-bold text-[#29291F] mt-3.5 tracking-tight leading-[1.08]">
            Comprehensive{" "}
            <span className="italic text-[#7B8052] font-normal">
              Dental Treatments
            </span>
          </h1>
          <p className="text-[#29291F]/80 text-[16px] sm:text-[18px] mt-4 leading-[1.6] font-light">
            Every procedure is planned with meticulous clinical attention, diagnostic precision, and your utmost comfort. Explore our complete scope of services below.
          </p>
        </div>

        {/* Treatment Cards List */}
        <div className="space-y-12 md:space-y-16">
          {treatmentsData.map((treatment, idx) => (
            <div
              key={treatment.id}
              id={treatment.id}
              className="scroll-mt-28 p-6 sm:p-10 lg:p-12 rounded-[24px] bg-[#FAF8F2] border border-[#A5A786]/40 shadow-card hover:shadow-elevated hover:border-[#7B8052]/50 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Media (5 Cols ~ 38.2%) */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-[18px] overflow-hidden bg-[#29291F] border border-[#A5A786]/40 aspect-[4/3] relative group">
                    <img
                      src={treatment.heroImage}
                      alt={treatment.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FAF8F2]/95 backdrop-blur-md text-[11px] font-bold text-[#7B8052] uppercase tracking-wider border border-[#A5A786]/30 shadow-sm">
                      {treatment.category}
                    </span>
                  </div>
                </div>

                {/* Details (7 Cols ~ 61.8%) */}
                <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <h2 className="text-[24px] sm:text-[30px] font-serif font-bold text-[#29291F] tracking-tight leading-snug">
                      {treatment.title}
                    </h2>
                    <p className="text-[13px] sm:text-[14px] font-semibold text-[#7B8052] uppercase tracking-wider mt-1">
                      {treatment.tagline}
                    </p>
                  </div>

                  <p className="text-[15px] sm:text-[16px] text-[#29291F]/80 leading-[1.6] font-light">
                    {treatment.fullDescription}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[12px] uppercase tracking-wider font-bold text-[#29291F]">
                      Clinical Benefits
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {treatment.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-[13px] text-[#29291F]/90">
                          <CheckCircle2 className="w-4 h-4 text-[#7B8052] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Process */}
                  <div className="pt-3 border-t border-[#A5A786]/30">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {treatment.process.map((step) => (
                        <div key={step.step} className="p-3.5 rounded-[14px] bg-[#F5F0E6] border border-[#A5A786]/30">
                          <span className="text-[11px] font-extrabold text-[#7B8052] uppercase tracking-wider">{step.step}</span>
                          <h4 className="text-[13px] font-bold text-[#29291F] mt-0.5">{step.title}</h4>
                          <p className="text-[11px] text-[#29291F]/70 mt-1 leading-snug">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/booking?treatment=${encodeURIComponent(treatment.title)}`}
                      className="inline-flex items-center gap-2 px-6 h-[46px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-card hover:shadow-elevated group"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-16 md:mt-24">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}

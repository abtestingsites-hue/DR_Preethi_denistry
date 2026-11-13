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
    <div className="pt-32 pb-20 bg-[#F5F0E6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
            Clinical Discovery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
            Comprehensive{" "}
            <span className="italic text-[#7C8052] font-medium">
              Dental Treatments
            </span>
          </h1>
          <p className="text-[#6B6858] text-lg mt-4 leading-relaxed font-normal">
            Every procedure is planned with meticulous clinical attention, diagnostic precision, and your utmost comfort. Explore our complete scope of services below.
          </p>
        </div>

        {/* Treatment Cards List */}
        <div className="space-y-16">
          {treatmentsData.map((treatment, idx) => (
            <div
              key={treatment.id}
              id={treatment.id}
              className="scroll-mt-32 p-8 sm:p-12 rounded-[32px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle hover:shadow-card hover:border-[#7C8052]/50 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Media */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-[28px] overflow-hidden bg-[#F5F0E6] border border-[#DCD4C4] aspect-[4/3] relative group">
                    <img
                      src={treatment.heroImage}
                      alt={treatment.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FAF7F0]/95 backdrop-blur-md text-xs font-bold text-[#7C8052] uppercase tracking-wider border border-[#DCD4C4]">
                      {treatment.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292820] tracking-tight">
                      {treatment.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#7C8052] mt-1">
                      {treatment.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#6B6858] leading-relaxed">
                    {treatment.fullDescription}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#292820]">
                      Clinical Benefits
                    </p>
                    {treatment.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292820]">
                        <CheckCircle2 className="w-4 h-4 text-[#7C8052] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Step Process */}
                  <div className="pt-4 border-t border-[#DCD4C4]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {treatment.process.map((step) => (
                        <div key={step.step} className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4]">
                          <span className="text-[11px] font-extrabold text-[#7C8052]">{step.step}</span>
                          <h4 className="text-xs font-bold text-[#292820] mt-1">{step.title}</h4>
                          <p className="text-[11px] text-[#6B6858] mt-1 leading-snug">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/booking?treatment=${encodeURIComponent(treatment.title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C8052] text-white text-xs font-semibold hover:bg-[#64683E] transition-all shadow-sm group"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-20">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}

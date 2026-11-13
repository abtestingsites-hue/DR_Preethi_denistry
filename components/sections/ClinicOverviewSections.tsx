import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, Smile } from "lucide-react";
import { treatmentsData } from "@/data/treatmentsData";
import { clinicInfo } from "@/data/clinicInfo";

export const ClinicIntroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] border-y border-[#DCD4C4]" id="about-intro">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Media: Authentic Doctor & Clinic Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              <div className="rounded-[32px] overflow-hidden bg-[#F5F0E6] border border-[#DCD4C4] shadow-card aspect-[4/5] relative">
                <img
                  src="/Doctor.png"
                  alt="Dr. Preethi Subramanian — Orthodontist | Invisalign Provider"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Verified Experience Badge with Olive Accent */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 p-5 rounded-2xl bg-[#FAF7F0] border border-[#DCD4C4] shadow-float max-w-[300px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#F5F0E6] flex items-center justify-center text-[#7C8052] border border-[#DCD4C4]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C8052]">
                    Clinical Positioning
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#292820] mt-2 leading-snug">
                  {clinicInfo.professionalPositioning}
                </p>
                <p className="text-xs text-[#6B6858] mt-1">
                  Saibaba Colony, Coimbatore
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#F5F0E6] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
              Clinic Introduction
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] tracking-tight leading-[1.15]">
              Your Smile Deserves{" "}
              <span className="italic text-[#7C8052] font-medium">
                Exceptional Care
              </span>.
            </h2>

            <p className="text-base sm:text-lg text-[#6B6858] leading-relaxed font-normal">
              At Dr. Preethi's Dentistry, we believe that modern orthodontic and dental care should be an empowering, comfortable, and deeply personal experience. Under the clinical guidance of Dr. Preethi Subramanian, our practice blends state-of-the-art diagnostic technology with attentive patient consultation.
            </p>

            <p className="text-sm sm:text-base text-[#6B6858] leading-relaxed">
              Whether you are exploring discreet teeth alignment with Invisalign clear aligners or seeking comprehensive preventive care for your family, our Saibaba Colony clinic is designed around your wellbeing, clinical transparency, and long-term oral health.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4]">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] flex items-center justify-center text-[#7C8052] shrink-0 border border-[#DCD4C4]">
                  <Sparkles className="w-5 h-5 text-[#7C8052]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#292820]">Digital Treatment Planning</h4>
                  <p className="text-xs text-[#6B6858] mt-1">Intraoral precision for clear aligners and orthodontic accuracy.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4]">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] flex items-center justify-center text-[#7C8052] shrink-0 border border-[#DCD4C4]">
                  <Heart className="w-5 h-5 text-[#7C8052]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#292820]">Patient-Centred Focus</h4>
                  <p className="text-xs text-[#6B6858] mt-1">Thoughtful consultations with calm, transparent care.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C8052] hover:text-[#64683E] transition-colors group"
              >
                <span>Learn More About Our Philosophy</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export const FeaturedTreatmentsSection: React.FC = () => {
  const featured = treatmentsData.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#F5F0E6]" id="treatments-preview">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
              Comprehensive Dental Care
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
              Care Designed{" "}
              <span className="italic text-[#7C8052] font-medium">
                Around Your Smile
              </span>.
            </h2>
            <p className="text-[#6B6858] text-base md:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
              Explore specialised orthodontic, cosmetic, and general dental treatments delivered with modern clinical standards.
            </p>
          </div>

          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C8052] hover:text-[#64683E] transition-colors group"
          >
            <span>View All Treatments ({treatmentsData.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group rounded-[28px] bg-[#FAF7F0] border border-[#DCD4C4] overflow-hidden shadow-subtle hover:shadow-card hover:border-[#7C8052]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F0E6]">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FAF7F0]/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#7C8052] border border-[#DCD4C4]">
                  {item.category}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#292820] group-hover:text-[#7C8052] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B6858] mt-2.5 line-clamp-3 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DCD4C4] flex items-center justify-between">
                  <Link
                    href={`/treatments#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C8052] group-hover:text-[#64683E] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`/booking?treatment=${encodeURIComponent(item.title)}`}
                    className="text-xs font-medium text-[#6B6858] hover:text-[#292820] transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const InvisalignFeatureSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] border-y border-[#DCD4C4]" id="invisalign">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F0E6] text-[#7C8052] text-xs font-bold uppercase tracking-wider border border-[#DCD4C4]">
              <Smile className="w-4 h-4 text-[#7C8052]" />
              <span>Invisalign® Clear Aligner Provider</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] tracking-tight leading-[1.15]">
              Your Smile Journey, <br className="hidden sm:inline" />
              <span className="italic text-[#7C8052] font-medium">
                Without Traditional Braces
              </span>.
            </h2>

            <p className="text-base sm:text-lg text-[#6B6858] leading-relaxed font-normal">
              Experience the freedom of clear, removable aligners designed to fit seamlessly into your active social and professional life. Dr. Preethi Subramanian provides clinical orthodontic oversight to guide your teeth into harmonious occlusion.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#292820]">
                <CheckCircle2 className="w-5 h-5 text-[#7C8052] shrink-0" />
                <span>Virtually invisible transparent design for confident wear</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#292820]">
                <CheckCircle2 className="w-5 h-5 text-[#7C8052] shrink-0" />
                <span>Removable for meals, special occasions, and effortless brushing</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#292820]">
                <CheckCircle2 className="w-5 h-5 text-[#7C8052] shrink-0" />
                <span>Smooth medical-grade plastic without sharp metal wires or brackets</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#292820]">
                <CheckCircle2 className="w-5 h-5 text-[#7C8052] shrink-0" />
                <span>Doctor-supervised progress monitoring throughout treatment</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7C8052] text-white font-medium hover:bg-[#64683E] transition-all shadow-float group"
              >
                <span>Request Aligner Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/treatments#invisalign"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F5F0E6] text-[#292820] font-medium border border-[#DCD4C4] hover:border-[#7C8052] transition-colors"
              >
                View Aligner Process
              </Link>
            </div>
          </div>

          {/* Media Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              <div className="rounded-[36px] overflow-hidden bg-[#F5F0E6] border border-[#DCD4C4] shadow-card aspect-[4/5] relative">
                <img
                  src="/aligner-presentation.png"
                  alt="Clear Aligner Tray Presentation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Aligner Tray Accent */}
              <div className="absolute -top-6 -right-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#DCD4C4] shadow-float max-w-[210px] hidden sm:block">
                <img
                  src="/aligner-isolated-tray.png"
                  alt="Invisalign Tray"
                  className="w-full h-24 object-contain rounded-xl bg-[#F5F0E6] p-2 border border-[#DCD4C4]"
                />
                <p className="text-[11px] text-center font-bold text-[#7C8052] mt-2">
                  Precision Orthodontic Tray
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

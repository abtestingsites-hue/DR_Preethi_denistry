import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, MapPin } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "About Dr. Preethi Subramanian | Dr. Preethi's Dentistry",
  description: "Learn about Dr. Preethi Subramanian, Orthodontist and Invisalign Provider in Saibaba Colony, Coimbatore. Discover our patient care philosophy and clinical standards.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 bg-[#F5F0E6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Hero / Doctor Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-5 relative">
            <div className="rounded-[36px] overflow-hidden bg-[#FAF7F0] border border-[#DCD4C4] shadow-elevated aspect-[4/5] relative">
              <img
                src="/Doctor.png"
                alt="Dr. Preethi Subramanian"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
              Meet Your Orthodontist
            </span>
            <h1 className="text-4xl sm:text-5xl font-normal font-serif text-[#292820] tracking-tight leading-tight">
              {clinicInfo.doctorName}
            </h1>
            <p className="text-lg font-semibold text-[#7C8052]">
              {clinicInfo.professionalPositioning}
            </p>

            <p className="text-base text-[#6B6858] leading-relaxed">
              Dr. Preethi Subramanian is a specialist orthodontist and certified Invisalign provider dedicated to transforming patient smiles through modern orthodontic science, biological respect for dental tissues, and deeply empathetic clinical consultations.
            </p>

            <p className="text-sm text-[#6B6858] leading-relaxed">
              Practicing from Saibaba Colony, Coimbatore, Dr. Preethi integrates digital 3D intraoral diagnostics and personalized treatment pathways. Every smile transformation is designed not just for aesthetics, but to preserve harmonious chewing function, long-term periodontal health, and lifelong patient confidence.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7C8052] text-white text-xs font-semibold hover:bg-[#64683E] transition-all shadow-float"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
              <Sparkles className="w-6 h-6 text-[#7C8052]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#292820]">Our Mission</h3>
            <p className="text-sm text-[#6B6858] leading-relaxed">
              To provide international-standard orthodontic and dental care in Coimbatore with genuine empathy, scientific integrity, and uncompromised patient safety.
            </p>
          </div>

          <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
              <Heart className="w-6 h-6 text-[#7C8052]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#292820]">Clinical Philosophy</h3>
            <p className="text-sm text-[#6B6858] leading-relaxed">
              We practice conservative, evidence-based dentistry. We believe in educating our patients so they make informed, confident choices about their oral wellbeing.
            </p>
          </div>

          <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
              <ShieldCheck className="w-6 h-6 text-[#7C8052]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#292820]">Hygiene & Technology</h3>
            <p className="text-sm text-[#6B6858] leading-relaxed">
              Strict multi-step sterilisation with medical Class-B autoclaves and ergonomic patient operatory units ensure maximum peace of mind during each visit.
            </p>
          </div>
        </div>

        {/* Location & Facility Spotlight */}
        <div className="p-8 sm:p-12 rounded-[36px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-[#7C8052] bg-[#F5F0E6] px-3 py-1 rounded-full inline-block border border-[#DCD4C4]">
                Saibaba Colony Practice
              </span>
              <h2 className="text-3xl font-serif font-normal text-[#292820]">
                A Calm, Modern Dental Environment
              </h2>
              <p className="text-sm text-[#6B6858] leading-relaxed">
                Located conveniently on 7th Cross, Bharathi Park Road, our practice is designed to eliminate clinical anxiety. From peaceful interior tones to private consultation spaces, we invite you to experience dental visits reimagined.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-[#292820] pt-2">
                <MapPin className="w-4 h-4 text-[#7C8052]" />
                <span>{clinicInfo.fullAddress}</span>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-[24px] overflow-hidden aspect-video bg-[#F5F0E6] border border-[#DCD4C4]">
              <img
                src="/Clinic.png"
                alt="Clinic Reception"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-20">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}

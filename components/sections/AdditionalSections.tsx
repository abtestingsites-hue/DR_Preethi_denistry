"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, Plus, Minus, ArrowRight, Sparkles, Shield, Clock, HeartHandshake } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";
import { faqData } from "@/data/faqData";
import { clinicInfo } from "@/data/clinicInfo";

export const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Orthodontic & Invisalign Expertise",
      description: "Dedicated clinical expertise in modern clear aligners and orthodontic treatment planning.",
    },
    {
      icon: Shield,
      title: "Strict Sterilisation Protocols",
      description: "Rigorous Class-B autoclaving and medical-grade hygiene standards across all operatories.",
    },
    {
      icon: HeartHandshake,
      title: "Patient-Centred Care",
      description: "Unrushed consultations where your clinical options and personal comfort are prioritized.",
    },
    {
      icon: Clock,
      title: "Saibaba Colony Location",
      description: "Easily accessible clinic on Bharathi Park Road with comfortable modern amenities.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F5F0E6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
            The Clinical Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
            Why Choose{" "}
            <span className="italic text-[#7C8052] font-medium">
              Dr. Preethi's Dentistry
            </span>
          </h2>
          <p className="text-[#6B6858] text-base md:text-lg mt-4 font-normal">
            Thoughtful dental healthcare grounded in clinical ethics, advanced technology, and personalized patient attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-[28px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle hover:shadow-card hover:border-[#7C8052]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-[#DCD4C4]">
                    <Icon className="w-6 h-6 text-[#7C8052]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#292820] tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#6B6858] mt-3 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DCD4C4]">
                  <span className="text-xs font-bold text-[#7C8052]">Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export const TestimonialsCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F0] border-y border-[#DCD4C4]" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#F5F0E6] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
              Genuine Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
              Smiles That{" "}
              <span className="italic text-[#7C8052] font-medium">
                Speak for Themselves
              </span>.
            </h2>
            <p className="text-[#6B6858] text-base md:text-lg mt-3 font-normal max-w-xl">
              Read verified feedback from patients who have experienced our orthodontic care and dental treatments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-12 h-12 rounded-full border border-[#DCD4C4] bg-[#F5F0E6] hover:bg-[#DCD4C4] text-[#292820] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-12 h-12 rounded-full border border-[#DCD4C4] bg-[#F5F0E6] hover:bg-[#DCD4C4] text-[#292820] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item, index) => (
            <div
              key={item.id}
              className={`p-8 rounded-[28px] border transition-all duration-300 flex flex-col justify-between ${
                index === currentIndex
                  ? "border-[#7C8052] shadow-card bg-white"
                  : "border-[#DCD4C4] shadow-subtle bg-[#F5F0E6]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-600">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#7C8052]/20" />
                </div>

                <p className="text-sm text-[#292820] leading-relaxed italic font-serif">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#DCD4C4]">
                <p className="text-sm font-bold text-[#292820]">
                  {item.patientDisplayName}
                </p>
                <div className="flex items-center justify-between mt-1 text-xs text-[#6B6858]">
                  <span>{item.treatmentCategory || "Dental Patient"}</span>
                  <span className="text-[11px] text-[#7C8052] font-semibold">{item.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const FAQSection: React.FC<{ isPage?: boolean }> = ({ isPage = false }) => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Invisalign", "Orthodontics", "Treatments", "Appointments", "General Dental Care"];

  const filteredFaqs =
    activeCategory === "All" ? faqData : faqData.filter((f) => f.category === activeCategory);

  const displayed = isPage ? filteredFaqs : faqData.slice(0, 5);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F5F0E6]" id="faq">
      <div className="max-w-[1020px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
            Frequently Asked{" "}
            <span className="italic text-[#7C8052] font-medium">
              Questions
            </span>
          </h2>
          <p className="text-[#6B6858] text-base md:text-lg mt-3 font-normal max-w-xl mx-auto">
            Clear, honest medical answers to common patient questions about Invisalign, treatments, and appointments.
          </p>
        </div>

        {/* Categories if on page */}
        {isPage && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#7C8052] text-white"
                    : "bg-[#FAF7F0] text-[#6B6858] hover:text-[#292820] border border-[#DCD4C4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Accordion */}
        <div className="space-y-4">
          {displayed.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[24px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle overflow-hidden transition-all duration-300 hover:border-[#7C8052]/40"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-[#292820] group-hover:text-[#7C8052] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#7C8052] text-white" : "bg-[#F5F0E6] text-[#292820]"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#6B6858] leading-relaxed border-t border-[#F5F0E6]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isPage && (
          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C8052] hover:text-[#64683E] transition-colors group"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export const AppointmentCtaBanner: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#FAF7F0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#7C8052] to-[#64683E] p-10 sm:p-16 text-white shadow-elevated border border-white/10">
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5F0E6] bg-white/15 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md">
              Start Your Smile Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif tracking-tight leading-tight">
              Ready to Begin Your <span className="italic font-medium text-[#FAF7F0]">Smile Journey</span>?
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-normal">
              Book your consultation and take the first step towards confident orthodontic and dental care in Saibaba Colony, Coimbatore.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FAF7F0] text-[#292820] font-semibold hover:bg-white transition-all shadow-md group"
              >
                <span>Book Your Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#7C8052] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={`tel:${clinicInfo.phoneRaw}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium border border-white/20 transition-colors backdrop-blur-sm"
              >
                Call: {clinicInfo.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Decorative Warm Ambient Circle */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

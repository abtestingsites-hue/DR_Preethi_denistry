import React from "react";
import Link from "next/link";
import { MapPin, Phone, MessageSquare, Instagram, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const metadata = {
  title: "Contact & Location | Dr. Preethi's Dentistry Coimbatore",
  description: "Contact Dr. Preethi's Dentistry in Saibaba Colony, Coimbatore. Verified address, phone numbers, WhatsApp line, and Google Maps directions.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 bg-[#F5F0E6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
            Contact &{" "}
            <span className="italic text-[#7C8052] font-medium">
              Visit Our Clinic
            </span>
          </h1>
          <p className="text-[#6B6858] text-lg mt-4 leading-relaxed font-normal">
            We are conveniently located in Saibaba Colony, Coimbatore. Connect with us by phone, WhatsApp, or request an appointment online.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
                <MapPin className="w-5 h-5 text-[#7C8052]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#292820]">Clinic Address</h3>
              <p className="text-sm text-[#6B6858] leading-relaxed">
                {clinicInfo.fullAddress}
              </p>
              <div className="pt-2">
                <a
                  href={clinicInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C8052] hover:text-[#64683E] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Telephone & WhatsApp */}
            <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
                <Phone className="w-5 h-5 text-[#7C8052]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#292820]">Telephone & WhatsApp</h3>
              <p className="text-sm text-[#292820] font-semibold">
                {clinicInfo.phoneDisplay}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="px-5 py-2.5 rounded-full bg-[#F5F0E6] text-xs font-semibold text-[#292820] hover:bg-[#DCD4C4] border border-[#DCD4C4] transition-colors"
                >
                  Call Reception
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsappNumber}?text=${encodeURIComponent("Hello Dr. Preethi's Dentistry, I would like to enquire about an appointment.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#7C8052] text-xs font-semibold text-white hover:bg-[#64683E] transition-all shadow-sm"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
                <Clock className="w-5 h-5 text-[#7C8052]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#292820]">Consultation Hours</h3>
              <div className="space-y-2 text-xs text-[#6B6858]">
                {clinicInfo.openingHours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-[#DCD4C4]/60">
                    <span>{h.day}</span>
                    <span className="font-semibold text-[#292820]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Embedded Google Map & Clinic Exterior */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[36px] overflow-hidden bg-[#FAF7F0] border border-[#DCD4C4] shadow-card aspect-[16/10] relative">
              <iframe
                src={clinicInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Preethi's Dentistry Google Maps Location"
              />
            </div>

            <div className="p-8 rounded-[30px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#292820]">Need an immediate appointment?</h4>
                <p className="text-xs text-[#6B6858] mt-1">Book your visit online and receive prompt WhatsApp confirmation.</p>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#7C8052] text-white text-xs font-semibold hover:bg-[#64683E] transition-all shadow-sm whitespace-nowrap"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

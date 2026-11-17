import React from "react";
import Link from "next/link";
import { MapPin, Phone, MessageSquare, Instagram } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="bg-[#465239] text-[#FAF8F2] pt-8 pb-5 border-t border-[#465239]">
      {/* Edge-aligned full width container with left corner logo matching GlobalNavbar */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Compact Grid Section with reduced vertical height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-6 border-b border-white/15">
          
          {/* Brand Col aligned to far left */}
          <div className="lg:col-span-4 space-y-2">
            <Link href="/" className="inline-block group">
              <img
                src="/clinic-logo-dark.png"
                alt="Dr. Preethi's Dentistry"
                className="w-[160px] sm:w-[180px] lg:w-[200px] h-auto object-contain filter brightness-0 invert opacity-95 transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="text-[11px] text-[#FAF8F2]/75 max-w-sm leading-relaxed font-light mt-1">
              Dr. Preethi Subramanian — Orthodontist | Invisalign Provider. Delivering international-standard clinical care, orthodontic precision, and patient-centred dentistry in Coimbatore.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={clinicInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7B8052] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3 text-[#FAF8F2]" />
              </a>
              <a
                href={`https://wa.me/${clinicInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7B8052] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-3 h-3 text-[#FAF8F2]" />
              </a>
              <a
                href={`tel:${clinicInfo.phoneRaw}`}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7B8052] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-3 h-3 text-[#FAF8F2]" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#8FA36C]">
              CLINIC LOCATION &amp; HOURS
            </h4>
            <p className="text-[11px] text-[#FAF8F2]/85 leading-relaxed flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8FA36C] shrink-0 mt-0.5" />
              <span>{clinicInfo.fullAddress}</span>
            </p>
            <p className="text-[11px] text-[#FAF8F2]/85 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#8FA36C] shrink-0" />
              <span>Call: {clinicInfo.phoneDisplay}</span>
            </p>
            <p className="text-[10px] text-[#FAF8F2]/60">
              Hours: Mon – Sat: 10:00 AM – 08:00 PM | Sun: Prior Appointment
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#8FA36C]">
              QUICK NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#FAF8F2]/75">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <Link href="/#treatments" className="hover:text-white transition-colors">TREATMENTS</Link>
              <Link href="/treatments/invisalign-clear-aligners" className="hover:text-white transition-colors">INVISALIGN®</Link>
              <Link href="/#goclear" className="hover:text-white transition-colors">GOCLEAR</Link>
              <Link href="/#clinic-gallery" className="hover:text-white transition-colors">GALLERY</Link>
              <Link href="/#doctor" className="hover:text-white transition-colors">OUR DOCTOR</Link>
              <Link href="/#testimonials" className="hover:text-white transition-colors">REVIEWS</Link>
              <Link href="/#journal" className="hover:text-white transition-colors text-[#FAF8F2]/60">JOURNAL</Link>
              <Link href="/faq" className="hover:text-white transition-colors text-[#FAF8F2]/90 font-bold">FAQ</Link>
              <Link href="/booking" className="hover:text-[#8FA36C] text-[#FAF8F2] transition-colors font-bold">APPOINTMENT</Link>
            </div>
          </div>

        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#FAF8F2]/50 gap-2">
          <p>© {new Date().getFullYear()} Dr. Preethi&apos;s Dentistry. All rights reserved. Saibaba Colony, Coimbatore.</p>
          <div className="flex items-center gap-4">
            <Link href="/#faq" className="hover:text-[#FAF8F2] transition-colors">FAQ</Link>
            <Link href="/blog" className="hover:text-[#FAF8F2] transition-colors">Doctor&apos;s Journal</Link>
            <Link href="/privacy" className="hover:text-[#FAF8F2] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FAF8F2] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

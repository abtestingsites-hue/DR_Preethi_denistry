"use client";

import React, { useState } from "react";
import { Phone, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const MediumCtaBanner: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "Invisalign & Clear Aligners",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="bg-[#FAF8F2] text-[#29291F]">
      
      {/* Top Olive Ribbon Banner matching all other sections */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90 block">
              COMPREHENSIVE CONSULTATION &amp; CARE
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              WANT TO BEGIN YOUR SMILE JOURNEY?
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <a
              href={`tel:${clinicInfo.phoneRaw}`}
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
            >
              <Phone className="w-4 h-4 text-[#7B8052]" />
              <span>Call {clinicInfo.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Form and Location Two-Column Card with Full Width Alignment & 3D Depth Shadows */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
          
          {/* Left Column: Interactive Consultation Contact Form */}
          <div className="lg:col-span-7 bg-[#F5F0E6] p-6 sm:p-7 rounded-[22px] border border-[#A5A786]/40 shadow-elevated flex flex-col justify-between">
            <div>
              <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#FAF8F2] px-3 py-1 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
                DIRECT INQUIRY
              </span>
              <h3 className="text-[20px] sm:text-[23px] font-serif font-bold text-[#29291F] mt-2">
                Send a Consultation Request
              </h3>
              <p className="text-[12px] text-[#29291F]/70 mt-0.5 mb-4">
                Our clinic team will confirm your consultation slot via call or WhatsApp.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#7B8052]/10 border border-[#7B8052] text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-[#7B8052] mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-[#29291F]">Thank You, {formData.name || "Patient"}!</h4>
                  <p className="text-xs text-[#29291F]/80">
                    Your consultation request has been received. Our reception desk will contact you at {formData.phone || "your phone"} shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#7B8052] hover:underline pt-1 block mx-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10.5px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs sm:text-[13px] focus:outline-none focus:border-[#7B8052]"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs sm:text-[13px] focus:outline-none focus:border-[#7B8052]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                      Treatment Interested In
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs sm:text-[13px] focus:outline-none focus:border-[#7B8052]"
                    >
                      <option>Invisalign &amp; Clear Aligners</option>
                      <option>GoClear Aligners</option>
                      <option>Needle-Free Treatment</option>
                      <option>Orthodontics &amp; Ceramic Braces</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Veneers</option>
                      <option>Dental Implants</option>
                      <option>Root Canal Treatment</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10.5px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                      Notes or Preferred Time
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific dental concerns or preferred timing..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs sm:text-[13px] focus:outline-none focus:border-[#7B8052]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-[0.08em] hover:bg-[#686D42] transition-all shadow-md"
                  >
                    Request Appointment →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps & Location Card */}
          <div className="lg:col-span-5 bg-[#FAF8F2] p-5 sm:p-6 rounded-[22px] border border-[#A5A786]/40 shadow-elevated flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#F5F0E6] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
                CLINIC DETAILS
              </span>
              <h3 className="text-[22px] sm:text-[24px] font-serif font-bold text-[#29291F] mt-2">
                Visit Dr. Preethi&apos;s Dentistry
              </h3>
              <p className="text-[13px] text-[#29291F]/70 mt-1 leading-relaxed">
                {clinicInfo.fullAddress}
              </p>
            </div>

            {/* Google Map Iframe with subtle styling */}
            <div className="rounded-[18px] overflow-hidden border border-[#A5A786]/30 aspect-[4/3] w-full shadow-subtle">
              <iframe
                title="Dr. Preethi's Dentistry Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.291753303649!2d76.9423697!3d11.0167232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859068037b587%3A0xd6fe6b1bcfd194c5!2sDr.Preethi&#39;s%20Dentistry!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-[12px] font-semibold text-[#7B8052]">
              <a
                href={`https://wa.me/${clinicInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={clinicInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5 text-[#29291F]"
              >
                <span>Google Maps Directions →</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

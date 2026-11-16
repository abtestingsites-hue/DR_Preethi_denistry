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
    <section id="contact-section" className="bg-white text-[#666666]">
      
      {/* Top Banner - Pista Green card styling */}
      <div className="bg-[#93C572] text-[#1E3014] py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#7EAF5E] relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-bold text-[#1E3014]/90 block">
              COMPREHENSIVE CONSULTATION &amp; CARE
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#0F1E08]">
              WANT TO BEGIN YOUR SMILE JOURNEY?
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <a
              href={`tel:${clinicInfo.phoneRaw}`}
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#465239] transition-all shadow-md group"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call {clinicInfo.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Form and Location Two-Column Card: Centered Container with Compact Scale */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
          
          {/* Left Column: Interactive Consultation Contact Form */}
          <div className="lg:col-span-7 bg-[#F2F5ED] p-5 sm:p-6 rounded-[20px] border border-[#E5E8E1] shadow-elevated flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7B8052] bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#E5E8E1] shadow-sm">
                DIRECT INQUIRY
              </span>
              <h3 className="text-[18px] sm:text-[21px] font-serif font-bold text-black mt-1.5">
                Send a Consultation Request
              </h3>
              <p className="text-[11.5px] text-[#666666] mt-0.5 mb-3">
                Our clinic team will confirm your consultation slot via call or WhatsApp.
              </p>

              {submitted ? (
                <div className="p-5 rounded-2xl bg-white border border-[#7B8052] text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-9 h-9 text-[#7B8052] mx-auto" />
                  <h4 className="text-base font-serif font-bold text-black">Thank You, {formData.name || "Patient"}!</h4>
                  <p className="text-[11px] text-[#666666]">
                    Your consultation request has been received. Our reception desk will contact you at {formData.phone || "your phone"} shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[10.5px] font-bold uppercase tracking-wider text-[#7B8052] hover:underline pt-1 block mx-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-black block mb-0.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E8E1] text-black text-xs placeholder:text-[#666666]/50 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-black block mb-0.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E8E1] text-black text-xs placeholder:text-[#666666]/50 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-black block mb-0.5">
                      Treatment Interested In
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E8E1] text-black text-xs focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
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
                    <label className="text-[10px] uppercase font-bold tracking-wider text-black block mb-0.5">
                      Notes or Preferred Time
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific dental concerns or preferred timing..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E8E1] text-black text-xs placeholder:text-[#666666]/50 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                    />
                  </div>

                  <div className="pt-0.5">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-[0.08em] hover:bg-[#465239] transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      <span>Request Appointment</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps & Location Card */}
          <div className="lg:col-span-5 bg-[#F2F5ED] p-5 sm:p-6 rounded-[20px] border border-[#E5E8E1] shadow-elevated flex flex-col justify-between space-y-2.5">
            <div>
              <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#7B8052] bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#E5E8E1] shadow-sm">
                CLINIC DETAILS
              </span>
              <h3 className="text-[17px] sm:text-[19px] font-serif font-bold text-black mt-1">
                Visit Dr. Preethi&apos;s Dentistry
              </h3>
              <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">
                {clinicInfo.fullAddress}
              </p>
            </div>

            {/* Google Map Iframe with matching proportion and subtle border */}
            <div className="rounded-[12px] overflow-hidden border border-[#E5E8E1] aspect-[16/10] w-full shadow-subtle relative min-h-[140px]">
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

            <div className="pt-1 flex items-center justify-between text-[10.5px] font-semibold text-[#7B8052]">
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
                className="hover:underline flex items-center gap-1.5 text-black hover:text-[#7B8052]"
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

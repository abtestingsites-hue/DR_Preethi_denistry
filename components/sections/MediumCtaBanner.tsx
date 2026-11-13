"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, MapPin, Mail, Clock, CheckCircle } from "lucide-react";
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
    <section id="contact-section" className="bg-[#FAF8F2] text-[#29291F] py-16 sm:py-24 px-6 sm:px-12 border-t border-[#A5A786]/30">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Banner Top Header */}
        <div className="bg-[#7B8052] text-[#FAF8F2] py-8 px-8 sm:px-12 rounded-3xl torn-edge-top torn-edge-bottom shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              WANT TO BEGIN YOUR SMILE JOURNEY?
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#FAF8F2]/85 font-medium">
              SCHEDULE YOUR COMPREHENSIVE DENTAL CONSULTATION IN SAIBABA COLONY
            </p>
          </div>
          <a
            href={`tel:${clinicInfo.phoneRaw}`}
            className="shrink-0 px-6 py-3 rounded-full bg-[#FAF8F2] text-[#29291F] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#7B8052]" />
            <span>Call {clinicInfo.phoneDisplay}</span>
          </a>
        </div>

        {/* Form and Location Two-Column Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Consultation Contact Form */}
          <div className="lg:col-span-7 bg-[#F5F0E6] p-8 sm:p-12 rounded-3xl border border-[#A5A786]/40 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#7B8052] bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/40">
                DIRECT INQUIRY
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F] mt-3">
                Send a Consultation Request
              </h3>
              <p className="text-xs sm:text-sm text-[#29291F]/70 mt-1 mb-8">
                Our clinic team will confirm your consultation slot via call or WhatsApp.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#7B8052]/10 border border-[#7B8052] text-center space-y-3 animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-[#7B8052] mx-auto" />
                  <h4 className="text-xl font-serif font-bold text-[#29291F]">Thank You, {formData.name || "Patient"}!</h4>
                  <p className="text-sm text-[#29291F]/80">
                    Your consultation request has been received. Our reception desk will contact you at {formData.phone || "your phone"} shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-wider text-[#7B8052] hover:underline pt-2 block mx-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/50 text-sm text-[#29291F] focus:outline-none focus:border-[#7B8052]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 098765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/50 text-sm text-[#29291F] focus:outline-none focus:border-[#7B8052]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                      Preferred Treatment
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/50 text-sm text-[#29291F] focus:outline-none focus:border-[#7B8052]"
                    >
                      <option>Invisalign & Clear Aligners</option>
                      <option>Orthodontic Braces Treatment</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Veneers & Smile Makeover</option>
                      <option>Dental Implants</option>
                      <option>Root Canal Treatment</option>
                      <option>Comprehensive Oral Examination</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold tracking-wider text-[#29291F]/80 block mb-1">
                      Message / Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share any specific dental concerns or preferred appointment days..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#A5A786]/50 text-sm text-[#29291F] focus:outline-none focus:border-[#7B8052] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#7B8052] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#555B38] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Request Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Clinic Location & Interactive Map Preview */}
          <div className="lg:col-span-5 bg-[#F5F0E6] p-8 sm:p-10 rounded-3xl border border-[#A5A786]/40 shadow-card flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#7B8052] bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/40">
                  CLINIC DETAILS
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#29291F] mt-3">
                  Visit Dr. Preethi's Dentistry
                </h3>
              </div>

              {/* Location details */}
              <div className="space-y-3.5 text-sm text-[#29291F]/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7B8052] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#29291F] block text-xs uppercase tracking-wider">Address</span>
                    <span className="leading-relaxed">{clinicInfo.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#7B8052] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#29291F] block text-xs uppercase tracking-wider">Working Hours</span>
                    <span>Mon – Sat: 10:00 AM – 08:00 PM<br/>Sunday: By Prior Appointment</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#7B8052] shrink-0" />
                  <div>
                    <span className="font-bold text-[#29291F] block text-xs uppercase tracking-wider">Phone</span>
                    <span>{clinicInfo.phoneDisplay}</span>
                  </div>
                </div>
              </div>

              {/* Map embed / Directions container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#A5A786]/50 aspect-[16/9] shadow-sm bg-[#FAF8F2]">
                <iframe
                  title="Dr. Preethi's Dentistry Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417772658826!2d76.94052187480869!3d11.028045689136366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859062eb1d9e9%3A0xe21a60cfb90d2358!2sDr.Preethi's%20Dentistry!5e0!3m2!1sen!2sin!4v1730272000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter contrast-[0.95] opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://wa.me/${clinicInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#7B8052] hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dr. Preethi's Dentistry, Saibaba Colony, Coimbatore")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#29291F] hover:text-[#7B8052]"
                >
                  <span>Google Maps Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

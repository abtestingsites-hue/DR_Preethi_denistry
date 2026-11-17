"use client";

import React, { useState } from "react";
import { Phone, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const MediumCtaBanner: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "Invisalign & Clear Aligners",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          phoneNumber: formData.phone,
          treatmentSlug: formData.treatment,
          notes: formData.message,
          source: "WEBSITE",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please call the clinic directly.");
    } finally {
      setSubmitting(false);
    }
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

      {/* Form and Location Two-Column Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Interactive Consultation Contact Form */}
          <div className="lg:col-span-7 bg-[#F5F0E6] p-5 sm:p-6 rounded-[20px] border border-[#A5A786]/40 shadow-elevated flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#FAF8F2] px-2.5 py-0.5 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
                DIRECT INQUIRY
              </span>
              <h3 className="text-[18px] sm:text-[21px] font-serif font-bold text-[#29291F] mt-1.5">
                Send a Consultation Request
              </h3>
              <p className="text-[11.5px] text-[#29291F]/70 mt-0.5 mb-3">
                Our clinic team will confirm your consultation slot via call or WhatsApp.
              </p>

              {submitted ? (
                <div className="p-5 rounded-2xl bg-[#7B8052]/10 border border-[#7B8052] text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-9 h-9 text-[#7B8052] mx-auto" />
                  <h4 className="text-base font-serif font-bold text-[#29291F]">Thank You, {formData.name || "Patient"}!</h4>
                  <p className="text-[11px] text-[#29291F]/80">
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
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#29291F] block mb-0.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs placeholder:text-[#29291F]/40 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#29291F] block mb-0.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs placeholder:text-[#29291F]/40 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#29291F] block mb-0.5">
                      Treatment Interested In
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
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
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#29291F] block mb-0.5">
                      Notes or Preferred Time
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific dental concerns or preferred timing..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] text-xs placeholder:text-[#29291F]/40 focus:outline-none focus:border-[#7B8052] focus:ring-1 focus:ring-[#7B8052]/40 transition-all shadow-subtle"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px]">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-0.5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-[0.08em] hover:bg-[#686D42] disabled:opacity-60 transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      <span>{submitting ? "Submitting Request..." : "Request Appointment"}</span>
                      {!submitting && <span className="transition-transform group-hover:translate-x-1">→</span>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Standalone Location Pin Mask Map (NO background card) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-2">
            
            {/* Location Pin Shape containing the exact clinic location map */}
            <div className="relative filter drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              <div 
                className="w-[220px] h-[285px] sm:w-[240px] sm:h-[310px] relative overflow-hidden bg-white p-1 border-2 border-[#7B8052]/20"
                style={{
                  clipPath: "path('M 120,0 C 186.27,0 240,53.73 240,120 C 240,180 152.73,261.82 120,310 C 87.27,261.82 0,180 0,120 C 0,53.73 53.73,0 120,0 Z')"
                }}
              >
                <iframe
                  title="Dr. Preethi's Dentistry Google Maps Pin Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.291753303649!2d76.9402281!3d11.019515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8596732572851%3A0xd96470fbd3a71db1!2sDr.%20Preethi&#39;s%20Dentistry!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Subtle border outline over pin */}
                <div className="absolute inset-0 border-4 border-[#7B8052]/35 pointer-events-none rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%]" />
              </div>
              
              {/* Pin Tip Ground Pulse Dot */}
              <div className="w-8 h-2 bg-[#29291F]/25 rounded-full mx-auto blur-[1.5px] mt-1.5" />
            </div>

            {/* Typography directly underneath the pin */}
            <div className="text-center mt-3.5 space-y-1">
              <h4 className="text-[17px] sm:text-[18px] font-serif font-bold text-[#29291F]">
                Dr. Preethi&apos;s Dentistry
              </h4>
              <p className="text-[12.5px] text-[#7B8052] font-semibold">
                Saibaba Colony, Coimbatore
              </p>
              <p className="text-[11px] text-[#29291F]/70 max-w-xs mx-auto leading-relaxed font-light">
                Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road
              </p>
              
              {/* Actions below address */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-semibold">
                <a
                  href={`https://wa.me/${clinicInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7B8052] hover:underline"
                >
                  WhatsApp Desk
                </a>
                <span className="text-[#A5A786]">·</span>
                <a
                  href="https://maps.app.goo.gl/UCy9MqjMcKPTzWp69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#29291F] hover:text-[#7B8052] hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Shield, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { clinicInfo, buildWhatsAppBookingUrl } from "@/data/clinicInfo";
import { treatmentsData } from "@/data/treatmentsData";

function BookingFormInner() {
  const searchParams = useSearchParams();
  const preselectedTreatment = searchParams.get("treatment") || "";

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    treatment: preselectedTreatment || "Invisalign & Clear Aligners",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM – 01:00 PM)",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = "Please enter your full name";
    }

    const phoneClean = formData.mobile.replace(/[\s-]/g, "");
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!phoneClean) {
      errs.mobile = "Please enter your mobile number";
    } else if (!phoneRegex.test(phoneClean)) {
      errs.mobile = "Please enter a valid 10-digit Indian mobile number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a preferred consultation date";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitted(true);

    const waUrl = buildWhatsAppBookingUrl({
      name: formData.name,
      mobile: formData.mobile,
      treatment: formData.treatment,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
    });

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
      
      {/* Left Column (7 Cols ~ 58.3% Golden Ratio): Booking Form */}
      <div className="lg:col-span-7 bg-[#FAF8F2] p-6 sm:p-8 lg:p-9 rounded-[24px] border border-[#A5A786]/40 shadow-elevated flex flex-col justify-between">
        {isSubmitted ? (
          <div className="text-center py-12 space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#F5F0E6] text-[#7B8052] flex items-center justify-center mx-auto border border-[#A5A786]/40">
              <CheckCircle2 className="w-7 h-7 text-[#7B8052]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#29291F]">Appointment Request Initiated</h2>
            <p className="text-xs sm:text-sm text-[#29291F]/70 max-w-md mx-auto leading-relaxed font-light">
              Thank you, {formData.name}. We are transferring your booking details to Dr. Preethi&apos;s Dentistry reception on WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsAppBookingUrl({
                  name: formData.name,
                  mobile: formData.mobile,
                  treatment: formData.treatment,
                  preferredDate: formData.preferredDate,
                  preferredTime: formData.preferredTime,
                  message: formData.message,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#7B8052] text-white text-xs font-semibold hover:bg-[#686D42] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Continue on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                Patient Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Anandhi Sundar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border text-xs sm:text-sm text-[#29291F] outline-none transition-colors ${
                  errors.name ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border text-xs sm:text-sm text-[#29291F] outline-none transition-colors ${
                    errors.mobile ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                  }`}
                />
                {errors.mobile && <p className="text-[11px] text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border text-xs sm:text-sm text-[#29291F] outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Treatment Select */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                Preferred Treatment *
              </label>
              <select
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs sm:text-sm text-[#29291F] outline-none transition-colors"
              >
                {treatmentsData.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title}
                  </option>
                ))}
                <option value="General Consultation">General Consultation / First Visit</option>
              </select>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border text-xs sm:text-sm text-[#29291F] outline-none transition-colors ${
                    errors.preferredDate ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                  Preferred Time Window *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs sm:text-sm text-[#29291F] outline-none transition-colors"
                >
                  <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                  <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM)</option>
                  <option value="Evening (05:00 PM – 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#29291F] mb-1.5">
                Additional Notes / Concerns (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any specific dental concerns or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs sm:text-sm text-[#29291F] outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#7B8052] hover:bg-[#686D42] text-white font-semibold text-xs uppercase tracking-[0.08em] transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Request Appointment via WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
              </button>
              <p className="text-[11px] text-center text-[#29291F]/60 mt-2">
                Submitting will open our clinic WhatsApp line with your pre-filled consultation details.
              </p>
            </div>

          </form>
        )}
      </div>

      {/* Right Column (5 Cols ~ 41.7% Golden Ratio): Guidelines & Image Card matching bottom baseline */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
        
        {/* Guidelines Card */}
        <div className="p-6 sm:p-7 rounded-[24px] bg-[#FAF8F2] border border-[#A5A786]/40 shadow-elevated space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5F0E6] text-[#7B8052] flex items-center justify-center border border-[#A5A786]/30">
              <Shield className="w-4 h-4 text-[#7B8052]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#29291F]">Appointment Guidelines</h3>
              <p className="text-[11px] text-[#29291F]/65">What to expect during your booking</p>
            </div>
          </div>

          <div className="space-y-3 text-[12px] text-[#29291F]/75 leading-relaxed font-light">
            <p>
              • <strong>Prompt Confirmation:</strong> Our reception will review your requested time slot and confirm availability via WhatsApp or phone.
            </p>
            <p>
              • <strong>Invisalign Consultations:</strong> Includes initial bite assessment, orthodontic examination, and digital feasibility review.
            </p>
            <p>
              • <strong>Transparent Care:</strong> Treatment plans are customized strictly following in-person clinical diagnostics.
            </p>
          </div>

          <div className="pt-3 border-t border-[#A5A786]/25 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#29291F]/70 uppercase tracking-wider font-bold">Reception Line:</p>
              <p className="text-sm font-bold text-[#7B8052] mt-0.5">{clinicInfo.phoneDisplay}</p>
            </div>
            <a
              href={`tel:${clinicInfo.phoneRaw}`}
              className="p-2.5 rounded-full bg-[#7B8052] text-white hover:bg-[#686D42] transition-colors shadow-sm"
              aria-label="Call clinic"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Visual Reminder Card - Height calculated to match Left Column bottom border exactly */}
        <div className="rounded-[24px] overflow-hidden bg-[#FAF8F2] border border-[#A5A786]/40 shadow-elevated flex-1 min-h-[170px] relative group">
          <img
            src="/Clinic.png"
            alt="Clinic Reception Lounge"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-serif font-bold drop-shadow-md">
            Dr. Preethi&apos;s Dentistry · Saibaba Colony, Coimbatore
          </div>
        </div>

      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-24 md:pt-28 pb-12 bg-[#F5F0E6] min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* Edge-aligned full width container matching Navbar & Footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Compact Header matching single page viewport */}
        <div className="max-w-3xl mb-6">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B8052] font-bold bg-[#FAF8F2] px-3 py-1 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
            Seamless Scheduling
          </span>
          <h1 className="text-[26px] sm:text-[34px] font-serif font-bold text-[#29291F] mt-2 tracking-tight leading-tight">
            Book Your{" "}
            <span className="italic text-[#7B8052] font-normal">
              Dental Consultation
            </span>
          </h1>
          <p className="text-[#29291F]/75 text-[13px] sm:text-[14px] mt-1 leading-[1.45] font-light">
            Select your preferred treatment, date, and time. Your request is transmitted directly to Dr. Preethi&apos;s Dentistry for swift WhatsApp confirmation.
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs text-[#29291F]/60">Loading booking form...</div>}>
          <BookingFormInner />
        </Suspense>

      </div>
    </div>
  );
}

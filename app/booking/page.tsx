"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Shield, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Form Container */}
      <div className="lg:col-span-7 bg-[#FAF7F0] p-8 sm:p-12 rounded-[36px] border border-[#DCD4C4] shadow-card">
        {isSubmitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center mx-auto border border-[#DCD4C4]">
              <CheckCircle2 className="w-8 h-8 text-[#7C8052]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#292820]">Appointment Request Initiated</h2>
            <p className="text-sm text-[#6B6858] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. We are transferring your booking details to Dr. Preethi's Dentistry reception on WhatsApp.
            </p>
            <div className="pt-4">
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7C8052] text-white text-xs font-semibold hover:bg-[#64683E] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Continue on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                Patient Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Anandhi Sundar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border text-sm text-[#292820] outline-none transition-colors ${
                    errors.name ? "border-red-500" : "border-[#DCD4C4] focus:border-[#7C8052]"
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border text-sm text-[#292820] outline-none transition-colors ${
                    errors.mobile ? "border-red-500" : "border-[#DCD4C4] focus:border-[#7C8052]"
                  }`}
                />
                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border text-sm text-[#292820] outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-[#DCD4C4] focus:border-[#7C8052]"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Treatment Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                Preferred Treatment *
              </label>
              <select
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4] focus:border-[#7C8052] text-sm text-[#292820] outline-none transition-colors"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border text-sm text-[#292820] outline-none transition-colors ${
                    errors.preferredDate ? "border-red-500" : "border-[#DCD4C4] focus:border-[#7C8052]"
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                  Preferred Time Window *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4] focus:border-[#7C8052] text-sm text-[#292820] outline-none transition-colors"
                >
                  <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                  <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM)</option>
                  <option value="Evening (05:00 PM – 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#292820] mb-2">
                Additional Notes / Concerns (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention any specific dental symptoms or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F0E6] border border-[#DCD4C4] focus:border-[#7C8052] text-sm text-[#292820] outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#7C8052] hover:bg-[#64683E] text-white font-semibold text-sm transition-all shadow-float flex items-center justify-center gap-2 group"
              >
                <span>Request Appointment via WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
              </button>
              <p className="text-xs text-center text-[#6B6858] mt-3">
                Submitting will open our clinic WhatsApp line with your pre-filled consultation details.
              </p>
            </div>

          </form>
        )}
      </div>

      {/* Right Column: Verified Clinic Assurance */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-8 rounded-[36px] bg-[#FAF7F0] border border-[#DCD4C4] shadow-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] text-[#7C8052] flex items-center justify-center border border-[#DCD4C4]">
              <Shield className="w-5 h-5 text-[#7C8052]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#292820]">Appointment Guidelines</h3>
              <p className="text-xs text-[#6B6858]">What to expect during your booking</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B6858] leading-relaxed">
            <p>
              • <strong>Prompt Confirmation:</strong> Our reception will review your requested time slot and confirm availability via WhatsApp or telephone.
            </p>
            <p>
              • <strong>Invisalign Consultations:</strong> Includes initial bite assessment, orthodontic examination, and discussion of clear aligner feasibility.
            </p>
            <p>
              • <strong>Transparent Care:</strong> Treatment plans are customized strictly following in-person clinical diagnostics.
            </p>
          </div>

          <div className="pt-4 border-t border-[#DCD4C4]">
            <p className="text-xs text-[#292820] font-bold">Immediate Reception Line:</p>
            <p className="text-base font-bold text-[#7C8052] mt-1">{clinicInfo.phoneDisplay}</p>
          </div>
        </div>

        {/* Visual Reminder */}
        <div className="rounded-[32px] overflow-hidden aspect-[16/10] bg-[#FAF7F0] border border-[#DCD4C4] shadow-subtle">
          <img
            src="/Clinic.png"
            alt="Clinic Reception"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-32 pb-20 bg-[#F5F0E6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
            Seamless Scheduling
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
            Book Your{" "}
            <span className="italic text-[#7C8052] font-medium">
              Dental Consultation
            </span>
          </h1>
          <p className="text-[#6B6858] text-lg mt-4 leading-relaxed font-normal">
            Select your preferred treatment, date, and time. Your request is transmitted directly to Dr. Preethi's Dentistry for swift confirmation.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-sm text-[#6B6858]">Loading booking form...</div>}>
          <BookingFormInner />
        </Suspense>

      </div>
    </div>
  );
}

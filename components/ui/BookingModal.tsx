"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Shield, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { clinicInfo, buildWhatsAppBookingUrl } from "@/data/clinicInfo";
import { treatmentsData } from "@/data/treatmentsData";

export const BookingModal: React.FC = () => {
  const { isOpen, preselectedTreatment, closeBookingModal } = useBookingModal();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    treatment: "Invisalign & Clear Aligners",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM – 01:00 PM)",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: preselectedTreatment }));
    }
  }, [preselectedTreatment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBookingModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeBookingModal]);

  if (!isOpen) return null;

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
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={closeBookingModal}
        className="fixed inset-0 bg-[#29291F]/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card: Scaled to match Contact Section standard */}
      <div className="relative z-10 w-full max-w-4xl bg-[#FAF8F2] rounded-[24px] border border-[#A5A786]/40 shadow-2xl overflow-hidden my-auto animate-scale-up">
        
        {/* Modal Header Bar */}
        <div className="bg-[#7B8052] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-[#555B38]/30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF8F2]/90 block">
              APPOINTMENT DESK
            </span>
            <h2 className="text-[17px] sm:text-[19px] font-serif font-bold text-white leading-tight">
              Book Consultation with Dr. Preethi
            </h2>
          </div>

          <button
            onClick={closeBookingModal}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Inner Grid: Golden Ratio Split (7 Cols : 5 Cols) */}
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch bg-[#FAF8F2]">
          
          {/* Left Column (7 Cols): Compact Booking Form */}
          <div className="lg:col-span-7 bg-[#F5F0E6] p-5 sm:p-6 rounded-[20px] border border-[#A5A786]/35 shadow-subtle flex flex-col justify-between">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-11 h-11 rounded-full bg-[#FAF8F2] text-[#7B8052] flex items-center justify-center mx-auto border border-[#A5A786]/40">
                  <CheckCircle2 className="w-6 h-6 text-[#7B8052]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#29291F]">Consultation Request Transmitted</h3>
                <p className="text-[11.5px] text-[#29291F]/75 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Opening WhatsApp line to connect with clinic reception.
                </p>
                <div className="pt-2">
                  <button
                    onClick={closeBookingModal}
                    className="px-5 py-2 rounded-full bg-[#7B8052] text-white text-[11px] font-semibold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anandhi Sundar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border text-xs text-[#29291F] outline-none transition-colors ${
                      errors.name ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                    }`}
                  />
                  {errors.name && <p className="text-[9.5px] text-red-500 mt-0.5">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border text-xs text-[#29291F] outline-none transition-colors ${
                        errors.mobile ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                      }`}
                    />
                    {errors.mobile && <p className="text-[9.5px] text-red-500 mt-0.5">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border text-xs text-[#29291F] outline-none transition-colors ${
                        errors.email ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                    Preferred Treatment *
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs text-[#29291F] outline-none"
                  >
                    {treatmentsData.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                    <option value="General Consultation">General Consultation / First Visit</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border text-xs text-[#29291F] outline-none ${
                        errors.preferredDate ? "border-red-500" : "border-[#A5A786]/40 focus:border-[#7B8052]"
                      }`}
                    />
                    {errors.preferredDate && <p className="text-[9.5px] text-red-500 mt-0.5">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                      Time Window *
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs text-[#29291F] outline-none"
                    >
                      <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                      <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM)</option>
                      <option value="Evening (05:00 PM – 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#29291F] mb-0.5">
                    Notes / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific questions or concerns..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#A5A786]/40 focus:border-[#7B8052] text-xs text-[#29291F] outline-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#7B8052] hover:bg-[#686D42] text-white font-semibold text-xs uppercase tracking-[0.08em] transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Request Appointment via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 Cols): Compact Guidelines & Clinic Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 bg-[#FAF8F2]">
            <div className="p-4 sm:p-5 rounded-[20px] bg-[#F5F0E6] border border-[#A5A786]/35 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#7B8052] text-white flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#29291F]">Booking Protocol</h4>
                  <p className="text-[10px] text-[#29291F]/65">Direct confirmation with clinic reception</p>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#29291F]/80 leading-relaxed font-light">
                <p>• <strong>Instant Confirmation:</strong> Our reception reviews and locks your slot via WhatsApp or phone call.</p>
                <p>• <strong>Invisalign Diagnostics:</strong> Includes digital scan and clinical orthodontic consultation.</p>
              </div>

              <div className="pt-2 border-t border-[#A5A786]/25 flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-[#29291F]/60">Reception Line:</p>
                  <p className="text-xs font-bold text-[#7B8052]">{clinicInfo.phoneDisplay}</p>
                </div>
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="p-1.5 rounded-full bg-[#7B8052] text-white hover:bg-[#686D42] transition-colors shadow-sm"
                  aria-label="Call clinic"
                >
                  <Phone className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Compact Clinic Image Card */}
            <div className="rounded-[18px] overflow-hidden border border-[#A5A786]/35 relative aspect-[16/10] shadow-subtle min-h-[120px]">
              <img
                src="/Clinic.png"
                alt="Clinic Lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 text-white text-[10.5px] font-serif font-bold drop-shadow-md">
                Saibaba Colony, Coimbatore
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

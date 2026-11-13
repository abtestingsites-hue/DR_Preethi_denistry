import React from "react";
import { TestimonialsCarouselSection, AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Patient Testimonials | Dr. Preethi's Dentistry Coimbatore",
  description: "Read genuine patient reviews and orthodontic experiences from Dr. Preethi's Dentistry in Saibaba Colony, Coimbatore.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-24 bg-[#F8F8F5]">
      <TestimonialsCarouselSection />
      <div className="pb-16">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}


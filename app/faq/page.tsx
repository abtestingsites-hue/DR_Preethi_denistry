import React from "react";
import { FAQSection, AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Frequently Asked Questions | Dr. Preethi's Dentistry Coimbatore",
  description: "Find clear answers to questions about Invisalign clear aligners, orthodontic treatment, appointment booking, and dental procedures.",
};

export default function FAQPage() {
  return (
    <div className="pt-24 bg-[#F8F8F5]">
      <FAQSection isPage={true} />
      <div className="pb-16">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}


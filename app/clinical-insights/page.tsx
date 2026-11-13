import React from "react";
import { ClinicalVideoSection } from "@/components/sections/ClinicalVideoSection";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Clinical Insights & Video Library | Dr. Preethi's Dentistry",
  description: "Educational videos and dental insights directly hosted by Dr. Preethi's Dentistry. Explore clear aligners, oral hygiene techniques, and smile care.",
};

export default function ClinicalInsightsPage() {
  return (
    <div className="pt-24 bg-[#F8F8F5]">
      <ClinicalVideoSection isPage={true} />
      <div className="pb-16">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}


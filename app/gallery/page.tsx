import React from "react";
import { ClinicGallerySection } from "@/components/sections/ClinicGallerySection";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Clinic Gallery | Dr. Preethi's Dentistry Coimbatore",
  description: "View our authentic clinic photographs, treatment suites, sterilisation facilities, and clear aligner consultation environment in Saibaba Colony, Coimbatore.",
};

export default function GalleryPage() {
  return (
    <div className="pt-24 bg-[#F8F8F5]">
      <ClinicGallerySection isPage={true} />
      <div className="pb-16">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}


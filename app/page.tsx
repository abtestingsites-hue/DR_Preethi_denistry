import React from "react";
import { EditorialHero } from "@/components/sections/EditorialHero";
import { NeedleFreeSection } from "@/components/sections/NeedleFreeSection";
import { ServicesGallerySection } from "@/components/sections/ServicesGallerySection";
import { GoClearAlignersSection } from "@/components/sections/GoClearAlignersSection";
import { InstagramReelsSection } from "@/components/sections/InstagramReelsSection";
import { ClinicGallerySection } from "@/components/sections/ClinicGallerySection";
import { MeetDoctorSection } from "@/components/sections/MeetDoctorSection";
import { MediumPartnershipTestimonials } from "@/components/sections/MediumPartnershipTestimonials";
import { HomeJournalSection } from "@/components/sections/HomeJournalSection";
import { HomeFaqSection } from "@/components/sections/HomeFaqSection";
import { AlignerAssessmentWidget } from "@/components/sections/AlignerAssessmentWidget";
import { MediumCtaBanner } from "@/components/sections/MediumCtaBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Landing Page UI Animation: DR. PREETHI'S handwriting animation + background clinic aesthetic */}
      <EditorialHero />

      {/* 2. Clinic Speciality Innovation: Needle-Free Dental Care (Our Expertise) */}
      <NeedleFreeSection />

      {/* 3. Treatments: Advanced Orthodontic & Dental Care with Promoted Speciality Highlight */}
      <ServicesGallerySection />

      {/* 4. Clinical Insights: Video Library with Instagram Reels */}
      <InstagramReelsSection />

      {/* 5. GoClear Clear Aligners: Positioned strategically BEFORE the Clinic Environment Gallery */}
      <GoClearAlignersSection />

      {/* 5b. Interactive Clear Aligner Smile Assessment Tool */}
      <AlignerAssessmentWidget />

      {/* 6. Clinic Environment Gallery */}
      <ClinicGallerySection />

      {/* 7. Meet Our Doctor Section */}
      <MeetDoctorSection />

      {/* 8. Verified Patient Testimonials with Horizontal Smooth Carousel */}
      <MediumPartnershipTestimonials />

      {/* 9. Doctor's Clinical Journal */}
      <HomeJournalSection />

      {/* 11. Consultation Request & Location Map */}
      <MediumCtaBanner />
    </div>
  );
}

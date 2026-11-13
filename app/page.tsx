import React from "react";
import { EditorialHero } from "@/components/sections/EditorialHero";
import { ServicesGallerySection } from "@/components/sections/ServicesGallerySection";
import { InstagramReelsSection } from "@/components/sections/InstagramReelsSection";
import { ClinicGallerySection } from "@/components/sections/ClinicGallerySection";
import { MeetDoctorSection } from "@/components/sections/MeetDoctorSection";
import { MediumPartnershipTestimonials } from "@/components/sections/MediumPartnershipTestimonials";
import { HomeJournalSection } from "@/components/sections/HomeJournalSection";
import { HomeFaqSection } from "@/components/sections/HomeFaqSection";
import { MediumCtaBanner } from "@/components/sections/MediumCtaBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Landing Page UI Animation: DR. PREETHI'S handwriting animation + background clinic aesthetic */}
      <EditorialHero />

      {/* 2. Below Hero: "CARE DESIGNED AROUND YOUR SMILE / TREATMENTS" ribbon & gallery-style image cards */}
      <ServicesGallerySection />

      {/* 3. Below Treatments: "WATCH OUR CLINICAL INSIGHTS" video reels */}
      <InstagramReelsSection />

      {/* 4. Clinics Gallery Section */}
      <ClinicGallerySection />

      {/* 5. Meet Our Doctor Section */}
      <MeetDoctorSection />

      {/* 6. "OUR GOAL IS TO CREATE LASTING PARTNERSHIPS" style Testimonials section with horizontal scroll */}
      <MediumPartnershipTestimonials />

      {/* 7. Restored Clinical Journal & Doctor's Articles Section */}
      <HomeJournalSection />

      {/* 8. Restored Frequently Asked Questions Section */}
      <HomeFaqSection />

      {/* 9. "WANT TO BEGIN YOUR SMILE JOURNEY?" Contact Consultation Form & Clinic Location Map Section */}
      <MediumCtaBanner />
    </div>
  );
}

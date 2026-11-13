/**
 * Clinical Video Library Data Model
 * Strictly independent video assets without social API dependencies.
 */

export interface ClinicalVideo {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category:
    | "Invisalign & Clear Aligners"
    | "Dental Awareness"
    | "Oral Hygiene"
    | "Treatment Education"
    | "Smile Care"
    | "Clinic Updates"
    | "Patient Education";
  duration: string;
  orientation: "portrait" | "landscape" | "square";
  publishedAt: string;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
}

export const clinicalVideosData: ClinicalVideo[] = [
  {
    id: "video-1",
    title: "Understanding Invisalign & Clear Aligner Precision",
    slug: "understanding-invisalign-clear-aligner-precision",
    description: "A clinical walkthrough of how custom orthodontic aligners gently guide dental arches into balanced occlusion without metal brackets.",
    videoUrl: "/videos/teeth-scan.mp4",
    thumbnailUrl: "/aligner-presentation.png",
    category: "Invisalign & Clear Aligners",
    duration: "1:24",
    orientation: "landscape",
    publishedAt: "2026-10-15",
    displayOrder: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "video-2",
    title: "Smile Aesthetics & Digital Treatment Planning",
    slug: "smile-aesthetics-digital-treatment-planning",
    description: "Exploring 3D intraoral simulation and modern treatment pathways for healthy, functional smile transformations.",
    videoUrl: "/videos/teeth-hero.mp4",
    thumbnailUrl: "/Clinic.png",
    category: "Smile Care",
    duration: "2:08",
    orientation: "landscape",
    publishedAt: "2026-10-22",
    displayOrder: 2,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "video-3",
    title: "Everyday Oral Hygiene & Enamel Preservation",
    slug: "everyday-oral-hygiene-enamel-preservation",
    description: "Doctor-recommended cleaning techniques, interdental care, and how routine hygiene prevents advanced gum inflammation.",
    videoUrl: "/videos/Teeth.mp4",
    thumbnailUrl: "/Clinic3.png",
    category: "Oral Hygiene",
    duration: "1:45",
    orientation: "landscape",
    publishedAt: "2026-11-02",
    displayOrder: 3,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "video-4",
    title: "Orthodontic Aligners vs Traditional Braces",
    slug: "orthodontic-aligners-vs-traditional-braces",
    description: "Comparing clinical lifestyle considerations, maintenance, oral hygiene advantages, and treatment predictability.",
    videoUrl: "/videos/teeth-scan.mp4",
    thumbnailUrl: "/aligner-isolated-tray.png",
    category: "Treatment Education",
    duration: "1:15",
    orientation: "landscape",
    publishedAt: "2026-11-05",
    displayOrder: 4,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "video-5",
    title: "Preventive Dental Care & Routine Checkup Protocol",
    slug: "preventive-dental-care-routine-protocol",
    description: "What to expect during a comprehensive dental consultation and how early diagnostic assessment safeguards your teeth.",
    videoUrl: "/videos/teeth-hero.mp4",
    thumbnailUrl: "/Clinic5.png",
    category: "Dental Awareness",
    duration: "1:32",
    orientation: "landscape",
    publishedAt: "2026-11-08",
    displayOrder: 5,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "video-6",
    title: "Inside the Sterilisation & Clinical Environment",
    slug: "inside-sterilisation-clinical-environment",
    description: "A tour of Dr. Preethi's Dentistry clinical hygiene standards, autoclave protocols, and comfortable patient seating.",
    videoUrl: "/videos/Teeth.mp4",
    thumbnailUrl: "/Clinic2.png",
    category: "Clinic Updates",
    duration: "1:50",
    orientation: "landscape",
    publishedAt: "2026-11-10",
    displayOrder: 6,
    isFeatured: false,
    isPublished: true,
  },
];


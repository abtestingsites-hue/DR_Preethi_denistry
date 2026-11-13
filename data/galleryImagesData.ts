export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "Clinic Interior" | "Dental Equipment" | "Treatment Rooms" | "Invisalign" | "Clinic Environment" | "Doctor and Team";
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export const galleryImagesData: GalleryItem[] = [
  {
    id: "gal-1",
    imageUrl: "/Clinic.png",
    title: "Reception & Consultation Lounge",
    category: "Clinic Interior",
    description: "Serene, welcoming reception ambiance designed with natural warmth and minimalist aesthetics.",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "gal-2",
    imageUrl: "/Doctor.png",
    title: "Dr. Preethi Subramanian — Clinical Consultation",
    category: "Doctor and Team",
    description: "Dr. Preethi discussing personalised orthodontic smile planning with attentive patient care.",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "gal-3",
    imageUrl: "/aligner-presentation.png",
    title: "Precision Clear Aligner Consultation Kit",
    category: "Invisalign",
    description: "Authentic clear aligner demonstration tray and digital orthodontic alignment plan.",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "gal-4",
    imageUrl: "/Clinic2.png",
    title: "Primary Treatment Operatory",
    category: "Treatment Rooms",
    description: "State-of-the-art dental operatory unit equipped with high-comfort ergonomic chair and lighting.",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "gal-5",
    imageUrl: "/Clinic3.png",
    title: "Ultrasonic Prophylaxis & Restorative Suite",
    category: "Dental Equipment",
    description: "Advanced dental armamentarium maintaining rigorous infection control and clinical hygiene.",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "gal-6",
    imageUrl: "/Clinic4.png",
    title: "Specialised Endodontic & Implant Suite",
    category: "Treatment Rooms",
    description: "Modern clinical workspace dedicated to precision endodontics and restorative procedures.",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "gal-7",
    imageUrl: "/aligner-isolated-tray.png",
    title: "Invisalign Custom Aligner Arch",
    category: "Invisalign",
    description: "Ultra-clear medical-grade polyurethane aligner custom-moulded to the patient's dental arch.",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "gal-8",
    imageUrl: "/Clinic5.png",
    title: "Comfort Patient Area",
    category: "Clinic Environment",
    description: "Thoughtfully composed clinical environment focused on calm, stress-free patient experiences.",
    displayOrder: 8,
    isActive: true,
  },
  {
    id: "gal-9",
    imageUrl: "/Clinic6.png",
    title: "Advanced Sterilisation & Preparation Bay",
    category: "Dental Equipment",
    description: "Class-B autoclave and medical instrument sterilisation maintaining international safety standards.",
    displayOrder: 9,
    isActive: true,
  },
  {
    id: "gal-10",
    imageUrl: "/Clinic7.png",
    title: "Orthodontic Diagnostic Station",
    category: "Clinic Interior",
    description: "Clean, clutter-free consultation area for reviewing treatment simulations and progress.",
    displayOrder: 10,
    isActive: true,
  },
];


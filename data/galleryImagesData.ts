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
    imageUrl: "/Clinic7.png",
    title: "Signature Orthodontic Operatory Suite",
    category: "Treatment Rooms",
    description: "Modern clinical suite with circular architectural ambient illumination and ergonomic dental unit.",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "gal-3",
    imageUrl: "/goclear-case-tray.png",
    title: "Precision Clear Aligner Case & Arch Tray",
    category: "Invisalign",
    description: "Authentic custom clear aligner in ergonomic travel case for discreet orthodontic alignment.",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "gal-4",
    imageUrl: "/Clinic2.png",
    title: "Primary Treatment Operatory & Glass Corridor",
    category: "Treatment Rooms",
    description: "State-of-the-art dental operatory unit equipped with high-comfort ergonomic chair and lighting.",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "gal-5",
    imageUrl: "/Clinic3.png",
    title: "Ultrasonic Prophylaxis & Operatory Station",
    category: "Dental Equipment",
    description: "Advanced dental armamentarium maintaining rigorous infection control and clinical hygiene.",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "gal-6",
    imageUrl: "/Clinic4.png",
    title: "Specialised Endodontic & Restorative Suite",
    category: "Treatment Rooms",
    description: "Modern clinical workspace dedicated to precision diagnostics, restorative, and clear aligner procedures.",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "gal-7",
    imageUrl: "/needle-free-device.jpg",
    title: "Needle-Free Jet Anesthesia System",
    category: "Dental Equipment",
    description: "Modern titanium micro-jet anesthesia delivery system for painless dental procedures.",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "gal-8",
    imageUrl: "/Clinic5.png",
    title: "Natural Light Operatory & Sterilisation Bay",
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


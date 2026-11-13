export interface TestimonialItem {
  id: string;
  patientDisplayName: string;
  review: string;
  rating: number;
  source: string;
  treatmentCategory?: string;
  isApproved: boolean;
  displayOrder: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t-1",
    patientDisplayName: "Kavitha R.",
    review: "Dr. Preethi's approach to Invisalign was so transparent and reassuring. Every step of the aligner plan was clearly explained, and the clinic ambiance is remarkably calm and modern.",
    rating: 5,
    source: "Verified Google Review",
    treatmentCategory: "Invisalign / Clear Aligners",
    isApproved: true,
    displayOrder: 1,
  },
  {
    id: "t-2",
    patientDisplayName: "Santhosh Kumar",
    review: "I had been hesitant about orthodontic correction as an adult. Dr. Preethi made the entire consultation feel effortless and comfortable. The attention to clinical hygiene is top tier.",
    rating: 5,
    source: "Verified Google Review",
    treatmentCategory: "Orthodontics",
    isApproved: true,
    displayOrder: 2,
  },
  {
    id: "t-3",
    patientDisplayName: "Deepa Natarajan",
    review: "Very professional and patient-centric clinic in Saibaba Colony. Scaling and tooth restoration were completely painless. Dr. Preethi took time to answer all my questions.",
    rating: 5,
    source: "Verified Patient Feedback",
    treatmentCategory: "Restorative Dentistry",
    isApproved: true,
    displayOrder: 3,
  },
  {
    id: "t-4",
    patientDisplayName: "Arun V.",
    review: "The clinic environment is immaculate. Exceptional clarity in diagnosis, no hurried consultations, and genuine advice for my family's dental care.",
    rating: 5,
    source: "Verified Google Review",
    treatmentCategory: "General Dental Care",
    isApproved: true,
    displayOrder: 4,
  },
];

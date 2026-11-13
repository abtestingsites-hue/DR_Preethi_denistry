export interface FAQItem {
  id: string;
  category: "Invisalign" | "Orthodontics" | "Treatments" | "Appointments" | "General Dental Care" | "Clinic Information";
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Invisalign",
    question: "How do Invisalign clear aligners work?",
    answer: "Invisalign uses a series of custom-made, clear plastic aligners that apply gentle, controlled force to gradually move teeth into their ideal positions. Each set is worn for 1 to 2 weeks before advancing to the next series under clinical supervision.",
  },
  {
    id: "faq-2",
    category: "Invisalign",
    question: "Are clear aligners noticeable when speaking or smiling?",
    answer: "No. Invisalign aligners are manufactured from medical-grade transparent thermoplastic, making them virtually invisible during daily social and professional interactions.",
  },
  {
    id: "faq-3",
    category: "Invisalign",
    question: "How many hours per day do I need to wear my aligners?",
    answer: "For optimal predictability, aligners must be worn for 20 to 22 hours each day, taken out only when eating, drinking anything other than plain cool water, and brushing.",
  },
  {
    id: "faq-4",
    category: "Orthodontics",
    question: "What is the ideal age for an orthodontic consultation?",
    answer: "The general recommendation is an initial orthodontic check around age 7 to evaluate jaw growth and dental eruption. However, orthodontic correction and clear aligners are highly effective for teens and adults of any age.",
  },
  {
    id: "faq-5",
    category: "Treatments",
    question: "Is professional scaling painful or damaging to tooth enamel?",
    answer: "No. Modern ultrasonic scaling uses delicate micro-vibrations and water cooling to dislodge hardened plaque and calculus without scraping or eroding natural tooth enamel.",
  },
  {
    id: "faq-6",
    category: "Appointments",
    question: "How do I schedule an appointment at Dr. Preethi's Dentistry?",
    answer: "You can book directly through our online appointment form on this website, which connects immediately with our verified WhatsApp line for swift confirmation, or by calling our clinic number.",
  },
  {
    id: "faq-7",
    category: "Clinic Information",
    question: "Where is the clinic located in Coimbatore?",
    answer: "Dr. Preethi's Dentistry is conveniently located on the Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road, Saibaba Colony, Coimbatore, Tamil Nadu 641043.",
  },
  {
    id: "faq-8",
    category: "General Dental Care",
    question: "How often should I visit the dentist for a routine checkup?",
    answer: "We recommend scheduling a preventive dental examination and cleaning every 6 months to maintain optimal gum health and detect any early issues before they require complex treatment.",
  },
];

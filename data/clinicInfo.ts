/**
 * Dr. Preethi's Dentistry — Central Configuration & Business Details
 * Verified details strictly adhere to verified parameters from specification.
 * Unverified details remain explicitly marked and configurable.
 */

export interface ClinicHours {
  day: string;
  hours: string;
  isClosed?: boolean;
}

export interface ClinicContactInfo {
  name: string;
  doctorName: string;
  doctorTitle: string;
  professionalPositioning: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  addressVerified: boolean;
  phoneDisplay: string;
  phoneRaw: string;
  phoneVerified: boolean;
  email?: string;
  emailVerified?: boolean;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramUrl: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
  openingHours: ClinicHours[];
  hoursVerified: boolean;
}

export const clinicInfo: ClinicContactInfo = {
  name: "Dr. Preethi's Dentistry",
  doctorName: "Dr. Preethi Subramanian",
  doctorTitle: "Dr. Preethi Subramanian — Orthodontist | Invisalign Provider",
  professionalPositioning: "Orthodontist | Invisalign Provider",
  locality: "Saibaba Colony",
  city: "Coimbatore",
  state: "Tamil Nadu",
  pincode: "641043",
  fullAddress: "Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road, Saibaba Colony, Coimbatore, Tamil Nadu 641043",
  addressVerified: true,
  phoneDisplay: "078128 71829",
  phoneRaw: "+917812871829",
  phoneVerified: true,
  email: "reception@drpreethidentistry.com",
  emailVerified: false,
  whatsappNumber: "917812871829",
  whatsappDisplay: "+91 78128 71829",
  instagramUrl: "https://www.instagram.com/dr_preethi_subramanian/",
  googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Saro+Enclave+7th+Cross+Bharathi+Park+Road+Saibaba+Colony+Coimbatore+641043",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.838339178082!2d76.9388307!3d11.0232454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85888e2c079db%3A0xb36b5ec63259ce36!2sSaibaba%20Colony%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  openingHours: [
    { day: "Monday – Saturday", hours: "10:00 AM – 08:00 PM" },
    { day: "Sunday", hours: "By Prior Appointment Only", isClosed: false },
  ],
  hoursVerified: false, // Configurable pending clinical schedule confirmation
};

/**
 * Builds the verified WhatsApp pre-filled message URL
 */
export function buildWhatsAppBookingUrl(params: {
  name?: string;
  mobile?: string;
  treatment?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}): string {
  const number = clinicInfo.whatsappNumber;
  let text = `Hello Dr. Preethi's Dentistry,\n\nI would like to request an appointment.\n\n`;
  if (params.name) text += `Name: ${params.name}\n`;
  if (params.mobile) text += `Mobile: ${params.mobile}\n`;
  if (params.treatment) text += `Treatment: ${params.treatment}\n`;
  if (params.preferredDate) text += `Preferred Date: ${params.preferredDate}\n`;
  if (params.preferredTime) text += `Preferred Time: ${params.preferredTime}\n`;
  if (params.message) text += `\nAdditional Message: ${params.message}\n`;
  text += `\nPlease let me know the availability.\n\nThank you.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
import { EditorialFooter } from "@/components/layout/EditorialFooter";
import { FloatingActionButtons } from "@/components/ui/FloatingActionButtons";
import { BookingModal } from "@/components/ui/BookingModal";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { clinicInfo } from "@/data/clinicInfo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Preethi's Dentistry | Orthodontist & Invisalign Provider Coimbatore",
  description: "Dr. Preethi Subramanian — Orthodontist & Invisalign Provider in Saibaba Colony, Coimbatore. Experience premium, patient-centred orthodontic and modern dental care.",
  metadataBase: new URL("https://drpreethidentistry.com"),
  openGraph: {
    title: "Dr. Preethi's Dentistry | Orthodontist & Invisalign Provider Coimbatore",
    description: "Personalised orthodontic care, clear aligners, and comprehensive dentistry in Saibaba Colony, Coimbatore.",
    url: "https://drpreethidentistry.com",
    siteName: "Dr. Preethi's Dentistry",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "DentalClinic"],
    name: clinicInfo.name,
    image: "https://drpreethidentistry.com/Doctor.png",
    telephone: clinicInfo.phoneRaw,
    url: "https://drpreethidentistry.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road",
      addressLocality: "Saibaba Colony, Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641043",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.0232454,
      longitude: 76.9388307,
    },
    medicalSpecialty: ["Orthodontics", "DentalHygiene", "PediatricDentistry"],
    priceRange: "$$",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#F5F0E6] text-[#29291F] antialiased font-sans flex flex-col selection:bg-[#7B8052] selection:text-white">
        <BookingModalProvider>
          <GlobalNavbar />
          <main className="flex-1 w-full">{children}</main>
          <EditorialFooter />
          <FloatingActionButtons />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}

import Hero from "@/components/sections/Hero";
import LandingVisuals from "@/components/sections/LandingVisuals";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AirlineCards from "@/components/sections/AirlineCards";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import {
  absoluteUrl,
  SEO_PRIMARY_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
} from "@/lib/seo";

export const metadata = {
  title: "Cheapest and Verified Dummy Flight Ticket",
  description: SITE_DESCRIPTION,
  keywords: [
    "cheap dummy flight tickets",
    "dummy ticket at low price",
    "affordable dummy ticket",
    "verified dummy flight tickets",
    ...SEO_PRIMARY_KEYWORDS,
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${SITE_NAME} — Verified Dummy Ticket at ₹249 / $3`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Verified Dummy Ticket at ₹249 / $3`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function Home() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dummy Ticket for Visa",
    provider: { "@type": "Organization", name: SITE_NAME },
    serviceType: "Flight reservation and travel itinerary support",
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "249",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/book"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Hero />
      <LandingVisuals />
      <HowItWorks />
      <Features />
      <AirlineCards />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

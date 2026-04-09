import { absoluteUrl, SITE_EMAIL, SITE_NAME, SITE_OG_IMAGE, SITE_PHONE_E164 } from "@/lib/seo";

export const metadata = {
  title: "Contact TheDummyTickets | 24/7 Support",
  description:
    "Contact TheDummyTickets for dummy tickets, visa itinerary help, and onward travel support. Available 24/7 via WhatsApp and email.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: `Contact ${SITE_NAME} | 24/7 Support`,
    description:
      "Reach our support team anytime for dummy ticket booking and visa travel documentation help.",
    url: absoluteUrl("/contact"),
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Contact TheDummyTickets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${SITE_NAME} | 24/7 Support`,
    description:
      "24/7 WhatsApp and email support for dummy tickets and visa itinerary questions.",
    images: [SITE_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }) {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: absoluteUrl("/contact"),
    description: "Contact page for dummy ticket booking and visa itinerary support.",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      email: SITE_EMAIL,
      telephone: SITE_PHONE_E164,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      {children}
    </>
  );
}

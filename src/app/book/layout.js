import {
  absoluteUrl,
  SEO_PRIMARY_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_PHONE_E164,
  SITE_URL,
} from "@/lib/seo";

export const metadata = {
  title: "Book Dummy Ticket for Visa | Instant Delivery",
  description:
    "Book verified dummy flight tickets and hotel reservations with valid PNR for visa applications. Delivered in 10-20 minutes.",
  keywords: [
    "book dummy ticket",
    "cheap dummy tickets",
    "dummy ticket booking",
    "instant dummy ticket",
    ...SEO_PRIMARY_KEYWORDS,
  ],
  alternates: { canonical: absoluteUrl("/book") },
  openGraph: {
    title: `Book Dummy Ticket for Visa | ${SITE_NAME}`,
    description:
      "Verified dummy tickets with valid PNR, worldwide coverage, and 24/7 support.",
    url: absoluteUrl("/book"),
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Book Dummy Ticket" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Book Dummy Ticket for Visa | ${SITE_NAME}`,
    description:
      "Book verified dummy tickets with valid PNR for visa and onward travel proof.",
    images: [SITE_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }) {
  const bookingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Book dummy tickets and hotel bookings for visa",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "Worldwide",
    serviceType: "Flight reservation and hotel reservation support for visa applications",
    offers: [
      {
        "@type": "Offer",
        price: "249",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/book"),
      },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/book"),
      servicePhone: SITE_PHONE_E164,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Book", item: absoluteUrl("/book") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

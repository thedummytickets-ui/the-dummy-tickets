import { absoluteUrl, SEO_PRIMARY_KEYWORDS, SITE_NAME, SITE_OG_IMAGE } from "@/lib/seo";

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
  return children;
}

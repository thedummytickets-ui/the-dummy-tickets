import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  SITE_EMAIL,
  SITE_LOCALE,
  SEO_PRIMARY_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_PHONE_E164,
  SITE_SOCIALS,
  SITE_URL,
} from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} — Verified Dummy Ticket at ₹249 / $3`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  category: "Travel Services",
  referrer: "origin-when-cross-origin",
  keywords: SEO_PRIMARY_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [{ url: "/favicon-512.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/favicon-512.png", type: "image/png", sizes: "512x512" }],
    shortcut: ["/favicon-512.png"],
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Verified Dummy Ticket at ₹249 / $3`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Verified Dummy Ticket at ₹249 / $3`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}${SITE_OG_IMAGE}`,
    sameAs: SITE_SOCIALS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE_E164,
      email: SITE_EMAIL,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const travelAgencyJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: SITE_PHONE_E164,
    email: SITE_EMAIL,
    areaServed: "Worldwide",
    sameAs: SITE_SOCIALS,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dummy flight reservation with valid PNR" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dummy hotel booking for visa applications" },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

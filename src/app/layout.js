import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://thedummytickets.com"),
  title: {
    default: "TheDummyTickets — Verified Dummy Ticket at ₹249 / $3",
    template: "%s | TheDummyTickets",
  },
  description:
    "Get verified dummy flight tickets with valid PNR for visa applications. Instant delivery in 10-20 minutes. Starting at just ₹249/$3. 24/7 support.",
  keywords: [
    "dummy ticket", "dummy flight ticket", "dummy ticket for visa",
    "flight reservation for visa", "onward ticket", "proof of return ticket",
    "flight itinerary for visa", "dummy hotel booking",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thedummytickets.com",
    siteName: "TheDummyTickets",
    title: "TheDummyTickets — Verified Dummy Ticket at ₹249 / $3",
    description: "Verified dummy tickets with valid PNR. Instant delivery. 24/7 support.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TheDummyTickets",
    url: "https://thedummytickets.com",
    description: "Verified dummy tickets with valid PNR for visa applications.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9773596446",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

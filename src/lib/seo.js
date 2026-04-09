export const SITE_NAME = "TheDummyTickets";
export const SITE_URL = "https://thedummytickets.com";
export const SITE_LOCALE = "en_US";
export const SITE_PHONE_E164 = "+919773596446";
export const SITE_EMAIL = "thedummytickets@gmail.com";
export const SITE_DESCRIPTION =
  "Get verified dummy flight tickets with valid PNR for visa applications. Instant delivery in 10-20 minutes. Starting at just ₹249/$3. 24/7 support.";
export const SITE_OG_IMAGE = "/logo-final.png";
export const SITE_SOCIALS = [
  "https://wa.me/919773596446",
];
export const SEO_PRIMARY_KEYWORDS = [
  "dummy ticket",
  "dummy flight ticket",
  "cheap dummy tickets",
  "cheap dummy ticket for visa",
  "low cost dummy ticket",
  "dummy ticket for visa",
  "flight reservation for visa",
  "flight itinerary for visa",
  "proof of onward travel",
  "proof of return ticket",
  "onward ticket",
  "dummy hotel booking",
  "schengen flight itinerary",
  "dummy ticket for schengen visa",
  "dummy ticket for uk visa",
  "dummy ticket for us visa",
  "dummy ticket for canada visa",
  "dummy ticket for australia visa",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

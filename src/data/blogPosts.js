/**
 * Blog post metadata and full content for all posts.
 * Used by blog listing and dynamic [slug] page. Image placeholders have alt/caption for when you add images.
 */

export const POSTS = [
  { slug: "what-is-a-dummy-ticket", title: "What Is a Dummy Ticket and Why Do You Need One?", excerpt: "A comprehensive guide to understanding dummy tickets — what they are, how they work, and why travelers worldwide use them.", cat: "Guide", time: "5 min", date: "Feb 28, 2026" },
  { slug: "dummy-ticket-vs-real-ticket", title: "Dummy Ticket vs Real Ticket: Key Differences", excerpt: "Understand the differences and when to use each for visa processing.", cat: "Education", time: "4 min", date: "Feb 25, 2026" },
  { slug: "dummy-ticket-for-visa", title: "How to Use a Dummy Ticket for Visa Applications", excerpt: "Step-by-step guide for Schengen, US, UK, and other visa applications.", cat: "Visa Tips", time: "6 min", date: "Feb 20, 2026" },
  { slug: "countries-onward-travel", title: "Countries That Require Proof of Onward Travel", excerpt: "A detailed list of countries requiring proof of onward or return travel for entry.", cat: "Travel", time: "7 min", date: "Feb 15, 2026" },
  { slug: "schengen-flight-itinerary", title: "Flight Itinerary for Schengen Visa: Complete Guide", excerpt: "Everything you need to know about submitting a flight itinerary for Schengen.", cat: "Schengen", time: "5 min", date: "Feb 10, 2026" },
  { slug: "dummy-hotel-booking", title: "Dummy Hotel Booking for Visa: What You Need to Know", excerpt: "How dummy hotel bookings work and complement your flight reservation.", cat: "Guide", time: "4 min", date: "Feb 5, 2026" },
];

const BODY = {
  "what-is-a-dummy-ticket": [
    { type: "p", text: "When you apply for a visa or plan a trip that involves multiple countries, embassies and immigration officers often ask for proof of onward travel. That’s where a dummy ticket comes in — a flight reservation that looks like a real booking but isn’t a paid ticket. Here’s what it is and why so many travelers use it." },
    { type: "image", alt: "Example of a dummy flight ticket or itinerary document", caption: "A dummy ticket shows your planned route and dates for visa or border checks." },
    { type: "h2", text: "What is a dummy ticket?" },
    { type: "p", text: "A dummy ticket (also called a flight reservation, dummy booking, or itinerary) is a document that looks like a confirmed flight booking. It usually includes your name, dates, route, flight numbers, and a valid PNR (Passenger Name Record). The key difference from a real ticket is that no payment has been made for the actual flight — it’s a reservation held for a short time, or a document generated for visa or proof-of-travel purposes." },
    { type: "h2", text: "Why do you need one?" },
    { type: "p", text: "Many countries and visa schemes require proof that you will leave before your stay expires. A dummy ticket satisfies this “proof of onward travel” requirement without you having to buy an expensive flexible or refundable ticket. You can use it for visa applications (e.g. Schengen, UK, US) or at the border when entering a country that checks for onward travel." },
    { type: "h2", text: "When to use a dummy ticket" },
    { type: "ul", items: ["Schengen, UK, US, or other visa applications that ask for a flight itinerary.", "Entry at the border in countries that require proof of onward or return travel.", "When your real travel plans are not fixed and you don’t want to pay for a real ticket yet.", "When you need a document quickly (often within minutes) to submit with your application."] },
    { type: "p", text: "Using a verified dummy ticket with a valid PNR from a trusted provider helps your application or border check look legitimate and reduces the risk of delays or refusals." },
  ],
  "dummy-ticket-vs-real-ticket": [
    { type: "p", text: "Choosing between a dummy ticket and a real ticket depends on why you need proof of travel. Here’s how they differ and when to use each." },
    { type: "image", alt: "Comparison of dummy ticket vs real ticket documents", caption: "Dummy tickets show reservation details; real tickets confirm payment and boarding." },
    { type: "h2", text: "Dummy ticket (flight reservation)" },
    { type: "p", text: "A dummy ticket is a flight reservation or itinerary document. It typically has a valid PNR, your name, route, dates, and flight details. No full payment is made for the actual flight, so it’s low cost and flexible. It’s meant for visa applications and proof of onward travel, not for boarding a plane." },
    { type: "h2", text: "Real ticket (confirmed booking)" },
    { type: "p", text: "A real ticket is a paid, confirmed booking. You (or someone) have paid the airline or agent. You get an e-ticket number and can board the flight. Real tickets are non-refundable or refundable depending on the fare. They’re required when you actually fly." },
    { type: "h2", text: "Key differences" },
    { type: "ul", items: ["Cost: Dummy tickets are cheap (often a few dollars); real tickets cost full fare.", "Purpose: Dummy = visa/onward travel proof; real = actually flying.", "Verification: Both can have a PNR; dummy is for show, real is for travel.", "Flexibility: With a dummy ticket you can change plans; with a real ticket you’re bound by the fare rules."] },
    { type: "h2", text: "When to use which" },
    { type: "p", text: "Use a dummy ticket when you need to show an itinerary for a visa or at the border but haven’t finalized or paid for flights. Use a real ticket when you’re ready to commit to a flight and need to board. For most visa and onward-travel checks, a verified dummy ticket is enough." },
  ],
  "dummy-ticket-for-visa": [
    { type: "p", text: "Submitting a flight itinerary is a common requirement for tourist and short-stay visas. A dummy ticket lets you meet this requirement without buying a real ticket first. Here’s how to use it correctly for different visa types." },
    { type: "image", alt: "Visa application checklist with flight itinerary", caption: "Many visa applications require a flight itinerary as proof of travel plans." },
    { type: "h2", text: "Schengen visa" },
    { type: "p", text: "Schengen countries usually ask for a round-trip or multi-city flight reservation that matches your entry/exit dates and travel plan. Your dummy ticket should show flights in and out of the Schengen area (or between Schengen countries if applicable). Use dates that align with your application and cover the full trip." },
    { type: "h2", text: "UK visa" },
    { type: "p", text: "UK visa applications often require evidence of travel plans, including flights. A dummy ticket with your name, dates, and route is typically acceptable as a flight reservation. Ensure it looks consistent with your stated itinerary and other documents." },
    { type: "h2", text: "US visa" },
    { type: "p", text: "For US visitor visas, a flight reservation is not always mandatory but can strengthen your case by showing intent to leave. If you provide one, use a dummy ticket that matches your planned entry and exit dates." },
    { type: "h2", text: "General tips" },
    { type: "ul", items: ["Match the dates on your dummy ticket to your application and cover letter.", "Use a service that provides a valid PNR so the reservation can be verified if checked.", "Keep the itinerary realistic (e.g. logical routes and layovers).", "Combine with other proof (accommodation, insurance) for a strong application."] },
    { type: "p", text: "Always check the latest requirements on the official embassy or consulate website for your destination, as rules can change." },
  ],
  "countries-onward-travel": [
    { type: "p", text: "Many countries require proof that you will leave before your stay ends. This is usually shown with an onward or return ticket. Here’s an overview of where this is commonly required and how a dummy ticket can help." },
    { type: "image", alt: "World map or list of countries requiring onward travel", caption: "Several regions require proof of onward or return travel for entry or visa." },
    { type: "h2", text: "Why countries ask for onward travel" },
    { type: "p", text: "Immigration wants to see that you don’t intend to overstay. A return or onward ticket is a simple way to demonstrate that you have a plan to leave. Without it, you may be denied boarding or entry." },
    { type: "h2", text: "Regions and countries that often require it" },
    { type: "p", text: "Requirements vary by country and your nationality. Commonly, proof of onward travel is requested or enforced in:" },
    { type: "ul", items: ["Schengen Area (for visa-free visitors and some visa applicants).", "United Kingdom.", "United States (sometimes at border or for visa).", "Canada.", "Australia and New Zealand.", "Many countries in Southeast Asia (e.g. Thailand, Philippines, Indonesia) for certain nationalities or visa exemptions.", "Several Latin American and Caribbean countries.", "Some Middle Eastern and African destinations."] },
    { type: "h2", text: "What counts as proof" },
    { type: "p", text: "Airlines and border officers usually accept a confirmed flight reservation (itinerary) showing your name and departure from the country. A dummy ticket with a valid PNR is often accepted when you’re not yet ready to buy a real ticket. Always check the specific country’s rules, as some may ask for a paid ticket or e-ticket number." },
    { type: "p", text: "Having a verified dummy ticket ready can save you from last-minute stress or denial at check-in or the border." },
  ],
  "schengen-flight-itinerary": [
    { type: "p", text: "When you apply for a Schengen visa, one of the standard requirements is a flight itinerary or reservation. Here’s what you need to know to submit a document that meets the requirements." },
    { type: "image", alt: "Schengen visa checklist with flight itinerary highlighted", caption: "Flight itinerary is a key supporting document for Schengen visa applications." },
    { type: "h2", text: "What Schengen embassies want" },
    { type: "p", text: "Schengen consulates typically want to see a reservation that shows your intended entry into and exit from the Schengen area. The itinerary should include your name, travel dates, flight numbers, and route. It doesn’t have to be a paid ticket — a reservation with a PNR is usually acceptable." },
    { type: "h2", text: "What to include in your itinerary" },
    { type: "ul", items: ["Your full name as on your passport.", "Entry flight (into Schengen) and exit flight (out of Schengen).", "Dates that match your application and intended stay.", "Flight numbers and airline names.", "PNR or booking reference so it can be verified if needed."] },
    { type: "h2", text: "Round-trip vs multi-city" },
    { type: "p", text: "If you’re entering and leaving from the same country, a round-trip reservation is simplest. If you’re visiting several Schengen countries, a multi-city itinerary that shows your route and exit from the zone is better. Make sure the dates align with your cover letter and travel plan." },
    { type: "h2", text: "Using a dummy ticket for Schengen" },
    { type: "p", text: "A dummy flight itinerary is widely used for Schengen applications because it’s affordable and flexible. Choose a provider that gives you a proper reservation with a valid PNR. Submit it along with your other documents (accommodation, insurance, etc.) so your application is consistent and complete." },
  ],
  "dummy-hotel-booking": [
    { type: "p", text: "Along with a flight itinerary, many visa applications ask for proof of accommodation. A dummy hotel booking is a reservation document that shows where you plan to stay without you having to pay in full upfront. Here’s how it works and how it fits with your dummy ticket." },
    { type: "image", alt: "Example hotel reservation or booking confirmation", caption: "A hotel reservation can support your visa application alongside a flight itinerary." },
    { type: "h2", text: "What is a dummy hotel booking?" },
    { type: "p", text: "A dummy hotel booking is a reservation confirmation that lists your name, dates, and accommodation details. It’s used to satisfy visa or immigration requirements for “proof of accommodation.” Like a dummy ticket, it’s not necessarily a fully paid booking — it’s a document that demonstrates where you intend to stay." },
    { type: "h2", text: "When you need it" },
    { type: "p", text: "Schengen, UK, and several other visa types often require evidence of accommodation for the whole stay. Submitting a hotel reservation (or multiple ones for different cities) alongside your flight itinerary makes your application coherent and can speed up processing." },
    { type: "h2", text: "How it works with your dummy ticket" },
    { type: "p", text: "Your flight itinerary and hotel reservation should tell the same story: same dates, same cities, and a plausible trip. Embassies may cross-check them. So use matching dates and destinations on both documents." },
    { type: "h2", text: "What to look for in a dummy hotel booking" },
    { type: "ul", items: ["Your name and travel dates.", "Hotel name and address.", "Confirmation or reference number if possible.", "Consistency with your flight itinerary and application form."] },
    { type: "p", text: "Together, a dummy ticket and a dummy hotel booking give you a complete travel plan for your visa application without committing to non-refundable payments before approval." },
  ],
};

export function getPostBySlug(slug) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    ...post,
    body: BODY[slug] || [],
  };
}

export function getAllSlugs() {
  return POSTS.map((p) => p.slug);
}

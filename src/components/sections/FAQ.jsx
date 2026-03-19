"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
    { q: "What is a dummy ticket?", a: "A dummy ticket is a real flight reservation with a valid PNR number for visa applications. It shows authorities you have a planned itinerary without committing to an expensive ticket before visa approval." },
    { q: "Is it legal to use a dummy ticket?", a: "Yes — it's a legitimate temporary flight reservation made through airline systems. It simply expires after a certain period. Embassies and immigration authorities accept them as proof of travel plans." },
    { q: "What is the validity period?", a: "Validity ranges from 48 hours to 2–3 weeks depending on the route, airline, and travel dates. Farther dates generally mean longer validity." },
    { q: "Can I verify the PNR?", a: "Yes! Every ticket comes with a genuine PNR verifiable directly on the airline's official website." },
    { q: "How long does delivery take?", a: "We deliver most tickets within 10–20 minutes via email and WhatsApp. In rare cases up to 30 minutes." },
    { q: "What can I use it for?", a: "Visa applications (Schengen, US, UK, etc.), proof of onward travel, visa extensions, passport appointments, and OK-to-board requirements." },
    { q: "Do you provide hotel bookings?", a: "Yes! Verified dummy hotel bookings start at ₹249/$3 with up to 2 bookings and 30 days each." },
    { q: "What's the refund policy?", a: "Since tickets are generated instantly and non-reversible, we don't offer refunds once delivered. However, our 24/7 team resolves any issues immediately." },
    { q: "How do I place an order?", a: "Click 'Order Now', fill in your travel details, and we'll have your ticket ready in 10–20 minutes. You can also WhatsApp us at +91 9773596446." },
];

export default function FAQ() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <section id="faq" className="section-padding bg-gradient-to-b from-teal-100/30 to-teal-50 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-200/15 rounded-full blur-3xl" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500">Everything you need to know about dummy tickets.</p>
                </div>

                <Accordion type="single" collapsible className="space-y-2.5">
                    {FAQS.map((f, i) => (
                        <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            className="bg-white rounded-xl border border-slate-100 px-5 data-[state=open]:shadow-sm data-[state=open]:border-teal-200 transition-all"
                        >
                            <AccordionTrigger className="text-left text-[15px] font-medium text-navy hover:text-teal-700 py-4 hover:no-underline">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

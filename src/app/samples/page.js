import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane, Building, CreditCard, Check, ArrowRight, Shield, FileText } from "lucide-react";

export const metadata = {
    title: "Sample Dummy Tickets — See What You Get",
    description: "Preview sample dummy flight tickets, hotel bookings, and confirmed e-tickets.",
};

const SAMPLES = [
    {
        icon: Plane, title: "Dummy Flight Ticket",
        desc: "A verified flight reservation with active PNR, passenger details, flight number, and route.",
        features: ["Passenger name as per passport", "Valid PNR (verifiable)", "Flight number & airline", "Departure & arrival info", "Booking reference", "Route & class of travel"],
    },
    {
        icon: Building, title: "Dummy Hotel Booking",
        desc: "A verified hotel reservation with booking reference, dates, and guest details.",
        features: ["Hotel name & address", "Booking confirmation number", "Check-in & check-out dates", "Guest name & room type", "Total stay duration", "Verifiable online"],
    },
    {
        icon: CreditCard, title: "Confirmed E-Ticket",
        desc: "A confirmed flight ticket with payment information and e-ticket number.",
        features: ["E-Ticket number", "Payment confirmation", "Passenger & flight info", "No auto-cancellation", "Highest acceptance", "Complete itinerary"],
    },
];

export default function SamplesPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        See What You <span className="text-teal-600">Get</span>
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto">Preview the quality and format of our tickets before ordering.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
                    {SAMPLES.map((s) => (
                        <div key={s.title} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all">
                            <div className="p-5 bg-teal-50 flex items-center gap-3">
                                <div className="h-11 w-11 rounded-xl bg-teal-600 flex items-center justify-center">
                                    <s.icon className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-base font-semibold text-navy font-[family-name:var(--font-outfit)]">{s.title}</h2>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-slate-500 mb-5">{s.desc}</p>
                                <div className="space-y-2 mb-5">
                                    {s.features.map((f) => (
                                        <div key={f} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-teal-500 shrink-0" />
                                            <span className="text-sm text-slate-600">{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center mb-5">
                                    <FileText className="h-8 w-8 text-slate-300 mx-auto mb-1.5" />
                                    <p className="text-xs text-slate-400">Sample image coming soon</p>
                                </div>
                                <Button asChild className="w-full bg-navy hover:bg-navy/90 text-white rounded-full font-semibold">
                                    <Link href="/book">Order This Ticket <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-teal-50 rounded-2xl p-8 text-center border border-teal-100">
                    <Shield className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-navy mb-2 font-[family-name:var(--font-outfit)]">100% Genuine & Verifiable</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">Every ticket contains real, verifiable information. PNR numbers can be checked on the airline&apos;s website.</p>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold">
                        <Link href="/book">Book Your Ticket <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

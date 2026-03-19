"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

const TRUST_POINTS = [
    "Valid PNR & Itinerary",
    "Receive in 10–20 Minutes",
    "Accepted by All Embassies",
    "24/7 WhatsApp Support",
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background video */}
            <div className="absolute inset-0 z-0">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/herobg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-white/2" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Text */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-[family-name:var(--font-outfit)] leading-[1.15] text-navy mb-6">
                            Get <span className="text-teal-600">Verified</span> Dummy
                            <br />Flight Tickets for
                            <br />Visa Applications
                        </h1>

                        <p className="text-lg text-slate-500 mb-8 max-w-md">
                            Instant flight reservation with valid PNR for embassy &amp; visa purposes. Starting at just <strong className="text-navy">₹249 / $3</strong>.
                        </p>

                        {/* Trust checkmarks */}
                        <ul className="space-y-2.5 mb-10">
                            {TRUST_POINTS.map((point) => (
                                <li key={point} className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" />
                                    <span className="text-[15px] text-slate-700 font-medium">{point}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 font-semibold shadow-lg shadow-teal-600/20 group">
                                <Link href="/book">
                                    Book Now
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-6 border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 font-medium">
                                <a href="https://wa.link/01ufkj" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
                                    WhatsApp Us
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right — Stats cards (instead of image) */}
                    <div className="hidden lg:flex flex-col items-end gap-5">
                        {/* Stat cards stacked with offset */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 w-72 animate-float" style={{ animationDelay: "0s" }}>
                            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Tickets Delivered</p>
                            <p className="text-3xl font-bold text-navy font-[family-name:var(--font-outfit)]">10,000+</p>
                            <p className="text-sm text-slate-500 mt-1">Happy travelers worldwide</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 w-72 mr-12 animate-float" style={{ animationDelay: "1s" }}>
                            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Delivery Time</p>
                            <p className="text-3xl font-bold text-navy font-[family-name:var(--font-outfit)]">10-20 min</p>
                            <p className="text-sm text-slate-500 mt-1">Average turnaround</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 w-72 animate-float" style={{ animationDelay: "2s" }}>
                            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Trustpilot Rating</p>
                            <p className="text-3xl font-bold text-navy font-[family-name:var(--font-outfit)]">4.9 ⭐</p>
                            <p className="text-sm text-slate-500 mt-1">Based on 500+ reviews</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
        </section>
    );
}

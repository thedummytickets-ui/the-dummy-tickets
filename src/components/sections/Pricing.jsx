"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Plane, Building, CreditCard } from "lucide-react";

const PLANS = [
    {
        icon: Plane, name: "Dummy Flight Ticket",
        usd: "$3", inr: "₹249", popular: false,
        features: [
            "Verified flight reservation",
            "Up to 2 flights",
            "48 hrs – 21 days validity",
            "Delivery in 10–20 min",
            "Verifiable PNR",
        ],
    },
    {
        icon: Building, name: "Dummy Hotel Booking",
        usd: "$3", inr: "₹249", popular: true,
        features: [
            "Verified hotel reservation",
            "Up to 2 hotel bookings",
            "Up to 30 days each",
            "Delivery in 10–20 min",
            "Verifiable online",
        ],
    },
    {
        icon: CreditCard, name: "Confirmed E-Ticket",
        usd: "$9", inr: "₹749", popular: false,
        features: [
            "Confirmed with payment info",
            "Includes E-Ticket number",
            "1 sector permitted",
            "No auto-cancellation",
            "Highest acceptance rate",
        ],
    },
];

export default function Pricing() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="pricing" ref={ref} className="section-padding bg-gradient-to-b from-teal-50 to-teal-100/40 relative overflow-hidden">
            <div className="absolute top-10 left-0 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl" />
            <div className="relative z-10 mx-auto max-w-5xl">
                <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        Simple, Transparent <span className="text-teal-600">Pricing</span>
                    </h2>
                    <p className="text-slate-500 max-w-md mx-auto">No hidden fees. One-time payment. Instant delivery.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PLANS.map((p, i) => (
                        <div
                            key={p.name}
                            className={`relative bg-white rounded-2xl p-7 border transition-all duration-600 ${p.popular ? "border-teal-300 shadow-lg shadow-teal-100/50 md:-mt-2" : "border-slate-100 hover:border-teal-200 hover:shadow-md"
                                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 150 + 150}ms` }}
                        >
                            {p.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-teal-600 text-white text-[11px] font-semibold px-4 py-1 rounded-full inline-flex items-center gap-1 shadow-md">
                                        <Star className="h-3 w-3 fill-white" /> Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-5 ${p.popular ? "bg-teal-100" : "bg-slate-50"}`}>
                                <p.icon className={`h-5 w-5 ${p.popular ? "text-teal-600" : "text-slate-400"}`} />
                            </div>

                            <h3 className="text-base font-semibold text-navy mb-4 font-[family-name:var(--font-outfit)]">{p.name}</h3>

                            <div className="flex items-baseline gap-1.5 mb-1">
                                <span className="text-3xl font-bold text-navy font-[family-name:var(--font-outfit)]">{p.usd}</span>
                                <span className="text-slate-300">/</span>
                                <span className="text-lg font-semibold text-slate-500">{p.inr}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-6">One-time payment</p>

                            <ul className="space-y-2.5 mb-7">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2">
                                        <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.popular ? "text-teal-500" : "text-slate-400"}`} />
                                        <span className="text-[13px] text-slate-500">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild className={`w-full rounded-full font-semibold ${p.popular ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-navy hover:bg-navy/90 text-white"}`}>
                                <Link href="/book">
                                    Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

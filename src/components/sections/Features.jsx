"use client";

import { useEffect, useRef, useState } from "react";
import { DollarSign, Zap, Headphones, ShieldCheck, Ticket, Users } from "lucide-react";

const FEATURES = [
    { icon: DollarSign, title: "Affordable Price", desc: "Starting at just ₹249 / $3 — the lowest in the market." },
    { icon: Zap, title: "Quick Delivery", desc: "Your ticket is delivered within 10–20 minutes via email or WhatsApp." },
    { icon: Headphones, title: "24/7 Support", desc: "We're available round the clock — holidays, weekends, anytime." },
    { icon: ShieldCheck, title: "Verifiable PNR", desc: "Every ticket includes a real PNR verifiable on the airline website." },
    { icon: Ticket, title: "100% Genuine", desc: "Authentic tickets for visa applications, proof of return, and more." },
    { icon: Users, title: "Free Consultation", desc: "Get free advice on visa requirements and travel documentation." },
];

export default function Features() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="features" ref={ref} className="section-padding bg-gradient-to-br from-white via-teal-50/30 to-white">
            <div className="mx-auto max-w-6xl">
                <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        Why Choose <span className="text-teal-600">TheDummyTickets</span>?
                    </h2>
                    <p className="text-slate-500 max-w-md mx-auto">Everything you need for a hassle-free visa journey.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((f, i) => (
                        <div
                            key={f.title}
                            className={`group bg-white rounded-2xl p-6 border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 80 + 150}ms` }}
                        >
                            <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                                <f.icon className="h-6 w-6 text-teal-600" />
                            </div>
                            <h3 className="text-base font-semibold text-navy mb-1.5 font-[family-name:var(--font-outfit)]">{f.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

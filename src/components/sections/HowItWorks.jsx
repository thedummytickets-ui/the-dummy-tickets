"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, CreditCard, Mail } from "lucide-react";

const STEPS = [
    {
        num: 1,
        icon: ClipboardList,
        title: "Fill Out Form",
        desc: "Enter your travel details — name, route, and dates.",
    },
    {
        num: 2,
        icon: CreditCard,
        title: "Pay Online",
        desc: "Securely after we confirm ticket availability.",
    },
    {
        num: 3,
        icon: Mail,
        title: "Get Your Ticket",
        desc: "Receive your verified ticket via email within minutes.",
    },
];

export default function HowItWorks() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="how-it-works" ref={ref} className="section-padding bg-gradient-to-b from-teal-50 to-teal-100/50 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-200/15 rounded-full blur-3xl" />
            <div className="relative z-10 mx-auto max-w-5xl text-center">
                <h2 className={`text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    How It Works
                </h2>
                <p className={`text-slate-500 mb-14 max-w-lg mx-auto transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    Get a verified dummy ticket in 3 easy steps.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {STEPS.map((s, i) => (
                        <div
                            key={s.num}
                            className={`relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 150 + 200}ms` }}
                        >
                            {/* Number badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                {s.num}
                            </div>

                            <div className="h-14 w-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mt-2 mb-5">
                                <s.icon className="h-7 w-7 text-teal-600" />
                            </div>

                            <h3 className="text-lg font-semibold text-navy mb-2 font-[family-name:var(--font-outfit)]">{s.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>

                <p className={`text-sm text-slate-400 mt-10 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                    Receive a confirmed dummy flight ticket in your inbox to use for visa purposes.
                </p>
            </div>
        </section>
    );
}

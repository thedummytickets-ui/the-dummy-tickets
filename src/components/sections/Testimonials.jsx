"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
    { name: "Rahul S.", country: "India", text: "Got my dummy ticket in 12 minutes! PNR verified on airline website. Schengen visa approved!" },
    { name: "Sarah M.", country: "USA", text: "Needed proof of onward travel for Thailand. Delivered in 15 min. Looked completely genuine." },
    { name: "Ahmed H.", country: "UAE", text: "Best dummy ticket service. Unbeatable price at $3 and the 24/7 support is really helpful." },
    { name: "Priya P.", country: "India", text: "Used hotel booking service for UK visa. Everything verified and legitimate. Highly recommend!" },
    { name: "James W.", country: "UK", text: "Incredible value. Was skeptical at first but PNR checked out on airline's website. Very professional." },
    { name: "Maria S.", country: "Brazil", text: "Free visa consultation was a bonus! They helped me understand requirements perfectly. 5 stars!" },
];

export default function Testimonials() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section ref={ref} className="section-padding bg-gradient-to-br from-white via-teal-50/40 to-teal-50/60">
            <div className="mx-auto max-w-6xl">
                <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        What Our Customers Say
                    </h2>
                    <p className="text-slate-500">Real reviews from verified customers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {REVIEWS.map((r, i) => (
                        <div
                            key={r.name}
                            className={`bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700">
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-navy">{r.name}</p>
                                    <p className="text-xs text-slate-400">{r.country}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DollarSign, Zap, Headphones, ShieldCheck, Ticket, Users, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verifiable PNR",
    desc: "Every reservation uses a real PNR you can check on the airline’s site — the same check embassies trust.",
    highlight: true,
  },
  { icon: DollarSign, title: "Honest pricing", desc: "From ₹249 / $3 — no surprise charges. You see the total before you commit." },
  { icon: Zap, title: "Fast delivery", desc: "Most tickets arrive by email and WhatsApp within 10–20 minutes of payment." },
  { icon: Headphones, title: "24/7 support", desc: "WhatsApp and email, including weekends and holidays — we’re here when you’re stressed." },
  { icon: Ticket, title: "Genuine documents", desc: "Built for visa applications, proof of return, and onward travel — not fake PDFs." },
  { icon: Users, title: "Free guidance", desc: "Ask us about visa paperwork, dates, and what to submit — no extra cost." },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="section-padding relative overflow-hidden bg-[#0f172a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.22),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          className={`max-w-2xl mx-auto text-center mb-14 md:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-3">Why us</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold font-[family-name:var(--font-outfit)] text-white mb-4 leading-tight">
            Why choose <span className="text-teal-400">The Dummy Tickets</span>?
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Verified dummy tickets — professional, embassy-friendly, and built for real travel paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`
                group relative overflow-hidden rounded-2xl border transition-all duration-500
                ${f.highlight
                  ? "border-teal-400/50 bg-gradient-to-br from-teal-950/90 via-[#0c1222] to-[#0f172a] p-7 md:p-8 shadow-[0_0_48px_-14px_rgba(45,212,191,0.4)] ring-1 ring-inset ring-teal-500/20"
                  : "border-white/10 bg-white/[0.04] p-6 md:p-7 hover:bg-white/[0.07] hover:border-teal-500/25"
                }
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: visible ? `${i * 70 + 80}ms` : "0ms" }}
            >
              {f.highlight && (
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl" />
              )}
              <div
                className={`
                  mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105
                  ${f.highlight ? "bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30" : "bg-white/10 text-teal-400 ring-1 ring-white/10"}
                `}
              >
                <f.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className={`font-[family-name:var(--font-outfit)] mb-2 ${f.highlight ? "text-xl md:text-2xl font-bold text-white" : "text-lg font-semibold text-white"}`}>
                {f.title}
              </h3>
              <p className={`leading-relaxed ${f.highlight ? "text-slate-300 text-[15px]" : "text-sm text-slate-400"}`}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: visible ? "450ms" : "0ms" }}
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
          >
            Get your verified ticket
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

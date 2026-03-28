"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import Link from "next/link";
import { ClipboardList, CreditCard, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Fill out the form",
    desc: "Passenger names as on passport, route, dates, and contact — takes under two minutes.",
  },
  {
    num: "02",
    icon: CreditCard,
    title: "Confirm & pay",
    desc: "We verify availability, then you pay securely. No hidden fees — pricing is upfront.",
  },
  {
    num: "03",
    icon: Mail,
    title: "Receive your ticket",
    desc: "Verified itinerary with PNR lands in your email and WhatsApp, usually within 10–20 minutes.",
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-[#f8fafc] to-white"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,56rem)] h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-0">
        <div
          className={`max-w-2xl mx-auto text-center mb-14 md:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">Simple process</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold font-[family-name:var(--font-outfit)] text-[#1e293b] mb-4 leading-tight">
            How it <span className="text-teal-600">works</span>
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed">
            Three clear steps from request to a document you can submit to embassies or show at check-in.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-[5.5rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-100 via-teal-300 to-teal-100 rounded-full"
            aria-hidden
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {STEPS.map((s, i) => (
              <Fragment key={s.num}>
                <div
                  className={`relative transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: visible ? `${i * 120 + 100}ms` : "0ms" }}
                >
                  <div className="relative h-full rounded-3xl border border-slate-200/90 bg-white p-8 pt-10 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-20px_rgba(13,148,136,0.2)] hover:border-teal-200/70 transition-all duration-300">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-600/25 ring-4 ring-white">
                        <s.icon className="h-5 w-5" strokeWidth={2.2} />
                      </div>
                    </div>

                    <p className="text-center lg:text-left font-mono text-[11px] font-bold tracking-widest text-teal-600/80 mb-3 mt-4 lg:mt-6">
                      STEP {s.num}
                    </p>
                    <h3 className="text-center lg:text-left text-xl font-bold text-[#1e293b] font-[family-name:var(--font-outfit)] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-center lg:text-left text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div
          className={`mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: visible ? "500ms" : "0ms" }}
        >
          <Button asChild className="rounded-full bg-teal-600 hover:bg-teal-700 text-white px-8 font-semibold shadow-md shadow-teal-600/20">
            <Link href="/book">
              Start your booking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-slate-500 text-center sm:text-left">
            Confirmed dummy flight ticket in your inbox — ready for visa use.
          </p>
        </div>
      </div>
    </section>
  );
}

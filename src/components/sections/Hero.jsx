"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, MessageCircle, Ticket, Clock, Star, Sparkles } from "lucide-react";

const TRUST_POINTS = [
  "Valid PNR & Itinerary",
  "Receive in 10–20 Minutes",
  "Accepted by All Embassies",
  "24/7 WhatsApp Support",
];

const STATS = [
  {
    label: "Tickets delivered",
    value: "10,000+",
    sub: "Happy travelers worldwide",
    icon: Ticket,
    offset: "lg:translate-x-0",
  },
  {
    label: "Delivery time",
    value: "10–20 min",
    sub: "Average turnaround",
    icon: Clock,
    offset: "lg:-translate-x-10",
  },
  {
    label: "Trustpilot rating",
    value: "4.9",
    sub: "Based on 500+ reviews",
    icon: Sparkles,
    offset: "lg:translate-x-4",
    star: true,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/herobg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-white/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-28 md:pt-32 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-[family-name:var(--font-outfit)] leading-[1.15] text-navy mb-6">
              Get <span className="text-teal-600">Verified</span> Dummy
              <br />
              Flight Tickets for
              <br />
              Visa Applications
            </h1>

            <p className="text-lg text-slate-500 mb-8 max-w-md">
              Instant flight reservation with valid PNR for embassy &amp; visa purposes. Starting at just{" "}
              <strong className="text-navy">₹249 / $3</strong>.
            </p>

            <ul className="space-y-2.5 mb-10">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" />
                  <span className="text-[15px] text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 font-semibold shadow-lg shadow-teal-600/20 group"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 font-medium"
              >
                <a href="https://wa.link/01ufkj" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          {/* Stats — desktop */}
          <div className="hidden lg:flex flex-col items-end justify-center gap-6 pr-2 xl:pr-6">
            <div className="relative w-full max-w-[20rem] xl:max-w-[22rem]">
              <div
                className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-teal-200/80 to-transparent hidden xl:block"
                aria-hidden
              />
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative mb-6 last:mb-0 transition-transform duration-500 ${s.offset}`}
                >
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/85 backdrop-blur-md px-6 py-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2)] ring-1 ring-slate-200/40 animate-float hover:shadow-[0_28px_60px_-24px_rgba(13,148,136,0.25)] hover:border-teal-200/60 hover:bg-white/95 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-teal-400 to-teal-600 opacity-90" />
                    <div className="flex gap-4 pl-2">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/80 text-teal-700 shadow-inner ring-1 ring-teal-100 group-hover:from-teal-100 group-hover:to-teal-50 transition-colors">
                        <s.icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-600 mb-1">{s.label}</p>
                        <p className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl xl:text-[2rem] font-bold text-navy font-[family-name:var(--font-outfit)] leading-none tracking-tight">
                            {s.value}
                          </span>
                          {s.star && (
                            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-hidden>
                              <Star className="h-6 w-6 fill-amber-400 shrink-0 drop-shadow-sm" strokeWidth={0} />
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-slate-500 mt-1.5 leading-snug">{s.sub}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats — mobile / tablet strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:hidden">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/80 bg-white/90 backdrop-blur-sm px-2 py-3 sm:px-3 sm:py-4 text-center shadow-md shadow-slate-200/40"
              >
                <s.icon className="h-5 w-5 mx-auto mb-1.5 text-teal-600" strokeWidth={2} />
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-teal-600 leading-tight mb-1 line-clamp-2">{s.label}</p>
                <p className="text-lg sm:text-xl font-bold text-navy font-[family-name:var(--font-outfit)] flex items-center justify-center gap-0.5">
                  {s.value}
                  {s.star && <Star className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
    </section>
  );
}

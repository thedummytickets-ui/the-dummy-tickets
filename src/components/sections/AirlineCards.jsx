"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FileText, ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIRLINES = [
  { name: "Air India", logo: "/logo/air-india.png", ticket: "/tickets/air_india  watermark (1).pdf" },
  { name: "Emirates", logo: "/logo/emirates.jpeg", ticket: "/tickets/emirated watermarked .pdf" },
  { name: "Qatar Airways", logo: "/logo/qatar-airways.png", ticket: "/tickets/qatar water marked .pdf" },
  { name: "British Airways", logo: "/logo/british-airways.png", ticket: "/tickets/british tickets  watermarked .pdf" },
  { name: "KLM", logo: "/logo/klm.png", ticket: "/tickets/KLM watermarked .pdf" },
  { name: "Air Canada", logo: "/logo/canada.png", ticket: "/tickets/aircanada watermarked .pdf" },
  { name: "Thai Airways", logo: "/logo/thai.png", ticket: "/tickets/thai watermarked .pdf" },
  { name: "EgyptAir", logo: "/logo/egypt-air.png", ticket: "/tickets/egyptair final bookmark.pdf" },
  { name: "Garuda Indonesia", logo: "/logo/garuda.jpeg", ticket: "/tickets/garuda  watermarked .pdf" },
];

export default function AirlineCards() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sample-tickets"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d9488' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-slate-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          className={`mx-auto max-w-2xl text-center mb-12 md:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700 shadow-sm mb-5">
            <Ticket className="h-3.5 w-3.5" />
            Sample tickets
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold font-[family-name:var(--font-outfit)] text-[#1e293b] mb-4 leading-tight">
            Preview real <span className="text-teal-600">watermarked</span> samples
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed">
            Tap an airline to open its PDF — same layout you get on delivery, with a preview watermark removed when you order.
          </p>
        </div>

        <div
          className={`rounded-[1.75rem] border border-slate-200/90 bg-white p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {AIRLINES.map((airline, idx) => (
              <a
                key={airline.name}
                href={encodeURI(airline.ticket)}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/90
                  shadow-sm transition-all duration-300
                  hover:border-teal-300/80 hover:shadow-[0_12px_40px_-16px_rgba(13,148,136,0.35)] hover:-translate-y-0.5
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{ transitionDelay: visible ? `${idx * 45}ms` : "0ms" }}
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-1 flex-col items-center justify-center aspect-[5/4] sm:aspect-[3/2] px-3 pt-4 pb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(airline.logo)}
                    alt={`${airline.name} logo`}
                    className="max-h-[72%] max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <FileText className="h-3 w-3 text-teal-600" />
                    Open PDF
                  </span>
                </div>
                <div className="border-t border-dashed border-slate-200/90 bg-slate-50/50 px-3 py-2.5 text-center">
                  <span className="text-xs font-semibold text-slate-700 font-[family-name:var(--font-outfit)] line-clamp-1">
                    {airline.name}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100 pt-8">
            <p className="text-sm text-slate-500 text-center sm:text-left max-w-md">
              <span className="font-medium text-slate-700">Watermarked previews only.</span> Your paid ticket arrives clean, with a verifiable PNR.
            </p>
            <Button
              asChild
              variant="outline"
              className="shrink-0 rounded-full border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 font-semibold"
            >
              <Link href="/samples">
                All sample types
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

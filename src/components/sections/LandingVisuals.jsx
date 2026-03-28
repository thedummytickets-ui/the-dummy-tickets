"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    src: "/blog images/blog image -1 .jpeg",
    alt: "Sample flight itinerary and dummy ticket document for visa applications",
    caption: "Itinerary & PNR",
    className:
      "col-span-2 row-span-2 min-h-[220px] sm:min-h-[280px] md:min-h-[340px]",
  },
  {
    src: "/blog images/passport pic blog .jpeg",
    alt: "Passport with travel documents ready for embassy submission",
    caption: "Passport-ready",
    className: "col-span-2 min-h-[140px] sm:min-h-[160px]",
  },
  {
    src: "/blog images/confirmed status for blog .png",
    alt: "Confirmed booking status on airline verification",
    caption: "Verifiable status",
    className: "col-span-1 min-h-[120px] sm:min-h-[140px]",
  },
  {
    src: "/blog images/blog image 3.jpeg",
    alt: "Travel planning and visa documentation",
    caption: "Your journey",
    className: "col-span-1 min-h-[120px] sm:min-h-[140px]",
  },
  {
    src: "/blog images/dummy ticket org for blog .jpeg",
    alt: "TheDummyTickets professional booking service",
    caption: "Trusted service",
    className: "col-span-2 min-h-[150px] sm:min-h-[180px]",
  },
  {
    src: "/blog images/blog image 4.jpeg",
    alt: "Global travel and onward journey proof",
    caption: "Worldwide travel",
    className: "col-span-2 min-h-[150px] sm:min-h-[180px]",
  },
];

export default function LandingVisuals() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="landing-visuals-heading"
      className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/80 to-teal-50/20"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          className={`mb-12 md:mb-14 text-center md:text-left md:flex md:items-end md:justify-between gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">Real outcomes</p>
            <h2
              id="landing-visuals-heading"
              className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy leading-tight mb-4"
            >
              From <span className="text-teal-600">passport</span> to{" "}
              <span className="text-teal-600">boarding</span> — we help you look the part
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Genuine-looking reservations, clear documentation, and the same attention to detail embassies expect — without the full fare upfront.
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0 group"
          >
            Visa &amp; travel guides
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {TILES.map((tile, i) => (
            <figure
              key={tile.src}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 hover:shadow-md hover:border-teal-200/60 hover:-translate-y-0.5 transition-all duration-500 ${tile.className}`}
              style={{ transitionDelay: visible ? `${i * 60}ms` : "0ms" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(tile.src)}
                alt={tile.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent opacity-90 md:opacity-80 group-hover:opacity-95 transition-opacity" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 drop-shadow-sm">
                  {tile.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

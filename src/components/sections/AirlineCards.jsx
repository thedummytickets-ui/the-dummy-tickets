"use client";

import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const AIRLINES = [
  { name: "Air India", logo: "/logo/air india logo.png", ticket: "/tickets/air_india  watermark (1).pdf" },
  { name: "Emirates", logo: "/logo/emirates logo png.png", ticket: "/tickets/emirated watermarked .pdf" },
  { name: "Qatar Airways", logo: "/logo/qatar logo.jpg", ticket: "/tickets/qatar water marked .pdf" },
  { name: "British Airways", logo: "/logo/british air logo.jpg", ticket: "/tickets/british tickets  watermarked .pdf" },
  { name: "KLM", logo: "/logo/KLM logo.png", ticket: "/tickets/KLM watermarked .pdf" },
  { name: "Air Canada", logo: "/logo/air canada logo.png", ticket: "/tickets/aircanada watermarked .pdf" },
  { name: "Thai Airways", logo: "/logo/thai logo.png", ticket: "/tickets/thai watermarked .pdf" },
  { name: "EgyptAir", logo: "/logo/egypt air logo.png", ticket: "/tickets/egyptair final bookmark.pdf" },
  { name: "Garuda Indonesia", logo: "/logo/garuda logo.png", ticket: "/tickets/garuda  watermarked .pdf" },
];

export default function AirlineCards() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-teal-50/40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
            Sample Tickets
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
            Preview Tickets by <span className="text-teal-600">Airline</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Click on any airline to view a watermarked sample ticket PDF.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
          {AIRLINES.map((airline, idx) => (
            <a
              key={airline.name}
              href={encodeURI(airline.ticket)}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative bg-white rounded-2xl border border-slate-100
                hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50
                transition-all duration-300 overflow-hidden
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: visible ? `${idx * 80}ms` : "0ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-50/0 group-hover:from-teal-50/60 group-hover:to-teal-100/40 transition-all duration-300" />

              <div className="relative p-4 flex items-center justify-center aspect-[3/2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(airline.logo)}
                  alt={`${airline.name} logo`}
                  className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          All samples are watermarked previews. Ordered tickets are delivered without watermarks.
        </p>
      </div>
    </section>
  );
}

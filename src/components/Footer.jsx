import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

const LINKS = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Samples", href: "/samples" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const SERVICES = [
    "Dummy Flight Ticket",
    "Dummy Hotel Booking",
    "Confirmed E-Ticket",
    "Visa Consultation",
    "Travel Insurance Help",
];

const SOCIALS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/thedummytickets?utm_source=qr&igsh=MTkwM2trdms5Y3FzaQ==",
        icon: Instagram,
    },
    {
        label: "X",
        href: "https://x.com/thedummytickets",
        icon: Twitter,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/thedummytickets-undefined-7b320b401",
        icon: Linkedin,
    },
];

export default function Footer() {
    return (
        <footer className="bg-navy text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center rounded-lg bg-white/95 px-3 py-2.5 shadow-sm">
                                <img
                                    src="/logo-final.png"
                                    alt="The Dummy Tickets — Verified dummy tickets"
                                    width={440}
                                    height={102}
                                    loading="lazy"
                                    className="h-auto w-[14rem] sm:w-[16rem] md:w-[18rem] lg:w-[20rem] max-h-28 object-contain object-left"
                                />
                            </span>
                            <span className="sr-only">TheDummyTickets</span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Trusted by 10,000+ travelers worldwide for verified dummy tickets with valid PNR.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {LINKS.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4">Services</h3>
                        <ul className="space-y-2">
                            {SERVICES.map((s) => (
                                <li key={s} className="text-sm text-slate-400">{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                                <a href="https://wa.link/01ufkj" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    +91 9773596446
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                                <a href="mailto:thedummytickets@gmail.com" className="hover:text-white transition-colors">
                                    thedummytickets@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin className="h-4 w-4 text-teal-400 shrink-0" />
                                24/7 Worldwide Support
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} TheDummyTickets.com. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    title={s.label}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <s.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {["Privacy Policy", "Terms", "Refund Policy"].map((t) => (
                                <Link key={t} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

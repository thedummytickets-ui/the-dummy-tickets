"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/samples", label: "Samples" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo.png"
                        alt="TheDummyTickets logo"
                        width={220}
                        height={56}
                        loading="eager"
                        className="h-9 sm:h-10 w-auto"
                    />
                    <span className="sr-only">TheDummyTickets</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors rounded-lg"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Button asChild size="sm" className="ml-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-5 font-semibold">
                        <Link href="/book">Order Now</Link>
                    </Button>
                </nav>

                {/* Mobile */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72 bg-white">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <nav className="flex flex-col gap-1 mt-8">
                            {NAV_LINKS.map((l) => (
                                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
                                    {l.label}
                                </Link>
                            ))}
                            <div className="mt-4 px-4">
                                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold">
                                    <Link href="/book" onClick={() => setOpen(false)}>Order Now</Link>
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

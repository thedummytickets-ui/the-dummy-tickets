"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
            <div className="mx-auto flex h-16 sm:h-[4.5rem] md:h-[5rem] max-w-7xl items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8">
                {/* Logo: wide lockup, height capped for a slim header bar */}
                <Link href="/" className="flex h-full shrink-0 items-center py-0 group">
                    <Image
                        src="/logo-final.png"
                        alt="The Dummy Tickets — Verified dummy tickets"
                        width={720}
                        height={120}
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 640px) calc(100vw - 3.5rem), (max-width: 1024px) 42rem, 54rem"
                        className="h-full w-auto max-w-[calc(100vw-3.5rem)] object-contain object-left sm:max-w-[38rem] md:max-w-[42rem] lg:max-w-[46rem] xl:max-w-[50rem] 2xl:max-w-[54rem]"
                    />
                    <span className="sr-only">TheDummyTickets</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex min-w-0 flex-1 items-center justify-end gap-0.5 xl:gap-1">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="px-2 xl:px-2.5 py-1.5 text-[13px] font-medium text-slate-600 hover:text-teal-700 transition-colors rounded-lg whitespace-nowrap"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Button asChild size="sm" className="ml-1 xl:ml-2 shrink-0 h-8 px-4 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold">
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

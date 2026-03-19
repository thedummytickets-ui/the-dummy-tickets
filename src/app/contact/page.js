"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Mail, Phone, Clock, MapPin, Send } from "lucide-react";

const METHODS = [
    { icon: MessageCircle, title: "WhatsApp", sub: "Instant response", value: "+91 9773596446", href: "https://wa.link/01ufkj" },
    { icon: Mail, title: "Email", sub: "Within 1 hour", value: "thedummytickets@gmail.com", href: "mailto:thedummytickets@gmail.com" },
    { icon: Clock, title: "Availability", sub: "Always online", value: "24/7 — All days", href: null },
    { icon: MapPin, title: "Coverage", sub: "Worldwide", value: "50+ Countries", href: null },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:thedummytickets@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    };

    const inputCls = "bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 rounded-xl focus:border-teal-400 focus:ring-teal-400/20";

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        Get in <span className="text-teal-600">Touch</span>
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto">We&apos;re available 24/7 to help with dummy tickets, visa queries, and travel planning.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
                    {METHODS.map((m) => (
                        <div key={m.title} className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:border-teal-200 transition-all">
                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 mb-3">
                                <m.icon className="h-5 w-5 text-teal-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-navy mb-0.5">{m.title}</h3>
                            <p className="text-xs text-slate-400 mb-1.5">{m.sub}</p>
                            {m.href ? (
                                <a href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                                    {m.value}
                                </a>
                            ) : (
                                <p className="text-sm font-medium text-slate-600">{m.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl p-7 border border-slate-100 space-y-4">
                        <h2 className="text-lg font-semibold text-navy mb-2 font-[family-name:var(--font-outfit)]">Send a Message</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} required />
                            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} required />
                        </div>
                        <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} required />
                        <textarea rows={5} placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full rounded-xl bg-slate-50 border border-slate-200 text-navy placeholder:text-slate-400 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 focus:outline-none px-3 py-2 text-sm" required />
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full px-6">
                            <Send className="mr-2 h-4 w-4" />Send Message
                        </Button>
                    </form>

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 flex-1 flex flex-col items-center justify-center">
                            <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                                <MessageCircle className="h-7 w-7 text-green-500" />
                            </div>
                            <h3 className="text-base font-semibold text-navy mb-2 font-[family-name:var(--font-outfit)]">Prefer WhatsApp?</h3>
                            <p className="text-sm text-slate-500 mb-5">Most queries answered within 5 minutes.</p>
                            <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold w-full">
                                <a href="https://wa.link/01ufkj" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4" />WhatsApp Us
                                </a>
                            </Button>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-slate-100">
                            <h3 className="text-sm font-semibold text-navy mb-3">Response Times</h3>
                            {[{ c: "bg-green-400", t: "WhatsApp: Under 5 min" }, { c: "bg-teal-400", t: "Email: Under 1 hour" }, { c: "bg-amber-400", t: "Ticket delivery: 10–20 min" }].map((r) => (
                                <div key={r.t} className="flex items-center gap-2.5 mb-2 last:mb-0">
                                    <div className={`h-2 w-2 rounded-full ${r.c}`} /><span className="text-sm text-slate-500">{r.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

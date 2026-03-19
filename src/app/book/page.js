"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plane, Building, Layers, Globe, ShieldCheck, CreditCard, Stamp, Clock,
    ArrowRight, MapPin, Calendar, User, Mail, Phone, CheckCircle2,
} from "lucide-react";

const SERVICES = [
    { id: "flight", label: "Flight", icon: Plane },
    { id: "hotel", label: "Hotel", icon: Building },
    { id: "both", label: "Both", icon: Layers },
];

const TRIPS = ["One Way", "Round Trip", "Multi-City"];

const PURPOSES = [
    { id: "visa", label: "Visa Application", icon: Globe },
    { id: "immigration", label: "Immigration", icon: ShieldCheck },
    { id: "proof", label: "Proof of Return", icon: CreditCard },
    { id: "passport", label: "Passport Renewal", icon: Stamp },
    { id: "extension", label: "Visa Extension", icon: Clock },
];

export default function BookPage() {
    const [service, setService] = useState("flight");
    const [trip, setTrip] = useState("One Way");
    const [purpose, setPurpose] = useState("visa");
    const [form, setForm] = useState({
        name: "", email: "", whatsapp: "",
        origin: "", destination: "", departDate: "", returnDate: "",
        hotelCity: "", checkIn: "", checkOut: "",
    });

    const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const price = service === "both" ? "₹449 / $5" : service === "hotel" ? "₹249 / $3" : "₹249 / $3";

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = `Hello! I'd like to book a dummy ticket.\n\n*Service:* ${service}\n*Trip:* ${trip}\n*Purpose:* ${purpose}\n*Name:* ${form.name}\n*Email:* ${form.email}\n*From:* ${form.origin}\n*To:* ${form.destination}\n*Date:* ${form.departDate}${form.returnDate ? `\n*Return:* ${form.returnDate}` : ""}${form.hotelCity ? `\n*Hotel:* ${form.hotelCity}` : ""}`;
        window.open(`https://wa.me/919773596446?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const inputCls = "bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 h-11 rounded-xl focus:border-teal-400 focus:ring-teal-400/20";

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-teal-100">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                    {/* Sidebar */}
                    <div className="lg:col-span-2 lg:sticky lg:top-24">
                        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-4 leading-tight">
                            Get Your <span className="text-teal-600">Dummy Ticket</span> Online
                        </h1>
                        <p className="text-slate-500 mb-8">Fill in your details and we&apos;ll deliver a verified ticket within minutes.</p>

                        {/* Purpose */}
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">I need this for</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {PURPOSES.map((p) => (
                                <button key={p.id} type="button" onClick={() => setPurpose(p.id)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${purpose === p.id ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                                        }`}>
                                    <p.icon className="h-3.5 w-3.5" />{p.label}
                                </button>
                            ))}
                        </div>

                        {/* Trust */}
                        <div className="space-y-2.5">
                            {["Verifiable PNR on airline website", "Delivered in 10–20 minutes", "24/7 customer support", "Accepted by all embassies"].map((t) => (
                                <div key={t} className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0" />
                                    <span className="text-sm text-slate-500">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
                        {/* Service tabs */}
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What do you need?</p>
                            <div className="grid grid-cols-3 gap-2">
                                {SERVICES.map((s) => (
                                    <button key={s.id} type="button" onClick={() => setService(s.id)}
                                        className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl text-sm font-medium transition-all ${service === s.id ? "bg-teal-600 text-white shadow-md" : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                                            }`}>
                                        <s.icon className="h-5 w-5" />{s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trip type */}
                        {service !== "hotel" && (
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Trip type</p>
                                <div className="flex gap-2">
                                    {TRIPS.map((t) => (
                                        <button key={t} type="button" onClick={() => setTrip(t)}
                                            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${trip === t ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-50 text-slate-500 border border-slate-100"
                                                }`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Passenger */}
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Passenger details</p>
                            <div className="space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input placeholder="Full Name (as on passport)" value={form.name} onChange={(e) => set("name", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input type="tel" placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flight */}
                        {service !== "hotel" && (
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Flight details</p>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input placeholder="From" value={form.origin} onChange={(e) => set("origin", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-400" />
                                            <Input placeholder="To" value={form.destination} onChange={(e) => set("destination", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input type="date" value={form.departDate} onChange={(e) => set("departDate", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                        </div>
                                        {trip !== "One Way" && (
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-400" />
                                                <Input type="date" value={form.returnDate} onChange={(e) => set("returnDate", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hotel */}
                        {service !== "flight" && (
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Hotel details</p>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input placeholder="Hotel City" value={form.hotelCity} onChange={(e) => set("hotelCity", e.target.value)} className={`pl-10 ${inputCls}`} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input type="date" value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} className={inputCls} required />
                                        <Input type="date" value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} className={inputCls} required />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-6 rounded-xl text-base group">
                            Book Ticket — {price}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <p className="text-center text-xs text-slate-400">You&apos;ll be redirected to WhatsApp to complete the order.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

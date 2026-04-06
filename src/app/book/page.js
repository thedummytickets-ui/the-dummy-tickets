"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plane, Building, Layers, Globe, ShieldCheck, CreditCard, Stamp, Clock,
  ArrowRight, MapPin, Calendar, User, Mail, Phone, CheckCircle2, Loader2,
  MessageCircle, AlertCircle, UserPlus, X,
} from "lucide-react";

const SERVICES = [
  { id: "flight", label: "Flight Ticket", icon: Plane },
  { id: "hotel", label: "Hotel Booking", icon: Building },
  { id: "both", label: "Flight + Hotel", icon: Layers },
];

const TRIPS = ["One Way", "Round Trip", "Multi-City"];

const PURPOSES = [
  { id: "visa", label: "Visa Application", icon: Globe },
  { id: "immigration", label: "Immigration", icon: ShieldCheck },
  { id: "proof", label: "Proof of Return", icon: CreditCard },
  { id: "passport", label: "Passport Renewal", icon: Stamp },
  { id: "extension", label: "Visa Extension", icon: Clock },
];

const TRUST = [
  "Verifiable PNR on airline website",
  "Delivered in 10–20 minutes",
  "24/7 customer support via WhatsApp",
  "Accepted by all embassies worldwide",
];

const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx"];

/** Common WhatsApp / phone country codes (E.164 prefix) */
const COUNTRY_CODES = [
  { code: "+91", label: "India +91" },
  { code: "+1", label: "US/Canada +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "UAE +971" },
  { code: "+966", label: "Saudi +966" },
  { code: "+974", label: "Qatar +974" },
  { code: "+973", label: "Bahrain +973" },
  { code: "+968", label: "Oman +968" },
  { code: "+965", label: "Kuwait +965" },
  { code: "+61", label: "Australia +61" },
  { code: "+64", label: "New Zealand +64" },
  { code: "+65", label: "Singapore +65" },
  { code: "+60", label: "Malaysia +60" },
  { code: "+66", label: "Thailand +66" },
  { code: "+62", label: "Indonesia +62" },
  { code: "+63", label: "Philippines +63" },
  { code: "+84", label: "Vietnam +84" },
  { code: "+86", label: "China +86" },
  { code: "+852", label: "Hong Kong +852" },
  { code: "+81", label: "Japan +81" },
  { code: "+82", label: "South Korea +82" },
  { code: "+49", label: "Germany +49" },
  { code: "+33", label: "France +33" },
  { code: "+39", label: "Italy +39" },
  { code: "+34", label: "Spain +34" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+41", label: "Switzerland +41" },
  { code: "+46", label: "Sweden +46" },
  { code: "+47", label: "Norway +47" },
  { code: "+45", label: "Denmark +45" },
  { code: "+32", label: "Belgium +32" },
  { code: "+353", label: "Ireland +353" },
  { code: "+27", label: "South Africa +27" },
  { code: "+20", label: "Egypt +20" },
  { code: "+234", label: "Nigeria +234" },
  { code: "+254", label: "Kenya +254" },
  { code: "+92", label: "Pakistan +92" },
  { code: "+880", label: "Bangladesh +880" },
  { code: "+94", label: "Sri Lanka +94" },
  { code: "+977", label: "Nepal +977" },
  { code: "+55", label: "Brazil +55" },
  { code: "+52", label: "Mexico +52" },
  { code: "+54", label: "Argentina +54" },
  { code: "+90", label: "Turkey +90" },
  { code: "+7", label: "Russia/KZ +7" },
];

function getPricing(service) {
  if (service === "flight" || service === "hotel") {
    return { label: "₹249 / $3", inr: 249, usd: 3, perPerson: "₹249 / $3 per person" };
  }
  return { label: "₹498 / $6", inr: 498, usd: 6, perPerson: "₹498 / $6 per person" };
}

const emptyPassenger = () => ({ title: "Mr", firstName: "", lastName: "" });

export default function BookPage() {
  const [service, setService] = useState("flight");
  const [trip, setTrip] = useState("One Way");
  const [purpose, setPurpose] = useState("visa");
  const [status, setStatus] = useState("idle");
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [form, setForm] = useState({
    email: "", whatsappCountryCode: "+91", whatsapp: "",
    origin: "", destination: "", departDate: "", returnDate: "",
    hotelCity: "", checkIn: "", checkOut: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const setPassenger = (idx, field, value) => {
    setPassengers((prev) => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const addPassenger = () => {
    if (passengers.length < 9) setPassengers((prev) => [...prev, emptyPassenger()]);
  };

  const removePassenger = (idx) => {
    if (passengers.length > 1) setPassengers((prev) => prev.filter((_, i) => i !== idx));
  };

  const pricing = getPricing(service);
  const price = pricing.label;
  const totalInr = pricing.inr * passengers.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      ...form,
      passengers,
      service,
      trip: service !== "hotel" ? trip : "",
      purpose,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setOrderId(data.orderId || "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  const openWhatsApp = () => {
    const wa = `${form.whatsappCountryCode || ""} ${form.whatsapp || ""}`.trim();
    const names = passengers.map((p, i) => `*Passenger ${i + 1}:* ${p.title || "Mr"} ${p.firstName} ${p.lastName}`).join("\n");
    const oid = orderId ? `\n*Order ID:* ${orderId}\n` : "";
    const msg = `Hello! I'd like to book a dummy ticket.${oid}\n*Service:* ${service}\n*Trip:* ${trip}\n*Purpose:* ${purpose}\n${names}\n*Email:* ${form.email}\n*WhatsApp:* ${wa}\n*From:* ${form.origin}\n*To:* ${form.destination}\n*Date:* ${form.departDate}${form.returnDate ? `\n*Return:* ${form.returnDate}` : ""}${form.hotelCity ? `\n*Hotel City:* ${form.hotelCity}\n*Check-in:* ${form.checkIn}\n*Check-out:* ${form.checkOut}` : ""}`;
    window.open(`https://wa.me/919773596446?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputCls = "bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 h-11 rounded-xl focus:border-teal-400 focus:ring-teal-400/20";

  if (status === "success") {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-teal-50/30">
        <div className="mx-auto max-w-lg text-center mt-12">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
              Booking Received!
            </h1>
            {orderId && (
              <div className="mb-6 rounded-xl border border-teal-100 bg-teal-50/80 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 mb-1">Your order ID</p>
                <p className="font-mono text-lg font-bold text-navy tracking-wide select-all">{orderId}</p>
                <p className="text-xs text-slate-500 mt-1">Save this for tracking and support.</p>
              </div>
            )}
            <p className="text-slate-500 mb-2">
              We&apos;ve sent a confirmation email to <strong className="text-navy">{form.email}</strong>.
            </p>
            <p className="text-slate-500 mb-2">
              <strong className="text-navy">{passengers.length}</strong> passenger{passengers.length > 1 ? "s" : ""} booked.
            </p>
            <p className="text-slate-500 mb-8">
              Our team will deliver your ticket within <strong className="text-teal-600">10–30 minutes</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 font-semibold">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </Button>
              <Button onClick={() => { setStatus("idle"); setOrderId(""); setPassengers([emptyPassenger()]); setForm({ email: "", whatsappCountryCode: "+91", whatsapp: "", origin: "", destination: "", departDate: "", returnDate: "", hotelCity: "", checkIn: "", checkOut: "" }); }}
                variant="outline" className="rounded-full px-6 border-slate-200 text-slate-600 font-semibold">
                Book Another Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-teal-50/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ─── Sidebar ─── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
              Book Now
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-4 leading-tight">
              Get Your <span className="text-teal-600">Dummy Ticket</span> in Minutes
            </h1>
            <p className="text-slate-500 mb-8">
              Fill in your details and we&apos;ll deliver a verified ticket with a real PNR straight to your email and WhatsApp.
            </p>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">I need this for</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {PURPOSES.map((p) => (
                <button key={p.id} type="button" onClick={() => setPurpose(p.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    purpose === p.id
                      ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
                      : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                  }`}>
                  <p.icon className="h-3.5 w-3.5" />{p.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {TRUST.map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0" />
                  <span className="text-sm text-slate-500">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
              <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy">Prefer WhatsApp?</p>
                <a href="https://wa.me/919773596446" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                  Chat with us directly →
                </a>
              </div>
            </div>
          </div>

          {/* ─── Form ─── */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-7">

            {/* Service */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What do you need?</p>
              <div className="grid grid-cols-3 gap-2">
                {SERVICES.map((s) => (
                  <button key={s.id} type="button" onClick={() => setService(s.id)}
                    className={`flex flex-col items-center gap-1.5 py-4 rounded-xl text-sm font-medium transition-all ${
                      service === s.id
                        ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                        : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                    }`}>
                    <s.icon className="h-5 w-5" />{s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type */}
            {service !== "hotel" && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Trip type</p>
                <div className="flex gap-2">
                  {TRIPS.map((t) => (
                    <button key={t} type="button" onClick={() => setTrip(t)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                        trip === t
                          ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
                          : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Passengers */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Passengers ({passengers.length})
                </p>
                {passengers.length < 9 && (
                  <button
                    type="button"
                    onClick={addPassenger}
                    className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-full"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> Add Passenger
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {passengers.map((pax, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-all ${
                      idx === 0 ? "border-teal-200 bg-teal-50/30" : "border-slate-100 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500">
                        {idx === 0 ? "Primary Passenger" : `Passenger ${idx + 1}`}
                      </span>
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => removePassenger(idx)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Title</p>
                      <div className="flex flex-wrap gap-1.5">
                        {TITLES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setPassenger(idx, "title", t)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              (pax.title || "Mr") === t
                                ? "bg-teal-600 text-white shadow-sm"
                                : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="First Name"
                          value={pax.firstName}
                          onChange={(e) => setPassenger(idx, "firstName", e.target.value)}
                          className={`pl-10 ${inputCls}`}
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Last Name"
                          value={pax.lastName}
                          onChange={(e) => setPassenger(idx, "lastName", e.target.value)}
                          className={`pl-10 ${inputCls}`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {passengers.length < 9 && (
                <button
                  type="button"
                  onClick={addPassenger}
                  className="mt-3 w-full py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-300 text-sm font-medium text-slate-400 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-4 w-4" /> Add Another Passenger
                  {passengers.length > 0 && (
                    <span className="text-xs text-slate-300 ml-1">({pricing.perPerson})</span>
                  )}
                </button>
              )}
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Contact details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative sm:col-span-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`pl-10 ${inputCls}`}
                    required
                  />
                </div>
                <div className="flex gap-2 sm:col-span-2">
                  <select
                    value={form.whatsappCountryCode}
                    onChange={(e) => set("whatsappCountryCode", e.target.value)}
                    className={`shrink-0 w-[min(100%,11rem)] rounded-xl border px-3 py-2.5 text-sm font-medium text-navy bg-slate-50 border-slate-200 h-11 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none`}
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map(({ code, label }) => (
                      <option key={code} value={code}>{label}</option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-0">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input
                      type="tel"
                      placeholder="WhatsApp / phone number"
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      className={`pl-10 ${inputCls}`}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            {service !== "hotel" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Flight details</p>
                  {service === "flight" && (
                    <button
                      type="button"
                      onClick={() => setService("both")}
                      className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-full"
                    >
                      Add Hotel
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="From (City)" value={form.origin} onChange={(e) => set("origin", e.target.value)} className={`pl-10 ${inputCls}`} required />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-400" />
                      <Input placeholder="To (City)" value={form.destination} onChange={(e) => set("destination", e.target.value)} className={`pl-10 ${inputCls}`} required />
                    </div>
                  </div>
                  <div className={`grid gap-3 ${trip !== "One Way" ? "grid-cols-2" : "grid-cols-1"}`}>
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

            {/* Hotel Details */}
            {service !== "flight" && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Hotel details</p>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Hotel City" value={form.hotelCity} onChange={(e) => set("hotelCity", e.target.value)} className={`pl-10 ${inputCls}`} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="date" placeholder="Check-in" value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} className={`pl-10 ${inputCls}`} required />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-400" />
                      <Input type="date" placeholder="Check-out" value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} className={`pl-10 ${inputCls}`} required />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">{errorMsg}</p>
                  <button type="button" onClick={openWhatsApp} className="text-xs text-red-600 underline mt-1">
                    Or book via WhatsApp instead →
                  </button>
                </div>
              </div>
            )}

            {/* Price & Submit */}
            <div className="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">Per person</p>
                <p className="text-lg font-bold text-navy font-[family-name:var(--font-outfit)]">{price}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {service === "flight" ? "Flight ticket only" : service === "hotel" ? "Hotel booking" : "Flight + hotel bundle"}
                </p>
              </div>
              <div className="sm:text-right border-t sm:border-t-0 border-slate-200/80 pt-3 sm:pt-0">
                <p className="text-xs text-slate-400">Estimated total (INR)</p>
                <p className="text-lg font-bold text-teal-700 font-[family-name:var(--font-outfit)]">
                  ₹{totalInr.toLocaleString("en-IN")}
                  <span className="text-sm font-medium text-slate-500 ml-2">
                    × {passengers.length} pax
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">USD equivalent shown as {price}</p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-6 rounded-xl text-base group disabled:opacity-70"
            >
              {status === "loading" ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
              ) : (
                <>Book Ticket — {price} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </Button>

            <p className="text-center text-xs text-slate-400">
              A confirmation email will be sent to you. You can also reach us via{" "}
              <a href="https://wa.me/919773596446" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                WhatsApp
              </a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

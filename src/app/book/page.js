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

const emptyPassenger = () => ({ firstName: "", lastName: "" });

export default function BookPage() {
  const [service, setService] = useState("flight");
  const [trip, setTrip] = useState("One Way");
  const [purpose, setPurpose] = useState("visa");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [form, setForm] = useState({
    email: "", whatsapp: "",
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

  const price = service === "both" ? "₹449 / $5" : "₹249 / $3";
  const extraPassengerPrice = service === "both" ? "₹200 / $2.5" : "₹100 / $1.5";

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
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  const openWhatsApp = () => {
    const names = passengers.map((p, i) => `*Passenger ${i + 1}:* ${p.firstName} ${p.lastName}`).join("\n");
    const msg = `Hello! I'd like to book a dummy ticket.\n\n*Service:* ${service}\n*Trip:* ${trip}\n*Purpose:* ${purpose}\n${names}\n*Email:* ${form.email}\n*WhatsApp:* ${form.whatsapp}\n*From:* ${form.origin}\n*To:* ${form.destination}\n*Date:* ${form.departDate}${form.returnDate ? `\n*Return:* ${form.returnDate}` : ""}${form.hotelCity ? `\n*Hotel City:* ${form.hotelCity}\n*Check-in:* ${form.checkIn}\n*Check-out:* ${form.checkOut}` : ""}`;
    window.open(`https://wa.me/919773596446?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputCls = "bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 h-11 rounded-xl focus:border-teal-400 focus:ring-teal-400/20";

  if (status === "success") {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-teal-50/30">
        <div className="mx-auto max-w-lg text-center mt-12">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
              Booking Received!
            </h1>
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
              <Button onClick={() => { setStatus("idle"); setPassengers([emptyPassenger()]); setForm({ email: "", whatsapp: "", origin: "", destination: "", departDate: "", returnDate: "", hotelCity: "", checkIn: "", checkOut: "" }); }}
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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-teal-50/30">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <span className="text-xs text-slate-300 ml-1">({extraPassengerPrice} each)</span>
                  )}
                </button>
              )}
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Contact details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
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
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    className={`pl-10 ${inputCls}`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Flight Details */}
            {service !== "hotel" && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Flight details</p>
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
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Price</p>
                <p className="text-lg font-bold text-navy font-[family-name:var(--font-outfit)]">{price}</p>
                {passengers.length > 1 && (
                  <p className="text-xs text-slate-400 mt-0.5">+ {extraPassengerPrice} × {passengers.length - 1} extra</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Passengers</p>
                <p className="text-lg font-bold text-navy font-[family-name:var(--font-outfit)]">{passengers.length}</p>
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

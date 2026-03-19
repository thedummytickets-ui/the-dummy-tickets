import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl bg-navy rounded-3xl px-8 py-14 sm:px-14 text-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-white mb-4">
                        Ready to Get Your Dummy Ticket?
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        Available 24/7. Book online or contact us via WhatsApp — average response time under 5 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 font-semibold group">
                            <Link href="/book">
                                Book Online <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-6 border-white/20 text-white hover:bg-white/10 font-medium">
                            <a href="https://wa.link/01ufkj" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-4 w-4 text-green-400" /> WhatsApp Us
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

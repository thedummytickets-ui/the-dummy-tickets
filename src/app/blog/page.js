import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { POSTS } from "@/data/blogPosts";

export const metadata = {
    title: "Blog — Dummy Ticket Guides & Travel Tips | TheDummyTickets",
    description: "Expert guides on dummy tickets, visa applications, and travel tips. Learn how to use dummy tickets for Schengen, UK, US, Canada, and Australia visas. Proof of onward travel explained.",
    openGraph: {
        title: "Blog — Dummy Ticket Guides & Travel Tips | TheDummyTickets",
        description: "Expert guides on dummy tickets, visa applications, flight itineraries, and travel tips for 50+ countries.",
        url: "https://thedummytickets.com/blog",
    },
    alternates: { canonical: "https://thedummytickets.com/blog" },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-14">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
                        Our Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-outfit)] text-navy mb-3">
                        Travel Guides & <span className="text-teal-600">Tips</span>
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto">Everything you need to know about dummy tickets, visa applications, and proof of onward travel.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {POSTS.map((p) => (
                        <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                            <article className="h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all">
                                <div className="relative h-44 w-full overflow-hidden">
                                    {p.cover ? (
                                        <Image
                                            src={p.cover}
                                            alt={p.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="h-full bg-teal-50 flex items-center justify-center">
                                            <span className="text-5xl opacity-20" aria-hidden="true">✈️</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-2.5">
                                        <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">{p.cat}</span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" />{p.time}</span>
                                    </div>
                                    <h2 className="text-[15px] font-semibold text-navy mb-2 group-hover:text-teal-700 transition-colors line-clamp-2 font-[family-name:var(--font-outfit)]">{p.title}</h2>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-3">{p.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                                        <span className="text-sm font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="h-3 w-3" /></span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

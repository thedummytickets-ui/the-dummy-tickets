import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getAllSlugs, POSTS } from "@/data/blogPosts";

const BASE_URL = "https://thedummytickets.com";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | TheDummyTickets Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

function BlogImage({ src, alt, caption }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-100 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-slate-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostBody({ body }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-outfit)] prose-headings:text-navy prose-p:text-slate-600 prose-li:text-slate-600 prose-p:leading-7 prose-li:leading-7">
      {body.map((block, i) => {
        if (block.type === "p") {
          return <p key={i}>{block.text}</p>;
        }
        if (block.type === "h2") {
          return (
            <h2 key={i} className="text-xl font-semibold mt-8 mb-3">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc pl-6 space-y-1.5 my-4">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "image") {
          return (
            <BlogImage
              key={i}
              src={block.src}
              alt={block.alt}
              caption={block.caption}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

function RelatedPosts({ currentSlug }) {
  const related = POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  return (
    <div className="mt-16 pt-10 border-t border-slate-100">
      <h3 className="text-lg font-semibold text-navy mb-6 font-[family-name:var(--font-outfit)]">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            <div className="rounded-xl overflow-hidden border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all">
              {p.cover && (
                <div className="relative h-28 w-full">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                </div>
              )}
              <div className="p-3">
                <h4 className="text-sm font-medium text-navy group-hover:text-teal-700 transition-colors line-clamp-2 font-[family-name:var(--font-outfit)]">
                  {p.title}
                </h4>
                <span className="text-xs text-slate-400 mt-1 block">{p.time} read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.cover || undefined,
    publisher: {
      "@type": "Organization",
      name: "TheDummyTickets",
      url: BASE_URL,
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {post.cover && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <header className="mb-10">
          <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
            {post.cat}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-outfit)] text-navy mt-3 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.time} read
            </span>
          </div>
        </header>

        <PostBody body={post.body} />

        <RelatedPosts currentSlug={slug} />

        <footer className="mt-12 pt-8 border-t border-slate-100">
          <Link
            href="/blog"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← More guides and tips
          </Link>
        </footer>
      </article>
    </div>
  );
}

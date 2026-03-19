import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/data/blogPosts";

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
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
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

function BlogImagePlaceholder({ alt, caption }) {
  return (
    <figure className="my-8">
      <div
        className="w-full aspect-video bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center text-teal-400 text-sm"
        aria-hidden="true"
      >
        [Image: {alt}]
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostBody({ body }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-outfit)] prose-headings:text-navy prose-p:text-slate-600 prose-li:text-slate-600">
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
            <ul key={i} className="list-disc pl-6 space-y-1 my-4">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "image") {
          return (
            <BlogImagePlaceholder
              key={i}
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

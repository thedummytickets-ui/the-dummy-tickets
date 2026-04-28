import { POSTS } from "@/data/blogPosts";
import { absoluteUrl } from "@/lib/seo";

const nowIso = new Date().toISOString();

export default function sitemap() {
    return [
        {
            url: absoluteUrl("/"),
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: absoluteUrl("/blog"),
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...POSTS.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: new Date(post.updated || post.date).toISOString(),
            changeFrequency: "monthly",
            priority: 0.7,
        })),
        {
            url: absoluteUrl("/samples"),
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: absoluteUrl("/contact"),
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: absoluteUrl("/book"),
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ];
}

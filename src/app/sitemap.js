import { getAllSlugs } from "@/data/blogPosts";

export default function sitemap() {
    const baseUrl = "https://thedummytickets.com";
    const blogSlugs = getAllSlugs();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...blogSlugs.map((slug) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        })),
        {
            url: `${baseUrl}/samples`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];
}

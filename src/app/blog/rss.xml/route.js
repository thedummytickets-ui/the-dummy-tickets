import { POSTS } from "@/data/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = POSTS.map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
        <description>${escapeXml(post.excerpt)}</description>
      </item>
    `;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml("Guides on dummy tickets, visa itineraries, and onward travel.")}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

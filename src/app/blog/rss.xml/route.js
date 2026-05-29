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
    const category = post.cat ? `<category>${escapeXml(post.cat)}</category>` : "";
    return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        <pubDate>${pubDate}</pubDate>
        ${category}
        <description>${escapeXml(post.excerpt)}</description>
      </item>
    `;
  }).join("");

  const lastBuildDate = POSTS.reduce((latest, post) => {
    const d = new Date(post.updated || post.date).getTime();
    return d > latest ? d : latest;
  }, 0);
  const lastBuildDateUtc = new Date(lastBuildDate || Date.now()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml("Guides on dummy tickets, visa itineraries, and onward travel.")}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDateUtc}</lastBuildDate>
    <ttl>60</ttl>
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

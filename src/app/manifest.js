import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "DummyTickets",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

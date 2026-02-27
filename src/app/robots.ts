import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: "https://www.mindfrix.com/sitemap.xml",
    host: "https://www.mindfrix.com",
  };
}

import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import Script from "next/script";

const siteUrl = "https://www.mindfrix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MindFrix — Custom Web Apps, AI Automation & Business Systems",
    template: "%s | MindFrix",
  },
  description:
    "MindFrix builds custom web apps, AI automation, sales funnels, and business systems that save 10–30 hours per week and drive measurable revenue growth. Get a free strategy consultation today.",
  keywords: [
    "custom web app development",
    "AI automation agency",
    "business automation",
    "sales funnel development",
    "internal tools development",
    "custom dashboard",
    "workflow automation",
    "lead generation systems",
    "revenue growth agency",
    "web development agency",
    "AI integration services",
    "business systems",
    "MindFrix",
  ],
  authors: [{ name: "MindFrix", url: siteUrl }],
  creator: "MindFrix",
  publisher: "MindFrix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "MindFrix — Custom Web Apps, AI Automation & Business Systems",
    description:
      "Save 10–30 hours per week with custom automation. MindFrix builds web apps, AI tools, and sales systems that grow your revenue on autopilot.",
    url: siteUrl,
    siteName: "MindFrix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MindFrix — Custom Web Apps, AI Automation & Business Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindFrix — Custom Web Apps, AI Automation & Business Systems",
    description:
      "Save 10–30 hours per week with custom automation. MindFrix builds web apps, AI tools, and sales systems that grow your revenue on autopilot.",
    images: ["/og-image.png"],
    creator: "@mindfrix",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/mindfrix_logo.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MindFrix",
  url: siteUrl,
  logo: `${siteUrl}/mindfrix_logo.svg`,
  description:
    "MindFrix builds custom web apps, AI automation, sales funnels, and business systems that eliminate manual work and drive measurable revenue growth.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@mindfrix.com",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/mindfrix",
    "https://twitter.com/mindfrix",
    "https://www.instagram.com/mindfrix",
  ],
  offers: {
    "@type": "AggregateOffer",
    description: "Custom web development, AI automation, and business systems services",
    offerCount: "4",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MindFrix",
  url: siteUrl,
  description:
    "Custom web apps, AI automation, and business systems that save time and grow revenue.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MindFrix",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  description:
    "MindFrix is a technology agency specialising in custom web applications, AI automation, sales funnel systems, and internal business tools.",
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceArea: {
    "@type": "AdministrativeArea",
    name: "Global",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MindFrix Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Systems & Internal Tools",
          description:
            "Custom dashboards and internal tools to run your business efficiently — replacing scattered spreadsheets with a single source of truth.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sales Funnels & Conversion Systems",
          description:
            "Landing pages and automated systems that turn visitors into customers with data-driven optimisation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation & Integration",
          description:
            "AI tools and automation that handle repetitive work — so your team can focus on high-value tasks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web & App Development",
          description:
            "Scalable websites and web apps built for your exact needs — no templates, no compromises.",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

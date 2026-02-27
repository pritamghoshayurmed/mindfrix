import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "MindFrix — Scale Your Brand With Unlimited Design",
  description:
    "MindFrix is a modern, tech-forward creative agency specializing in strategic branding, UI/UX design, web development, and print design. Scale your brand with unlimited creative possibilities.",
  keywords: ["branding", "design agency", "UI/UX", "web development", "MindFrix"],
  openGraph: {
    title: "MindFrix — Scale Your Brand With Unlimited Design",
    description:
      "A modern creative agency that scales brands through unlimited design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

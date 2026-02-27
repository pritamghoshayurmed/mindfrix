import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Strategy Consultation — MindFrix",
  description:
    "Tell us about your business and we'll craft a personalised growth plan. Book your free consultation with MindFrix today — no commitment, just clarity.",
  alternates: {
    canonical: "https://www.mindfrix.com/contact",
  },
  openGraph: {
    title: "Book a Free Strategy Consultation — MindFrix",
    description:
      "Share your business goals and get a tailored strategy from MindFrix. 100% free, zero pressure.",
    url: "https://www.mindfrix.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Strategy Consultation — MindFrix",
    description:
      "Share your business goals and get a tailored strategy from MindFrix. 100% free, zero pressure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

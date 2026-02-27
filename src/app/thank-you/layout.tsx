import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch Soon | MindFrix",
  description:
    "Your submission has been received. Our team will review your details and reach out within 24–48 hours with your custom strategy.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

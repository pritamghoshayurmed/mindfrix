"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CheckCircleIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="check-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2d2d" />
          <stop offset="50%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#ffac70" />
        </linearGradient>
      </defs>
      <polyline points="20 6 9 17 4 12" stroke="url(#check-grad)" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const steps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "We review your submission",
    desc: "Our team carefully goes through every detail you've shared.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    title: "We reach out within 24–48 hours",
    desc: "A senior strategist will contact you to schedule your free session.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Get your custom growth strategy",
    desc: "We craft a personalised plan tailored to your business goals.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        {/* Background orbs */}
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-orb contact-orb-3" />

        <div className="thankyou-wrap">
          {/* Icon */}
          <div className="contact-success-icon">
            <CheckCircleIcon />
          </div>

          {/* Heading */}
          <h1 className="contact-success-title">
            We&apos;ve got your details!
          </h1>
          <p className="contact-success-sub">
            Thank you for reaching out. Our team will review your submission and
            get back to you within{" "}
            <strong>24–48 hours</strong> to schedule your{" "}
            <strong>free strategy session</strong>.
          </p>

          {/* What happens next */}
          <div className="thankyou-steps">
            <p className="thankyou-steps-label">What happens next</p>
            <div className="thankyou-steps-list">
              {steps.map((s, i) => (
                <div className="thankyou-step" key={i}>
                  <div className="thankyou-step-num">{i + 1}</div>
                  <div className="thankyou-step-icon">{s.icon}</div>
                  <div className="thankyou-step-content">
                    <p className="thankyou-step-title">{s.title}</p>
                    <p className="thankyou-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="/" className="btn-primary contact-success-btn">
            Back to Home <ArrowRight />
          </Link>


        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CallToAction() {
    const ctaRef = useScrollReveal(".reveal-item");

    return (
        <section className="cta-section" ref={ctaRef}>
            {/* Orbs */}
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />

            <div className="container cta-inner">
                <div className="cta-text reveal-item">
                    <h2 className="cta-heading">
                        Ready to Automate and
                        <br />
                        <span className="cta-heading-gradient">Scale Your Business?</span>
                    </h2>
                    <p className="cta-subtext">
                        Let&apos;s discuss your goals and identify the highest-impact solution.
                    </p>
                </div>

                <a href="#pricing" className="btn-primary cta-btn reveal-item">
                    Book a Free Consultation
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

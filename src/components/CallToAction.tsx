"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CallToAction() {
    const ctaRef = useScrollReveal(".reveal-item");

    return (
        <section className="cta-section" ref={ctaRef} aria-label="Call to action">
            {/* Orbs */}
            <div className="cta-orb cta-orb-1" aria-hidden="true" />
            <div className="cta-orb cta-orb-2" aria-hidden="true" />

            <div className="container cta-inner" style={{ flexDirection: "column", gap: "2rem", textAlign: "center" }}>
                <div className="cta-text reveal-item">
                    <h2 className="cta-heading">
                        Ready to Automate and
                        <br />
                        <span className="cta-heading-gradient">Scale Your Business?</span>
                    </h2>
                    <p className="cta-subtext">
                        Join 200+ businesses that save 10–30 hours per week and grow revenue
                        with custom systems built by MindFrix.<br />
                        <strong style={{ color: "#fff" }}>The strategy session is completely free — no pitch, no pressure.</strong>
                    </p>
                </div>

                <div className="reveal-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <a href="/contact" className="btn-primary cta-btn">
                        Book My Free Strategy Session
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    
                </div>
            </div>
        </section>
    );
}

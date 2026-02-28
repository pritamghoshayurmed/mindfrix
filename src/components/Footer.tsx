"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
    const footerRef = useScrollReveal(".reveal-item");

    return (
        <footer className="footer" ref={footerRef} aria-label="Site footer">
            {/* Orange gradient orbs */}
            <div className="footer-orb footer-orb-1" aria-hidden="true" />
            <div className="footer-orb footer-orb-2" aria-hidden="true" />
            <div className="footer-orb footer-orb-3" aria-hidden="true" />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div className="footer-main">

                    {/* Brand + description */}
                    <div className="footer-brand-col reveal-item">
                        <a href="/" className="footer-brand-logo" aria-label="MindFrix Home">
                            <img src="/mindfrix_logo.svg" alt="MindFrix Logo" width={36} height={36} />
                            MindFrix
                        </a>
                        <p className="footer-brand-desc">
                            Custom web apps, AI automation, and business systems that save time and grow revenue for modern businesses.
                        </p>
                        {/* Social proof mini */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                            <span style={{ color: "#ff7a35" }}>★★★★★</span>
                            <span>5.0 — Trusted by 200+ businesses</span>
                        </div>
                    </div>

                    {/* Links */}
                    <nav className="footer-col reveal-item" aria-label="Site navigation">
                        <div className="footer-col-title">Navigation</div>
                        <a href="/">Home</a>
                        <a href="/#about">About Us</a>
                        <a href="/#works">Projects</a>
                        <a href="/#services">Services</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#faq">FAQ</a>
                        <a href="/contact">Free Strategy Call</a>
                    </nav>

                    {/* Services */}
                    <nav className="footer-col reveal-item" aria-label="Services">
                        <div className="footer-col-title">Services</div>
                        <a href="/#services">Business Systems & Tools</a>
                        <a href="/#services">Sales Funnels</a>
                        <a href="/#services">AI Automation</a>
                        <a href="/#services">Web & App Development</a>
                    </nav>

                    {/* Contact */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Contact</div>
                        <a href="mailto:hello@mindfrix.com" aria-label="Send email to MindFrix">
                            <span className="footer-contact-icon" aria-hidden="true">✉</span> contact@mindfrix.com
                        </a>
                        <a href="/contact" className="btn-primary" style={{ marginTop: "0.75rem", fontSize: "0.8rem", padding: "0.6rem 1.2rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                            Book a Free Call
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2026 MindFrix. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms-of-service">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Giant Watermark */}
            <div className="footer-watermark" aria-hidden="true">MINDFRIX</div>
        </footer>
    );
}

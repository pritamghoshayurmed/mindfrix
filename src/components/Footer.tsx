"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
    const footerRef = useScrollReveal(".reveal-item");

    return (
        <footer className="footer" ref={footerRef}>
            {/* Orange gradient orbs */}
            <div className="footer-orb footer-orb-1" />
            <div className="footer-orb footer-orb-2" />
            <div className="footer-orb footer-orb-3" />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div className="footer-main">

                    {/* Brand + description */}
                    <div className="footer-brand-col reveal-item">
                        <a href="#" className="footer-brand-logo">
                            <img src="/mindfrix_logo.svg" alt="MindFrix Logo" width={36} height={36} />
                            MindFrix
                        </a>
                        <p className="footer-brand-desc">
                            Custom systems, AI automation, and web development for modern businesses.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Navigation</div>
                        <a href="#">Home</a>
                        <a href="#about">About Us</a>
                        <a href="#works">Projects</a>
                        <a href="#services">Service</a>
                        <a href="#faq">Contact</a>
                    </div>

                    {/* Contact */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Contact</div>
                        <a href="mailto:your@email.com">
                            <span className="footer-contact-icon">✉</span> your@email.com
                        </a>
                        <span className="footer-contact-item">
                            <span className="footer-contact-icon">📍</span> Remote / Worldwide
                        </span>
                    </div>

                    {/* Social Media */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Social Media</div>
                        <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Pinterest</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2026 MindFrix. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>

            {/* Giant Watermark */}
            <div className="footer-watermark">MINDFRIX</div>
        </footer>
    );
}

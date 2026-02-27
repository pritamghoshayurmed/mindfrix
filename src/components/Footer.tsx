"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
    const footerRef = useScrollReveal(".reveal-item");

    return (
        <footer className="footer" ref={footerRef}>
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand reveal-item">
                        <a href="#" className="navbar-logo" style={{ color: "white" }}>
                            <img src="/mindfrix_logo.svg" alt="MindFrix Logo" width={40} height={40} className="navbar-logo-image" />
                            MindFrix
                        </a>
                        <p>
                            We are a modern creative agency dedicated to transforming brands
                            through exceptional design and digital experiences.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Services</div>
                        <a href="#services">Branding</a>
                        <a href="#services">UI/UX Design</a>
                        <a href="#services">Web Development</a>
                        <a href="#services">Print Design</a>
                        <a href="#services">Motion Graphics</a>
                    </div>

                    {/* Company */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Company</div>
                        <a href="#about">About Us</a>
                        <a href="#works">Our Work</a>
                        <a href="#testimonials">Testimonials</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#">Careers</a>
                    </div>

                    {/* Resources */}
                    <div className="footer-col reveal-item">
                        <div className="footer-col-title">Resources</div>
                        <a href="#">Blog</a>
                        <a href="#">Case Studies</a>
                        <a href="#">Help Center</a>
                        <a href="#">Contact</a>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-newsletter reveal-item">
                        <div className="footer-col-title">Newsletter</div>
                        <p>
                            Stay ahead with creative insights. Subscribe to our weekly newsletter.
                        </p>
                        <div className="footer-newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                                id="newsletter-email"
                            />
                            <button className="btn-primary" id="newsletter-submit">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2024 MindFrix. All rights reserved.</p>
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

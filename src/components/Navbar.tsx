"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "#hero" },
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
        { label: "Work", href: "#works" },
        { label: "Testimonial", href: "#testimonials" },
    ];

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
            <div className="container">
                {/* Logo */}
                <a href="#" className="navbar-logo">
                    <img src="/mindfrix_logo.svg" alt="MindFrix Logo" width={40} height={40} className="navbar-logo-image" />
                    MindFrix
                </a>

                {/* Centered pill nav links */}
                <div className="navbar-links-pill">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <a href="#pricing" className="btn-primary navbar-cta" id="buy-template-btn">
                    Get a Free Consultation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                {/* Mobile menu toggle */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                    id="mobile-menu-toggle"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="mobile-menu-overlay">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="mobile-menu-close"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="mobile-menu-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#pricing"
                        className="btn-primary"
                        onClick={() => setMobileOpen(false)}
                    >
                        Get a Free Consultation
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            )}
        </nav>
    );
}

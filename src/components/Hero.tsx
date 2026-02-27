"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger the title lines
            gsap.from(".hero-title-line span", {
                y: 120,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.3,
            });

            gsap.from(".hero-subtitle", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.7,
            });

            gsap.from(".hero-buttons", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.9,
            });

            gsap.from(".hero-trust-line", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                delay: 1.1,
            });

            gsap.from(".hero-social-proof", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.1,
            });

            gsap.from(".hero-media-container", {
                y: 60,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.6,
            });

            gsap.from(".hero-badge", {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.5)",
                delay: 1.2,
            });

            gsap.from(".navbar-logo, .navbar-links-pill a, .btn-primary", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.1,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <div className="hero-watermark">MindFrix</div>

            <div className="container hero-container">
                {/* Social Proof */}
                <div className="hero-social-proof" ref={socialRef}>
                    <div className="hero-rating">
                        <span className="star">★</span> 5.0
                    </div>
                    <div className="hero-avatars">
                        <div className="avatar">PG</div>
                        <div className="avatar">SK</div>
                        <div className="avatar">VK</div>
                        <div className="avatar">RS</div>
                    </div>
                    <span className="hero-clients-text">200+ Satisfied Clients</span>
                </div>

                {/* Hero Title */}
                <h1 className="hero-title" ref={titleRef}>
                    <span className="hero-title-line">
                        <span>Build Systems That</span>
                    </span>
                    <span className="hero-title-line">
                        <span>Save Time, Increase</span>
                    </span>
                    <span className="hero-title-line">
                        <span>Revenue, and <span className="gradient-text">Scale</span></span>
                    </span>
                    <span className="hero-title-line">
                        <span>Your <span className="gradient-text">Business</span></span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    We develop custom web apps, AI automation, and sales systems that
                    eliminate manual work and help businesses grow faster.
                </p>

                {/* Buttons */}
                <div className="hero-buttons">
                    <a href="#pricing" className="btn-primary hero-btn-primary" id="hero-cta-btn">
                        Get a Free Consultation
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="#services" className="btn-secondary hero-btn-secondary" id="hero-services-btn">
                        View Services
                    </a>
                </div>

                {/* Trust Line */}
                <div className="hero-trust-line">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Save 10–30 hours per week with automation and custom systems.</span>
                </div>
            </div>

            {/* Hero Media (Full Width) */}
            <div className="hero-media-container" ref={mediaRef}>
                <div className="hero-media-image-wrapper">
                    <img
                        src="/images/hero-dashboard.png"
                        alt="Laptop showing dashboard with AI chatbot and workflow automation connections"
                        loading="eager"
                    />
                </div>

                {/* Rotating Badge */}
                <div className="hero-badge">
                    <div className="hero-badge-inner">
                        <svg className="hero-badge-circle" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="60" fill="#141414" />
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                                />
                            </defs>
                            <text fill="#ffffff" fontSize="10" fontWeight="500" letterSpacing="3">
                                <textPath href="#circlePath">
                                    • AI AUTOMATION • CUSTOM SYSTEMS
                                </textPath>
                            </text>
                        </svg>
                        <div className="hero-badge-arrow">↓</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

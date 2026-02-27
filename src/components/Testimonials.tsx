"use client";

import { useEffect, useRef, useCallback } from "react";

const allTestimonials = [
    {
        quote: "MindFrix completely transformed our brand presence. Their attention to detail and creative vision exceeded all expectations. The team delivered a brand identity that truly resonates with our audience.",
        name: "Sarah Johnson",
        role: "CEO, TechVault",
        initials: "SJ",
        stars: 5,
    },
    {
        quote: "Working with MindFrix was an incredible experience. They understood our vision from day one and translated it into a stunning digital experience that our users absolutely love.",
        name: "Michael Chen",
        role: "Founder, FinScope",
        initials: "MC",
        stars: 5,
    },
    {
        quote: "The level of professionalism and creativity at MindFrix is unmatched. They delivered our entire rebrand in record time without compromising on quality. Highly recommended!",
        name: "Emily Roberts",
        role: "CMO, LuxeBrand",
        initials: "ER",
        stars: 5,
    },
    {
        quote: "From concept to execution, MindFrix demonstrated exceptional skill and dedication. Our website conversion rate increased by 340% after their redesign. Simply phenomenal.",
        name: "David Park",
        role: "Director, NovaMedia",
        initials: "DP",
        stars: 5,
    },
    {
        quote: "MindFrix brought our SaaS product to life with an interface so intuitive, users barely need onboarding. The conversion improvements have been remarkable — over 200% growth in sign-ups.",
        name: "Priya Sharma",
        role: "CPO, Stackly",
        initials: "PS",
        stars: 5,
    },
    {
        quote: "Their strategic approach to branding gave us a cohesive identity across all touchpoints. We've seen a dramatic improvement in client trust and brand recall since the rebrand.",
        name: "James Whitfield",
        role: "Managing Director, Vertex Co.",
        initials: "JW",
        stars: 5,
    },
];

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    initials: string;
    stars: number;
}

function TestimonialCard({ quote, name, role, initials, stars }: TestimonialCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }, []);

    return (
        <div ref={cardRef} className="tcard" onMouseMove={handleMouseMove}>
            <div className="tcard-spotlight" />
            <div className="tcard-border-glow" />
            <div className="tcard-content">
                <div className="tcard-quote-mark">&ldquo;</div>
                <p className="tcard-quote">{quote}</p>
                <div className="tcard-footer">
                    <div className="tcard-avatar">
                        <span>{initials}</span>
                    </div>
                    <div className="tcard-info">
                        <div className="tcard-name">{name}</div>
                        <div className="tcard-role">{role}</div>
                    </div>
                    <div className="tcard-stars">{"★".repeat(stars)}</div>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const glow = glowRef.current;
        if (!section || !glow) return;

        // --- Scroll-reveal for .reveal-item children ---
        const revealEls = section.querySelectorAll(".reveal-item");
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
        );
        revealEls.forEach((el) => revealObserver.observe(el));

        // --- Cursor glow ---
        let raf: number;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let isInside = false;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        };

        const handleMouseEnter = () => {
            isInside = true;
            glow.style.opacity = "1";
        };

        const handleMouseLeave = () => {
            isInside = false;
            glow.style.opacity = "0";
        };

        const animate = () => {
            const ease = isInside ? 0.07 : 0.04;
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            glow.style.transform = `translate(${currentX - 320}px, ${currentY - 320}px)`;
            raf = requestAnimationFrame(animate);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseenter", handleMouseEnter);
        section.addEventListener("mouseleave", handleMouseLeave);
        raf = requestAnimationFrame(animate);

        return () => {
            revealObserver.disconnect();
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseenter", handleMouseEnter);
            section.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    // Two rows with different ordering for visual variety
    const row1 = allTestimonials;
    const row2 = [...allTestimonials.slice(3), ...allTestimonials.slice(0, 3)];
    // Duplicate for seamless infinite loop
    const marqueeRow1 = [...row1, ...row1];
    const marqueeRow2 = [...row2, ...row2];

    return (
        <section ref={sectionRef} className="testimonials-v2 section" id="testimonials">
            {/* Cursor-following glow orb */}
            <div ref={glowRef} className="testimonials-cursor-glow" />

            {/* Static ambient glows */}
            <div className="testimonials-ambient testimonials-ambient--1" />
            <div className="testimonials-ambient testimonials-ambient--2" />

            <div className="container">
                <div className="testimonials-header reveal-item">
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="dot"></span>
                        Testimonials
                    </div>
                    <h2 className="section-title">
                        What Our <span className="gradient-text">Clients</span> Say
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Don&apos;t just take our word for it — real feedback from brands we&apos;ve helped grow and transform.
                    </p>
                </div>
            </div>

            {/* Marquee rows — outside container so they bleed full-width */}
            <div className="testimonials-marquee-wrapper">
                <div className="testimonials-marquee-row">
                    <div className="testimonials-marquee testimonials-marquee--left">
                        {marqueeRow1.map((t, i) => (
                            <TestimonialCard key={`r1-${i}`} {...t} />
                        ))}
                    </div>
                </div>

                <div className="testimonials-marquee-row">
                    <div className="testimonials-marquee testimonials-marquee--right">
                        {marqueeRow2.map((t, i) => (
                            <TestimonialCard key={`r2-${i}`} {...t} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

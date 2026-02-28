"use client";

import { useEffect, useRef, useCallback } from "react";

const allTestimonials = [
    {
        quote: "MindFrix gave Tradee Point a sharp, market-ready identity that speaks directly to our traders and partners. Our brand now commands the trust and recognition we always aimed for.",
        name: "Tradee Point",
        initials: "TP",
        stars: 5,
    },
    {
        quote: "The team at MindFrix truly understood the education space. Our new branding for Sridhar Education feels authoritative, warm, and modern — exactly what students and parents expect today.",
        name: "Sridhar Education",
        initials: "SE",
        stars: 5,
    },
    {
        quote: "MindFrix rebuilt our entire digital presence for Skill Acct with clarity and precision. Enrolments have gone up noticeably and our brand finally feels credible at scale.",
        name: "Skill Acct",
        initials: "SA",
        stars: 5,
    },
    {
        quote: "Tarakeswar Public School now has a brand identity that parents, staff, and students are genuinely proud of. MindFrix delivered a cohesive look that reflects our values impeccably.",
        name: "Tarakeswar Public School",
        initials: "TPS",
        stars: 5,
    },
    {
        quote: "Bengali PSD Store needed a visual language that resonates with our creative community. MindFrix nailed it — our store now looks as premium as the products we offer.",
        name: "Bengali PSD Store",
        initials: "BPS",
        stars: 5,
    },
    {
        quote: "Working with MindFrix on Vedictreasure was a transformative experience. They captured the essence of our heritage brand and gave it a contemporary edge without losing its soul.",
        name: "Vedictreasure",
        initials: "VT",
        stars: 5,
    },
    {
        quote: "MindFrix helped wmcnctech establish a tech-forward brand presence that aligns with our engineering capabilities. Client confidence in our services has visibly improved since the rebrand.",
        name: "wmcnctech",
        initials: "WCT",
        stars: 5,
    },
    {
        quote: "The MindFrix team delivered a compelling digital identity for fmcmedia.in. Our media brand now stands out in a crowded market and our audience engagement metrics have surged.",
        name: "fmcmedia.in",
        initials: "FM",
        stars: 5,
    },
    {
        quote: "wmcnctechnology.com went from a generic online presence to a polished, professional brand thanks to MindFrix. The results have been outstanding — leads, trust, and visibility all improved.",
        name: "wmcnctechnology.com",
        initials: "WNC",
        stars: 5,
    },
];

interface TestimonialCardProps {
    quote: string;
    name: string;
    initials: string;
    stars: number;
}

function TestimonialCard({ quote, name, initials, stars }: TestimonialCardProps) {
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
    const row2 = [...allTestimonials.slice(5), ...allTestimonials.slice(0, 5)];
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

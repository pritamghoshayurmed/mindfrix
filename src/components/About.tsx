"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
    { value: 800, suffix: "+", label: "Projects Completed", icon: "◈" },
    { value: 46, suffix: "%", label: "Revenue Growth", icon: "◉" },
    { value: 250, suffix: "+", label: "Happy Clients", icon: "◈" },
    { value: 15, suffix: "+", label: "Team Members", icon: "◉" },
];

function AnimatedCounter({
    target,
    suffix,
    isK,
}: {
    target: number;
    suffix: string;
    isK?: boolean;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        const duration = 2200;
                        const start = performance.now();
                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 4);
                            setCount(Math.floor(eased * target));
                            if (progress < 1) requestAnimationFrame(animate);
                        };
                        requestAnimationFrame(animate);
                    }
                });
            },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    const display = isK ? `${count}${suffix}` : `${count}${suffix}`;

    return (
        <div className="about-stat-value" ref={ref}>
            {display}
        </div>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className={`about-section ${isRevealed ? "about-section--revealed" : ""}`}
            id="about"
            ref={sectionRef}
        >
            {/* Background orbs */}
            <div className="about-orb about-orb--1" aria-hidden="true" />
            <div className="about-orb about-orb--2" aria-hidden="true" />
            <div className="about-orb about-orb--3" aria-hidden="true" />

            <div className="container about-container">
                {/* ─── LEFT COLUMN ─── */}
                <div className="about-left">
                    {/* Label chip */}
                    <div className="about-label">
                        <span className="about-label-dot" />
                        About Us
                    </div>

                    {/* Heading */}
                    <h2 className="about-title">
                        We Build What Your{" "}
                        <span className="about-title-accent">
                            Business
                            <svg className="about-underline-svg" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M2 9 Q50 2 100 8 Q150 14 198 6" stroke="url(#aboutGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                <defs>
                                    <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FF6B35"/>
                                        <stop offset="100%" stopColor="#FF2D2D"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>{" "}
                        Actually Needs
                    </h2>

                    {/* Body copy */}
                    <div className="about-text-block">
                        <p className="about-text">
                            We help businesses eliminate manual work and increase revenue with
                            custom-built software, AI automation, and conversion systems.
                            Every project is built from scratch — no shortcuts, no templates.
                        </p>
                        <p className="about-text">
                            Our clients typically save 10–30 hours per week and see measurable
                            revenue growth within the first 30 days of launch.
                        </p>
                    </div>

                    {/* Highlight callout */}
                    <div className="about-callout">
                        <span className="about-callout-bar" aria-hidden="true" />
                        <p className="about-callout-text">
                            We stay accountable until your system delivers results — not just until delivery.
                        </p>
                    </div>

                    {/* CTA */}
                    <a href="/contact" className="about-cta">
                        <span>Book a Free Strategy Call</span>
                        <span className="about-cta-arrow">→</span>
                    </a>
                </div>

                {/* ─── RIGHT COLUMN ─── */}
                <div className="about-right">
                    <div className="about-stats-grid">
                        {statsData.map((stat, i) => (
                            <div className="about-stat-card" key={i} style={{ "--card-delay": `${i * 0.1}s` } as React.CSSProperties}>
                                <div className="about-stat-card-inner">
                                    <div className="about-stat-glow" aria-hidden="true" />
                                    <div className="about-stat-icon">{stat.icon}</div>
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        isK={stat.suffix.startsWith("K")}
                                    />
                                    <div className="about-stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative ring */}
                    <div className="about-ring" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}

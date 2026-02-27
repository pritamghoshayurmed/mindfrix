"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        num: "01",
        title: "Business Systems & Internal Tools",
        desc: "Custom dashboards and internal tools to run your business efficiently — replacing scattered spreadsheets with a single source of truth.",
        impact: [
            { text: "Save", highlight: "10–30 hours per week" },
            { text: "Manage everything in", highlight: "one system" },
            { text: "Improve team productivity", highlight: "" },
        ],
        image: "/images/service-business-systems.png",
    },
    {
        num: "02",
        title: "Sales Funnels & Conversion Systems",
        desc: "Landing pages and automated systems that turn visitors into customers with data-driven optimization at every step.",
        impact: [
            { text: "Increase conversions by", highlight: "20–60%" },
            { text: "Capture", highlight: "2–3× more leads" },
            { text: "Automate follow-ups", highlight: "" },
        ],
        image: "/images/service-sales-funnels.png",
    },
    {
        num: "03",
        title: "AI Automation & Integration",
        desc: "AI tools and automation that handle repetitive work for you — so your team can focus on what actually moves the needle.",
        impact: [
            { text: "Automate", highlight: "60–80% of tasks" },
            { text: "Provide", highlight: "24/7 responses" },
            { text: "Reduce operational costs", highlight: "" },
        ],
        image: "/images/service-ai-automation.png",
    },
    {
        num: "04",
        title: "Custom Web & App Development",
        desc: "Scalable websites and web apps built for your exact needs — no templates, no compromises, just clean custom code.",
        impact: [
            { text: "Launch faster", highlight: "" },
            { text: "Replace expensive tools", highlight: "" },
            { text: "Support long-term growth", highlight: "" },
        ],
        image: "/images/service-web-development.png",
    },
];

const AUTO_PLAY_DURATION = 4500;

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLSpanElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Entrance animation
    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
            tl.from(".sv-head", { opacity: 0, y: 50, duration: 0.9, ease: "power3.out" })
              .from(".sv-body", { opacity: 0, y: 40, duration: 0.85, ease: "power3.out" }, "-=0.55")
              .from(".sv-tabs", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.55");
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Core transition: out → swap state → in
    const animateTransition = useCallback(
        (nextIndex: number) => {
            if (isAnimating || nextIndex === activeIndex) return;
            setIsAnimating(true);

            const content = contentRef.current;
            const img = imageRef.current;
            const wm = watermarkRef.current;

            // — OUT —
            const outTl = gsap.timeline({
                onComplete: () => {
                    setActiveIndex(nextIndex);
                    // Use rAF so React has re-rendered new content before animating IN
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const inTl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
                            inTl.fromTo(
                                content,
                                { opacity: 0, y: 28, filter: "blur(5px)" },
                                { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.58, ease: "power3.out" },
                                0
                            )
                            .fromTo(
                                img,
                                { opacity: 0, scale: 1.05, filter: "blur(8px)" },
                                { opacity: 1, scale: 1,    filter: "blur(0px)", duration: 0.62, ease: "power3.out" },
                                0.04
                            )
                            .fromTo(
                                wm,
                                { opacity: 0, y: 30 },
                                { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
                                0.08
                            );
                        });
                    });
                },
            });
            outTl.to(content, { opacity: 0, y: -20, filter: "blur(5px)", duration: 0.28, ease: "power2.in" }, 0);
            outTl.to(img,     { opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 0.28, ease: "power2.in" }, 0);
            outTl.to(wm,      { opacity: 0, y: -20, duration: 0.22, ease: "power2.in" }, 0);
        },
        [activeIndex, isAnimating]
    );

    // Auto-play
    const scheduleNext = useCallback(() => {
        if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        autoPlayRef.current = setTimeout(() => {
            animateTransition((activeIndex + 1) % servicesData.length);
        }, AUTO_PLAY_DURATION);
    }, [activeIndex, animateTransition]);

    useEffect(() => {
        scheduleNext();
        return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
    }, [activeIndex, scheduleNext]);

    const handleTabClick = useCallback(
        (index: number) => {
            if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
            animateTransition(index);
        },
        [animateTransition]
    );

    const active = servicesData[activeIndex];

    return (
        <section className="sv section" id="services" ref={sectionRef}>
            <div className="sv-pin">
                <div className="sv-noise" />
                <div className="sv-mesh">
                    <div className="sv-mesh-grad sv-mesh-grad--1" />
                    <div className="sv-mesh-grad sv-mesh-grad--2" />
                    <div className="sv-mesh-grad sv-mesh-grad--3" />
                </div>

                {/* Watermark number */}
                <div className="sv-watermark" aria-hidden="true">
                    <span className="sv-watermark-num" ref={watermarkRef}>
                        {active.num}
                    </span>
                </div>

                <div className="container sv-container">
                    {/* Header */}
                    <div className="sv-head">
                        <div className="sv-head-left">
                            <div className="sv-label">
                                <span className="sv-label-dot" />
                                Services
                            </div>
                            <h2 className="sv-title">
                                What We <span className="gradient-text">Offer</span>
                            </h2>
                        </div>
                        <p className="sv-subtitle">
                            Solutions designed to automate operations, increase
                            conversions, and support long-term growth.
                        </p>
                    </div>

                    {/* Body: content + image */}
                    <div className="sv-body">
                        <div className="sv-content">
                            <div className="sv-content-inner" ref={contentRef}>
                                <span className="sv-content-num">{active.num}</span>
                                <h3 className="sv-content-title">{active.title}</h3>
                                <p className="sv-content-desc">{active.desc}</p>
                                <div className="sv-content-list">
                                    {active.impact.map((item, i) => (
                                        <div key={i} className="sv-content-item">
                                            <span className="sv-content-check">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 6L9 17L4 12" stroke="url(#svGradCheck)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <defs>
                                                        <linearGradient id="svGradCheck" x1="4" y1="6" x2="20" y2="17" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#ff2d2d" />
                                                            <stop offset="1" stopColor="#ffac70" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <span className="sv-content-text">
                                                {item.text}{" "}
                                                {item.highlight && <strong>{item.highlight}</strong>}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="sv-visual">
                            <div className="sv-visual-frame">
                                <div className="sv-visual-img" ref={imageRef}>
                                    <img src={active.image} alt={active.title} draggable={false} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab navigation */}
                    <div className="sv-tabs">
                        {servicesData.map((service, i) => (
                            <button
                                key={i}
                                className={`sv-tab ${activeIndex === i ? "sv-tab--active" : ""} ${activeIndex > i ? "sv-tab--past" : ""}`}
                                onClick={() => handleTabClick(i)}
                            >
                                <div className="sv-tab-inner">
                                    <span className="sv-tab-num">{service.num}</span>
                                    <span className="sv-tab-title">{service.title}</span>
                                </div>
                                <span className="sv-tab-bar">
                                    <span
                                        className={`sv-tab-bar-fill ${activeIndex === i ? "sv-tab-bar-fill--run" : ""}`}
                                        style={{ "--sv-duration": `${AUTO_PLAY_DURATION}ms` } as React.CSSProperties}
                                    />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

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

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const prevIndexRef = useRef(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // GSAP ScrollTrigger pinning
    useEffect(() => {
        if (!sectionRef.current || !pinnedRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${window.innerHeight * 3.5}`,
                pin: pinnedRef.current,
                pinSpacing: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalItems = servicesData.length;
                    const newIndex = Math.min(
                        totalItems - 1,
                        Math.floor(progress * totalItems)
                    );
                    setActiveIndex(newIndex);
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Entrance reveal
    useEffect(() => {
        if (!sectionRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Content transition
    useEffect(() => {
        if (activeIndex !== prevIndexRef.current) {
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                setDisplayIndex(activeIndex);
                prevIndexRef.current = activeIndex;
                setTimeout(() => setIsTransitioning(false), 50);
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [activeIndex]);

    const handleItemClick = useCallback(
        (index: number) => {
            if (index === activeIndex || !sectionRef.current) return;
            const sectionTop =
                sectionRef.current.getBoundingClientRect().top + window.scrollY;
            const totalScroll = window.innerHeight * 3.5;
            const targetScroll =
                sectionTop + (index / servicesData.length) * totalScroll;
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
        },
        [activeIndex]
    );

    const activeService = servicesData[displayIndex];

    return (
        <section
            className={`sv section ${isRevealed ? "sv--revealed" : ""}`}
            id="services"
            ref={sectionRef}
        >
            <div className="sv-pin" ref={pinnedRef}>
                <div className="sv-noise" />

                <div className="sv-mesh">
                    <div className="sv-mesh-grad sv-mesh-grad--1" />
                    <div className="sv-mesh-grad sv-mesh-grad--2" />
                    <div className="sv-mesh-grad sv-mesh-grad--3" />
                </div>

                {/* Large watermark number */}
                <div className="sv-watermark" aria-hidden="true">
                    <span
                        className={`sv-watermark-num ${isTransitioning ? "sv-watermark-num--out" : ""}`}
                    >
                        {activeService.num}
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

                    {/* Tab navigation */}
                    <div className="sv-tabs">
                        {servicesData.map((service, i) => (
                            <button
                                key={i}
                                className={`sv-tab ${activeIndex === i ? "sv-tab--active" : ""} ${activeIndex > i ? "sv-tab--past" : ""}`}
                                onClick={() => handleItemClick(i)}
                            >
                                <div className="sv-tab-inner">
                                    <span className="sv-tab-num">{service.num}</span>
                                    <span className="sv-tab-title">
                                        {service.title}
                                    </span>
                                </div>
                                <span className="sv-tab-bar" />
                            </button>
                        ))}
                    </div>

                    {/* Body: content + image */}
                    <div className="sv-body">
                        <div className="sv-content">
                            <div
                                className={`sv-content-inner ${isTransitioning ? "sv-content-inner--out" : ""}`}
                            >
                                <span className="sv-content-num">
                                    {activeService.num}
                                </span>
                                <h3 className="sv-content-title">
                                    {activeService.title}
                                </h3>
                                <p className="sv-content-desc">
                                    {activeService.desc}
                                </p>
                                <div className="sv-content-list">
                                    {activeService.impact.map((item, i) => (
                                        <div key={i} className="sv-content-item">
                                            <span className="sv-content-check">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M20 6L9 17L4 12"
                                                        stroke="url(#svGradCheck)"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <defs>
                                                        <linearGradient
                                                            id="svGradCheck"
                                                            x1="4"
                                                            y1="6"
                                                            x2="20"
                                                            y2="17"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#ff2d2d" />
                                                            <stop
                                                                offset="1"
                                                                stopColor="#ffac70"
                                                            />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <span className="sv-content-text">
                                                {item.text}{" "}
                                                {item.highlight && (
                                                    <strong>{item.highlight}</strong>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="sv-visual">
                            <div className="sv-visual-frame">
                                <div
                                    className={`sv-visual-img ${isTransitioning ? "sv-visual-img--out" : ""}`}
                                >
                                    <img
                                        src={activeService.image}
                                        alt={activeService.title}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}

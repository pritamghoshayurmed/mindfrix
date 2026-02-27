"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const stepsData = [
    {
        num: "01",
        title: "Discovery",
        desc: "We map your workflows, identify inefficiencies, and define the highest-impact opportunities in your business.",
        image: "/images/process/step-discovery.png",
    },
    {
        num: "02",
        title: "Build",
        desc: "We design and develop your custom system, automation, or application — built precisely to your requirements.",
        image: "/images/process/step-build.png",
    },
    {
        num: "03",
        title: "Launch",
        desc: "Your system goes live after rigorous testing, with your team fully trained and confident to use it.",
        image: "/images/process/step-launch.png",
    },
    {
        num: "04",
        title: "Scale",
        desc: "We monitor performance, iterate based on data, and expand your systems as your business grows.",
        image: "/images/process/step-scale.png",
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const arrowsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isRevealed, setIsRevealed] = useState(false);

    // Intersection Observer to trigger animation
    useEffect(() => {
        if (!sectionRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // GSAP fade-in from left animation
    useEffect(() => {
        if (!isRevealed) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Header fades in from left
        tl.fromTo(
            headerRef.current,
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 0.8 }
        );

        // Each step fades in from left, staggered
        stepsData.forEach((_, i) => {
            const delay = 0.15 + i * 0.2;

            if (stepsRef.current[i]) {
                tl.fromTo(
                    stepsRef.current[i],
                    { opacity: 0, x: -50 },
                    { opacity: 1, x: 0, duration: 0.7 },
                    delay
                );
            }

            // Arrows fade in after the step before them
            if (arrowsRef.current[i]) {
                tl.fromTo(
                    arrowsRef.current[i],
                    { opacity: 0, scaleX: 0 },
                    { opacity: 1, scaleX: 1, duration: 0.5, transformOrigin: "left center" },
                    delay + 0.2
                );
            }
        });
    }, [isRevealed]);

    return (
        <section
            className={`hiw section ${isRevealed ? "hiw--revealed" : ""}`}
            id="how-it-works"
            ref={sectionRef}
        >
            {/* Background effects */}
            <div className="hiw-noise" />
            <div className="hiw-mesh">
                <div className="hiw-mesh-grad hiw-mesh-grad--1" />
                <div className="hiw-mesh-grad hiw-mesh-grad--2" />
                <div className="hiw-mesh-grad hiw-mesh-grad--3" />
            </div>

            <div className="container hiw-container">
                {/* Header */}
                <div className="hiw-header" ref={headerRef}>
                    <div className="hiw-label">
                        <span className="hiw-label-dot" />
                        How It Works
                    </div>
                    <h2 className="hiw-title">
                        Simple <span className="gradient-text">Process</span>
                    </h2>
                </div>

                {/* Steps row */}
                <div className="hiw-row">
                    {stepsData.map((step, i) => (
                        <div className="hiw-step-group" key={i}>
                            {/* Step item */}
                            <div
                                className="hiw-step"
                                ref={(el) => {
                                    stepsRef.current[i] = el;
                                }}
                            >
                                <div className="hiw-icon-box">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        draggable={false}
                                    />
                                </div>
                                <h3 className="hiw-step-title">{step.title}</h3>
                                <p className="hiw-step-desc">{step.desc}</p>
                            </div>

                            {/* Dashed arrow connector (not after last step) */}
                            {i < stepsData.length - 1 && (
                                <div
                                    className="hiw-arrow"
                                    ref={(el) => {
                                        arrowsRef.current[i] = el;
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 120 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <linearGradient
                                                id={`arrowGrad${i}`}
                                                x1="0%"
                                                y1="0%"
                                                x2="100%"
                                                y2="0%"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#ff6b35"
                                                    stopOpacity="0.4"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#ffac70"
                                                    stopOpacity="0.7"
                                                />
                                            </linearGradient>
                                        </defs>
                                        <line
                                            x1="0"
                                            y1="12"
                                            x2="100"
                                            y2="12"
                                            stroke={`url(#arrowGrad${i})`}
                                            strokeWidth="1.5"
                                            strokeDasharray="6 4"
                                        />
                                        <path
                                            d="M100 5 L115 12 L100 19"
                                            stroke={`url(#arrowGrad${i})`}
                                            strokeWidth="1.5"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

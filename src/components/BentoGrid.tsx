"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BentoGrid() {
    const sectionRef = useScrollReveal(".reveal-item");

    return (
        <section className="bento section" ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="dot"></span>
                        Why Choose Us
                    </div>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Metrics</span> Speak
                    </h2>
                </div>

                <div className="bento-grid" style={{ position: "relative" }}>
                    {/* Card 1 - Large gradient */}
                    <div className="bento-card gradient-card span-2 reveal-item reveal-scale">
                        <div className="bento-card-title">Customer Satisfaction</div>
                        <div className="bento-card-value">98.7%</div>
                        <div className="bento-card-subtitle">
                            Our clients consistently rate their experience as exceptional
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bento-card reveal-item reveal-scale">
                        <div className="bento-card-title">Projects Delivered</div>
                        <div className="bento-card-value" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            2,847
                        </div>
                        <div className="bento-card-subtitle" style={{ color: "var(--color-text-muted)" }}>
                            And counting...
                        </div>
                    </div>

                    {/* Card 3 - Features Tags */}
                    <div className="bento-card reveal-item reveal-scale">
                        <div className="bento-card-title">Our Expertise</div>
                        <div className="bento-tags">
                            <span className="bento-tag">Branding</span>
                            <span className="bento-tag">UI/UX</span>
                            <span className="bento-tag">Webflow</span>
                            <span className="bento-tag">React</span>
                            <span className="bento-tag">Next.js</span>
                            <span className="bento-tag">Motion</span>
                        </div>
                    </div>

                    {/* Card 4 - Dark card */}
                    <div className="bento-card dark-card span-2 reveal-item reveal-scale">
                        <div className="bento-card-title">Average Turnaround</div>
                        <div className="bento-card-value">48hrs</div>
                        <div className="bento-card-subtitle">
                            Lightning-fast delivery without compromising quality
                        </div>
                        <div className="bento-tags" style={{ marginTop: "1rem" }}>
                            <span className="bento-tag">Fast Delivery</span>
                            <span className="bento-tag">Quality First</span>
                            <span className="bento-tag">24/7 Support</span>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="bento-card gradient-card reveal-item reveal-scale">
                        <div className="bento-card-title">Global Reach</div>
                        <div className="bento-card-value">42+</div>
                        <div className="bento-card-subtitle">Countries served worldwide</div>
                    </div>

                    {/* Card 6 */}
                    <div className="bento-card reveal-item reveal-scale">
                        <div className="bento-card-title">Client Retention</div>
                        <div className="bento-card-value" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            94%
                        </div>
                        <div className="bento-card-subtitle" style={{ color: "var(--color-text-muted)" }}>
                            Clients come back for more
                        </div>
                    </div>

                    {/* Floating contact badge */}
                    <div className="bento-contact-badge">
                        <svg viewBox="0 0 120 120" width="120" height="120">
                            <defs>
                                <path
                                    id="contactCircle"
                                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                                />
                                <linearGradient id="bentoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff2d2d" />
                                    <stop offset="100%" stopColor="#ffac70" />
                                </linearGradient>
                            </defs>
                            <circle cx="60" cy="60" r="55" fill="url(#bentoGrad)" />
                            <text fill="white" fontSize="10" fontWeight="600" letterSpacing="3">
                                <textPath href="#contactCircle">
                                    • CONTACT US • GET IN TOUCH
                                </textPath>
                            </text>
                            <text
                                x="60"
                                y="65"
                                textAnchor="middle"
                                fill="white"
                                fontSize="24"
                                fontWeight="bold"
                            >
                                →
                            </text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

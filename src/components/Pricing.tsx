"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const pricingPlans = [
    {
        tier: "Starter",
        price: "$499",
        period: "per month",
        features: [
            "Up to 5 design requests",
            "2 active projects",
            "48-hour turnaround",
            "Source files included",
            "Basic support",
        ],
        featured: false,
    },
    {
        tier: "Professional",
        price: "$999",
        period: "per month",
        features: [
            "Unlimited design requests",
            "5 active projects",
            "24-hour turnaround",
            "Source files + brand kit",
            "Priority support",
            "Dedicated designer",
        ],
        featured: true,
    },
    {
        tier: "Enterprise",
        price: "$2,499",
        period: "per month",
        features: [
            "Unlimited everything",
            "10+ active projects",
            "Same-day turnaround",
            "Full brand management",
            "24/7 premium support",
            "Dedicated team",
            "Strategy consulting",
        ],
        featured: false,
    },
];

const partners = [
    "Google",
    "Microsoft",
    "Spotify",
    "Slack",
    "Figma",
    "Notion",
    "Stripe",
    "Vercel",
];

export default function Pricing() {
    const sectionRef = useScrollReveal(".reveal-item");

    return (
        <>
            <section className="pricing section" id="pricing" ref={sectionRef}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <div className="section-label" style={{ justifyContent: "center" }}>
                            <span className="dot"></span>
                            Pricing
                        </div>
                        <h2 className="section-title">
                            Simple, Transparent <span className="gradient-text">Pricing</span>
                        </h2>
                        <p className="section-subtitle" style={{ margin: "0 auto" }}>
                            Choose the plan that fits your needs. Scale up or down anytime.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {pricingPlans.map((plan, i) => (
                            <div
                                className={`pricing-card reveal-item reveal-scale ${plan.featured ? "featured" : ""}`}
                                key={i}
                                id={`pricing-${plan.tier.toLowerCase()}`}
                            >
                                <div className="pricing-tier">{plan.tier}</div>
                                <div className="pricing-price">{plan.price}</div>
                                <div className="pricing-period">{plan.period}</div>

                                <div className="pricing-features">
                                    {plan.features.map((feature, j) => (
                                        <div className="pricing-feature" key={j}>
                                            <span className="check">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button className="btn-primary">
                                    Get Started
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="partners">
                <div className="container">
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "0.9rem",
                            color: "var(--color-text-light)",
                            marginBottom: "2rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        Trusted by leading brands
                    </p>
                    <div className="partners-row">
                        {partners.map((partner, i) => (
                            <span className="partner-logo" key={i}>
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

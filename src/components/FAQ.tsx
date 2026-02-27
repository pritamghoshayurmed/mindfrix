"use client";

import { useState } from "react";
import Script from "next/script";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqData = [
    {
        q: "What exactly does MindFrix build?",
        a: "We build custom web applications, AI automation workflows, internal business tools, and sales funnel systems. Everything is built from scratch for your specific business — no templates, no off-the-shelf software.",
    },
    {
        q: "How much time can your automation save us?",
        a: "Most clients save between 10 and 30 hours per week within the first 60 days. The exact savings depend on your current workflows, but we typically automate repetitive admin tasks, data entry, follow-ups, reporting, and customer communication.",
    },
    {
        q: "How quickly will we see results?",
        a: "Most projects go live within 4–8 weeks. Sales funnel and automation projects often show measurable improvements — more leads, lower cost-per-acquisition, or time savings — within the first 30 days of going live.",
    },
    {
        q: "What is the investment for your services?",
        a: "We tailor pricing to the complexity and scope of each project. Most clients invest between $3,000 and $25,000 depending on what's being built. Book a free consultation and we'll give you a clear, no-obligation quote after understanding your needs.",
    },
    {
        q: "Do I need a technical background to work with you?",
        a: "Not at all. We handle all the technical heavy lifting. You simply tell us what you want to achieve — more leads, less manual work, faster operations — and we translate that into a working system.",
    },
    {
        q: "How is MindFrix different from hiring a freelancer or in-house team?",
        a: "With MindFrix you get a full team — strategist, designer, developer, and automation engineer — for a fraction of the cost of hiring in-house. Unlike freelancers, we own the outcome: we stay accountable until the system is delivering results.",
    },
    {
        q: "What industries do you work with?",
        a: "We work with B2B service businesses, e-commerce brands, SaaS companies, marketing agencies, and professional services firms. If your business has repetitive workflows or needs more leads, we can help.",
    },
    {
        q: "Will you maintain and support the systems after launch?",
        a: "Yes. We offer ongoing maintenance and support retainers. We'll also train your team on how to use and manage everything we build so you're never dependent on us for day-to-day operations.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
        },
    })),
};

function FAQItem({ item, isOpen, toggle }: { item: typeof faqData[0]; isOpen: boolean; toggle: () => void }) {
    return (
        <div className={`faq-item ${isOpen ? "open" : ""}`}>
            <button className="faq-question" onClick={toggle}>
                {item.q}
                <span className="faq-chevron">▼</span>
            </button>
            <div className="faq-answer">
                <div className="faq-answer-content">{item.a}</div>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useScrollReveal(".reveal-item");

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const half = Math.ceil(faqData.length / 2);
    const col1 = faqData.slice(0, half);
    const col2 = faqData.slice(half);

    return (
        <>
            <Script
                id="schema-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <section className="faq section" id="faq" ref={sectionRef}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <div className="section-label" style={{ justifyContent: "center" }}>
                            <span className="dot"></span>
                            FAQ
                        </div>
                        <h2 className="section-title">
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </h2>
                        <p style={{ color: "var(--text-muted, #aaa)", maxWidth: "540px", margin: "0.75rem auto 0" }}>
                            Everything you need to know about working with MindFrix.
                        </p>
                    </div>

                    <div className="faq-grid">
                        <div>
                            {col1.map((item, i) => (
                                <div className="reveal-item" key={i}>
                                    <FAQItem
                                        item={item}
                                        isOpen={openIndex === i}
                                        toggle={() => toggle(i)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            {col2.map((item, i) => {
                                const realIndex = i + half;
                                return (
                                    <div className="reveal-item" key={realIndex}>
                                        <FAQItem
                                            item={item}
                                            isOpen={openIndex === realIndex}
                                            toggle={() => toggle(realIndex)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqData = [
    {
        q: "What types of design services do you offer?",
        a: "We offer a comprehensive range of design services including brand identity, UI/UX design, web development, print design, motion graphics, and creative strategy consulting.",
    },
    {
        q: "How does the unlimited design subscription work?",
        a: "With our subscription model, you can submit as many design requests as you like. We work through them one at a time, delivering high-quality designs with a 24-48 hour turnaround depending on your plan.",
    },
    {
        q: "What is your typical turnaround time?",
        a: "Our turnaround time varies by plan. Starter plans receive designs in 48 hours, Professional in 24 hours, and Enterprise clients enjoy same-day delivery for urgent requests.",
    },
    {
        q: "Can I cancel my subscription anytime?",
        a: "Absolutely! Our subscriptions are flexible with no long-term contracts. You can upgrade, downgrade, or cancel your plan at any time without any cancellation fees.",
    },
    {
        q: "Do you provide source files?",
        a: "Yes, all plans include complete source files in industry-standard formats like Figma, Adobe Creative Suite, and any other formats you need.",
    },
    {
        q: "How do I communicate with my designer?",
        a: "We use a dedicated project management platform where you can submit requests, provide feedback, and communicate directly with your assigned designer in real-time.",
    },
    {
        q: "What if I'm not satisfied with the design?",
        a: "We offer unlimited revisions until you're 100% satisfied. Our goal is to exceed your expectations, and we'll keep iterating until we get it right.",
    },
    {
        q: "Do you work with startups and small businesses?",
        a: "Yes! We work with businesses of all sizes, from early-stage startups to Fortune 500 companies. Our Starter plan is specifically designed for small businesses and growing brands.",
    },
];

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
        <section className="faq section" ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="dot"></span>
                        FAQ
                    </div>
                    <h2 className="section-title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
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
    );
}

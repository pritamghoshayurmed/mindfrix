"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const worksData = [
    {
        category: "01 Branding",
        title: "Luxe Fashion",
        description:
            "Complete brand overhaul for a luxury fashion startup. We reimagined their visual identity from logo to packaging, creating a cohesive premium experience.",
        image: "/images/portfolio-phone.png",
        tags: ["Brand Identity", "Logo Design", "Packaging"],
        stats: [
            { num: "340%", label: "Brand Recognition" },
            { num: "89%", label: "Customer Recall" },
        ],
    },
    {
        category: "02 Web Design",
        title: "TechVault Platform",
        description:
            "End-to-end design and development of a SaaS analytics dashboard with real-time data visualization and intuitive navigation patterns.",
        image: "/images/portfolio-laptop.png",
        tags: ["UI/UX", "Development", "Dashboard"],
        stats: [
            { num: "2.8s", label: "Avg. Load Time" },
            { num: "96%", label: "User Satisfaction" },
        ],
    },
    {
        category: "03 Mobile App",
        title: "FinScope Pro",
        description:
            "A fintech mobile application designed for seamless personal finance management with AI-driven insights and clean data visualization.",
        image: "/images/portfolio-phone.png",
        tags: ["Mobile", "Fintech", "AI Integration"],
        stats: [
            { num: "50K+", label: "Downloads" },
            { num: "4.9", label: "App Rating" },
        ],
    },
];

export default function Works() {
    const sectionRef = useScrollReveal(".reveal-item");

    return (
        <section className="works section" id="works" ref={sectionRef}>
            <div className="container">
                <div className="works-header">
                    <div>
                        <div className="section-label">
                            <span className="dot"></span>
                            Portfolio
                        </div>
                        <h2 className="section-title">
                            Recent <span className="gradient-text">Works</span>
                        </h2>
                    </div>
                    <a href="#" className="btn-secondary">
                        View All Projects
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {worksData.map((work, i) => (
                    <div className="work-card reveal-item" key={i}>
                        <div className="work-card-left">
                            <span className="work-card-category">{work.category}</span>
                            <p className="work-card-description">{work.description}</p>
                        </div>

                        <div className="work-card-image">
                            <img src={work.image} alt={work.title} />
                        </div>

                        <div className="work-card-right">
                            <div className="work-card-tags">
                                {work.tags.map((tag, j) => (
                                    <span className="work-card-tag" key={j}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="work-card-stats">
                                {work.stats.map((stat, j) => (
                                    <div key={j}>
                                        <div className="work-card-stat-num">{stat.num}</div>
                                        <div className="work-card-stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

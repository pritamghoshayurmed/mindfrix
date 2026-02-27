"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const awards = [
    { icon: "🏆", title: "Best Digital Agency", org: "Awwwards", year: "2024" },
    { icon: "🎖️", title: "Design Excellence Award", org: "CSS Design Awards", year: "2024" },
    { icon: "🥇", title: "Top Creative Studio", org: "Webby Awards", year: "2023" },
    { icon: "🏅", title: "Innovation in Branding", org: "Brand New Awards", year: "2023" },
    { icon: "🌟", title: "Best UI/UX Design", org: "Dribbble", year: "2022" },
    { icon: "🎨", title: "Creative Team of the Year", org: "Adobe Design Awards", year: "2022" },
];

export default function Awards() {
    const sectionRef = useScrollReveal(".reveal-item");

    return (
        <section className="awards section" ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: "center" }}>
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="dot"></span>
                        Recognition
                    </div>
                    <h2 className="section-title">
                        Achievements & <span className="gradient-text">Awards</span>
                    </h2>
                </div>

                <ul className="awards-list">
                    {awards.map((award, i) => (
                        <li className="award-item reveal-item reveal-left" key={i}>
                            <div className="award-left">
                                <div className="award-icon">{award.icon}</div>
                                <div>
                                    <div className="award-title">{award.title}</div>
                                    <div className="award-org">{award.org}</div>
                                </div>
                            </div>
                            <span className="award-year">{award.year}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

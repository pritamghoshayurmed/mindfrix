"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const teamMembers = [
    { name: "Alex Rivera", role: "Creative Director", initials: "AR" },
    { name: "Priya Sharma", role: "Lead UI/UX Designer", initials: "PS" },
    { name: "Marcus Cole", role: "Senior Developer", initials: "MC" },
    { name: "Sophia Lin", role: "Brand Strategist", initials: "SL" },
    { name: "James Wright", role: "Motion Designer", initials: "JW" },
    { name: "Elena Vasquez", role: "Project Manager", initials: "EV" },
];

export default function Team() {
    const sectionRef = useScrollReveal(".reveal-item");

    return (
        <section className="team section" ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: "center" }}>
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="dot"></span>
                        Our Team
                    </div>
                    <h2 className="section-title">
                        Meet Our <span className="gradient-text">Experts</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto 3rem" }}>
                        A passionate team of creative minds dedicated to delivering exceptional results.
                    </p>
                </div>

                <div className="team-grid">
                    {teamMembers.map((member, i) => (
                        <div className="team-card reveal-item reveal-scale" key={i} id={`team-member-${i}`}>
                            <div className="team-card-image">
                                <div className="team-card-placeholder">{member.initials}</div>
                                <div className="team-card-info">
                                    <div className="team-card-name">{member.name}</div>
                                    <div className="team-card-role">{member.role}</div>
                                    <div className="team-card-socials">
                                        <a className="team-card-social" href="#" aria-label="LinkedIn">in</a>
                                        <a className="team-card-social" href="#" aria-label="Twitter">𝕏</a>
                                        <a className="team-card-social" href="#" aria-label="Dribbble">◉</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

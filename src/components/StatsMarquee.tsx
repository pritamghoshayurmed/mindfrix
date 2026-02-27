"use client";

const marqueeItems = [
    "Business Systems",
    "Internal Tools",
    "Sales Funnels",
    "Conversion Systems",
    "AI Automation & Integration",
    "Custom Web & App Development",
];

const marqueeItems2 = [
    "5+ Years of Experience",
    "100+ Projects Delivered",
    "50+ Happy Clients",
    "98% Client Satisfaction",
    "10+ Industries Served",
    "24 / 7 Dedicated Support",
];

const repeat = (arr: string[], times = 5) =>
    Array.from({ length: times }, () => arr).flat();

export default function StatsMarquee() {
    return (
        <section className="marquee-wrapper">
            <div className="marquee-scene">
                {/* Strip 1 — tilts down-right, scrolls left (orange gradient) */}
                <div className="marquee-strip marquee-strip--1">
                    <div className="marquee-track marquee-track--fwd">
                        {repeat(marqueeItems).map((item, i) => (
                            <span className="marquee-item" key={i}>
                                <span className="marquee-star">✦</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Strip 2 — tilts down-left, scrolls right (dark) */}
                <div className="marquee-strip marquee-strip--2">
                    <div className="marquee-track marquee-track--rev">
                        {repeat(marqueeItems2).map((item, i) => (
                            <span className="marquee-item" key={i}>
                                <span className="marquee-star">✦</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

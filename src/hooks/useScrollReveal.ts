"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook that adds a '.revealed' class to elements when they enter viewport.
 * Uses IntersectionObserver for reliable scroll detection that works with all
 * scrolling implementations including Lenis.
 */
export function useScrollReveal(selector: string, stagger = false) {
    const ref = useRef<HTMLElement>(null);

    const observe = useCallback(() => {
        if (!ref.current) return;

        const elements = ref.current.querySelectorAll(selector);
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (stagger) {
                            // Stagger the reveal for multiple elements
                            const el = entry.target as HTMLElement;
                            const siblings = Array.from(elements);
                            const index = siblings.indexOf(el);
                            setTimeout(() => {
                                el.classList.add("revealed");
                            }, index * 100);
                        } else {
                            entry.target.classList.add("revealed");
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [selector, stagger]);

    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(observe, 100);
        return () => clearTimeout(timer);
    }, [observe]);

    return ref;
}

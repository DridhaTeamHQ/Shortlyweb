"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Orb Animation (Floating)
            gsap.to(orbRef.current, {
                y: -30,
                x: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // 2. Text Reveal
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".hero-text-char",
                { y: "100%", opacity: 0, rotateX: -20 },
                {
                    y: "0%",
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.05,
                    delay: 0.2,
                }
            )
                .fromTo(
                    ".hero-subtext",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.5"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
        >
            {/* Background Abstract Gradient Orb */}
            <div
                ref={orbRef}
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--primary) 0%, rgba(0,0,0,0) 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            />

            <div className="container relative z-10 text-center px-4">
                <h1
                    ref={textRef}
                    className="text-[12vw] md:text-[8vw] font-bold font-heading leading-[0.9] tracking-tighter text-foreground overflow-hidden"
                    aria-label="Building Digital Future"
                >
                    {/* Creating individual spans for character stagger while keeping accessibility */}
                    <div className="overflow-hidden flex justify-center flex-wrap gap-x-[0.2em] mb-2">
                        {"Building".split("").map((char, i) => (
                            <span key={i} className="hero-text-char block transform-style-3d">{char}</span>
                        ))}
                    </div>
                    <div className="overflow-hidden flex justify-center flex-wrap gap-x-[0.2em]">
                        {"Digital Future.".split("").map((char, i) => (
                            <span key={i + 10} className="hero-text-char block transform-style-3d text-primary">{char}</span>
                        ))}
                    </div>
                </h1>

                <p className="hero-subtext mt-8 text-lg md:text-xl font-sans text-muted max-w-xl mx-auto leading-relaxed glass-panel p-6 rounded-2xl border border-border">
                    Operating digital platforms with a long-term vision. We engineer scalable solutions for the modern web.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-subtext opacity-50">
                <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
                <div className="w-[1px] h-12 bg-foreground/20 overflow-hidden">
                    <div className="w-full h-1/2 bg-primary animate-scroll-down" />
                </div>
            </div>
        </section>
    );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        title: "Shortly",
        category: "News Platform",
        image: "/shortly-abstract.png", // Using the asset we have
        description: "Hyperlocal news aggregator with real-time updates.",
    },
    {
        id: "02",
        title: "Hyperlocal",
        category: "Tech Stack",
        image: "/hero-bg.png", // Using another asset
        description: "Location-based data processing engine.",
    },
    {
        id: "03",
        title: "AI Core",
        category: "Integration",
        image: "/dridha_huncwot_hero_1766136748966.png", // Using huncwot asset
        description: "Machine learning integration pipeline for scalable apps.",
    },
];

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pin = gsap.fromTo(
                sectionRef.current,
                {
                    translateX: 0,
                },
                {
                    translateX: "-200vw", // Move horizontally by (total sections - 1) * 100vw
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "2000 top", // Scroll distance
                        scrub: 0.6,
                        pin: true,
                    },
                }
            );

            // Parallax for Numbers
            gsap.utils.toArray(".project-number").forEach((num, i) => {
                gsap.to(num as Element, {
                    x: 100, // Move slightly faster/slower than container
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "2000 top",
                        scrub: true,
                    }
                })
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="overflow-hidden bg-background relative">
            <div ref={sectionRef} className="flex h-screen w-[300vw]">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="w-screen h-full flex flex-col justify-center items-center relative px-8"
                    >
                        {/* Background Number (Parallax) */}
                        <div className="project-number absolute top-20 left-10 md:left-40 text-[20vw] md:text-[15vw] font-bold text-foreground opacity-[0.03] select-none leading-none z-0 font-heading">
                            {project.id}
                        </div>

                        {/* Glass Card */}
                        <div className="relative z-10 w-full max-w-4xl h-[60vh] md:h-[70vh] glass-panel rounded-3xl overflow-hidden border border-border group hover:border-primary/50 transition-colors duration-500">

                            {/* Image Container */}
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <span className="text-primary font-mono text-xs uppercase tracking-widest mb-2 block">
                                    {project.category}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 max-w-md font-sans text-lg">
                                    {project.description}
                                </p>

                                {/* Hover Button */}
                                <div className="mt-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                    <button className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors font-medium text-sm uppercase tracking-wide">
                                        View Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Progress for this section */}
            <div className="absolute bottom-10 right-10 z-20 font-mono text-xs text-muted">
                SCROLL TO EXPLORE -&gt;
            </div>
        </section>
    );
}

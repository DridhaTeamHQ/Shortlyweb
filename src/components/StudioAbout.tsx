"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StudioAbout() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} id="about" className="py-32 relative bg-black overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Section Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 flex items-center gap-4"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm text-white/40 uppercase tracking-widest font-mono">About Us</span>
                    </motion.div>

                    {/* Main Editorial Text - Kinetic Reveal */}
                    <motion.div className="space-y-12">
                        <h2 className="text-4xl md:text-6xl font-sans leading-tight text-white/90">
                            {/* Word Stagger */}
                            {["Dridha", "Technologies", "is", "a", "product-focused", "technology", "company."].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: i * 0.05 }}
                                    className="inline-block mr-3"
                                >
                                    {word === "Dridha" || word === "Technologies" ? <span className="text-white">{word}</span> : word}
                                </motion.span>
                            ))}
                        </h2>

                        <p className="text-2xl md:text-3xl text-white/50 leading-relaxed font-light">
                            {["We", "own", "and", "operate", "digital", "platforms", "with", "a"].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: i * 0.02 + 0.5 }}
                                    className="inline-block mr-2"
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <span className="text-gradient font-medium inline-block relative">
                                long-term vision
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                                />
                            </span>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Background Gradient Mesh - Parallax */}
            <motion.div
                style={{ y }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-900/10 to-transparent blur-[100px] pointer-events-none"
            />
        </section>
    );
}

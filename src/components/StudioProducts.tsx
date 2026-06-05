"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import PixelCard from "@/components/ui/PixelCard"; // Import PixelCard

export default function StudioProducts() {
    return (
        <section id="products" className="py-12 sm:py-16 lg:py-24 relative">
            <div className="container px-4 sm:px-6 lg:px-6">
                {/* Section Header */}
                <div className="mb-8 sm:mb-12 lg:mb-16 border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Products</h2>
                    <p className="text-white/60 max-w-sm text-xs sm:text-sm leading-relaxed">
                        We build proprietary software to solve complex problems.
                        Engineered for scale, speed, and reliability.
                    </p>
                </div>

                {/* Grid Layout: Big Card (2/3) + Small Card (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* RED ARROW (Big Card): Image Only, No Text, No Link, PIXEL EFFECT */}
                    <div className="lg:col-span-2 w-full h-[280px] sm:h-[400px] lg:h-[600px]">
                        <PixelCard variant="pink" className="w-full h-full !rounded-[16px] sm:!rounded-[20px] lg:!rounded-[24px] !border-white/10">
                            {/* Full Cover Image - positioned absolutely as per PixelCard requirements */}
                            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                                <Image
                                    src="/1766487631997.jpg"
                                    alt="Shortly App Interface"
                                    fill
                                    priority
                                    quality={90}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                    className="object-cover rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] pointer-events-none"
                                />
                            </div>
                        </PixelCard>
                    </div>

                    {/* YELLOW ARROW (Small Card): Description/About - Text & Link */}
                    <div className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] lg:h-[600px]">
                        <InteractiveCard className="flex flex-col justify-between group h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Spotlight />

                            <div className="p-5 sm:p-6 md:p-8 lg:p-10 relative z-10 flex flex-col h-full">
                                <div className="mb-auto space-y-4 sm:space-y-5 lg:space-y-6">
                                    {/* Header Section */}
                                    <div>
                                        <div className="inline-block bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                                            <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-mono">Product</span>
                                        </div>
                                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 text-white leading-tight">
                                            A product by <br />
                                            <span className="text-white/90">Dridha Technologies</span>
                                        </h4>
                                    </div>

                                    {/* Description Section */}
                                    <div className="space-y-2.5 sm:space-y-3">
                                        <p className="text-white/80 leading-relaxed text-xs sm:text-sm lg:text-base">
                                            Shortly is your hyperlocal news companion — delivering the latest updates in short videos, quick image cards, audio stories, and easy reads.
                                        </p>
                                        <p className="text-white/70 leading-relaxed text-xs sm:text-sm lg:text-base">
                                            From breaking headlines to your neighborhood happenings, we keep you informed, fast and fresh.
                                        </p>
                                    </div>
                                </div>

                                {/* Link Section */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                                    <Link 
                                        href="https://www.shortlyindia.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-14 sm:h-16 w-full border text-left p-3 sm:p-4 text-gray-50 text-sm sm:text-base font-bold rounded-lg overflow-hidden before:absolute before:w-10 sm:before:w-12 before:h-10 sm:before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-16 sm:after:w-20 after:h-16 sm:after:h-20 after:content-[''] after:bg-rose-300 after:right-6 sm:after:right-8 after:top-2 sm:after:top-3 after:rounded-full after:blur-lg flex items-center justify-between gap-2"
                                    >
                                        <span className="relative z-20 text-sm sm:text-base">Visit Shortly</span>
                                        <svg 
                                            className="w-4 h-4 sm:w-5 sm:h-5 relative z-20 transition-transform group-hover:translate-x-1 flex-shrink-0" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </InteractiveCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

function InteractiveCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-panel rounded-2xl sm:rounded-3xl relative overflow-hidden bg-[#0A0A0A] border border-white/5 ${className}`}
            onMouseMove={onMouseMove}
            style={{
                // @ts-ignore - custom CSS variables for spotlight
                "--mouse-x": mouseX,
                "--mouse-y": mouseY
            }}
        >
            {children}
        </motion.div>
    );
}

function Spotlight() {
    return (
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        650px circle at var(--mouse-x) var(--mouse-y),
                        rgba(255, 255, 255, 0.08),
                        transparent 40%
                    )
                `,
            }}
        />
    );
}

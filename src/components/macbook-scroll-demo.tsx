"use client";

import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion } from "framer-motion";
import ColorBends from "@/components/ui/ColorBends";

export default function MacbookScrollDemo() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
            {/* ColorBends Background - Takes full viewport */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
                <ColorBends
                    colors={["#ff6b35", "#f7931e", "#ffcc00", "#00ff88", "#00d4ff", "#8b5cf6", "#ff5c7a"]}
                    rotation={-45}
                    speed={0.5}
                    scale={0.8}
                    frequency={2.5}
                    warpStrength={1.5}
                    mouseInfluence={0.4}
                    parallax={0.1}
                    noise={0.02}
                    transparent={false}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full">
                <MacbookScroll
                    title={
                        <motion.span
                            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.2,
                            }}
                            className="text-4xl md:text-7xl font-bold tracking-tight text-white block"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                Building and operating
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block text-white/50"
                            >
                                digital products.
                            </motion.span>
                        </motion.span>
                    }
                    videoSrc={`/hero-video.mp4`}
                    src={`/linear.webp`}
                    showGradient={false}
                />
            </div>
        </div>
    );
}

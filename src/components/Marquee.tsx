"use client"

import { motion } from "framer-motion"

interface MarqueeProps {
    text: string
    repeat?: number
    velocity?: number
    className?: string
}

export default function Marquee({ text, repeat = 4, velocity = 20, className = "" }: MarqueeProps) {
    return (
        <div className={`overflow-hidden whitespace-nowrap flex border-y border-border bg-primary text-black py-2 ${className}`}>
            <motion.div
                className="flex gap-8 items-center font-mono font-bold uppercase tracking-wider"
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: velocity,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {Array.from({ length: repeat }).map((_, i) => (
                    <span key={i} className="flex items-center gap-8">
                        {text}
                        <span className="w-4 h-4 bg-black block" /> {/* Separator */}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

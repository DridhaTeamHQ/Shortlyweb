"use client"

import { motion } from "framer-motion"
import { Clock, Cpu, Globe, Layers, Zap, Shield } from "lucide-react"

export default function About() {
    const icons = [
        { icon: Clock, label: "SPEED", delay: 0 },
        { icon: Globe, label: "GLOBAL", delay: 0.1 },
        { icon: Cpu, label: "COMPUTE", delay: 0.2 },
        { icon: Layers, label: "STACK", delay: 0.3 },
        { icon: Zap, label: "ENERGY", delay: 0.4 },
        { icon: Shield, label: "SECURE", delay: 0.5 },
    ]

    return (
        <section id="about" className="bg-background border-b border-border">
            <div className="container grid md:grid-cols-2 p-0">

                {/* Left: Manifesto */}
                <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest mb-8 block">
               // 01_MANIFESTO
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] mb-8">
                        We build<br />
                        <span className="text-primary">Digital</span><br />
                        Infrastructures.
                    </h2>
                    <p className="font-mono text-sm text-muted-text leading-relaxed max-w-sm">
                        Dridha Technologies is a product-focused technology company.
                        We own and operate digital platforms with a long-term vision.
                        Focusing on scalable, user-centric solutions.
                    </p>
                </div>

                {/* Right: Grid System */}
                <div className="grid grid-cols-2">
                    {icons.map((item, index) => (
                        <div
                            key={index}
                            className="aspect-square border-r border-b border-border p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-colors group relative cursor-crosshair"
                        >
                            {/* Crosshair makers */}
                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-current opacity-50" />
                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-current opacity-50" />

                            <span className="font-mono text-[10px] uppercase opacity-60">0{index + 1}</span>
                            <div className="self-center group-hover:scale-110 transition-transform duration-300">
                                <item.icon size={48} strokeWidth={1} />
                            </div>
                            <span className="font-mono text-xs font-bold tracking-widest uppercase self-end">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

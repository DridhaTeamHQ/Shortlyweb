"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Products() {
    return (
        <section id="products" className="py-0 border-b border-border bg-background">
            <div className="container p-0 grid md:grid-cols-2">
                {/* Left: Product Visual */}
                <div className="relative border-r border-border min-h-[600px] flex items-center justify-center bg-[#111] overflow-hidden group">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/shortly-abstract.png"
                            alt="Shortly Abstract"
                            fill
                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Overlay Text */}
                    <div className="relative z-10 text-center">
                        <h3 className="text-9xl font-black text-transparent stroke-text uppercase opacity-50 select-none">
                            Shortly
                        </h3>
                    </div>
                </div>

                {/* Right: Technical Specs */}
                <div className="flex flex-col">
                    <div className="p-12 border-b border-border">
                        <h2 className="text-6xl font-black uppercase mb-4 text-white">Shortly</h2>
                        <div className="inline-block bg-primary text-black px-2 py-1 font-mono text-sm font-bold uppercase mb-8">
                            Product_v1.0
                        </div>
                        <p className="font-mono text-muted-text max-w-md">
                            Hyperlocal, multilingual news delivered through short reads, video, and audio.
                            Engineered for high-frequency updates and low-latency delivery.
                        </p>
                    </div>

                    {/* Spec Grid */}
                    <div className="flex-1 grid grid-cols-2">
                        <div className="p-8 border-r border-b border-border hover:bg-white hover:text-black transition-colors group">
                            <span className="font-mono text-xs text-primary group-hover:text-black mb-2 block">FEATURE_01</span>
                            <h4 className="font-bold text-lg uppercase">Candle Cards</h4>
                        </div>
                        <div className="p-8 border-b border-border hover:bg-white hover:text-black transition-colors group">
                            <span className="font-mono text-xs text-primary group-hover:text-black mb-2 block">FEATURE_02</span>
                            <h4 className="font-bold text-lg uppercase">Micro-Interactions</h4>
                        </div>
                        <div className="p-8 border-r border-border hover:bg-white hover:text-black transition-colors group">
                            <span className="font-mono text-xs text-primary group-hover:text-black mb-2 block">FEATURE_03</span>
                            <h4 className="font-bold text-lg uppercase">Multi-Lingual</h4>
                        </div>
                        <div className="p-8 hover:bg-white hover:text-black transition-colors group">
                            <span className="font-mono text-xs text-primary group-hover:text-black mb-2 block">STATUS</span>
                            <h4 className="font-bold text-lg uppercase">Coming Soon</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

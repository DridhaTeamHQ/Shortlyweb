"use client"

import { motion } from "framer-motion"

export default function Contact() {
    return (
        <section id="contact" className="bg-background">
            <div className="container grid md:grid-cols-2 p-0">
                {/* Left: Info */}
                <div className="p-12 md:p-24 border-r border-border flex flex-col justify-between min-h-[50vh]">
                    <div>
                        <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">
                   // 03_CONNECT
                        </span>
                        <h2 className="text-6xl font-black uppercase leading-none mb-12">
                            Get<br />Online.
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <span className="font-mono text-xs text-muted-text block mb-1">EMAIL PROTOCOL</span>
                            <a href="mailto:admin@dridhatechnologies.com" className="text-xl font-bold hover:text-primary transition-colors">
                                admin@dridhatechnologies.com
                            </a>
                        </div>
                        <div>
                            <span className="font-mono text-xs text-muted-text block mb-1">HQ COORDINATES</span>
                            <p className="text-lg font-mono">
                                Hyderabad, IN<br />
                                17.3850° N, 78.4867° E
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Raw Form */}
                <div className="p-12 md:p-24 flex flex-col justify-center">
                    <form className="flex flex-col gap-0 border border-border">
                        <input
                            type="text"
                            placeholder="IDENTIFIER_NAME"
                            className="bg-transparent p-6 border-b border-border font-mono text-sm focus:bg-white focus:text-black focus:outline-none transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="CONTACT_EMAIL"
                            className="bg-transparent p-6 border-b border-border font-mono text-sm focus:bg-white focus:text-black focus:outline-none transition-colors"
                        />
                        <textarea
                            rows={4}
                            placeholder="DATA_PAYLOAD"
                            className="bg-transparent p-6 border-b border-border font-mono text-sm focus:bg-white focus:text-black focus:outline-none transition-colors resize-none"
                        />
                        <button className="bg-primary text-black font-bold font-mono p-6 uppercase tracking-widest hover:bg-white transition-colors text-left flex justify-between group">
                            <span>Transmit Data</span>
                            <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                        </button>
                    </form>

                    <div className="mt-12 pt-12 border-t border-border flex justify-between items-end">
                        <span className="font-mono text-xs text-muted-text">© 2024 DRIDHA TECH</span>
                        <span className="font-mono text-xs text-primary animate-pulse">SYSTEM_ONLINE</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

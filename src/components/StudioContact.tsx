"use client";

export default function StudioContact() {
    return (
        <footer className="py-20 border-t border-white/5 bg-black relative overflow-hidden">
            <div className="container px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                {/* Contact Info */}
                <div>
                    <h3 className="text-sm text-white/40 uppercase tracking-widest font-mono mb-6">Contact</h3>
                    <a
                        href="mailto:admin@dridhatechnologies.com"
                        className="text-2xl md:text-4xl font-sans text-white hover:text-blue-400 transition-colors block"
                    >
                        admin@dridhatechnologies.com
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-right">
                    <p className="text-white/20 text-sm">
                        &copy; {new Date().getFullYear()} Dridha Technologies.
                    </p>
                    <p className="text-white/20 text-xs mt-2 uppercase tracking-wider">
                        All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Subtle Glow at bottom */}
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-white/5 blur-[120px] pointer-events-none" />
        </footer>
    );
}

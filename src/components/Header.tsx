"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md border-b border-white/5" />
            <div className="container relative mx-auto h-20 flex items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="font-heading font-medium text-lg tracking-tight text-white/90">
                        Dridha Technologies
                    </div>
                </Link>

                {/* Contact Link */}
                <Link
                    href="mailto:admin@dridhatechnologies.com"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                >
                    Contact
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-xl md:hidden p-6 flex flex-col gap-4"
                    >
                        <Link href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:text-primary">About</Link>
                        <Link href="#products" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:text-primary">Products</Link>
                        <Link href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:text-primary">Contact</Link>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-muted-text">Switch Theme</span>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                            >
                                {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

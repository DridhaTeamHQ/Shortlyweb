import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface'
import { useTheme } from '../context/ThemeContext'
import { triggerHaptic } from '../utils/haptics'
import './ThemeToggle.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          
          // Update active section based on scroll position
          const sections = ['home', 'features', 'why-shortly', 'footer']
          const scrollPosition = window.scrollY + 200
          
          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section)
                break
              }
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    triggerHaptic('light') // Haptic feedback on navigation
    // Close mobile menu first
    setMobileMenuOpen(false)
    
    // Give the menu time to close before measuring positions (mobile needs a bit more time)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (!element) return

      // Try native scrollIntoView first (respects scroll-margin-top)
      try {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } catch (_) {
        // Fallback with manual offset
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }, 350)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'why-shortly', label: 'What is Shortly' },
    { id: 'footer', label: 'Contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <GlassSurface
            width={56}
            height={56}
            borderRadius={28}
            brightness={35}
            opacity={0.7}
            blur={10}
            displace={0.05}
            distortionScale={-40}
            redOffset={1}
            greenOffset={1}
            blueOffset={2}
            mixBlendMode="normal"
            className="cursor-pointer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full flex items-center justify-center"
              onClick={() => scrollToSection('home')}
              aria-label="Go to home"
            >
              <img
                src={theme === 'light' ? '/logos/logo-on-dark.png' : '/logos/logo-on-white.png'}
                alt="Shortly logo"
                className="select-none"
                draggable="false"
                loading="eager"
                decoding="async"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  objectFit: 'contain',
                  transform: theme === 'dark' ? 'scale(0.85)' : 'scale(1)'
                }}
              />
            </motion.button>
          </GlassSurface>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <GlassSurface
              width="auto"
              height={56}
              borderRadius={28}
              brightness={30}
              opacity={0.75}
              blur={12}
              displace={0.1}
              distortionScale={-50}
              redOffset={1}
              greenOffset={2}
              blueOffset={3}
              mixBlendMode="normal"
              className="px-2"
            >
              <div className="flex gap-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeSection === item.id
                      ? theme === 'light' ? 'bg-purple-200 text-purple-800' : 'bg-purple-500/30 text-purple-300'
                      : theme === 'light' ? 'text-gray-700 hover:text-purple-800 hover:bg-purple-100' : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </GlassSurface>
          </div>

          {/* Theme Toggle - Visible on all screens */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <label className="switch-navbar">
              <input
                type="checkbox"
                checked={theme === 'light'}
                onChange={() => {
                  triggerHaptic('medium')
                  toggleTheme()
                }}
                aria-label="Toggle theme"
              />
              <span className="slider-navbar">
                <div className="star-navbar star_1-navbar"></div>
                <div className="star-navbar star_2-navbar"></div>
                <div className="star-navbar star_3-navbar"></div>
                <svg viewBox="0 0 16 16" className="cloud-navbar">
                  <path
                    transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                    fill="#fff"
                    d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                  ></path>
                </svg>
              </span>
            </label>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social Media Buttons */}
            <div className="flex items-center gap-2">
              {/* Instagram */}
              <GlassSurface
                width={48}
                height={48}
                borderRadius={24}
                brightness={35}
                opacity={0.7}
                blur={10}
                displace={0.05}
                distortionScale={-40}
                redOffset={1}
                greenOffset={1}
                blueOffset={2}
                mixBlendMode="normal"
              >
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                    theme === 'light' ? 'text-purple-800 hover:text-purple-900' : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </GlassSurface>

              {/* Twitter */}
              <GlassSurface
                width={48}
                height={48}
                borderRadius={24}
                brightness={35}
                opacity={0.7}
                blur={10}
                displace={0.05}
                distortionScale={-40}
                redOffset={1}
                greenOffset={1}
                blueOffset={2}
                mixBlendMode="normal"
              >
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                    theme === 'light' ? 'text-purple-800 hover:text-purple-900' : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
              </GlassSurface>

              {/* Facebook */}
              <GlassSurface
                width={48}
                height={48}
                borderRadius={24}
                brightness={35}
                opacity={0.7}
                blur={10}
                displace={0.05}
                distortionScale={-40}
                redOffset={1}
                greenOffset={1}
                blueOffset={2}
                mixBlendMode="normal"
              >
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                    theme === 'light' ? 'text-purple-800 hover:text-purple-900' : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </motion.a>
              </GlassSurface>
            </div>

            {/* Download App Button */}
            <GlassSurface
              width={160}
              height={48}
              borderRadius={24}
              brightness={35}
              opacity={0.7}
              blur={10}
              displace={0.05}
              distortionScale={-40}
              redOffset={1}
              greenOffset={1}
              blueOffset={2}
              mixBlendMode="normal"
            >
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.dridha.shortly"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full h-full font-semibold transition-colors duration-300 flex items-center justify-center ${
                  theme === 'light' ? 'text-purple-800 hover:text-purple-900' : 'text-purple-300 hover:text-white'
                }`}
              >
                Download App
              </motion.a>
            </GlassSurface>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => {
              triggerHaptic('light')
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            whileTap={{ scale: 0.95 }}
            className={`md:hidden p-3 rounded-lg transition-colors duration-300 ${
              theme === 'light' ? 'bg-purple-100 text-purple-800' : 'bg-purple-900/30 text-purple-300'
            }`}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="px-4 py-4 liquid-glass backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToSection(item.id);
                }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                  activeSection === item.id
                    ? theme === 'light' ? 'bg-purple-200 text-purple-800' : 'bg-purple-500/30 text-purple-300'
                    : theme === 'light' ? 'text-gray-700 hover:bg-purple-100' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
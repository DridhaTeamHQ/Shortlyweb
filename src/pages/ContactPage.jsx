import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ContactNavbar from '../components/ContactNavbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const ContactPage = () => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gradient-to-b from-purple-50 to-white' : 'bg-dark'}`}>
      <ContactNavbar />
      <section className={`min-h-screen py-16 sm:py-20 md:py-24 px-4 pt-24 sm:pt-28 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="max-w-2xl mx-auto">
          {/* Contact Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/40'
            }`}>
              <svg className={`w-10 h-10 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Contact Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg sm:text-xl text-center font-semibold mb-3 ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-100'
            }`}
          >
            We'd love to hear from you
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`text-base sm:text-lg text-center mb-10 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            For support, feedback, or any questions reach out to us anytime.
          </motion.p>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="space-y-4"
          >
            <a
              href="mailto:team@dridhatechnologies.com"
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl font-medium transition-all ${
                theme === 'light'
                  ? 'bg-purple-50 hover:bg-purple-100 border border-purple-100 text-gray-800'
                  : 'bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/50 text-gray-100'
              }`}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>team@dridhatechnologies.com</span>
            </a>
            <a
              href="https://www.shortlyindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl font-medium transition-all ${
                theme === 'light'
                  ? 'bg-purple-50 hover:bg-purple-100 border border-purple-100 text-gray-800'
                  : 'bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/50 text-gray-100'
              }`}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>https://www.shortlyindia.com</span>
            </a>
          </motion.div>

          {/* Response time */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`text-center text-sm sm:text-base mt-8 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            We usually respond within 24 hours.
          </motion.p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ContactPage

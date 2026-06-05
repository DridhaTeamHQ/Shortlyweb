import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const SimpleNavbar = () => {
  const { theme } = useTheme()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 ${
        theme === 'light' ? 'bg-white/80 backdrop-blur-md' : 'bg-gray-900/80 backdrop-blur-md'
      } border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={theme === 'light' ? '/logos/logo-on-dark.png' : '/logos/logo-on-white.png'}
              alt="Shortly logo"
              className="w-8 h-8 sm:w-10 sm:h-10 select-none object-contain"
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
          </Link>

          {/* Home Button */}
          <Link
            to="/"
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              theme === 'light'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            Home
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default SimpleNavbar

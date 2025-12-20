import React from 'react'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const WhyHyperLocal = () => {
  const ref = useRef(null)
  const { theme } = useTheme()

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 overflow-hidden scroll-mt-24 w-full">
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4">
        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6 sm:mb-8"
          >
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">🚀</span>
          </motion.div>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Coming Soon
          </h2>
          
          <p className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Our app is launching very soon! Stay tuned for updates.
          </p>
        </motion.div>

        {/* Separator with animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`w-32 sm:w-48 md:w-64 h-0.5 sm:h-1 mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`}
        />

        {/* Company Attribution */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-center cursor-default px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          Shortly is a part of{' '}
          <span
            className={`font-bold ${
              theme === 'light' ? 'text-purple-600' : 'text-purple-400'
            }`}
          >
            Dridha Technologies Private Limited
          </span>
        </motion.p>
      </div>
    </section>
  )
}

export default WhyHyperLocal

import React from 'react'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const WhyHyperLocal = () => {
  const ref = useRef(null)
  const { theme } = useTheme()

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 px-4 overflow-hidden scroll-mt-24 w-full">
      <div className="flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 px-3 sm:px-4">
        {/* Separator with animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-32 sm:w-48 md:w-64 h-0.5 sm:h-1 mb-6 sm:mb-8 md:mb-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
        />

        {/* Company Attribution */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-center cursor-default px-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
        >
          Shortly is a part of{' '}
          <span
            className={`font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'
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

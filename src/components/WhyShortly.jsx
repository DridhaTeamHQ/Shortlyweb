import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import ScrollFloat from './ScrollFloat'
import ScrambledText from './ScrambledText'
import { useTheme } from '../context/ThemeContext'
import { triggerHaptic } from '../utils/haptics'

const WhyShortly = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const [currentScreen, setCurrentScreen] = useState(0)

  // Reset screen index when theme changes
  useEffect(() => {
    setCurrentScreen(0)
  }, [theme])

  // Theme-specific screenshots
  const darkModeScreens = [
    '/dark mode shortly/Screenshot_20251028_151802_Shortlynow.jpg',
    '/dark mode shortly/Screenshot_20251028_151833_Shortlynow.jpg',
    '/dark mode shortly/Screenshot_20251028_151924_Shortlynow.jpg',
    '/dark mode shortly/Screenshot_20251028_152058_Shortlynow.jpg',
    '/dark mode shortly/Screenshot_20251028_152146_Shortlynow.jpg',
    '/dark mode shortly/Screenshot_20251028_152219_Shortlynow.jpg',
  ]

  const lightModeScreens = [
    '/light mode shortly/Screenshot_20251028_152538_Shortlynow.jpg',
    '/light mode shortly/Screenshot_20251028_152554_Shortlynow.jpg',
    '/light mode shortly/Screenshot_20251028_152624_Shortlynow.jpg',
    '/light mode shortly/Screenshot_20251028_152642_Shortlynow.jpg',
    '/light mode shortly/Screenshot_20251028_152709_Shortlynow.jpg',
  ]

  const screens = theme === 'dark' ? darkModeScreens : lightModeScreens

  const nextScreen = () => {
    triggerHaptic('light')
    setCurrentScreen((prev) => (prev + 1) % screens.length)
  }

  const prevScreen = () => {
    triggerHaptic('light')
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length)
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 px-0 overflow-hidden scroll-mt-24">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-left"
          >
            <div className="mb-8">
              <ScrollFloat
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='top bottom'
                scrollEnd='center center'
                stagger={0.04}
                containerClassName="font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                textClassName={`text-solid`}
              >
                What is Shortly?
              </ScrollFloat>
            </div>

            <div className={`mb-8 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-left break-words`} style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              <ScrambledText
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                radius={120}
                duration={1.0}
                speed={0.5}
                scrambleChars=".:/"
              >
                Shortly is your hyperlocal news companion — delivering the latest updates in short videos, quick image cards, audio stories, and easy reads. From breaking headlines to your neighborhood happenings, we keep you informed, fast and fresh.
              </ScrambledText>
            </div>
          </motion.div>

          {/* Right: Mobile Device */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex flex-col items-center justify-center pb-20 sm:pb-24"
          >
            {/* Phone Frame */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[40px] bg-black shadow-2xl border-8 border-gray-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

              {/* Screen */}
              <div className="absolute inset-2 rounded-[32px] overflow-hidden bg-white">
                <motion.img
                  key={currentScreen}
                  src={screens[currentScreen]}
                  alt={`App screen ${currentScreen + 1}`}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
              <motion.button
                onClick={prevScreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${theme === 'light'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
                  } flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg transition-colors duration-200`}
              >
                ↑
              </motion.button>
              <motion.button
                onClick={nextScreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${theme === 'light'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
                  } flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg transition-colors duration-200`}
              >
                ↓
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyShortly

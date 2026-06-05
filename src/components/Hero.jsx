import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Aurora from './Aurora'
import GlassSurface from './GlassSurface'
import BlurText from './BlurText'
import { useTheme } from '../context/ThemeContext'

const Hero = () => {
  const { theme } = useTheme()

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 font-montserrat">
      {/* Floating Decorative Orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top Left Orb */}
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 sm:top-20 left-2 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full sm:blur-[40px]"
          style={{
            background: theme === 'light' 
              ? 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0) 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        
        {/* Top Right Orb */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-16 sm:top-32 right-2 sm:right-16 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full sm:blur-[50px]"
          style={{
            background: theme === 'light'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0) 70%)',
            filter: 'blur(35px)',
          }}
        />
        
        {/* Bottom Left Orb - Hidden on mobile */}
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, 15, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden sm:block absolute bottom-32 left-20 w-48 h-48 md:w-72 md:h-72 rounded-full"
          style={{
            background: theme === 'light'
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0) 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        {theme === 'light' ? (
          /* Light theme - Enhanced purple tones */
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-purple-50 to-white" />
            <div className="absolute inset-0 pointer-events-none w-full">
              <Aurora
                colorStops={["#a855f7", "#9333ea", "#c084fc"]}
                blend={2.5}
                amplitude={0.9}
                speed={1.2}
                midPoint={-0.15}
              />
            </div>
            {/* Extra purple overlay for richness */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-purple-100/10 pointer-events-none" />
          </div>
        ) : (
          /* Dark theme - Bright purple USP colors */
          <div className="absolute inset-0 pointer-events-none w-full">
            <Aurora
              colorStops={["#9F40FF", "#B265FF", "#8B3FFF"]}
              blend={2.5}
              amplitude={0.9}
              speed={1.2}
              midPoint={-0.15}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 flex justify-center items-center">
            <img 
              src="/logos/Shorlty Latest@4x.png"
              alt="Shortly"
              className="h-28 sm:h-36 md:h-44 lg:h-52 xl:h-60 w-auto max-w-[85vw] object-contain"
            />
          </h1>
          
          <BlurText
            text="Your daily dose of hyper-local news in bite-sized content"
            delay={50}
            animateBy="words"
            direction="top"
            className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-3 sm:px-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          />

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* App Store Button */}
            <motion.a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-400 ease-out w-full sm:w-auto ${
                theme === 'light'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
                  : 'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60'
              }`}
              style={{ maxWidth: '280px', minWidth: '180px' }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left flex-1">
                <span className="text-[10px] sm:text-xs text-white/80 font-medium">Download on the</span>
                <span className="text-base sm:text-lg font-bold text-white leading-tight">App Store</span>
                </div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
            </motion.a>

            {/* Google Play Button */}
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.dridha.shortly"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-400 ease-out w-full sm:w-auto ${
                theme === 'light'
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black shadow-lg shadow-gray-500/20 hover:shadow-xl hover:shadow-gray-500/30'
                  : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40'
              }`}
              style={{ maxWidth: '280px', minWidth: '180px' }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left flex-1">
                <span className="text-[10px] sm:text-xs text-white/80 font-medium">Get it on</span>
                <span className="text-base sm:text-lg font-bold text-white leading-tight">Google Play</span>
                </div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
            </motion.a>
          </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{ opacity }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            theme === 'light' ? 'border-purple-400/50' : 'border-white/30'
          }`}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-1 h-3 rounded-full mt-2 ${
              theme === 'light' ? 'bg-purple-500/60' : 'bg-white/50'
            }`}
            />
          </motion.div>
        </motion.div>
    </section>
  )
}

export default Hero
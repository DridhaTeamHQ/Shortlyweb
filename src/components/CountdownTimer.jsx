import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const CountdownTimer = () => {
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  // Set launch date to 3 days from now
  const [launchDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    date.setHours(0, 0, 0, 0)
    return date
  })

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = launchDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    })
    setHoveredIndex(index)
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'from-purple-500 to-pink-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-pink-500 to-rose-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-rose-500 to-orange-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-orange-500 to-yellow-500' }
  ]

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4">
      {/* App Launch Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}
      >
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mr-2 sm:mr-3 md:mr-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          🚀
        </motion.span>
        App Launching In
      </motion.h2>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl"
      >
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ 
              scale: 1.05,
              rotateX: mousePosition.y * 0.1,
              rotateY: mousePosition.x * -0.1,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
            className={`relative flex flex-col items-center justify-center aspect-square sm:aspect-[4/5] rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 ${
              theme === 'light'
                ? 'bg-white/90 shadow-xl'
                : 'bg-gray-900/80'
            }`}
          >
            {/* Animated gradient border */}
            <div 
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${block.color} opacity-0 transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : ''
              }`}
              style={{ padding: '2px' }}
            >
              <div className={`w-full h-full rounded-3xl ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`} />
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${block.color} blur-xl transition-opacity duration-300`}
              animate={{
                opacity: hoveredIndex === index ? 0.4 : 0,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.span
                key={block.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br ${block.color} bg-clip-text text-transparent`}
              >
                {String(block.value).padStart(2, '0')}
              </motion.span>
              <span
                className={`text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 font-semibold uppercase tracking-wider sm:tracking-widest ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {block.label}
              </span>
            </div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
              style={{
                background: hoveredIndex === index
                  ? `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
                  : 'none',
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Separator with animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`w-32 sm:w-48 md:w-64 h-0.5 sm:h-1 mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`}
      />

      {/* Company Attribution */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className={`text-sm sm:text-base md:text-lg lg:text-xl text-center cursor-default px-4 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}
      >
        Shortly is a part of{' '}
        <motion.span
          whileHover={{ 
            background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #F97316)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          className={`font-bold cursor-pointer transition-colors ${
            theme === 'light' ? 'text-purple-600' : 'text-purple-400'
          }`}
        >
          Dridha Technologies Private Limited
        </motion.span>
      </motion.p>
    </div>
  )
}

export default CountdownTimer

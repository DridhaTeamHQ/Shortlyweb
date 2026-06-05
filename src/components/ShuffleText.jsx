import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ShuffleText = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ''))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    const chars = text.split('')
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iteration = 0
    const maxIterations = 8

    const interval = setInterval(() => {
      setDisplayText(prev =>
        chars.map((char, index) => {
          if (index < iteration) {
            return chars[index]
          }
          return randomChars[Math.floor(Math.random() * randomChars.length)]
        })
      )

      iteration += 1 / 3

      if (iteration >= chars.length + maxIterations) {
        setDisplayText(chars)
        setHasAnimated(true)
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [text, hasAnimated])

  const handleMouseEnter = () => {
    const chars = text.split('')
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iteration = 0

    const interval = setInterval(() => {
      setDisplayText(prev =>
        chars.map((char, index) => {
          if (index < iteration) {
            return chars[index]
          }
          return randomChars[Math.floor(Math.random() * randomChars.length)]
        })
      )

      iteration += 1 / 3

      if (iteration >= chars.length) {
        setDisplayText(chars)
        clearInterval(interval)
      }
    }, 30)
  }

  return (
    <span className={className} onMouseEnter={handleMouseEnter} style={{ cursor: 'default' }}>
      {displayText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default ShuffleText


import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollVelocity from './ScrollVelocity'
import { useTheme } from '../context/ThemeContext'

const WhyHyperLocal = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-0 overflow-hidden scroll-mt-24 w-full">
      {/* Scroll Velocity Animation - Edge to Edge */}
      <div className="space-y-8">
        <ScrollVelocity
          texts={['Coming Soon', 'Stay Tuned']}
          velocity={100}
          className={`${theme === 'light' ? 'text-purple-600/30' : 'text-purple-400/30'}`}
          numCopies={10}
        />
              
        <ScrollVelocity
          texts={['Shortly', 'Hyperlocal News']}
          velocity={-100}
          className={`${theme === 'light' ? 'text-purple-500/20' : 'text-purple-300/20'}`}
          numCopies={12}
        />

        <ScrollVelocity
          texts={['Coming Soon', 'Stay Tuned']}
          velocity={100}
          className={`${theme === 'light' ? 'text-purple-700/25' : 'text-purple-500/25'}`}
          numCopies={10}
        />
      </div>
    </section>
  )
}

export default WhyHyperLocal

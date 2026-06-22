import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Desi-maximalism collage banner with a scroll-stack feel: as the section moves
// through the viewport the image parallaxes upward and the frame eases in.
export default function NewsletterBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image drifts up as you scroll past (parallax). Slightly over-sized so the
  // movement never reveals an edge.
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18])
  // Frame eases up + fades in as it enters.
  const frameY = useTransform(scrollYProgress, [0, 0.35], [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.28], [0, 1])

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
      <motion.div
        style={{ y: frameY, opacity }}
        className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(124,0,217,0.35)] ring-1 ring-black/5"
      >
        <div className="relative aspect-[24/10]">
          <motion.img
            src="/newsletter/banner.png"
            alt="Shortly — national, finance, sports, lifestyle, tech and more"
            style={{ y, scale }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          {/* subtle sheen for depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
        </div>
      </motion.div>
    </section>
  )
}

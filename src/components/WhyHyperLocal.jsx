import React from 'react'
import { useRef } from 'react'
import CountdownTimer from './CountdownTimer'

const WhyHyperLocal = () => {
  const ref = useRef(null)

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 overflow-hidden scroll-mt-24 w-full">
      {/* Countdown Timer Section */}
      <CountdownTimer />
    </section>
  )
}

export default WhyHyperLocal

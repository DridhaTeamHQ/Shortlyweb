import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { triggerHaptic } from '../utils/haptics'

const FeatureModal = ({ isOpen, onClose, feature, cardPosition }) => {
  const { theme } = useTheme()
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Reset video state when modal opens
  useEffect(() => {
    if (isOpen) {
      setVideoError(false)
      setVideoLoaded(false)
    }
  }, [isOpen])

  if (!feature) return null

  // Calculate the center of the screen
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const handleClose = () => {
    triggerHaptic('light')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            onClick={handleClose}
          />
          
          {/* Modal - Morphing from card position */}
          <motion.div
            layoutId={`feature-card-${feature.title}`}
            initial={{ 
              opacity: 1,
              scale: 0.3,
              x: cardPosition?.x ? cardPosition.x - centerX : 0,
              y: cardPosition?.y ? cardPosition.y - centerY : 0,
              borderRadius: "16px"
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              borderRadius: "24px"
            }}
            exit={{ 
              opacity: 0,
              scale: 0.85,
              y: 40,
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            transition={{ 
              type: "spring",
              damping: 28,
              stiffness: 350,
              mass: 0.6,
              opacity: { duration: 0.2 },
              borderRadius: { duration: 0.4 }
            }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[9999] pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              perspective: 1500
            }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Mist Glass Container */}
              <div 
                className={`w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto ${
                  theme === 'light' 
                    ? 'bg-white/80 backdrop-blur-xl border border-white/40' 
                    : 'bg-black/60 backdrop-blur-xl border border-white/10'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: theme === 'light'
                    ? '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(255, 255, 255, 0.5) inset'
                    : '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.05) inset'
                }}
              >
                <div className="p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                  {/* Close Button */}
                  <motion.button
                    onClick={handleClose}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      damping: 15, 
                      stiffness: 300 
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 z-10 ${
                      theme === 'light' 
                        ? 'bg-gray-200/80 hover:bg-gray-300/90 text-gray-700 backdrop-blur-sm' 
                        : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    ✕
                  </motion.button>

                  {/* Feature Video */}
                  <motion.div 
                    className="mb-6 aspect-video relative bg-gray-900/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {!videoLoaded && !videoError && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    )}
                    {videoError ? (
                      <div className="w-full h-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center p-6">
                          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-400">Video unavailable</p>
                        </div>
                      </div>
                    ) : (
                      <video
                        src={feature.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={() => setVideoError(true)}
                        className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
                          videoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </motion.div>

                  {/* Feature Content */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <h3 className={`text-2xl sm:text-3xl font-bold ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {feature.title}
                    </h3>
                    
                    <p className={`text-base sm:text-lg leading-relaxed ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {feature.description}
                    </p>

                    {feature.highlights && (
                      <div className="mt-6">
                        <h4 className={`text-lg font-semibold mb-3 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Key Features:
                        </h4>
                        <ul className={`space-y-2 ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {feature.highlights.map((highlight, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <span className={`mt-1 ${
                                theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                              }`}>•</span>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FeatureModal

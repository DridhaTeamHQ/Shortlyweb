import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlassSurface from '../components/GlassSurface'
import { useTheme } from '../context/ThemeContext'

const ContactPage = () => {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    authorize: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Message Sent! (Simulation)")
  }

  const inputClasses = theme === 'light'
    ? 'bg-white/50 backdrop-blur-sm border border-purple-200/40 text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50 focus:bg-white/70'
    : 'bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white placeholder-gray-500 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-500/20 focus:bg-white/[0.1]'

  // Glass card styles for contact info cards
  const glassCardClasses = theme === 'light'
    ? 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(139,92,246,0.08)] hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)] hover:border-purple-200/60'
    : 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]'

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${theme === 'light' ? 'bg-[#f5f3ff]' : 'bg-[#0a0518]'}`}>
      {/* Layered Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient blobs */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] ${theme === 'light' ? 'bg-purple-300/50' : 'bg-purple-800/20'}`}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/4 -right-32 w-[440px] h-[440px] rounded-full blur-[120px] ${theme === 'light' ? 'bg-blue-300/40' : 'bg-blue-800/15'}`}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-0 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px] ${theme === 'light' ? 'bg-pink-200/40' : 'bg-pink-900/10'}`}
        />
        {/* Subtle center glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] ${theme === 'light' ? 'bg-indigo-200/30' : 'bg-purple-900/10'}`} />
      </div>

      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Page Header — Centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Glass icon */}
            <div className="inline-block mb-6">
              <GlassSurface
                width={80}
                height={80}
                borderRadius={24}
                brightness={theme === 'light' ? 100 : 35}
                opacity={0.7}
                blur={12}
                displace={0.05}
                distortionScale={-30}
                redOffset={1}
                greenOffset={1}
                blueOffset={2}
                mixBlendMode="normal"
              >
                <div className={`w-full h-full flex items-center justify-center ${theme === 'light'
                  ? 'text-purple-600'
                  : 'text-purple-300'
                  }`}>
                  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </GlassSurface>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 ${theme === 'light'
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300'
              }`}>
              Get in Touch
            </h1>
            <p className={`text-base sm:text-lg max-w-lg mx-auto ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Have a question or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

            {/* Left Column — Contact Info (2 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Email */}
              <a
                href="mailto:team@dridhatechnologies.com"
                className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${glassCardClasses}`}
              >
                <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${theme === 'light'
                  ? 'bg-purple-100/80 text-purple-600 group-hover:bg-purple-200/80 group-hover:shadow-md group-hover:shadow-purple-200/30'
                  : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:shadow-md group-hover:shadow-purple-500/10'
                  }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm sm:text-base ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Email Us</h3>
                  <p className={`text-xs sm:text-sm truncate ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>team@dridhatechnologies.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918977533164"
                className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${glassCardClasses}`}
              >
                <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${theme === 'light'
                  ? 'bg-green-100/80 text-green-600 group-hover:bg-green-200/80 group-hover:shadow-md group-hover:shadow-green-200/30'
                  : 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20 group-hover:shadow-md group-hover:shadow-green-500/10'
                  }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm sm:text-base ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Call Us</h3>
                  <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>+91-8977533164</p>
                </div>
              </a>

              {/* Website */}
              <a
                href="https://www.dridhatechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${glassCardClasses}`}
              >
                <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${theme === 'light'
                  ? 'bg-blue-100/80 text-blue-600 group-hover:bg-blue-200/80 group-hover:shadow-md group-hover:shadow-blue-200/30'
                  : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-md group-hover:shadow-blue-500/10'
                  }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm sm:text-base ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Visit Website</h3>
                  <p className={`text-xs sm:text-sm truncate ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>www.dridhatechnologies.com</p>
                </div>
              </a>

              {/* Response badge */}
              <div className="text-center pt-3">
                <span className={`inline-flex items-center gap-2 text-xs sm:text-sm px-5 py-2.5 rounded-full backdrop-blur-md transition-all ${theme === 'light'
                  ? 'bg-white/40 text-purple-600 border border-purple-200/40 shadow-sm'
                  : 'bg-white/[0.04] text-gray-400 border border-white/[0.06]'
                  }`}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  We usually respond within 24 hours
                </span>
              </div>
            </motion.div>

            {/* Right Column — Form (3 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className={`rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl relative overflow-hidden ${theme === 'light'
                ? 'bg-white/30 border border-white/50 shadow-[0_8px_40px_rgba(139,92,246,0.08)]'
                : 'bg-white/[0.03] border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.3)]'
                }`}>
                {/* Inner glass reflections */}
                <div className={`absolute top-0 left-0 right-0 h-px ${theme === 'light' ? 'bg-gradient-to-r from-transparent via-white/80 to-transparent' : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'}`} />
                <div className={`absolute top-0 left-0 bottom-0 w-px ${theme === 'light' ? 'bg-gradient-to-b from-white/60 via-transparent to-transparent' : 'bg-gradient-to-b from-white/[0.08] via-transparent to-transparent'}`} />

                {/* Subtle inner glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none ${theme === 'light' ? 'bg-purple-200/40' : 'bg-purple-600/5'}`} />
                <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none ${theme === 'light' ? 'bg-blue-200/30' : 'bg-blue-600/5'}`} />

                <div className="relative z-10">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Full Name"
                        className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base outline-none transition-all duration-200 ${inputClasses}`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base outline-none transition-all duration-200 ${inputClasses}`}
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Mobile Number <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>(Optional)</span>
                      </label>
                      <div className="flex items-stretch gap-2">
                        <span className={`inline-flex items-center px-3.5 rounded-xl text-sm font-semibold flex-shrink-0 backdrop-blur-sm ${theme === 'light'
                          ? 'bg-white/50 border border-purple-200/40 text-gray-700'
                          : 'bg-white/[0.06] border border-white/[0.08] text-gray-300'
                          }`}>
                          +91
                        </span>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="10 Digit Mobile Number"
                          maxLength={10}
                          className={`flex-1 min-w-0 px-4 py-3 rounded-xl text-sm sm:text-base outline-none transition-all duration-200 ${inputClasses}`}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base outline-none appearance-none cursor-pointer transition-all duration-200 ${inputClasses}`}
                        >
                          <option value="" disabled>Select a subject</option>
                          <option value="support" className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>Support</option>
                          <option value="feedback" className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>Feedback</option>
                          <option value="inquiry" className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>General Inquiry</option>
                          <option value="other" className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className={`w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        maxLength={1000}
                        placeholder="Please describe your inquiry in detail..."
                        className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base outline-none resize-none transition-all duration-200 ${inputClasses}`}
                      />
                      <p className={`text-right text-xs mt-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formData.message.length}/1000
                      </p>
                    </div>

                    {/* Authorize Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="authorize"
                        checked={formData.authorize}
                        onChange={handleChange}
                        id="authorize"
                        required
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 flex-shrink-0"
                      />
                      <label htmlFor="authorize" className={`text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        I hereby authorize to send notifications on SMS / Messages / Promotional / informational messages <span className="text-red-500">*</span>
                      </label>
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: theme === 'light' ? '0 12px 40px rgba(139,92,246,0.3)' : '0 12px 40px rgba(139,92,246,0.15)' }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-white transition-all duration-300 ${'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-lg shadow-purple-600/20'
                        }`}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage

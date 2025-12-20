import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const TermsAndConditions = () => {
  const { theme } = useTheme()

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'These Terms and Conditions ("Terms") apply to the use of the Shortly mobile application ("Shortly", "App", "We", "Us"). By using the app, you agree to these Terms. If you do not agree, please do not use the app.'
    },
    {
      title: '2. Description of Service',
      content: 'Shortly is a news and media application that provides short news updates, videos, audio news, reels, hyperlocal district updates, polls, quick cards, and reporter submission features. We may update, modify, or remove any feature at any time.'
    },
    {
      title: '3. Age Requirement',
      content: 'Users must be at least 13 years old to use the app. Reporter features may require verification and additional information.'
    },
    {
      title: '4. User Accounts',
      content: 'Some features may require you to create an account. You are responsible for keeping your login information secure and ensuring the information provided is accurate.'
    },
    {
      title: '5. Acceptable Use',
      content: 'When you use the app, you agree not to misuse it. This includes not uploading or sharing illegal, abusive, hateful, misleading, harmful, or copyrighted content. You also agree not to interfere with the operation of the app or use it for any unlawful purpose.'
    },
    {
      title: '6. User Content',
      content: 'If you submit news, images, videos, or any content through the Reporter feature, you confirm that the content is your own and accurate. You grant Shortly a non-exclusive license to use, edit, publish, and distribute that content. We may edit, review, or remove user content at our discretion.'
    },
    {
      title: '7. Intellectual Property',
      content: 'All content provided inside the app, including text, videos, graphics, logos, UI elements, and audio, belongs to Shortly or its licensors. You cannot reproduce or distribute our content without permission.'
    },
    {
      title: '8. Third-Party Content',
      content: 'Shortly may show third-party content, links, or advertisements. We are not responsible for the content or actions of third parties.'
    },
    {
      title: '9. Disclaimer of Warranties',
      content: 'We do not guarantee the accuracy of all news or the uninterrupted functioning of the app. The app is provided "as is" and we are not liable for any losses resulting from your use of the app, including incorrect information or technical issues.'
    },
    {
      title: '10. Termination',
      content: 'We may suspend or terminate access for users who violate these Terms.'
    },
    {
      title: '11. Changes to Terms',
      content: 'We may update these Terms anytime. Continued usage means you accept the updated Terms.'
    },
    {
      title: '12. Contact Information',
      content: 'For any questions, you can contact us at:\nEmail: team@dridhatechnologies.com\nCompany: Dridha Technologies Pvt. Ltd.'
    }
  ]

  return (
    <section id="terms" className={`py-16 sm:py-20 md:py-24 px-4 scroll-mt-24 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Terms and Conditions
          </h1>
          <div className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`} />
        </motion.div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 sm:p-8 rounded-2xl ${
                theme === 'light'
                  ? 'bg-purple-50/50 border border-purple-100'
                  : 'bg-gray-800/50 border border-gray-700'
              }`}
            >
              <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
                theme === 'light' ? 'text-purple-700' : 'text-purple-400'
              }`}>
                {section.title}
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed whitespace-pre-line ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#home"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              theme === 'light'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TermsAndConditions

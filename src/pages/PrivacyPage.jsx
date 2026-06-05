import React from 'react'
import { motion } from 'framer-motion'
import SimpleNavbar from '../components/SimpleNavbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const PrivacyPage = () => {
  const { theme } = useTheme()

  const sections = [
    {
      title: '1. Introduction',
      content: 'This Privacy Policy explains how Shortly ("App", "We") collects, uses, and protects your information.'
    },
    {
      title: '2. Information We Collect',
      content: 'We collect information that you provide directly, such as name, email, phone number, and any details submitted while using the Reporter features. For reporter submissions, we may collect images, videos, documents, and text uploaded by you.'
    },
    {
      title: '3. Automatically Collected Information',
      content: 'We also automatically collect basic device information such as model, operating system, app version, approximate location (for hyperlocal news), usage statistics, crash reports, and analytics data. This data helps us improve app performance and user experience.'
    },
    {
      title: '4. How We Use Your Information',
      content: 'We may use your information to personalize your news feed, send notifications, enable reporter functionality, manage your account, prevent misuse, improve features, and for analytics. We do not sell your personal data.'
    },
    {
      title: '5. Permissions',
      content: 'The app may request permissions such as camera, microphone, photos, location, or storage access. These permissions are used only for the specific feature they are required for, such as uploading news content or showing hyperlocal updates.'
    },
    {
      title: '6. Information Sharing',
      content: 'We may share limited information with service providers such as cloud hosting, analytics partners, or security tools. We only share what is necessary, and only in compliance with applicable laws. We may also share information when legally required by authorities.'
    },
    {
      title: '7. Data Security',
      content: 'We take reasonable measures to protect your data. However, no system is completely secure.'
    },
    {
      title: '8. Your Rights',
      content: 'You can request access, correction, or deletion of your account information by contacting us. You may also disable notifications or uninstall the app if you no longer wish to use Shortly.'
    },
    {
      title: '9. Children\'s Privacy',
      content: 'Shortly is not intended for children under 13. We do not knowingly collect information from young children.'
    },
    {
      title: '10. Changes to Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. Continued use of the app means you accept the updated policy.'
    },
    {
      title: '11. Contact Us',
      content: 'For any privacy concerns, you can contact us at:\nEmail: team@dridhatechnologies.com\nCompany: Dridha Technologies Pvt. Ltd.'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gradient-to-b from-purple-50 to-white' : 'bg-dark'}`}>
      <SimpleNavbar />
      <section className={`py-16 sm:py-20 md:py-24 px-4 pt-24 sm:pt-28 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Privacy Policy
            </h1>
            <div className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`} />
          </motion.div>

          {/* Content */}
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default PrivacyPage

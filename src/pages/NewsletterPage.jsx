import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NewsletterHero from '../components/NewsletterHero'
import ThemeSelector from '../components/ThemeSelector'
import NewsletterSubscribe from '../components/NewsletterSubscribe'

// The newsletter page follows the light Figma design (frame 1:1292):
//   Hero  ->  Select Your Theme  ->  Subscribe  ->  Footer
const NewsletterPage = () => {
  const [subCategories, setSubCategories] = useState([])
  const toggleSubCategory = (slug) =>
    setSubCategories((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <Navbar />

      <NewsletterHero />

      {/* Collage banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="overflow-hidden rounded-3xl shadow-sm">
          <img
            src="/newsletter/banner.png"
            alt="Shortly — national, finance, sports, lifestyle, tech and more"
            className="block w-full h-auto"
          />
        </div>
      </section>

      <main className="relative">
        <ThemeSelector selected={subCategories} onToggle={toggleSubCategory} />

        <section id="subscribe" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-28">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Build your edition</h2>
            <p className="mt-2 text-gray-600">Pick when it lands, what it covers, and how broadly we curate.</p>
          </div>
          <NewsletterSubscribe categories={subCategories} onCategoriesChange={setSubCategories} />
        </section>
      </main>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

export default NewsletterPage

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NewsletterHero from '../components/NewsletterHero'
import ThemeSelector from '../components/ThemeSelector'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'

// The newsletter page follows the light Figma design (frame 1:1292):
//   Hero (+ banner scroll-stack)  ->  Select Your Theme  ->  Subscribe  ->  Footer
const NewsletterPage = () => {
  const [subCategories, setSubCategories] = useState([])
  const toggleSubCategory = (slug) =>
    setSubCategories((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <Navbar />

      {/* Hero + banner stack: scrolling pins/scales the hero back while the
          collage banner rises and stacks over it. */}
      <ScrollStack
        useWindowScroll
        itemDistance={60}
        itemStackDistance={24}
        itemScale={0.03}
        baseScale={1}
        stackPosition="16%"
        scaleEndPosition="6%"
      >
        <ScrollStackItem>
          <NewsletterHero />
        </ScrollStackItem>

        <ScrollStackItem>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <img
                src="/newsletter/banner.png"
                alt="Shortly — national, finance, sports, lifestyle, tech and more"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>

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

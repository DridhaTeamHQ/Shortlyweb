import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'
import { triggerHaptic } from '../utils/haptics'
import { NEWS_CATEGORIES, DEFAULT_CATEGORY, getCategoryMeta } from '../lib/newsCategories'
import { fetchNewsletter } from '../lib/newsApi'
import NewsletterSubscribe from '../components/NewsletterSubscribe'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function timeAgo(iso) {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return ''
  const m = Math.round((Date.now() - t) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d <= 7) return `${d}d ago`
  // Older items (some feeds carry evergreen content): show a real date instead of a huge "Nd ago".
  const dt = new Date(t)
  return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`
}

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const gridItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const NewsletterPage = () => {
  const { theme } = useTheme()
  const dark = theme !== 'light'

  const [active, setActive] = useState(DEFAULT_CATEGORY)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  const load = useCallback(async (category) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchNewsletter(category)
      const list = Array.isArray(data.articles) ? [...data.articles] : []
      // Most-covered / most-important stories first.
      list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      setArticles(list)
      setUpdatedAt(data.updatedAt || null)
    } catch (e) {
      setError(e?.message || 'Could not load the newsletter')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(active)
  }, [active, load])

  const selectCategory = (id) => {
    if (id === active) return
    triggerHaptic('light')
    setActive(id)
  }

  const breakingCount = articles.filter((a) => a.level === 'breaking').length

  return (
    <div className={`relative min-h-screen overflow-hidden ${dark ? 'bg-dark text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)' }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.28) 0%, transparent 70%)' }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-4">
        {/* Hero header with wordmark logo */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <img
              src="/logos/Shorlty Latest@4x.png"
              alt="Shortly"
              className="h-9 sm:h-11 md:h-12 object-contain mb-5 select-none"
              draggable="false"
            />
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest mb-4 ${dark ? 'bg-white/5 text-purple-300 border border-white/10' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
              </span>
              Newsletter
            </span>
            <h1 className="display-hero text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05]">
              Today&apos;s news, <span className="text-gradient">summarized</span>.
            </h1>
            <p className={`mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              Fresh headlines from across India and the world — every story distilled
              into a clear, 30-second read.
            </p>
          </motion.div>
        </section>

        {/* Category sub-nav */}
        <div className="sticky top-20 sm:top-24 z-30 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl px-2 py-2 ${dark ? 'liquid-glass' : 'bg-white/70 backdrop-blur-xl border border-purple-100 shadow-sm'}`}>
              <nav className="flex gap-2 overflow-x-auto no-scrollbar" aria-label="News categories">
                {NEWS_CATEGORIES.map((cat) => {
                  const isActive = cat.id === active
                  return (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : dark
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-600 hover:text-purple-700'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="newsletter-cat-pill"
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cat.gradient} shadow-lg`}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Articles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* meta / stats row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-bold">
                {getCategoryMeta(active).label}
              </h2>
              {!loading && !error && articles.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${dark ? 'bg-white/10 text-gray-300' : 'bg-black/5 text-gray-600'}`}>
                    {articles.length} stories
                  </span>
                  {breakingCount > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 text-red-400 px-2.5 py-0.5 text-[11px] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      {breakingCount} breaking
                    </span>
                  )}
                </div>
              )}
            </div>
            {updatedAt && !loading && !error && (
              <span className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Updated {timeAgo(updatedAt)}
              </span>
            )}
          </div>

          {error && (
            <div className="text-center py-20">
              <p className={dark ? 'text-gray-300' : 'text-gray-600'}>{error}</p>
              <button
                onClick={() => load(active)}
                className="mt-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 text-sm font-semibold transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {!error && loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'}`}>
                  <div className={`h-40 ${dark ? 'bg-white/5' : 'bg-gray-100'} animate-pulse`} />
                  <div className="p-5 space-y-3">
                    <div className={`h-3 w-20 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'} animate-pulse`} />
                    <div className={`h-5 w-full rounded ${dark ? 'bg-white/10' : 'bg-gray-200'} animate-pulse`} />
                    <div className={`h-5 w-2/3 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'} animate-pulse`} />
                    <div className={`h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-gray-100'} animate-pulse`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!error && !loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={gridContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {articles[0] && (
                  <FeaturedCard article={articles[0]} category={active} dark={dark} />
                )}

                {articles.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {articles.slice(1).map((a) => (
                      <ArticleCard key={a.id} article={a} category={active} dark={dark} />
                    ))}
                  </div>
                )}

                {articles.length === 0 && (
                  <div className={`text-center py-20 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No stories in this category yet. Try another one.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* Subscribe */}
        <section id="subscribe" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-28">
          <div className="text-center mb-6">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${dark ? 'bg-white/5 text-purple-300 border border-white/10' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
              Build your edition
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold">
              Your news, <span className="text-gradient">your rhythm</span>.
            </h2>
            <p className={`mt-2 text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              Pick when it lands, what it covers, and how broadly we curate.
            </p>
          </div>
          <NewsletterSubscribe />
        </section>
      </main>

      <div className="relative z-10 mt-10">
        <Footer />
      </div>
    </div>
  )
}

function ImportanceBadge({ level }) {
  if (level === 'breaking') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        Breaking
      </span>
    )
  }
  if (level === 'major') {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-400 text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm shrink-0">
        Trending
      </span>
    )
  }
  return null
}

const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
}

function FeaturedCard({ article, category, dark }) {
  const cat = getCategoryMeta(category)
  return (
    <motion.div
      variants={gridItem}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-3xl border ${
        dark ? 'bg-white/[0.04] border-white/10 hover:border-white/20' : 'bg-white border-gray-100 shadow-md hover:shadow-xl'
      } transition-all duration-300`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.gradient} ${dark ? 'opacity-[0.10]' : 'opacity-[0.06]'}`} />

      <div className="relative z-10 grid lg:grid-cols-5">
        {/* Content */}
        <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${cat.gradient} text-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow`}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z" /></svg>
              Lead Story
            </span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${dark ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-700'}`}>
              {cat.label}
            </span>
            <ImportanceBadge level={article.level} />
          </div>

          <h2 className={`text-2xl sm:text-3xl lg:text-[2.4rem] font-extrabold leading-[1.1] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
            {article.headline}
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            {article.summary}
          </p>

          <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
            {Array.isArray(article.tags) && article.tags.slice(0, 4).map((t) => (
              <span key={t} className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${dark ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-700'}`}>
                {t}
              </span>
            ))}
            {article.publishedAt && (
              <span className={`ml-auto text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {timeAgo(article.publishedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Vivid color panel */}
        <div className={`relative hidden lg:flex lg:col-span-2 items-center justify-center overflow-hidden bg-gradient-to-br ${cat.gradient}`}>
          <div className="absolute inset-0 opacity-30" style={DOT_PATTERN} />
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <span className="select-none font-black text-white/25 leading-none text-[9rem]">01</span>
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <img src="/logos/logo-on-white.png" alt="" aria-hidden className="h-7 w-7 object-contain drop-shadow" draggable="false" />
            <span className="text-white/90 text-[11px] font-bold uppercase tracking-[0.2em]">Top Story</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ArticleCard({ article, category, dark }) {
  const cat = getCategoryMeta(category)
  return (
    <motion.div
      variants={gridItem}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${
        dark
          ? 'bg-white/[0.04] border border-white/10 hover:border-purple-400/40'
          : 'bg-white border border-gray-100 hover:border-purple-300 shadow-sm hover:shadow-xl'
      } transition-colors duration-300`}
    >
      {/* Category color woven through the whole card */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.gradient} ${dark ? 'opacity-[0.12] group-hover:opacity-25' : 'opacity-[0.07] group-hover:opacity-[0.14]'} transition-opacity duration-500`} />
      <div className={`pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full blur-3xl bg-gradient-to-br ${cat.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
      <div className={`relative h-[3px] w-full bg-gradient-to-r ${cat.gradient}`} />

      {article.rank && (
        <span className={`pointer-events-none absolute top-0.5 right-3 font-black leading-none select-none text-5xl ${dark ? 'text-white/[0.06]' : 'text-black/[0.04]'}`}>
          {String(article.rank).padStart(2, '0')}
        </span>
      )}

      <div className="relative z-10 flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${cat.gradient} text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm`}>
            {cat.label}
          </span>
          <ImportanceBadge level={article.level} />
        </div>

        <h3 className={`text-base sm:text-[17px] font-bold leading-snug ${dark ? 'text-white' : 'text-gray-900'}`}>
          {article.headline}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.summary}
        </p>

        {Array.isArray(article.tags) && article.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((t) => (
              <span key={t} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${dark ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-700'}`}>
                {t}
              </span>
            ))}
          </div>
        )}

        {article.publishedAt && (
          <div className={`mt-auto pt-4 flex items-center justify-end border-t ${dark ? 'border-white/10' : 'border-gray-100'}`}>
            <span className={`text-[11px] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {timeAgo(article.publishedAt)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default NewsletterPage

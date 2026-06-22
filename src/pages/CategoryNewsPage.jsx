import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NewsletterNav from '../components/NewsletterNav'
import Footer from '../components/Footer'
import { fetchNewsletter } from '../lib/newsApi'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'
import '../styles/desi.css'

// Per-category stories page (Figma frame 1:36) + article reading view (1:529).
// Feed state:    dark category hero -> search + tabs -> date-grouped story cards
// Reading state: condensed list on the left, the open article on the right
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const themeFor = (slug) => NEWSLETTER_THEMES.find((t) => t.slug === slug) || NEWSLETTER_THEMES[0]

// ---- date helpers -----------------------------------------------------------
const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
const dateLabel = (iso) => {
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) return 'Today'
  const yest = new Date(now)
  yest.setDate(now.getDate() - 1)
  if (d.toDateString() === yest.toDateString()) return 'Yesterday'
  const wd = d.toLocaleDateString('en-IN', { weekday: 'long' })
  const mo = d.toLocaleDateString('en-IN', { month: 'long' })
  return `${wd}, ${ordinal(d.getDate())} ${mo}, ${d.getFullYear()}`
}
const groupByDate = (articles) => {
  const order = []
  const map = new Map()
  for (const a of articles) {
    const k = dateLabel(a.publishedAt)
    if (!map.has(k)) {
      map.set(k, [])
      order.push(k)
    }
    map.get(k).push(a)
  }
  return order.map((k) => [k, map.get(k)])
}

// ---- small bits -------------------------------------------------------------
const DOTS = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6']
function Sources({ count = 5 }) {
  const n = Math.min(count, DOTS.length)
  return (
    <div className="flex items-center gap-2" style={SANS}>
      <div className="flex -space-x-1.5">
        {DOTS.slice(0, n).map((c, i) => (
          <span key={i} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />
        ))}
      </div>
      <span className="text-xs text-gray-500">{count} sources</span>
    </div>
  )
}

// A faint mandala drawn in SVG, parked in the hero corners.
function Mandala({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="20" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <line key={i} x1="50" y1="50" x2={50 + 46 * Math.cos(a)} y2={50 + 46 * Math.sin(a)} />
      })}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <circle key={`p${i}`} cx={50 + 34 * Math.cos(a)} cy={50 + 34 * Math.sin(a)} r="3" />
      })}
    </svg>
  )
}

function CategoryHero({ theme }) {
  const d = theme.desi
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative mx-auto mt-2 max-w-[1600px] px-4 sm:px-8 lg:px-14">
        <div className="desi-frame relative overflow-hidden rounded-3xl">
          {/* jewel-tone gradient base, tinted with the category cover */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})` }} />
          {theme.image && (
            <img src={theme.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />
          )}
          {/* block-print dot veil */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* corner mandalas */}
          <Mandala className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 text-white/20" />
          <Mandala className="pointer-events-none absolute -bottom-12 -right-10 h-52 w-52 text-white/15" />

          <div className="relative flex flex-col items-center gap-5 px-6 py-20 text-center sm:py-24">
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ ...SANS, color: d.accent }}>
              ✦ Shortly Edition ✦
            </span>
            <h1
              className="text-[clamp(2.5rem,9vw,120px)] font-extrabold uppercase leading-none tracking-tight text-white"
              style={{ ...SERIF, textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
            >
              {theme.label}
            </h1>
            <div className="h-[3px] w-28 rounded-full" style={{ background: d.accent }} />
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/90" style={SANS}>
              {theme.desc}
            </p>
            <Link
              to="/newsletter#subscribe"
              className="rounded-full px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-[#3a1206] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              style={{ ...SANS, background: d.accent }}
            >
              Subscribe
            </Link>
          </div>

          {/* jhalar trim hanging from the hero's bottom edge */}
          <div className="desi-jhalar absolute inset-x-0 bottom-0" style={{ '--jhalar': d.accent }} />
        </div>
      </div>
    </section>
  )
}

const TABS = [
  { key: 'all', label: 'All Stories' },
  { key: 'quick', label: 'Quick Reads' },
  { key: 'deep', label: 'Deep Reads' },
]
function SearchTabs({ tab, setTab, query, setQuery }) {
  return (
    <div className="mx-auto mt-10 flex max-w-[1600px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
      <div className="relative w-full sm:max-w-sm">
        <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories…"
          className="w-full rounded-full border border-[#c9a227]/45 bg-[#fffdf5] py-3 pl-11 pr-4 text-sm text-gray-800 outline-none focus:border-[#c9a227]"
          style={SANS}
        />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#fffdf5] p-1" style={SANS}>
        {TABS.map((t) => {
          const on = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                on ? 'text-white' : 'text-[#7b1e3b] hover:text-[#d81b60]'
              }`}
              style={on ? { background: 'linear-gradient(135deg, #F4A300, #D81B60)' } : undefined}
            >
              {t.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Rotating jewel bands so the grid reads "more is more" without losing order.
const DESI_BANDS = ['#F4A300', '#D81B60', '#0E7C7B', '#C2410C', '#5B2A86', '#1B5E3F']

function FeaturedCard({ category, article, band }) {
  return (
    <Link
      to={`/newsletter/${category}/${article.id}`}
      className="desi-card desi-frame block rounded-2xl p-6 transition-transform hover:-translate-y-0.5 sm:p-8"
      style={{ '--band': band }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
        style={{ ...SANS, background: band }}
      >
        ✦ Long Story
      </span>
      <h3 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl" style={SERIF}>
        {article.headline}
      </h3>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-700" style={SANS}>
        {article.summary}
      </p>
      <div className="mt-5">
        <Sources count={(article.tags?.length || 2) + 3} />
      </div>
    </Link>
  )
}

function StoryCard({ category, article, band }) {
  return (
    <Link
      to={`/newsletter/${category}/${article.id}`}
      className="desi-card flex h-full flex-col rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-0.5"
      style={{ '--band': band }}
    >
      <h4 className="text-[17px] font-bold leading-snug text-gray-900" style={SERIF}>
        {article.headline}
      </h4>
      <p className="mt-2 line-clamp-4 flex-1 text-[13px] leading-relaxed text-gray-700" style={SANS}>
        {article.summary}
      </p>
      <div className="mt-4">
        <Sources count={(article.tags?.length || 2) + 3} />
      </div>
    </Link>
  )
}

function DateHeading({ children }) {
  return (
    <div className="desi-divider mb-6 mt-12">
      <span className="desi-divider__motif" style={SANS}>
        ❖ {children} ❖
      </span>
    </div>
  )
}

// ---- feed state -------------------------------------------------------------
function Feed({ category, articles }) {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = articles
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((a) => `${a.headline} ${a.summary}`.toLowerCase().includes(q))
    }
    if (tab === 'quick') list = list.filter((a) => (a.summary || '').length <= 180)
    if (tab === 'deep') list = list.filter((a) => (a.summary || '').length > 180)
    return list
  }, [articles, tab, query])

  const groups = groupByDate(filtered)

  return (
    <>
      <SearchTabs tab={tab} setTab={setTab} query={query} setQuery={setQuery} />
      <div className="mx-auto max-w-[1600px] px-4 pb-8 sm:px-8 lg:px-14">
        {groups.length === 0 && (
          <p className="mt-16 text-center text-gray-500" style={SANS}>
            No stories match your search.
          </p>
        )}
        {(() => {
          let n = 0
          return groups.map(([label, items], gi) => {
            const featured = gi === 0 ? items[0] : null
            const rest = gi === 0 ? items.slice(1) : items
            return (
              <section key={label}>
                <DateHeading>{label}</DateHeading>
                {featured && (
                  <div className="mb-6">
                    <FeaturedCard category={category} article={featured} band={DESI_BANDS[n++ % DESI_BANDS.length]} />
                  </div>
                )}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((a) => (
                      <StoryCard key={a.id} category={category} article={a} band={DESI_BANDS[n++ % DESI_BANDS.length]} />
                    ))}
                  </div>
                )}
              </section>
            )
          })
        })()}
      </div>
    </>
  )
}

// ---- reading state ----------------------------------------------------------
function Reading({ category, articles, articleId }) {
  const article = articles.find((a) => a.id === articleId) || articles[0]
  const groups = groupByDate(articles)

  return (
    <div className="mx-auto mt-10 max-w-[1600px] px-4 pb-8 sm:px-8 lg:px-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* left: condensed list */}
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-2">
          {groups.map(([label, items]) => (
            <div key={label}>
              <DateHeading>{label}</DateHeading>
              <div className="flex flex-col gap-3">
                {items.map((a) => (
                  <Link
                    key={a.id}
                    to={`/newsletter/${category}/${a.id}`}
                    className={`rounded-xl border p-4 transition-colors ${
                      a.id === article.id
                        ? 'border-[#c9a227] bg-[#fff7e0]'
                        : 'border-[#c9a227]/25 bg-[#fffdf5] hover:border-[#c9a227]/50'
                    }`}
                  >
                    <h4 className="text-[15px] font-bold leading-snug text-gray-900" style={SERIF}>
                      {a.headline}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-gray-500" style={SANS}>
                      {a.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* right: open article */}
        <article className="min-w-0">
          <div className="mb-4 flex items-center gap-2 text-[12px] text-gray-500" style={SANS}>
            <Link to={`/newsletter/${category}`} className="font-medium text-[#d81b60] hover:underline">
              ← All {themeFor(category).label} stories
            </Link>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={SERIF}>
            {article.headline}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-gray-500" style={SANS}>
            <span>{article.source}</span>
            <span>·</span>
            <span>{dateLabel(article.publishedAt)}</span>
          </div>
          <div className="mt-5">
            <Sources count={(article.tags?.length || 2) + 3} />
          </div>

          <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-gray-700" style={SANS}>
            <p className="text-[18px] leading-[1.7] text-gray-800">{article.summary}</p>
            <p>
              This is a curated brief from Shortly. We synthesised the key developments above from
              multiple newsrooms so you get the full picture in seconds. For the complete reporting,
              continue to the original source below.
            </p>
          </div>

          {article.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2" style={SANS}>
              {article.tags.map((t) => (
                <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-[12px] text-gray-600">
                  {t}
                </span>
              ))}
            </div>
          )}

          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(216,27,96,0.35)]"
            style={{ ...SANS, background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}
          >
            Read the full story at {article.source}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </article>
      </div>
    </div>
  )
}

export default function CategoryNewsPage() {
  const { category, articleId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const theme = themeFor(category)
  const valid = NEWSLETTER_THEMES.some((t) => t.slug === category)

  useEffect(() => {
    if (!valid) {
      navigate('/newsletter', { replace: true })
      return
    }
    let alive = true
    setLoading(true)
    fetchNewsletter(category).then((d) => {
      if (alive) {
        setData(d)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [category, valid, navigate])

  const articles = data?.articles || []

  return (
    <div className="desi-paper min-h-screen text-gray-900">
      <NewsletterNav />
      <div className="pt-24 sm:pt-28">
        <CategoryHero theme={theme} />

        {loading ? (
          <div className="mx-auto max-w-[1600px] px-4 py-24 text-center text-gray-500 sm:px-8 lg:px-14" style={SANS}>
            Loading {theme.label} stories…
          </div>
        ) : articleId ? (
          <Reading category={category} articles={articles} articleId={articleId} />
        ) : (
          <Feed category={category} articles={articles} />
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

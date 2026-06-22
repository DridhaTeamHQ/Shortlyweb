import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Figma-exact newsletter header (node 1:1296 "Frame 15"):
//   SHORTLY (Roboto ExtraBold, 2px tracking)  ·  uppercase Roboto-Medium links
//   with the active item in a black-outlined pill  ·  #7900d9 "Download App" pill.
const ROBOTO = { fontFamily: "'Roboto', system-ui, sans-serif" }

// Home-page sections the existing site scrolls to.
const HOME_LINKS = [
  { label: 'Home', section: 'home' },
  { label: 'Features', section: 'features' },
  { label: 'What is shortly', section: 'why-shortly' },
  { label: 'Contact', section: 'contact' },
]

// In-page anchors on the newsletter route.
const PAGE_LINKS = [
  { label: 'Newsletter', anchor: null, active: true },
  { label: 'Themes', anchor: 'themes' },
  { label: 'Schedule', anchor: 'subscribe' },
]

export default function NewsletterNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const goHomeSection = (section) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 500)
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goAnchor = (anchor) => {
    if (!anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkClass =
    'px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black whitespace-nowrap transition-opacity hover:opacity-60'

  return (
    <header className="relative z-30 w-full" style={ROBOTO}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <button
          onClick={() => goAnchor(null)}
          className="text-[20px] font-extrabold tracking-[2px] text-[#010101]"
          style={ROBOTO}
          aria-label="Shortly home"
        >
          SHORTLY
        </button>

        {/* Center nav (desktop) */}
        <nav className="hidden items-center lg:flex">
          {HOME_LINKS.map((item) => (
            <button key={item.label} onClick={() => goHomeSection(item.section)} className={linkClass} style={ROBOTO}>
              {item.label}
            </button>
          ))}
          {PAGE_LINKS.map((item) =>
            item.active ? (
              <button
                key={item.label}
                onClick={() => goAnchor(null)}
                className="ml-1 rounded-full border border-black bg-white/10 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black whitespace-nowrap"
                style={ROBOTO}
              >
                {item.label}
              </button>
            ) : (
              <button key={item.label} onClick={() => goAnchor(item.anchor)} className={linkClass} style={ROBOTO}>
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Download App */}
        <a
          href="https://play.google.com/store/apps/details?id=com.dridha.shortly"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-[50px] bg-[#7900d9] px-6 py-3 text-[14px] font-semibold text-white whitespace-nowrap transition-transform hover:scale-[1.03]"
          style={ROBOTO}
        >
          Download App
        </a>
      </div>
    </header>
  )
}

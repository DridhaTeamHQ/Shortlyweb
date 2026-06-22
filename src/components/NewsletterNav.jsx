import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Newsletter header — Figma layout (node 1:1296) rendered as a floating frosted
// glass bar that colour-matches the cream / newspaper page:
//   SHORTLY (Roboto ExtraBold, 2px tracking) · uppercase Roboto-Medium links
//   with the active item in a pill · #7900d9 "Download App" pill.
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
    'px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black/80 whitespace-nowrap rounded-full transition-colors hover:bg-black/[0.04] hover:text-black'

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4" style={ROBOTO}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Frosted glass bar, tinted to the cream page so it blends in */}
        <div className="flex h-16 items-center justify-between rounded-full border border-white/60 bg-[#fbfaf7]/55 px-4 shadow-[0_8px_32px_rgba(17,12,5,0.08)] backdrop-blur-xl sm:px-6">
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
                  className="ml-1 rounded-full border border-black/70 bg-white/30 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black whitespace-nowrap shadow-sm"
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
            className="inline-flex items-center justify-center rounded-[50px] bg-[#7900d9] px-6 py-3 text-[14px] font-semibold text-white whitespace-nowrap shadow-[0_8px_24px_rgba(121,0,217,0.35)] transition-transform hover:scale-[1.03]"
            style={ROBOTO}
          >
            Download App
          </a>
        </div>
      </div>
    </header>
  )
}

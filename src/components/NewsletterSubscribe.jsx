import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import { subscribeNewsletter } from '../lib/subscribeApi'
import {
  SUBSCRIBE_CATEGORIES,
  RHYTHMS,
  WEEKDAYS,
  SOURCE_PREFERENCES,
} from '../lib/subscribeOptions'
import EditionPreview from './EditionPreview'
import '../styles/desi.css'

const BIWEEKLY_NOTE = 'You will receive editions twice a week (Tuesday & Friday).'
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

export default function NewsletterSubscribe({ categories: categoriesProp, onCategoriesChange }) {
  const controlled = Array.isArray(categoriesProp)
  const [catState, setCatState] = useState([])
  const categories = controlled ? categoriesProp : catState
  const setCategories = (updater) => {
    if (controlled) {
      const next = typeof updater === 'function' ? updater(categoriesProp) : updater
      onCategoriesChange?.(next)
    } else {
      setCatState(updater)
    }
  }

  const [rhythm, setRhythm] = useState('daily')
  const [days, setDays] = useState([]) // weekly weekdays
  const [source, setSource] = useState('top')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const allSelected = categories.length === SUBSCRIBE_CATEGORIES.length
  const summary =
    rhythm === 'weekly' && days.length
      ? `Weekly · ${days.map((d) => WEEKDAYS.find((w) => w.id === d)?.label.slice(0, 3)).filter(Boolean).join(', ')}`
      : RHYTHMS.find((r) => r.id === rhythm)?.label

  const toggleDay = (id) => {
    triggerHaptic('light')
    setDays((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  }
  const toggleCategory = (slug) => {
    triggerHaptic('light')
    setCategories((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))
  }
  const toggleAll = () => {
    triggerHaptic('light')
    setCategories(allSelected ? [] : SUBSCRIBE_CATEGORIES.map((c) => c.slug))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setStatus({ state: 'error', msg: 'Please enter a valid email address.' })
      return
    }
    if (categories.length === 0) {
      setStatus({ state: 'error', msg: 'Select at least one category.' })
      return
    }
    if (rhythm === 'weekly' && days.length === 0) {
      setStatus({ state: 'error', msg: 'Pick at least one day for weekly delivery.' })
      return
    }
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await subscribeNewsletter({
        name: name.trim(),
        email: email.trim(),
        rhythm,
        send_days: rhythm === 'weekly' ? days : [],
        categories,
        source_preference: source,
      })
      triggerHaptic('success')
      setStatus({
        state: 'success',
        msg: res.resubscribed
          ? 'Welcome back — your subscription is active again.'
          : res.existing
            ? 'Your preferences have been updated.'
            : "You're in. Watch your inbox for your first edition.",
      })
    } catch (err) {
      triggerHaptic('error')
      setStatus({ state: 'error', msg: err?.message || 'Something went wrong. Please try again.' })
    }
  }

  // ---- desi-maximalism styling helpers ----
  const card = 'bg-[#fffdf5] border border-[#c9a227]/35'
  const cardActive = 'border-[#d81b60] ring-1 ring-[#d81b60]/30 bg-[#fff7e0]'
  const badge = 'rounded-full bg-[#fff0d6] text-[#7b1e3b] px-2.5 py-0.5 text-[11px] font-bold'
  const sub = 'text-gray-500'
  const chip = (active) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 border ${
      active
        ? 'bg-[#d81b60] border-[#d81b60] text-white'
        : 'border-[#c9a227]/40 text-gray-700 hover:border-[#d81b60] hover:text-[#d81b60]'
    }`
  const input =
    'mt-1 w-full rounded-xl px-4 py-3 outline-none transition-colors bg-white border border-[#c9a227]/40 focus:border-[#d81b60] text-gray-900 placeholder-gray-400'

  if (status.state === 'success') {
    return (
      <div className="desi-frame mx-auto max-w-xl rounded-3xl bg-[#fffdf5] p-8 text-center sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-2xl font-bold" style={SERIF}>You&rsquo;re subscribed! ✦</h3>
        <p className="mt-2 text-gray-600">{status.msg}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      {/* LEFT — the builder form */}
      <form onSubmit={onSubmit} className={`rounded-3xl p-6 sm:p-8 ${card}`}>
        {/* Schedule */}
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-lg font-bold" style={SERIF}>Schedule</h3>
          {summary && <span className={badge}>{summary}</span>}
        </div>
        <p className={`mb-4 text-sm ${sub}`}>Choose your delivery rhythm.</p>

        <div className="space-y-3">
          {RHYTHMS.map((r) => {
            const active = rhythm === r.id
            return (
              <button
                type="button"
                key={r.id}
                onClick={() => { triggerHaptic('light'); setRhythm(r.id) }}
                className={`w-full rounded-2xl p-4 text-left transition-all ${card} ${active ? cardActive : 'hover:border-[#c9a227]/60'}`}
              >
                <div className="font-semibold">{r.label}</div>
                <div className={`text-sm ${sub}`}>{r.desc}</div>

                <AnimatePresence initial={false}>
                  {active && r.id === 'weekly' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-2 pt-3">
                        {WEEKDAYS.map((w) => (
                          <span
                            key={w.id}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => { e.stopPropagation(); toggleDay(w.id) }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); toggleDay(w.id) } }}
                            className={`cursor-pointer text-center ${chip(days.includes(w.id))}`}
                          >
                            {w.label}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {active && r.id === 'bi-weekly' && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`overflow-hidden pt-2 text-xs ${sub}`}>
                      {BIWEEKLY_NOTE}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>

        {/* Categories */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold" style={SERIF}>Categories</h3>
            <p className={`text-sm ${sub}`}>Choose what matters to you.</p>
          </div>
          <span className={badge}>{categories.length} Selected</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={toggleAll} className={chip(allSelected)}>All</button>
          {SUBSCRIBE_CATEGORIES.map((c) => (
            <button type="button" key={c.slug} onClick={() => toggleCategory(c.slug)} className={chip(categories.includes(c.slug))}>
              {c.label}
              {categories.includes(c.slug) && <span className="ml-1.5">✓</span>}
            </button>
          ))}
        </div>

        {/* Source preference */}
        <div className="mt-8">
          <h3 className="text-lg font-bold" style={SERIF}>Source Preference</h3>
          <p className={`mb-3 text-sm ${sub}`}>Choose how broadly we should curate.</p>
          <div className="space-y-3">
            {SOURCE_PREFERENCES.map((s) => {
              const active = source === s.id
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => { triggerHaptic('light'); setSource(s.id) }}
                  className={`w-full rounded-2xl p-4 text-left transition-all ${card} ${active ? cardActive : 'hover:border-[#c9a227]/60'}`}
                >
                  <div className="font-semibold">{s.label}</div>
                  <div className={`text-sm ${sub}`}>{s.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Claim your edition */}
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold" style={SERIF}>Claim your edition</h3>
          <label className="block">
            <span className={`text-sm ${sub}`}>Your preferred name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className={input} />
          </label>
          <label className="mt-4 block">
            <span className={`text-sm ${sub}`}>Your email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className={input} />
          </label>

          {status.state === 'error' && <p className="mt-3 text-sm text-red-500">{status.msg}</p>}

          <button
            type="submit"
            disabled={status.state === 'loading'}
            className="mt-5 w-full rounded-xl py-3.5 font-bold uppercase tracking-wide text-white shadow-[0_10px_28px_rgba(216,27,96,0.35)] transition-transform hover:scale-[1.01] disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}
          >
            {status.state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </div>
      </form>

      {/* RIGHT — live desi edition preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <EditionPreview rhythm={rhythm} days={days} source={source} categories={categories} name={name} summary={summary} />
      </div>
    </div>
  )
}

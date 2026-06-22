import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { triggerHaptic } from '../utils/haptics'
import { subscribeNewsletter } from '../lib/subscribeApi'
import {
  SUBSCRIBE_CATEGORIES,
  RHYTHMS,
  WEEKDAYS,
  SOURCE_PREFERENCES,
} from '../lib/subscribeOptions'

const BIWEEKLY_NOTE = 'You will receive editions twice a week (Tuesday & Friday).'

export default function NewsletterSubscribe({ categories: categoriesProp, onCategoriesChange }) {
  // The newsletter page follows the light Figma design regardless of the site theme.
  const dark = false

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
      ? `Weekly, ${days.map((d) => WEEKDAYS.find((w) => w.id === d)?.label).filter(Boolean).join(', ')}`
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

  // shared styling helpers
  const card = dark
    ? 'bg-white/[0.04] border border-white/10'
    : 'bg-white border border-gray-200'
  const cardActive = 'border-purple-500 ring-1 ring-purple-500/40'
  const chip = (active) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 border ${
      active
        ? 'bg-purple-500/15 border-purple-500 text-purple-300'
        : dark
          ? 'border-white/10 text-gray-300 hover:border-white/25'
          : 'border-gray-200 text-gray-700 hover:border-purple-300'
    }`
  const sub = dark ? 'text-gray-400' : 'text-gray-500'

  if (status.state === 'success') {
    return (
      <div className={`rounded-3xl p-8 sm:p-10 text-center ${dark ? 'liquid-glass' : 'bg-white border border-purple-100 shadow-sm'}`}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-green-400">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-xl font-bold">You're subscribed!</h3>
        <p className={`mt-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{status.msg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl p-6 sm:p-8 ${dark ? 'liquid-glass' : 'bg-white border border-purple-100 shadow-sm'}`}>
      {/* Schedule */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-lg font-bold">Schedule</h3>
        {summary && (
          <span className="rounded-full bg-purple-500/15 text-purple-300 px-2.5 py-0.5 text-[11px] font-semibold">{summary}</span>
        )}
      </div>
      <p className={`text-sm mb-4 ${sub}`}>Choose your delivery rhythm.</p>

      <div className="space-y-3">
        {RHYTHMS.map((r) => {
          const active = rhythm === r.id
          return (
            <button
              type="button"
              key={r.id}
              onClick={() => { triggerHaptic('light'); setRhythm(r.id) }}
              className={`w-full text-left rounded-2xl p-4 transition-all ${card} ${active ? cardActive : ''}`}
            >
              <div className="font-semibold">{r.label}</div>
              <div className={`text-sm ${sub}`}>{r.desc}</div>

              <AnimatePresence initial={false}>
                {active && r.id === 'weekly' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      {WEEKDAYS.map((w) => (
                        <span
                          key={w.id}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); toggleDay(w.id) }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); toggleDay(w.id) } }}
                          className={`text-center cursor-pointer ${chip(days.includes(w.id))}`}
                        >
                          {w.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {active && r.id === 'bi-weekly' && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`overflow-hidden text-xs pt-2 ${sub}`}
                  >
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
          <h3 className="text-lg font-bold">Categories</h3>
          <p className={`text-sm ${sub}`}>Choose what matters to you.</p>
        </div>
        <span className="rounded-full bg-purple-500/15 text-purple-300 px-2.5 py-0.5 text-[11px] font-semibold">
          {categories.length} Selected
        </span>
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
        <h3 className="text-lg font-bold">Source Preference</h3>
        <p className={`text-sm mb-3 ${sub}`}>Choose how broadly we should curate.</p>
        <div className="space-y-3">
          {SOURCE_PREFERENCES.map((s) => {
            const active = source === s.id
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => { triggerHaptic('light'); setSource(s.id) }}
                className={`w-full text-left rounded-2xl p-4 transition-all ${card} ${active ? cardActive : ''}`}
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
        <h3 className="text-lg font-bold mb-3">Claim your edition</h3>
        <label className="block">
          <span className={`text-sm ${sub}`}>Your preferred name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={`mt-1 w-full rounded-xl px-4 py-3 outline-none transition-colors ${dark ? 'bg-white/5 border border-white/10 focus:border-purple-400 text-white placeholder-gray-500' : 'bg-white border border-gray-200 focus:border-purple-400 text-gray-900 placeholder-gray-400'}`}
          />
        </label>
        <label className="block mt-4">
          <span className={`text-sm ${sub}`}>Your email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={`mt-1 w-full rounded-xl px-4 py-3 outline-none transition-colors ${dark ? 'bg-white/5 border border-white/10 focus:border-purple-400 text-white placeholder-gray-500' : 'bg-white border border-gray-200 focus:border-purple-400 text-gray-900 placeholder-gray-400'}`}
          />
        </label>

        {status.state === 'error' && (
          <p className="mt-3 text-sm text-red-400">{status.msg}</p>
        )}

        <button
          type="submit"
          disabled={status.state === 'loading'}
          className="mt-5 w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3.5 transition-colors"
        >
          {status.state === 'loading' ? 'Subscribing…' : 'SUBSCRIBE'}
        </button>
      </div>
    </form>
  )
}

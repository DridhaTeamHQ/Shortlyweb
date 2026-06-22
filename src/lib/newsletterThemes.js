// The 7 canonical categories shown as "Select Your Theme" cover cards.
// `image` is a static cover asset under /public/newsletter/themes (null = use the
// styled placeholder until a cover is supplied). slugs match the agent taxonomy.

export const NEWSLETTER_THEMES = [
  {
    slug: 'national',
    label: 'National',
    desc: 'The biggest stories shaping India today — politics, policy, and people.',
    image: null,
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    slug: 'international',
    label: 'International',
    desc: 'World events, diplomacy, and the shifts that ripple across borders.',
    image: null,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'finance',
    label: 'Finance',
    desc: 'Markets, money, and the macro forces moving your wallet.',
    image: '/newsletter/themes/finance.jpg',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    slug: 'sports',
    label: 'Sports',
    desc: 'Results, rivalries, and the moments that defined the day in sport.',
    image: '/newsletter/themes/sports.jpg',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    slug: 'entertainment',
    label: 'Entertainment',
    desc: 'Film, music, streaming, and the culture everyone is talking about.',
    image: null,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    slug: 'lifestyle',
    label: 'Lifestyle',
    desc: 'Health, work, food, and living well in a fast-moving world.',
    image: null,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    slug: 'technology',
    label: 'Technology',
    desc: 'AI, startups, gadgets, and the tech reshaping how we live.',
    image: '/newsletter/themes/technology.jpg',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
]

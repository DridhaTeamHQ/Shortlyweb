// Newsletter categories shown in the sub-nav. `gradient` is a Tailwind gradient
// used for the category chip + card banner so each category has its own accent
// while staying inside the site's purple/glass palette.
export const NEWS_CATEGORIES = [
  { id: 'top',           label: 'Top Stories',   gradient: 'from-purple-500 to-pink-500' },
  { id: 'india',         label: 'India',         gradient: 'from-orange-500 to-pink-500' },
  { id: 'world',         label: 'World',         gradient: 'from-blue-500 to-cyan-500' },
  { id: 'business',      label: 'Business',      gradient: 'from-emerald-500 to-teal-500' },
  { id: 'technology',    label: 'Technology',    gradient: 'from-violet-500 to-fuchsia-500' },
  { id: 'sports',        label: 'Sports',        gradient: 'from-amber-500 to-orange-500' },
  { id: 'entertainment', label: 'Entertainment', gradient: 'from-pink-500 to-rose-500' },
  { id: 'science',       label: 'Science',       gradient: 'from-sky-500 to-indigo-500' },
  { id: 'health',        label: 'Health',        gradient: 'from-green-500 to-emerald-500' },
]

export const DEFAULT_CATEGORY = 'top'

export function getCategoryMeta(id) {
  return NEWS_CATEGORIES.find((c) => c.id === id) || NEWS_CATEGORIES[0]
}

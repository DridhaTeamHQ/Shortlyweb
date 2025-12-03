# Shortly - Hyperlocal News Website

A modern, responsive landing page for Shortly - your hyperlocal news companion app.

## ✨ Features

- 🎨 **Beautiful Design**: Glass morphism effects, aurora backgrounds, smooth animations
- 🌓 **Dark/Light Mode**: Seamless theme switching with animated toggle
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🎭 **Interactive Animations**: Scroll velocity, scrambled text, 3D galleries
- ⚡ **Performance Optimized**: 60fps animations, GPU acceleration, lazy loading
- 📳 **Haptic Feedback**: Touch feedback on mobile devices
- 🌐 **Cross-Browser**: Works on Chrome, Firefox, Safari, Edge

## 🛠️ Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.2
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.11
- **3D Graphics**: OGL 1.0, Three.js 0.168, React Three Fiber
- **Text Effects**: GSAP 3.13 (with trial plugins)
- **Font**: Montserrat (Google Fonts)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "Shortly website"

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── 3D/              # Three.js 3D components
│   ├── Hero.jsx         # Hero section with aurora
│   ├── Features.jsx     # Feature cards gallery
│   ├── WhyShortly.jsx   # What is Shortly section
│   ├── WhyHyperLocal.jsx # Coming Soon section
│   ├── Footer.jsx       # Footer with links
│   ├── Navbar.jsx       # Navigation bar
│   └── ...              # Other UI components
├── context/
│   └── ThemeContext.jsx # Theme management
├── utils/
│   └── haptics.js       # Haptic feedback utility
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles

public/
├── features cards/           # Feature images
├── feature cards shortly/    # Feature videos (MP4)
├── dark mode shortly/        # Dark mode screenshots
├── light mode shortly/       # Light mode screenshots
└── logos/                   # Logo assets
```

## 🎯 Sections

### 1. Hero
- Montserrat font for branding
- Animated aurora background
- Theme-aware colors
- Download buttons (App Store & Google Play)
- Floating orbs decoration
- Scroll parallax effect

### 2. Features
- Circular 3D gallery
- Interactive feature cards
- Hover-to-preview (1s delay)
- Modal with high-quality videos
- Lazy-loaded video content
- Loading states & error handling
- Drag to scroll
- Theme-specific styling

### 3. What is Shortly?
- Left-aligned content
- Phone mockup showcase
- Theme-aware app screenshots (5-6 screens)
- Up/down navigation
- Scrambled text effect
- Slide transitions

### 4. Coming Soon
- Edge-to-edge scroll velocity
- Multiple text rows (velocity 100)
- Alternating directions
- Purple themed text

### 5. Footer
- Liquid glass container
- Links to sections
- Social media icons
- Copyright: © 2024 Dridha Technologies

## 🎨 Color Palette

### Purple Shades
- Primary: `#7c3aed` (purple-600)
- Light: `#a855f7` (purple-400)
- Dark: `#9333ea` (purple-600)
- Accent: `#c084fc` (purple-300)

### Themes
- Light: Purple tints, white backgrounds
- Dark: Purple accents, dark backgrounds

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: 1024px+ (xl/2xl)

All components are fully responsive with mobile-first design.

## ⚡ Performance Optimizations

### Build
- Code splitting (vendor, motion, GSAP, Three.js)
- Minification with Terser
- Console removal in production
- No sourcemaps in production

### Runtime
- Aurora FPS limited to 30fps
- GPU acceleration (translateZ)
- CSS containment on sections
- Throttled event handlers
- Passive event listeners
- RequestAnimationFrame throttling

### Assets
- Optimized images
- Video lazy loading (on-demand)
- Video error handling
- Loading states for videos
- Font display: swap
- Cache headers (1 year)
- Video range requests enabled

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Samsung Internet 14+
- Opera 76+

## 🔧 Configuration Files

- `netlify.toml` - Netlify deployment config
- `_redirects` - SPA routing
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Tailwind customization
- `postcss.config.js` - PostCSS setup

## 📝 Development Notes

### Adding New Features
1. Create component in `src/components/`
2. Import in `App.jsx`
3. Add section ID for navigation
4. Update navbar links if needed

### Updating Screenshots & Videos
- Dark mode: `public/dark mode shortly/`
- Light mode: `public/light mode shortly/`
- Feature card images: `public/features cards/`
- Feature videos: `public/feature cards shortly/` (MP4 format)

### Theme Customization
- Colors: `tailwind.config.js`
- Global styles: `src/index.css`
- Theme logic: `src/context/ThemeContext.jsx`

## 🐛 Known Issues

- ScrambledText requires GSAP trial license (included)
- Aurora may not work on very old browsers (WebGL2 required)
- Haptics only work on supported mobile devices

## 📦 Dependencies

### Core
- react, react-dom
- framer-motion
- gsap (with trial plugins)
- ogl

### Three.js Ecosystem
- three
- @react-three/fiber
- @react-three/drei

### Styling
- tailwindcss
- autoprefixer
- postcss

## 🚀 Deployment Checklist

Before deploying:
- [x] All images optimized
- [x] Console.logs removed (auto in build)
- [x] Responsive tested
- [x] Cross-browser tested
- [x] Performance optimized
- [x] SEO meta tags added
- [x] Favicon updated
- [x] Analytics (optional - to add)
- [x] Error tracking (optional - to add)

## 📊 Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🔗 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --host    # Dev server with network access

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Maintenance
npm audit fix            # Fix security vulnerabilities
npm update               # Update dependencies
```

## 📞 Support

For deployment issues, check:
1. Netlify build logs
2. Browser console errors
3. Network tab for failed requests
4. DEPLOYMENT.md for detailed guide

---

**Developed by Dridha Technologies**  
**Version:** 1.0.0  
**Last Updated:** November 2025  

📄 **See also:**
- [PERFORMANCE.md](./PERFORMANCE.md) - Detailed performance report
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide


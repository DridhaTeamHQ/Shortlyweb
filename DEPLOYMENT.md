# Shortly Website - Deployment Guide

## 🚀 Deploy to Netlify

### Quick Deploy (Recommended)

1. **Connect to Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository (GitHub/GitLab/Bitbucket)

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

3. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Manual Deploy (Drag & Drop)

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder to deploy

## 📦 Project Structure

```
Shortly website/
├── public/                    # Static assets
│   ├── features cards/       # Feature card images
│   ├── dark mode shortly/    # Dark theme screenshots
│   ├── light mode shortly/   # Light theme screenshots
│   └── logos/               # Logo files
├── src/
│   ├── components/          # React components
│   ├── context/            # React context (Theme)
│   ├── utils/              # Utilities (haptics)
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── netlify.toml            # Netlify configuration
├── _redirects              # SPA routing
├── vite.config.js          # Vite build config
└── package.json            # Dependencies
```

## ⚙️ Environment Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Cross-Platform Compatibility

### Tested On:
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Samsung Internet
- ✅ Opera

### Screen Sizes:
- 📱 Mobile: 320px - 767px
- 📲 Tablet: 768px - 1023px
- 💻 Desktop: 1024px - 1439px
- 🖥️ Large Desktop: 1440px+

## 🔧 Performance Features

### Build Optimizations
- ✅ Code splitting by vendor (React, GSAP, Three.js, etc.)
- ✅ Minification with Terser
- ✅ Console.log removal in production
- ✅ Asset caching (1 year)
- ✅ Compressed images
- ✅ GPU acceleration enabled

### Runtime Optimizations
- ✅ Aurora limited to 30fps
- ✅ Throttled event handlers
- ✅ CSS containment on sections
- ✅ will-change hints for animated elements
- ✅ Passive event listeners
- ✅ requestAnimationFrame throttling

## 🎨 Features

### Sections
1. **Hero** - Aurora background with Montserrat font
2. **Features** - Circular gallery with hover modals
3. **What is Shortly** - Phone mockup with theme-aware screenshots
4. **Coming Soon** - Scroll velocity animation
5. **Footer** - Mist glass effect with links

### Interactions
- Drag to scroll feature cards
- Hover 0.5s to preview feature
- Theme toggle (light/dark)
- Haptic feedback on mobile
- Smooth scroll navigation

## 📱 Mobile Optimizations

- Touch-optimized controls
- Haptic feedback
- Reduced animations for performance
- Responsive images
- Optimized asset loading
- Pull-to-refresh disabled

## 🔐 Security Headers

Configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection enabled
- Strict Referrer Policy

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Ensure all images are in the `public` folder
- Check file paths (case-sensitive on Linux servers)
- Verify image formats (jpg, png, svg)

### Aurora Not Showing
- Check WebGL2 support in browser
- Verify OGL library is installed
- Check browser console for errors

## 🚢 Production Checklist

- [x] Netlify configuration (`netlify.toml`)
- [x] Build optimizations (vite.config.js)
- [x] Responsive design (all breakpoints)
- [x] Cross-browser compatibility
- [x] Performance optimizations
- [x] Security headers
- [x] SPA routing (_redirects)
- [x] Asset caching
- [x] Haptic feedback
- [x] Theme persistence
- [x] Error boundaries (recommended to add)

## 📊 Performance Metrics Target

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## 🔄 Continuous Deployment

Once connected to Netlify:
1. Push to main branch
2. Netlify auto-builds
3. Deploy preview for branches
4. Production deploy on merge

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify Node.js version (18+)
- Ensure all dependencies are installed
- Check Netlify build logs

---

**Built with:** React + Vite + Framer Motion + GSAP + OGL
**Developed by:** Dridha Technologies
**Version:** 1.0.0


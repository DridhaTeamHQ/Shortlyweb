<!-- 4f7c96e9-5e2f-4181-bc68-41820513ef31 c2151d9c-e155-44bf-b790-c30c43e1d057 -->
# Shortly Website with 3D Elements & Scroll Animations

## Tech Stack

- **React** with Vite for fast development
- **Three.js / React Three Fiber** for 3D elements
- **Framer Motion** for scroll animations
- **Tailwind CSS** for styling
- **Components from reactbits.dev** for modern UI elements

## Project Structure

```
shortly-website/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── WhyHyperLocal.jsx
│   │   ├── Footer.jsx
│   │   └── 3D/
│   │       └── Scene3D.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## Implementation Steps

### 1. Project Setup

- Initialize React + Vite project
- Install dependencies: three, @react-three/fiber, @react-three/drei, framer-motion, tailwindcss
- Configure Tailwind CSS
- Set up basic project structure

### 2. Hero Section

- Large "SHORTLY" text with 3D effect
- Animated 3D background elements (floating geometric shapes)
- App Store and Play Store download buttons
- Scroll indicator animation
- Use hero components from reactbits.dev as reference

### 3. Features Section

- 6 feature cards in a grid layout (2x3 or 3x2)
- Each card with:
  - Short News
  - Video Content News
  - Quick News
  - Live Polls
  - Daily Wrap
  - Audio News
- Scroll-triggered animations (fade in, slide up)
- 3D card hover effects (tilt, depth)
- Use card components from reactbits.dev

### 4. Why Hyper Local News Section

- Two-column layout: text on left, image on right
- Placeholder text about hyper-local news benefits
- Parallax effect on image
- Scroll-triggered fade-in animation

### 5. Footer

- App information and links
- Social media icons
- Download buttons (repeated)
- Copyright information
- Clean, modern design

### 6. Scroll Animations

- Implement Framer Motion scroll-triggered animations
- Smooth transitions between sections
- Parallax effects on 3D elements
- Progressive reveal of content

### 7. 3D Elements Integration

- Floating geometric shapes in hero
- Subtle 3D background elements throughout
- Interactive elements that respond to scroll
- Optimized for performance

## Design Approach

- Modern, clean aesthetic inspired by reactbits.dev
- Dark theme with vibrant accent colors (customizable)
- Glassmorphism effects on cards
- Smooth, professional animations
- Mobile-responsive design

### To-dos

- [ ] Initialize React + Vite project and install all dependencies (three, @react-three/fiber, @react-three/drei, framer-motion, tailwindcss)
- [ ] Configure Tailwind CSS and set up custom theme colors
- [ ] Build Hero section with 3D SHORTLY text, background elements, and download buttons
- [ ] Create Features section with 6 animated cards using reactbits.dev design patterns
- [ ] Build Why Hyper Local News section with text and image layout
- [ ] Design and implement footer with links and information
- [ ] Implement Framer Motion scroll animations across all sections
- [ ] Integrate Three.js 3D elements and background effects
- [ ] Ensure mobile responsiveness and optimize performance
# 📊 Anushka Vishwakarma — Portfolio

> **Aspiring Data Analyst & AI Engineer** | CS Graduate

A production-ready personal portfolio website built with pure HTML5, CSS3, and vanilla JavaScript. No build tools or frameworks required — just open `index.html` in a browser.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, SEO, accessibility |
| **CSS3** | Design system, glassmorphism, animations, responsive layout |
| **Vanilla JavaScript (ES6+)** | Interactivity, data rendering, form handling |
| **Google Fonts** | Inter, Outfit, JetBrains Mono |
| **JSON data files** | Centralized content management |

**Why no framework?** Zero build complexity, instant deploy anywhere (GitHub Pages, Netlify, Vercel static), perfect Lighthouse scores, works offline, and tiny bundle (~20 KB total).

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML — all sections
├── styles.css              # Full design system + responsive CSS
├── script.js               # All JavaScript logic
├── resume.pdf              # 📌 REPLACE with your actual resume
├── data/
│   ├── skills.json         # Skills data (name, percent, description)
│   ├── projects.json       # Project cards data
│   └── experience.json     # Experience, certs, dashboards, GitHub, contact
├── images/
│   ├── profile.jpg         # 📌 REPLACE with your photo (400×400px)
│   ├── projects/
│   │   ├── finance-buddy.png
│   │   ├── cvsmart.png
│   │   ├── sales-dashboard.png
│   │   ├── hr-analytics.png
│   │   ├── customer-segmentation.png
│   │   └── sql-analysis.png
│   └── dashboards/
│       ├── dashboard1.png
│       ├── dashboard2.png
│       ├── dashboard3.png
│       └── dashboard4.png
└── README.md
```

---

## ⚡ Quick Start

### Option A — Open directly (simplest)
```bash
# No installation needed
# Just double-click index.html in your file explorer
# OR drag it into your browser window
```

> ⚠️ **Note:** JSON data files require a local server to load (browser security). Use Option B for full functionality.

### Option B — Local server (recommended for development)
```bash
# If you have Python 3:
python -m http.server 8000
# Then open: http://localhost:8000

# If you have Node.js:
npx serve .
# OR
npx http-server . -p 8000

# VS Code: Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

### Option C — VS Code Live Server (easiest dev setup)
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

---

## 🎨 Customizing Your Portfolio

### 1. Replace Placeholder Text
Search and replace these strings throughout the files:

| Placeholder | Replace With |
|---|---|
| `Anushka Vishwakarma` | Your full name |
| `INSTITUTION_NAME` | Your university/college |
| `GITHUB_USERNAME` | Your GitHub username |
| `LINKEDIN_USERNAME` | Your LinkedIn profile slug |
| `TWITTER_HANDLE` | Your Twitter handle |
| `your.email@example.com` | Your email address |
| `City, Country` | Your location |

### 2. Replace Profile Image
- Add your photo as `images/profile.jpg`
- Recommended: **400×400px** square, JPG/WebP format
- Compress it to **< 100 KB** for fast loading

### 3. Update Skills Data
Edit `data/skills.json` — change `levelPercent` (0–100), `name`, `description`, and `category`.

### 4. Update Projects
Edit `data/projects.json` — each project has:
- `title`, `subtitle`, `shortDesc`, `features[]`
- `techStack[]`, `githubUrl`, `demoUrl`
- `image` path (add screenshots to `images/projects/`)

### 5. Update Experience & Certifications
Edit `data/experience.json` — update the `experience`, `certifications`, `achievements`, and `dashboards` arrays.

### 6. Replace Resume
- Add your resume as `resume.pdf` in the project root
- Make sure it's **ATS-friendly** and **< 2 MB**

### 7. Connect Contact Form
**Option A — Formspree (recommended):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. In `index.html`, find the `<form>` element
4. Change `action="https://formspree.io/f/YOUR_FORM_ID"` with your actual ID

**Option B — EmailJS:**
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add the EmailJS SDK to `index.html`
3. Update `script.js` to call `emailjs.send()`

---

## 🌐 Deployment

### GitHub Pages (Free)
```bash
# 1. Push to GitHub repo
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main

# 2. Go to Settings → Pages → Source: main branch / root
# Your site will be at: https://USERNAME.github.io/portfolio/
```

### Netlify (Drag & Drop — Zero config)
1. Go to [netlify.com](https://netlify.com)
2. Drag the project folder onto the Netlify dashboard
3. Done — you get a live URL instantly

### Vercel (CLI)
```bash
npx vercel
# Follow the prompts — deploys in < 30 seconds
```

---

## ♿ Accessibility Checklist

- [x] Semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<footer>`, `<main>`)
- [x] ARIA labels on all interactive elements
- [x] `aria-required`, `aria-invalid`, `aria-live` on form fields
- [x] `aria-modal`, `aria-labelledby`, `aria-describedby` on modal dialog
- [x] Keyboard-navigable: nav, modal, form, buttons
- [x] Focus-visible outlines on all focusable elements
- [x] Alt text on all images
- [x] Color contrast ratio ≥ 4.5:1 for body text
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Role attributes for custom interactive elements

---

## 🔍 SEO Checklist

- [x] Descriptive `<title>` tag
- [x] `<meta name="description">` (150–160 chars)
- [x] `<meta name="keywords">` with relevant terms
- [x] `<link rel="canonical">` URL
- [x] Open Graph tags (og:title, og:description, og:image, og:type)
- [x] Twitter Card meta tags
- [x] Schema.org `Person` structured data (JSON-LD)
- [x] Semantic heading hierarchy (h1 → h2 → h3)
- [x] `lang` attribute on `<html>`
- [x] Descriptive alt text on images
- [x] `loading="lazy"` on non-critical images
- [ ] **TODO:** Replace `https://anushkasharma.dev/` with your actual domain in canonical and OG tags
- [ ] **TODO:** Replace `images/profile.jpg` OG image with actual hosted URL

---

## ⚡ Performance Optimization

### Image Compression
- Use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) to compress images
- Convert to **WebP** format for 30–50% smaller files
- Profile image: target **< 80 KB**
- Project thumbnails: target **< 150 KB each**

### Lighthouse Checklist

| Metric | Target | Tips |
|---|---|---|
| **Performance** | ≥ 90 | Compress images, use WebP, lazy-load |
| **Accessibility** | 100 | ARIA labels, contrast, keyboard nav |
| **Best Practices** | ≥ 95 | HTTPS, no console errors |
| **SEO** | 100 | Meta tags, canonical, structured data |

### Additional Tips
- Host fonts locally or use `font-display: swap` (already set via Google Fonts URL parameters)
- Add a `<link rel="preload">` for your profile image
- Enable Gzip/Brotli compression on your hosting
- Use a CDN (Netlify/Vercel do this automatically)

---

## 🎨 Color Palette

| Token | Dark Mode | Light Mode |
|---|---|---|
| `--accent-primary` | `#6366f1` (Indigo) | `#6366f1` |
| `--accent-secondary` | `#8b5cf6` (Violet) | `#8b5cf6` |
| `--accent-cyan` | `#06b6d4` (Cyan) | `#06b6d4` |
| `--bg-primary` | `#0a0a0f` | `#f5f5ff` |
| `--bg-secondary` | `#0f0f1a` | `#ebebf8` |
| `--text-primary` | `#f0f0ff` | `#0f0f2e` |

To change the accent color, update `--accent-primary` and `--accent-secondary` in `styles.css` `:root`.

---

## 📝 License

Feel free to use this template for your own portfolio. Attribution appreciated but not required.

---

*Built with ❤️ for Anushka Sharma's portfolio — 2024*

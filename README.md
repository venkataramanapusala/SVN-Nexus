# SVN Nexus Private Limited — Company Website

A modern, fully responsive business website for **SVN Nexus Private Limited**, a software services company offering custom app development and digital marketing solutions.

---

## 📁 Project Structure

```
SVN_Nexus/
├── index.html   ← Main HTML markup (semantic, accessible)
├── style.css    ← All styles (responsive, animations, design tokens)
├── script.js    ← JavaScript (menu, scrolling, reveal, form validation)
└── README.md    ← This file
```

---

## 🚀 How to Run Locally

### Option 1 — Open Directly (Quickest)
1. Navigate to the `SVN_Nexus` folder in File Explorer.
2. Double-click **`index.html`** to open it in your default browser.

### Option 2 — VS Code Live Server (Recommended)
1. Open the `SVN_Nexus` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500` with auto-refresh on save.

### Option 3 — Python Local Server
Open a terminal in the project folder and run:
```bash
# Python 3
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

### Option 4 — Node.js (npx serve)
```bash
npx serve .
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Responsive Design** | Mobile, tablet & desktop layouts |
| **Sticky Navigation** | Shrinks & adds shadow on scroll |
| **Mobile Hamburger Menu** | Animated open/close with JS |
| **Scroll Reveal Animations** | IntersectionObserver-based fade-ins |
| **Animated Counters** | Stats count up when scrolled into view |
| **Active Nav Highlighting** | Current section highlighted in nav |
| **Contact Form Validation** | Real-time front-end validation with error messages |
| **Back-to-Top Button** | Smooth scroll, appears after 400px |
| **Modern UI** | Gradient accents, cards, shadows, hover effects |
| **No Frameworks** | Pure HTML, CSS & Vanilla JS |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| Indigo | `#4F46E5` | Primary brand colour |
| Cyan | `#06B6D4` | Accent / gradient end |
| Purple | `#8B5CF6` | Secondary accent |
| Emerald | `#10B981` | Success / check icons |
| Slate Dark | `#0F172A` | Headings / footer bg |

---

## 🌐 Sections

1. **Hero** — Headline, CTAs, animated dashboard mockup, stats
2. **About** — Company intro, team photo, key highlights
3. **Services** — App Creation, Digital Marketing, Tech Consulting cards
4. **Why Choose Us** — 6 feature highlight cards
5. **Portfolio** — 3 sample projects with real Unsplash images
6. **Testimonials** — 3 client reviews with ratings
7. **Contact** — Form with validation + company contact details
8. **Footer** — Links, social icons, copyright

---

## 📦 External Resources Used

- **Google Fonts** — Inter (loaded via CDN)
- **Font Awesome 6** — Icons (loaded via CDN)
- **Unsplash** — Placeholder project images (free, no attribution required for demos)
- **Pravatar.cc** — Placeholder avatar images for testimonials

> No npm packages or build tools required. Everything runs in the browser as-is.

---

© 2024 SVN Nexus Private Limited. All rights reserved.

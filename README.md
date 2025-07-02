# 🧑‍💻 Personal Portfolio

This is a simple and lightweight personal portfolio website built with **vanilla HTML, CSS, and JavaScript**. It features:

- Dynamically loaded sections (About, Projects, Contact, etc.)
- Multi-language support (English/Spanish)
- Particle animation background using `<canvas>`
- Mobile-friendly and responsive design
- Modular and organized project structure

---

## 🌐 Live Demo

> Coming soon (or replace with your deployed URL)

---

## 📁 Project Structure

```
/              → Root folder
├── index.html → Main HTML structure
├── /css/      → Styles (single global stylesheet)
├── /js/       → Scripts: routing, i18n, particles, etc.
├── /lang/     → Language files (.json)
├── /sections/ → HTML fragments loaded dynamically
├── /images/   → Assets (icons, particles, etc.)
└── .gitignore, LICENSE, README.md
```

---

## 🚀 Setup

No build tools or dependencies required.

Just clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

Open in browser:
```
file:///full/path/to/index.html
```

Or use a local server (recommended for AJAX):
```bash
npx serve .
```

---

## 🧩 Features

- **Dynamic Sections**: Navigation loads content without full page reload (via `fetch`).
- **Internationalization (i18n)**: Uses JSON language files with automatic browser language detection and manual selector.
- **Canvas Background**: Animated PNG particles rendered in performant 2D context.
- **Fully Responsive**: Works on mobile, tablet, and desktop.
- **No frameworks**: Clean, minimal and fast.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✏️ Customize

You can update or replace the following:

- `lang/en.json` / `lang/es.json` — translations
- `sections/*.html` — content sections
- `images/particle.png` — your own particle design
- `styles.css` — colors, fonts, layout

---

## 📬 Contact

Feel free to fork or contribute, or reach out at:

- Website: [yourdomain.com](https://yourdomain.com)
- GitHub: [@yourusername](https://github.com/yourusername)

---

> Made with ❤️ in vanilla JavaScript.

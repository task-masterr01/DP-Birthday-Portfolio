# 🎂 Birthday Portfolio — Interactive Birthday Experience

A personalised, interactive birthday web experience built with React + Vite. Designed as a heartfelt digital gift — complete with animations, a letter board, a photo gallery, and ambient background music.

> 🌸 Built for someone special. Made with love.

---

## ✨ Features

- **🔐 Click Gate** — User must click 10 times to unlock the experience (with a progress bar)
- **🎂 Cake Page** — Interactive birthday cake with a candle-blowing wish mechanic
- **🖼️ Gallery** — Photo gallery of shared memories
- **💌 Cards** — Birthday wish cards with beautiful animations
- **📬 Write a Letter** — Visitors can write and submit personal letters
- **📋 Letter Board** — A board displaying all received letters (backed by Vercel KV)
- **🎵 Ambient Music** — Two background tracks that crossfade based on the current route
- **🎈 Canvas Effects** — Balloons and confetti animations on key moments
- **📱 Fully Responsive** — Works on mobile and desktop

---

## 🛣️ Routes

| Path | Page |
|---|---|
| `/` | Hero / Landing page |
| `/cake` | Birthday cake & wish page |
| `/gallery` | Photo gallery |
| `/cards` | Birthday cards |
| `/message` | Personal message page |
| `/write` | Write a letter form |
| `/letters` | Public letter board |

---

## 🧱 Tech Stack

| Tech | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **@vercel/kv** | Serverless key-value store for letters |
| **Vanilla CSS** | All styling (no Tailwind) |
| **HTML5 Canvas** | Balloons & confetti animations |
| **Vercel** | Deployment & hosting |

---

## 📁 Project Structure

```
birthday-portfolio/
├── api/                  # Vercel serverless API functions
├── public/               # Static assets (images, audio)
│   ├── birthday-piano.mp3
│   └── leberch-romantic-583353.mp3
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Landing page with click gate
│   │   ├── Cake.jsx          # Birthday cake page
│   │   ├── Gallery.jsx       # Photo gallery
│   │   ├── Cards.jsx         # Birthday cards
│   │   ├── Message.jsx       # Personal message
│   │   ├── WriteLetter.jsx   # Letter submission form
│   │   ├── LetterBoard.jsx   # Displays all letters
│   │   ├── CanvasEffects.jsx # Balloon & confetti canvas logic
│   │   ├── PageTransition.jsx# Route transition wrapper
│   │   └── HomeButton.jsx    # Reusable home navigation button
│   ├── App.jsx               # Root app, routing & audio crossfade
│   ├── index.css             # Main stylesheet
│   ├── letter.css            # Letter board styles
│   └── main.jsx              # Entry point
├── index.html
├── vercel.json               # Vercel SPA rewrite rules
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/task-masterr01/birthday-portfolio.git
cd birthday-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## ☁️ Deployment (Vercel)

This project is deployed on **Vercel** with the following setup:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no config changes needed
4. Add your `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables from your Vercel KV store for the letter board feature

The `vercel.json` includes an SPA rewrite rule so React Router works correctly on all routes.

---

## 🎵 Background Music

Two audio tracks are used:
- **Piano** (`birthday-piano.mp3`) — plays on `/` and `/cake`
- **Romantic** (`leberch-romantic-583353.mp3`) — plays on all other routes

Both tracks crossfade smoothly when navigating between routes.

---

## 📄 License

This project is personal and not licensed for redistribution. Built as a private birthday gift. ❤️

---

*Made with ❤️ by [task-masterr01](https://github.com/task-masterr01)*

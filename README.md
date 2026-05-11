# 🧠 Ultimate IQ Challenge – Fake IQ Test

> A fun, shareable, fake IQ test web app with a dreamy pink/purple aesthetic. Built for entertainment. Results are always "adorably low." 💕

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## ✨ Features

- 🎯 **100 question bank** — random 20 drawn each test
- 🧠 **Fake IQ scoring** — always 45–60 range (scientifically cute)
- 💫 **Dreamy UI** — pink pastel, glassmorphism, floating particles
- 🎉 **Confetti reveal** — satisfying result animation
- 📤 **Share feature** — native share or clipboard copy
- 📱 **Mobile-first** — fully responsive
- ⚡ **No database, no auth** — pure client-side

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

---

## 🗂️ Project Structure

```
iq-test-app/
├── app/
│   ├── globals.css        # Animated gradient background, glassmorphism
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx           # Main page (all 4 phases: landing/test/loading/result)
├── components/
│   ├── ui/
│   │   ├── Button.tsx     # Gradient button with glow animation
│   │   └── Card.tsx       # Glassmorphism card component
│   ├── FloatingParticles.tsx  # Animated emoji particles + blur blobs
│   ├── ProgressBar.tsx    # Shimmer progress bar + dot indicators
│   ├── QuestionCard.tsx   # Slide-animated question + options
│   ├── LoadingScreen.tsx  # Fake analysis loading (3–5s)
│   └── ResultCard.tsx     # IQ counter + confetti + share
├── data/
│   ├── questions.ts       # 100 mock IQ questions (6 categories)
│   └── loadingMessages.ts # Rotating fake analysis messages
├── hooks/
│   └── useTest.ts         # All test state management
├── types/
│   └── index.ts           # TypeScript types
└── utils/
    ├── calculateFakeIQ.ts  # Always returns IQ 45–60 😂
    └── getRandomQuestions.ts # Randomly selects 20 from 100
```

---

## 🎮 How It Works

1. **Landing** → Hero with animated background, stats, CTA
2. **Test** → 20 random questions, no right/wrong feedback shown
3. **Loading** → 4.5 second fake analysis with rotating messages
4. **Result** → IQ score (45–60), funny message, confetti, share

### Fake IQ Logic

```ts
calculateFakeIQ(correctAnswers: number): TestResult
// 0–5 correct  → IQ 45–49 ("Academically concerning...")
// 6–10 correct → IQ 50–54 ("Brain power: limited...")
// 11–15 correct → IQ 55–57 ("Scientifically cute...")
// 16–20 correct → IQ 58–60 ("You solve hearts...")
```

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
# Follow prompts → it auto-detects Next.js
```

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo → click **Deploy**
4. Done! 🎉 No environment variables needed.

### Option 3: Deploy Button
Click the deploy button at the top of this README.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 | React framework (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | latest | Animations |
| canvas-confetti | latest | Result confetti |

---

## 📱 Mobile Optimized

- Touch-friendly large tap targets
- `min-h-dvh` for correct mobile height
- `-webkit-tap-highlight-color: transparent`
- Responsive typography scaling

---

## 🎨 Design System

- **Colors**: Pink (`#f472b6`) → Rose → Purple (`#c084fc`) → Indigo (`#818cf8`)
- **Background**: Animated dark purple gradient `#0f0616`
- **Cards**: Glassmorphism with `backdrop-blur-xl`
- **Typography**: Plus Jakarta Sans + Outfit (Google Fonts)
- **Animations**: Framer Motion spring physics

---

*Made with 💕 for entertainment purposes only. IQ results are not scientifically valid.*

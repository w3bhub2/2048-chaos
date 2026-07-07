# 2048 Chaos

A premium, production-ready reimagining of the classic **2048** puzzle game. Built with a clean, maintainable React + TypeScript architecture and a modern black & gold glassmorphism design.

Join the numbers, reach **2048**, and keep chasing a higher score — on desktop, tablet, or mobile, with keyboard, mouse, or touch.

---

## Features

- **Classic 2048 mechanics** — slide, merge, and reach 2048.
- **Score & Best Score** — your best score persists in local storage.
- **Undo** — step back through your moves.
- **Restart** — start a fresh board instantly.
- **Win & Game Over screens** — with an option to keep playing past 2048.
- **Keyboard controls** — arrows or `WASD` (plus `Z` undo, `R` restart).
- **Touch & swipe gestures** — fully playable on phones and tablets.
- **Local storage** — the full game state resumes after a refresh.
- **Responsive layout** — adapts to portrait, landscape, and every screen size.
- **Smooth animations** — tile slides, merge pops, and score pulses via Framer Motion.
- **Accessibility** — semantic HTML, ARIA labels, live region, and visible focus states.
- **Embeddable** — the game is a single, dependency-light React component.

---

## Screenshots

| Board | Win screen |
| ----- | ---------- |
| [Screenshot coming soon] | [Screenshot coming soon] |

---

## Technology Stack

| Area | Choice |
| ---- | ------ |
| Framework | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite 7](https://vitejs.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| State | Local component state + custom hooks |
| Persistence | Local Storage |

---

## Installation

Requires **Node.js 18+**.

```bash
# Clone the repository
git clone https://github.com/w3bhub2/2048-chaos.git
cd 2048-chaos

# Install dependencies
npm install
```

---

## Development

Start the local development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Build

Create an optimized production build:

```bash
npm run build
```

The output is written to `dist/`. Thanks to the single-file build setup, `dist/index.html` is fully self-contained and ready to deploy.

Preview the production build locally:

```bash
npm run preview
```

---

## Linting & Formatting

Ensure code quality and consistency:

```bash
# Lint (with auto-fix)
npm run lint

# Format code
npm run format
```

ESLint and Prettier are configured with sensible defaults. See `eslint.config.js` and `.prettierrc.json`.

---

## Deployment

The project is deployable without any configuration changes.

### Netlify

1. Connect your GitHub repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

Netlify will automatically deploy on every push to your main branch.

### Vercel

1. Import the repository into Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

Vercel will handle the rest automatically.

### GitHub Pages

1. Set up a GitHub Actions workflow to build and deploy:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Enable GitHub Pages in your repository settings and set the source to `gh-pages` branch.

### Static Hosting

The `dist/index.html` is fully self-contained (thanks to `vite-plugin-singlefile`) and can be deployed to any static hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Firebase Hosting
- Or any HTTP server

---

## Project Structure

```
src/
├── components/      # Presentational + composite UI (Board, Tile, Header, …)
├── hooks/           # Encapsulated behavior (useGame2048, useKeyboard, useSwipe)
├── utils/           # Pure logic (game engine, storage, tile styles, cn)
├── types/           # Shared TypeScript types
├── constants/       # Game + design constants
├── App.tsx          # Root composition
├── main.tsx         # Entry point
└── index.css        # Tailwind + theme
```

### Embedding the game

`Game2048` is a self-contained component and can be dropped into any React application:

```tsx
import { Game2048 } from "@/components/Game2048";

export function Page() {
  return <Game2048 />;
}
```

---

## Performance

- Strongly typed, side-effect-free game engine.
- Animation handled by Framer Motion with short, GPU-friendly transitions.
- Minimal dependencies and no unnecessary re-renders.
- Targets Lighthouse **Performance 95+**, **Accessibility 100**, **Best Practices 100**, and **SEO 100**.

---

## Roadmap

- Adjustable board size and win target.
- Light / high-contrast themes.
- Optional sound effects.
- Global leaderboard.

---

## Contributing

Contributions are welcome!

1. Fork the repository and create a feature branch.
2. Run `npm run dev` and verify your change.
3. Run `npm run lint` to check for linting issues and auto-fix them.
4. Run `npm run format` to format your code.
5. Ensure `npm run build` succeeds.
6. Open a pull request with a clear description.

Please keep changes focused, typed, and tested where practical.

---

## License

Released under the [MIT License](./LICENSE).

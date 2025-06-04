# Frontend — Polissya Portal

This is the frontend app for the **Polissya** Minecraft portal — a surreal pastel UI built with React and Tailwind.

## 🧱 Tech Stack

- **React** (with Vite)
- **TypeScript** — strict typing throughout
- **TailwindCSS** — custom config with pastel Ukrainian-themed palette
- **TanStack React Query** — for data fetching
- **Axios** — custom API layer
- **Zustand** — for lightweight state management
- **Vercel** — CI/CD + deployments

## 📂 Project Structure

```
src/
├── features/        # Feature-based folders (e.g. user)
│   └── user/
│       ├── api/
│       ├── queries/
│       ├── hooks/
│       ├── ui/
│       └── store/
├── services/        # Shared utils (api client, env, storage)
├── components/      # Reusable UI atoms & molecules
├── routes/          # Route files for TanStack Router
└── styles/          # Tailwind config, themes
```

## 🎨 UI Style

- Clean and minimal
- All functions use `const fn = () => {}` style
- Export at the bottom of the file as a list
- Logic is extracted to hooks or service modules
- Design system colors: `moss`, `bark`, `coal`, `clay`, `river`, `paper`, `sun`, `ember`

## 🚀 Development

```bash
pnpm dev # starts Vite dev server
```

## 🧪 Environment Variables

Ensure you have the following in your `.env` file:

```
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000/api
```

Preview and Production values are managed via Vercel environment settings.

## 📦 Build

```bash
pnpm build
```

Builds the app for production with Vite.

---

This frontend connects to the backend API (`core/`) and provides the main user experience for players on the Polissya server.

# Core — Polissya Portal Backend

This is the backend app for the **Polissya** Minecraft portal, built with **Hono** running on **Bun**.

## ⚙️ Tech Stack

- **Bun** — ultra-fast JavaScript runtime
- **Hono** — lightweight web framework (Express-like)
- **Drizzle ORM** — type-safe SQL queries
- **SQLite** — file-based database (for now)
- **JWT** — for user authentication
- **Zod** — optional input validation
- **RCON** — integration with Minecraft server

## 📁 Project Structure

```
src/
├── routes/          # API routes (auth, profile, etc)
├── services/        # Business logic (use-case level)
├── db/              # Drizzle schema, DB instance
│   ├── schema.ts
│   ├── db.ts
│   └── user.ts
├── auth/            # Auth helpers (JWT, user from token)
└── utils/           # Misc helpers (optional)
```

## 📐 Code Style

- Typed with `@polissya/types`
- Functions declared as `const fn = () => {}`
- Named exports listed at the bottom of each file
- Side-effect-free modules when possible

## 🚀 Development

```bash
bun dev
```

## 🧪 Environment Variables

Create a `.env` file in the `core/` folder:

```
JWT_SECRET=your_secret_key
```

Additional secrets can be configured as needed (e.g., RCON credentials).

## 📦 Build

```bash
bun run build
```

Compiles and prepares the backend for deployment.

---

The backend exposes a REST API consumed by the `frontend/` app and integrates directly with the Minecraft server via RCON.

# Frontend

This project uses Vite for the frontend build. Several `.env` files specify the
`VITE_APP_ENV` variable to describe the current environment. Expected values are:

- `development` - used when running locally using `.env.example`.
- `preview` - used by preview deployments via `.env.preview`.
- `production` - used for production builds via `.env.production`.

Adjust other variables (API URLs, sockets, etc.) as required for each
environment.

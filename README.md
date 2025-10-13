# Login — Full‑stack Auth Demo (Next.js 15 + Express 5)

A small full example of authentication: a Next.js 15 (React 19) client and an Express 5 server with JWT in httpOnly cookie, CSRF protection and tests.

## Brief description

This repository is a ready example of a simple and secure authentication mechanism:

- Server: Node.js + Express (controllers, middleware, services), user storage in MongoDB (by default — in‑memory for local runs). MySQL support is possible as an alternative.
- Client: Next.js (React) with a set of basic, reusable UI components (buttons, inputs, forms, validation).
- Authentication: JWT in httpOnly cookie + CSRF (XSRF‑TOKEN), session lifetime — 30 minutes.
- Security: bcrypt for password hashing, Helmet, CORS, rate‑limit, server and client input validation.

## What's inside (key points)

- Client (client/):
  - app/ — pages (login, welcome).
  - src/components/ — basic reusable components (Input, Button, Form, Layout).
  - src/api/ — fetch helpers, CSRF logic, cookie handling.

- Server (server/):
  - app/ — application configuration, middleware wiring.
  - controllers/ — route handlers (auth, users).
  - services/ — user and token business logic.
  - middleware/ — validation, authentication, error‑handler, rate‑limit.
  - models/ — Mongoose models (User).

- Tests:
  - server/tests/ — Vitest + Supertest for main routes.
  - client/tests/ — unit tests for validators (Vitest).

## Approach and trade-offs

- Chosen: JWT in httpOnly cookie + CSRF for convenient browser auth without manual Authorization header management.
- Default in‑memory MongoDB simplifies local development and testing (no external dependency).
- Trade‑offs: focus on clarity and security for a demo, not full scaling for high loads.

---

## Quick start (local)

The project includes a script to automatically run client and server:
```bash
chmod +x ./start.sh
./start.sh
```
The script:
1) copies env templates to working `.env` files (if missing),
2) installs dependencies,
3) runs server and client (the client is built and started in prod mode).

Defaults:
- Server: http://localhost:4000
- Client: http://localhost:3000

### Manual run

1) Prepare env:
```bash
cp -n server/.env.example server/.env
cp -n client/.env.example client/.env.local
```

2) Install deps:
```bash
cd server && npm ci && cd -
cd client && npm ci && cd -
```

3) Start server (in a separate terminal):
```bash
cd server
npm run start
```

4) Start client (another terminal):
```bash
cd client
npm run build
npm start
```

For client development mode:
```bash
cd client
npm run dev
```

## API (short)

Base prefix: /api

- POST /api/auth/register — register: { name, email, password }
- POST /api/auth/login — login: { email, password } — sets httpOnly cookie accessToken; requires CSRF
- POST /api/auth/logout — logout — clears cookie; requires CSRF
- GET  /api/users/me — current user by JWT in cookie

CSRF: the server sets an XSRF-TOKEN cookie; the client reads and sends X-XSRF-TOKEN in POST requests.

Session: JWT lifetime is 30 minutes; after expiry the user must re-authenticate.

---

## Security and validation

- Passwords are stored only hashed (bcrypt).
- Validation on the client (email format, password) and on the server (duplicate checks).
- CSRF protection (csurf + XSRF‑TOKEN), Helmet, rate limiting, CORS configuration.

---

## Tests

- Server tests:
```bash
cd server
npm test
npm run test
```

- Client tests:
```bash
cd client
npm test
```

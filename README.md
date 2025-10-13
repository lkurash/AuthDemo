# AuthDemo — Full‑stack

A small full example of authentication: a Next.js 15 (React 19) client and an Express 5 server with JWT in httpOnly cookie, CSRF protection and tests.

## Brief description

This repository is a ready example of a simple and secure authentication mechanism:

- Server: Node.js + Express (controllers, middleware, services), user storage in MongoDB (by default — in‑memory for local runs). MySQL support is possible as an alternative.
- Client: Next.js (React) with a set of basic, reusable UI components (buttons, inputs, forms, validation).
- Authentication: JWT in httpOnly cookie + CSRF (XSRF‑TOKEN), session lifetime — 30 minutes.
- Security: bcrypt for password hashing, Helmet, CORS, rate‑limit, server and client input validation.

## What's inside (key points)

# API (short)

Base prefix: /api

- POST /api/auth/register — register: { name, email, password }
- POST /api/auth/login — login: { email, password } — sets httpOnly cookie accessToken; requires CSRF
- POST /api/auth/logout — logout — clears cookie; requires CSRF
- GET  /api/users/me — current user by JWT in cookie

CSRF: the server sets an XSRF-TOKEN cookie; the client reads and sends X-XSRF-TOKEN in POST requests.

Session: JWT lifetime is 30 minutes; after expiry the user must re-authenticate.

---

# Security and validation

- Passwords are stored only hashed (bcrypt).
- Validation on the client (email format, password) and on the server (duplicate checks).
- CSRF protection (csurf + XSRF‑TOKEN), Helmet, rate limiting, CORS configuration.

---

# Approach and trade-offs

- Chosen: JWT in httpOnly cookie + CSRF for convenient browser auth without manual Authorization header management.
- Default in‑memory MongoDB simplifies local development and testing (no external dependency).

---

## Quick start (local)

The project includes a script to automatically run client and server:
```bash
chmod +x ./start.sh
./start.sh
```

Defaults:
- Server: http://localhost:4000
- Client: http://localhost:3000

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

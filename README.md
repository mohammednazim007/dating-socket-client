<img width="1392" height="633" alt="messenger" src="https://github.com/user-attachments/assets/0c41b179-ab0d-460e-bbe6-a691454242c9" />

# Real‑Time Dating App

A modern, production‑ready chat application built with Next.js 15. It delivers real-time messaging with presence, notifications, and a responsive, Messenger-like UI. Authentication, session refresh, and protected routing are included. The app consumes a backend API and connects to a Socket.IO server for live updates.

## Overview

This project provides a full chat experience similar to Facebook Messenger:

- Sign up, sign in, and secure session management
- Real‑time one‑to‑one messaging with typing indicators and online status
- Notification center with unread counts and mark‑as‑read actions
- Friend discovery and requests (send, accept, reject, cancel)
- Friend list filter (online, all)
- Message history loading and pagination
- Responsive layout optimized for desktop and mobile
- Clean state management with Redux Toolkit + RTK Query
- API‑driven data access with automatic token refresh

## Features

- Authentication: register, login, logout, OTP verification, password reset
- Protected routes via Next.js middleware and cookie‑based sessions
- Real‑time messaging using Socket.IO client
- Presence: online users list and typing indicators
- Notifications: unread badge, read single/all
- Friends: non‑friend list, requests, accepted friends
- Message history loading and UX polish (emoji picker, debounced inputs)
- Accessible, responsive UI with Tailwind CSS

## Tech Stack

- 🔹 Framework: `Next.js 15` (App Router, Turbopack)
- 🔹 UI: `React 19`, `Tailwind CSS 4`
- 🔹 Real‑time: `socket.io-client`
- 🔹 State: `Redux Toolkit`, `RTK Query`, `redux-persist`
- 🔹 Forms & Validation: `react-hook-form`, `Formik`, `Yup`, `Zod`, `emoji-mart`
- 🔹 HTTP: `Axios` with interceptors and refresh logic
- 🔹 Tooling: `TypeScript 5`, `ESLint 9`

Path alias: `@/*` → `src/*` (see `tsconfig.json`).

## Prerequisites

- 🔹 Node.js 18+
- 🔹 A package manager: `pnpm` (recommended) or `npm`
- 🔹 Running backend REST API and Socket.IO server

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-org/frontend-socket-io.git
cd frontend-socket-io
```

2. Install dependencies

```bash
pnpm install
# or
npm install
```

3. Configure environment

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_BACKEND_URL= http://localhost:4000
NEXT_PUBLIC_SOCKET_URL= ws://localhost:4000
```

4. Run the app in development

```bash
pnpm dev
# http://localhost:3000
```

5. Build and start for production

```bash
pnpm build
pnpm start
```

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Configure `.env.local` as above

3. Start the dev server

```bash
pnpm dev
```

4. Open `http://localhost:3000`

## Scripts

- 🔹 `pnpm dev` → start development server (Turbopack)
- 🔹 `pnpm build` → production build
- 🔹 `pnpm start` → start production server
- 🔹 `pnpm lint` → run ESLint with Next.js config

<!-- Project Structure section removed per request -->

## Authentication

- 🔹 Middleware enforces protected routes via cookie tokens (`src/middleware.ts:1`).
- 🔹 Auth API and automatic refresh handled via RTK Query base query (`src/app/redux/base-query/baseQueryWithReauth.ts`).
- 🔹 Forms use `react-hook-form` or `Formik` with `Zod`/`Yup` schemas (`src/app/lib/schemas/authSchemas.ts`).

## Real‑Time & Sockets

- 🔹 Socket client lives in `src/app/socket-io/socket-io.ts:1` with `connectSocket`, `getSocket`, `disconnectSocket`.
- 🔹 Notifications hook emits `read_all_notifications` and handles unread count (`src/app/hooks/useNotificationSocket.ts:61`).
- 🔹 Additional hooks: `useChatSocket.ts`, `useTypingIndicator.ts` for messaging and presence.

## State Management

- 🔹 Central store configured under `src/app/redux/store.ts`.
- 🔹 Features include auth API, friend APIs/slices, and message/user slices.
- 🔹 Persisted state via `redux-persist` where appropriate.

## Build & Deploy

```bash
pnpm build
pnpm start
```

- 🔹 Deploy behind HTTPS and ensure cookies are scoped correctly for your domain.

## Troubleshooting

- 🔹 Blank screen: confirm `.env.local` values and that backend/socket servers are running.
- 🔹 Socket not connecting: verify `NEXT_PUBLIC_SOCKET_URL` and network access; check `transports: ["websocket"]` in the client (`src/app/socket-io/socket-io.ts`).
- 🔹 Redirect loops: inspect cookies (`accessToken`) and middleware matcher (`src/middleware.ts`).
- 🔹 Type or lint issues: run `pnpm lint` and review ESLint output.

## License

MIT (or as defined by the repository owner).

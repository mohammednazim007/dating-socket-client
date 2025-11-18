<img width="1392" height="633" alt="messenger" src="https://github.com/user-attachments/assets/0c41b179-ab0d-460e-bbe6-a691454242c9" />

## Real‑Time Dating App

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

- Framework: `Next.js 15` (App Router, Turbopack)
- UI: `React 19`, `Tailwind CSS 4`
- Real‑time: `socket.io-client`
- State: `Redux Toolkit`, `RTK Query`, `redux-persist`
- Forms & Validation: `react-hook-form`, `Formik`, `Yup`, `Zod`, `emoji-mart`
- HTTP: `Axios` with interceptors and refresh logic
- Tooling: `TypeScript 5`, `ESLint 9`

Path alias: `@/*` maps to `src/*`.

## Environment Variables

Create a `.env.local` file in the project root with:

```bash
# Backend REST API base URL (e.g., http://localhost:4000)
NEXT_PUBLIC_BACKEND_URL=

# Socket.IO server URL (e.g., ws://localhost:4000)
NEXT_PUBLIC_SOCKET_URL=
```

## Installation

```bash
# Install dependencies
pnpm install

# Copy and edit environment variables
cp .env.example .env.local   # if you keep an example file
# Otherwise create .env.local and add variables listed above
```

## Run Locally

```bash
# Start the dev server (Turbopack)
pnpm dev

# Open the app
# http://localhost:3000
```

- Ensure your backend API is running and reachable via `NEXT_PUBLIC_BACKEND_URL`.
- Ensure your Socket.IO server is running at `NEXT_PUBLIC_SOCKET_URL`.

## Build and Start

```bash
# Production build
pnpm run build

# Start production server
pnpm start
```

## API & Sockets

- REST endpoints are consumed from the backend (e.g., `/user/*`, `/friend/*`).
- Automatic token refresh is handled by the API client and RTK Query base query.
- Socket events provide messages, online users, and notifications.

## Screenshots

Add screenshots under `public/screenshots/` and reference them here:

## Notes

- Cookie‑based auth is enforced via middleware for protected routes.
- Audio cues for actions are located under `public/audio/`.
- The UI is designed to be responsive and accessible.

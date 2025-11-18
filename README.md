<img width="1392" height="633" alt="messenger" src="https://github.com/user-attachments/assets/0c41b179-ab0d-460e-bbe6-a691454242c9" />

# 💖 Real-Time Dating App Client (Frontend)

A modern, production-ready, real-time chat client built with Next.js 15. This application delivers a polished, Messenger-like user experience, focusing on instant message delivery, real-time presence, secure session management, and a highly responsive UI.

This repository contains the full frontend code, designed to consume data from a separate Node.js/Express backend API and connect directly to its dedicated Socket.IO server.

---

## Overview

- Authentication: Sign up, sign in, logout, OTP verification, password reset
- Protected routes with cookie-based sessions and middleware
- Real-time one-to-one chat using Socket.IO
- Presence indicators: online users, typing notifications
- Notifications: unread badge, mark single/all as read
- Friend system: discovery, requests (send/accept/reject/cancel), lists and filters
- Message history loading, emoji support, debounced inputs
- Fully responsive and accessible UI using Tailwind CSS

---

## Key Features (Client)

- 🔒 **Secure Sessions:** Protected routing with cookie-based session management
- 📡 **Real-Time Communication:** Instant messaging, live typing indicators, online status detection via Socket.IO
- 🔔 **Notification Center:** Real-time push notifications with unread badges and mark-as-read functionality
- 📈 **Data Management:** Clean state management with Redux Toolkit + RTK Query, automatic token refresh
- 🎨 **Responsive UI:** Optimized for desktop and mobile, fully styled with Tailwind CSS
- 📜 **History Loading:** Smooth message history loading and pagination
- 🤝 **Friend System:** Discovery, sending, accepting, rejecting, and canceling friend requests

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4
- **Real-Time:** socket.io-client
- **State:** Redux Toolkit, RTK Query, redux-persist
- **Forms & Validation:** react-hook-form, Formik, Yup, Zod, emoji-mart
- **HTTP:** Axios with interceptors and refresh logic
- **Tooling:** TypeScript 5, ESLint 9

Path alias: `@/*` → `src/*` (see `tsconfig.json`)

---

## Prerequisites

- Node.js 18+
- Package manager: `pnpm` (recommended) or `npm`
- Running backend REST API and Socket.IO server

---

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
# Backend REST API base URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

# Socket.IO server URL
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

## Usage

```bash
pnpm dev
# open http://localhost:3000
```

Ensure your backend is reachable via `NEXT_PUBLIC_BACKEND_URL` and your Socket.IO server via `NEXT_PUBLIC_SOCKET_URL`.

## Scripts

🔹 `pnpm dev` → start development server (Turbopack)
🔹 `pnpm build` → production build
🔹 `pnpm start` → start production server
🔹 `pnpm lint` → run ESLint with Next.js config

## Authentication

🔹 Middleware enforces protected routes via cookie tokens (`src/middleware.ts:1`).
🔹 Auth API and automatic refresh handled via RTK Query base query (`src/app/redux/base-query/baseQueryWithReauth.ts`).
🔹 Forms use `react-hook-form` or `Formik` with `Zod`/`Yup` schemas (`src/app/lib/schemas/authSchemas.ts`).

Flow

🔹 Sign up (`src/app/(router)/auth/signup/page.tsx:1`)
🔹 Verify OTP (`src/app/(router)/auth/verify-otp/page.tsx:1`, `src/app/components/ui/VerifyOTP.tsx:1`)
🔹 Sign in (`src/app/(router)/auth/signin/page.tsx:1`)
🔹 Reset/change password (`src/app/(router)/auth/reset-password/page.tsx:1`, `src/app/(router)/auth/change-password/page.tsx:1`)

## Real‑Time & Sockets

🔹 Socket client lives in `src/app/socket-io/socket-io.ts:1` with `connectSocket`, `getSocket`, `disconnectSocket`.
🔹 Notifications: listens `all_notifications`, emits `read_single_notification`, `read_all_notifications` (`src/app/hooks/useNotificationSocket.ts:1`, `src/app/hooks/useNotificationSocket.ts:61`).
🔹 Chat: listens `new_message`, `get_online_users` (`src/app/hooks/useChatSocket.ts:1`).
🔹 Typing: emits `typing`, `stop_typing` (`src/app/components/ui/InputArea.tsx:55`), listens `user_typing`, `user_stop_typing` (`src/app/hooks/useTypingIndicator.ts:1`).

## State Management

🔹 Central store configured under `src/app/redux/store.ts`.
🔹 Features include auth API, friend APIs/slices, and message/user slices.
🔹 Persisted state via `redux-persist` where appropriate.

Messaging

🔹 Fetch history via `fetchChatHistory` (`src/app/utility/fetchChatHistory.ts:1`).
🔹 Send text/media via `sendMessage` (`src/app/utility/sendMessage.ts:1`).

## Build & Deploy

```bash
pnpm build
pnpm start
```

Deploy behind HTTPS and ensure cookies are scoped correctly for your domain.

🔹 Set env vars for your production endpoints.

## Troubleshooting

🔹 Blank screen: confirm `.env.local` values and that backend/socket servers are running.
🔹 Socket not connecting: verify `NEXT_PUBLIC_SOCKET_URL` and network access; check `transports: ["websocket"]` in the client (`src/app/socket-io/socket-io.ts`).
🔹 Redirect loops: inspect cookies (`accessToken`) and middleware matcher (`src/middleware.ts`).
🔹 Type or lint issues: run `pnpm lint` and review ESLint output.

## License

MIT (or as defined by the repository owner).

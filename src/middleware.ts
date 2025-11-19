// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes (accessible without login)
const publicPaths: string[] = [
  "/auth/signin",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/verify-otp",
  "/auth/change-password",
];

function isPublicPath(path: string): boolean {
  return publicPaths.some((p) => path === p || path.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  // If user not logged in and tries private route → redirect to signin
  if (!isPublicPath(pathname) && !token) {
    const signinUrl = new URL("/auth/signin", req.url);

    // Only add redirect param if it’s not already inside /auth
    if (!pathname.startsWith("/auth")) {
      signinUrl.searchParams.set("redirect", pathname);
    }

    return NextResponse.redirect(signinUrl);
  }

  // If logged in and tries to access signin/signup → redirect to dashboard
  if (token && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware everywhere except for _next, api, static files
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};

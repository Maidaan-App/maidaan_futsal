import { auth } from "@/auth";
import { paths } from "./lib/paths";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;
  // console.log("LoggedIn User", user)
  const authRoutes = [
    "/login",
    "/signup",
    "/error",
    // "/forgotpassword",
    // "/resetpassword",
  ];
  const protectedRoutes = ["/admin"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(paths.admin.dashboard);

  const DEFAULT_ADMIN_REDIRECT = paths.admin.dashboard;
  const DEFAULT_REDIRECT = "/";

  const getRedirectUrl = (role: string) => {
    switch (role) {
      case "admin":
        return DEFAULT_ADMIN_REDIRECT;
      default:
        return DEFAULT_REDIRECT;
    }
  };

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(getRedirectUrl(user?.role), nextUrl));
    }
    return;
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
    if (user?.role === "admin" && !isAdminRoute) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
  }
  return;
});
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

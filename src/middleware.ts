// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { getServerSession, User } from "next-auth";
// import { authOptions } from "./app/api/auth/[...nextauth]/options";
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/",
//     "/dashboard/:path*", // every path after dashboard is projected
//     "/verify/:path*",
//   ],
// };

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   // const session = await getServerSession(authOptions);
//   // const user: User = session?.user as User;

//   // console.log("This is middleware session ", session);

//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   console.log("This is Token ", token);
//   console.log("This is url ", url);

//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/verify") ||
//       url.pathname === "/")
//     // url.pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
//   //   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more

// --------------------------------------//

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });
  const url = request.nextUrl;

  // console.log("This is Token: ", token);
  // console.log("This is URL: ", url);

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
    // || url.pathname === "/"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

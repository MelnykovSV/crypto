// // import type { NextAuthConfig } from "next-auth";
// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnCoins = nextUrl.pathname.startsWith("/coins");
//       if (isOnCoins) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/coins", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } ;



// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
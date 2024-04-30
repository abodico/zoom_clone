// `createRouteMatcher` will allow us to match specific routes which we want to make public or private
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
const protectedRoutes = createRouteMatcher([
    "/",
    "/upcoming",
    "/previous",
    "/recordings",
    "personal-room",
    // this `(.*)` will match all the meeting routes
    "/meetings(.*)",
])
export default clerkMiddleware((auth, req) => {
    if (protectedRoutes(req)) auth().protect()
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

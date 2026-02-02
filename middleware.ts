
import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Only confirm authentication for protected paths
            // Getting the path from req.nextUrl
            const path = req.nextUrl.pathname

            // If user is accessing dashboard, they must have a token
            if (path.startsWith("/dashboard")) {
                return !!token
            }
            return true
        },
    },
})

export const config = {
    matcher: ["/dashboard/:path*"]
}

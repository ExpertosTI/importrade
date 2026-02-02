import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation"
import ProfileClient from "./profile-client"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/auth/login")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) {
        redirect("/auth/login")
    }

    return <ProfileClient user={user} />
}

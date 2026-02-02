import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        const orders = await prisma.order.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error("[ORDERS_GET]", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

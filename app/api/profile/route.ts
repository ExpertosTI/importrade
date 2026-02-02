import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { updateUserSchema } from "@/src/application/validation/schemas"
import { ZodError } from "zod"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                companyName: true,
                rnc: true,
                address: true,
                role: true,
                image: true,
                createdAt: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("[PROFILE_GET]", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    try {
        const body = await req.json()
        
        // Validar con Zod
        const validatedData = updateUserSchema.parse(body)

        // Construir dirección si hay campos separados
        let address = validatedData.address
        if (body.city || body.province) {
            const parts = [body.address, body.city, body.province].filter(Boolean)
            address = parts.join(", ")
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: validatedData.name,
                phoneNumber: validatedData.phoneNumber,
                companyName: validatedData.companyName,
                rnc: validatedData.rnc || null,
                address,
                role: validatedData.role,
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ 
                error: "Datos inválidos", 
                details: error.issues 
            }, { status: 400 })
        }
        
        console.error("[PROFILE_UPDATE]", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

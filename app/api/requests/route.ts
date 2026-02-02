import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { productRequestService } from "@/src/application/services"
import { createProductRequestSchema } from "@/src/application/validation/schemas"
import { ZodError } from "zod"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    try {
        const body = await req.json()
        
        // Validar entrada con Zod
        const validatedData = createProductRequestSchema.parse({
            ...body,
            quantity: Number(body.quantity),
            budget: body.budget ? Number(body.budget) : undefined,
        })

        // Obtener usuario
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Crear solicitud usando el servicio
        const newRequest = await productRequestService.create(user.id, validatedData)

        return NextResponse.json(newRequest)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ 
                error: "Datos inválidos", 
                details: error.issues 
            }, { status: 400 })
        }
        
        console.error("[REQUEST_CREATE]", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

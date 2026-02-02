import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { calculatorService } from "@/src/application/services"
import { calculatorInputSchema } from "@/src/application/validation/schemas"
import { ZodError } from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        
        // Validar entrada
        const validatedData = calculatorInputSchema.parse(body)
        
        // Calcular usando el servicio
        const result = calculatorService.calculate(validatedData)
        
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ 
                error: "Datos inválidos", 
                details: error.issues 
            }, { status: 400 })
        }
        
        console.error("[CALCULATOR]", error)
        return NextResponse.json({ error: "Error de cálculo" }, { status: 500 })
    }
}

export async function GET() {
    // Devuelve la configuración actual de tasas
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
        itbisRate: 0.18,
        defaultTariffRate: 0.20,
        serviceFeePercent: 0.05,
        minServiceFee: 50,
        authenticated: !!session,
    })
}

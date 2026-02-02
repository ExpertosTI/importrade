/**
 * NextAuth API Route Handler
 * Configuración importada desde lib/auth.ts para evitar duplicación
 */

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Re-export authOptions para compatibilidad con imports existentes
export { authOptions }

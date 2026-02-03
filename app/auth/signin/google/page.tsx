"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"

export default function GoogleSignInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
    const error = searchParams.get("error")

    if (error) {
      // Si hay error, cerrar popup y notificar a la ventana padre
      window.opener?.postMessage("google-auth-error", "*")
      window.close()
      return
    }

    // Verificar si ya hay sesión (después del redirect de Google)
    const checkSession = async () => {
      try {
        const session = await getSession()
        if (session) {
          // Éxito: notificar a ventana padre y cerrar popup
          window.opener?.postMessage("google-auth-success", "*")
          window.close()
        } else {
          // Si no hay sesión, iniciar flujo de OAuth
          window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
        }
      } catch (err) {
        // Error: notificar y cerrar
        window.opener?.postMessage("google-auth-error", "*")
        window.close()
      }
    }

    checkSession()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Conectando con Google...</p>
      </div>
    </div>
  )
}

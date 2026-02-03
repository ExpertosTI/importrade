
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowRight, AlertCircle, Globe } from "lucide-react"
import { APP_CONFIG } from "@/lib/config"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(event.currentTarget)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Error al registrarse")
            }

            // Success
            router.push("/auth/login?registered=true")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        setIsLoading(true)
        signIn("google", { callbackUrl: "/dashboard" })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md border-slate-200 bg-white shadow-xl relative z-10">
                <CardHeader className="text-center space-y-2">
                    {/* LOGO */}
                    <div className="flex justify-center mb-4">
                        <Link href="/" className="flex items-center justify-center">
                            <Image
                                src="/logo.svg"
                                alt="ImporTrade Logo"
                                width={180}
                                height={60}
                                className="h-16 w-auto cursor-pointer"
                                priority
                            />
                        </Link>
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Crear Cuenta</CardTitle>
                    <CardDescription className="text-slate-500">
                        Únete a {APP_CONFIG.name} y comienza a importar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700">Nombre Completo</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Juan Pérez"
                                className="bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">Correo Electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ejemplo@email.com"
                                className="bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold shadow-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Registrarse
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">O continúa con</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-50"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500">
                        ¿Ya tienes una cuenta? <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">Inicia Sesión</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

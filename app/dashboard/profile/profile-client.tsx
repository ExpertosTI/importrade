"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, User, Building2, MapPin, Loader2 } from "lucide-react"

interface ProfileClientProps {
    user: any // Type this properly if possible
}

export default function ProfileClient({ user }: ProfileClientProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Helper to parse address back if needed, or just use raw strings
    // Assuming address stored as "Street, City, Province"
    const [addressPart, cityPart, provincePart] = (user.address || ",,").split(",").map((s: string) => s.trim())

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get("name"),
            phoneNumber: formData.get("phoneNumber"),
            companyName: formData.get("companyName"),
            rnc: formData.get("rnc"),
            address: formData.get("address"),
            city: formData.get("city"),
            province: formData.get("province"),
        }

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Failed to update profile")

            router.refresh()
            // Could add Toast here
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Guardar Cambios
                </Button>
            </div>

            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-slate-900 border border-slate-800">
                    <TabsTrigger value="personal" className="data-[state=active]:bg-slate-800">
                        <User className="w-4 h-4 mr-2" />
                        Personal
                    </TabsTrigger>
                    <TabsTrigger value="company" className="data-[state=active]:bg-slate-800">
                        <Building2 className="w-4 h-4 mr-2" />
                        Empresa / PYME
                    </TabsTrigger>
                    <TabsTrigger value="shipping" className="data-[state=active]:bg-slate-800">
                        <MapPin className="w-4 h-4 mr-2" />
                        Dirección de Envío
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-white">Información Personal</CardTitle>
                            <CardDescription className="text-slate-400">Tus datos principales de contacto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Nombre Completo</Label>
                                    <Input name="name" className="bg-slate-950 border-slate-700 text-white" defaultValue={user.name || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Correo Electrónico</Label>
                                    <Input className="bg-slate-950 border-slate-700 text-white" defaultValue={user.email || ""} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Teléfono</Label>
                                    <Input name="phoneNumber" className="bg-slate-950 border-slate-700 text-white" placeholder="+1 (809) 000-0000" defaultValue={user.phoneNumber || ""} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="company" className="mt-6">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-white">Datos de la Empresa</CardTitle>
                            <CardDescription className="text-slate-400">Si eres una PYME, completa estos datos para facturación fiscal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Nombre de la Empresa</Label>
                                    <Input name="companyName" className="bg-slate-950 border-slate-700 text-white" placeholder="Mi Empresa S.R.L." defaultValue={user.companyName || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">RNC / Identificación Fiscal</Label>
                                    <Input name="rnc" className="bg-slate-950 border-slate-700 text-white" placeholder="101-00000-1" defaultValue={user.rnc || ""} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shipping" className="mt-6">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-white">Dirección de Entrega</CardTitle>
                            <CardDescription className="text-slate-400">¿Dónde quieres recibir tus importaciones?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Dirección</Label>
                                <Input name="address" className="bg-slate-950 border-slate-700 text-white" placeholder="Calle Principal #123" defaultValue={addressPart || ""} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Ciudad</Label>
                                    <Input name="city" className="bg-slate-950 border-slate-700 text-white" placeholder="Santo Domingo" defaultValue={cityPart || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Sector / Provincia</Label>
                                    <Input name="province" className="bg-slate-950 border-slate-700 text-white" placeholder="Distrito Nacional" defaultValue={provincePart || ""} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    )
}

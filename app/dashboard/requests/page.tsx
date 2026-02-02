"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PackageSearch, Link as LinkIcon, Upload, Plus, X, Loader2 } from "lucide-react"

export default function RequestProductPage() {
    const router = useRouter()
    const [links, setLinks] = useState<string[]>([""])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addLinkField = () => setLinks([...links, ""])
    const removeLinkField = (index: number) => {
        const newLinks = [...links]
        newLinks.splice(index, 1)
        setLinks(newLinks)
    }
    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...links]
        newLinks[index] = value
        setLinks(newLinks)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const data = {
            productName: formData.get("productName"),
            category: formData.get("category"), // Note: Select requires controlled state or hidden input usually, but we'll extract from Select value if needed OR assume native select behavior if Shadcn Select mimics it. Actually Shadcn Select doesn't inject into form data by default easily without a hidden input.
            // Let's implement controlled inputs for Selects to be safe, or just grab values from specific state.
            // For speed/simplicity: I'll assume users select, but Shadcn Select needs the `name` prop to work with FormData? Yes, if configured.
            // If `name` prop isn't supported on Shadcn SelectTrigger, we need state.
            // Let's use State for Selects to be safe.
            description: formData.get("description"),
            quantity: formData.get("quantity"),
            quality: formData.get("quality"), // Need state
            budget: formData.get("budget"),
            referenceLinks: links.filter(l => l.trim() !== "")
        }

        // We need to capture the Select values manually since Shadcn Select doesn't always play nice with FormData out of the box without 'name' prop on hidden field.
        // Let's rely on the form having the inputs if we added 'name' prop? Shadcn docs say: "add a hidden input".
        // I'll add states for category and quality now.
    }

    // Refactored Component with State for Selects
    // To avoid complexity in this tool call, I will rewrite the whole component below cleanly.
    return <RequestForm />
}

function RequestForm() {
    const router = useRouter()
    const [category, setCategory] = useState("")
    const [quality, setQuality] = useState("")
    const [links, setLinks] = useState<string[]>([""])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addLinkField = () => setLinks([...links, ""])
    const removeLinkField = (index: number) => {
        const newLinks = [...links]
        newLinks.splice(index, 1)
        setLinks(newLinks)
    }
    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...links]
        newLinks[index] = value
        setLinks(newLinks)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const payload = {
            productName: formData.get("productName"),
            category,
            description: formData.get("description"),
            quantity: formData.get("quantity"),
            quality,
            budget: formData.get("budget"),
            referenceLinks: links.filter(l => l.trim() !== "")
        }

        try {
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Error sending request")

            // Success
            router.push("/dashboard/orders") // Or stay here? Orders page is "Mis Importaciones", requests turn into orders later.
            // Maybe redirect to a "Success" or just clear. 
            // Better: Redirect to dashboard with success param or just alert.
            alert("¡Solicitud Enviada! Nuestros agentes comenzarán la búsqueda.")
            router.push("/dashboard/orders")
        } catch (err) {
            console.error(err)
            alert("Hubo un error al enviar la solicitud.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Solicitar Producto</h1>
                    <p className="text-slate-400">Describe lo que buscas y nuestros expertos en China lo encontrarán por ti.</p>
                </div>
            </div>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <PackageSearch className="w-5 h-5 mr-2 text-blue-500" />
                        Detalles del Producto
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Nombre del Producto</Label>
                                <Input name="productName" placeholder="Ej. Audífonos Bluetooth Inalámbricos" className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600" required />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Categoría</Label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="electronics">Electrónica</SelectItem>
                                        <SelectItem value="clothing">Ropa y Textiles</SelectItem>
                                        <SelectItem value="home">Hogar y Jardín</SelectItem>
                                        <SelectItem value="machinery">Maquinaria Industrial</SelectItem>
                                        <SelectItem value="other">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-300">Descripción Detallada</Label>
                            <Textarea
                                name="description"
                                placeholder="Especificaciones técnicas, materiales, colores, tallas, uso previsto..."
                                className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Cantidad Deseada</Label>
                                <Input name="quantity" type="number" placeholder="100" className="bg-slate-950 border-slate-700 text-white" required />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Calidad</Label>
                                <Select value={quality} onValueChange={setQuality} required>
                                    <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                                        <SelectValue placeholder="Estándar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="basic">Económica / Promocional</SelectItem>
                                        <SelectItem value="standard">Estándar (Buena relación precio/calidad)</SelectItem>
                                        <SelectItem value="premium">Premium / Alta Gana</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Presupuesto Objetivo (USD/Unidad)</Label>
                                <Input name="budget" type="number" placeholder="Opcional" className="bg-slate-950 border-slate-700 text-white" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-slate-300">Enlaces de Referencia (Alibaba, Amazon, etc.)</Label>
                            {links.map((link, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                        <Input
                                            className="pl-9 bg-slate-950 border-slate-700 text-white"
                                            placeholder="https://..."
                                            value={link}
                                            onChange={(e) => handleLinkChange(index, e.target.value)}
                                        />
                                    </div>
                                    {links.length > 1 && (
                                        <Button type="button" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-slate-800" onClick={() => removeLinkField(index)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" className="text-blue-400 border-dashed border-slate-700 hover:bg-slate-800" onClick={addLinkField}>
                                <Plus className="w-4 h-4 mr-2" />
                                Agregar otro enlace
                            </Button>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 text-lg shadow-lg shadow-blue-900/20" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <PackageSearch className="w-6 h-6 mr-2" />}
                            Enviar Solicitud de Cotización
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

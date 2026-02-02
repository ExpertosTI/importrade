
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, ExternalLink } from "lucide-react"
import { APP_CONFIG } from "@/lib/config"

const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, necesito ayuda con mi importación desde China.")
    const phone = APP_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
}

const openEmail = () => {
    const subject = encodeURIComponent("Consulta sobre importación - Renace")
    const body = encodeURIComponent("Hola equipo Renace,\n\nTengo una consulta sobre...")
    window.open(`mailto:${APP_CONFIG.contact.email}?subject=${subject}&body=${body}`, "_blank")
}

const openCalendly = () => {
    window.open("https://calendly.com/renace-importaciones/asesoria", "_blank")
}

export default function SupportPage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">Centro de Ayuda</h1>
                <p className="text-slate-400 text-lg">¿Tienes dudas sobre cómo importar? Estamos aquí para guiarte en cada paso.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500 transition-colors group">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500 text-green-500 group-hover:text-white transition-colors">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold">Chat por WhatsApp</h3>
                        <p className="text-sm text-slate-400">Respuesta inmediata de lunes a viernes.</p>
                        <Button 
                            variant="outline" 
                            className="border-green-600 text-green-500 hover:bg-green-600 hover:text-white"
                            onClick={openWhatsApp}
                        >
                            Iniciar Chat
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500 transition-colors group">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 text-blue-500 group-hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold">Correo Electrónico</h3>
                        <p className="text-sm text-slate-400">Para consultas detalladas o documentos.</p>
                        <Button 
                            variant="outline" 
                            className="border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white"
                            onClick={openEmail}
                        >
                            Enviar Email
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500 transition-colors group">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 text-amber-500 group-hover:text-white transition-colors">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold">Asesoría Personalizada</h3>
                        <p className="text-sm text-slate-400">Agenda una llamada con un experto.</p>
                        <Button 
                            variant="outline" 
                            className="border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white"
                            onClick={openCalendly}
                        >
                            Agendar Cita
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-3xl mx-auto pt-8">
                <h2 className="text-2xl font-bold text-white mb-6">Preguntas Frecuentes (FAQ)</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-slate-800">
                        <AccordionTrigger className="text-slate-200 hover:text-blue-400">¿Cuál es el monto mínimo para importar?</AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                            No tenemos un mínimo estricto, pero recomendamos pedidos superiores a $500 USD para que los costos logísticos sean rentables.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-slate-800">
                        <AccordionTrigger className="text-slate-200 hover:text-blue-400">¿Cuánto tarda en llegar mi pedido?</AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                            Depende del método de envío. Aéreo: 7-10 días. Marítimo: 35-45 días. Te notificaremos en cada etapa.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-slate-800">
                        <AccordionTrigger className="text-slate-200 hover:text-blue-400">¿Qué impuestos debo pagar?</AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                            Generalmente pagarás el Arancel (0-20% según producto) y el ITBIS (18%). Nuestra calculadora te da un estimado exacto antes de comprar.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-slate-800">
                        <AccordionTrigger className="text-slate-200 hover:text-blue-400">¿Cómo garantizan la calidad del producto?</AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                            Trabajamos solo con proveedores verificados y ofrecemos servicio de inspección pre-embarque por un costo adicional mínimo para asegurar tu inversión.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

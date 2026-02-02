
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Truck, Package, Anchor, FileText } from "lucide-react"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    // Mock timeline
    const timeline = [
        { title: "Orden Confirmada", date: "15 Ene 2024", completed: true, icon: Check },
        { title: "Recibido en Almacén China", date: "20 Ene 2024", completed: true, icon: Package },
        { title: "Embarcado (Tránsito Internacional)", date: "25 Ene 2024", completed: true, icon: Anchor },
        { title: "Llegada a Aduana RD", date: "—", completed: false, icon: FileText },
        { title: "Liberado de Aduana", date: "—", completed: false, icon: Check },
        { title: "Entregado al Cliente", date: "—", completed: false, icon: Truck },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Detalles de Importación</h1>
                    <p className="text-slate-400">Orden # IMP-2024-045</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300">
                    Descargar Factura
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Timeline */}
                <Card className="md:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-white">Estado del Envío</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative border-l border-slate-700 ml-4 space-y-8 pb-4">
                            {timeline.map((step, index) => (
                                <div key={index} className="pl-8 relative group">
                                    {/* Dot */}
                                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-900 border-slate-600'
                                        }`} />

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className={`text-base font-medium ${step.completed ? 'text-white' : 'text-slate-500'}`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-slate-500">{step.date}</p>
                                        </div>
                                        <step.icon className={`w-5 h-5 ${step.completed ? 'text-blue-500' : 'text-slate-600'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase text-slate-500 tracking-wider">Documentos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="ghost" className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-slate-800 pl-0">
                                <FileText className="w-4 h-4 mr-2" />
                                Commercial Invoice.pdf
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-slate-800 pl-0">
                                <FileText className="w-4 h-4 mr-2" />
                                Bill of Lading (BL).pdf
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase text-slate-500 tracking-wider">Pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between py-2 border-b border-slate-800">
                                <span className="text-slate-300">Total Pagado</span>
                                <span className="text-white font-bold">$1,250.00</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-slate-300">Pendiente</span>
                                <span className="text-green-400 font-bold">$0.00</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

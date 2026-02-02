
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calculator, DollarSign, Info } from "lucide-react"
import { APP_CONFIG } from "@/lib/config"

export default function CalculatorPage() {
    // Inputs
    const [fobPrice, setFobPrice] = useState<number>(1000)
    const [freightCost, setFreightCost] = useState<number>(150)
    const [insuranceCost, setInsuranceCost] = useState<number>(25)
    const [tariffRate, setTariffRate] = useState<number>(20) // % Arancel (Gravamen)

    // Results
    const [cifValue, setCifValue] = useState(0)
    const [tariffAmount, setTariffAmount] = useState(0)
    const [itbisAmount, setItbisAmount] = useState(0)
    const [serviceFee, setServiceFee] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        calculate()
    }, [fobPrice, freightCost, insuranceCost, tariffRate])

    const calculate = () => {
        // 1. Calcular Valor CIF
        const cif = fobPrice + freightCost + insuranceCost
        setCifValue(cif)

        // 2. Calcular Gravamen (Arancel Ad Valorem)
        // Gravamen se aplica sobre el CIF
        const gravamen = cif * (tariffRate / 100)
        setTariffAmount(gravamen)

        // 3. Calcular ITBIS (18%)
        // ITBIS se aplica sobre (CIF + Gravamen)
        const baseItbis = cif + gravamen
        const itbis = baseItbis * 0.18
        setItbisAmount(itbis)

        // 4. Calcular Comisión de Servicio
        const fee = Math.max(APP_CONFIG.business.minServiceFee, fobPrice * APP_CONFIG.business.serviceFeePercent)
        setServiceFee(fee)

        // 5. Total
        setTotalCost(cif + gravamen + itbis + fee)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Calculadora de Importación</h1>
                    <p className="text-slate-400">Estima tus costos totales puestos en República Dominicana.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-white">Valores de la Carga</CardTitle>
                        <CardDescription>Ingresa los costos estimados de tu mercancía.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Valor FOB (Costo Productos en USD)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                <Input
                                    type="number"
                                    className="pl-9 bg-slate-950 border-slate-700 text-white"
                                    value={fobPrice}
                                    onChange={(e) => setFobPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Flete Estimado (USD)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="number"
                                        className="pl-9 bg-slate-950 border-slate-700 text-white"
                                        value={freightCost}
                                        onChange={(e) => setFreightCost(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Seguro (USD)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="number"
                                        className="pl-9 bg-slate-950 border-slate-700 text-white"
                                        value={insuranceCost}
                                        onChange={(e) => setInsuranceCost(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <div className="flex justify-between">
                                <Label className="text-slate-300">Tasa de Arancel (Gravamen)</Label>
                                <span className="text-amber-500 font-bold">{tariffRate}%</span>
                            </div>
                            <Slider
                                defaultValue={[20]}
                                max={40}
                                step={1}
                                value={[tariffRate]}
                                onValueChange={(vals) => setTariffRate(vals[0])}
                                className="py-4"
                            />
                            <p className="text-xs text-slate-500">
                                *Varía según el producto (Ej. Electrónica 0-20%, Ropa 20%, Vehículos varia).
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-2xl relative overflow-hidden">
                    {/* Decorative blob */}
                    <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[80px]" />

                    <CardHeader>
                        <CardTitle className="text-white flex items-center justify-between">
                            <span>Desglose de Costos</span>
                            <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded">Estimado</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                            <span className="text-slate-400">Valor CIF (Base Imponible)</span>
                            <span className="text-white font-mono font-bold">${cifValue.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Arancel (Gravamen {tariffRate}%)</span>
                                <span className="text-red-300 font-mono">+ ${tariffAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">ITBIS (18%)</span>
                                <span className="text-red-300 font-mono">+ ${itbisAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Comisión {APP_CONFIG.name}</span>
                                <span className="text-amber-500 font-mono">+ ${serviceFee.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800 mt-4">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-slate-300">Costo Total</span>
                                <span className="text-4xl font-bold text-green-400 tracking-tight">${totalCost.toFixed(2)}</span>
                            </div>
                            <p className="text-right text-xs text-slate-500 mt-2">Incluye mercancía, logística e impuestos RD.</p>
                        </div>

                        <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                            Guardar Cotización
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

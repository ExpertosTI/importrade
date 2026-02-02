"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Box, Scale, DollarSign, FileText, Globe, Search, Truck, Clock, AlertTriangle, CheckSquare, Container, Percent, Ship, Copy, Check, ExternalLink, ArrowLeftRight, TrendingUp } from "lucide-react"
import { APP_CONFIG } from "@/lib/config"
import { calculatorService } from "@/src/application/services"

export default function ToolsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Herramientas de Importación</h1>
                <p className="text-slate-500">14 utilidades vitales para gestionar tus operaciones logísticas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Calculadora CBM */}
                <ToolCard
                    icon={<Box className="w-5 h-5 text-blue-600" />}
                    title="Calculadora CBM"
                    desc="Calcula el volumen cúbico de tu carga."
                >
                    <CmbCalculator />
                </ToolCard>

                {/* 2. Estimador de Impuestos */}
                <ToolCard
                    icon={<Percent className="w-5 h-5 text-orange-600" />}
                    title="Estimador de Impuestos"
                    desc="Calcula aranceles e ITBIS estimados."
                >
                    <TaxEstimator />
                </ToolCard>

                {/* 3. Peso Volumétrico */}
                <ToolCard
                    icon={<Scale className="w-5 h-5 text-indigo-600" />}
                    title="Peso Volumétrico"
                    desc="Aéreo: Largo x Ancho x Alto / 6000."
                >
                    <VolumetricWeight />
                </ToolCard>

                {/* 4. Conversor de Divisas */}
                <ToolCard
                    icon={<DollarSign className="w-5 h-5 text-green-600" />}
                    title="Conversor RMB/USD"
                    desc="Tasa de cambio referencial China/USA."
                >
                    <CurrencyConverter />
                </ToolCard>

                {/* 5. Buscador HS Code */}
                <ToolCard
                    icon={<Search className="w-5 h-5 text-slate-600" />}
                    title="Buscador HS Code"
                    desc="Clasificación arancelaria rápida."
                >
                    <HsCodeSearch />
                </ToolCard>

                {/* 6. Guía Incoterms */}
                <ToolCard
                    icon={<Globe className="w-5 h-5 text-teal-600" />}
                    title="Guía Incoterms 2024"
                    desc="EXW, FOB, CIF, DDP explicados."
                >
                    <IncotermsGuide />
                </ToolCard>

                {/* 7. Capacidad Contenedor */}
                <ToolCard
                    icon={<Container className="w-5 h-5 text-blue-800" />}
                    title="Capacidad Contenedor"
                    desc="Verifica si tu carga cabe en un 20' o 40'HC."
                >
                    <ContainerLoad />
                </ToolCard>

                {/* 8. Verificador Proveedor */}
                <ToolCard
                    icon={<CheckSquare className="w-5 h-5 text-emerald-600" />}
                    title="Checklist Proveedor"
                    desc="Puntos clave para validar fábricas chinas."
                >
                    <SupplierChecklist />
                </ToolCard>

                {/* 9. Calculadora Margen */}
                <ToolCard
                    icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
                    title="Margen de Ganancia"
                    desc="Costo Landed vs Precio Venta."
                >
                    <MarginCalculator />
                </ToolCard>

                {/* 10. Generador de Plantillas */}
                <ToolCard
                    icon={<FileText className="w-5 h-5 text-yellow-600" />}
                    title="Plantillas Mensajes"
                    desc="Contacta proveedores en Inglés/Chino."
                >
                    <MessageTemplates />
                </ToolCard>

                {/* 11. Conversor Unidades */}
                <ToolCard
                    icon={<ArrowLeftRight className="w-5 h-5 text-purple-600" />}
                    title="Conversor Unidades"
                    desc="Kg a Lb, CBM a CBF, cm a inch."
                >
                    <UnitConverter />
                </ToolCard>

                {/* 12. Tiempo de Tránsito */}
                <ToolCard
                    icon={<Clock className="w-5 h-5 text-red-500" />}
                    title="Tiempo de Tránsito"
                    desc="Estimado China -> RD (Barco/Avión)."
                >
                    <TransitTime />
                </ToolCard>

                {/* 13. Artículos Restringidos */}
                <ToolCard
                    icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
                    title="Artículos Restringidos"
                    desc="Verifica mercancía prohibida en Aduanas."
                >
                    <RestrictedItems />
                </ToolCard>

                {/* 14. Costo Landed Total */}
                <ToolCard
                    icon={<Ship className="w-5 h-5 text-blue-900" />}
                    title="Costo Landed Total"
                    desc="Suma: FOB + Flete + Seguro + Impuestos."
                >
                    <LandedCostSimple />
                </ToolCard>
            </div>
        </div>
    )
}

function ToolCard({ icon, title, desc, children }: { icon: any, title: string, desc: string, children: React.ReactNode }) {
    return (
        <Card className="hover:shadow-lg transition-shadow border-slate-200">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
                    <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
                </div>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

// --- Tool Components Implementation (Simplified for UI Demo) ---

function CmbCalculator() {
    const [result, setResult] = useState<number | null>(null)
    const calculate = (e: any) => {
        e.preventDefault()
        const l = Number(e.target.l.value) / 100 // cm to m
        const w = Number(e.target.w.value) / 100
        const h = Number(e.target.h.value) / 100
        const q = Number(e.target.q.value)
        setResult(l * w * h * q)
    }
    return (
        <form onSubmit={calculate} className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
                <Input name="l" placeholder="L (cm)" type="number" step="0.1" required className="h-8 text-xs" />
                <Input name="w" placeholder="W (cm)" type="number" step="0.1" required className="h-8 text-xs" />
                <Input name="h" placeholder="H (cm)" type="number" step="0.1" required className="h-8 text-xs" />
            </div>
            <Input name="q" placeholder="Cantidad" type="number" className="h-8 text-xs" required />
            <Button size="sm" type="submit" className="w-full h-8 bg-blue-600 hover:bg-blue-500">Calcular</Button>
            {result !== null && <div className="text-center font-bold text-green-600 text-sm mt-2">{result.toFixed(3)} m³</div>}
        </form>
    )
}

function TaxEstimator() {
    const [cif, setCif] = useState<number>(0)
    const [tariffRate, setTariffRate] = useState<number>(20)
    const [result, setResult] = useState<{ arancel: number; itbis: number; total: number } | null>(null)

    const calc = (e: React.FormEvent) => {
        e.preventDefault()
        if (cif > 0) {
            setResult(calculatorService.estimateTaxes(cif, tariffRate))
        }
    }

    return (
        <form onSubmit={calc} className="space-y-2">
            <Input 
                type="number" 
                value={cif || ''}
                onChange={(e) => setCif(Number(e.target.value))}
                placeholder="Valor CIF (USD)" 
                className="h-8 text-xs" 
            />
            <div className="flex items-center gap-2">
                <Input 
                    type="number" 
                    value={tariffRate}
                    onChange={(e) => setTariffRate(Number(e.target.value))}
                    className="h-8 text-xs w-16" 
                />
                <span className="text-xs text-slate-500">% Arancel</span>
            </div>
            <Button size="sm" type="submit" className="w-full h-8 bg-orange-600 hover:bg-orange-500">Estimar Impuestos</Button>
            {result && (
                <div className="text-xs space-y-1 bg-orange-50 p-2 rounded">
                    <div className="flex justify-between"><span>Arancel ({tariffRate}%):</span><span className="font-mono">${result.arancel.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>ITBIS (18%):</span><span className="font-mono">${result.itbis.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-orange-700 border-t pt-1"><span>TOTAL:</span><span>${result.total.toFixed(2)}</span></div>
                </div>
            )}
        </form>
    )
}

function VolumetricWeight() {
    const [dims, setDims] = useState({ l: 0, w: 0, h: 0 })
    const [method, setMethod] = useState<'air' | 'express' | 'sea'>('air')

    const volWeight = dims.l && dims.w && dims.h 
        ? calculatorService.calculateVolumetricWeight(dims.l, dims.w, dims.h, method)
        : 0

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1">
                <Input type="number" placeholder="L cm" className="h-8 text-xs" onChange={(e) => setDims(d => ({...d, l: Number(e.target.value)}))} />
                <Input type="number" placeholder="W cm" className="h-8 text-xs" onChange={(e) => setDims(d => ({...d, w: Number(e.target.value)}))} />
                <Input type="number" placeholder="H cm" className="h-8 text-xs" onChange={(e) => setDims(d => ({...d, h: Number(e.target.value)}))} />
            </div>
            <Select value={method} onValueChange={(v) => setMethod(v as 'air' | 'express' | 'sea')}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="air">Aéreo (÷6000)</SelectItem>
                    <SelectItem value="express">Express (÷5000)</SelectItem>
                    <SelectItem value="sea">Marítimo (1CBM=1000kg)</SelectItem>
                </SelectContent>
            </Select>
            {volWeight > 0 && (
                <div className="text-center bg-indigo-50 p-2 rounded">
                    <span className="text-xs text-slate-600">Peso Volumétrico: </span>
                    <span className="font-bold text-indigo-600">{volWeight.toFixed(2)} kg</span>
                </div>
            )}
        </div>
    )
}

function CurrencyConverter() {
    const [amount, setAmount] = useState<number>(100)
    const [rates, setRates] = useState({ CNY: 7.25, DOP: 60.50 })
    const [loading, setLoading] = useState(false)

    const fetchRates = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
            if (res.ok) {
                const data = await res.json()
                setRates({ 
                    CNY: data.rates.CNY || 7.25, 
                    DOP: data.rates.DOP || 60.50 
                })
            }
        } catch {
            // Usar tasas por defecto
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchRates() }, [fetchRates])

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>1 USD = {rates.CNY.toFixed(2)} CNY</span>
                <span>1 USD = {rates.DOP.toFixed(2)} DOP</span>
            </div>
            <Input 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                placeholder="Monto en USD" 
                type="number" 
                className="h-8 text-xs" 
            />
            <div className="grid grid-cols-2 gap-2 text-xs text-center font-mono bg-slate-100 p-2 rounded">
                <div className="text-orange-600 font-bold">¥ {(amount * rates.CNY).toFixed(2)}</div>
                <div className="text-green-600 font-bold">RD$ {(amount * rates.DOP).toFixed(2)}</div>
            </div>
            <button 
                onClick={fetchRates} 
                disabled={loading}
                className="text-[10px] text-blue-500 hover:underline w-full text-center"
            >
                {loading ? 'Actualizando...' : '↻ Actualizar tasas'}
            </button>
        </div>
    )
}

function HsCodeSearch() {
    const [query, setQuery] = useState('')
    
    const searchDGA = () => {
        if (query.trim()) {
            const encoded = encodeURIComponent(query)
            window.open(`https://www.aduanas.gob.do/consultas/arancel/?q=${encoded}`, '_blank')
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchDGA()}
                    placeholder="Ej: Zapatos, 6403" 
                    className="h-8 text-xs" 
                />
                <Button size="sm" className="h-8 w-8 p-0" onClick={searchDGA}>
                    <Search className="w-4 h-4" />
                </Button>
            </div>
            <p className="text-[10px] text-slate-500">Busca en el arancel de Aduanas RD (DGA).</p>
        </div>
    )
}

function IncotermsGuide() {
    return (
        <Select>
            <SelectTrigger className="h-8 text-xs w-full">
                <SelectValue placeholder="Seleccionar Término" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="exw">EXW - En Fábrica</SelectItem>
                <SelectItem value="fob">FOB - Franco a Bordo</SelectItem>
                <SelectItem value="cif">CIF - Costo, Seguro, Flete</SelectItem>
                <SelectItem value="ddp">DDP - Entregado Derechos Pagados</SelectItem>
            </SelectContent>
        </Select>
    )
}

function ContainerLoad() {
    return (
        <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                <span>20' GP</span>
                <span className="font-bold">~28 cbm / 10 paléts</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                <span>40' GP</span>
                <span className="font-bold">~58 cbm / 20 paléts</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                <span>40' HC</span>
                <span className="font-bold">~68 cbm / 20 paléts</span>
            </div>
        </div>
    )
}

function SupplierChecklist() {
    return (
        <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2"><input type="checkbox" /> <span>Licencia de Negocios (Business License)</span></div>
            <div className="flex items-center gap-2"><input type="checkbox" /> <span>Cuenta Bancaria Corporativa</span></div>
            <div className="flex items-center gap-2"><input type="checkbox" /> <span>Certificados ISO/CE</span></div>
            <div className="flex items-center gap-2"><input type="checkbox" /> <span>Video Call / Auditoría</span></div>
        </div>
    )
}

function MarginCalculator() {
    const [cost, setCost] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [result, setResult] = useState<{ margin: number; percentage: number } | null>(null)

    const calculate = (e: React.FormEvent) => {
        e.preventDefault()
        if (cost > 0 && price > 0) {
            setResult(calculatorService.calculateMargin(cost, price))
        }
    }

    return (
        <form onSubmit={calculate} className="space-y-2">
            <Input 
                type="number" 
                value={cost || ''}
                onChange={(e) => setCost(Number(e.target.value))}
                placeholder="Costo Landed (RD$)" 
                className="h-8 text-xs" 
            />
            <Input 
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Precio Venta (RD$)" 
                className="h-8 text-xs" 
            />
            <Button size="sm" type="submit" variant="outline" className="w-full h-8 text-xs">Calcular Margen</Button>
            {result && (
                <div className="text-center text-xs space-y-1 bg-slate-50 p-2 rounded">
                    <div className="font-bold text-green-600">Ganancia: RD$ {result.margin.toFixed(2)}</div>
                    <div className="text-slate-600">Margen: {result.percentage.toFixed(1)}%</div>
                </div>
            )}
        </form>
    )
}

function MessageTemplates() {
    const [copied, setCopied] = useState<string | null>(null)

    const templates = {
        catalog: "Dear Sir/Madam,\n\nI am interested in your products. Could you please send me your latest catalog with FOB prices?\n\nBest regards",
        rfq: "Dear Sales Team,\n\nI would like to request a quotation for:\n- Product: [PRODUCT NAME]\n- Quantity: [QTY]\n- Destination Port: Santo Domingo, Dominican Republic\n\nPlease include FOB price and lead time.\n\nThank you",
        moq: "Hello,\n\nI am interested in ordering your product but your MOQ is too high for my first order. Would you accept a trial order of [LOWER QTY] units?\n\nI plan to place larger orders in the future if quality is good.\n\nThank you",
        sample: "Dear Supplier,\n\nBefore placing a bulk order, I would like to receive samples of your product.\n\nPlease confirm:\n1. Sample cost\n2. Shipping cost to Dominican Republic\n3. Delivery time\n\nThank you"
    }

    const copyTemplate = (key: keyof typeof templates) => {
        navigator.clipboard.writeText(templates[key])
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => copyTemplate('catalog')}>
                {copied === 'catalog' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Catálogo
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => copyTemplate('rfq')}>
                {copied === 'rfq' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Cotización
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => copyTemplate('moq')}>
                {copied === 'moq' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Negociar MOQ
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => copyTemplate('sample')}>
                {copied === 'sample' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Muestra
            </Button>
        </div>
    )
}

function UnitConverter() {
    const [value, setValue] = useState<number>(1)
    const [unit, setUnit] = useState('kg_lb')

    const conversions: Record<string, { from: string; to: string; factor: number }> = {
        kg_lb: { from: 'kg', to: 'lb', factor: 2.20462 },
        lb_kg: { from: 'lb', to: 'kg', factor: 0.453592 },
        cm_in: { from: 'cm', to: 'in', factor: 0.393701 },
        in_cm: { from: 'in', to: 'cm', factor: 2.54 },
        m_ft: { from: 'm', to: 'ft', factor: 3.28084 },
        ft_m: { from: 'ft', to: 'm', factor: 0.3048 },
        cbm_cbf: { from: 'm³', to: 'ft³', factor: 35.3147 },
    }

    const conv = conversions[unit]
    const result = value * conv.factor

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Input 
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value) || 0)}
                    className="h-8 text-xs" 
                />
                <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="kg_lb">Kg → Lb</SelectItem>
                        <SelectItem value="lb_kg">Lb → Kg</SelectItem>
                        <SelectItem value="cm_in">Cm → In</SelectItem>
                        <SelectItem value="in_cm">In → Cm</SelectItem>
                        <SelectItem value="m_ft">M → Ft</SelectItem>
                        <SelectItem value="ft_m">Ft → M</SelectItem>
                        <SelectItem value="cbm_cbf">m³ → ft³</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="text-center bg-slate-100 p-2 rounded text-xs font-mono">
                <span className="text-slate-600">{value} {conv.from}</span>
                <span className="text-slate-400 mx-2">=</span>
                <span className="text-blue-600 font-bold">{result.toFixed(2)} {conv.to}</span>
            </div>
        </div>
    )
}

function TransitTime() {
    return (
        <div className="text-xs space-y-2">
            <div className="flex justify-between">
                <span>✈️ Aéreo Express</span>
                <span className="font-bold">3-7 días</span>
            </div>
            <div className="flex justify-between">
                <span>✈️ Aéreo Económico</span>
                <span className="font-bold">10-15 días</span>
            </div>
            <div className="flex justify-between">
                <span>🚢 Marítimo</span>
                <span className="font-bold">35-50 días</span>
            </div>
        </div>
    )
}

function RestrictedItems() {
    return (
        <div className="text-[10px] text-red-600 font-medium space-y-1">
            <p>🚫 Armas / Réplicas</p>
            <p>🚫 Dinero en efectivo</p>
            <p>🚫 Material inflamable</p>
            <p>⚠️ Baterías (Requieren MSDS)</p>
            <p>⚠️ Líquidos (Requieren manejo especial)</p>
        </div>
    )
}

function LandedCostSimple() {
    const [fob, setFob] = useState<number>(0)
    const [freight, setFreight] = useState<number>(0)
    const [insurance, setInsurance] = useState<number>(0)
    const [result, setResult] = useState<ReturnType<typeof calculatorService.calculate> | null>(null)

    const calculate = (e: React.FormEvent) => {
        e.preventDefault()
        if (fob > 0) {
            setResult(calculatorService.calculate({
                fobPrice: fob,
                freightCost: freight,
                insuranceCost: insurance,
                tariffRate: 20
            }))
        }
    }

    return (
        <form onSubmit={calculate} className="space-y-2">
            <Input type="number" value={fob || ''} onChange={(e) => setFob(Number(e.target.value))} placeholder="FOB (USD)" className="h-8 text-xs" />
            <div className="grid grid-cols-2 gap-2">
                <Input type="number" value={freight || ''} onChange={(e) => setFreight(Number(e.target.value))} placeholder="Flete" className="h-8 text-xs" />
                <Input type="number" value={insurance || ''} onChange={(e) => setInsurance(Number(e.target.value))} placeholder="Seguro" className="h-8 text-xs" />
            </div>
            <Button size="sm" type="submit" className="w-full h-8 bg-blue-900 hover:bg-blue-800">Calcular Total</Button>
            {result && (
                <div className="text-xs space-y-1 bg-slate-50 p-2 rounded">
                    <div className="flex justify-between"><span>CIF:</span><span className="font-mono">${result.cifValue.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Impuestos:</span><span className="font-mono text-red-600">+${(result.tariffAmount + result.itbisAmount).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Comisión:</span><span className="font-mono text-amber-600">+${result.serviceFee.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold border-t pt-1"><span>TOTAL:</span><span className="text-green-600">${result.totalCost.toFixed(2)}</span></div>
                </div>
            )}
        </form>
    )
}

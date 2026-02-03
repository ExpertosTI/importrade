
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Container, Ship, ShieldCheck, TrendingDown, Package, Globe } from "lucide-react"
import { APP_CONFIG } from "@/lib/config"
import { LogoGlow } from "@/components/brand"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100">

      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <LogoGlow size="md" withGlow={false} />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600 hover:text-blue-900 hover:bg-slate-100 font-medium text-sm sm:text-base px-3 sm:px-4">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md shadow-orange-200 transition-all hover:scale-105 text-sm sm:text-base px-3 sm:px-4">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Text Content */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6 lg:space-y-8 z-10 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs sm:text-sm font-semibold">
                <Ship className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> Logística para Emprendedores
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Tu Puerta a las <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  Importaciones
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Gestionamos tus compras en China, transporte y aduanas.
                Tú te ocupas de vender, nosotros de traerlo a República Dominicana.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-blue-900 hover:bg-blue-800 text-white shadow-xl shadow-blue-900/10">
                    Comenzar Ahora <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 bg-white">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-8 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 text-slate-400 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> 
                  <span className="hidden sm:inline">Compra Segura</span>
                  <span className="sm:hidden">Seguro</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /> 
                  <span>Rastreo 24/7</span>
                </div>
              </div>
            </div>

            {/* Abstract Visual / Decorative */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
              <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                {/* Mockup Card */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-sm text-slate-500">Estado del Pedido</p>
                      <p className="font-bold text-slate-900">#IM-2024-8892</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      EN TRÁNSITO
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Ship className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Saliendo de Shenzhen</p>
                        <p className="text-xs text-slate-500">Viernes 26 Ene, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="w-0.5 h-6 bg-slate-100 ml-5" />
                    <div className="flex items-center gap-4 opacity-50">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <TrendingDown className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Llegada a Caucedo</p>
                        <p className="text-xs text-slate-500">Estimado: 15 Feb</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Ship className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Logística Integral</h3>
              <p className="text-slate-600">Coordinamos contenedores consolidados y carga aérea. Tu mercancía siempre monitoreada.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Calculadora Real</h3>
              <p className="text-slate-600">Sin sorpresas. Calcula impuestos y fletes antes de comprar con nuestra herramienta exclusiva.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Verificación China</h3>
              <p className="text-slate-600">Agentes locales en China validan que tu proveedor sea real y la carga sea correcta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {APP_CONFIG.name}. Transformando la logística en RD.</p>
        </div>
      </footer>
    </div>
  )
}

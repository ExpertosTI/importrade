
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/app/lib/prisma"
import OnboardingGuard from "./components/OnboardingGuard"
import LogoutButton from "./components/LogoutButton"
import {
    LayoutDashboard,
    PackageSearch,
    Calculator,
    Ship,
    UserCircle,
    MessageCircle,
    Wrench
} from "lucide-react"
import { APP_CONFIG } from "@/lib/config"
import { LogoGlow } from "@/components/brand"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/auth/login")
    }

    // Surgical Check: Fetch latest user data to verify profile completeness
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! }
    })

    // Define what "Complete" means (e.g., must have Phone Number)
    const isProfileComplete = !!(user?.phoneNumber)

    return (
        <OnboardingGuard isProfileComplete={isProfileComplete}>
            <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
                {/* Mobile Header */}
                <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center space-x-2">
                        <LogoGlow size="sm" withGlow={true} />
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {APP_CONFIG.name}
                        </span>
                    </div>
                    <Link href="/dashboard/profile">
                        <UserCircle className="w-6 h-6 text-slate-400" />
                    </Link>
                </div>

                {/* Desktop Sidebar */}
                <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
                    <div className="p-6 flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <LogoGlow size="md" withGlow={true} />
                            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{APP_CONFIG.name}</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        <NavLink href="/dashboard" icon={<LayoutDashboard />} label="Inicio" />
                        <NavLink href="/dashboard/requests" icon={<PackageSearch />} label="Solicitar Producto" />
                        <NavLink href="/dashboard/calculator" icon={<Calculator />} label="Calculadora" />
                        <NavLink href="/dashboard/orders" icon={<Ship />} label="Mis Importaciones" />
                        <NavLink href="/dashboard/profile" icon={<UserCircle />} label="Mi Perfil" />
                        <NavLink href="/dashboard/tools" icon={<Wrench />} label="Herramientas" />
                        <NavLink href="/dashboard/support" icon={<MessageCircle />} label="Ayuda y Soporte" />
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <LogoutButton />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50 px-4 py-2 flex justify-between items-center safe-area-bottom">
                    <MobileNavLink href="/dashboard" icon={<LayoutDashboard />} label="Inicio" />
                    <MobileNavLink href="/dashboard/requests" icon={<PackageSearch />} label="Solicitar" />
                    <div className="relative -top-5">
                        <Link href="/dashboard/calculator" className="flex items-center justify-center w-14 h-14 bg-amber-500 text-slate-900 rounded-full shadow-lg shadow-amber-500/20">
                            <Calculator className="w-6 h-6" />
                        </Link>
                    </div>
                    <MobileNavLink href="/dashboard/orders" icon={<Ship />} label="Importaciones" />
                    <MobileNavLink href="/dashboard/profile" icon={<UserCircle />} label="Perfil" />
                </div>
            </div>
        </OnboardingGuard>
    )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link href={href} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
            <span className="group-hover:text-blue-400 transition-colors">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    )
}

function MobileNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link href={href} className="flex flex-col items-center justify-center space-y-1 text-slate-400 active:text-blue-500">
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    )
}

"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({ callbackUrl: "/auth/login" })
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-red-400 w-full px-4 py-2 rounded-lg transition-colors"
        >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
        </button>
    )
}

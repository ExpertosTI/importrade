"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"


export default function OnboardingGuard({
    isProfileComplete,
    children
}: {
    isProfileComplete: boolean
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    // const { toast } = useToast() 

    useEffect(() => {
        if (!isProfileComplete && !pathname.startsWith("/dashboard/profile")) {
            // Prevent infinite loops and enforce profile
            router.replace("/dashboard/profile?alert=incomplete")
        }
    }, [isProfileComplete, pathname, router])

    return <>{children}</>
}

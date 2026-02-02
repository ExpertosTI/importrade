"use client"

import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500">Cargando...</p>
      </div>
    </div>
  )
}

export function ButtonLoader({ text = "Procesando..." }: { text?: string }) {
  return (
    <>
      <Loader2 className="w-4 h-4 animate-spin mr-2" />
      {text}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 max-w-lg">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  )
}

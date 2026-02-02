/**
 * Helper para respuestas de API estandarizadas
 */

import { NextResponse } from "next/server"
import { ZodError } from "zod"

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  details?: unknown
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(error: string, status = 400, details?: unknown) {
  return NextResponse.json({ success: false, error, details }, { status })
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return errorResponse("Datos inválidos", 400, error.issues)
  }
  
  if (error instanceof Error) {
    console.error("[API_ERROR]", error.message)
    return errorResponse(error.message, 500)
  }
  
  console.error("[API_ERROR]", error)
  return errorResponse("Error interno del servidor", 500)
}

export function unauthorizedResponse() {
  return errorResponse("No autorizado", 401)
}

export function notFoundResponse(resource = "Recurso") {
  return errorResponse(`${resource} no encontrado`, 404)
}

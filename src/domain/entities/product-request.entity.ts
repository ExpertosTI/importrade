/**
 * Entidad de dominio: ProductRequest
 * Representa una solicitud de producto del usuario
 */

export type RequestStatus = 
  | "PENDING" 
  | "IN_REVIEW" 
  | "QUOTED" 
  | "APPROVED" 
  | "REJECTED"

export type QualityLevel = "basic" | "standard" | "premium"

export interface ProductRequest {
  id: string
  userId: string
  productName: string
  category: string | null
  description: string
  quantity: number
  quality: QualityLevel | null
  budget: number | null
  status: RequestStatus
  images: string[]
  referenceLinks: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductRequestDTO {
  productName: string
  category?: string
  description: string
  quantity: number
  quality?: QualityLevel
  budget?: number
  referenceLinks?: string[]
}

export interface UpdateProductRequestDTO {
  productName?: string
  category?: string
  description?: string
  quantity?: number
  quality?: QualityLevel
  budget?: number
  status?: RequestStatus
  referenceLinks?: string[]
}

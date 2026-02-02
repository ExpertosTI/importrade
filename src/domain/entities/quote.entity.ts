/**
 * Entidad de dominio: Quote
 * Representa una cotización para una solicitud de producto
 */

export interface Quote {
  id: string
  requestId: string
  productName: string
  unitPrice: number
  minOrderQuantity: number
  totalProductCost: number
  shippingCost: number | null
  insuranceCost: number | null
  customsFees: number | null
  serviceFee: number | null
  totalEstimatedCost: number
  currency: string
  supplierName: string | null
  notes: string | null
  validUntil: Date | null
  isSelected: boolean
  createdAt: Date
}

export interface CreateQuoteDTO {
  requestId: string
  productName: string
  unitPrice: number
  minOrderQuantity: number
  totalProductCost: number
  shippingCost?: number
  insuranceCost?: number
  customsFees?: number
  serviceFee?: number
  totalEstimatedCost: number
  currency?: string
  supplierName?: string
  notes?: string
  validUntil?: Date
}

export interface QuoteCalculation {
  fobPrice: number
  freightCost: number
  insuranceCost: number
  tariffRate: number
  cifValue: number
  tariffAmount: number
  itbisAmount: number
  serviceFee: number
  totalCost: number
}

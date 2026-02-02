/**
 * Entidad de dominio: Order
 * Representa un pedido/importación del usuario
 */

export type OrderStatus =
  | "CONFIRMED"
  | "PURCHASED_CHINA"
  | "WAREHOUSE_CHINA"
  | "IN_TRANSIT"
  | "CUSTOMS_RD"
  | "RELEASED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"

export interface Order {
  id: string
  userId: string
  quoteId: string | null
  details: string
  totalAmount: number
  status: OrderStatus
  trackingNumber: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrderDTO {
  quoteId?: string
  details: string
  totalAmount: number
}

export interface UpdateOrderDTO {
  status?: OrderStatus
  trackingNumber?: string
  details?: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: "Confirmado",
  PURCHASED_CHINA: "Comprado en China",
  WAREHOUSE_CHINA: "En Almacén China",
  IN_TRANSIT: "En Tránsito",
  CUSTOMS_RD: "En Aduanas RD",
  RELEASED: "Liberado",
  OUT_FOR_DELIVERY: "En Camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
}

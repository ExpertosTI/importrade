/**
 * Esquemas de validación con Zod
 * Validación de entrada para APIs y formularios
 */

import { z } from "zod"

// ==================== USER SCHEMAS ====================

export const createUserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["INDIVIDUAL", "PYME", "ADMIN"]).optional().default("INDIVIDUAL"),
})

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  companyName: z.string().optional(),
  rnc: z.string().regex(/^\d{9,11}$/, "RNC debe tener 9-11 dígitos").optional().or(z.literal("")),
  phoneNumber: z.string().min(10, "Teléfono debe tener al menos 10 dígitos").optional(),
  address: z.string().optional(),
  role: z.enum(["INDIVIDUAL", "PYME", "ADMIN"]).optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
})

// ==================== PRODUCT REQUEST SCHEMAS ====================

export const createProductRequestSchema = z.object({
  productName: z.string().min(3, "El nombre del producto debe tener al menos 3 caracteres"),
  category: z.enum(["electronics", "clothing", "home", "machinery", "other"]).optional(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  quantity: z.number().int().positive("La cantidad debe ser un número positivo"),
  quality: z.enum(["basic", "standard", "premium"]).optional(),
  budget: z.number().positive("El presupuesto debe ser positivo").optional(),
  referenceLinks: z.array(z.string().url("URL inválida")).optional().default([]),
})

export const updateProductRequestSchema = z.object({
  productName: z.string().min(3).optional(),
  category: z.enum(["electronics", "clothing", "home", "machinery", "other"]).optional(),
  description: z.string().min(10).optional(),
  quantity: z.number().int().positive().optional(),
  quality: z.enum(["basic", "standard", "premium"]).optional(),
  budget: z.number().positive().optional(),
  status: z.enum(["PENDING", "IN_REVIEW", "QUOTED", "APPROVED", "REJECTED"]).optional(),
  referenceLinks: z.array(z.string().url()).optional(),
})

// ==================== ORDER SCHEMAS ====================

export const createOrderSchema = z.object({
  quoteId: z.string().cuid().optional(),
  details: z.string().min(1, "Los detalles son requeridos"),
  totalAmount: z.number().positive("El monto debe ser positivo"),
})

export const updateOrderSchema = z.object({
  status: z.enum([
    "CONFIRMED",
    "PURCHASED_CHINA",
    "WAREHOUSE_CHINA",
    "IN_TRANSIT",
    "CUSTOMS_RD",
    "RELEASED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED"
  ]).optional(),
  trackingNumber: z.string().optional(),
  details: z.string().optional(),
})

// ==================== CALCULATOR SCHEMAS ====================

export const calculatorInputSchema = z.object({
  fobPrice: z.number().positive("El precio FOB debe ser positivo"),
  freightCost: z.number().nonnegative("El flete no puede ser negativo"),
  insuranceCost: z.number().nonnegative("El seguro no puede ser negativo"),
  tariffRate: z.number().min(0).max(100, "La tasa debe estar entre 0 y 100"),
})

// ==================== TYPES ====================

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateProductRequestInput = z.infer<typeof createProductRequestSchema>
export type UpdateProductRequestInput = z.infer<typeof updateProductRequestSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type CalculatorInput = z.infer<typeof calculatorInputSchema>

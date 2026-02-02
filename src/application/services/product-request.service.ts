/**
 * Servicio de aplicación: ProductRequest
 * Lógica de negocio para solicitudes de producto
 */

import { productRequestRepository } from "@/src/infrastructure/repositories"
import { createProductRequestSchema, updateProductRequestSchema } from "@/src/application/validation/schemas"
import type { CreateProductRequestInput, UpdateProductRequestInput } from "@/src/application/validation/schemas"
import type { ProductRequest, RequestStatus } from "@/src/domain/entities"

export class ProductRequestService {
  async create(userId: string, input: CreateProductRequestInput): Promise<ProductRequest> {
    // Validar entrada
    const validatedData = createProductRequestSchema.parse(input)
    
    // Crear solicitud
    return productRequestRepository.create(userId, {
      productName: validatedData.productName,
      category: validatedData.category,
      description: validatedData.description,
      quantity: validatedData.quantity,
      quality: validatedData.quality,
      budget: validatedData.budget,
      referenceLinks: validatedData.referenceLinks,
    })
  }

  async findById(id: string): Promise<ProductRequest | null> {
    return productRequestRepository.findById(id)
  }

  async findByUserId(userId: string): Promise<ProductRequest[]> {
    return productRequestRepository.findByUserId(userId)
  }

  async findByStatus(status: RequestStatus): Promise<ProductRequest[]> {
    return productRequestRepository.findByStatus(status)
  }

  async update(id: string, input: UpdateProductRequestInput): Promise<ProductRequest> {
    // Validar entrada
    const validatedData = updateProductRequestSchema.parse(input)
    
    return productRequestRepository.update(id, validatedData)
  }

  async delete(id: string): Promise<void> {
    return productRequestRepository.delete(id)
  }
}

export const productRequestService = new ProductRequestService()

/**
 * Implementación Prisma del repositorio de solicitudes de producto
 */

import { prisma } from "@/app/lib/prisma"
import { IProductRequestRepository } from "@/src/domain/repositories/product-request.repository"
import { 
  ProductRequest, 
  CreateProductRequestDTO, 
  UpdateProductRequestDTO,
  RequestStatus 
} from "@/src/domain/entities/product-request.entity"

export class PrismaProductRequestRepository implements IProductRequestRepository {
  async findById(id: string): Promise<ProductRequest | null> {
    const request = await prisma.productRequest.findUnique({
      where: { id }
    })
    return request as ProductRequest | null
  }

  async findByUserId(userId: string): Promise<ProductRequest[]> {
    const requests = await prisma.productRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })
    return requests as ProductRequest[]
  }

  async findByStatus(status: RequestStatus): Promise<ProductRequest[]> {
    const requests = await prisma.productRequest.findMany({
      where: { status },
      orderBy: { createdAt: "desc" }
    })
    return requests as ProductRequest[]
  }

  async create(userId: string, data: CreateProductRequestDTO): Promise<ProductRequest> {
    const request = await prisma.productRequest.create({
      data: {
        userId,
        productName: data.productName,
        category: data.category || null,
        description: data.description,
        quantity: data.quantity,
        quality: data.quality || null,
        budget: data.budget || null,
        referenceLinks: data.referenceLinks || [],
        status: "PENDING",
      }
    })
    return request as ProductRequest
  }

  async update(id: string, data: UpdateProductRequestDTO): Promise<ProductRequest> {
    const request = await prisma.productRequest.update({
      where: { id },
      data
    })
    return request as ProductRequest
  }

  async delete(id: string): Promise<void> {
    await prisma.productRequest.delete({
      where: { id }
    })
  }
}

export const productRequestRepository = new PrismaProductRequestRepository()

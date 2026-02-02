/**
 * Interfaz de repositorio: ProductRequest
 * Define el contrato para operaciones de persistencia de solicitudes
 */

import { 
  ProductRequest, 
  CreateProductRequestDTO, 
  UpdateProductRequestDTO,
  RequestStatus 
} from "../entities/product-request.entity"

export interface IProductRequestRepository {
  findById(id: string): Promise<ProductRequest | null>
  findByUserId(userId: string): Promise<ProductRequest[]>
  findByStatus(status: RequestStatus): Promise<ProductRequest[]>
  create(userId: string, data: CreateProductRequestDTO): Promise<ProductRequest>
  update(id: string, data: UpdateProductRequestDTO): Promise<ProductRequest>
  delete(id: string): Promise<void>
}

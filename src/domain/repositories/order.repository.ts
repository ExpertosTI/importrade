/**
 * Interfaz de repositorio: Order
 * Define el contrato para operaciones de persistencia de pedidos
 */

import { 
  Order, 
  CreateOrderDTO, 
  UpdateOrderDTO,
  OrderStatus 
} from "../entities/order.entity"

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>
  findByUserId(userId: string): Promise<Order[]>
  findByStatus(status: OrderStatus): Promise<Order[]>
  create(userId: string, data: CreateOrderDTO): Promise<Order>
  update(id: string, data: UpdateOrderDTO): Promise<Order>
  delete(id: string): Promise<void>
}

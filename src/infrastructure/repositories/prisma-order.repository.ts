/**
 * Implementación Prisma del repositorio de pedidos
 */

import { prisma } from "@/app/lib/prisma"
import { IOrderRepository } from "@/src/domain/repositories/order.repository"
import { 
  Order, 
  CreateOrderDTO, 
  UpdateOrderDTO,
  OrderStatus 
} from "@/src/domain/entities/order.entity"

export class PrismaOrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id }
    })
    if (!order) return null
    return {
      ...order,
      totalAmount: Number(order.totalAmount)
    } as Order
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })
    return orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount)
    })) as Order[]
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { status },
      orderBy: { createdAt: "desc" }
    })
    return orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount)
    })) as Order[]
  }

  async create(userId: string, data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        userId,
        quoteId: data.quoteId || null,
        details: data.details,
        totalAmount: data.totalAmount,
        status: "CONFIRMED",
      }
    })
    return {
      ...order,
      totalAmount: Number(order.totalAmount)
    } as Order
  }

  async update(id: string, data: UpdateOrderDTO): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data
    })
    return {
      ...order,
      totalAmount: Number(order.totalAmount)
    } as Order
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: { id }
    })
  }
}

export const orderRepository = new PrismaOrderRepository()

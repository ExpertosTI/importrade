/**
 * Implementación Prisma del repositorio de usuarios
 */

import { prisma } from "@/app/lib/prisma"
import { IUserRepository, CreateUserRepositoryDTO } from "@/src/domain/repositories/user.repository"
import { User, UpdateUserDTO } from "@/src/domain/entities/user.entity"

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user as User | null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user as User | null
  }

  async create(data: CreateUserRepositoryDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.hashedPassword,
        role: data.role || "INDIVIDUAL",
      }
    })
    return user as User
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data
    })
    return user as User
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    })
  }
}

export const userRepository = new PrismaUserRepository()

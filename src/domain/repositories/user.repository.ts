/**
 * Interfaz de repositorio: User
 * Define el contrato para operaciones de persistencia de usuarios
 */

import { User, CreateUserDTO, UpdateUserDTO } from "../entities/user.entity"

export interface CreateUserRepositoryDTO {
  name: string
  email: string
  hashedPassword: string
  role?: "INDIVIDUAL" | "PYME" | "ADMIN"
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserRepositoryDTO): Promise<User>
  update(id: string, data: UpdateUserDTO): Promise<User>
  delete(id: string): Promise<void>
}

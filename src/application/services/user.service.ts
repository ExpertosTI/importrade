/**
 * Servicio de aplicación: User
 * Lógica de negocio para usuarios
 */

import bcrypt from "bcryptjs"
import { userRepository } from "@/src/infrastructure/repositories"
import { createUserSchema, updateUserSchema } from "@/src/application/validation/schemas"
import type { CreateUserInput, UpdateUserInput } from "@/src/application/validation/schemas"
import type { User } from "@/src/domain/entities"
import { isProfileComplete } from "@/src/domain/entities"

export class UserService {
  async register(input: CreateUserInput): Promise<User> {
    // Validar entrada
    const validatedData = createUserSchema.parse(input)
    
    // Verificar si el email ya existe
    const existingUser = await userRepository.findByEmail(validatedData.email)
    if (existingUser) {
      throw new Error("El email ya está registrado")
    }
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    // Crear usuario
    return userRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      hashedPassword,
      role: validatedData.role,
    })
  }

  async findById(id: string): Promise<User | null> {
    return userRepository.findById(id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return userRepository.findByEmail(email)
  }

  async updateProfile(id: string, input: UpdateUserInput): Promise<User> {
    // Validar entrada
    const validatedData = updateUserSchema.parse(input)
    
    return userRepository.update(id, validatedData)
  }

  async delete(id: string): Promise<void> {
    return userRepository.delete(id)
  }

  checkProfileCompletion(user: User): boolean {
    return isProfileComplete(user)
  }
}

export const userService = new UserService()

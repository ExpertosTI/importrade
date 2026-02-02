/**
 * Entidad de dominio: User
 * Representa un usuario del sistema
 */

export type UserRole = "INDIVIDUAL" | "PYME" | "ADMIN"

export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: UserRole
  companyName: string | null
  rnc: string | null
  phoneNumber: string | null
  address: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface UpdateUserDTO {
  name?: string
  companyName?: string
  rnc?: string
  phoneNumber?: string
  address?: string
  role?: UserRole
}

export function isProfileComplete(user: User): boolean {
  return !!(user.phoneNumber && user.name)
}

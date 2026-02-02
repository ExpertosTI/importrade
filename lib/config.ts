/**
 * Configuración centralizada de la aplicación
 * Branding, constantes y configuración global
 */

export const APP_CONFIG = {
  // Branding
  name: "Renace",
  tagline: "Logística Inteligente",
  description: "Tu puerta a las importaciones de China. Gestionamos compras, aduanas y transporte.",
  
  // URLs
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  
  // Contact
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+18091234567",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@renace.do",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 809 123 4567",
  },
  
  // Business Rules
  business: {
    serviceFeePercent: 0.05, // 5%
    minServiceFee: 50, // USD
    itbisRate: 0.18, // 18%
    defaultTariffRate: 0.20, // 20%
  },
  
  // Currency
  currency: {
    default: "USD",
    symbol: "$",
  },
} as const

export const ROUTES = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  dashboard: "/dashboard",
  requests: "/dashboard/requests",
  orders: "/dashboard/orders",
  calculator: "/dashboard/calculator",
  profile: "/dashboard/profile",
  tools: "/dashboard/tools",
  support: "/dashboard/support",
} as const

export type AppConfig = typeof APP_CONFIG
export type Routes = typeof ROUTES

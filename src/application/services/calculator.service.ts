/**
 * Servicio de aplicación: Calculator
 * Lógica de negocio para cálculos de importación
 */

import { APP_CONFIG } from "@/lib/config"
import { calculatorInputSchema, type CalculatorInput } from "@/src/application/validation/schemas"
import type { QuoteCalculation } from "@/src/domain/entities"

export class CalculatorService {
  /**
   * Calcula el costo total de importación
   */
  calculate(input: CalculatorInput): QuoteCalculation {
    // Validar entrada
    const data = calculatorInputSchema.parse(input)
    
    // 1. Calcular Valor CIF (Cost, Insurance, Freight)
    const cifValue = data.fobPrice + data.freightCost + data.insuranceCost
    
    // 2. Calcular Gravamen (Arancel Ad Valorem)
    const tariffAmount = cifValue * (data.tariffRate / 100)
    
    // 3. Calcular ITBIS (18%)
    const baseItbis = cifValue + tariffAmount
    const itbisAmount = baseItbis * APP_CONFIG.business.itbisRate
    
    // 4. Calcular Comisión de Servicio
    const serviceFee = Math.max(
      APP_CONFIG.business.minServiceFee, 
      data.fobPrice * APP_CONFIG.business.serviceFeePercent
    )
    
    // 5. Total
    const totalCost = cifValue + tariffAmount + itbisAmount + serviceFee
    
    return {
      fobPrice: data.fobPrice,
      freightCost: data.freightCost,
      insuranceCost: data.insuranceCost,
      tariffRate: data.tariffRate,
      cifValue,
      tariffAmount,
      itbisAmount,
      serviceFee,
      totalCost,
    }
  }

  /**
   * Calcula el CBM (metros cúbicos) de la carga
   */
  calculateCBM(lengthCm: number, widthCm: number, heightCm: number, quantity: number): number {
    const lengthM = lengthCm / 100
    const widthM = widthCm / 100
    const heightM = heightCm / 100
    return lengthM * widthM * heightM * quantity
  }

  /**
   * Calcula el peso volumétrico
   */
  calculateVolumetricWeight(
    lengthCm: number, 
    widthCm: number, 
    heightCm: number, 
    method: "air" | "express" | "sea" = "air"
  ): number {
    const divisors = {
      air: 6000,
      express: 5000,
      sea: 1000, // 1 CBM = 1000kg
    }
    return (lengthCm * widthCm * heightCm) / divisors[method]
  }

  /**
   * Estima impuestos rápidamente (solo arancel + ITBIS)
   */
  estimateTaxes(cifValue: number, tariffRate: number = 20): { arancel: number; itbis: number; total: number } {
    const arancel = cifValue * (tariffRate / 100)
    const itbis = (cifValue + arancel) * APP_CONFIG.business.itbisRate
    return {
      arancel,
      itbis,
      total: arancel + itbis,
    }
  }

  /**
   * Calcula margen de ganancia
   */
  calculateMargin(landedCost: number, salePrice: number): { margin: number; percentage: number } {
    const margin = salePrice - landedCost
    const percentage = (margin / landedCost) * 100
    return { margin, percentage }
  }
}

export const calculatorService = new CalculatorService()

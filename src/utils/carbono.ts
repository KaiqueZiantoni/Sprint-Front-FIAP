import type { ResultadoCarbono } from "../types";

/**
 * Fatores de estimativa do cálculo de impacto.
 * `as const` congela os valores e infere tipos literais readonly.
 */
const FATORES = {
  /** kg de CO₂ evitados por km ao trocar o carro pelo transporte público */
  kgCo2PorKm: 0.09,
  /** kg de CO₂ que uma árvore absorve, em média, por ano */
  absorcaoArvoreAnoKg: 22,
  /** Pontos Soul Up concedidos por kg de CO₂ evitado */
  pontosPorKg: 10,
  /** Semanas consideradas em um ano de deslocamentos */
  semanasPorAno: 48,
} as const;

/**
 * Calcula a estimativa anual de CO₂ evitado, equivalência em árvores
 * e Pontos Soul Up a partir dos km semanais em transporte público.
 */
export function calcularImpacto(kmSemanais: number): ResultadoCarbono {
  const kmValidos = Math.max(0, kmSemanais);
  const co2AnualKg = kmValidos * FATORES.semanasPorAno * FATORES.kgCo2PorKm;

  return {
    co2AnualKg,
    arvoresEquivalentes: co2AnualKg / FATORES.absorcaoArvoreAnoKg,
    pontosSoulUp: Math.round(co2AnualKg * FATORES.pontosPorKg),
  };
}

/** Formata números no padrão brasileiro, com casas decimais controladas */
export function formatarNumero(valor: number, decimais = 0): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  }).format(valor);
}

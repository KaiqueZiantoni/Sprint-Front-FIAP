import { useMemo, useState } from "react";
import type { ResultadoCarbono } from "../types";
import { calcularImpacto } from "../utils/carbono";

interface RetornoImpactoCarbono {
  kmSemanais: number;
  definirKm: (valor: number) => void;
  resultado: ResultadoCarbono;
}

/**
 * Custom hook que encapsula o estado da calculadora de carbono.
 * useMemo evita recalcular o impacto quando não há mudança de km.
 */
export function useImpactoCarbono(kmIniciais = 50): RetornoImpactoCarbono {
  const [kmSemanais, setKmSemanais] = useState<number>(kmIniciais);

  const resultado = useMemo<ResultadoCarbono>(
    () => calcularImpacto(kmSemanais),
    [kmSemanais]
  );

  const definirKm = (valor: number): void => {
    setKmSemanais(Number.isNaN(valor) ? 0 : valor);
  };

  return { kmSemanais, definirKm, resultado };
}

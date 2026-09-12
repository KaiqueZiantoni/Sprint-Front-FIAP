import type { ChangeEvent } from "react";
import { useImpactoCarbono } from "../hooks/useImpactoCarbono";
import { formatarNumero } from "../utils/carbono";

interface ItemResultado {
  rotulo: string;
  valor: string;
  sufixo: string;
}

/**
 * Calculadora interativa de impacto: o usuário informa os km semanais
 * em transporte público e vê a estimativa anual de CO₂ evitado,
 * a equivalência em árvores e os Pontos Soul Up.
 */
export default function CalculadoraCarbono() {
  const { kmSemanais, definirKm, resultado } = useImpactoCarbono();

  const aoMoverControle = (evento: ChangeEvent<HTMLInputElement>): void => {
    definirKm(evento.target.valueAsNumber);
  };

  const itensResultado: readonly ItemResultado[] = [
    {
      rotulo: "CO₂ evitado por ano",
      valor: formatarNumero(resultado.co2AnualKg, 1),
      sufixo: "kg",
    },
    {
      rotulo: "Equivale a plantar",
      valor: formatarNumero(resultado.arvoresEquivalentes, 1),
      sufixo: "árvores",
    },
    {
      rotulo: "Pontos Soul Up",
      valor: formatarNumero(resultado.pontosSoulUp),
      sufixo: "pts",
    },
  ];

  return (
    <section
      aria-labelledby="titulo-calculadora"
      className="overflow-hidden rounded-2xl bg-gradient-to-b from-verde-folha/50 to-white/10 p-px"
    >
      <div className="rounded-[calc(1rem-1px)] bg-azul-escuro/90 p-6 backdrop-blur-md md:p-10">
        <div className="md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <h2 id="titulo-calculadora" className="text-2xl font-bold md:text-3xl">
              Simule o seu <span className="text-verde-folha">impacto</span>
            </h2>
            <p className="mt-2 max-w-xl text-white/75">
              Quantos quilômetros você percorre por semana em transporte
              público? Arraste e veja o que isso representa em um ano.
            </p>
          </div>
          <p className="mt-4 shrink-0 text-4xl font-bold text-verde-folha md:mt-0 md:text-5xl">
            {formatarNumero(kmSemanais)}
            <span className="ml-1 text-lg font-medium text-white/60">km/semana</span>
          </p>
        </div>

        <input
          type="range"
          min={0}
          max={300}
          step={5}
          value={kmSemanais}
          onChange={aoMoverControle}
          aria-label="Quilômetros percorridos por semana em transporte público"
          className="mt-8 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-verde-folha"
        />
        <div className="mt-1.5 flex justify-between text-xs text-white/50">
          <span>0 km</span>
          <span>150 km</span>
          <span>300 km</span>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {itensResultado.map((item) => (
            <div
              key={item.rotulo}
              className="rounded-xl bg-white/5 p-5 text-center ring-1 ring-white/10"
            >
              <dt className="text-sm text-white/65">{item.rotulo}</dt>
              <dd className="mt-1.5 text-3xl font-bold text-verde-folha">
                {item.valor}
                <span className="ml-1 text-sm font-medium text-white/60">
                  {item.sufixo}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-xs text-white/45">
          * Estimativa comparativa entre carro individual e transporte público
          (0,09 kg de CO₂ evitado por km), considerando 48 semanas de
          deslocamento por ano. Valores ilustrativos da proposta.
        </p>
      </div>
    </section>
  );
}

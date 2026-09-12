import { useNavigate } from "react-router-dom";
import type { Funcionalidade } from "../types";

interface FeatureCardProps {
  funcionalidade: Funcionalidade;
  ordem: number;
}

/**
 * Card de funcionalidade com borda em gradiente e chips de benefícios.
 * useNavigate: leva o usuário à rota dinâmica de detalhe (/solucao/:id)
 */
export default function FeatureCard({ funcionalidade, ordem }: FeatureCardProps) {
  const navigate = useNavigate();
  const irParaDetalhe = (): void => {
    void navigate(`/solucao/${funcionalidade.id}`);
  };

  return (
    <article
      onClick={irParaDetalhe}
      onKeyDown={(evento) => evento.key === "Enter" && irParaDetalhe()}
      role="link"
      tabIndex={0}
      aria-label={`Saiba mais sobre ${funcionalidade.titulo}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-verde-folha/30 p-px transition-all duration-300 hover:-translate-y-1.5 hover:from-verde-folha/70 hover:to-verde-folha/40 hover:shadow-2xl hover:shadow-verde-folha/20 focus-visible:outline-2 focus-visible:outline-verde-folha"
    >
      <div className="flex h-full flex-col rounded-[calc(1rem-1px)] bg-azul-escuro/90 p-6 backdrop-blur-md md:p-7">
        <div className="flex items-start justify-between">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-verde-folha/15 text-3xl ring-1 ring-verde-folha/30 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            {funcionalidade.icone}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 ring-1 ring-white/15">
            {funcionalidade.etiqueta}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold text-white md:text-2xl">
          {funcionalidade.titulo}
        </h3>
        <p className="mt-2.5 flex-1 leading-relaxed text-white/75">
          {funcionalidade.resumo}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {funcionalidade.beneficios.slice(0, 2).map((beneficio) => (
            <li
              key={beneficio}
              className="rounded-md bg-verde-folha/10 px-2.5 py-1 text-xs font-medium text-verde-folha ring-1 ring-verde-folha/25"
            >
              {beneficio}
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-verde-folha">
          Saiba mais
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 text-8xl font-bold text-white/5 select-none"
        >
          {String(ordem).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

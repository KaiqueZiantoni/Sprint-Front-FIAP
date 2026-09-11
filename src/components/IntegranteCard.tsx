import type { Integrante } from "../types";

interface IntegranteCardProps {
  integrante: Integrante;
}

// Card de apresentação de cada integrante da equipe (dados via props)
export default function IntegranteCard({ integrante }: IntegranteCardProps) {
  return (
    <section className="flex flex-col items-center rounded-2xl border border-white/15 bg-azul-escuro/70 p-6 text-center backdrop-blur-sm transition-transform hover:-translate-y-1">
      <img
        src={integrante.foto}
        alt={`Foto do integrante ${integrante.nome}`}
        className="h-32 w-32 rounded-full border-4 border-verde-folha object-cover md:h-36 md:w-36"
      />

      <h2 className="mt-4 text-xl font-semibold">{integrante.nome}</h2>

      <p className="mt-1 text-white/85">RM: {integrante.rm}</p>

      <p className="mt-1 text-sm text-white/75">
        {integrante.responsabilidade}
      </p>

      <div className="mt-4 flex gap-3">
        <a
          href={integrante.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-white/60 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
        >
          GitHub
        </a>

        <a
          href={integrante.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-verde-folha px-5 py-2 text-sm font-semibold transition-colors hover:bg-verde-escuro"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
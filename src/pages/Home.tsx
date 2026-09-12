import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import CalculadoraCarbono from "../components/CalculadoraCarbono";
import Grade from "../components/Grade";
import { funcionalidades } from "../data/funcionalidades";

const selosHero: readonly string[] = [
  "Integrado ao ecossistema Soul Up",
  "Validação segura de jornadas",
  "API Olho Vivo",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="px-[5%] pb-14 pt-10 text-center md:pb-20 md:pt-16">
        <p className="mx-auto w-fit rounded-full bg-verde-folha/15 px-4 py-1.5 text-sm font-semibold text-verde-folha ring-1 ring-verde-folha/30">
          Challenge Soul Up 2026
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Mobilidade <span className="text-verde-folha">sustentável</span> que
          gera{" "}
          <span className="text-verde-folha">
            impacto, reconhecimento e recompensa
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
          O SoulMove valida suas jornadas de transporte público e transforma o
          CO₂ que você deixa de emitir em pontos e descontos reais.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/solucao"
            className="rounded-full bg-verde-folha px-8 py-3.5 font-semibold text-white shadow-lg shadow-verde-folha/25 transition-all duration-300 hover:bg-verde-escuro hover:shadow-verde-folha/40"
          >
            Conheça a solução
          </Link>
          <Link
            to="/contato"
            className="rounded-full border-2 border-white/50 bg-white/5 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/15"
          >
            Fale com a equipe
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
          {selosHero.map((selo) => (
            <li key={selo} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-verde-folha" aria-hidden="true" />
              {selo}
            </li>
          ))}
        </ul>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-16">
        {/* Funcionalidades */}
        <section aria-labelledby="titulo-funcionalidades">
          <h2
            id="titulo-funcionalidades"
            className="text-center text-3xl font-bold md:text-4xl"
          >
            <span className="text-verde-folha">Como</span> Funciona
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/70">
            Três frentes que conectam mobilidade, sustentabilidade e recompensa
            em uma única experiência.
          </p>
          <div className="mt-10">
            <Grade
              itens={funcionalidades}
              extrairChave={(func) => func.id}
              renderizarItem={(func, indice) => (
                <FeatureCard funcionalidade={func} ordem={indice + 1} />
              )}
              colunas={3}
            />
          </div>
        </section>

        {/* Calculadora interativa */}
        <div className="mt-20">
          <CalculadoraCarbono />
        </div>

        {/* Arquitetura */}
        <section className="mt-20" aria-labelledby="titulo-arquitetura">
          <h2
            id="titulo-arquitetura"
            className="text-center text-3xl font-bold md:text-4xl"
          >
            Como funciona nossa <span className="text-verde-folha">arquitetura</span>
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-b from-white/25 to-white/5 p-px">
            <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-azul-escuro/80">
              <img
                src="/img/arquitetura-soulmove.jpeg"
                alt="Diagrama da arquitetura do SoulMove"
                className="w-full transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

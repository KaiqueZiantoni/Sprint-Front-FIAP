import PageHero from "../components/PageHero";
import FeatureCard from "../components/FeatureCard";
import Grade from "../components/Grade";
import { funcionalidades } from "../data/funcionalidades";

export default function Solucao() {
  return (
    <>
      <PageHero
        titulo="Nossa"
        destaque="Solução"
        subtitulo="Conheça as funcionalidades que transformam mobilidade em impacto"
      />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-12">
        <section className="mx-auto max-w-3xl rounded-2xl border border-verde-folha/40 bg-azul-escuro/70 p-6 text-center backdrop-blur-sm md:p-8">
          <p className="leading-relaxed text-white/90">
            O SoulMove valida jornadas sustentáveis de forma segura e converte o
            impacto ambiental em recompensas reais dentro do ecossistema Soul
            Up. Explore abaixo cada funcionalidade em detalhe.
          </p>
        </section>
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
      </main>
    </>
  );
}

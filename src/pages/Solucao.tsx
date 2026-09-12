import PageHero from "../components/PageHero";
import FeatureCard from "../components/featureCard";
import { funcionalidades } from "../data/funcionalidades";

export default function Solucao() {
  return (
    <>
      <PageHero
        titulo="Nossa"
        destaque="Solução"
        subtitulo="Conheça as funcionalidades da SoulMove"
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-12">
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {funcionalidades.map((funcionalidade) => (
            <FeatureCard
              key={funcionalidade.id}
              funcionalidade={funcionalidade}
            />
          ))}
        </section>
      </main>
    </>
  );
}


import PageHero from "../components/PageHero";
import IntegranteCard from "../components/IntegranteCard";
import { integrantes } from "../data/integrantes";

export default function Integrantes() {
  return (
    <>
      <PageHero
        titulo="Quem"
        destaque="Somos"
        subtitulo="Conheça nossa equipe"
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante) => (
            <IntegranteCard key={integrante.id} integrante={integrante} />
          ))}
        </div>
      </main>
    </>
  );
}
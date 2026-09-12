import PageHero from "../components/PageHero";
import FaqItem from "../components/FaqItem";
import { perguntasFaq } from "../data/faq";

export default function Faq() {
  return (
    <>
      <PageHero
        titulo="Perguntas"
        destaque="Frequentes"
        subtitulo="Tire suas dúvidas sobre a SoulMove"
      />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-[5%] pb-12">
        <section className="space-y-4">
          {perguntasFaq.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </section>
      </main>
    </>
  );
}

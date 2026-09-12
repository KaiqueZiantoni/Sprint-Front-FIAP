
import PageHero from "../components/PageHero";
import FaqItem from "../components/FaqItens";
import { perguntasFAQ} from "../data/faq";

export default function Faq() {
  return (
    <>
      <PageHero
        titulo="Perguntas"
        destaque="Frequentes"
        subtitulo="Tire suas dúvidas sobre a SoulMove"
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-12">
        <section className="faq-container">
          {perguntasFAQ.map((perguntaFaq) => (
            <FaqItem
              key={perguntaFaq.id}
              faq={perguntaFaq}
            />
          ))}
        </section>
      </main>
    </>
  );
}


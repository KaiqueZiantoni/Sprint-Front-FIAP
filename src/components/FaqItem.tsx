import { useState } from "react";
import type { PerguntaFaq } from "../types";

interface FaqItemProps {
  item: PerguntaFaq;
}

// Item de pergunta/resposta do FAQ.
// useState: controla se a resposta está visível ou oculta.
export default function FaqItem({ item }: FaqItemProps) {
  const [aberto, setAberto] = useState<boolean>(false);

  return (
    <article className="overflow-hidden rounded-xl border border-white/15 bg-azul-escuro/70 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white transition-colors hover:bg-white/10 md:px-6 md:py-5 md:text-lg"
      >
        {item.pergunta}
        <span
          className={`text-verde-folha transition-transform ${aberto ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {aberto && (
        <div className="border-t border-white/10 px-5 py-4 md:px-6">
          <p className="leading-relaxed text-white/90">{item.resposta}</p>
        </div>
      )}
    </article>
  );
}

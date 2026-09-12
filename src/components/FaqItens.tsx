
import { useState } from "react";
import type { PerguntaFaq } from "../types";

interface FaqItemProps {
  faq: PerguntaFaq;
}

export default function FaqItem({ faq }: FaqItemProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <article className="faq-item">
      <button
        className="faq-question"
        onClick={() => setAberto(!aberto)}
      >
        {faq.pergunta}
      </button>

      {aberto && (
        <div className="faq-answer">
          <p>{faq.resposta}</p>
        </div>
      )}
    </article>
  );
}


import { useNavigate } from "react-router-dom";
import type { Funcionalidade } from "../types";

interface FeatureCardProps {
  funcionalidade: Funcionalidade;
}

export default function FeatureCard({ funcionalidade }: FeatureCardProps) {
  const navigate = useNavigate();

  const abrirSolucao = (): void => {
    navigate("/solucao");
  };

  return (
    <article
      className="cursor-pointer"
      onClick={abrirSolucao}
      onKeyDown={(evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          abrirSolucao();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <h3>{funcionalidade.titulo}</h3>
      <p>{funcionalidade.descricao}</p>
    </article>
  );
}


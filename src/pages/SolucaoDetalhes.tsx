
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { funcionalidades } from "../data/funcionalidades";
import type { Funcionalidade } from "../types";

export default function SolucaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [funcionalidade, setFuncionalidade] = useState<Funcionalidade>();

  useEffect(() => {
    const funcionalidadeEncontrada = funcionalidades.find(
      (item) => item.id === Number(id)
    );

    setFuncionalidade(funcionalidadeEncontrada);
  }, [id]);

  if (!funcionalidade) {
    return <p>Funcionalidade não encontrada.</p>;
  }

  return (
    <main>
      <h1>{funcionalidade.titulo}</h1>
      <p>{funcionalidade.descricao}</p>
    </main>
  );
}


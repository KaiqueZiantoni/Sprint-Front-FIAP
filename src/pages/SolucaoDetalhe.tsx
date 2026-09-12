import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../components/Botao";
import { funcionalidades } from "../data/funcionalidades";

export default function SolucaoDetalhe() {
  // useParams: captura o parâmetro dinâmico da rota /solucao/:id
  const { id } = useParams<{ id: string }>();
  // useNavigate: permite navegação programática (voltar / redirecionar)
  const navigate = useNavigate();

  const funcionalidade = funcionalidades.find((func) => func.id === id);

  // useEffect: se o id da URL não existir, redireciona para a página Solução
  useEffect(() => {
    if (!funcionalidade) {
      navigate("/solucao", { replace: true });
    } else {
      document.title = `SoulMove | ${funcionalidade.titulo}`;
    }
  }, [funcionalidade, navigate]);

  if (!funcionalidade) return null;

  return (
    <main className="mx-auto w-full max-w-[900px] flex-1 px-[5%] pb-12 pt-10">
      <article className="rounded-2xl border border-white/15 bg-azul-escuro/70 p-6 backdrop-blur-sm md:p-10">
        <span className="text-5xl" aria-hidden="true">
          {funcionalidade.icone}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-verde-folha md:text-4xl">
          {funcionalidade.titulo}
        </h1>
        <p className="mt-5 leading-relaxed text-white/90 md:text-lg">
          {funcionalidade.descricao}
        </p>

        <h2 className="mt-8 text-xl font-semibold">Principais benefícios</h2>
        <ul className="mt-4 space-y-2">
          {funcionalidade.beneficios.map((beneficio) => (
            <li key={beneficio} className="flex items-start gap-2 text-white/90">
              <span className="text-verde-folha" aria-hidden="true">✔</span>
              {beneficio}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Botao variante="secundario" onClick={() => navigate(-1)}>
            Voltar
          </Botao>
          <Botao onClick={() => navigate("/contato")}>Fale conosco</Botao>
        </div>
      </article>
    </main>
  );
}

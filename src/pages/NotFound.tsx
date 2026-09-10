import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[5%] py-16 text-center">
      <h1 className="text-6xl font-bold text-verde-folha">404</h1>
      <p className="mt-4 text-xl text-white/90">
        A página que você procura não existe.
      </p>
      <Botao className="mt-8" onClick={() => navigate("/")}>
        Voltar para a Home
      </Botao>
    </main>
  );
}

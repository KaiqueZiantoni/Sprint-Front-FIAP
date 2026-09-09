import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Mapeia cada rota para o título exibido na aba do navegador
const titulosPorRota: Record<string, string> = {
  "/": "SoulMove | Mobilidade Sustentável",
  "/integrantes": "SoulMove | Integrantes",
  "/sobre": "SoulMove | Sobre Nós",
  "/faq": "SoulMove | FAQ",
  "/contato": "SoulMove | Contatos",
  "/solucao": "SoulMove | Solução",
};

export default function Layout() {
  const { pathname } = useLocation();

  // useEffect: a cada mudança de rota, atualiza o título da página
  // e rola a tela para o topo, melhorando a experiência de navegação SPA
  useEffect(() => {
    document.title = titulosPorRota[pathname] ?? "SoulMove";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.1)),url('/img/fundo-site.jpg')] bg-cover bg-fixed bg-center font-sans text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

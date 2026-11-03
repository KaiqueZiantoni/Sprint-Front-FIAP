import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import Solucao from "./pages/Solucao";
import SolucaoDetalhe from "./pages/SolucaoDetalhe";
import Painel from "./pages/Painel";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Rotas estáticas */}
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/painel" element={<Painel />} />
          {/* Rota dinâmica com parâmetro */}
          <Route path="/solucao/:id" element={<SolucaoDetalhe />} />
          {/* Rota coringa para páginas inexistentes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

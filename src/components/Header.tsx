import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface LinkMenu {
  rotulo: string;
  rota: string;
}

const linksMenu: LinkMenu[] = [
  { rotulo: "Home", rota: "/" },
  { rotulo: "Quem somos", rota: "/integrantes" },
  { rotulo: "Sobre nós", rota: "/sobre" },
  { rotulo: "Solução", rota: "/solucao" },
];

export default function Header() {
  // useState: controla a abertura do menu no mobile
  const [menuAberto, setMenuAberto] = useState<boolean>(false);

  const fecharMenu = (): void => setMenuAberto(false);

  const classeLink = ({ isActive }: { isActive: boolean }): string =>
    `text-lg font-medium transition-opacity hover:opacity-100 ${
      isActive ? "opacity-100 text-verde-folha" : "opacity-80 text-white"
    }`;

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-azul-escuro/70 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-[5%] py-4">
      <Link to="/" onClick={fecharMenu}>
        <img
          className="h-16 rounded-lg md:h-20"
          src="/img/soulmove-logo.jpeg"
          alt="Logo SoulMove"
        />
      </Link>

      {/* Botão hambúrguer - visível apenas no mobile */}
      <button
        type="button"
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
        onClick={() => setMenuAberto(!menuAberto)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-white/40 md:hidden"
      >
        <span className={`h-0.5 w-6 bg-white transition-transform ${menuAberto ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-opacity ${menuAberto ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-transform ${menuAberto ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Navegação */}
      <nav
        className={`${
          menuAberto ? "flex" : "hidden"
        } absolute left-0 top-24 z-50 w-full flex-col items-center gap-6 bg-azul-escuro/95 py-8 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:bg-transparent md:py-0`}
      >
        <ul className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          {linksMenu.map((link) => (
            <li key={link.rota}>
              <NavLink to={link.rota} className={classeLink} onClick={fecharMenu} end={link.rota === "/"}>
                {link.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 md:ml-6">
          <NavLink
            to="/faq"
            onClick={fecharMenu}
            className="rounded-full border-2 border-white/60 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-white/20"
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contato"
            onClick={fecharMenu}
            className="rounded-full bg-verde-folha px-6 py-2.5 font-semibold text-white transition-colors hover:bg-verde-escuro"
          >
            Contatos
          </NavLink>
        </div>
      </nav>
      </div>
    </div>
  );
}

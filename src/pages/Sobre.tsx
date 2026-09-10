import PageHero from "../components/PageHero";

interface CardTecnologia {
  titulo: string;
  descricao: string;
}

interface EtapaRoadmap {
  titulo: string;
  itens: string[];
}

const tecnologias: CardTecnologia[] = [
  { titulo: "Front-End", descricao: "React, Vite, TypeScript e TailwindCSS" },
  { titulo: "Back-End", descricao: "Java" },
  { titulo: "Organização e Versionamento", descricao: "GitHub e Trello" },
  { titulo: "Ferramentas de Apoio", descricao: "ChatGPT e Gemini" },
  { titulo: "Metodologias Utilizadas", descricao: "Kanban e Desenvolvimento Ágil" },
];

const roadmap: EtapaRoadmap[] = [
  {
    titulo: "1 | Planejamento e Pesquisa",
    itens: [
      "Definição da proposta SoulMove",
      "Pesquisa sobre mobilidade sustentável",
      "Estruturação das ideias iniciais",
      "Organização do backlog no Trello",
    ],
  },
  {
    titulo: "2 | Design e Protótipos",
    itens: [
      "Desenvolvimento da identidade visual",
      "Criação das telas no Figma",
      "Planejamento da experiência do usuário (UX/UI)",
    ],
  },
  {
    titulo: "3 | Desenvolvimento Front-End",
    itens: [
      "Migração do projeto para React + Vite + TypeScript",
      "Componentização e navegação SPA com React Router",
      "Estilização com TailwindCSS",
      "Desenvolvimento responsivo para diferentes dispositivos",
    ],
  },
  {
    titulo: "4 | Testes e Finalização",
    itens: [
      "Revisão da interface",
      "Correção de bugs",
      "Validação dos formulários e funcionalidades",
      "Organização da documentação e entrega final",
    ],
  },
];

export default function Sobre() {
  return (
    <>
      <PageHero
        titulo="Sobre"
        destaque="Nós"
        subtitulo="Contextualização do SoulMove e de nosso trajeto"
        inverterOrdem
      />
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-[5%] pb-12">
        <section className="rounded-2xl border border-verde-folha/40 bg-azul-escuro/70 p-6 backdrop-blur-sm md:p-8">
          <h2 className="text-2xl font-bold text-verde-folha">
            Contexto do Projeto
          </h2>
          <article className="mt-4 space-y-4 leading-relaxed text-white/90">
            <p>
              Hoje, a Soul Up já recompensa interação digital. Porém, existe uma
              oportunidade ainda maior: recompensar comportamentos sustentáveis
              reais.
            </p>
            <p>
              Atualmente, muitas ações dentro da plataforma estão ligadas a
              missões, interações, indicações, comunidades e consumo de
              conteúdo. Isso gera engajamento, mas ainda existe um desafio
              importante: como comprovar que uma ação sustentável realmente
              aconteceu? E mais do que isso: como validar essa ação de forma
              justa, segura e escalável?
            </p>
            <p>Foi a partir dessa necessidade que surgiu a ideia do SoulMove.</p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-white/15 bg-azul-escuro/70 p-6 backdrop-blur-sm md:p-8">
          <h2 className="text-2xl font-bold text-verde-folha">
            Solução proposta
          </h2>
          <article className="mt-4 space-y-4 leading-relaxed text-white/90">
            <p>
              O SoulMove é uma nova funcionalidade integrada ao aplicativo Soul
              Up, criada para transformar mobilidade urbana em impacto
              sustentável mensurável.
            </p>
            <p>
              A proposta consiste em permitir que o usuário registre jornadas
              sustentáveis diretamente pela plataforma. Durante o deslocamento,
              o sistema opera em segundo plano, coletando dados de forma
              controlada e cruzando informações como localização, tempo de
              trajeto e padrões de movimentação.
            </p>
            <p>
              Com isso, o SoulMove busca validar comportamentos sustentáveis de
              maneira mais segura e inteligente, permitindo que usuários sejam
              recompensados por ações reais do cotidiano.
            </p>
          </article>
        </section>

        <section className="mt-8">
          <h2 className="text-center text-2xl font-bold">Tecnologias usadas</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tecnologias.map((tech) => (
              <div
                key={tech.titulo}
                className="rounded-xl border border-white/15 bg-azul-escuro/70 p-5 text-center backdrop-blur-sm"
              >
                <h3 className="font-semibold text-verde-folha">{tech.titulo}</h3>
                <p className="mt-2 text-sm text-white/90">{tech.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-center text-2xl font-bold">
            Roadmap e etapas do Projeto
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {roadmap.map((etapa) => (
              <div
                key={etapa.titulo}
                className="rounded-xl border border-white/15 bg-azul-escuro/70 p-5 backdrop-blur-sm"
              >
                <h3 className="font-semibold text-verde-folha">
                  {etapa.titulo}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/90">
                  {etapa.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

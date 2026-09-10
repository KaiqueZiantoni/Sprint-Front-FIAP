## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função no projeto |
|---|---|
| ⚛️ **React 18** | Construção da interface e componentização |
| ⚡ **Vite 6** | Build, bundling e servidor de desenvolvimento |
| 🟦 **TypeScript** | Tipagem estática em componentes, props e formulários |
| 🎨 **TailwindCSS 4** | Estilização de toda a interface e responsividade |
| 🧭 **React Router DOM 7** | Navegação SPA com rotas estáticas e dinâmicas |
| 📝 **React Hook Form** | Validação do formulário de contato |
| 🐙 **Git / GitHub** | Versionamento e colaboração da equipe |

---

## 📁 Estrutura de Pastas do Projeto

```
soulmove-sprint3/
├── public/
│   └── img/                    # Imagens do projeto (logo, fotos, arquitetura)
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.tsx          # Cabeçalho com menu responsivo (useState)
│   │   ├── Footer.tsx          # Rodapé do site
│   │   ├── Layout.tsx          # Estrutura base + título dinâmico (useEffect)
│   │   ├── Botao.tsx           # Botão com variantes de estilo
│   │   ├── PageHero.tsx        # Cabeçalho de página reutilizável (props)
│   │   ├── FeatureCard.tsx     # Card de funcionalidade (useNavigate)
│   │   ├── FaqItem.tsx         # Item de pergunta/resposta (useState)
│   │   └── IntegranteCard.tsx  # Card de integrante da equipe
│   ├── pages/                  # Páginas da aplicação (rotas)
│   │   ├── Home.tsx            # Página inicial
│   │   ├── Integrantes.tsx     # Quem somos
│   │   ├── Sobre.tsx           # Sobre nós / contexto do projeto
│   │   ├── Faq.tsx             # Perguntas frequentes
│   │   ├── Contato.tsx         # Formulário com React Hook Form
│   │   ├── Solucao.tsx         # Página da solução do projeto
│   │   ├── SolucaoDetalhe.tsx  # Rota dinâmica /solucao/:id (useParams)
│   │   └── NotFound.tsx        # Página 404
│   ├── data/                   # Dados tipados da aplicação
│   ├── types/                  # Interfaces TypeScript
│   ├── App.tsx                 # Definição das rotas (React Router)
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── index.css               # Tailwind + tema (cores da identidade visual)
├── index.html
├── package.json
├── vite.config.ts              # Configuração Vite + plugins React e Tailwind
└── tsconfig.json               # Configuração TypeScript
```

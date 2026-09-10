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

---

## 👥 Autores e Créditos — Grupo Un-glitch tech

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|---|
| <img src="public/img/ally.jpg" width="70" style="border-radius:50%" /> | Allyson Victor | 571046 | 1TDSPV | [GitHub](https://github.com/Ally7574) | [LinkedIn](https://www.linkedin.com/in/allyson-victor-0804a9313/) |
| <img src="public/img/Cadu.JPG" width="70" style="border-radius:50%" /> | Carlos Eduardo Oliveira Silva | 569103 | 1TDSPV | [GitHub](https://github.com/ceduardoos) | [LinkedIn](https://www.linkedin.com/in/carlos-eduardo-silva-573550158) |
| <img src="public/img/Kaique.jpeg" width="70" style="border-radius:50%" /> | Kaique Ziantoni | 570294 | 1TDSPV | [GitHub](https://github.com/KaiqueZiantoni) | [LinkedIn](https://www.linkedin.com/in/kaiqueziantoni/) |
| <img src="public/img/Marcus.jpg" width="70" style="border-radius:50%" /> | Marcus Vinicius Costa | 573058 | 1TDSPV | [GitHub](https://github.com/Costa-Marcus) | [LinkedIn](https://www.linkedin.com/in/costa-marcus-v/) |
| <img src="public/img/silas.jpg" width="70" style="border-radius:50%" /> | Silas Oliveira | 571506 | 1TDSPV | [GitHub](https://github.com/SilasAngare1) | [LinkedIn](https://www.linkedin.com/in/silas-angare-pedroso-de-oliveira-55004430a/) |

---

## 🖼️ Imagens do Projeto

<div align="center">
  <img src="public/img/arquitetura-soulmove.jpeg" alt="Arquitetura do SoulMove" width="70%" />
  <p><em>Arquitetura da solução SoulMove</em></p>
</div>

---

## 🔗 Links

- **Repositório GitHub:** https://github.com/KaiqueZiantoni/Sprint-Front-FIAP
- **Vídeo de apresentação (YouTube):** https://www.youtube.com/watch?v=4yXOEV7NeY0
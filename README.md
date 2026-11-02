# 🚌 SoulMove — Sprint 04 | Front-End Design Engineering (FIAP)

<div align="center">
  <img src="public/img/soulmove-logo.jpeg" alt="Logo SoulMove" width="120" style="border-radius: 12px" />
  <h3>Mobilidade sustentável que gera impacto, reconhecimento e recompensa 🌱</h3>
</div>

---

## 📋 Descrição do Projeto

O **SoulMove** é a solução do grupo **Un-glitch Tech** para o **Challenge Soul Up (FIAP 2026)**. O usuário registra viagens de transporte público (ônibus e metrô), o sistema valida o trajeto, calcula o CO₂ evitado em relação ao carro e converte o impacto em **Pontos Soul Up**, que podem ser resgatados por benefícios.

Na **Sprint 04** o site (React + Vite + TypeScript, SPA com React Router e Tailwind CSS) foi integrado à **API REST em Java/Spring Boot** desenvolvida na disciplina *Domain Driven Design using Java*. As páginas **Painel** e **Detalhe do usuário** consomem a API publicada na nuvem: listam usuários, transportes e viagens vindos do banco Oracle, cadastram usuários, registram viagens (que geram pontos), editam cadastro, resgatam pontos e excluem registros.

### O que a integração faz

| Ação na tela | Requisição HTTP | Endpoint da API |
|---|---|---|
| Listar usuários, transportes e viagens | `GET` | `/usuarios`, `/transportes`, `/viagens` |
| Abrir detalhe de um usuário (rota dinâmica `/usuarios/:id`) | `GET` | `/usuarios/{id}`, `/viagens?idUsuario={id}` |
| Cadastrar usuário (redireciona para o detalhe) | `POST` | `/usuarios` |
| Registrar viagem e calcular pontos | `POST` | `/viagens` |
| Editar cadastro | `PUT` | `/usuarios/{id}` |
| Resgatar Pontos Soul Up | `POST` | `/usuarios/{id}/resgates` |
| Excluir viagem / usuário | `DELETE` | `/viagens/{id}`, `/usuarios/{id}` |

Todas as chamadas ficam em `src/services/api.ts` (camada de serviço com `fetch`), as respostas são tipadas em `src/types/index.ts` e a interface trata **carregando**, **erro** (mensagens devolvidas pela API, como "CPF invalido." ou "Saldo insuficiente") e **lista vazia**.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função no projeto |
|---|---|
| ⚛️ **React 18** | Construção da interface e componentização |
| ⚡ **Vite 6** | Build, bundling e servidor de desenvolvimento |
| 🟦 **TypeScript** | Tipagem de componentes, props, formulários e respostas da API (interfaces, union e intersection types) |
| 🎨 **TailwindCSS 4** | Estilização e responsividade (mobile, tablet e desktop) |
| 🧭 **React Router DOM 7** | Navegação SPA com rotas estáticas e dinâmicas (`/solucao/:id`, `/usuarios/:id`) |
| 📝 **React Hook Form** | Formulários de contato, cadastro de usuário, viagem e edição |
| 🌐 **Fetch API** | Consumo da API REST Java (sem bibliotecas externas de requisição) |
| ☕ **API Java (Spring Boot)** | Back-end do projeto, publicado no Render, com banco Oracle |
| ▲ **Vercel** | Deploy do front-end |
| 🐙 **Git / GitHub** | Versionamento e colaboração da equipe |

---

## 📁 Estrutura de Pastas do Projeto

```
Sprint-Front-FIAP/
├── public/
│   └── img/                    # Imagens do projeto (logo, fotos, arquitetura)
├── docs/                       # Prints das telas integradas à API
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.tsx          # Cabeçalho com menu responsivo
│   │   ├── Footer.tsx          # Rodapé
│   │   ├── Layout.tsx          # Estrutura base + título dinâmico
│   │   ├── Botao.tsx           # Botão com variantes
│   │   ├── Grade.tsx           # Grade genérica (generics)
│   │   ├── PageHero.tsx        # Cabeçalho das páginas internas
│   │   ├── FeatureCard.tsx     # Card de funcionalidade
│   │   ├── FaqItem.tsx         # Item de pergunta/resposta
│   │   ├── IntegranteCard.tsx  # Card de integrante
│   │   ├── CalculadoraCarbono.tsx # Calculadora de CO₂
│   │   ├── Mensagem.tsx        # Feedback de sucesso/erro das chamadas à API
│   │   └── Carregando.tsx      # Indicador de carregamento
│   ├── pages/
│   │   ├── Home.tsx            # Página inicial
│   │   ├── Integrantes.tsx     # Quem somos
│   │   ├── Sobre.tsx           # Sobre nós
│   │   ├── Faq.tsx             # Perguntas frequentes
│   │   ├── Contato.tsx         # Formulário de contato
│   │   ├── Solucao.tsx         # Páginas da solução
│   │   ├── SolucaoDetalhe.tsx  # Rota dinâmica /solucao/:id
│   │   ├── Painel.tsx          # Integração com a API: listagens, cadastro e viagens
│   │   ├── UsuarioDetalhe.tsx  # Rota dinâmica /usuarios/:id: detalhe, edição, resgate e exclusão
│   │   └── NotFound.tsx        # Página 404
│   ├── services/
│   │   └── api.ts              # Camada de acesso à API Java (fetch + tratamento de erros)
│   ├── data/                   # Dados estáticos tipados (integrantes, FAQ, funcionalidades)
│   ├── types/                  # Interfaces e tipos (inclui os tipos da API)
│   ├── hooks/                  # Custom hooks
│   ├── utils/                  # Funções de cálculo e formatação
│   ├── App.tsx                 # Rotas (React Router)
│   ├── main.tsx                # Ponto de entrada
│   └── index.css               # Tailwind + tema
├── .env.example                # Modelo da variável VITE_API_URL
├── vercel.json                 # Rewrites para a SPA na Vercel
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```


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


import type { Funcionalidade } from "../types";

export const funcionalidades: readonly Funcionalidade[] = [
  {
    id: "monitoramento",
    titulo: "Monitoramento ao Vivo",
    etiqueta: "Tempo real",
    resumo:
      "Acompanhe a localização dos ônibus em tempo real e reduza o tempo de espera no ponto.",
    descricao:
      "Integração com a API Olho Vivo para você acompanhar a localização dos ônibus em tempo real, garantindo previsibilidade e menor tempo de espera no ponto. O usuário visualiza as linhas próximas, horários estimados de chegada e recebe atualizações contínuas durante o trajeto.",
    beneficios: [
      "Localização dos ônibus em tempo real",
      "Previsão de chegada no ponto",
      "Menor tempo de espera",
      "Planejamento de rotas mais eficiente",
    ],
    icone: "🚌",
  },
  {
    id: "calculadora",
    titulo: "Calculadora de Carbono",
    etiqueta: "Impacto mensurável",
    resumo:
      "Calcule a quantidade de CO₂ que você evitou emitir ao escolher o transporte público.",
    descricao:
      "Descubra o impacto positivo das suas viagens. A calculadora cruza a distância percorrida com a estimativa de emissão de um veículo individual e mostra exatamente a quantidade de CO₂ que você evitou emitir ao escolher o transporte público, transformando sustentabilidade em um dado concreto e mensurável.",
    beneficios: [
      "Impacto ambiental mensurável por viagem",
      "Comparativo com veículos individuais",
      "Histórico acumulado de CO₂ economizado",
      "Consciência ambiental no dia a dia",
    ],
    icone: "🌱",
  },
  {
    id: "recompensas",
    titulo: "Descontos em Passagens",
    etiqueta: "Recompensas",
    resumo:
      "Converta sua economia de carbono em pontos e troque por descontos reais.",
    descricao:
      "Valide suas viagens e converta a sua economia de carbono em benefícios reais. A cada jornada sustentável validada, o usuário acumula Pontos Soul Up, que podem ser trocados por descontos diretos nas próximas passagens e benefícios com parceiros do ecossistema.",
    beneficios: [
      "Pontos Soul Up a cada viagem validada",
      "Descontos diretos em passagens",
      "Benefícios com parceiros",
      "Ranking e competição saudável",
    ],
    icone: "🎯",
  },
];

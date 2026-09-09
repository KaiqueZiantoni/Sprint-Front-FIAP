// Tipagens centrais do projeto SoulMove

/** Variantes visuais disponíveis para o componente Botao */
export type VarianteBotao = "primario" | "secundario" | "fantasma";

/** Tamanhos de grade suportados pelo componente genérico Grade */
export type ColunasGrade = 2 | 3;

export interface Integrante {
  id: number;
  nome: string;
  rm: string;
  turma: string;
  responsabilidade: string;
  foto: string;
  github: string;
  linkedin: string;
}

export interface PerguntaFaq {
  id: number;
  pergunta: string;
  resposta: string;
}

export interface Funcionalidade {
  id: "monitoramento" | "calculadora" | "recompensas";
  titulo: string;
  resumo: string;
  descricao: string;
  beneficios: readonly string[];
  icone: string;
  etiqueta: string;
}

export interface DadosFormularioContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/** Resultado do cálculo de impacto ambiental de um deslocamento */
export interface ResultadoCarbono {
  co2AnualKg: number;
  arvoresEquivalentes: number;
  pontosSoulUp: number;
}

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

// ----- Tipos da API SoulMove (Java / Spring Boot) -----
export interface Usuario {
idUsuario: number;
nome: string;
cpf: string;
email: string;
numeroBilheteTransporte: string;
cadastroAtivo: boolean;
saldoPontosSoulUp: number;
}
export interface MeioTransporte {
idTransporte: number;
tipoModal: "ONIBUS" | "METRO";
identificacao: string;
combustivelUtilizado: string;
participaDoPrograma: boolean;
}
export interface Viagem {
idViagem: number;
usuario: Usuario;
meioTransporte: MeioTransporte;
distanciaEmKm: number;
duracaoEmMinutos: number;
dataViagem: string;
co2EvitadoKg: number;
pontosGerados: number;
validada: boolean;
}

/** Dados enviados no POST /viagens */
export interface NovaViagem {
idUsuario: number;
idTransporte: number;
distanciaEmKm: number;
duracaoEmMinutos: number;
dataViagem: string;
}
/** Dados enviados no POST /usuarios */
export interface NovoUsuario {
nome: string;
cpf: string;
email: string;
numeroBilheteTransporte: string;
}
/** Dados enviados no PUT /usuarios/{id}: os mesmos do cadastro mais o status
(intersection type) */
export type AtualizacaoUsuario = NovoUsuario & { cadastroAtivo: boolean };
/** Situação de uma chamada à API (union type) */
export type EstadoRequisicao = "carregando" | "sucesso" | "erro";
/** Erro padronizado devolvido pela API: { "status": "400", "erro":
"mensagem" } */
export interface ErroApi {
status: string;
erro: string;
}

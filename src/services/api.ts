import type {
AtualizacaoUsuario,
ErroApi,
MeioTransporte,
NovaViagem,
NovoUsuario,
ResultadoCarbono,
Usuario,
Viagem,
} from "../types";
// Endereço da API Java (Spring Boot). Em produção vem de VITE_API_URL (arquivo .env / Vercel)
export const URL_API: string = import.meta.env.VITE_API_URL ??
"http://localhost:8080";
/**
* Função única de acesso à API: monta a URL, envia JSON e converte a
resposta.
* Erros de rede e erros devolvidos pela API ({ "erro": "..." }) viram
exceções
* com mensagem legível para a interface.
*/
async function requisitar<T>(rota: string, opcoes?: RequestInit): Promise<T>
{
let resposta: Response;
try {
resposta = await fetch(`${URL_API}${rota}`, {
headers: { "Content-Type": "application/json" },
...opcoes,
});
} catch {
    throw new Error("Não foi possível conectar à API. Verifique se o servidorestá no ar.");
}
if (resposta.status === 204) {
return undefined as T;
}
const corpo: unknown = await resposta.json().catch(() => null);
if (!resposta.ok) {
const erro = corpo as ErroApi | null;
throw new Error(erro?.erro ?? `Erro ${resposta.status} na API`);
}
return corpo as T;
}
export const api = {
// ----- Usuários -----
listarUsuarios: () => requisitar<Usuario[]>("/usuarios"),
buscarUsuario: (id: number) => requisitar<Usuario>(`/usuarios/${id}`),
cadastrarUsuario: (dados: NovoUsuario) =>
requisitar<Usuario>("/usuarios", { method: "POST", body:
JSON.stringify(dados) }),
atualizarUsuario: (id: number, dados: AtualizacaoUsuario) =>
requisitar<Usuario>(`/usuarios/${id}`, { method: "PUT", body:
JSON.stringify(dados) }),
removerUsuario: (id: number) =>
requisitar<void>(`/usuarios/${id}`, { method: "DELETE" }),
resgatarPontos: (id: number, pontos: number) =>
requisitar<Usuario>(`/usuarios/${id}/resgates`, {
method: "POST",
body: JSON.stringify({ pontos }),
}),
// ----- Meios de transporte -----
listarTransportes: () => requisitar<MeioTransporte[]>("/transportes"),
// ----- Viagens -----
listarViagens: () => requisitar<Viagem[]>("/viagens"),
listarViagensDoUsuario: (idUsuario: number) =>
requisitar<Viagem[]>(`/viagens?idUsuario=${idUsuario}`),
registrarViagem: (dados: NovaViagem) =>
requisitar<Viagem>("/viagens", { method: "POST", body:
JSON.stringify(dados) }),
removerViagem: (id: number) =>
requisitar<void>(`/viagens/${id}`, { method: "DELETE" }),
// ----- Calculadora -----
calcularImpacto: (kmSemanais: number) =>
requisitar<ResultadoCarbono>(`/impacto?kmSemanais=${kmSemanais}`),
};

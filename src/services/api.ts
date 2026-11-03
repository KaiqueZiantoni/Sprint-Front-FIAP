import type { ErroApi, Usuario } from "../types";
// Endereço da API Java (Spring Boot). Em produção vem de VITE_API_URL
(arquivo .env / Vercel).
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
throw new Error("Erro de rede ao chamar a API.");
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
listarUsuarios: () => requisitar<Usuario[]>("/usuarios"),
buscarUsuario: (id: number) => requisitar<Usuario>(`/usuarios/${id}`),
};
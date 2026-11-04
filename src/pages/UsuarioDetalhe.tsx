import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Botao from "../components/Botao";
import Mensagem from "../components/Mensagem";
import Carregando from "../components/Carregando";
import { api } from "../services/api";
import { formatarNumero } from "../utils/carbono";
import type { AtualizacaoUsuario, EstadoRequisicao, Usuario, Viagem } from "../types";

/**
 * Rota dinâmica /usuarios/:id — detalhe de um usuário vindo da API.
 * Mostra os dados e o saldo, lista as viagens do usuário, permite editar o
 * cadastro (PUT), resgatar pontos (POST) e excluir o usuário (DELETE).
 */
export default function UsuarioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const idUsuario = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [estado, setEstado] = useState<EstadoRequisicao>("carregando");
  const [erro, setErro] = useState<string>("");
  // Mensagem enviada pelo redirecionamento após o cadastro no Painel
  const [mensagem, setMensagem] = useState<string>((location.state as { mensagem?: string } | null)?.mensagem ?? "");
  const [editando, setEditando] = useState<boolean>(false);
  const [pontosResgate, setPontosResgate] = useState<number>(50);

  const form = useForm<AtualizacaoUsuario>();

  const carregar = async (): Promise<void> => {
    try {
      const [u, v] = await Promise.all([api.buscarUsuario(idUsuario), api.listarViagensDoUsuario(idUsuario)]);
      setUsuario(u);
      setViagens(v);
      form.reset({
        nome: u.nome,
        cpf: u.cpf,
        email: u.email,
        numeroBilheteTransporte: u.numeroBilheteTransporte,
        cadastroAtivo: u.cadastroAtivo,
      });
      setEstado("sucesso");
      document.title = `SoulMove | ${u.nome}`;
    } catch (e) {
      setErro((e as Error).message);
      setEstado("erro");
    }
  };

  useEffect(() => {
    // Id inválido na URL (ex.: /usuarios/abc) -> volta para o painel
    if (Number.isNaN(idUsuario) || idUsuario <= 0) {
      navigate("/painel", { replace: true });
      return;
    }
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUsuario]);

  const aoSalvar = async (dados: AtualizacaoUsuario): Promise<void> => {
    setErro("");
    try {
      const atualizado = await api.atualizarUsuario(idUsuario, dados);
      setUsuario(atualizado);
      setEditando(false);
      setMensagem("Cadastro atualizado com sucesso.");
    } catch (e) {
      setErro((e as Error).message);
    }
  };

  const aoResgatar = async (): Promise<void> => {
    setErro("");
    try {
      const atualizado = await api.resgatarPontos(idUsuario, pontosResgate);
      setUsuario(atualizado);
      setMensagem(`${pontosResgate} pontos resgatados. Saldo atual: ${atualizado.saldoPontosSoulUp} pts.`);
    } catch (e) {
      setErro((e as Error).message);
    }
  };

  const aoExcluir = async (): Promise<void> => {
    if (!usuario || !window.confirm(`Excluir o usuário ${usuario.nome}?`)) return;
    setErro("");
    try {
      await api.removerUsuario(idUsuario);
      navigate("/painel", { replace: true });
    } catch (e) {
      setErro((e as Error).message);
    }
  };

  const estiloCampo =
    "w-full rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 outline-none focus:border-verde-folha";
  const estiloCard = "rounded-2xl border border-white/15 bg-azul-escuro/70 p-5 backdrop-blur-sm md:p-6";

  if (estado === "carregando") {
    return (
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-[5%] py-10">
        <Carregando texto="Buscando usuário na API..." />
      </main>
    );
  }

  if (estado === "erro" || !usuario) {
    return (
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-[5%] py-10">
        <Mensagem tipo="erro">{erro || "Usuário não encontrado."}</Mensagem>
        <Botao onClick={() => navigate("/painel")}>Voltar ao painel</Botao>
      </main>
    );
  }

  const totalCo2 = viagens.reduce((soma, v) => soma + v.co2EvitadoKg, 0);

  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1 px-[5%] pb-12 pt-8">
      <Link to="/painel" className="text-sm text-white/70 hover:text-verde-folha">&larr; Voltar ao painel</Link>

      <header className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            {usuario.nome} {!usuario.cadastroAtivo && <span className="text-lg text-red-300">(inativo)</span>}
          </h1>
          <p className="mt-1 text-white/75">Usuário #{usuario.idUsuario} · bilhete {usuario.numeroBilheteTransporte}</p>
        </div>
        <p className="text-4xl font-bold text-verde-folha">
          {usuario.saldoPontosSoulUp}
          <span className="ml-1 text-base font-medium text-white/60">Pontos Soul Up</span>
        </p>
      </header>

      <div className="mt-6">
        {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
        {mensagem && !erro && <Mensagem tipo="sucesso">{mensagem}</Mensagem>}
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
          <dt className="text-sm text-white/65">Viagens validadas</dt>
          <dd className="mt-1 text-2xl font-bold text-verde-folha">{viagens.filter((v) => v.validada).length}</dd>
        </div>
        <div className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
          <dt className="text-sm text-white/65">CO₂ evitado</dt>
          <dd className="mt-1 text-2xl font-bold text-verde-folha">
            {formatarNumero(totalCo2, 2)} <span className="text-sm text-white/60">kg</span>
          </dd>
        </div>
        <div className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
          <dt className="text-sm text-white/65">Km percorridos</dt>
          <dd className="mt-1 text-2xl font-bold text-verde-folha">
            {formatarNumero(viagens.reduce((s, v) => s + v.distanciaEmKm, 0), 1)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className={estiloCard} aria-labelledby="titulo-dados">
          <div className="flex items-center justify-between">
            <h2 id="titulo-dados" className="text-xl font-bold text-verde-folha">Dados do cadastro</h2>
            {!editando && (
              <Botao variante="fantasma" onClick={() => setEditando(true)}>Editar</Botao>
            )}
          </div>

          {editando ? (
            <form onSubmit={form.handleSubmit(aoSalvar)} className="mt-4 space-y-3" noValidate>
              <input placeholder="Nome completo" className={estiloCampo} {...form.register("nome", { required: true })} />
              <input placeholder="CPF" className={estiloCampo} {...form.register("cpf", { required: true })} />
              <input type="email" placeholder="E-mail" className={estiloCampo} {...form.register("email", { required: true })} />
              <input placeholder="Bilhete de transporte" className={estiloCampo} {...form.register("numeroBilheteTransporte", { required: true })} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-verde-folha" {...form.register("cadastroAtivo")} />
                Cadastro ativo
              </label>
              <div className="flex gap-3">
                <Botao type="submit">Salvar</Botao>
                <Botao type="button" variante="secundario" onClick={() => setEditando(false)}>Cancelar</Botao>
              </div>
            </form>
          ) : (
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-white/65">CPF</dt><dd>{usuario.cpf}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">E-mail</dt><dd className="break-all">{usuario.email}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">Bilhete</dt><dd>{usuario.numeroBilheteTransporte}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">Situação</dt><dd>{usuario.cadastroAtivo ? "Ativo" : "Inativo"}</dd></div>
            </dl>
          )}
        </section>

        <section className={estiloCard} aria-labelledby="titulo-resgate">
          <h2 id="titulo-resgate" className="text-xl font-bold text-verde-folha">Resgatar pontos</h2>
          <p className="mt-2 text-sm text-white/75">Troque Pontos Soul Up por benefícios. O resgate é validado pela API (cadastro ativo e saldo suficiente).</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input type="number" min="1" value={pontosResgate} aria-label="Pontos a resgatar"
              onChange={(e) => setPontosResgate(e.target.valueAsNumber)} className={estiloCampo} />
            <Botao onClick={aoResgatar} className="shrink-0">Resgatar</Botao>
          </div>
          <hr className="my-5 border-white/10" />
          <Botao variante="secundario" onClick={aoExcluir} className="w-full">Excluir usuário</Botao>
          <p className="mt-2 text-xs text-white/50">A API só permite excluir usuários sem viagens registradas.</p>
        </section>
      </div>

      <section className={`${estiloCard} mt-6`} aria-labelledby="titulo-historico">
        <h2 id="titulo-historico" className="text-xl font-bold text-verde-folha">Histórico de viagens</h2>
        {viagens.length === 0 ? (
          <p className="mt-3 text-white/70">Este usuário ainda não registrou viagens.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10 text-sm">
            {viagens.map((v) => (
              <li key={v.idViagem} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-white/60">{v.dataViagem.split("-").reverse().join("/")}</span>
                  <span className="ml-3">{v.meioTransporte.tipoModal} {v.meioTransporte.identificacao}</span>
                </div>
                <div className="text-white/80">
                  {formatarNumero(v.distanciaEmKm, 1)} km · {formatarNumero(v.co2EvitadoKg, 2)} kg CO₂ ·{" "}
                  <span className="font-semibold text-verde-folha">{v.pontosGerados} pts</span> · {v.validada ? "validada" : "não validada"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

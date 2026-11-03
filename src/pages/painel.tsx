import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHero from "../components/PageHero";
import Botao from "../components/Botao";
import Mensagem from "../components/Mensagem";
import Carregando from "../components/Carregando";
import { api } from "../services/api";
import { formatarNumero } from "../utils/carbono";
import type {
  EstadoRequisicao,
  MeioTransporte,
  NovaViagem,
  NovoUsuario,
  Usuario,
  Viagem
} from "../types";

/**
 * Painel integrado com a API Java (Spring Boot).
 * Lista usuários, transportes e viagens vindos do banco e permite cadastrar
 * usuários e registrar viagens, que geram Pontos Soul Up.
 */
export default function Painel() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [transportes, setTransportes] = useState<MeioTransporte[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [estado, setEstado] = useState<EstadoRequisicao>("carregando");
  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [enviando, setEnviando] = useState<boolean>(false);

  const formViagem = useForm<NovaViagem>();
  const formUsuario = useForm<NovoUsuario>();

  // Busca os dados na API (GET) ao abrir a página e após cada alteração
  const carregar = async (): Promise<void> => {
    try {
      const [u, t, v] = await Promise.all([
        api.listarUsuarios(),
        api.listarTransportes(),
        api.listarViagens(),
      ]);

      setUsuarios(u);
      setTransportes(t);
      setViagens(v);
      setEstado("sucesso");
    } catch (e) {
      setErro((e as Error).message);
      setEstado("erro");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const aoRegistrarViagem = async (dados: NovaViagem): Promise<void> => {
    setErro("");
    setEnviando(true);

    try {
      const viagem = await api.registrarViagem({
        idUsuario: Number(dados.idUsuario),
        idTransporte: Number(dados.idTransporte),
        distanciaEmKm: Number(dados.distanciaEmKm),
        duracaoEmMinutos: Number(dados.duracaoEmMinutos),
        dataViagem: dados.dataViagem,
      });

      setMensagem(
        viagem.validada
          ? `Viagem validada! ${formatarNumero(viagem.co2EvitadoKg, 2)} kg de CO₂ evitados e ${viagem.pontosGerados} Pontos Soul Up creditados para ${viagem.usuario.nome}.`
          : "Viagem registrada, mas não validada pelo SoulMove Engine (velocidade fora do padrão do modal ou transporte fora do programa). Nenhum ponto foi gerado."
      );

      formViagem.reset();
      await carregar();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  const aoCadastrarUsuario = async (dados: NovoUsuario): Promise<void> => {
    setErro("");
    setEnviando(true);

    try {
      const usuario = await api.cadastrarUsuario(dados);

      setMensagem(`Usuário ${usuario.nome} cadastrado com sucesso (id ${usuario.idUsuario}).`);

      formUsuario.reset();
      await carregar();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  const aoRemoverViagem = async (viagem: Viagem): Promise<void> => {
    if (!window.confirm(`Remover a viagem de ${viagem.usuario.nome}? Os ${viagem.pontosGerados} pontos serão estornados.`)) return;

    setErro("");

    try {
      await api.removerViagem(viagem.idViagem);
      setMensagem(`Viagem ${viagem.idViagem} removida e pontos estornados.`);
      await carregar();
    } catch (e) {
      setErro((e as Error).message);
    }
  };

  const estiloCampo =
    "w-full rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text white placeholder-white/50 outline-none focus:border-verde-folha";

  const estiloCard = "rounded-2xl border border-white/15 bg-azul-escuro/70 p 5 backdrop-blur-sm md:p-6";

  return (
    <>
      <PageHero
        titulo="Painel"
        destaque="SoulMove"
        subtitulo="Viagens, usuários e pontos vindos da API Java integrada ao banco de dados."
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[5%] pb-12">
        {estado === "carregando" && <Carregando />}

        {estado === "erro" && (
          <>
            <Mensagem tipo="erro">{erro}</Mensagem>

            <Botao
              variante="secundario"
              onClick={() => {
                setEstado("carregando");
                carregar();
              }}
            >
              Tentar novamente
            </Botao>
          </>
        )}

        {estado === "sucesso" && (
          <>
            {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

            {mensagem && !erro && (
              <Mensagem tipo="sucesso">{mensagem}</Mensagem>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <section className={estiloCard} aria-labelledby="titulo viagem">
                <h2
                  id="titulo-viagem"
                  className="text-xl font-bold text verde-folha"
                >
                  Registrar viagem
                </h2>

                <form
                  onSubmit={formViagem.handleSubmit(aoRegistrarViagem)}
                  className="mt-4 space-y-3"
                  noValidate
                >
                  <select
                    aria-label="Usuário"
                    className={estiloCampo}
                    {...formViagem.register("idUsuario", { required: true })}
                  >
                    <option value="">Usuário</option>

                    {usuarios.filter((u) => u.cadastroAtivo).map((u) => (
                      <option key={u.idUsuario} value={u.idUsuario}>
                        {u.nome} — {u.saldoPontosSoulUp} pts
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Meio de transporte"
                    className={estiloCampo}
                    {...formViagem.register("idTransporte", { required: true })}
                  >
                    <option value="">Meio de transporte</option>

                    {transportes.map((t) => (
                      <option key={t.idTransporte} value={t.idTransporte}>
                        {t.tipoModal} — {t.identificacao}
                        {!t.participaDoPrograma && " (fora do programa)"}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Distância (km)"
                      className={estiloCampo}
                      {...formViagem.register("distanciaEmKm", { required: true })}
                    />

                    <input
                      type="number"
                      min="1"
                      placeholder="Duração (min)"
                      className={estiloCampo}
                      {...formViagem.register("duracaoEmMinutos", { required: true })}
                    />
                  </div>

                  <input
                    type="date"
                    aria-label="Data da viagem"
                    className={estiloCampo}
                    {...formViagem.register("dataViagem", { required: true })}
                  />

                  <Botao
                    type="submit"
                    className="w-full"
                    disabled={enviando}
                  >
                    {enviando ? "Enviando..." : "Registrar e calcular pontos"}
                  </Botao>
                </form>
              </section>

              <section className={estiloCard} aria-labelledby="titulo usuario">
                <h2
                  id="titulo-usuario"
                  className="text-xl font-bold text verde-folha"
                >
                  Cadastrar usuário
                </h2>

                <form
                  onSubmit={formUsuario.handleSubmit(aoCadastrarUsuario)}
                  className="mt-4 space-y-3"
                  noValidate
                >
                  <input
                    placeholder="Nome completo"
                    className={estiloCampo}
                    {...formUsuario.register("nome", { required: true })}
                  />

                  <input
                    placeholder="CPF (000.000.000-00)"
                    className={estiloCampo}
                    {...formUsuario.register("cpf", { required: true })}
                  />

                  <input
                    type="email"
                    placeholder="E-mail"
                    className={estiloCampo}
                    {...formUsuario.register("email", { required: true })}
                  />

                  <input
                    placeholder="Número do bilhete de transporte"
                    className={estiloCampo}
                    {...formUsuario.register("numeroBilheteTransporte", { required: true })}
                  />

                  <Botao
                    type="submit"
                    variante="secundario"
                    className="w full"
                    disabled={enviando}
                  >
                    Cadastrar
                  </Botao>
                </form>

                <h3 className="mt-6 font-semibold text-white/90">
                  Usuários cadastrados
                </h3>

                {usuarios.length === 0 ? (
                  <p className="mt-2 text-sm text-white/70">
                    Nenhum usuário cadastrado ainda.
                  </p>
                ) : (
                  <ul className="mt-2 divide-y divide-white/10 text-sm">
                    {usuarios.map((u) => (
                      <li
                        key={u.idUsuario}
                        className="flex items-center justify-between gap-2 py-2"
                      >
                        <span>
                          {u.nome}
                          {!u.cadastroAtivo && " (inativo)"}
                        </span>

                        <span className="shrink-0 font-semibold text-verde folha">
                          {u.saldoPontosSoulUp} pts
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <section
              className={`${estiloCard} mt-6`}
              aria labelledby="titulo-viagens"
            >
              <h2 className="text-xl font-bold text verde-folha">
                Viagens registradas
              </h2>

              {viagens.length === 0 ? (
                <p className="mt-3 text-white/70">
                  Nenhuma viagem registrada ainda. Use o formulário acima para registrar a primeira.
                </p>
              ) : (
                <>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-white/60">
                        <tr>
                          <th className="pb-2">Data</th>
                          <th className="pb-2">Usuário</th>
                          <th className="pb-2">Transporte</th>
                          <th className="pb-2 text-right">km</th>
                          <th className="pb-2 text-right">CO₂ evitado</th>
                          <th className="pb-2 pr-2 text-right">Pontos</th>
                          <th className="pb-2 pl-4">Status</th>
                          <th className="pb-2"></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/10">
                        {viagens.map((v) => (
                          <tr key={v.idViagem}>
                            <td className="py-2">
                              {v.dataViagem.split(" ").reverse().join("/")}
                            </td>

                            <td className="py-2">{v.usuario.nome}</td>

                            <td className="py-2">
                              {v.meioTransporte.tipoModal}
                              {v.meioTransporte.identificacao}
                            </td>

                            <td className="py-2 text-right">
                              {formatarNumero(v.distanciaEmKm, 1)}
                            </td>

                            <td className="py-2 text-right">
                              {formatarNumero(v.co2EvitadoKg, 2)} kg
                            </td>

                            <td className="py-2 pr-2 text-right font-semibold text-verde-folha">
                              {v.pontosGerados}
                            </td>

                            <td className="py-2 pl-4">
                              {v.validada ? "Validada" : "Não validada"}
                            </td>

                            <td className="py-2 text-right">
                              <button
                                type="button"
                                onClick={() => aoRemoverViagem(v)}
                                className="cursor-pointer text-red-300 hover:text-red100"
                              >
                                Excluir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import Botao from "../components/Botao";
import Mensagem from "../components/Mensagem";
import Carregando from "../components/Carregando";
import { api } from "../services/api";
import { formatarNumero } from "../utils/carbono";
import type { EstadoRequisicao, MeioTransporte, Usuario, Viagem } from "../types";

/**
 * Painel integrado com a API Java (Spring Boot).
 * Lista usuários, transportes e viagens vindos do banco de dados.
 */
export default function Painel() {
  const [usuarios, setUsuarios] = useState([]);
  const [transportes, setTransportes] = useState([]);
  const [viagens, setViagens] = useState([]);
  const [estado, setEstado] = useState("carregando");
  const [erro, setErro] = useState("");

  // Busca os dados na API (GET) ao abrir a página
  const carregar = async (): Promise => {
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

  const estiloCard = "rounded-2xl border border-white/15 bg-azul-escuro/70 p 5 backdrop-blur-sm md:p-6";

  return (
    <>
      {estado === "carregando" && (

      )}

      {estado === "erro" && (
        <>
          {erro}

          <button
            onClick={() => {
              setEstado("carregando");
              carregar();
            }}
          >
            Tentar novamente
          </button>
        </>
      )}

      {estado === "sucesso" && (
        <>
          <h2>Usuários cadastrados</h2>

          {usuarios.length === 0 ? (
            <p>Nenhum usuário cadastrado ainda.</p>
          ) : (
            <ul>
              {usuarios.map((u) => (
                <li>
                  {u.nome}
                  {!u.cadastroAtivo && " (inativo)"}
                  {u.saldoPontosSoulUp} pts
                </li>
              ))}
            </ul>
          )}

          <h2>Meios de transporte</h2>

          <ul>
            {transportes.map((t) => (
              <li>
                {t.tipoModal} — {t.identificacao}
                {!t.participaDoPrograma && " (fora do programa)"}
              </li>
            ))}
          </ul>

          <h2>Viagens registradas</h2>

          {viagens.length === 0 ? (
            <p>Nenhuma viagem registrada ainda.</p>
          ) : (
            <>
              {viagens.map((v) => (
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Usuário</th>
                      <th>Transporte</th>
                      <th>km</th>
                      <th>CO₂ evitado</th>
                      <th>Pontos</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        {v.dataViagem.split(" ").reverse().join("/")}
                      </td>
                      <td>{v.usuario.nome}</td>
                      <td>
                        {v.meioTransporte.tipoModal}
                        {v.meioTransporte.identificacao}
                      </td>
                      <td>
                        {formatarNumero(v.distanciaEmKm, 1)}
                      </td>
                      <td>
                        {formatarNumero(v.co2EvitadoKg, 2)} kg
                      </td>
                      <td>{v.pontosGerados}</td>
                      <td>
                        {v.validada ? "Validada" : "Não validada"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
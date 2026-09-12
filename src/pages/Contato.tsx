import { useState } from "react";
import { useForm } from "react-hook-form";
import PageHero from "../components/PageHero";
import Botao from "../components/Botao";
import type { DadosFormularioContato } from "../types";

export default function Contato() {
  // useState: controla a exibição da mensagem de sucesso após o envio
  const [enviado, setEnviado] = useState<boolean>(false);

  // React Hook Form com tipagem TypeScript dos dados do formulário
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DadosFormularioContato>();

  const aoEnviar = (dados: DadosFormularioContato): void => {
    console.log("Dados do formulário:", dados);
    setEnviado(true);
    reset();
  };

  // Estilo base dos campos, com destaque visual em vermelho quando há erro
  const estiloCampo = (temErro: boolean): string =>
    `w-full rounded-lg border bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-verde-folha ${
      temErro ? "border-red-400" : "border-white/25"
    }`;

  return (
    <>
      <PageHero
        titulo="Fale com a"
        destaque="SoulMove"
        subtitulo="Entre em contato com o nosso projeto."
      />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-[5%] pb-12">
        <section className="rounded-2xl border border-white/15 bg-azul-escuro/70 p-6 backdrop-blur-sm md:p-8">
          <h2 className="text-xl font-bold text-verde-folha">
            Informações de contato
          </h2>
          <div className="mt-3 space-y-1 text-white/90">
            <p>
              <strong>E-mail:</strong> contato@soulmove.com
            </p>
            <p>
              <strong>Atendimento:</strong> Segunda a sexta, das 9h às 18h
            </p>
            <p>
              <strong>Projeto:</strong> SoulMove - mobilidade sustentável com
              tecnologia e recompensas.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/15 bg-azul-escuro/70 p-6 backdrop-blur-sm md:p-8">
          <h2 className="text-xl font-bold text-verde-folha">
            Envie sua mensagem
          </h2>

          <form onSubmit={handleSubmit(aoEnviar)} className="mt-6 space-y-5" noValidate>
            <div>
              <label htmlFor="nome" className="mb-1.5 block font-medium">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                className={estiloCampo(Boolean(errors.nome))}
                {...register("nome", {
                  required: "O nome é obrigatório.",
                  minLength: {
                    value: 3,
                    message: "O nome deve ter pelo menos 3 caracteres.",
                  },
                })}
              />
              {errors.nome && (
                <p role="alert" className="mt-1.5 text-sm font-medium text-red-400">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-medium">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className={estiloCampo(Boolean(errors.email))}
                {...register("email", {
                  required: "O e-mail é obrigatório.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um e-mail válido.",
                  },
                })}
              />
              {errors.email && (
                <p role="alert" className="mt-1.5 text-sm font-medium text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="assunto" className="mb-1.5 block font-medium">
                Assunto
              </label>
              <input
                id="assunto"
                type="text"
                placeholder="Sobre o que deseja falar?"
                className={estiloCampo(Boolean(errors.assunto))}
                {...register("assunto", {
                  required: "O assunto é obrigatório.",
                })}
              />
              {errors.assunto && (
                <p role="alert" className="mt-1.5 text-sm font-medium text-red-400">
                  {errors.assunto.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="mensagem" className="mb-1.5 block font-medium">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={5}
                placeholder="Escreva sua mensagem..."
                className={estiloCampo(Boolean(errors.mensagem))}
                {...register("mensagem", {
                  required: "A mensagem é obrigatória.",
                  minLength: {
                    value: 10,
                    message: "A mensagem deve ter pelo menos 10 caracteres.",
                  },
                })}
              />
              {errors.mensagem && (
                <p role="alert" className="mt-1.5 text-sm font-medium text-red-400">
                  {errors.mensagem.message}
                </p>
              )}
            </div>

            <Botao type="submit" className="w-full md:w-auto">
              Enviar
            </Botao>

            {enviado && (
              <p
                role="status"
                className="rounded-lg border border-verde-folha/50 bg-verde-folha/15 px-4 py-3 font-medium text-verde-folha"
              >
                Mensagem enviada com sucesso!
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

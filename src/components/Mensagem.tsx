interface MensagemProps {
  tipo: "sucesso" | "erro" | "info";
  children: React.ReactNode;
}

const estilos = {
  sucesso: "border-verde-folha/60 bg-verde-folha/20 text-white",
  erro: "border-red-400/60 bg-red-500/20 text-red-100",
  info: "border-white/30 bg-white/10 text-white/90",
} satisfies Record<MensagemProps["tipo"], string>;

/** Caixa de feedback usada nas páginas integradas à API (sucesso, erro ou aviso). */
export default function Mensagem({ tipo, children }: MensagemProps) {
  return (
    <p role={tipo === "erro" ? "alert" : "status"} className={`mb-6 rounded-lg border px-4 py-3 ${estilos[tipo]}`}>
      {children}
    </p>
  );
}

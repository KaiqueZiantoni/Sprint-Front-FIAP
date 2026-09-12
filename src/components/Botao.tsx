import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VarianteBotao } from "../types";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: VarianteBotao;
}

/**
 * `satisfies` garante em tempo de compilação que TODAS as variantes
 * do union type VarianteBotao possuem um estilo definido.
 */
const estilosVariante = {
  primario:
    "bg-verde-folha text-white shadow-lg shadow-verde-folha/25 hover:bg-verde-escuro hover:shadow-verde-folha/40",
  secundario:
    "border-2 border-white/50 bg-white/5 text-white hover:border-white hover:bg-white/15",
  fantasma:
    "text-verde-folha hover:bg-verde-folha/10",
} satisfies Record<VarianteBotao, string>;

export default function Botao({
  children,
  variante = "primario",
  className = "",
  ...props
}: BotaoProps) {
  return (
    <button
      className={`cursor-pointer rounded-full px-6 py-2.5 font-semibold transition-all duration-300 ${estilosVariante[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/** Indicador exibido enquanto a API responde. */
export default function Carregando({ texto = "Carregando dados da API..." }: { texto?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 py-8 text-white/80">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-verde-folha" aria-hidden="true" />
      {texto}
    </div>
  );
}

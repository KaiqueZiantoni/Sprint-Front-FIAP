interface PageHeroProps {
  titulo: string;
  destaque: string;
  subtitulo?: string;
  inverterOrdem?: boolean;
}

// Cabeçalho reutilizável das páginas internas.
// Recebe o texto via props, mantendo o padrão visual da Sprint 02.
export default function PageHero({
  titulo,
  destaque,
  subtitulo,
  inverterOrdem = false,
}: PageHeroProps) {
  return (
    <header className="px-[5%] py-10 text-center md:py-14">
      <h1 className="text-3xl font-bold md:text-5xl">
        {inverterOrdem ? (
          <>
            <span className="text-verde-folha">{titulo}</span> {destaque}
          </>
        ) : (
          <>
            {titulo} <span className="text-verde-folha">{destaque}</span>
          </>
        )}
      </h1>
      {subtitulo && (
        <p className="mt-3 text-lg text-white/85 md:text-xl">{subtitulo}</p>
      )}
    </header>
  );
}

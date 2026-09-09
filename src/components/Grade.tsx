import type { ReactNode } from "react";
import type { ColunasGrade } from "../types";

interface GradeProps<T> {
  itens: readonly T[];
  extrairChave: (item: T) => string | number;
  renderizarItem: (item: T, indice: number) => ReactNode;
  colunas?: ColunasGrade;
}

const classesColunas: Record<ColunasGrade, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

/**
 * Componente genérico de grade responsiva.
 * O parâmetro de tipo <T> permite reutilizá-lo com qualquer
 * estrutura de dados (funcionalidades, integrantes, etapas...).
 */
export default function Grade<T>({
  itens,
  extrairChave,
  renderizarItem,
  colunas = 3,
}: GradeProps<T>) {
  return (
    <div className={`grid gap-6 ${classesColunas[colunas]}`}>
      {itens.map((item, indice) => (
        <div key={extrairChave(item)} className="h-full">
          {renderizarItem(item, indice)}
        </div>
      ))}
    </div>
  );
}

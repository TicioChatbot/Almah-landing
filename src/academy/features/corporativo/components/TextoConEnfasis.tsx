import { Fragment } from "react";
import type { Fragmento } from "../types";

// Párrafo con partes en negrita. El índice sirve de key porque el contenido es fijo.
export function TextoConEnfasis({ fragmentos }: { fragmentos: readonly Fragmento[] }) {
  return (
    <>
      {fragmentos.map((fragmento, indice) =>
        typeof fragmento === "string" ? (
          <Fragment key={indice}>{fragmento}</Fragment>
        ) : (
          <strong key={indice} className="font-bold">
            {fragmento.fuerte}
          </strong>
        ),
      )}
    </>
  );
}

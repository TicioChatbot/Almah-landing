import type { Imagen } from "@/types/content";

export type Docente = {
  nombre: string;
  cargo: string;
  /** Línea debajo del cargo */
  especialidad?: string;
  foto: Imagen;
};

import type { Aliado } from "@/types/content";

export type Edicion = {
  slug: string;
  titulo: string;
  aliado: Aliado;
  detalles: {
    cupos: string;
    duracion: string;
    precio: string;
  };
  techStack: string[];
  /** Enlace de Canva. Si no hay, no se muestra el botón */
  brochureUrl?: string;
};

import type { Aliado, Imagen } from "@/types/content";

export type Logro = {
  titulo: string;
  detalle: string;
};

// Ej: Duración / 11 horas
export type DatoCurso = {
  etiqueta: string;
  valor: string;
};

export type Modulo = {
  numero: number;
  titulo: string;
  duracion: string;
  modalidad: "Virtual" | "Híbrido" | "Presencial";
};

export type EstadoCurso =
  | "abierto" // fecha y precio confirmados
  | "por-confirmar" // falta fecha o precio
  | "contenido-pendiente"; // todavía sin programa

export type Curso = {
  slug: string;
  titulo: string;
  estado: EstadoCurso;
  banner: Imagen;
  aliado?: Aliado;
  /** Intermedio, Introductorio, etc. */
  nivel?: string;
  dirigidoA?: string;
  /** Duración, formato, cupos... */
  datos?: DatoCurso[];
  logros?: Logro[];
  modulos?: Modulo[];
  herramientas?: string[];
  /** PDF con el programa */
  brochure?: { href: string; etiqueta: string };
  /** En COP. null mientras no esté confirmado */
  precioCOP: number | null;
};

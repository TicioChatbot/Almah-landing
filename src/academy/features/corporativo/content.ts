import type { Fragmento } from "./types";

// Bloque de la home que lleva a "Crea tu curso"
export const PROGRAMA_A_MEDIDA = {
  antetitulo: "Para firmas y organizaciones",
  titulo: "¿Tu firma necesita su propio curso?",
  lead: "Diseñamos programas para firmas de abogados y organizaciones. Partimos de sus áreas de práctica, sus documentos y sus herramientas, y el equipo termina con flujos de trabajo funcionando. Presencial, híbrido o virtual, según el calendario de la firma.",
  cta: "Cuéntanos tu propuesta",
} as const;

export const HERO_CORPORATIVO = {
  titulo: "Cursos a la medida para firmas y organizaciones",
  bajada:
    "Programas de IA aplicada, diseñados con tu equipo sobre sus propios documentos y herramientas.",
} as const;

// Párrafos de la banda verde
export const INTRO_CORPORATIVA: readonly (readonly Fragmento[])[] = [
  [
    "Cada firma trabaja distinto: otras áreas de práctica, otros documentos, otras herramientas. Por eso no vendemos un curso cerrado.",
  ],
  [
    "Cuéntanos qué hace tu equipo y en qué pierde tiempo, y ",
    { fuerte: "diseñamos con ustedes el programa" },
    ": contenidos, ejercicios y entregables sobre sus expedientes reales.",
  ],
];

// Pasos de "Cómo trabajamos"
export const PASOS_CORPORATIVOS: readonly {
  readonly titulo: string;
  readonly detalle: readonly Fragmento[];
}[] = [
  {
    titulo: "Diagnóstico",
    detalle: [
      "Revisamos con tu equipo sus áreas de práctica, sus flujos de trabajo y su nivel de uso de herramientas digitales.",
    ],
  },
  {
    titulo: "Diseño del programa",
    detalle: [
      "Definimos módulos, herramientas y entregables a partir de las tareas que más tiempo consumen. ",
      { fuerte: "Presencial, híbrido o virtual" },
      ", sin interrumpir la operación de la firma.",
    ],
  },
  {
    titulo: "Talleres con sus propios documentos",
    detalle: [
      "Bajo acuerdo de confidencialidad, trabajamos sobre las plantillas y expedientes reales del equipo. ",
      { fuerte: "Cada sesión termina con algo funcionando" },
      ".",
    ],
  },
  {
    titulo: "Entregables y seguimiento",
    detalle: [
      "El equipo se queda con sus flujos, un ",
      { fuerte: "repositorio de instrucciones propio de la firma" },
      " y acompañamiento posterior. Medimos el uso real después del curso.",
    ],
  },
];

// Formulario de propuesta
export const FORMULARIO_CORPORATIVO = {
  titulo: "Solicita una propuesta para tu equipo",
  lead: "Cuéntanos qué hace tu equipo y en qué quiere mejorar. Con eso preparamos la propuesta y te la enviamos por correo.",
} as const;

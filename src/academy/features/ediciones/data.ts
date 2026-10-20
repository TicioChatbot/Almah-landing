import type { Edicion } from "./types";

// Ediciones anteriores, con enlace al brochure en Canva.
export const EDICIONES: Edicion[] = [
  {
    slug: "ia-derecho-comercial",
    titulo: "Taller práctico de aplicación de la IA en derecho comercial",
    aliado: {
      nombre: "Colegio de Abogados Comercialistas",
      necesitaFondo: "claro",
      logo: {
        src: "/assets/partners/colegio-abogados-comercialistas.png",
        alt: "Colegio de Abogados Comercialistas",
        width: 263,
        height: 90,
      },
    },
    detalles: {
      cupos: "30 cupos",
      duracion: "10 horas sincrónicas",
      precio: "$800.000 COP",
    },
    techStack: ["ChatGPT Plus", "Copilot Pro", "Dialogflow", "Azure"],
    brochureUrl: "https://canva.link/805ivugh15r44w6",
  },
  {
    slug: "ia-abogado-seguros",
    titulo: "Ciclo de talleres: IA para el abogado de seguros",
    aliado: {
      nombre: "ACOLDESE — Asociación Colombiana de Derecho de Seguros",
      necesitaFondo: "claro",
      logo: {
        src: "/assets/partners/acoldese.png",
        alt: "ACOLDESE — Asociación Colombiana de Derecho de Seguros",
        width: 274,
        height: 193,
      },
    },
    detalles: {
      cupos: "30 cupos",
      duracion: "10 horas sincrónicas",
      precio: "$800.000 COP",
    },
    techStack: ["ChatGPT Plus", "Claude", "Gemini", "Gamma"],
    brochureUrl: "https://canva.link/2eeyfim3sb9xa3k",
  },
  {
    slug: "ia-procedimiento-arbitral",
    titulo: "IA en el procedimiento arbitral",
    aliado: {
      nombre: "Comité Colombiano de Arbitraje",
      necesitaFondo: "claro",
      logo: {
        src: "/assets/partners/comite-colombiano-arbitraje-oscuro.png",
        alt: "Comité Colombiano de Arbitraje",
        width: 191,
        height: 82,
      },
    },
    detalles: {
      cupos: "25 cupos",
      duracion: "22 horas sincrónicas",
      precio: "$980.000 COP",
    },
    techStack: [
      "ChatGPT",
      "Claude",
      "NotebookLM",
      "Google Opal",
      "n8n",
      "Napkin",
    ],
    brochureUrl: "https://canva.link/dnameszurpystt5",
  },
  {
    slug: "ia-derecho-societario",
    titulo: "Uso de inteligencia artificial en el derecho societario",
    aliado: {
      nombre: "IDEAS — Instituto de Análisis Societario",
      necesitaFondo: "claro",
      logo: {
        src: "/assets/partners/ideas-societario.png",
        alt: "IDEAS — Instituto de Análisis Societario",
        width: 498,
        height: 373,
      },
    },
    detalles: {
      cupos: "Pendiente",
      duracion: "10 horas sincrónicas",
      precio: "Info pendiente",
    },
    techStack: ["Gemini", "Claude"],
    // TODO: falta el brochure (sin brochureUrl no se muestra el botón)
  },
  {
    slug: "ia-bermudez-ulloa",
    titulo: "Prácticas para el uso de IA en Bermúdez & Ulloa Asociados",
    aliado: {
      nombre: "Bermúdez Ulloa · EQUM (Consultoría Legal y Tributaria)",
      // Logo blanco, necesita fondo oscuro
      necesitaFondo: "oscuro",
      logo: {
        src: "/assets/partners/bermudez-ulloa.png",
        alt: "Bermúdez Ulloa · EQUM, Consultoría Legal y Tributaria",
        width: 2237,
        height: 950,
      },
    },
    detalles: {
      cupos: "Pendiente",
      duracion: "24 horas sincrónicas",
      precio: "Info pendiente",
    },
    techStack: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "NotebookLM",
      "Microsoft Azure",
      "Dialogflow",
      "AI Builder",
    ],
    // TODO: falta el brochure
  },
];

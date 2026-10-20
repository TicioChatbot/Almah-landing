import type { Curso } from "./types";

// Próximos cursos. Esta lista también llena el selector de curso del
// formulario de inscripción. Los campos opcionales que falten no se muestran.
export const CURSOS: Curso[] = [
  {
    slug: "buenas-practicas-ia",
    titulo: "Taller de buenas prácticas para el uso de IA",
    estado: "por-confirmar",
    banner: {
      src: "/assets/cursos/proximo-curso-1.jpeg",
      alt: "Taller de buenas prácticas para el uso de IA",
      width: 1080,
      height: 429,
    },
    aliado: {
      nombre: "Cámara de Comercio de Bucaramanga",
      necesitaFondo: "claro",
      logo: {
        src: "/assets/partners/camara-bucaramanga.png",
        alt: "Cámara de Comercio de Bucaramanga",
        width: 564,
        height: 621,
      },
    },
    // Sin nivel ni dirigidoA: todavía no tenemos esa información
    datos: [
      { etiqueta: "Duración", valor: "20 horas formativas" },
      {
        etiqueta: "Formato",
        valor: "8 h sincrónicas en dos sábados + trabajo asincrónico y acompañamiento técnico",
      },
      { etiqueta: "Certificación", valor: "Al validar tus nuevos flujos de trabajo" },
      { etiqueta: "Fecha e inversión", valor: "Por confirmar" },
    ],
    logros: [
      {
        titulo: "Ingeniería de prompts legal",
        detalle:
          "Ahorra hasta 10 horas a la semana dominando la redacción de instrucciones precisas.",
      },
      {
        titulo: "Análisis e investigación avanzada",
        detalle:
          "Procesa expedientes de más de 500 páginas en menos de 5 minutos.",
      },
      {
        titulo: "Uso ético y regulatorio",
        detalle:
          "Implementa protocolos de confidencialidad, privacidad y gestión de datos 100% adaptados a la normativa jurídica vigente.",
      },
      {
        titulo: "Diagnóstico y acompañamiento",
        detalle: "Accede a tutorías académicas exclusivas.",
      },
    ],
    precioCOP: null,
  },
  {
    slug: "curso-arbitraje",
    titulo:
      "Curso intermedio de inteligencia artificial aplicada al procedimiento arbitral",
    // Falta confirmar fecha e inversión
    estado: "por-confirmar",
    banner: {
      src: "/assets/cursos/proximo-curso-2.jpg",
      alt: "Grupo de abogados en una reunión de trabajo",
      // Foto original en 4:3, object-cover hace el recorte
      width: 4608,
      height: 3456,
    },
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
    nivel: "Intermedio",
    // Información tomada del brochure del curso
    dirigidoA:
      "Árbitros, secretarios de tribunal y abogados con experiencia en arbitraje que buscan profundizar en el uso de la IA en su práctica profesional.",
    datos: [
      { etiqueta: "Duración", valor: "11 horas en 5 módulos" },
      {
        etiqueta: "Formato",
        valor: "4 módulos virtuales de 2 h y un módulo híbrido de 3 h",
      },
      { etiqueta: "Cupos", valor: "20 personas" },
      {
        etiqueta: "Herramienta",
        valor: "Suscripción a Claude Pro (único gasto adicional)",
      },
      { etiqueta: "Fecha e inversión", valor: "Por confirmar" },
    ],
    modulos: [
      {
        numero: 1,
        titulo:
          "Ingeniería de prompts intermedia y modelos de razonamiento cognitivo",
        duracion: "2 h",
        modalidad: "Virtual",
      },
      {
        numero: 2,
        titulo: "Investigación jurídica arbitral y seguimiento automatizado",
        duracion: "2 h",
        modalidad: "Virtual",
      },
      {
        numero: 3,
        titulo: "Flujos de IA para la gestión de procesos arbitrales",
        duracion: "2 h",
        modalidad: "Virtual",
      },
      {
        numero: 4,
        titulo:
          "De papeles a datos para simplificar información jurídica arbitral con IA",
        duracion: "2 h",
        modalidad: "Virtual",
      },
      {
        numero: 5,
        titulo: "Gestión inteligente de expedientes arbitrales con NotebookLM",
        duracion: "3 h",
        modalidad: "Híbrido",
      },
    ],
    // Metodología
    logros: [
      {
        titulo: "Laboratorios de personalización",
        detalle:
          "Creación de agentes, instrucciones estructuradas y flujos específicos para la gestión arbitral.",
      },
      {
        titulo: "Talleres aplicados",
        detalle:
          "Diseño de soluciones prácticas para plantillas CLM, investigación jurídica y análisis de expedientes voluminosos.",
      },
      {
        titulo: "Retroalimentación en tiempo real",
        detalle:
          "Interacción en directo para mejorar habilidades y precisión jurídica.",
      },
    ],
    herramientas: ["Claude Pro", "Gemini", "NotebookLM", "Miro", "Google Opal"],
    brochure: {
      // Versión comprimida del PDF original
      href: "/assets/brochures/curso-ia-procedimiento-arbitral.pdf",
      etiqueta: "Programa en PDF",
    },
    precioCOP: null,
  },
];

// Opciones del selector de curso en la inscripción
export const OPCIONES_CURSO = CURSOS.map((curso) => ({
  value: curso.slug,
  label: curso.titulo,
}));

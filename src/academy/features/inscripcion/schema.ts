import { z } from "zod";
import { CURSOS } from "@/features/cursos/data";
import { emailSchema, nombreSchema } from "@/lib/validation";

const SLUGS_CURSO = CURSOS.map((curso) => curso.slug) as [string, ...string[]];

// Acepta formato local o internacional
const telefono = z
  .string()
  .trim()
  .min(7, "El teléfono parece incompleto.")
  .max(20, "El teléfono es demasiado largo.")
  .regex(/^\+?[\d\s().-]+$/, "El teléfono solo admite números y + ( ) - .");

export const inscripcionSchema = z.object({
  nombre: nombreSchema,
  email: emailSchema,
  telefono,
  curso: z.enum(SLUGS_CURSO, { message: "Elige un curso." }),
  cantidad: z.coerce
    .number()
    .int("Indica un número entero de cupos.")
    .min(1, "Reserva al menos un cupo.")
    .max(50, "Para más de 50 cupos, escríbenos directamente."),
  pais: z.string().min(1, "Elige un país."),
});

export type InscripcionInput = z.infer<typeof inscripcionSchema>;

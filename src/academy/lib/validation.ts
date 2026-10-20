import { z } from "zod";

// Campos comunes de los formularios. Los esquemas viven en cada feature para
// poder reutilizarlos en el servidor (la validación en cliente no es suficiente).

export const nombreSchema = z
  .string()
  .trim()
  .min(2, "Escribe tu nombre completo.")
  .max(120, "El nombre es demasiado largo.");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "El correo es obligatorio.")
  .max(254)
  .email("Revisa el formato del correo.");

// Devuelve el primer error de cada campo
export function erroresPorCampo(
  error: z.ZodError,
): Record<string, string> {
  const salida: Record<string, string> = {};
  for (const issue of error.issues) {
    const campo = String(issue.path[0] ?? "");
    if (campo && !salida[campo]) salida[campo] = issue.message;
  }
  return salida;
}

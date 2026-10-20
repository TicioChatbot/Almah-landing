import { z } from "zod";
import { emailSchema, nombreSchema } from "@/lib/validation";

export const propuestaCorporativaSchema = z.object({
  nombre: nombreSchema,
  email: emailSchema,
  empresa: z
    .string()
    .trim()
    .min(2, "Indica el nombre de tu empresa, firma o entidad.")
    .max(160),
  cargo: z.string().trim().min(2, "Indica tu cargo o rol.").max(120),
  necesidad: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más para poder prepararte una propuesta.")
    .max(2000, "Resume tu necesidad en menos de 2000 caracteres."),
});

export type PropuestaCorporativaInput = z.infer<
  typeof propuestaCorporativaSchema
>;

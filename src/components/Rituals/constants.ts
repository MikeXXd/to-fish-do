import { z } from "zod";
import { IMPORTANCE } from "../../constants";

export const RITUAL_REMINDER = ["daily", "weekly", "monthly"] as const;

export const ritualSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(21, { message: "Title must have at most 32 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must have at least 3 characters" }),
  importance: z.union([z.enum(IMPORTANCE), z.null()]).nullable(),
  reminder: z.union([z.enum(RITUAL_REMINDER), z.null()]).nullable(),
  frequency: z.coerce
    .number()
    .int()
    .min(1, { message: "1 is the minimum" })
    .max(100, { message: "100 is the maximum" })
});

export type RitualFormData = z.infer<typeof ritualSchema>;

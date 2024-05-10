import { z } from "zod";

export const IMPORTANCE = ["low", "medium", "high"] as const;

export const ritualSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must have at least 3 characters" })
      .max(21, { message: "Title must have at most 32 characters" }),
    description: z
      .string()
      .min(3, { message: "Description must have at least 3 characters" }),
    importance: z.union([z.enum(IMPORTANCE), z.null()]).nullable()
  });

export type RitualFormData = z.infer<typeof ritualSchema>;

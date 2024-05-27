import { z } from "zod";
import { IMPORTANCE } from "../../constants";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(100, { message: "Title must have at most 100 characters" }),
  importance: z.union([z.enum(IMPORTANCE), z.null()]).nullable()
});

export type TaskFormData = z.infer<typeof taskSchema>;

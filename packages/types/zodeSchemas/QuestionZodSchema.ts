import { z } from "zod";

export const addQuestionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long"),

  platform: z
    .string()
    .min(1, "Platform is required"),

  link: z
    .string()
    .min(1, "Link is required")
    .url("Invalid URL"),

  resource: z
    .string()
    .url("Invalid resource link")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(2000, "Notes too long")
    .optional(),
});

export type AddQuestionInput = z.infer<typeof addQuestionSchema>;
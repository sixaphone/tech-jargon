import { z } from "zod";

const Scope = z.enum([
  "frontend",
  "backend",
  "devops",
  "design",
  "management",
  "other",
]);

export const Scopes = Scope.Values;

export type Scope = z.infer<typeof Scope>;

const Level = z.enum(["simple", "advanced", "complex"]);

export const Levels = Level.Values;

export type Level = z.infer<typeof Level>;

export const GenerateJargonSchema = z.object({
  text: z.string().min(1).max(255),
  level: Level,
  scope: Scope.optional(),
});

export type GenerateJargonDto = z.infer<typeof GenerateJargonSchema>;

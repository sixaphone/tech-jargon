"use server";
import { SCOPES } from "@/constants/scopes";
import { type Scope, TechJargonService } from "@/lib/jargon";
import { Level } from "@/models/jargon";
import "server-only";

export async function generateResponse(
  message: string,
  level: Level,
  scope?: Scope
) {
  const service = new TechJargonService(process.env.CLAUDE_API_KEY ?? "");

  return service.generateJargon(
    message,
    level,
    scope ?? SCOPES[Math.floor(Math.random() * SCOPES.length)]
  );
}

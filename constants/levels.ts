import { Level, Levels } from "@/models/jargon";

export const LEVELS_NUMERIC_MAP = new Map<Level, number>([
  [Levels.simple, 1],
  [Levels.advanced, 2],
  [Levels.complex, 3],
]);

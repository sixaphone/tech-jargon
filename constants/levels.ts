import { Level, Levels, PatternTuple } from "@/models/jargon";
import { ADVANCED_PATTERN, COMPLEX_PATTERN, SIMPLE_PATTERN } from "./sentences";

export const LEVELS_PATTERN_MAP = new Map<Level, PatternTuple[]>([
  [Levels.simple, SIMPLE_PATTERN],
  [Levels.advanced, ADVANCED_PATTERN],
  [Levels.complex, COMPLEX_PATTERN],
]);

import { LEVELS_PATTERN_MAP } from "@/constants/levels";
import { SUBSTITUTIONS, TERMS } from "@/constants/sentences";
import { Level, Scope } from "@/models/jargon";
import Anthropic from "@anthropic-ai/sdk";

class TechJargonGenerator {
  public generate(text: string, level: Level, scope: Scope): string {
    console.log({
      text,
      level,
      scope,
    })
    let replacements = [
      ...text
        .split(" ")
        .flatMap((word) => TERMS[word])
        .filter(Boolean),
      ...SUBSTITUTIONS[scope],
      ...SUBSTITUTIONS.general,
    ];
    const patterns = LEVELS_PATTERN_MAP.get(level)!;

    return patterns
      .map(([replacementCount, pattern]) => {
        let sentence = pattern;

        for (let i = 1; i <= replacementCount; i++) {
          const randomIndex = this._getRandomIndex(replacements);
          const randomReplacement = replacements[randomIndex];
          sentence = sentence.replace(`$${i}`, randomReplacement);
          replacements = replacements.toSpliced(randomIndex, 1);
        }

        return sentence;
      })
      .join(" ");
  }

  private _getRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
  }
}

class TechJargonService {
  private readonly localGenerator: TechJargonGenerator;
  private readonly claude: Anthropic;

  constructor(private readonly apiKey: string) {
    this.localGenerator = new TechJargonGenerator();
    this.claude = new Anthropic({ apiKey: this.apiKey });
  }

  async generateJargon(
    input: string,
    level: Level,
    scope: Scope
  ): Promise<string> {
    if (this.apiKey) {
      try {
        return await this.generateWithClaude(input, scope);
      } catch (error) {
        console.warn(
          "Claude API error, falling back to local generator:",
          error
        );
        console.error(error);
        return this.localGenerator.generate(input, level, scope);
      }
    }

    return this.localGenerator.generate(input, level, scope);
  }

  private async generateWithClaude(
    input: string,
    scope: Scope
  ): Promise<string> {
    const prompt = `Convert this phrase into technical jargon specifically for ${scope} domain: "${input}". 
                       Make it sound more technical and complex, using terminology specific to ${scope}.
                       Only respond with the converted text, no explanations.`;

    const messages = [
      {
        role: "user" as const,
        content: prompt,
      },
    ];

    try {
      const msg = await this.claude.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages,
      });

      const [response] = msg.content;

      if (response.type === "text") {
        return response.text;
      }

      throw new Error("Failed to generate jargon with Claude API");
    } catch (error) {
      console.warn("Claude API error:", error);
      throw new Error("Failed to generate jargon with Claude API");
    }
  }
}

export { TechJargonService, type Scope };

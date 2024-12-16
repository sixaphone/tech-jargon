import { LEVELS_NUMERIC_MAP } from "@/constants/levels";
import { SENTENCES } from "@/constants/sentences";
import { Level, Scope } from "@/models/jargon";
import Anthropic from "@anthropic-ai/sdk";

class TechJargonGenerator {
  public generate(text: string, level: Level, scope: Scope): string {
    const words = text.split(" ");
    const complexity = LEVELS_NUMERIC_MAP.get(level) ?? 1;
    const sentenceCount = words.length * complexity;

    const sentencesToUse = [...SENTENCES[scope], ...SENTENCES.general];

    const jargon = [];
    for (let i = 0; i < sentenceCount; i++) {
      const idx = this._getRandomIndex(sentencesToUse);
      jargon.push(sentencesToUse.splice(idx, 1));
    }

    return jargon.join(". ");
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

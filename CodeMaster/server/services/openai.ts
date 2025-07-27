import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface CodeExplanation {
  overview: string;
  stepByStep: string[];
  timeComplexity: string;
  spaceComplexity: string;
  keyConcepts: string[];
}

export interface AlgorithmVisualization {
  title: string;
  description: string;
  steps: {
    step: number;
    description: string;
    code: string;
    visualization: string;
  }[];
  complexity: {
    time: string;
    space: string;
  };
}

export async function explainCode(code: string, language: string): Promise<CodeExplanation> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert programming tutor. Analyze the provided ${language} code and provide a comprehensive explanation. Respond with JSON in this format: { "overview": "string", "stepByStep": ["string"], "timeComplexity": "string", "spaceComplexity": "string", "keyComcepts": ["string"] }`,
        },
        {
          role: "user",
          content: `Explain this ${language} code step by step:\n\n${code}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      overview: result.overview || "Unable to generate overview",
      stepByStep: result.stepByStep || [],
      timeComplexity: result.timeComplexity || "Not specified",
      spaceComplexity: result.spaceComplexity || "Not specified",
      keyConcepts: result.keyConcepts || [],
    };
  } catch (error) {
    throw new Error("Failed to explain code: " + (error as Error).message);
  }
}

export async function generateAlgorithmVisualization(
  algorithm: string,
  problemDescription: string
): Promise<AlgorithmVisualization> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert algorithm visualizer. Create a step-by-step visualization for the given algorithm and problem. Respond with JSON in this format: { "title": "string", "description": "string", "steps": [{"step": number, "description": "string", "code": "string", "visualization": "string"}], "complexity": {"time": "string", "space": "string"} }`,
        },
        {
          role: "user",
          content: `Create a visual explanation for the ${algorithm} algorithm to solve: ${problemDescription}. Include step-by-step code execution and describe how the data structures change at each step.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      title: result.title || algorithm,
      description: result.description || "Algorithm visualization",
      steps: result.steps || [],
      complexity: result.complexity || { time: "Not specified", space: "Not specified" },
    };
  } catch (error) {
    throw new Error("Failed to generate algorithm visualization: " + (error as Error).message);
  }
}

export async function generateProblemHints(
  problemTitle: string,
  problemDescription: string,
  difficulty: string
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful coding interview mentor. Generate progressive hints for the given problem. Start with high-level approaches and gradually provide more specific guidance. Respond with JSON in this format: { "hints": ["string"] }`,
        },
        {
          role: "user",
          content: `Generate 3-5 progressive hints for this ${difficulty} difficulty problem:\n\nTitle: ${problemTitle}\n\nDescription: ${problemDescription}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.hints || [];
  } catch (error) {
    throw new Error("Failed to generate hints: " + (error as Error).message);
  }
}

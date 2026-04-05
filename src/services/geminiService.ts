import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function summarizeProject(title: string, description: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following project description in 2-3 concise sentences highlighting its purpose, scope, and key objectives.
      
      Project Title: ${title}
      Project Description: ${description}`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Error summarizing project:", error);
    return "Error generating summary. Please try again.";
  }
}

export async function getLatestIndustryUpdates(): Promise<{text: string, sources: any[]}> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the latest developments, news, and trends in Generative AI for Fintech, Banking, and Compliance? Provide a concise 2-paragraph summary.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text: response.text || "Could not fetch updates.",
      sources: chunks
    };
  } catch (error) {
    console.error("Error fetching updates:", error);
    return { text: "Error fetching latest updates. Please try again later.", sources: [] };
  }
}

export async function estimateProjectFeasibility(difficulty: string, duration: string, skills: string[]): Promise<{score: number, explanation: string} | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Estimate the feasibility of a project based on the following factors:
      - Difficulty Level: ${difficulty}
      - Estimated Duration: ${duration}
      - Required Skills: ${skills.join(", ")}

      Calculate a feasibility score on a scale of 1-5 (1 = very low feasibility/high risk, 5 = very high feasibility/low risk).
      Provide a brief explanation (2-3 sentences) justifying the score, referencing which factors positively or negatively impacted it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Feasibility score from 1 to 5" },
            explanation: { type: Type.STRING, description: "2-3 sentence explanation justifying the score" }
          },
          required: ["score", "explanation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error estimating feasibility:", error);
    return null;
  }
}

export async function generateProjectTags(title: string, description: string, milestones: string[]): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 5-8 relevant tags for the following project. Include categories like project type, department, priority level, technology stack, and status.
      
      Project Title: ${title}
      Project Description: ${description}
      Milestones: ${milestones.join(", ")}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Error generating tags:", error);
    return [];
  }
}

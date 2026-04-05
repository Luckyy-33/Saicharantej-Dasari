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

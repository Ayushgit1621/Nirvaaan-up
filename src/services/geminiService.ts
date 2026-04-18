import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SymptomAnalysis {
  isEmergency: boolean;
  emergencyMessage?: string;
  detectedSymptoms: string[];
  probableConditions: {
    condition: string;
    probability: number; // 0-100
  }[];
}

export async function analyzeSymptoms(query: string): Promise<SymptomAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the following symptoms described by a patient: "${query}". 
    Identify if it's a medical emergency. 
    Extract the specific symptoms. 
    List probable medical conditions with their estimated likelihood (0-100%).
    Provide the response in a structured JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isEmergency: { type: Type.BOOLEAN },
          emergencyMessage: { type: Type.STRING },
          detectedSymptoms: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          probableConditions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING },
                probability: { type: Type.NUMBER }
              },
              required: ["condition", "probability"]
            }
          }
        },
        required: ["isEmergency", "detectedSymptoms", "probableConditions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to get analysis from AI");
  return JSON.parse(text);
}

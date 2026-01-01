
import { GoogleGenAI, Type } from "@google/genai";
import { SystemEvent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getThreatExplanation = async (event: SystemEvent) => {
  try {
    const prompt = `Analyze this security event for Project AURA (an Operating System Empath):
    Event: ${event.title}
    Description: ${event.description}
    Source: ${event.source}
    Severity: ${event.severity}
    Codename: ${event.codename || 'N/A'}

    Provide a professional, technical, yet Norse-themed "Expanable AI" explanation. 
    Explain why it's a threat, what "ripples" it might cause, and a recommended action. 
    Format as JSON with fields: 'analysis', 'impact', 'remediation'.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            impact: { type: Type.STRING },
            remediation: { type: Type.STRING }
          },
          required: ["analysis", "impact", "remediation"]
        },
        systemInstruction: "You are the AURA Core AI, an OS Empath. You speak with technical precision and a subtle Norse warrior-sentinel tone."
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini AI error:", error);
    return {
      analysis: "Unable to reach AURA Core for detailed analysis. Local heuristics suggest continued isolation.",
      impact: "Potential system compromise if unmitigated.",
      remediation: "Initiate manual quarantine protocol immediately."
    };
  }
};

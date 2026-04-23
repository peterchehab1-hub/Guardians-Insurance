import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const aiService = {
  async chatWithAI(message: string, context?: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${context ? `Context: ${context}\n\n` : ''}User: ${message}`,
        config: {
          systemInstruction: "You are an insurance expert at Guardians Insurance, a professional insurance agency in Lebanon. Be helpful, professional, and clear. Answer questions about health, car, home, travel, and business insurance.",
          temperature: 0.7,
        }
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("AI Error:", error);
      return "I'm having trouble connecting to the AI expert right now. Please try again later.";
    }
  },

  async dashboardAssistant(query: string, dataSummary: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Dashboard Data Summary: ${dataSummary}\n\nAdmin Query: ${query}`,
        config: {
          systemInstruction: "You are the Guardians Management Assistant. You help the admin manage clients, services, and payments. Analyze the data if provided and suggest actions or answer questions about the agency's performance.",
          temperature: 0.5,
        }
      });
      return response.text || "Understood. How else can I help with the dashboard?";
    } catch (error) {
      console.error("AI Assistant Error:", error);
      return "Dashboard assistant is temporarily unavailable.";
    }
  }
};

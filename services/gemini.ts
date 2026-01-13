
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMotorAdvice = async (userPreference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User asks: "${userPreference}". Berdasarkan katalog motor umum (Matic, Sport, Cub, Big Bike), berikan saran motor terbaik untuk mereka. Berikan jawaban dalam Bahasa Indonesia yang ramah dan singkat. Fokus pada kebutuhan seperti efisiensi bensin, kenyamanan, atau gaya.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, sistem rekomendasi kami sedang istirahat. Silakan pilih motor impian Anda di katalog!";
  }
};

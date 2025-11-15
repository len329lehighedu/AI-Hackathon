
import { GoogleGenAI } from "@google/genai";
import { Review } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development, but the environment must have the API key.
  console.warn("API_KEY is not set in environment variables. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const summarizeReviews = async (reviews: Review[]): Promise<string> => {
  if (reviews.length === 0) {
    return "No reviews available to summarize.";
  }
  
  if (!API_KEY) {
    return "API Key not configured. Cannot summarize reviews.";
  }

  const prompt = `Summarize the following student reviews for a university course. Focus on common themes, both positive and negative, regarding the professor, workload, and content. Provide a balanced overview in a few sentences.

Reviews:
${reviews.map(r => `- Rating: ${r.rating}/10. Comment: "${r.comment}"`).join('\n')}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not generate AI summary due to an error.";
  }
};

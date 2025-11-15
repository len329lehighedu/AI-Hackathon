import { GoogleGenAI, Chat } from "@google/genai";
import { Review, Course } from "../types";

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


let chat: Chat | null = null;

export const startChat = (courses: Course[]): Chat => {
  if (chat) {
    // To simplify, we don't reset the chat context. 
    // A more advanced implementation might reset if the course list changes significantly.
    return chat;
  }
  
  if (!API_KEY) {
    throw new Error("API Key not configured. Cannot start chat.");
  }

  const courseInfo = JSON.stringify(courses.map(c => ({ 
    id: c.id, 
    title: c.title, 
    description: c.description, 
    credits: c.credits, 
    prerequisites: c.prerequisites,
    sections: c.sections.map(s => `${s.type} ${s.time} at ${s.location}`).join(', ')
  })));

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a friendly and knowledgeable academic advisor for Lehigh University. Your goal is to help students plan their courses. You have access to the following course data (in JSON format):\n\n${courseInfo}\n\nAnswer student questions about courses, prerequisites, schedules, and potential study paths. Use the provided data to give accurate answers. Be concise and helpful. If you don't know something based on the data, say so. Do not make up information.`,
    },
  });
  return chat;
};

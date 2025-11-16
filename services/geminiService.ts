import { GoogleGenAI, Chat } from "@google/genai";
import { Review, Course, Major } from "../types";

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

  const reviewsText = reviews.map(r => {
    return `- Ratings (1-5 scale, 5=best, except difficulty where 5=hardest): Difficulty: ${r.ratings.difficulty}, Workload: ${r.ratings.workload} hrs/wk, Clarity: ${r.ratings.clarity}, Fairness: ${r.ratings.fairness}, Usefulness: ${r.ratings.usefulness}, Engagement: ${r.ratings.engagement}. Comment: "${r.comment}"`
  }).join('\n');

  const prompt = `Summarize the following student reviews for a university course. Focus on common themes, both positive and negative, regarding the professor's clarity, grading fairness, course difficulty, workload, and usefulness of materials. Provide a balanced overview in a few sentences.

Reviews:
${reviewsText}
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

export const startChat = (courses: Course[], majors: Major[]): Chat => {
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
  
  const majorInfo = JSON.stringify(majors.map(m => ({
    name: m.name,
    requiredCourses: m.requiredCourses
  })));

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a friendly and knowledgeable academic advisor for Lehigh University. Your goal is to help students plan their courses in a simple and clear way. You have access to the following course data (in JSON format):\n\n${courseInfo}\n\nAnd the following major requirement data:\n\n${majorInfo}\n\nAnswer student questions about courses, prerequisites, schedules, and study paths. When answering, follow these rules:\n1. Be direct and use simple language. Avoid complex sentences.\n2. When suggesting courses, use a bulleted list.\n3. Keep your tone encouraging and straightforward.\n4. Stick strictly to the provided data. If the information isn't in the data, just say you don't have that information.\n5. Do not make up any information.`,
    },
  });
  return chat;
};
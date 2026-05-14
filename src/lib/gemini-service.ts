import { GoogleGenAI } from "@google/genai";
import { BlogPost, CATEGORIES } from "./blog-data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateNewBlogPost(topic?: string): Promise<Partial<BlogPost> | null> {
  const model = "gemini-3-flash-preview";
  
  const selectedTopic = topic || "Latest South African political developments regarding the GNU and economic reforms";
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  const prompt = `
    Act as a professional journalist, SEO expert, and content strategist. 
    Write a detailed, engaging, and fact-based blog post on this latest news or current affairs topic from South Africa: "${selectedTopic}".
    Target Category: "${category}"

    Follow these instructions carefully:
    
    1. Headline: Highly clickable, emotional, and SEO-optimized (CTR-focused).
    2. Introduction: Engaging hook, explanation of importance.
    3. Background: Context for beginners.
    4. Main Content: H2/H3 headings, latest developments, facts/data/stats, expert insights, real-world impact.
    5. Formatting: Bullet points, short paragraphs.
    6. Key Takeaways: A list of 3 items.
    7. FAQ: 2-3 questions and answers.
    8. Meta: Title (max 60 chars), Description (150-160 chars), Keywords (5-7 items).
    9. Image: Describe a relevant featured image and provide SEO alt text.

    Format the response as a JSON object with the following structure:
    {
      "title": "string",
      "slug": "string",
      "content": "markdown string",
      "excerpt": "string",
      "meta": { "title": "string", "description": "string", "keywords": ["string"] },
      "keyTakeaways": ["string"],
      "faq": [{ "question": "string", "answer": "string" }],
      "image": { "alt": "string", "description": "string" }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) return null;
    
    const data = JSON.parse(response.text);
    return {
      ...data,
      id: Math.random().toString(36).substring(7),
      category,
      date: new Date().toISOString(),
      author: "ZAR AI Monitor",
      image: {
        url: (() => {
          const ids = [
            "photo-1589216532372-1c2a367900d8", // Parliamentary
            "photo-1541873676947-9cc09174e0d0", // Infrastructure
            "photo-1611974714851-eb6053e6235b", // Economy
            "photo-1451187580459-43490279c0fa", // Connectivity
            "photo-1525498128493-380d1990a112", // Mining
            "photo-1577495508048-b635879837f1", // Johannesburg
            "photo-1580060839134-75a5edca2e99", // Cape Town
            "photo-1548345680-f5475ee511d7", // Africa Map
            "photo-1589829545856-d10d557cf95f"  // Justice
          ];
          const randomId = ids[Math.floor(Math.random() * ids.length)];
          return `https://images.unsplash.com/${randomId}?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
        })(),
        alt: data.image.alt,
        caption: data.image.description
      },
      internalLinks: [],
      externalSources: []
    };
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return null;
  }
}

// api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Set this in Vercel Environment Variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // System prompt for the AI
    const systemPrompt = `
      You are a friendly art tutor for middle school students.
      Your job is to help them understand the Element of Line using the class materials provided.
      Keep your language simple and fun, like you're talking to a 6th grader.
    `;

    const response = await openai.chat.completions.create({
      model: "gemini-2.5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const aiText = response.choices[0].message.content;

    res.status(200).json({ reply: aiText });
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ error: "Something went wrong with the AI request." });
  }
}

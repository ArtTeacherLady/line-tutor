// /api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Make sure your Vercel env variable matches this EXACTLY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userMessage } = req.body;

    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ error: "No message provided" });
    }

    const response = await openai.responses.create({
      model: "gemini-2.5",
      input: userMessage, // just the string
    });

    const text = response.output_text || "Sorry, I couldn't generate a response.";
    res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate response" });
  }
}

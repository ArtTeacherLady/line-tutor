import OpenAI from "openai";

// Correct configuration to use the OpenAI library with Gemini
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    // Add the base URL to redirect the request to the Gemini API
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { userMessage } = req.body;

        // Use the correct chat completions method for Gemini
        const response = await openai.chat.completions.create({
            model: "gemini-1.5-pro-latest", // Use a valid Gemini model name
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
        });
        
        // Access the response text correctly
        const text = response.choices[0].message.content;
        res.status(200).json({ reply: text });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate response" });
    }
}

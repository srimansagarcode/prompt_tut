import { array, boolean, email, z } from 'zod';
import OpenAI from 'openai';
import * as dotenv from "dotenv";

dotenv.config();

// --- 2. INITIALIZE CLIENT ---
// To use Ollama: baseURL: "http://localhost:11434/v1", apiKey: "ollama"
const ai = new OpenAI({
  apiKey:process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function runArchitectSession() {
  const response = ai.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Use "llama3.2" for Ollama
    messages: [
      {
        role: "user",
        content: `
            Classify the text into neutral, negative, or positive
            Text: I think the food was okay.
            Sentiment:
        `
      }
    ],
    temperature: 0.1 // Keep it precise
  })

  const raw = (await response).choices[0]?.message.content;

  if(raw) {
    try {
      
      console.log("✅ Raw response.", raw);

    } catch(e) {
      console.log("🔥 Raw output was:", raw)
    }
  }

}

runArchitectSession();
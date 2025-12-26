import { array, boolean, email, z } from 'zod';
import OpenAI from 'openai';
import * as dotenv from "dotenv";

dotenv.config();

// --- 1. THE ARCHITECT SCHEMA ---
// We are adding 'kendoConfig' as a nested object to test the AI's logic.
const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.preprocess(
    (val) => typeof val == 'string' ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : val,
    z.enum(["Admin", "Contributor", "Viewer"])
  ),
  email:z.string().email(),
  tags:z.array(z.string()).max(3),
  kendoConfig: z.object({
    isEditable: z.boolean(),
    initialSort: z.enum(["asc", "desc"])
  })
})

type User = z.infer<typeof UserSchema>;

// --- 2. INITIALIZE CLIENT ---
// To use Ollama: baseURL: "http://localhost:11434/v1", apiKey: "ollama"
const ai = new OpenAI({
  apiKey:process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function runArchitectSession() {
  console.log("🚀 Starting Architect Session...");

  const response = ai.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Use "llama3.2" for Ollama
    messages: [
      {
        role: "system",
        content: `
          You are a Senior React Architect.
          Output ONLY raw JSON. No markdown. No chatter.
          ALLOWED ROLES: Admin, Contributor, Viewer. 
          DO NOT use 'Moderator' or any other role.
          FEW-SHOT EXAMPLE:
          User: 1 user
          Assistant: {"users": [{"id":1, "username":"dev", "role":"Admin", "email":"a@b.com", "tags":[], "kendoConfig":{"isEditable":true, "initialSort":"asc"}}]}
        `
      },
      {
        role: "user",
        content: `
          Generate 3 mock users with nested kendoConfig objects.
        `
      }
    ],
   
    response_format : { type: "json_object"},
    // THE PRO TRICK: Stop sequences prevent the AI from adding trailing text.
    stop: ["\n\n", "User:", "###"],
    temperature: 0.1 // Keep it precise
  })

  const raw = (await response).choices[0]?.message.content;

  if(raw) {
    try {
      const parsed = JSON.parse(raw);

      // We look for the first array we find in the object (defensive parsing)
      const dataArray = Object.values(parsed).find(Array.isArray) as any[];

      if(!dataArray) throw new Error("No array found in response");

      // Validate each item
      const validatedData = dataArray.map((u, i) => {
        const result = UserSchema.safeParse(u);
        if(!result.success){
          console.error(`❌ User ${i} failed:`, result.error.format());
          return null;
        }
        return result.data
      }).filter(Boolean);
      console.table(validatedData);
      console.log("✅ Architecture Check: Complete.");

    } catch(e) {
      console.log("🔥 Critical Parse Error. Raw output was:", raw)
    }
  }

}

runArchitectSession();
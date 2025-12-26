import { z } from "zod";
import OpenAI from "openai"; // Groq uses the OpenAI format!
import * as dotenv from "dotenv";

dotenv.config();

// 1. Initialize Groq (OpenAI compatible)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "http://localhost:11434/v1",
});
const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.enum(["Admin", "Contributor"]),
  email: z.string().email(),
  tags: z.array(z.string()).max(3)
});

type User = z.infer<typeof UserSchema>;
// function cleanAIData(rawJson: any): User[] {
//   // Scenario A: The AI returned the array directly at the top level
//   if (Array.isArray(rawJson)) {
//     return z.array(UserSchema).parse(rawJson);
//   }

//   // Scenario B: The AI wrapped it in an object (e.g., { "users": [...] })
//   if (typeof rawJson === "object" && rawJson !== null) {
//     // We look at every key in the object to find the one containing an array
//     for (const key of Object.keys(rawJson)) {
//       const value = rawJson[key];
//       if (Array.isArray(value)) {
//         console.log(`🔍 Found potential data in key: "${key}"`);
//         const result = z.array(UserSchema).safeParse(value);
//         if (result.success) return result.data;
//       }
//     }
//   }

//   throw new Error("❌ AI Error: Could not find a valid User array in the response.");
// }
function cleanAIData(rawJson: any): User[] {
  // 1. Ensure we have an array to work with
  let dataArray: any[] = [];
  if (Array.isArray(rawJson)) {
    dataArray = rawJson;
  } else if (typeof rawJson === "object" && rawJson !== null) {
    const foundArray = Object.values(rawJson).find(val => Array.isArray(val));
    if (foundArray) dataArray = foundArray as any[];
  }

  if (dataArray.length === 0) {
    console.error("⚠️ No array found in AI response.");
    return [];
  }

  // 2. Graceful Validation: Keep what works, report what doesn't
  const validUsers: User[] = [];
  const failures: any[] = [];

  dataArray.forEach((item, index) => {
    const result = UserSchema.safeParse(item);
    if (result.success) {
      validUsers.push(result.data);
    } else {
      // Logic for "Hallucination" detection
      failures.push({
        index,
        errors: result.error.flatten().fieldErrors,
        received: item
      });
    }
  });

  // 3. Reporting (The "AI Engineer" Log)
  if (failures.length > 0) {
    console.warn(`❌ Caught ${failures.length} AI Hallucinations:`);
    console.dir(failures, { depth: null });
  }

  return validUsers;
}

async function generateWithGroq() {
  // Inside generateWithGroq()
const chatCompletion = await groq.chat.completions.create({
  messages: [
    { role: "system", content: "You are a JSON-only API. Output raw JSON arrays." },
    { 
      role: "user", 
      content: "Generate 10 mock user profiles. Each must have: id (number), username (string), role (Admin, Contributor, or Viewer), email (valid email string), and tags (array of up to 3 strings)." 
    }
  ],
  model: "llama3.2",
  response_format: { type: "json_object" },
});

  const raw = chatCompletion.choices[0]?.message.content;
  
  if (raw) {
    const parsed = JSON.parse(raw);
    // Use your Cleaner function here to handle any key naming (users vs results)
    const cleanUsers = cleanAIData(parsed); 
    console.table(cleanUsers);
  }
}

generateWithGroq();
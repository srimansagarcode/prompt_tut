// backup-validation.ts
// import { UserSchema } from "./schema"; // Your schema from earlier
import { z } from "zod";
import fs from "fs";

// 1. Your Base Schema (The "Source of Truth")
const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.enum(["Admin", "Contributor", "Viewer"]),
  email: z.string().email(),
  tags: z.array(z.string()).max(3)
});

type User = z.infer<typeof UserSchema>;

/**
 * AI Data Cleaner: Finds the actual data array inside an AI response,
 * regardless of what key the AI decided to use (e.g., "users", "result", "items").
 */
function cleanAIData(rawJson: any): User[] {
  // Scenario A: The AI returned the array directly at the top level
  if (Array.isArray(rawJson)) {
    return z.array(UserSchema).parse(rawJson);
  }

  // Scenario B: The AI wrapped it in an object (e.g., { "users": [...] })
  if (typeof rawJson === "object" && rawJson !== null) {
    // We look at every key in the object to find the one containing an array
    for (const key of Object.keys(rawJson)) {
      const value = rawJson[key];
      if (Array.isArray(value)) {
        console.log(`🔍 Found potential data in key: "${key}"`);
        const result = z.array(UserSchema).safeParse(value);
        if (result.success) return result.data;
      }
    }
  }

  throw new Error("❌ AI Error: Could not find a valid User array in the response.");
}

// // 2. Define the Wrapper Schema (The "Response" from Gemini)
// const GeminiResponseSchema = z.object({
//   users: z.array(UserSchema)
// });

// --- Execution ---
try {
  const rawData = fs.readFileSync("./mock-user.json", "utf-8");
  const parsed = JSON.parse(rawData);
  // 3. Parse the wrapper instead
  // const result = GeminiResponseSchema.safeParse(parsed);
  //console.log("✅ Manual data is valid!", result.data);
  const cleanUsers = cleanAIData(parsed);
  
  console.log(`✅ Success! Extracted ${cleanUsers.length} users.`);
  console.table(cleanUsers);
} catch (err: any) {
  console.error(err.message);
}
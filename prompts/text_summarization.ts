import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function runArchitectSession() {
  const response = await ai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that simplifies complex medical information for children."
      },
      {
        role: "user",
        content: `
          Instruction: Explain the "Input Text" in one sentence for a 5th grader.
          Context: Focus only on the definition. Ignore the types and side effects.
          Input Text: Antibiotics are medicines that are used to treat infections caused by bacteria. They work by either killing the bacteria or preventing them from multiplying, thereby allowing the body's immune system to fight off the infection.

          **How do Antibiotics Work?**

          Antibiotics target specific parts of the bacterial cell, such as the cell wall, cell membrane, or proteins, to disrupt their normal functioning. This can lead to the death of the bacterial cell or prevent it from multiplying. There are several ways antibiotics can work, including:

          1. **Inhibiting cell wall synthesis**: Antibiotics like penicillin and amoxicillin inhibit the production of the bacterial cell wall, leading to the death of the cell.
          2. **Disrupting cell membrane function**: Antibiotics like polymyxin and daptomycin disrupt the bacterial cell membrane, causing the cell to leak and eventually die.
          3. **Interfering with protein synthesis**: Antibiotics like tetracycline and erythromycin bind to the bacterial ribosome, preventing the production of essential proteins.
          4. **Inhibiting DNA replication**: Antibiotics like ciprofloxacin and levofloxacin inhibit the replication of bacterial DNA, preventing the cell from multiplying.

          **Types of Antibiotics**

          There are several types of antibiotics, including:

          1. **Broad-spectrum antibiotics**: These antibiotics are effective against a wide range of bacteria, including both Gram-positive and Gram-negative bacteria.
          2. **Narrow-spectrum antibiotics**: These antibiotics are effective against a specific type of bacteria, such as Gram-positive or Gram-negative bacteria.
          3. **Topical antibiotics**: These antibiotics are applied directly to the skin or mucous membranes to treat infections.
          4. **Systemic antibiotics**: These antibiotics are taken orally or intravenously to treat infections throughout the body.

          **Common Uses of Antibiotics**

          Antibiotics are commonly used to treat a variety of infections, including:

          1. **Respiratory tract infections**: such as pneumonia, bronchitis, and sinusitis
          2. **Urinary tract infections**: such as cystitis and pyelonephritis
          3. **Skin and soft tissue infections**: such as cellulitis and abscesses
          4. **Gastrointestinal infections**: such as diarrhea and diverticulitis

          **Important Considerations**

          1. **Antibiotic resistance**: The overuse and misuse of antibiotics have led to the development of antibiotic-resistant bacteria, making it essential to use antibiotics judiciously.
          2. **Side effects**: Antibiotics can cause side effects, such as allergic reactions, diarrhea, and nausea.   
          3. **Interactions with other medications**: Antibiotics can interact with other medications, such as blood thinners and certain antidepressants.

          Overall, antibiotics are a crucial tool in the treatment of bacterial infections, but their use must be carefully considered to minimize the risk of antibiotic resistance and side effects.
          Output Indicator: ### Antibiotics:\n
        `,
      },
    ],
    temperature: 0.1, // Keep it precise
  });

  const raw = response.choices[0]?.message.content;

  if (raw) {
    try {
      console.log("✅ Raw response.", raw);
    } catch (e) {
      console.log("🔥 Raw output was:", raw);
    }
  }
}

runArchitectSession();

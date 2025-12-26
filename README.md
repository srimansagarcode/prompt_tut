# Basics of Prompting


## Prompting an LLM

To get the best results from an AI, think of your prompt as a set of clear directions. The better the directions, the better the final destination.

Here is the summary in simple points:

* **Quality In = Quality Out:** The more helpful detail you give the AI, the better its response will be.
* **The Instruction:** Clearly tell the AI what to do (the task or question).
* **Context:** Provide background information so the AI understands the "big picture."
* **Inputs:** Give the specific data or text you want the AI to work on.
* **Examples:** Show the AI a few samples of what you want the final answer to look like (often called "Few-Shot Prompting").
* **Better Crafting:** Combining these elements leads to much more accurate and professional results than a simple one-sentence request.

Let's get started by going over a basic example of a simple prompt:

*Prompt*

```md
The sky is
```

*Output:*
```md
blue.
```

When using modern chat models, you can organize your prompt into three specific **Roles**. Think of this like a script for a play:

* **System Role (The "Director"):** This sets the AI's personality and rules. You use it to tell the AI, "You are a helpful travel agent" or "Always speak in short sentences." It sets the overall behavior.
* **User Role (The "Client"):** This is you. This is where you type your specific questions, instructions, or data you want the AI to handle.
* **Assistant Role (The "AI"):** This is the AI’s response. However, **you** can also write "fake" assistant messages to show the AI examples of how you want it to answer.

---

### Summary Table: Role Responsibilities

| Role | Responsibility | Simple Analogy |
| --- | --- | --- |
| **System** | Sets the rules and tone. | The **Job Description**. |
| **User** | Provides the specific task. | The **Request**. |
| **Assistant** | Provides the answer (or examples). | The **Output**. |

> **Pro-Tip:** Even though you can put everything into a "User" message, using the **System** message is much more effective for keeping the AI focused on a specific persona over a long conversation.


You can observe from the prompt example above that the language model responds with a sequence of tokens that make sense given the context `"The sky is"`. The output might be unexpected or far from the task you want to accomplish. In fact, this basic example highlights the necessity to provide more context or instructions on what specifically you want to achieve with the system. This is what prompt engineering is all about.

Let's try to improve it a bit:

*Prompt:*
```
Complete the sentence: 

The sky is
```

*Output:*

```
blue during the day and dark at night.
```

Is that better? Well, with the prompt above you are instructing the model to complete the sentence so the result looks a lot better as it follows exactly what you told it to do ("complete the sentence"). This approach of designing effective prompts to instruct the model to perform a desired task is what's referred to as **prompt engineering** in this guide. 

The example above is a basic illustration of what's possible with LLMs today. Today's LLMs are able to perform all kinds of advanced tasks that range from text summarization to mathematical reasoning to code generation.

## Prompt Formatting

To get the best out of an AI, you can structure your request in different ways depending on how much help the model needs. Here is a summary of the key formatting techniques:

* **Standard Formatting:** You can use a direct question or instruction. For clearer structure, you can use the **Q: (Question) and A: (Answer)** format, though modern models often understand the task without these labels.
* **Zero-Shot Prompting:** This is when you ask the AI to complete a task **without giving any examples**. It relies entirely on the model's pre-existing knowledge.
* **Few-Shot Prompting:** This involves providing **a few examples** (demonstrations) within your prompt. This helps the AI understand the pattern, tone, or format you want.
* **In-Context Learning:** This is the AI's ability to "learn" the specific task you want just by looking at the examples you provided in that specific conversation.
* **Flexibility:** Formatting depends on the task. You can use QA pairs for facts, or simple label pairs (e.g., "Text // Sentiment") for classification tasks.

You have tried a very simple prompt above. A standard prompt has the following format:

```
<Question>?
```

or 

```
<Instruction>
```
 
You can format this into a question answering (QA) format, which is standard in a lot of QA datasets, as follows:

```
Q: <Question>?
A: 
```

When prompting like the above, it's also referred to as *zero-shot prompting*, i.e., you are directly prompting the model for a response without any examples or demonstrations about the task you want it to achieve. Some large language models have the ability to perform zero-shot prompting but it depends on the complexity and knowledge of the task at hand and the tasks the model was trained to perform good on.

A concrete prompt example is as follows:

*Prompt*
```
Q: What is prompt engineering?
```

With some of the more recent models you can skip the "Q:" part as it is implied and understood by the model as a question answering task based on how the sequence is composed. In other words, the prompt could be simplified as follows:

*Prompt*
```
What is prompt engineering?
```


Given the standard format above, one popular and effective technique to prompting is referred to as *few-shot prompting* where you provide exemplars (i.e., demonstrations). You can format few-shot prompts as follows:

```
<Question>?
<Answer>

<Question>?
<Answer>

<Question>?
<Answer>

<Question>?

```

The QA format version would look like this:

```
Q: <Question>?
A: <Answer>

Q: <Question>?
A: <Answer>

Q: <Question>?
A: <Answer>

Q: <Question>?
A:
```

Keep in mind that it's not required to use the QA format. The prompt format depends on the task at hand. For instance, you can perform a simple classification task and give exemplars that demonstrate the task as follows:

*Prompt:*
```
This is awesome! // Positive
This is bad! // Negative
Wow that movie was rad! // Positive
What a horrible show! //
```

*Output:*
```
Negative
```

Few-shot prompts enable in-context learning, which is the ability of language models to learn tasks given a few demonstrations. We discuss zero-shot prompting and few-shot prompting more extensively in upcoming sections.

<Callout type= "info" emoji="🎓">
Learn more about advanced prompting methods in our new AI courses. [Join now!](https://dair-ai.thinkific.com/)
Use code PROMPTING20 to get an extra 20% off.
</Callout>



To build a high-quality prompt, you can combine four core elements. Think of these as the "ingredients" for a perfect AI response.

### The 4 Elements of a Prompt

* **Instruction:** The specific action you want the AI to take (e.g., "Summarize," "Translate," "Classify").
* **Context:** Background info or examples that guide the AI (e.g., "This is for a 5th-grade classroom" or "Use the following company rules").
* **Input Data:** The actual content or question you want processed (e.g., the specific email you want summarized).
* **Output Indicator:** A signal for the format or the start of the answer (e.g., "TL;DR:", "JSON:", or "Sentiment:").

---

### Example Breakdown

Here is how these elements look in a real-world prompt:

> **Instruction:** Extract the names of people mentioned in the text below.
> **Context:** Only include people who are employees, not customers.
> **Input Data:** "John (Staff) spoke with Sarah (Customer) about the delivery."
> **Output Indicator:** > List of employees:

| Element | Part of the Example |
| --- | --- |
| **Instruction** | "Extract the names..." |
| **Context** | "Only include people who are employees..." |
| **Input Data** | "John (Staff) spoke with Sarah..." |
| **Output Indicator** | "List of employees:" |

---

### Summary Note

You don't always need **all** four elements, but adding **Context** and **Output Indicators** is the fastest way to turn a "bad" response into a "great" one.


To show you the difference between a "basic" prompt and a "well-engineered" one, let's use the example of **summarizing a meeting transcript.**

### 1. The "Basic" Prompt (Before)

> "Summarize this meeting: [Transcript Text]"

---

### 2. The "Rebuilt" Prompt (After)

By using the four elements, we make the request much more professional and useful:

* **Instruction:** "Extract the key decisions and assigned tasks from the following meeting transcript."
* **Context:** "This was a weekly project sync with the engineering team. Focus only on technical blockers and deadline changes. Ignore the small talk at the beginning."
* **Input Data:** "[Paste your transcript text here]"
* **Output Indicator:** "### Key Decisions:\n1.\n\n### Action Items:\n- [Owner]: [Task]"

---

### Why the Rebuilt version is better:

| Element | Why it helps |
| --- | --- |
| **Instruction** | Tells the AI *exactly* what to look for (Decisions/Tasks), not just a general "summary." |
| **Context** | Tells the AI what to ignore (small talk) and what to prioritize (blockers). |
| **Input Data** | Keeps the data separate so the AI doesn't get confused by the instructions. |
| **Output Indicator** | Forces the AI to use professional Markdown headings and a bulleted list. |

To design effective prompts, you don't need to be a "whisperer," but you do need to be a clear communicator. Here is a summary of the best practices for designing your prompts:

### 1. Start Simple & Iterate

* **Process:** Don't try to write the "perfect" prompt on your first try. Start with a simple request and slowly add details.
* **Break it Down:** If a task is huge (like writing a whole book), break it into smaller sub-tasks.
* **Use Separators:** Use symbols like `###` or `---` to help the AI distinguish between your instructions and the data.

### 2. Be Specific and Direct

* **Be Descriptive:** Clearly define the style, length, and format you want.
* **Instruction First:** Place your command (e.g., "Summarize") at the very beginning of the prompt.
* **Avoid "Fluff":** Don't be "clever" or vague. Instead of saying "Don't be too descriptive," say "Use exactly 2 sentences."

### 3. Focus on "What to Do" (Not what not to do)

* **Positive Framing:** AI models often get confused by negative commands (like "Don't ask questions").
* **The Better Way:** Tell the AI exactly what it *should* do instead.

---

### Comparison Examples

| Tip | Bad Prompt (Imprecise/Negative) | Better Prompt (Specific/Positive) |
| --- | --- | --- |
| **Specificity** | "Explain AI to me. Keep it short and don't be too technical." | "Explain AI in 3 sentences to a 10-year-old using a sports analogy." |
| **Action** | "Do not ask the user for their name or personal data." | "Recommend a trending movie. If the user asks for a personal recommendation, politely decline." |
| **Formatting** | "Extract the names and dates from this text." | "Extract names and dates. Format: [Name] - [Date]. Example: John - Jan 1st." |

### A Concrete Example of a "Pro" Prompt

Instead of just asking for a summary, a well-designed prompt looks like this:

> **### Instruction ###**
> Extract the locations from the text below.
> **Desired Format:**
> Location: <city>, <country>
> **Input Text:**
> "The team met at the Champalimaud Centre in Lisbon to discuss the project."
> **Output:**
> Location: Lisbon, Portugal



Text summarization is the process of condensing long articles or complex ideas into short, easy-to-read versions. It is one of the most useful applications for AI.

### Essential Information

* **Goal:** To capture the main ideas while removing "fluff" and unnecessary details.
* **Prompt Structure:** You can use simple commands like "Summarize," "Explain," or "TL;DR."
* **Refining Length:** You can specify the exact length, such as "in one sentence" or "in three bullet points."
* **The "A:" Format:** Using labels like **Q:** (Question) and **A:** (Answer) helps the AI understand that a specific response is expected.

---

### Example: From Long to Short

**Input Text (About Antibiotics):**

> "Antibiotics are a type of medication used to treat bacterial infections. They work by either killing the bacteria or preventing them from reproducing, allowing the body’s immune system to fight off the infection. They are not effective against viral infections, and using them inappropriately can lead to antibiotic resistance."

**Simple Summary Prompt:**

> "Explain the text above in one sentence for a 5th grader."

**Result:**

> "Antibiotics are special medicines that kill germs called bacteria, but they don't work on viruses like the cold or flu."

---

### Summary Table: Summarization Techniques

| Technique | How to do it | Why it's useful |
| --- | --- | --- |
| **Basic** | "Summarize this: [Text]" | Quick, general overview. |
| **Constrained** | "Summarize this in exactly 20 words." | Forces the AI to be very brief. |
| **Audience-based** | "Explain this like I'm five." | Simplifies complex jargon. |
| **Format-based** | "Summarize into 3 bullet points." | Makes the info easy to scan. |

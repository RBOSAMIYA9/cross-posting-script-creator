import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

export async function generateScripts(transcriptText) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is missing in environment variables. Please add it to .env.local');
  }

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  
  // Use a free model by default, or anything defined in .env
  const model = process.env.OPENROUTER_MODEL || 'openrouter/free';

  const linkedinPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'linkedin.txt'), 'utf8');
  const reelsPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'reels.txt'), 'utf8');

  const callLLM = async (systemPrompt, userTranscript) => {
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here is the transcript to process:\n\n${userTranscript}` }
        ],
        max_tokens: 2000,
      });

      if (!completion.choices || completion.choices.length === 0) {
        console.error("API returned no choices. Full response:", JSON.stringify(completion));
        return null;
      }

      const content = completion.choices[0].message?.content;
      if (!content) {
        console.error("API returned empty content. Full response:", JSON.stringify(completion));
        return null;
      }

      return content;
    } catch (err) {
      console.error("Error calling LLM:", err);
      return null;
    }
  };

  // Execute sequentially to avoid concurrent rate limits on free OpenRouter endpoints
  const linkedinRaw = await callLLM(linkedinPrompt, transcriptText);
  const reelsRaw = await callLLM(reelsPrompt, transcriptText);
  
  // Clean up any markdown JSON codeblocks if the model returned them
  const cleanJSON = (text) => {
    if (!text || typeof text !== 'string') {
      console.error("Failed to parse AI output: text is empty or not a string (value:", text, ")");
      throw new Error("Failed to generate scripts. The AI returned an empty or invalid response.");
    }
    try {
      // First try to extract content between markdown codeblocks
      const mdMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (mdMatch && mdMatch[1]) {
        return JSON.parse(mdMatch[1].trim());
      }

      // Fallback: extract substring from the first { or [ to the last } or ]
      const firstBrace = text.indexOf('{');
      const firstBracket = text.indexOf('[');
      const startIndex = Math.min(
        firstBrace === -1 ? Infinity : firstBrace,
        firstBracket === -1 ? Infinity : firstBracket
      );
      
      const lastBrace = text.lastIndexOf('}');
      const lastBracket = text.lastIndexOf(']');
      const endIndex = Math.max(lastBrace, lastBracket);

      if (startIndex !== Infinity && endIndex !== -1 && endIndex > startIndex) {
        return JSON.parse(text.substring(startIndex, endIndex + 1));
      }

      // absolute fallback, just try parsing the whole thing
      return JSON.parse(text.trim());
    } catch (err) {
      console.error("Failed to parse AI output. Content was:", text);
      throw new Error("Failed to parse generated scripts. The AI returned an invalid format.");
    }
  };

  return {
    linkedin: cleanJSON(linkedinRaw),
    reels: cleanJSON(reelsRaw),
  };
}

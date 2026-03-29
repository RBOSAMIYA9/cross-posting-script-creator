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
  
  // Use google/gemini-2.5-flash by default, or anything defined in .env
  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

  const linkedinPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'linkedin.txt'), 'utf8');
  const reelsPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'reels.txt'), 'utf8');

  const callLLM = async (systemPrompt, userTranscript) => {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the transcript to process:\n\n${userTranscript}` }
      ],
      max_tokens: 2000,
    });

    return completion.choices[0].message.content;
  };

  const [linkedinRaw, reelsRaw] = await Promise.all([
    callLLM(linkedinPrompt, transcriptText),
    callLLM(reelsPrompt, transcriptText)
  ]);
  
  // Clean up any markdown JSON codeblocks if the model returned them
  const cleanJSON = (text) => {
    let clean = text.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim();
    }
    return JSON.parse(clean);
  };

  return {
    linkedin: cleanJSON(linkedinRaw),
    reels: cleanJSON(reelsRaw),
  };
}

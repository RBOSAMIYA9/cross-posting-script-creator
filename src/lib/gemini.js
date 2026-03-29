import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateScripts(transcriptText) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in environment variables. Please add it to .env.local');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Use Gemini 2.5 Flash as it is the available model for the provided API key
  // Enforce JSON output globally on the model
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  // Read meta prompts from the metaprompts folder
  const linkedinPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'linkedin.txt'), 'utf8');
  const reelsPrompt = fs.readFileSync(path.join(process.cwd(), 'metaprompts', 'reels.txt'), 'utf8');

  // Run both generations concurrently
  const [linkedinResponse, reelsResponse] = await Promise.all([
    model.generateContent(`${linkedinPrompt}\n\n${transcriptText}`),
    model.generateContent(`${reelsPrompt}\n\n${transcriptText}`)
  ]);

  return {
    linkedin: JSON.parse(linkedinResponse.response.text()),
    reels: JSON.parse(reelsResponse.response.text()),
  };
}

import { Injectable } from '@angular/core';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { translations } from './translations';

@Injectable({ providedIn: 'root' })
export class AiService {
  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  private history: { role: string, parts: { text: string }[] }[] = [];

  private getSystemInstruction(): string {
    const profileData = translations.en;
    return `You are an AI assistant for Shenouda Tharwat's portfolio website. 
You are helpful, professional, and concise. 
Use the following information about Shenouda to answer questions:
${JSON.stringify(profileData)}

Do not make up information that is not in the profile. If you don't know, say you don't know. Keep responses relatively short and easy to read. Use markdown formatting where appropriate.`;
  }

  async *sendMessageStream(message: string, useDeepThink: boolean) {
    const model = useDeepThink ? 'gemini-3.1-pro-preview' : 'gemini-3.1-flash-lite-preview';
    
    const config: any = {
      systemInstruction: this.getSystemInstruction(),
    };

    if (useDeepThink) {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    // Add user message to history
    this.history.push({ role: 'user', parts: [{ text: message }] });

    try {
      const responseStream = await this.ai.models.generateContentStream({
        model,
        contents: this.history,
        config
      });

      let fullResponse = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          yield chunk.text;
        }
      }

      // Add model response to history
      this.history.push({ role: 'model', parts: [{ text: fullResponse }] });
    } catch (error) {
      console.error('AI Error:', error);
      this.history.pop(); // Remove the user message if it failed
      throw error;
    }
  }
}

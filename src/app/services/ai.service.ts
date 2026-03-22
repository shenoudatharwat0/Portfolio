import { Injectable } from '@angular/core';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { translations } from './translations';

@Injectable({ providedIn: 'root' })
export class AiService {
  private ai?: GoogleGenAI;
  private history: { role: string, parts: { text: string }[] }[] = [];
  private readonly hasApiKey = typeof GEMINI_API_KEY === 'string'
    && GEMINI_API_KEY.trim().length > 0
    && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY';

  constructor() {
    if (this.hasApiKey) {
      this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
  }

  private getSystemInstruction(): string {
    const profileData = translations.en;
    return `You are an AI assistant for Shenouda Tharwat's portfolio website. 
You are helpful, professional, and concise. 
Use the following information about Shenouda to answer questions:
${JSON.stringify(profileData)}

Do not make up information that is not in the profile. If you don't know, say you don't know. Keep responses relatively short and easy to read. Use markdown formatting where appropriate.`;
  }

  private getLocalFallbackResponse(rawMessage: string): string {
    const message = rawMessage.toLowerCase();
    const profile = translations.en;

    if (message.includes('contact') || message.includes('email') || message.includes('whatsapp')) {
      return `You can reach Shenouda from the **Contact** section on this portfolio, including email and WhatsApp links.`;
    }

    if (message.includes('skill') || message.includes('stack') || message.includes('technology')) {
      return `Shenouda focuses on **C#**, **.NET Core**, **SQL Server**, and modern frontend frameworks such as **Angular**.`;
    }

    if (message.includes('project') || message.includes('portfolio')) {
      const projectNames = profile.projects.list.map((p) => p.title).join(', ');
      return `Featured projects include: **${projectNames}**. Open the **Projects** page for details and live demos.`;
    }

    if (message.includes('service') || message.includes('offer')) {
      return `Core services include .NET application development, database architecture, API development, legacy modernization, infrastructure optimization, and security implementation.`;
    }

    return `I can help with Shenouda's projects, technical skills, and services. Ask about the tech stack, project details, or how to get in touch.`;
  }

  async *sendMessageStream(message: string, useDeepThink: boolean) {
    if (!this.ai) {
      yield this.getLocalFallbackResponse(message);
      return;
    }

    const model = useDeepThink ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    
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

      if (!fullResponse.trim()) {
        fullResponse = this.getLocalFallbackResponse(message);
        yield fullResponse;
      }

      // Add model response to history
      this.history.push({ role: 'model', parts: [{ text: fullResponse }] });
    } catch (error) {
      console.error('AI Error:', error);
      this.history.pop(); // Remove the user message if it failed
      yield this.getLocalFallbackResponse(message);
    }
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// Initialize Gemini if API key is valid
if (API_KEY && API_KEY !== 'your-api-key-here') {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
}
export const getCryptoPrice = async (cryptoSymbol: string): Promise<string> => {
  const response = await fetch(`https://api.gemini.com/v1/pubticker/${cryptoSymbol}`);
  const data = await response.json();
  return data.last;
};
export class GeminiService {
  private chat;
  private isInitialized: boolean;

  constructor() {
    this.isInitialized = Boolean(genAI && model);
    
    if (this.isInitialized) {
      this.chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: 'You are a helpful financial advisor chatbot. Keep your responses focused on financial advice and information. Be professional but friendly.',
          },
          {
            role: 'model',
            parts: 'I understand. I will act as a professional financial advisor, providing helpful and accurate financial guidance while maintaining a friendly demeanor. I will focus on financial topics and ensure my advice is clear and practical.',
          },
        ],
      });
    }
  }
  
  async sendMessage(message: string): Promise<string> {
    if (!this.isInitialized) {
      if (!API_KEY) {
        return 'Error: Please set your Gemini API key in the .env file to start using the chatbot.';
      }
      if (API_KEY === 'your-api-key-here') {
        return 'Error: Please replace the placeholder with your actual Gemini API key in the .env file.';
      }
      return 'Error: The chatbot is not properly initialized. Please check your API key configuration.';
    }

    if (!message.trim()) {
      return 'Please provide a message to process.';
    }

    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return 'Error: Invalid or missing API key. Please check your .env file and ensure you have added your Gemini API key.';
        }
        if (error.message.includes('PERMISSION_DENIED')) {
          return 'Error: API key does not have permission to access Gemini. Please check your API key permissions.';
        }
        if (error.message.includes('RESOURCE_EXHAUSTED')) {
          return 'Error: API quota exceeded. Please try again later.';
        }
        if (error.message.includes('INVALID_ARGUMENT')) {
          return 'Error: The request was invalid. Please try a different message.';
        }
      }
      
      return 'I apologize, but I encountered an error processing your request. Please ensure your API key is set correctly and try again.';
    }
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
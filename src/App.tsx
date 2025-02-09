import React, { useState } from 'react';
import { Send, Bot, LayoutGrid } from 'lucide-react';
import { geminiService } from './services/gemini';
import { getBotResponse } from './services/training';
import { PodcastRecommender } from './components/PodcastRecommender';
import { MemeCoinsRecommender } from './components/MemeCoinsRecommender';
import logo from './assets/logo.png';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your personal finance assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const systemMessage = `
        You are a financial assistant. Only answer questions related to finance, investing, saving, budgeting, and economic trends. 
        Personal Information:Name: Kaushik pasumarthi|Email: johndoe@example.com|Phone number: 9876543210 (this will be encrypted by a trigger for security)|
        Age: 30 years old|Location: Mumbai, India|Financial Information:Annual income: ₹12,00,000|Fixed expenses: ₹3,00,000|
        Investment preference: Medium-Risk|Investment horizon: Long-Term|Current Investments:Owns ₹5000 worth of Apple (AAPL) stocks|
        Financial Scores:Financial health score: 75.50|Risk tolerance score: 80.00|Investment Goals:Saving ₹10,00,000 for Retirement|
        Preferred Asset Classes:|Prefers investing in Stocks|Security & Authentication:Password is stored in a hashed format for security|
        Uses JWT (JSON Web Token) authentication
        THE ABOVE PROVIDED IS INFORMATION OF THE USER.YOU SHOULD GIVE RESPONSES TO THE USER'S FINANCIAL QUERES ACCORDINGLY. THE RESPONSES YOU PROVIDE 
        TO THE USER SHOULD BE PERSONALIZED AND PROFESSIONAL. 
        THE USERS ARE MOSTLY INDIANS SO WHEN ASKED ABOUT STOCK MARKET,YOU SHOULD DO REAL TIME ANALYSIS AND GIVE ANSWERS FROM ARTICLES.
        FOR EXAMPLE ,IF A USER IS NOT FINANCIALLY EDUCATED ,YOU SHOULD ACT LIKE A TEACHER OR PROFESSOR.
        ALWAYS TRY TO GIVE ABSOLUTE ANSWERS BUT TRY TO GIVE ANSWERS WHICH SOUND MORE HUMAN. never try to potray that you are an AI model.
        If the question is unrelated to finance, politely redirect the user to ask about finance topics.YOU ARE THE PROFESSOINAL.NEVER SUGGEST THE USER TO
        SEEK PRO ADVICE. while providing your response to the user's prompt, avoid using excessive symbols.
        try suggesting websites and links to the user to visit , so that he/she can actually implement your suggestions.
        Always consider the given user information above, and give responses accordingly.
      `;
  
      const localResponse = getBotResponse(inputMessage);
    if (localResponse !== "I'm still learning. Please ask another question!") {
      const botMessage: Message = {
        content: localResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      // Fallback to API call if no local response
      // const systemMessage = `...Your system instructions here...`;
      const response = await geminiService.sendMessage(`${systemMessage}\nUser: ${inputMessage}`);

      const botMessage: Message = {
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
  
      const errorMessage: Message = {
        content: 'I apologize, but I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <img src={logo} alt="Next Invest Logo" className="w-10 h-10 rounded-full" />
            <div className="bg-blue-500 rounded-full">
              {/* <Bot className="w-6 h-6 text-white" /> */}
            </div>
            <h1 className="text-xl font-bold text-blue-800">Next Invest</h1>
          </div>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{showDashboard ? 'Hide' : 'Show'} Dashboard</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${showDashboard ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="bg-white rounded-lg shadow-lg min-h-[600px] flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-2 mb-1">
                          {/* <DollarSign className="w-4 h-4" /> */}
                          <span className="font-semibold">Finance Bot</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="border-t border-gray-200 p-4"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your finances..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors ${
                      isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-600'
                    }`}
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isLoading ? 'Thinking...' : 'Send'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {showDashboard && (
            <div className="space-y-6 max-h-[80vh] overflow-y-auto">

              <PodcastRecommender />
              <MemeCoinsRecommender />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
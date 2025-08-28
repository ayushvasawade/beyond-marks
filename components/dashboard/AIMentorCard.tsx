'use client';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

type Model = 'mistral' | 'gemini';

const AIMentorCard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [model, setModel] = useState<Model>('mistral');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    } else {
      setChatHistory([
        {
          sender: 'ai',
          text: "Hi! I'm your AI mentor. Ask me anything about coding, and I'll help you learn! 🚀",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem('chatHistory');
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const newMessage: ChatMessage = { sender: 'user', text: message };
    const updatedChatHistory = [...chatHistory, newMessage];
    setChatHistory(updatedChatHistory);
    setMessage('');
    setIsLoading(true);

    try {
      if (model === 'gemini') {
        const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
          throw new Error('Gemini API key is not configured.');
        }

        const contents = updatedChatHistory.map((chat) => ({
          role: chat.sender === 'user' ? 'user' : 'model',
          parts: [{ text: chat.text }],
        }));

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          body: JSON.stringify({ contents }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || 'Failed to get response from Gemini');
        }

        const data = await response.json();
        const aiMessage: ChatMessage = {
          sender: 'ai',
          text: data.candidates[0].content.parts[0].text,
        };
        setChatHistory((prev) => [...prev, aiMessage]);
      } else {
        console.log(`Sending message to ${model}:`, message);
        const response = await fetch('/api/mentor/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, model, chatHistory: updatedChatHistory }),
        });

        console.log('Received response:', response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get response from AI mentor');
        }

        const data = await response.json();
        console.log('Received data:', data);
        const aiMessage: ChatMessage = { sender: 'ai', text: data.response };
        setChatHistory((prev) => [...prev, aiMessage]);
      }
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: error.message || 'Sorry, something went wrong. Please try again later.',
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setChatHistory([]);
    setChatHistory([
        {
          sender: 'ai',
          text: "Hi! I'm your AI mentor. Ask me anything about coding, and I'll help you learn! 🚀",
        },
      ]);
  };

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[var(--lemonade-2)] border-3 border-[var(--lemonade-4)] rounded-xl flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--lemonade-3)]">AI Mentor</h2>
            <p className="text-sm text-[var(--lemonade-3)] opacity-80">Your personal coding companion</p>
          </div>
        </div>
        {/* Model Toggle and Delete Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-lg p-1">
            <button
              onClick={() => setModel('mistral')}
              className={`px-2 py-1 text-sm rounded-md ${model === 'mistral' ? 'bg-[var(--lemonade-4)] text-white' : 'text-[var(--lemonade-3)]'}`}>
              Mistral
            </button>
            <button
              onClick={() => setModel('gemini')}
              className={`px-2 py-1 text-sm rounded-md ${model === 'gemini' ? 'bg-[var(--lemonade-4)] text-white' : 'text-[var(--lemonade-3)]'}`}>
              Gemini
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-2xl p-4 mb-4 min-h-[250px] max-h-[350px] overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex items-start gap-3 mb-3 ${
            chat.sender === 'user' ? 'justify-end' : ''
          }`}>
            {chat.sender === 'ai' && (
              <div className="w-6 h-6 bg-[var(--lemonade-4)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-white">AI</span>
              </div>
            )}
            <div
              className={`flex-1 px-4 py-2 rounded-lg text-sm markdown-content ${
                chat.sender === 'user'
                  ? 'bg-[var(--lemonade-2)] text-[var(--lemonade-3)]'
                  : 'bg-white text-[var(--lemonade-3)]'
              }`}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chat.text}</ReactMarkdown>
            </div>
            {chat.sender === 'user' && (
              <div className="w-6 h-6 bg-[var(--lemonade-2)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-[var(--lemonade-3)]">U</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-[var(--lemonade-4)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">AI</span>
                </div>
                <div className="flex-1 px-4 py-2 rounded-lg bg-white text-[var(--lemonade-3)]">
                    <p className="text-sm">The AI mentor is thinking...</p>
                </div>
            </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Ask ${model === 'gemini' ? 'Gemini' : 'Mistral'} anything...`}
          className="flex-1 px-4 py-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] placeholder-[var(--lemonade-3)] placeholder-opacity-60 focus:border-[var(--lemonade-4)] focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}>
          {isLoading ? '... ' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AIMentorCard;
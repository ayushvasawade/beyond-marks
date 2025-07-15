"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import ChatMessage from "../components/ChatMessage";
import MoodSelector from "../components/MoodSelector";
import ClientOnly from "../components/ClientOnly";

// Define a Message type for chat messages
interface Message {
  id: string;
  role: 'user' | 'ai';
  message: string;
  timestamp: Date | string;
  mood?: string;
}

interface Suggestion {
  type: string;
  title: string;
  message: string;
  icon: string;
}

function MentorChatContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMood, setCurrentMood] = useState("neutral");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchChatHistory();
        fetchSuggestions();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:5000/api/mentor/chat?limit=50', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Ensure timestamps are properly converted to Date objects
        const processedMessages = (data.messages || []).map((msg: Message) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp as string) : new Date()
        }));
        setMessages(processedMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:5000/api/mentor/suggestions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isSubmitting) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      message: newMessage.trim(),
      timestamp: new Date(),
      mood: currentMood
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSubmitting(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      
      // First, test if the server is reachable
      const healthCheck = await fetch('http://localhost:5000/api/health');
      if (!healthCheck.ok) {
        throw new Error('Backend server is not responding');
      }

      const response = await fetch('http://localhost:5000/api/mentor/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.message,
          mood: currentMood
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const aiMessage: Message = {
          id: data.aiMessageId || Date.now().toString(),
          role: 'ai',
          message: data.aiResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Update suggestions after new message
        fetchSuggestions();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add fallback AI message with more helpful content
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        role: 'ai',
        message: (error as Error).message?.includes('Backend server') 
          ? "I&apos;m having trouble connecting to my server right now, but I&apos;m still here to help! Try asking me about your learning goals or what you&apos;re working on. You can also check if the backend server is running on port 5000."
          : "I&apos;m here to help! Let me know what you&apos;re working on or if you have any questions about your learning journey.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateMood = async (mood: string) => {
    setCurrentMood(mood);
    setShowMoodSelector(false);
    
    try {
      const token = await auth.currentUser?.getIdToken();
      await fetch('http://localhost:5000/api/mentor/mood', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mood })
      });
    } catch (error) {
      console.error('Error updating mood:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <main className="mentor-bg">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your AI mentor...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mentor-bg">
        <div className="not-logged-in">
          <h2>Please log in to chat with your AI mentor</h2>
          <Link href="/login" className="login-link">Go to Login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mentor-bg">
      {/* Header/Navbar */}
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🚀</span>
            <span className="brand-text">BeyondMarks</span>
          </div>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/community" className="nav-link">Community</Link>
            <Link href="/mentor-chat" className="nav-link active">AI Mentor</Link>
            <Link href="/profile" className="nav-link">Profile</Link>
            <button className="nav-link logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Chat Interface */}
      <div className="chat-container">
        {/* Sidebar */}
        <aside className="chat-sidebar">
          <div className="sidebar-section">
            <h3>🧠 Your AI Mentor</h3>
            <p className="mentor-description">
              Your personalized learning companion. Ask questions, share your progress, or just chat about your learning journey!
            </p>
          </div>

          <div className="sidebar-section">
            <h3>😊 How are you feeling?</h3>
            <button 
              className="mood-btn"
              onClick={() => setShowMoodSelector(!showMoodSelector)}
            >
              {currentMood === 'happy' && '😊'}
              {currentMood === 'neutral' && '😐'}
              {currentMood === 'frustrated' && '😤'}
              {currentMood === 'confused' && '🤔'}
              {currentMood === 'excited' && '🤩'}
              {' '}Update Mood
            </button>
            
            {showMoodSelector && (
              <MoodSelector
                currentMood={currentMood}
                onSelectMood={updateMood}
                onClose={() => setShowMoodSelector(false)}
              />
            )}
          </div>

          <div className="sidebar-section">
            <h3>💡 Suggestions</h3>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <div className="suggestion-content">
                    <h4>{suggestion.title}</h4>
                    <p>{suggestion.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🎯 Quick Actions</h3>
            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => setNewMessage("I'm feeling stuck with my current task...")}
              >
                💭 I'm stuck
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => setNewMessage("Can you explain this concept to me?")}
              >
                🤔 Explain this
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => setNewMessage("I need some motivation today...")}
              >
                💪 Need motivation
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => setNewMessage("What should I work on next?")}
              >
                🎯 Next steps
              </button>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-main">
          <div className="chat-header">
            <div className="chat-title">
              <span className="mentor-avatar">🧠</span>
              <div className="mentor-info">
                <h2>AI Mentor</h2>
                <p>Your personalized learning companion</p>
              </div>
            </div>
            <div className="chat-status">
              <span className="status-indicator online"></span>
              <span className="status-text">Online</span>
            </div>
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">🤖</div>
                <h3>Welcome to your AI Mentor!</h3>
                <p>I&apos;m here to support your learning journey. Ask me anything about:</p>
                <ul className="welcome-topics">
                  <li>📚 Understanding concepts</li>
                  <li>💡 Problem-solving strategies</li>
                  <li>🎯 Setting learning goals</li>
                  <li>😊 Motivation and encouragement</li>
                  <li>🔄 Study techniques</li>
                </ul>
                <p className="welcome-note">
                  I remember your progress and adapt my responses to help you grow!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isTyping={isSubmitting && message.role === 'ai'}
                />
              ))
            )}
            
            {isSubmitting && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">AI Mentor is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="input-wrapper">
              <textarea
                className="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI mentor anything..."
                rows={1}
                disabled={isSubmitting}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={isSubmitting || !newMessage.trim()}
              >
                {isSubmitting ? '⏳' : '➤'}
              </button>
            </div>
            <div className="input-hint">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Nunito:wght@400;600;700&display=swap');
        
        .mentor-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Poppins', 'Nunito', sans-serif;
          color: var(--color-text);
        }

        /* Header/Navbar */
        .header-nav {
          position: sticky;
          top: 0;
          background: rgba(15, 20, 25, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 900;
          color: #00bcd4;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: var(--color-text);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          padding: 0.5rem 1rem;
          border-radius: 0.8rem;
        }

        .nav-link:hover, .nav-link.active {
          color: #00bcd4;
          background: rgba(0, 188, 212, 0.1);
        }

        .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Chat Container */
        .chat-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          max-width: 1400px;
          margin: 0 auto;
          height: calc(100vh - 80px);
        }

        /* Sidebar */
        .chat-sidebar {
          background: rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          overflow-y: auto;
        }

        .sidebar-section {
          margin-bottom: 2rem;
        }

        .sidebar-section h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #00bcd4;
        }

        .mentor-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .mood-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text);
          padding: 0.8rem 1rem;
          border-radius: 0.8rem;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }

        .mood-btn:hover {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .suggestion-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.8rem;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
        }

        .suggestion-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .suggestion-content h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #ffffff;
        }

        .suggestion-content p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-action-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text);
          padding: 0.6rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          font-size: 0.9rem;
        }

        .quick-action-btn:hover {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        /* Chat Main */
        .chat-main {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.02);
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mentor-avatar {
          font-size: 2rem;
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mentor-info h2 {
          margin: 0;
          font-size: 1.3rem;
          color: #ffffff;
        }

        .mentor-info p {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .chat-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator.online {
          background: #4caf50;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }

        .status-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Messages Container */
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .welcome-message {
          text-align: center;
          padding: 3rem 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .welcome-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .welcome-message h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #00bcd4;
        }

        .welcome-message p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .welcome-topics {
          text-align: left;
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .welcome-topics li {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .welcome-note {
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          width: fit-content;
        }

        .typing-dots {
          display: flex;
          gap: 0.3rem;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #00bcd4;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .typing-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        /* Chat Input */
        .chat-input-container {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .input-wrapper {
          display: flex;
          gap: 0.8rem;
          align-items: flex-end;
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 0.8rem 1rem;
          color: var(--color-text);
          font-family: inherit;
          resize: none;
          min-height: 44px;
          max-height: 120px;
          transition: all 0.3s;
        }

        .chat-input:focus {
          outline: none;
          border-color: #00bcd4;
          background: rgba(255, 255, 255, 0.15);
        }

        .chat-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .send-btn {
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          color: #0f1419;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
        }

        .send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .input-hint {
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.5rem;
        }

        /* Loading and Not Logged In */
        .loading, .not-logged-in {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #00bcd4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-link {
          color: #00bcd4;
          text-decoration: none;
          font-weight: 700;
          margin-top: 1rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .chat-container {
            grid-template-columns: 1fr;
          }
          
          .chat-sidebar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .chat-header {
            padding: 1rem;
          }
          
          .messages-container {
            padding: 1rem;
          }
          
          .chat-input-container {
            padding: 1rem;
          }
          
          .nav-container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </main>
  );
}

export default function MentorChat() {
  return (
    <ClientOnly>
      <MentorChatContent />
    </ClientOnly>
  );
} 
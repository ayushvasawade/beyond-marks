"use client";
import React from "react";

interface Message {
  id: string;
  role: 'user' | 'ai';
  message: string;
  timestamp: Date | string;
  mood?: string;
}

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const formatTime = (timestamp: Date | string) => {
    // Ensure we have a proper Date object
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Just now';
    }
    
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'frustrated': return '😤';
      case 'confused': return '🤔';
      case 'neutral': return '😐';
      default: return '';
    }
  };

  if (message.role === 'user') {
    return (
      <div className="message user-message">
        <div className="message-content">
          <div className="message-text">{message.message}</div>
          {message.mood && (
            <div className="message-mood">
              {getMoodEmoji(message.mood)}
            </div>
          )}
        </div>
        <div className="message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
    );
  }

  return (
    <div className="message ai-message">
      <div className="ai-avatar">
        🧠
      </div>
      <div className="message-content">
        <div className="message-text">
          {isTyping ? (
            <div className="typing-placeholder">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            message.message
          )}
        </div>
      </div>
      <div className="message-time">
        {formatTime(message.timestamp)}
      </div>

      <style jsx>{`
        .message {
          display: flex;
          align-items: flex-end;
          gap: 0.8rem;
          max-width: 80%;
        }

        .user-message {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .ai-message {
          align-self: flex-start;
        }

        .ai-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .message-text {
          padding: 0.8rem 1rem;
          border-radius: 1rem;
          line-height: 1.5;
          word-wrap: break-word;
          max-width: 100%;
        }

        .user-message .message-text {
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          color: #0f1419;
          border-bottom-right-radius: 0.3rem;
        }

        .ai-message .message-text {
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-text);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom-left-radius: 0.3rem;
        }

        .message-mood {
          align-self: flex-end;
          font-size: 1.2rem;
          margin-top: 0.2rem;
        }

        .message-time {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.3rem;
        }

        .user-message .message-time {
          text-align: right;
        }

        .typing-placeholder {
          min-height: 1.2em;
          display: flex;
          align-items: center;
        }

        .typing-dots {
          display: flex;
          gap: 0.2rem;
        }

        .typing-dots span {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .message {
            max-width: 90%;
          }
          
          .ai-avatar {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
          
          .message-text {
            padding: 0.6rem 0.8rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
} 
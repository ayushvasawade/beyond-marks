"use client";
import React, { useState } from "react";
import { auth } from "../firebase";

// Define a minimal User type for currentUser
interface UserLike {
  uid: string;
  [key: string]: unknown;
}

interface Reply {
  uid: string;
  message: string;
  created_at: Date | string | { toDate: () => Date };
  reactions: {
    thanks: number;
    helpful: number;
  };
}

interface Doubt {
  id: string;
  uid: string;
  title: string;
  body: string;
  tags: string[];
  created_at: Date | string | { toDate: () => Date };
  resolved: boolean;
  replies: Reply[];
  reactions: {
    thanks: number;
    helpful: number;
    same_doubt: number;
  };
  author: {
    uid: string;
    name: string;
    username: string;
  };
}

export type { Doubt };

interface DoubtCardProps {
  doubt: Doubt;
  currentUser: UserLike | null;
  onConnect: (userId: string) => void;
  onReply: () => void;
  onResolve: () => void;
}

export default function DoubtCard({ doubt, currentUser, onConnect, onReply, onResolve }: DoubtCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!newReply.trim()) return;

    setIsSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://localhost:5000/api/community/doubts/${doubt.id}/replies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newReply })
      });
      
      if (response.ok) {
        setNewReply("");
        onReply();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding reply:', error.message);
      } else {
        console.error('Error adding reply:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolve = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://localhost:5000/api/community/doubts/${doubt.id}/resolve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        onResolve();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error marking doubt resolved:', error.message);
      } else {
        console.error('Error marking doubt resolved:', error);
      }
    }
  };

  const formatDate = (date: Date | string | { toDate: () => Date }) => {
    if (!date) return '';
    let d: Date;
    if (typeof date === 'string') {
      d = new Date(date);
    } else if (date instanceof Date) {
      d = date;
    } else if (typeof date === 'object' && typeof date.toDate === 'function') {
      d = date.toDate();
    } else {
      return '';
    }
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAuthor = doubt.uid === currentUser?.uid;

  return (
    <div className={`doubt-card ${doubt.resolved ? 'resolved' : ''}`}>
      {/* Doubt Header */}
      <div className="doubt-header">
        <div className="doubt-author">
          <div className="author-avatar">
            {doubt.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="author-info">
            <span className="author-name">{doubt.author.name}</span>
            <span className="doubt-date">{formatDate(doubt.created_at)}</span>
          </div>
        </div>
        
        <div className="doubt-actions">
          {!isAuthor && (
            <button 
              className="connect-btn"
              onClick={() => onConnect(doubt.uid)}
            >
              🤝 Connect
            </button>
          )}
          
          {isAuthor && !doubt.resolved && (
            <button 
              className="resolve-btn"
              onClick={handleResolve}
            >
              ✅ Mark Resolved
            </button>
          )}
          
          {doubt.resolved && (
            <span className="resolved-badge">✅ Resolved</span>
          )}
        </div>
      </div>

      {/* Doubt Content */}
      <div className="doubt-content">
        <h3 className="doubt-title">{doubt.title}</h3>
        <p className="doubt-body">{doubt.body}</p>
        
        {doubt.tags.length > 0 && (
          <div className="doubt-tags">
            {doubt.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Doubt Reactions */}
      <div className="doubt-reactions">
        <div className="reaction-item">
          <span className="reaction-icon">🙌</span>
          <span className="reaction-count">{doubt.reactions.thanks}</span>
        </div>
        <div className="reaction-item">
          <span className="reaction-icon">💡</span>
          <span className="reaction-count">{doubt.reactions.helpful}</span>
        </div>
        <div className="reaction-item">
          <span className="reaction-icon">🤝</span>
          <span className="reaction-count">{doubt.reactions.same_doubt}</span>
        </div>
      </div>

      {/* Replies Section */}
      <div className="replies-section">
        <div className="replies-header">
          <button 
            className="toggle-replies-btn"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? '▼' : '▶'} {doubt.replies.length} Replies
          </button>
        </div>

        {showReplies && (
          <div className="replies-list">
            {doubt.replies.length === 0 ? (
              <p className="no-replies">No replies yet. Be the first to help!</p>
            ) : (
              doubt.replies.map((reply, index) => (
                <div key={index} className="reply-item">
                  <div className="reply-header">
                    <span className="reply-author">Anonymous Helper</span>
                    <span className="reply-date">{formatDate(reply.created_at)}</span>
                  </div>
                  <p className="reply-message">{reply.message}</p>
                  <div className="reply-reactions">
                    <button className="reply-reaction-btn">🙌 Thank you</button>
                    <button className="reply-reaction-btn">💡 That helped</button>
                  </div>
                </div>
              ))
            )}

            {/* Add Reply Form */}
            <div className="add-reply">
              <textarea
                className="reply-input"
                placeholder="Share your thoughts, encouragement, or solution..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={3}
              />
              <div className="reply-actions">
                <button 
                  className="submit-reply-btn"
                  onClick={handleReply}
                  disabled={isSubmitting || !newReply.trim()}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .doubt-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .doubt-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(0, 188, 212, 0.3);
        }

        .doubt-card.resolved {
          border-color: rgba(76, 175, 80, 0.5);
          background: rgba(76, 175, 80, 0.05);
        }

        /* Doubt Header */
        .doubt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .doubt-author {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #0f1419;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: #00bcd4;
        }

        .doubt-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .doubt-actions {
          display: flex;
          gap: 0.5rem;
        }

        .connect-btn, .resolve-btn {
          background: rgba(0, 188, 212, 0.2);
          border: 1px solid #00bcd4;
          color: #00bcd4;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .connect-btn:hover, .resolve-btn:hover {
          background: rgba(0, 188, 212, 0.3);
        }

        .resolved-badge {
          background: rgba(76, 175, 80, 0.2);
          border: 1px solid #4caf50;
          color: #4caf50;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
        }

        /* Doubt Content */
        .doubt-content {
          margin-bottom: 1rem;
        }

        .doubt-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .doubt-body {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .doubt-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: rgba(0, 188, 212, 0.2);
          border: 1px solid rgba(0, 188, 212, 0.3);
          color: #00bcd4;
          padding: 0.2rem 0.6rem;
          border-radius: 1rem;
          font-size: 0.8rem;
        }

        /* Doubt Reactions */
        .doubt-reactions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reaction-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          cursor: pointer;
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          transition: all 0.3s;
        }

        .reaction-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .reaction-icon {
          font-size: 1.1rem;
        }

        .reaction-count {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Replies Section */
        .replies-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }

        .replies-header {
          margin-bottom: 1rem;
        }

        .toggle-replies-btn {
          background: none;
          border: none;
          color: #00bcd4;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .toggle-replies-btn:hover {
          color: #64ffda;
        }

        .replies-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .no-replies {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
          padding: 1rem;
        }

        .reply-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.8rem;
          padding: 1rem;
        }

        .reply-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .reply-author {
          font-weight: 600;
          color: #00bcd4;
        }

        .reply-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .reply-message {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 0.8rem;
        }

        .reply-reactions {
          display: flex;
          gap: 0.5rem;
        }

        .reply-reaction-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.8rem;
        }

        .reply-reaction-btn:hover {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
          color: #00bcd4;
        }

        /* Add Reply Form */
        .add-reply {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.8rem;
          padding: 1rem;
        }

        .reply-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          padding: 0.8rem;
          color: var(--color-text);
          font-family: inherit;
          resize: vertical;
          margin-bottom: 0.8rem;
        }

        .reply-input:focus {
          outline: none;
          border-color: #00bcd4;
          background: rgba(255, 255, 255, 0.15);
        }

        .reply-actions {
          display: flex;
          justify-content: flex-end;
        }

        .submit-reply-btn {
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          color: #0f1419;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .submit-reply-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
        }

        .submit-reply-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .doubt-header {
            flex-direction: column;
            gap: 1rem;
          }

          .doubt-actions {
            align-self: flex-end;
          }

          .replies-header {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
} 
"use client";
import React from "react";

interface MoodSelectorProps {
  currentMood: string;
  onSelectMood: (mood: string) => void;
  onClose: () => void;
}

export default function MoodSelector({ currentMood, onSelectMood, onClose }: MoodSelectorProps) {
  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', description: 'Feeling good!' },
    { id: 'excited', emoji: '🤩', label: 'Excited', description: 'Ready to learn!' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', description: 'Just okay' },
    { id: 'confused', emoji: '🤔', label: 'Confused', description: 'Need help' },
    { id: 'frustrated', emoji: '😤', label: 'Frustrated', description: 'Feeling stuck' }
  ];

  return (
    <div className="mood-selector">
      <div className="mood-header">
        <h4>How are you feeling?</h4>
        <button className="close-mood-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-option ${currentMood === mood.id ? 'selected' : ''}`}
            onClick={() => onSelectMood(mood.id)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <div className="mood-info">
              <span className="mood-label">{mood.label}</span>
              <span className="mood-description">{mood.description}</span>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .mood-selector {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.8rem;
          padding: 1rem;
          margin-top: 0.8rem;
        }

        .mood-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .mood-header h4 {
          margin: 0;
          color: #ffffff;
          font-size: 1rem;
        }

        .close-mood-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 0.3rem;
          transition: all 0.3s;
        }

        .close-mood-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .mood-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mood-option {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.6rem;
          padding: 0.8rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          width: 100%;
        }

        .mood-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .mood-option.selected {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        .mood-emoji {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .mood-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .mood-label {
          font-weight: 600;
          color: #ffffff;
          font-size: 0.9rem;
        }

        .mood-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
        }

        .mood-option.selected .mood-label {
          color: #00bcd4;
        }

        .mood-option.selected .mood-description {
          color: rgba(0, 188, 212, 0.8);
        }
      `}</style>
    </div>
  );
} 
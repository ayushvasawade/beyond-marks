"use client";
import React, { useState } from "react";

interface DoubtData {
  title: string;
  body: string;
  tags: string[];
}

interface CreateDoubtModalProps {
  onClose: () => void;
  onSubmit: (doubtData: DoubtData) => void;
}

export default function CreateDoubtModal({ onClose, onSubmit }: CreateDoubtModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "General"];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        tags: tags
      });
      
      // Reset form
      setTitle("");
      setBody("");
      setTags([]);
      setNewTag("");
    } catch (error) {
      console.error('Error creating doubt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✨ Post a New Doubt</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="doubt-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Why is my flexbox layout not centering?"
              required
              maxLength={100}
            />
            <span className="char-count">{title.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="body">Description *</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your doubt in detail. What have you tried? What's not working?"
              required
              rows={6}
              maxLength={1000}
            />
            <span className="char-count">{body.length}/1000</span>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-section">
              <div className="available-tags">
                <p className="tags-label">Quick add:</p>
                <div className="tag-buttons">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-btn ${tags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => {
                        if (tags.includes(tag)) {
                          handleRemoveTag(tag);
                        } else {
                          setTags([...tags, tag]);
                        }
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-tag">
                <p className="tags-label">Add custom tag:</p>
                <div className="tag-input-group">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter custom tag"
                    maxLength={20}
                  />
                  <button
                    type="button"
                    className="add-tag-btn"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="selected-tags">
                  <p className="tags-label">Selected tags:</p>
                  <div className="selected-tags-list">
                    {tags.map((tag) => (
                      <span key={tag} className="selected-tag">
                        {tag}
                        <button
                          type="button"
                          className="remove-tag-btn"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !title.trim() || !body.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post Doubt'}
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 0;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            backdrop-filter: blur(20px);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .modal-header h2 {
            margin: 0;
            color: #00bcd4;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .close-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s;
          }

          .close-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
          }

          .doubt-form {
            padding: 1.5rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #ffffff;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            padding: 0.8rem;
            color: var(--color-text);
            font-family: inherit;
            transition: all 0.3s;
          }

          .form-group input:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #00bcd4;
            background: rgba(255, 255, 255, 0.15);
          }

          .char-count {
            display: block;
            text-align: right;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0.3rem;
          }

          /* Tags Section */
          .tags-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .tags-label {
            margin: 0 0 0.5rem 0;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
          }

          .available-tags {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
          }

          .tag-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tag-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.8);
            padding: 0.4rem 0.8rem;
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
          }

          .tag-btn:hover {
            background: rgba(0, 188, 212, 0.2);
            border-color: #00bcd4;
            color: #00bcd4;
          }

          .tag-btn.selected {
            background: rgba(0, 188, 212, 0.3);
            border-color: #00bcd4;
            color: #00bcd4;
          }

          .custom-tag {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
          }

          .tag-input-group {
            display: flex;
            gap: 0.5rem;
          }

          .tag-input-group input {
            flex: 1;
          }

          .add-tag-btn {
            background: rgba(0, 188, 212, 0.2);
            border: 1px solid #00bcd4;
            color: #00bcd4;
            padding: 0.8rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
          }

          .add-tag-btn:hover:not(:disabled) {
            background: rgba(0, 188, 212, 0.3);
          }

          .add-tag-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .selected-tags {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
          }

          .selected-tags-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .selected-tag {
            background: rgba(0, 188, 212, 0.2);
            border: 1px solid #00bcd4;
            color: #00bcd4;
            padding: 0.3rem 0.6rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
          }

          .remove-tag-btn {
            background: none;
            border: none;
            color: #00bcd4;
            cursor: pointer;
            font-size: 1rem;
            padding: 0;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
          }

          .remove-tag-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
          }

          /* Form Actions */
          .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .cancel-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.8);
            padding: 0.8rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
          }

          .cancel-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
          }

          .submit-btn {
            background: linear-gradient(135deg, #00bcd4, #64ffda);
            color: #0f1419;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.3s;
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
          }

          .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .modal-content {
              margin: 1rem;
              max-height: calc(100vh - 2rem);
            }

            .form-actions {
              flex-direction: column;
            }

            .tag-input-group {
              flex-direction: column;
            }

            .add-tag-btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
} 
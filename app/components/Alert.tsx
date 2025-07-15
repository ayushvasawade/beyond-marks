import React from 'react';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  suggestions?: string[];
}

export default function Alert({ isOpen, onClose, type, title, message, suggestions }: AlertProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'rgba(76, 175, 80, 0.1)';
      case 'error': return 'rgba(255, 107, 107, 0.1)';
      case 'warning': return 'rgba(255, 193, 7, 0.1)';
      case 'info': return 'rgba(33, 150, 243, 0.1)';
      default: return 'rgba(33, 150, 243, 0.1)';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#ff6b6b';
      case 'warning': return '#ffc107';
      case 'info': return '#2196f3';
      default: return '#2196f3';
    }
  };

  return (
    <>
      <div className="alert-overlay" onClick={onClose}></div>
      <div 
        className="alert-modal"
        style={{
          background: getBgColor(),
          borderLeft: `4px solid ${getBorderColor()}`
        }}
      >
        <div className="alert-header">
          <div className="alert-icon">{getIcon()}</div>
          <h3 className="alert-title">{title}</h3>
          <button className="alert-close" onClick={onClose}>×</button>
        </div>
        
        <div className="alert-content">
          <p className="alert-message">{message}</p>
          
          {suggestions && suggestions.length > 0 && (
            <div className="alert-suggestions">
              <h4>Suggestions for improvement:</h4>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="alert-actions">
          <button className="alert-btn" onClick={onClose}>
            {type === 'success' ? 'Continue' : 'Got it'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        
        .alert-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #23272f;
          border-radius: 1rem;
          padding: 1.5rem;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          z-index: 1001;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: alertSlideIn 0.3s ease-out;
        }
        
        @keyframes alertSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        .alert-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        
        .alert-icon {
          font-size: 1.5rem;
        }
        
        .alert-title {
          flex: 1;
          margin: 0;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
        }
        
        .alert-close {
          background: none;
          border: none;
          color: #888;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .alert-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .alert-content {
          margin-bottom: 1.5rem;
        }
        
        .alert-message {
          color: #fff;
          margin: 0 0 1rem 0;
          line-height: 1.5;
          font-size: 1rem;
        }
        
        .alert-suggestions h4 {
          color: #00bcd4;
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }
        
        .alert-suggestions ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #ffeb3b;
        }
        
        .alert-suggestions li {
          margin: 0.3rem 0;
          line-height: 1.4;
        }
        
        .alert-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .alert-btn {
          background: linear-gradient(135deg, #00bcd4, #ffeb3b);
          color: #222;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .alert-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
        }
        
        @media (max-width: 600px) {
          .alert-modal {
            width: 95%;
            padding: 1rem;
          }
          
          .alert-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
} 
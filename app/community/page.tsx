"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import DoubtCard, { type Doubt } from "../components/DoubtCard";
import CreateDoubtModal from "../components/CreateDoubtModal";
import ClientOnly from "../components/ClientOnly";

// Add types for connections and doubts
interface Connection {
  uid: string;
  name: string;
  total_replies_helped: number;
}
interface DoubtItem {
  id: string;
  // Add other properties as needed
}

function CommunityHubContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [filter, setFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const router = useRouter();

  // Move fetchDoubts and fetchConnections above useEffect and wrap with useCallback
  const fetchDoubts = React.useCallback(async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://localhost:5000/api/community/doubts?filter=${filter}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoubts(data.doubts);
      }
    } catch (error) {
      console.error('Error fetching doubts:', error);
    }
  }, [filter]);

  const fetchConnections = React.useCallback(async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:5000/api/community/connections', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchDoubts();
        fetchConnections();
      }
    });
    return () => unsubscribe();
  }, [fetchDoubts, fetchConnections]);

  const handleCreateDoubt = async (doubtData: any) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:5000/api/community/doubts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doubtData)
      });
      
      if (response.ok) {
        setShowCreateModal(false);
        fetchDoubts();
      }
    } catch (error) {
      console.error('Error creating doubt:', error);
    }
  };

  const handleConnect = async (userId: any) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://localhost:5000/api/community/connect/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        fetchConnections();
        fetchDoubts();
      }
    } catch (error) {
      console.error('Error connecting with user:', error);
    }
  };

  if (loading) {
    return (
      <main className="community-bg">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading community...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="community-bg">
        <div className="not-logged-in">
          <h2>Please log in to access the community</h2>
          <Link href="/login" className="login-link">Go to Login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="community-bg">
      {/* Header/Navbar */}
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🚀</span>
            <span className="brand-text">BeyondMarks</span>
          </div>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/community" className="nav-link active">Community</Link>
            <Link href="/mentor-chat" className="nav-link">AI Mentor</Link>
            <Link href="/profile" className="nav-link">Profile</Link>
            <button className="nav-link logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🧑‍🤝‍🧑 Community Doubt Hub</h1>
          <p className="hero-subtitle">Ask questions, share knowledge, and grow together in a supportive learning environment</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="content-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>Quick Actions</h3>
              <button 
                className="create-doubt-btn"
                onClick={() => setShowCreateModal(true)}
              >
                ✨ Post a Doubt
              </button>
            </div>

            <div className="sidebar-section">
              <h3>Filters</h3>
              <div className="filter-options">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Doubts
                </button>
                <button 
                  className={`filter-btn ${filter === 'my_connections' ? 'active' : ''}`}
                  onClick={() => setFilter('my_connections')}
                >
                  My Connections
                </button>
                <button 
                  className={`filter-btn ${filter === 'unresolved' ? 'active' : ''}`}
                  onClick={() => setFilter('unresolved')}
                >
                  Unresolved
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Topic Tags</h3>
              <div className="tag-filters">
                <button className="tag-btn">HTML</button>
                <button className="tag-btn">CSS</button>
                <button className="tag-btn">JavaScript</button>
                <button className="tag-btn">React</button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Your Connections ({connections.length})</h3>
              <div className="connections-list">
                {connections.map((connection) => (
                  <div key={connection.uid} className="connection-item">
                    <span className="connection-name">{connection.name}</span>
                    <span className="connection-help">Helped {connection.total_replies_helped} times</span>
                  </div>
                ))}
                {connections.length === 0 && (
                  <p className="no-connections">No connections yet. Start helping others to build connections!</p>
                )}
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="feed">
            <div className="feed-header">
              <h2>Recent Doubts</h2>
              <button 
                className="refresh-btn"
                onClick={fetchDoubts}
              >
                🔄 Refresh
              </button>
            </div>

            <div className="doubts-list">
              {doubts.length === 0 ? (
                <div className="no-doubts">
                  <div className="no-doubts-icon">🤔</div>
                  <h3>No doubts yet</h3>
                  <p>Be the first to ask a question and help others learn!</p>
                  <button 
                    className="create-doubt-btn"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Post Your First Doubt
                  </button>
                </div>
              ) : (
                doubts.map((doubt) => (
                  <DoubtCard
                    key={doubt.id}
                    doubt={doubt}
                    currentUser={user as any}
                    onConnect={handleConnect}
                    onReply={() => fetchDoubts()}
                    onResolve={() => fetchDoubts()}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </section>

      {/* Create Doubt Modal */}
      {showCreateModal && (
        <CreateDoubtModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDoubt}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Nunito:wght@400;600;700&display=swap');
        
        .community-bg {
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

        /* Hero Section */
        .hero-section {
          padding: 3rem 2rem;
          text-align: center;
          background: rgba(0, 188, 212, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .content-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        /* Sidebar */
        .sidebar {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          padding: 1.5rem;
          height: fit-content;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
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

        .create-doubt-btn {
          width: 100%;
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          color: #0f1419;
          border: none;
          padding: 0.8rem 1rem;
          border-radius: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .create-doubt-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        .filter-btn:hover, .filter-btn.active {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        .tag-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text);
          padding: 0.3rem 0.8rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .tag-btn:hover {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        .connections-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .connection-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .connection-name {
          display: block;
          font-weight: 600;
          color: #00bcd4;
        }

        .connection-help {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .no-connections {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          text-align: center;
        }

        /* Feed */
        .feed {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feed-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00bcd4;
        }

        .refresh-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .refresh-btn:hover {
          background: rgba(0, 188, 212, 0.2);
          border-color: #00bcd4;
        }

        .doubts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .no-doubts {
          text-align: center;
          padding: 3rem 1rem;
        }

        .no-doubts-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-doubts h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #00bcd4;
        }

        .no-doubts p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
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
        @media (max-width: 768px) {
          .content-container {
            grid-template-columns: 1fr;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .nav-container {
            padding: 0 1rem;
          }
          
          .main-content {
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  );
}

export default function CommunityHub() {
  return (
    <ClientOnly>
      <CommunityHubContent />
    </ClientOnly>
  );
} 
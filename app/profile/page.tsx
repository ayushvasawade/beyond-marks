"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, User, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import ClientOnly from "../components/ClientOnly";

interface UserData {
  name: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  joinDate: string;
  completedModules: number;
  totalModules: number;
}

function ProfileContent() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        // If username or name is missing, update Firestore from Auth
        if ((!data.username || !data.name) && user) {
          const updatedData = {
            name: data.name || user.displayName || "User",
            username: data.username || user.displayName || "user",
            email: user.email || "",
          };
          await setDoc(doc(db, "users", uid), updatedData, { merge: true });
          // Refetch after update
          const refreshedDoc = await getDoc(doc(db, "users", uid));
          const refreshedData = refreshedDoc.data();
          setUserData({
            name: refreshedData?.name || user?.displayName || "User",
            username: refreshedData?.username || user?.displayName || "user",
            email: user?.email || "",
            xp: refreshedData?.xp || 0,
            level: refreshedData?.level || 1,
            joinDate: refreshedData?.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            completedModules: refreshedData?.completedModules || 0,
            totalModules: refreshedData?.totalModules || 5
          });
          return;
        }
        setUserData({
          name: data.name || user?.displayName || "User",
          username: data.username || user?.displayName || "user",
          email: user?.email || "",
          xp: data.xp || 0,
          level: data.level || 1,
          joinDate: data.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          completedModules: data.completedModules || 0,
          totalModules: data.totalModules || 5
        });
      } else {
        // Create user document if it doesn't exist
        const defaultData: UserData = {
          name: user?.displayName || "User",
          username: user?.displayName || "user",
          email: user?.email || "",
          xp: 0,
          level: 1,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          completedModules: 0,
          totalModules: 5
        };
        await setDoc(doc(db, "users", uid), defaultData);
        setUserData(defaultData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching user data:", error);
        // Fallback to basic user data
        setUserData({
          name: user?.displayName || "User",
          username: user?.displayName || "user",
          email: user?.email || "",
          xp: 0,
          level: 1,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          completedModules: 0,
          totalModules: 5
        });
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    if (!user || !user.email) {
      setError("User not found. Please log in again.");
      return;
    }
    
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, passwordForm.newPassword);
      
      setMessage("Password updated successfully!");
      setShowPasswordForm(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Failed to update password. Please try again.");
      } else {
        setError("Failed to update password. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <main className="profile-bg">
        <div className="loading">Loading profile...</div>
        <style jsx>{`
          .profile-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #e0f2fe 0%, #a7f3d0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
          }
          .loading {
            color: #312e81;
            font-size: 1.2rem;
            font-weight: 700;
          }
        `}</style>
      </main>
    );
  }

  if (!user || !userData) {
    return (
      <main className="profile-bg">
        <div className="not-logged-in">
          <h2>Please log in to view your profile</h2>
          <Link href="/login" className="login-link">Go to Login</Link>
        </div>
        <style jsx>{`
          .profile-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #e0f2fe 0%, #a7f3d0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
          }
          .not-logged-in {
            text-align: center;
            color: #312e81;
          }
          .not-logged-in h2 {
            margin-bottom: 1rem;
          }
          .login-link {
            color: #6366f1;
            text-decoration: none;
            font-weight: 700;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="profile-bg">
      {/* Header */}
      <header className="profile-header">
        <Link href="/dashboard" className="back-btn">Back to Dashboard</Link>
        <h1>Profile Settings</h1>
      </header>

      {/* User Info Card */}
      <section className="profile-card">
        <div className="user-avatar">
          <span>{userData.username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="user-info">
          <h2>{userData.name}</h2>
          <p className="username">@{userData.username}</p>
          <p className="email">{userData.email}</p>
        </div>
      </section>

      {/* Stats Card */}
      <section className="profile-card">
        <h3>Your Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{userData.xp}</span>
            <span className="stat-label">Total XP</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userData.level}</span>
            <span className="stat-label">Level</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userData.completedModules}/{userData.totalModules}</span>
            <span className="stat-label">Modules</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userData.joinDate}</span>
            <span className="stat-label">Joined</span>
          </div>
        </div>
      </section>

      {/* Account Settings */}
      <section className="profile-card">
        <h3>Account Settings</h3>
        <div className="settings-list">
          <button 
            className="setting-btn"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            🔑 Change Password
          </button>
          <button className="setting-btn">
            📧 Change Email
          </button>
          <button className="setting-btn">
            🗑️ Delete Account
          </button>
        </div>
      </section>

      {/* Password Change Form */}
      {showPasswordForm && (
        <section className="profile-card">
          <h3>🔑 Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <label>
              Current Password
              <input 
                type="password" 
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
            </label>
            <label>
              New Password
              <input 
                type="password" 
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
            </label>
            <label>
              Confirm New Password
              <input 
                type="password" 
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  setError("");
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </div>
            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}
          </form>
        </section>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Nunito:wght@700&display=swap');
        .profile-bg {
          min-height: 100vh;
          background: var(--color-bg);
          font-family: 'Poppins', 'Nunito', sans-serif;
          padding: 2rem 1rem 3rem 1rem;
        }
        .profile-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .back-btn {
          color: var(--color-accent);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .profile-header h1 {
          font-size: 2rem;
          font-weight: 900;
          color: var(--color-accent);
        }
        .profile-card {
          background: var(--color-card);
          border-radius: 1.3rem;
          box-shadow: var(--color-shadow);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .user-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(90deg, var(--color-accent2) 0%, var(--color-accent) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          margin: 0 auto 1rem auto;
        }
        .user-info {
          text-align: center;
        }
        .user-info h2 {
          font-size: 1.5rem;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }
        .username {
          color: var(--color-accent2);
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        .email {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
        .profile-card h3 {
          font-size: 1.2rem;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .stat-item {
          text-align: center;
          padding: 1rem;
          background: var(--color-bg-alt);
          border-radius: 1rem;
        }
        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-accent);
        }
        .stat-label {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          font-weight: 700;
        }
        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .setting-btn {
          background: var(--color-bg-alt);
          border: none;
          border-radius: 1rem;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          cursor: pointer;
          transition: background 0.13s;
          text-align: left;
        }
        .setting-btn:hover {
          background: var(--color-accent2);
          color: #222;
        }
        .password-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .password-form label {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .password-form input {
          border: none;
          border-radius: 1rem;
          background: var(--color-bg-alt);
          color: var(--color-text);
          padding: 0.8rem 1rem;
          font-size: 1rem;
          outline: none;
          transition: box-shadow 0.13s;
        }
        .password-form input:focus {
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .save-btn {
          background: linear-gradient(90deg, var(--color-accent2) 0%, var(--color-accent) 100%);
          color: #222;
          font-weight: 700;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          flex: 1;
        }
        .cancel-btn {
          background: var(--color-bg-alt);
          color: var(--color-text-muted);
          font-weight: 700;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          flex: 1;
        }
        .form-error {
          color: #ef4444;
          background: #2c1a1a;
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          text-align: center;
          margin-top: 0.5rem;
        }
        .form-success {
          color: #22c55e;
          background: #1e293b;
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          text-align: center;
          margin-top: 0.5rem;
        }
        @media (max-width: 600px) {
          .profile-card {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}

export default function Profile() {
  return (
    <ClientOnly>
      <ProfileContent />
    </ClientOnly>
  );
} 
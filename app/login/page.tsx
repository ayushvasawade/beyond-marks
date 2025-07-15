"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials. Please try again.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-bg">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <h1>Welcome Back, <span>Web Creator!</span></h1>
        <label>
          Email Address
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" autoComplete="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" autoComplete="current-password" required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Log In"}</button>
        <div className="auth-link">
          New here? <a href="/signup">Create an account</a>
        </div>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Nunito:wght@700&display=swap');
        .auth-bg {
          min-height: 100vh;
          background: var(--color-bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-form {
          background: var(--color-card);
          border-radius: 1.5rem;
          box-shadow: var(--color-shadow);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 370px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          font-family: 'Poppins', 'Nunito', sans-serif;
        }
        .auth-form h1 {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-accent);
          margin-bottom: 1.2rem;
          text-align: center;
        }
        .auth-form h1 span {
          color: var(--color-accent2);
        }
        label {
          font-size: 1rem;
          color: var(--color-text);
          font-weight: 700;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        input {
          border: none;
          border-radius: 1rem;
          background: var(--color-bg-alt);
          color: var(--color-text);
          padding: 0.8rem 1rem;
          font-size: 1rem;
          margin-top: 0.2rem;
          font-family: inherit;
          outline: none;
          transition: box-shadow 0.13s;
        }
        input:focus {
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        button {
          background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent2) 100%);
          color: #222;
          font-weight: 700;
          border: none;
          border-radius: 1.2rem;
          padding: 0.9rem 0;
          font-size: 1.1rem;
          margin-top: 0.7rem;
          cursor: pointer;
          box-shadow: var(--color-shadow);
          transition: background 0.13s, transform 0.13s;
        }
        button:hover:not(:disabled) {
          background: linear-gradient(90deg, var(--color-accent2) 0%, var(--color-accent) 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .auth-link {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.98rem;
        }
        .auth-link a {
          color: var(--color-accent);
          text-decoration: underline;
          font-weight: 700;
        }
        .auth-error {
          color: #ef4444;
          background: #2c1a1a;
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          text-align: center;
          margin-top: 0.5rem;
        }
        @media (max-width: 500px) {
          .auth-form {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
} 
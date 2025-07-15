"use client";
import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { User } from "firebase/auth";
import Alert from "../../components/Alert";

interface UserData {
  xp: number;
  level: number;
  streak: number;
  goal: string;
  lastCode: string;
  lastMistakes: string[];
  completedTasks: string[];
  achievements: string[];
}

const initialTask = {
  task: "Create a simple HTML page with a heading and a paragraph.",
  challenge: "Add a CSS rule to make the heading blue.",
  tip: "Use <h1> for the heading and <p> for the paragraph. In CSS, use color: blue; for the h1 selector."
};

// Define a type for validation result (minimal, expand as needed)
type ValidationResult = {
  isValid: boolean;
  suggestions: string[];
};

export default function HTMLCSSLearning() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [xpAnim, setXpAnim] = useState(false);
  const [editorHtml, setEditorHtml] = useState("<h1>Hello, world!</h1>\n<p>Welcome to BeyondMarks!</p>");
  const [editorCss, setEditorCss] = useState("h1 { color: #00bcd4; }\np { color: #fff; }");
  const [aiTask, setAiTask] = useState(initialTask);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [badges, setBadges] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [goal, setGoal] = useState("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [lastMistakes, setLastMistakes] = useState<string[]>([]);
  const [xpBar, setXpBar] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState("");
  const [explanation, setExplanation] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validating, setValidating] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    title: '',
    message: '',
    suggestions: [] as string[]
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch user and userData
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          // Map Firestore data to UserData interface with defaults
          const userDataWithDefaults: UserData = {
            xp: data.xp || 0,
            level: data.level || 1,
            streak: data.streak || 0,
            goal: data.goal || "",
            lastCode: data.lastCode || "<h1>Hello, world!</h1>\n<p>Welcome to BeyondMarks!</p>",
            lastMistakes: data.lastMistakes || [],
            completedTasks: data.completedTasks || [],
            achievements: data.achievements || [],
          };
          setUserData(userDataWithDefaults);
          setXp(userDataWithDefaults.xp);
          setLevel(userDataWithDefaults.level);
          setStreak(userDataWithDefaults.streak);
          setGoal(userDataWithDefaults.goal);
          setCompletedTasks(userDataWithDefaults.completedTasks);
          setLastMistakes(userDataWithDefaults.lastMistakes);
          setBadges(userDataWithDefaults.achievements);
          setEditorHtml(userDataWithDefaults.lastCode);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Animate XP bar
  useEffect(() => {
    setXpBar((xp % 100) || 0);
  }, [xp]);

  // Live preview srcDoc
  const srcDoc = `<!DOCTYPE html><html><head><style>${editorCss}</style></head><body>${editorHtml}</body></html>`;

  // Submit and validate code
  const handleSubmit = async () => {
    setAiLoading(true);
    setAiError("");
    setValidating(true);
    
    try {
      // First, validate the code
      console.log("Validating code...");
      const validateRes = await fetch("/api/validate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          code: editorHtml + "\n<style>" + editorCss + "</style>",
          task: aiTask.task,
          xp: xp
        })
      });
      
      if (!validateRes.ok) {
        const errorText = await validateRes.text();
        console.error("Validation API Error:", errorText);
        throw new Error(`Failed to validate code: ${validateRes.status} ${errorText}`);
      }
      
      const validationData = await validateRes.json();
      console.log("Validation response:", validationData);
      setValidationResult(validationData);
      
      // Show validation result
      if (validationData.isValid) {
        setAlert({
          isOpen: true,
          type: 'success',
          title: 'Great Job!',
          message: 'Your code meets the requirements!',
          suggestions: validationData.suggestions.slice(0, 3)
        });
      } else {
        setAlert({
          isOpen: true,
          type: 'error',
          title: 'Code Needs Improvement',
          message: 'Your code doesn\'t fully meet the requirements yet.',
          suggestions: validationData.suggestions.slice(0, 5)
        });
        setValidating(false);
        setAiLoading(false);
        return; // Don't proceed with submission if validation fails
      }
      
      // If validation passes, proceed with AI task generation
      console.log("Sending request to API...");
      const res = await fetch("/api/gemini/task", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          code: editorHtml + "\n<style>" + editorCss + "</style>",
          xp,
          goal,
          errors: lastMistakes
        })
      });
      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        throw new Error(`Failed to get AI task: ${res.status} ${errorText}`);
      }
      
      const data = await res.json();
      console.log("API Response data:", data);
      setAiTask(data);
      setAiError(""); // Clear any previous errors
      // XP animation
      setXpAnim(true);
      setTimeout(() => setXpAnim(false), 1200);
      // Save code and XP to Firestore
      if (user) {
        try {
          await updateDoc(doc(db, "users", user.uid), {
            lastCode: editorHtml,
            xp: xp + 10,
            completedTasks: arrayUnion(data.task),
          });
          setXp(xp + 10);
          setCompletedTasks([...completedTasks, data.task]);
        } catch (firebaseError: unknown) {
          // If document doesn't exist, create it
          if (
            firebaseError &&
            typeof firebaseError === 'object' &&
            'code' in firebaseError &&
            (firebaseError as { code?: string; message?: string }).code === 'not-found' ||
            (firebaseError as { message?: string }).message?.includes('No document to update')
          ) {
            console.log("Creating new user document...");
            await setDoc(doc(db, "users", user.uid), {
              xp: xp + 10,
              level: 1,
              streak: 0,
              goal: "",
              lastCode: editorHtml,
              lastMistakes: [],
              completedTasks: [data.task],
              achievements: [],
            });
            setXp(xp + 10);
            setCompletedTasks([data.task]);
          } else {
            console.error("Firebase error:", firebaseError);
          }
        }
      }
    } catch (e) {
      console.error("Frontend error:", e);
      setAiError("Could not connect to AI. Try again.");
      setAlert({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Could not validate or submit code. Please try again.',
        suggestions: []
      });
    } finally {
      setAiLoading(false);
      setValidating(false);
    }
  };

  // Reset editor
  const handleReset = () => {
    setEditorHtml("");
    setEditorCss("");
  };

  // Hint and Explain
  const handleHint = async () => {
    setShowHint(true);
    setHint("Loading...");
    try {
      const res = await fetch("/api/gemini/task", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          code: editorHtml + "\n<style>" + editorCss + "</style>",
          xp,
          goal,
          errors: lastMistakes,
          hint: true
        })
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Hint API Error:", errorText);
        throw new Error(`Failed to get hint: ${res.status} ${errorText}`);
      }
      const data = await res.json();
      console.log("Hint response:", data);
      setHint(data.tip || "No hint available.");
    } catch (e) {
      console.error("Hint error:", e);
      setHint("Could not get hint.");
    }
  };
  const handleExplain = async () => {
    setExplanation("Loading...");
    try {
      const res = await fetch("/api/gemini/task", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          code: editorHtml + "\n<style>" + editorCss + "</style>",
          explain: true
        })
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Explain API Error:", errorText);
        throw new Error(`Failed to get explanation: ${res.status} ${errorText}`);
      }
      const data = await res.json();
      console.log("Explain response:", data);
      setExplanation(data.tip || "No explanation available.");
    } catch (e) {
      console.error("Explain error:", e);
      setExplanation("Could not get explanation.");
    }
  };



  // UI
  return (
    <main className="htmlcss-learn-bg">
      {/* Gamified Header */}
      <header className="gamified-header">
        <div className="xp-bar-wrap">
          <div className="xp-bar-bg">
            <div className={`xp-bar-fill${xpAnim ? " xp-bar-anim" : ""}`} style={{ width: `${xpBar}%` }} />
          </div>
          <span className="xp-label">XP: {xp} / {100 * level}</span>
        </div>
        <div className="level-streak">
          <span className="level">Level {level}</span>
          <span className="streak">🔥 {streak} day streak</span>
        </div>
        <div className="badges">
          {badges && badges.slice(-3).map((b, i) => (
            <span className="badge" key={i}>{b}</span>
          ))}
        </div>
      </header>

      {/* AI Task Section */}
      <section className="ai-task-section">
        <div className="ai-task-card">
          <h3>Current Task</h3>
          <div className="ai-task">{aiTask.task}</div>
          <div className="ai-challenge">{aiTask.challenge}</div>
          <div className="ai-tip">{aiTask.tip}</div>
        </div>
        <div className="ai-actions">
          <button className="ai-btn" onClick={handleHint}>Give me a Hint</button>
          <button className="ai-btn" onClick={handleExplain}>Explain this code</button>
        </div>
        {showHint && <div className="ai-hint">{hint}</div>}
        {explanation && <div className="ai-explain">{explanation}</div>}
        {aiError && <div className="ai-error">{aiError}</div>}
      </section>

      {/* Dual Pane Layout */}
      <section className="dual-pane">
        <div className="editor-pane">
          <h4>HTML</h4>
          <textarea className="code-editor" value={editorHtml} onChange={e => setEditorHtml(e.target.value)} rows={10} spellCheck={false} />
          <h4>CSS</h4>
          <textarea className="code-editor" value={editorCss} onChange={e => setEditorCss(e.target.value)} rows={8} spellCheck={false} />
          <div className="editor-actions">
            <button className="submit-btn" onClick={handleSubmit} disabled={aiLoading || validating}>
              {validating ? 'Validating...' : aiLoading ? 'Submitting...' : 'Submit & Validate'}
            </button>
            <button className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="preview-pane">
          <h4>Live Preview</h4>
          <iframe ref={iframeRef} className="live-preview" srcDoc={srcDoc} title="Output" sandbox="allow-scripts" frameBorder="0" width="100%" height="320" />
        </div>
      </section>

      {/* Custom Alert Component */}
      <Alert
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        suggestions={alert.suggestions}
      />

      <style jsx>{`
        .htmlcss-learn-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Poppins', 'Nunito', sans-serif;
          color: #fff;
          padding-bottom: 3rem;
        }
        .gamified-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          padding: 2rem 0 1.2rem 0;
        }
        .xp-bar-wrap {
          width: 100%;
          max-width: 400px;
        }
        .xp-bar-bg {
          background: #23272f;
          border-radius: 1rem;
          height: 18px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 2px 8px #00bcd4aa;
        }
        .xp-bar-fill {
          background: linear-gradient(90deg, #00bcd4, #ffeb3b);
          height: 100%;
          border-radius: 1rem;
          transition: width 0.7s cubic-bezier(.4,2,.6,1);
        }
        .xp-bar-anim {
          animation: xpGrow 1.2s;
        }
        @keyframes xpGrow {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .xp-label {
          display: block;
          text-align: right;
          font-size: 0.95rem;
          color: #ffeb3b;
          margin-top: 0.2rem;
        }
        .level-streak {
          display: flex;
          gap: 1.5rem;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .level {
          color: #00bcd4;
        }
        .streak {
          color: #ff6b6b;
        }
        .badges {
          display: flex;
          gap: 0.7rem;
        }
        .badge {
          background: #23272f;
          color: #ffeb3b;
          border-radius: 1rem;
          padding: 0.3rem 1rem;
          font-size: 1rem;
          font-weight: 800;
          box-shadow: 0 2px 8px #ffeb3baa;
        }
        .ai-task-section {
          max-width: 800px;
          margin: 2rem auto 1.5rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ai-task-card {
          background: rgba(255,255,255,0.07);
          border-radius: 1.2rem;
          box-shadow: 0 4px 24px #00bcd455;
          padding: 1.5rem 2rem;
          margin-bottom: 1rem;
          width: 100%;
        }
        .ai-task-card h3 {
          color: #00bcd4;
          font-size: 1.2rem;
          font-weight: 900;
          margin-bottom: 0.7rem;
        }
        .ai-task, .ai-challenge, .ai-tip {
          margin-bottom: 0.5rem;
          padding: 0.7rem 1rem;
          border-radius: 0.7rem;
        }
        .ai-task {
          background: #23272f;
          color: #fff;
          font-weight: 700;
        }
        .ai-challenge {
          background: #00bcd4;
          color: #222;
          font-weight: 700;
        }
        .ai-tip {
          background: #ffeb3b;
          color: #222;
          font-weight: 700;
        }
        .ai-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .ai-btn {
          background: #23272f;
          color: #00bcd4;
          border: none;
          border-radius: 1rem;
          padding: 0.5rem 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .ai-btn:hover {
          background: #00bcd4;
          color: #222;
          transform: scale(1.05);
        }
        .ai-hint, .ai-explain, .ai-error {
          margin-top: 0.5rem;
          background: #23272f;
          color: #ffeb3b;
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          font-size: 1rem;
        }
        .ai-error {
          color: #ff6b6b;
        }
        .dual-pane {
          display: flex;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(255,255,255,0.03);
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px #00bcd455;
          padding: 2rem 1.5rem;
        }
        .editor-pane, .preview-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .editor-pane h4, .preview-pane h4 {
          color: #00bcd4;
          font-size: 1.1rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }
        .code-editor {
          width: 100%;
          min-height: 120px;
          background: #181b20;
          color: #fff;
          border: 1px solid #333;
          border-radius: 0.7rem;
          margin-bottom: 1rem;
          padding: 0.8rem;
          font-family: 'Fira Mono', 'Consolas', monospace;
          font-size: 1rem;
          resize: vertical;
        }
        .editor-actions {
          display: flex;
          gap: 1rem;
        }
        .submit-btn {
          background: linear-gradient(90deg, #00bcd4, #ffeb3b);
          color: #222;
          border: none;
          border-radius: 1rem;
          padding: 0.7rem 1.5rem;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .submit-btn:active {
          transform: scale(0.97);
        }
        .reset-btn {
          background: #23272f;
          color: #ff6b6b;
          border: none;
          border-radius: 1rem;
          padding: 0.7rem 1.5rem;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .reset-btn:active {
          transform: scale(0.97);
        }
        .preview-pane {
          align-items: stretch;
        }
        .live-preview {
          width: 100%;
          min-height: 320px;
          background: #fff;
          border-radius: 0.7rem;
          box-shadow: 0 2px 8px #00bcd455;
          margin-top: 0.5rem;
        }
        @media (max-width: 900px) {
          .dual-pane {
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
} 
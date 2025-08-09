'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

type Task = { id: string; title: string; description?: string };

export default function LabQuestPage() {
  const params = useParams();
  const questId = String(params?.id || '');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [activeTaskId, setActiveTaskId] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [mentorInput, setMentorInput] = useState('');
  const [mentorReply, setMentorReply] = useState('');
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/quests/${questId}`);
        const data = await res.json();
        if (!res.ok) throw new Error((data?.error as string) || 'Failed to load quest');
        const t: Task[] = data.quest?.tasks || [];
        setTitle(data.quest?.title || '');
        setTasks(t);
        setActiveTaskId(t[0]?.id || '');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error');
      }
    };
    if (questId) load();
  }, [questId]);

  const activeTask = useMemo(() => tasks.find(t => t.id === activeTaskId), [tasks, activeTaskId]);

  const askMentor = async () => {
    try {
      const res = await fetch('/api/mentor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: mentorInput, context: `${title}\nTask: ${activeTask?.title}\n${activeTask?.description || ''}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data?.error as string) || 'Ask failed');
      setMentorReply(String(data.answer || ''));
    } catch (e) {
      setMentorReply('');
      setError(e instanceof Error ? e.message : 'Error');
    }
  };

  const runCode = () => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    const html = `<!doctype html><html><head><style>body{font-family:monospace;padding:8px}</style></head><body><pre id="log"></pre><script>
    (function(){
      var oldLog = console.log;
      var out = document.getElementById('log');
      console.log = function(){
        var s = Array.from(arguments).map(x => typeof x==='object'? JSON.stringify(x): String(x)).join(' ');
        out.textContent += s + "\n";
        oldLog.apply(console, arguments);
      }
      try{ ${code} }catch(e){ console.log('Error:', e.message) }
    })();
    </script></body></html>`;
    doc.open();
    doc.write(html);
    doc.close();
  };

  const markComplete = async () => {
    if (!activeTask) return;
    const res = await fetch(`/api/quests/${questId}/complete-task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: activeTask.id }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError((data?.error as string) || 'Failed to complete task');
    }
  };

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="h-screen flex bg-[var(--lemonade-1)] text-[var(--lemonade-3)]">
      {/* Left Pane: Tasks */}
      <div className="w-1/4 border-r-2 border-[var(--lemonade-3)]/20 bg-white">
        <div className="p-4 border-b border-[var(--lemonade-3)]/10">
          <h2 className="text-lg font-bold">{title || 'Quest'}</h2>
        </div>
        <ul>
          {tasks.map(t => (
            <li key={t.id} className={`p-3 cursor-pointer ${activeTaskId === t.id ? 'bg-[var(--lemonade-2)]' : ''}`} onClick={() => setActiveTaskId(t.id)}>
              <div className="font-semibold">{t.title}</div>
              {t.description && <div className="text-xs opacity-80">{t.description}</div>}
            </li>
          ))}
        </ul>
      </div>

      {/* Center Pane: Code + Preview */}
      <div className="w-1/2 flex flex-col">
        <div className="p-3 border-b border-[var(--lemonade-3)]/10 flex items-center justify-between">
          <div className="font-semibold">Editor</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[var(--lemonade-4)] text-white rounded" onClick={runCode}>Run</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={markComplete}>Mark Complete</button>
          </div>
        </div>
        <div className="flex-1 p-3 grid grid-rows-2 gap-3">
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full h-full bg-[var(--lemonade-5)] text-[var(--lemonade-1)] font-mono text-sm p-3 rounded border border-[var(--lemonade-3)]"
            placeholder="// Write your solution here"
          />
          <div className="bg-white border border-[var(--lemonade-3)] rounded p-0 overflow-hidden">
            <div className="text-sm opacity-80 mb-2 px-3 pt-3">Preview</div>
            <iframe ref={iframeRef} className="w-full h-full border-t border-[var(--lemonade-3)]/10" />
          </div>
        </div>
      </div>

      {/* Right Pane: Mentor */}
      <div className="w-1/4 bg-white flex flex-col">
        <div className="p-3 border-b border-[var(--lemonade-3)]/10 font-semibold">AI Mentor</div>
        <div className="p-3 flex-1 overflow-auto">
          <div className="text-sm whitespace-pre-wrap">{mentorReply}</div>
        </div>
        <div className="p-3 border-t border-[var(--lemonade-3)]/10 flex gap-2">
          <input value={mentorInput} onChange={e => setMentorInput(e.target.value)} className="flex-1 border border-[var(--lemonade-3)] rounded px-2" placeholder="Ask a question..." />
          <button onClick={askMentor} className="px-3 py-1 bg-[var(--lemonade-4)] text-white rounded">Ask</button>
        </div>
      </div>
    </div>
  );
}


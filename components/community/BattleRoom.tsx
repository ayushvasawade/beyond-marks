
'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@clerk/nextjs';

interface BattleRoomProps {
    battleId: string;
}

const BattleRoom: React.FC<BattleRoomProps> = ({ battleId }) => {
    const [code, setCode] = useState('// Start typing your code here...');
    const [opponentCode, setOpponentCode] = useState('// Opponent\'s code will appear here...');
    const [battle, setBattle] = useState<any>(null);
    const [runResults, setRunResults] = useState<any[]>([]);
    const [submitResult, setSubmitResult] = useState<string | null>(null);
    const { userId } = useAuth();

    useEffect(() => {
        if (!battleId) return;

        const battleRef = doc(db, 'battles', battleId);
        const unsubscribe = onSnapshot(battleRef, (doc) => {
            if (doc.exists()) {
                const battleData = doc.data();
                setBattle(battleData);
                if (userId === battleData.player1Id) {
                    setOpponentCode(battleData.player2Code || '');
                } else {
                    setOpponentCode(battleData.player1Code || '');
                }
                if (battleData.status === 'finished') {
                    if (battleData.winnerId === userId) {
                        setSubmitResult('Congratulations! You won!');
                    } else {
                        setSubmitResult('You lost. Better luck next time!');
                    }
                }
            }
        });

        return () => unsubscribe();
    }, [battleId, userId]);

    const handleCodeChange = async (newCode: string) => {
        setCode(newCode);
        if (battle && userId && battle.status !== 'finished') {
            const battleRef = doc(db, 'battles', battleId);
            const fieldToUpdate = userId === battle.player1Id ? 'player1Code' : 'player2Code';
            await updateDoc(battleRef, { [fieldToUpdate]: newCode });
        }
    };

    const handleRun = async () => {
        if (!battle) return;
        const response = await fetch('/api/arena/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, problemId: battle.problemId }),
        });
        const data = await response.json();
        setRunResults(data.results);
    };

    const handleSubmit = async () => {
        if (!battle) return;
        const response = await fetch('/api/arena/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, battleId, problemId: battle.problemId }),
        });
        const data = await response.json();
        setSubmitResult(data.message);
    };

    return (
        <div className="flex h-screen">
            <div className="w-[30%] p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4">Problem Statement</h2>
                <p className="mb-4">
                    {battle ? battle.problemId : 'Loading...'}
                </p>
                <h3 className="text-lg font-bold mb-2">Hint</h3>
                <p className="mb-4">A little hint to get you started.</p>
                <h3 className="text-lg font-bold mb-2">Explanation</h3>
                <p>A more detailed explanation of the problem.</p>
                <h3 className="text-lg font-bold mb-2 mt-4">Opponent&apos;s Code</h3>
                <CodeMirror
                    value={opponentCode}
                    height="40vh"
                    extensions={[javascript({ jsx: true })]}
                    readOnly={true}
                    theme="dark"
                />
            </div>
            <div className="w-[70%] p-4">
                <CodeMirror
                    value={code}
                    height="60vh"
                    extensions={[javascript({ jsx: true })]}
                    onChange={handleCodeChange}
                    theme="dark"
                />
                <div className="mt-4 flex justify-end space-x-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleRun}
                        disabled={battle && battle.status === 'finished'}
                    >
                        Run
                    </button>
                    <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                        disabled={battle && battle.status === 'finished'}
                    >
                        Submit
                    </button>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Run Results</h3>
                    <div className="bg-gray-800 p-4 rounded">
                        {runResults.map((result, index) => (
                            <div key={index} className={result.passed ? 'text-green-500' : 'text-red-500'}>
                                Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                            </div>
                        ))}
                    </div>
                </div>
                {submitResult && (
                    <div className="mt-4 text-xl font-bold text-center">{submitResult}</div>
                )}
            </div>
        </div>
    );
};

export default BattleRoom;


import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// This is a mock code execution environment.
const isCodeCorrect = (code: string, solution: string) => {
    // A very simple check.
    return code.includes(solution);
};

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { code, battleId, problemId } = await request.json();

        // In a real app, you would fetch the problem and its solution from Firestore.
        const problems: any = {
            "some-problem-id": {
                solution: "return a + b;",
            },
        };

        const problem = problems[problemId];

        if (!problem) {
            return new NextResponse("Problem not found", { status: 404 });
        }

        const battleRef = adminDb.collection("battles").doc(battleId);
        const battleDoc = await battleRef.get();

        if (!battleDoc.exists) {
            return new NextResponse("Battle not found", { status: 404 });
        }

        const battleData = battleDoc.data();

        if (battleData && battleData.status === "finished") {
            return new NextResponse("Battle has already finished", { status: 400 });
        }

        const correct = isCodeCorrect(code, problem.solution);

        if (correct) {
            await battleRef.update({
                status: "finished",
                winnerId: userId,
                finishedAt: new Date(),
            });
            return new NextResponse(JSON.stringify({ message: "Congratulations! You won!" }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ message: "Incorrect solution. Try again!" }), { status: 200 });
        }
    } catch (error) {
        console.error("Error submitting code:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

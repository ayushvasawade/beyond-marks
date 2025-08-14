
import { NextResponse } from "next/server";

// This is a mock code execution environment.
// In a real application, this would be a secure sandbox.
const executeCode = (code: string, testCases: any[]) => {
    // For now, we'll just check if the code includes the solution.
    const results = testCases.map(testCase => {
        try {
            // A very simple check.
            const isCorrect = code.includes(testCase.expected);
            return {
                input: testCase.input,
                expected: testCase.expected,
                output: isCorrect ? testCase.expected : "Incorrect output",
                passed: isCorrect,
            };
        } catch (error: any) {
            return {
                input: testCase.input,
                expected: testCase.expected,
                output: error.message,
                passed: false,
            };
        }
    });
    return results;
};

export async function POST(request: Request) {
    try {
        const { code, problemId } = await request.json();

        // In a real app, you would fetch the problem and its test cases from Firestore.
        const problems: any = {
            "some-problem-id": {
                testCases: [
                    { input: "[1, 2, 3]", expected: "6" },
                    { input: "[10, 20]", expected: "30" },
                ],
                solution: "function sum(a, b) { return a + b; }", // Example solution
            },
        };

        const problem = problems[problemId];

        if (!problem) {
            return new NextResponse("Problem not found", { status: 404 });
        }

        const results = executeCode(code, problem.testCases);

        return new NextResponse(JSON.stringify({ results }), { status: 200 });
    } catch (error) {
        console.error("Error running code:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

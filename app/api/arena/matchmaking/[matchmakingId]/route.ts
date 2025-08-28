
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(
    request: Request,
    { params }: { params: { matchmakingId: string } }
) {
    try {
        const { matchmakingId } = await params;
        const matchmakingDoc = await adminDb.collection("matchmaking").doc(matchmakingId).get();

        if (!matchmakingDoc.exists) {
            return new NextResponse("Matchmaking entry not found", { status: 404 });
        }

        const matchmakingData = matchmakingDoc.data();

        if (matchmakingData && matchmakingData.battleId) {
            return new NextResponse(JSON.stringify({ battleId: matchmakingData.battleId }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ status: "waiting" }), { status: 202 });
        }
    } catch (error) {
        console.error("Error checking matchmaking status:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

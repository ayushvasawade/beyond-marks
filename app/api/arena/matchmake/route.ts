import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST() {
    try {
        const authResult = await auth();
        console.log("Auth result in API route:", authResult);
        const { userId } = authResult;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const matchmakingRef = adminDb.collection("matchmaking");

        // Check if the user is already in the matchmaking pool
        const userMatchmakingDoc = await matchmakingRef.doc(userId).get();
        if (userMatchmakingDoc.exists) {
            const data = userMatchmakingDoc.data();
            if(data && data.battleId){
                return new NextResponse(JSON.stringify({ matchmakingId: userId, battleId: data.battleId }), { status: 200 });
            }
            return new NextResponse(JSON.stringify({ matchmakingId: userId }), { status: 200 });
        }

        // Add the user to the matchmaking pool
        await matchmakingRef.doc(userId).set({
            userId,
            status: "waiting",
            createdAt: new Date(),
        });

        // Look for an opponent
        const query = matchmakingRef.where("status", "==", "waiting").where("userId", "!=", userId).limit(1);
        const querySnapshot = await query.get();

        if (!querySnapshot.empty) {
            const opponent = querySnapshot.docs[0].data();
            const opponentId = opponent.userId;

            // Create a new battle
            const battleRef = adminDb.collection("battles").doc();
            const newBattle = {
                player1Id: userId,
                player2Id: opponentId,
                status: "in-progress",
                createdAt: new Date(),
                problemId: "some-problem-id",
            };
            await battleRef.set(newBattle);

            // Update both users' matchmaking documents with the battleId
            await matchmakingRef.doc(userId).update({ battleId: battleRef.id, status: 'matched' });
            await matchmakingRef.doc(opponentId).update({ battleId: battleRef.id, status: 'matched' });
        }

        return new NextResponse(JSON.stringify({ matchmakingId: userId }), { status: 200 });
    } catch (error) {
        console.error("Error in matchmaking:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await adminDb.collection("matchmaking").doc(userId).delete();

        return new NextResponse(JSON.stringify({ message: "Matchmaking request cancelled" }), { status: 200 });
    } catch (error) {
        console.error("Error cancelling matchmaking:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
import { db } from "@/lib/firebase";
import {
  Timestamp,
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  QuestDefinition,
  QuestEnrollment,
  QuestTask,
} from "@/models/quest";

export async function getAllQuests(): Promise<QuestDefinition[]> {
  const snap = await getDocs(collection(db, "quests"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<QuestDefinition, "id">) }));
}

export async function getQuestById(questId: string): Promise<QuestDefinition | null> {
  const ref = doc(db, "quests", questId);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<QuestDefinition, "id">) }) : null;
}

export async function createQuest(quest: Omit<QuestDefinition, "id" | "createdAt" | "updatedAt"> & { id: string }): Promise<void> {
  const ref = doc(db, "quests", quest.id);
  await setDoc(ref, {
    title: quest.title,
    description: quest.description,
    category: quest.category,
    difficulty: quest.difficulty,
    xp: quest.xp,
    tasks: quest.tasks,
    tags: quest.tags,
    isActive: quest.isActive,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function updateQuest(questId: string, update: Partial<QuestDefinition>): Promise<void> {
  const ref = doc(db, "quests", questId);
  await updateDoc(ref, { ...update, updatedAt: Timestamp.now() } as any);
}

export async function enrollInQuest(userId: string, questId: string): Promise<QuestEnrollment> {
  const enrollmentRef = doc(db, "quests", questId, "enrollments", userId);
  const snap = await getDoc(enrollmentRef);
  if (!snap.exists()) {
    const enrollment: QuestEnrollment = {
      userId,
      questId,
      status: "enrolled",
      completedTaskIds: [],
      startedAt: Timestamp.now(),
      completedAt: null,
    };
    await setDoc(enrollmentRef, enrollment);
    return enrollment;
  }
  return snap.data() as QuestEnrollment;
}

export async function getUserEnrollments(userId: string): Promise<QuestEnrollment[]> {
  const q = query(collectionGroup(db, "enrollments"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as QuestEnrollment);
}

export async function getUserQuestEnrollment(userId: string, questId: string): Promise<QuestEnrollment | null> {
  const ref = doc(db, "quests", questId, "enrollments", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as QuestEnrollment) : null;
}

export async function completeTask(userId: string, questId: string, taskId: string): Promise<QuestEnrollment> {
  const quest = await getQuestById(questId);
  if (!quest) {
    throw new Error("Quest not found");
  }
  const tasks: QuestTask[] = quest.tasks || [];
  const enrollmentRef = doc(db, "quests", questId, "enrollments", userId);
  const enrollmentSnap = await getDoc(enrollmentRef);
  if (!enrollmentSnap.exists()) {
    throw new Error("Enrollment not found");
  }
  const enrollment = enrollmentSnap.data() as QuestEnrollment;
  if (!enrollment.completedTaskIds.includes(taskId)) {
    await updateDoc(enrollmentRef, { completedTaskIds: arrayUnion(taskId) });
  }

  const updatedSnap = await getDoc(enrollmentRef);
  const updated = updatedSnap.data() as QuestEnrollment;
  const allCompleted = tasks.length > 0 && tasks.every((t) => updated.completedTaskIds.includes(t.id));
  if (allCompleted && updated.status !== "completed") {
    await updateDoc(enrollmentRef, { status: "completed", completedAt: Timestamp.now() });
    const finalSnap = await getDoc(enrollmentRef);
    return finalSnap.data() as QuestEnrollment;
  }
  return updated;
}


import { Timestamp } from "firebase/firestore";

export type QuestDifficulty = "beginner" | "intermediate" | "advanced";

export interface QuestTask {
  id: string;
  title: string;
  description?: string;
}

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuestDifficulty;
  xp: number;
  tasks: QuestTask[];
  tags: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface QuestEnrollment {
  userId: string;
  questId: string;
  status: "enrolled" | "completed";
  completedTaskIds: string[];
  startedAt: Timestamp;
  completedAt: Timestamp | null;
}


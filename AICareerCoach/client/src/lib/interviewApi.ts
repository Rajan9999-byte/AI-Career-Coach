import { apiRequest } from "./queryClient";
import type { Role, Difficulty } from "@shared/schema";

export async function startInterview(role: Role, difficulty: Difficulty) {
  const res = await apiRequest("POST", "/api/interview/start", { role, difficulty });
  return res.json();
}

export async function submitAnswer(
  sessionId: string,
  answer: string,
  questionNumber: number
) {
  const res = await apiRequest("POST", "/api/interview/answer", { sessionId, answer, questionNumber });
  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await apiRequest("GET", "/api/interview/session/" + sessionId);
  return res.json();
}

export async function getSessions() {
  const res = await apiRequest("GET", "/api/interview/sessions");
  return res.json();
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateQuestion, evaluateAnswer } from "./openai-service";
import { createSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Start interview session
  app.post("/api/interview/start", async (req, res) => {
    try {
      const body = createSessionSchema.parse(req.body);
      
      // Generate first question
      const questionJson = await generateQuestion(body.role, body.difficulty, 1);
      let questions;
      try {
        questions = JSON.parse(questionJson);
      } catch (parseError) {
        console.error("Failed to parse questions JSON:", questionJson);
        questions = { questions: [{ question: "Tell me about your experience with this role." }] };
      }
      const firstQuestion = questions.questions?.[0]?.question || "Tell me about your experience with this role.";

      // Create session
      const session = await storage.createSession({
        role: body.role,
        difficulty: body.difficulty,
        createdAt: new Date(),
        answers: [],
        overallScore: 0,
      });

      res.json({
        sessionId: session.id,
        question: firstQuestion,
        questionNumber: 1,
        totalQuestions: 10,
      });
    } catch (error) {
      console.error("Error starting interview:", error);
      res.status(400).json({ error: `Failed to start interview: ${(error as any).message}` });
    }
  });

  // Submit answer and get next question
  app.post("/api/interview/answer", async (req, res) => {
    try {
      const { sessionId, answer, questionNumber } = req.body;
      
      if (!sessionId || !answer) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const session = await storage.getSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      // Evaluate answer
      const evaluation = await evaluateAnswer(
        "Based on your expertise with " + session.role,
        answer,
        session.role as any
      );

      // Store answer
      await storage.addAnswer(sessionId, {
        questionId: `question-${questionNumber}`,
        answer,
        score: evaluation.overallScore,
        feedback: evaluation.feedback,
      });

      // Generate next question if not done
      let nextQuestion = "Interview complete!";
      let isComplete = false;

      if (questionNumber < 10) {
        try {
          const questionJson = await generateQuestion(session.role as any, session.difficulty as any, 1);
          let questions;
          try {
            questions = JSON.parse(questionJson);
          } catch (parseError) {
            console.error("Failed to parse next question JSON:", questionJson);
            questions = { questions: [{ question: "Tell me more about your experience." }] };
          }
          nextQuestion = questions.questions?.[0]?.question || "Tell me more about your experience.";
        } catch (questionError) {
          console.error("Error generating next question:", questionError);
          nextQuestion = "Tell me more about your experience with this role.";
        }
      } else {
        isComplete = true;
      }

      // Calculate overall score
      const allAnswers = await storage.getSession(sessionId);
      const avgScore = allAnswers?.answers.length 
        ? Math.round(allAnswers.answers.reduce((sum, a) => sum + a.score, 0) / allAnswers.answers.length)
        : evaluation.overallScore;

      await storage.updateSession(sessionId, {
        ...session,
        overallScore: avgScore,
      });

      res.json({
        sessionId,
        evaluation: {
          score: evaluation.overallScore,
          technicalAccuracy: evaluation.technicalAccuracy,
          communication: evaluation.communication,
          confidence: evaluation.confidence,
          feedback: evaluation.feedback,
        },
        nextQuestion,
        nextQuestionNumber: questionNumber + 1,
        isComplete,
        totalQuestions: 10,
      });
    } catch (error) {
      console.error("Error evaluating answer:", error);
      res.status(500).json({ error: "Failed to evaluate answer" });
    }
  });

  // Get session summary
  app.get("/api/interview/session/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  // Get all sessions (for dashboard)
  app.get("/api/interview/sessions", async (req, res) => {
    try {
      const sessions = await storage.getSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

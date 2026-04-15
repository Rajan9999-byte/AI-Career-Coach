import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Interview-related schemas
export const roleSchema = z.enum([
  "Data Analyst",
  "Software Engineer",
  "Product Manager",
  "HR Associate",
  "Marketing Manager",
  "Data Scientist",
  "Business Analyst",
  "UI/UX Designer"
]);

export const difficultySchema = z.enum(["Beginner", "Intermediate", "Advanced"]);

export const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  role: z.string(),
  difficulty: z.string(),
});

export const sessionSchema = z.object({
  id: z.string(),
  role: z.string(),
  difficulty: z.string(),
  createdAt: z.date(),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
    score: z.number().min(0).max(100),
    feedback: z.string(),
  })),
  overallScore: z.number().min(0).max(100),
});

export const createSessionSchema = z.object({
  role: roleSchema,
  difficulty: difficultySchema,
});

export type Role = z.infer<typeof roleSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Question = z.infer<typeof questionSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type CreateSession = z.infer<typeof createSessionSchema>;

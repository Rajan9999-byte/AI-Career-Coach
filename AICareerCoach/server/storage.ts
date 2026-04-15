import { type User, type InsertUser, type Session, type Question } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSession(session: Omit<Session, "id">): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSession(id: string, updates: Partial<Session>): Promise<Session | undefined>;
  getSessions(): Promise<Session[]>;
  addAnswer(sessionId: string, answer: Session["answers"][0]): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sessions: Map<string, Session>;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSession(session: Omit<Session, "id">): Promise<Session> {
    const id = randomUUID();
    const fullSession: Session = { ...session, id };
    this.sessions.set(id, fullSession);
    return fullSession;
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: string, updates: Partial<Session>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    const updated = { ...session, ...updates };
    this.sessions.set(id, updated);
    return updated;
  }

  async getSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  async addAnswer(sessionId: string, answer: Session["answers"][0]): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.answers.push(answer);
    }
  }
}

export const storage = new MemStorage();

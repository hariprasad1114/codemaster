import {
  users,
  companies,
  programmingLanguages,
  topics,
  questions,
  solutions,
  userProgress,
  languageTutorials,
  type User,
  type UpsertUser,
  type Company,
  type InsertCompany,
  type ProgrammingLanguage,
  type InsertProgrammingLanguage,
  type Topic,
  type InsertTopic,
  type Question,
  type InsertQuestion,
  type Solution,
  type InsertSolution,
  type UserProgress,
  type InsertUserProgress,
  type LanguageTutorial,
  type InsertLanguageTutorial,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Company operations
  getCompanies(): Promise<Company[]>;
  getCompanyBySlug(slug: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  
  // Programming Language operations
  getProgrammingLanguages(): Promise<ProgrammingLanguage[]>;
  getProgrammingLanguageBySlug(slug: string): Promise<ProgrammingLanguage | undefined>;
  createProgrammingLanguage(language: InsertProgrammingLanguage): Promise<ProgrammingLanguage>;
  
  // Topic operations
  getTopics(): Promise<Topic[]>;
  getTopicBySlug(slug: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // Question operations
  getQuestions(filters?: { companyId?: string; topicId?: string; difficulty?: string }): Promise<Question[]>;
  getQuestionBySlug(slug: string): Promise<Question | undefined>;
  getQuestionsByCompany(companyId: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Solution operations
  getSolutionsByQuestion(questionId: string): Promise<Solution[]>;
  getSolutionByQuestionAndLanguage(questionId: string, languageId: string): Promise<Solution | undefined>;
  createSolution(solution: InsertSolution): Promise<Solution>;
  
  // User Progress operations
  getUserProgress(userId: string, questionId: string): Promise<UserProgress | undefined>;
  getUserProgressByUser(userId: string): Promise<UserProgress[]>;
  upsertUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Language Tutorial operations
  getTutorialsByLanguage(languageId: string): Promise<LanguageTutorial[]>;
  getTutorialBySlug(languageSlug: string, tutorialSlug: string): Promise<LanguageTutorial | undefined>;
  createLanguageTutorial(tutorial: InsertLanguageTutorial): Promise<LanguageTutorial>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Company operations
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(asc(companies.name));
  }

  async getCompanyBySlug(slug: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.slug, slug));
    return company;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const [created] = await db.insert(companies).values(company).returning();
    return created;
  }

  // Programming Language operations
  async getProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    return await db.select().from(programmingLanguages).orderBy(asc(programmingLanguages.name));
  }

  async getProgrammingLanguageBySlug(slug: string): Promise<ProgrammingLanguage | undefined> {
    const [language] = await db.select().from(programmingLanguages).where(eq(programmingLanguages.slug, slug));
    return language;
  }

  async createProgrammingLanguage(language: InsertProgrammingLanguage): Promise<ProgrammingLanguage> {
    const [created] = await db.insert(programmingLanguages).values(language).returning();
    return created;
  }

  // Topic operations
  async getTopics(): Promise<Topic[]> {
    return await db.select().from(topics).orderBy(asc(topics.name));
  }

  async getTopicBySlug(slug: string): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.slug, slug));
    return topic;
  }

  async createTopic(topic: InsertTopic): Promise<Topic> {
    const [created] = await db.insert(topics).values(topic).returning();
    return created;
  }

  // Question operations
  async getQuestions(filters?: { companyId?: string; topicId?: string; difficulty?: string }): Promise<Question[]> {
    let query = db.select().from(questions);
    
    if (filters?.companyId || filters?.topicId || filters?.difficulty) {
      const conditions = [];
      if (filters.companyId) conditions.push(eq(questions.companyId, filters.companyId));
      if (filters.topicId) conditions.push(eq(questions.topicId, filters.topicId));
      if (filters.difficulty) conditions.push(eq(questions.difficulty, filters.difficulty));
      
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(desc(questions.createdAt));
  }

  async getQuestionBySlug(slug: string): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.slug, slug));
    return question;
  }

  async getQuestionsByCompany(companyId: string): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.companyId, companyId)).orderBy(desc(questions.createdAt));
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [created] = await db.insert(questions).values(question).returning();
    return created;
  }

  // Solution operations
  async getSolutionsByQuestion(questionId: string): Promise<Solution[]> {
    return await db.select().from(solutions).where(eq(solutions.questionId, questionId));
  }

  async getSolutionByQuestionAndLanguage(questionId: string, languageId: string): Promise<Solution | undefined> {
    const [solution] = await db.select().from(solutions).where(
      and(eq(solutions.questionId, questionId), eq(solutions.languageId, languageId))
    );
    return solution;
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const [created] = await db.insert(solutions).values(solution).returning();
    return created;
  }

  // User Progress operations
  async getUserProgress(userId: string, questionId: string): Promise<UserProgress | undefined> {
    const [progress] = await db.select().from(userProgress).where(
      and(eq(userProgress.userId, userId), eq(userProgress.questionId, questionId))
    );
    return progress;
  }

  async getUserProgressByUser(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async upsertUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [upserted] = await db
      .insert(userProgress)
      .values(progress)
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.questionId],
        set: {
          ...progress,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upserted;
  }

  // Language Tutorial operations
  async getTutorialsByLanguage(languageId: string): Promise<LanguageTutorial[]> {
    return await db.select().from(languageTutorials).where(eq(languageTutorials.languageId, languageId)).orderBy(asc(languageTutorials.order));
  }

  async getTutorialBySlug(languageSlug: string, tutorialSlug: string): Promise<LanguageTutorial | undefined> {
    const [tutorial] = await db
      .select({
        id: languageTutorials.id,
        languageId: languageTutorials.languageId,
        title: languageTutorials.title,
        slug: languageTutorials.slug,
        content: languageTutorials.content,
        order: languageTutorials.order,
        difficulty: languageTutorials.difficulty,
        createdAt: languageTutorials.createdAt,
      })
      .from(languageTutorials)
      .innerJoin(programmingLanguages, eq(languageTutorials.languageId, programmingLanguages.id))
      .where(and(eq(programmingLanguages.slug, languageSlug), eq(languageTutorials.slug, tutorialSlug)));
    return tutorial;
  }

  async createLanguageTutorial(tutorial: InsertLanguageTutorial): Promise<LanguageTutorial> {
    const [created] = await db.insert(languageTutorials).values(tutorial).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();

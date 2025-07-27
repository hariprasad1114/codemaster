import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull().unique(),
  slug: varchar("slug").notNull().unique(),
  color: varchar("color").notNull(),
  logo: varchar("logo"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programmingLanguages = pgTable("programming_languages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull().unique(),
  slug: varchar("slug").notNull().unique(),
  icon: varchar("icon"),
  color: varchar("color").notNull(),
  description: text("description"),
  syntaxHighlight: varchar("syntax_highlight").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const topics = pgTable("topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull().unique(),
  slug: varchar("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  description: text("description").notNull(),
  difficulty: varchar("difficulty").notNull(), // Easy, Medium, Hard
  companyId: varchar("company_id").references(() => companies.id),
  topicId: varchar("topic_id").references(() => topics.id),
  timeComplexity: varchar("time_complexity"),
  spaceComplexity: varchar("space_complexity"),
  hints: text("hints").array(),
  testCases: jsonb("test_cases"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const solutions = pgTable("solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").references(() => questions.id).notNull(),
  languageId: varchar("language_id").references(() => programmingLanguages.id).notNull(),
  code: text("code").notNull(),
  explanation: text("explanation"),
  isOptimal: boolean("is_optimal").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  questionId: varchar("question_id").references(() => questions.id).notNull(),
  solved: boolean("solved").default(false),
  attempts: integer("attempts").default(0),
  lastAttemptAt: timestamp("last_attempt_at"),
  bestTime: integer("best_time"), // in milliseconds
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const languageTutorials = pgTable("language_tutorials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  languageId: varchar("language_id").references(() => programmingLanguages.id).notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  difficulty: varchar("difficulty").notNull(), // Beginner, Intermediate, Advanced
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  questions: many(questions),
}));

export const programmingLanguagesRelations = relations(programmingLanguages, ({ many }) => ({
  solutions: many(solutions),
  tutorials: many(languageTutorials),
}));

export const topicsRelations = relations(topics, ({ many }) => ({
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  company: one(companies, {
    fields: [questions.companyId],
    references: [companies.id],
  }),
  topic: one(topics, {
    fields: [questions.topicId],
    references: [topics.id],
  }),
  solutions: many(solutions),
  userProgress: many(userProgress),
}));

export const solutionsRelations = relations(solutions, ({ one }) => ({
  question: one(questions, {
    fields: [solutions.questionId],
    references: [questions.id],
  }),
  language: one(programmingLanguages, {
    fields: [solutions.languageId],
    references: [programmingLanguages.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [userProgress.questionId],
    references: [questions.id],
  }),
}));

export const languageTutorialsRelations = relations(languageTutorials, ({ one }) => ({
  language: one(programmingLanguages, {
    fields: [languageTutorials.languageId],
    references: [programmingLanguages.id],
  }),
}));

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertCompany = typeof companies.$inferInsert;
export type Company = typeof companies.$inferSelect;

export type InsertProgrammingLanguage = typeof programmingLanguages.$inferInsert;
export type ProgrammingLanguage = typeof programmingLanguages.$inferSelect;

export type InsertTopic = typeof topics.$inferInsert;
export type Topic = typeof topics.$inferSelect;

export type InsertQuestion = typeof questions.$inferInsert;
export type Question = typeof questions.$inferSelect;

export type InsertSolution = typeof solutions.$inferInsert;
export type Solution = typeof solutions.$inferSelect;

export type InsertUserProgress = typeof userProgress.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertLanguageTutorial = typeof languageTutorials.$inferInsert;
export type LanguageTutorial = typeof languageTutorials.$inferSelect;

// Insert schemas
export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertProgrammingLanguageSchema = createInsertSchema(programmingLanguages).omit({
  id: true,
  createdAt: true,
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLanguageTutorialSchema = createInsertSchema(languageTutorials).omit({
  id: true,
  createdAt: true,
});

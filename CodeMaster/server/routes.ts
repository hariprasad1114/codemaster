import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { explainCode, generateAlgorithmVisualization, generateProblemHints } from "./services/openai";
import { 
  insertCompanySchema, 
  insertProgrammingLanguageSchema, 
  insertTopicSchema, 
  insertQuestionSchema,
  insertSolutionSchema,
  insertUserProgressSchema,
  insertLanguageTutorialSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Company routes
  app.get('/api/companies', async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.get('/api/companies/:slug', async (req, res) => {
    try {
      const company = await storage.getCompanyBySlug(req.params.slug);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  app.post('/api/companies', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(400).json({ message: "Failed to create company" });
    }
  });

  // Programming Language routes
  app.get('/api/languages', async (req, res) => {
    try {
      const languages = await storage.getProgrammingLanguages();
      res.json(languages);
    } catch (error) {
      console.error("Error fetching languages:", error);
      res.status(500).json({ message: "Failed to fetch languages" });
    }
  });

  app.get('/api/languages/:slug', async (req, res) => {
    try {
      const language = await storage.getProgrammingLanguageBySlug(req.params.slug);
      if (!language) {
        return res.status(404).json({ message: "Language not found" });
      }
      res.json(language);
    } catch (error) {
      console.error("Error fetching language:", error);
      res.status(500).json({ message: "Failed to fetch language" });
    }
  });

  app.post('/api/languages', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProgrammingLanguageSchema.parse(req.body);
      const language = await storage.createProgrammingLanguage(validatedData);
      res.status(201).json(language);
    } catch (error) {
      console.error("Error creating language:", error);
      res.status(400).json({ message: "Failed to create language" });
    }
  });

  // Topic routes
  app.get('/api/topics', async (req, res) => {
    try {
      const topics = await storage.getTopics();
      res.json(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.post('/api/topics', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertTopicSchema.parse(req.body);
      const topic = await storage.createTopic(validatedData);
      res.status(201).json(topic);
    } catch (error) {
      console.error("Error creating topic:", error);
      res.status(400).json({ message: "Failed to create topic" });
    }
  });

  // Question routes
  app.get('/api/questions', async (req, res) => {
    try {
      const { companyId, topicId, difficulty } = req.query;
      const filters = {
        companyId: companyId as string,
        topicId: topicId as string,
        difficulty: difficulty as string,
      };
      
      const questions = await storage.getQuestions(filters);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.get('/api/questions/:slug', async (req, res) => {
    try {
      const question = await storage.getQuestionBySlug(req.params.slug);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  app.post('/api/questions', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertQuestionSchema.parse(req.body);
      const question = await storage.createQuestion(validatedData);
      res.status(201).json(question);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(400).json({ message: "Failed to create question" });
    }
  });

  // Solution routes
  app.get('/api/questions/:questionId/solutions', async (req, res) => {
    try {
      const solutions = await storage.getSolutionsByQuestion(req.params.questionId);
      res.json(solutions);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  });

  app.get('/api/questions/:questionId/solutions/:languageId', async (req, res) => {
    try {
      const solution = await storage.getSolutionByQuestionAndLanguage(
        req.params.questionId,
        req.params.languageId
      );
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      res.json(solution);
    } catch (error) {
      console.error("Error fetching solution:", error);
      res.status(500).json({ message: "Failed to fetch solution" });
    }
  });

  app.post('/api/questions/:questionId/solutions', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertSolutionSchema.parse({
        ...req.body,
        questionId: req.params.questionId,
      });
      const solution = await storage.createSolution(validatedData);
      res.status(201).json(solution);
    } catch (error) {
      console.error("Error creating solution:", error);
      res.status(400).json({ message: "Failed to create solution" });
    }
  });

  // User Progress routes
  app.get('/api/user/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get('/api/user/progress/:questionId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgress(userId, req.params.questionId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.put('/api/user/progress/:questionId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertUserProgressSchema.parse({
        ...req.body,
        userId,
        questionId: req.params.questionId,
      });
      const progress = await storage.upsertUserProgress(validatedData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(400).json({ message: "Failed to update user progress" });
    }
  });

  // Language Tutorial routes
  app.get('/api/languages/:languageId/tutorials', async (req, res) => {
    try {
      const tutorials = await storage.getTutorialsByLanguage(req.params.languageId);
      res.json(tutorials);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      res.status(500).json({ message: "Failed to fetch tutorials" });
    }
  });

  app.get('/api/languages/:languageSlug/tutorials/:tutorialSlug', async (req, res) => {
    try {
      const tutorial = await storage.getTutorialBySlug(
        req.params.languageSlug,
        req.params.tutorialSlug
      );
      if (!tutorial) {
        return res.status(404).json({ message: "Tutorial not found" });
      }
      res.json(tutorial);
    } catch (error) {
      console.error("Error fetching tutorial:", error);
      res.status(500).json({ message: "Failed to fetch tutorial" });
    }
  });

  app.post('/api/languages/:languageId/tutorials', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLanguageTutorialSchema.parse({
        ...req.body,
        languageId: req.params.languageId,
      });
      const tutorial = await storage.createLanguageTutorial(validatedData);
      res.status(201).json(tutorial);
    } catch (error) {
      console.error("Error creating tutorial:", error);
      res.status(400).json({ message: "Failed to create tutorial" });
    }
  });

  // AI-powered routes
  app.post('/api/ai/explain-code', isAuthenticated, async (req, res) => {
    try {
      const { code, language } = req.body;
      if (!code || !language) {
        return res.status(400).json({ message: "Code and language are required" });
      }
      
      const explanation = await explainCode(code, language);
      res.json(explanation);
    } catch (error) {
      console.error("Error explaining code:", error);
      res.status(500).json({ message: "Failed to explain code" });
    }
  });

  app.post('/api/ai/visualize-algorithm', isAuthenticated, async (req, res) => {
    try {
      const { algorithm, problemDescription } = req.body;
      if (!algorithm || !problemDescription) {
        return res.status(400).json({ message: "Algorithm and problem description are required" });
      }
      
      const visualization = await generateAlgorithmVisualization(algorithm, problemDescription);
      res.json(visualization);
    } catch (error) {
      console.error("Error generating visualization:", error);
      res.status(500).json({ message: "Failed to generate visualization" });
    }
  });

  app.post('/api/ai/generate-hints', isAuthenticated, async (req, res) => {
    try {
      const { problemTitle, problemDescription, difficulty } = req.body;
      if (!problemTitle || !problemDescription || !difficulty) {
        return res.status(400).json({ message: "Problem title, description, and difficulty are required" });
      }
      
      const hints = await generateProblemHints(problemTitle, problemDescription, difficulty);
      res.json({ hints });
    } catch (error) {
      console.error("Error generating hints:", error);
      res.status(500).json({ message: "Failed to generate hints" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeEditor } from '@/components/ui/code-editor';
import { Footer } from '@/components/navigation/footer';
import { 
  Code, 
  Play, 
  BookOpen, 
  Target, 
  Clock,
  CheckCircle,
  XCircle,
  Lightbulb,
  Brain
} from 'lucide-react';

export default function Practice() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["/api/questions"],
    retry: false,
  });

  const { data: languages } = useQuery({
    queryKey: ["/api/languages"],
    retry: false,
  });

  // Mock data for demonstration
  const defaultQuestions = [
    {
      id: '1',
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'Easy',
      testCases: [
        { input: '[2,7,11,15], 9', expected: '[0,1]' },
        { input: '[3,2,4], 6', expected: '[1,2]' },
        { input: '[3,3], 6', expected: '[0,1]' },
      ],
      starterCode: {
        python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
        javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
        java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return new int[0];\n}',
        cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}'
      }
    },
    {
      id: '2',
      title: 'Valid Parentheses',
      slug: 'valid-parentheses',
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      difficulty: 'Easy',
      testCases: [
        { input: '"()"', expected: 'true' },
        { input: '"()[]{}"', expected: 'true' },
        { input: '"(]"', expected: 'false' },
      ],
      starterCode: {
        python: 'def is_valid(s):\n    # Your code here\n    pass',
        javascript: 'function isValid(s) {\n    // Your code here\n}',
        java: 'public boolean isValid(String s) {\n    // Your code here\n    return false;\n}',
        cpp: 'bool isValid(string s) {\n    // Your code here\n    return false;\n}'
      }
    }
  ];

  const defaultLanguages = [
    { id: '1', name: 'Python', slug: 'python', syntaxHighlight: 'python' },
    { id: '2', name: 'JavaScript', slug: 'javascript', syntaxHighlight: 'javascript' },
    { id: '3', name: 'Java', slug: 'java', syntaxHighlight: 'java' },
    { id: '4', name: 'C++', slug: 'cpp', syntaxHighlight: 'cpp' },
  ];

  const displayQuestions = questions || defaultQuestions;
  const displayLanguages = languages || defaultLanguages;

  const currentQuestion = displayQuestions.find((q: any) => q.id === selectedQuestion) || displayQuestions[0];

  const handleQuestionChange = (questionId: string) => {
    setSelectedQuestion(questionId);
    const question = displayQuestions.find((q: any) => q.id === questionId);
    if (question && question.starterCode) {
      setCode(question.starterCode[selectedLanguage] || '');
    }
    setResults(null);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (currentQuestion && currentQuestion.starterCode) {
      setCode(currentQuestion.starterCode[language] || '');
    }
  };

  const handleRunCode = async (codeToRun: string, language: string, input: string) => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results
      const mockResults = {
        success: true,
        output: 'Code executed successfully!',
        testResults: currentQuestion.testCases.map((tc: any, index: number) => ({
          input: tc.input,
          expected: tc.expected,
          actual: tc.expected, // Mock: assume all pass
          passed: Math.random() > 0.2, // 80% pass rate for demo
          executionTime: Math.floor(Math.random() * 100) + 50
        }))
      };
      
      setResults(mockResults);
    } catch (error) {
      setResults({
        success: false,
        error: 'Runtime error: ' + (error as Error).message,
        testResults: []
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async (codeToSubmit: string, language: string) => {
    await handleRunCode(codeToSubmit, language, '');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  // Initialize with first question if none selected
  if (!selectedQuestion && displayQuestions.length > 0) {
    setSelectedQuestion(displayQuestions[0].id);
    if (displayQuestions[0].starterCode) {
      setCode(displayQuestions[0].starterCode[selectedLanguage] || '');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Interactive Code Editor</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Write, run, and test your code in our advanced online editor
          </p>
        </div>

        {/* Question Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Select Problem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedQuestion} onValueChange={handleQuestionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a problem to solve" />
                </SelectTrigger>
                <SelectContent>
                  {displayQuestions.map((question: any) => (
                    <SelectItem key={question.id} value={question.id}>
                      {question.title} - {question.difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(currentQuestion?.difficulty || 'Easy')}>
                  {currentQuestion?.difficulty || 'Easy'}
                </Badge>
                <Button variant="outline" size="sm">
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Hints
                </Button>
                <Button variant="outline" size="sm">
                  <Brain className="h-4 w-4 mr-1" />
                  AI Explain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Description */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">{currentQuestion?.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentQuestion?.description}
                </p>
                
                {currentQuestion?.testCases && (
                  <div>
                    <h4 className="font-semibold mb-2">Test Cases</h4>
                    <div className="space-y-2">
                      {currentQuestion.testCases.map((testCase: any, index: number) => (
                        <div key={index} className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg text-sm">
                          <div><strong>Input:</strong> {testCase.input}</div>
                          <div><strong>Output:</strong> {testCase.expected}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Results */}
            {results && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {results.success ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2 text-red-600" />
                    )}
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results.error ? (
                    <div className="text-red-600 dark:text-red-400 text-sm font-mono">
                      {results.error}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {results.testResults?.map((result: any, index: number) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-lg text-sm ${
                            result.passed 
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Test Case {index + 1}</span>
                            <div className="flex items-center space-x-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="text-xs text-gray-500">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {result.executionTime}ms
                              </span>
                            </div>
                          </div>
                          <div className="text-xs space-y-1">
                            <div><strong>Input:</strong> {result.input}</div>
                            <div><strong>Expected:</strong> {result.expected}</div>
                            {!result.passed && (
                              <div><strong>Actual:</strong> {result.actual}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <CodeEditor
              initialCode={code}
              initialLanguage={selectedLanguage}
              onCodeChange={setCode}
              onLanguageChange={handleLanguageChange}
              onRun={handleRunCode}
              onSubmit={handleSubmit}
              className="h-full"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">50+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Practice Problems</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Play className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Languages Supported</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-violet-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">95%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2s</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Runtime</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

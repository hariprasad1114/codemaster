import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/ui/code-editor';
import { CompanyBadge } from '@/components/ui/company-badge';
import { DifficultyBadge } from '@/components/ui/difficulty-badge';
import { Footer } from '@/components/navigation/footer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { apiRequest } from '@/lib/queryClient';
import { 
  BookOpen, 
  Code, 
  Brain, 
  Lightbulb, 
  Clock, 
  Target,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Play
} from 'lucide-react';
import { Link } from 'wouter';

export default function QuestionDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: question, isLoading: questionLoading } = useQuery({
    queryKey: ["/api/questions", slug],
    retry: false,
    enabled: !!slug,
  });

  const { data: solutions } = useQuery({
    queryKey: ["/api/questions", question?.id, "solutions"],
    retry: false,
    enabled: !!question?.id,
  });

  const { data: userProgress } = useQuery({
    queryKey: ["/api/user/progress", question?.id],
    retry: false,
    enabled: !!question?.id && isAuthenticated,
  });

  // Mock data for demonstration
  const mockQuestion = {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: 'Easy',
    companyId: '1',
    topicId: '1',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.',
      'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
      'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?'
    ],
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0,1]' },
    ]
  };

  const mockSolutions = [
    {
      id: '1',
      languageId: '1',
      code: `def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
            
        seen[num] = i
    
    return []`,
      explanation: 'This solution uses a hash map to store numbers we\'ve seen and their indices. For each number, we check if its complement (target - current number) exists in the hash map.',
      isOptimal: true
    },
    {
      id: '2',
      languageId: '2',
      code: `function twoSum(nums, target) {
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(nums[i], i);
    }
    
    return [];
}`,
      explanation: 'JavaScript implementation using Map for O(1) lookup time.',
      isOptimal: true
    }
  ];

  const displayQuestion = question || mockQuestion;
  const displaySolutions = solutions || mockSolutions;

  const getAiExplanationMutation = useMutation({
    mutationFn: async ({ code, language }: { code: string; language: string }) => {
      const response = await apiRequest('POST', '/api/ai/explain-code', { code, language });
      return response.json();
    },
    onSuccess: (data) => {
      setAiExplanation(data);
      setIsLoadingExplanation(false);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to generate AI explanation. Please try again.",
        variant: "destructive",
      });
      setIsLoadingExplanation(false);
    },
  });

  const handleGetAiExplanation = () => {
    if (!code.trim()) {
      toast({
        title: "No code to explain",
        description: "Please write some code first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoadingExplanation(true);
    getAiExplanationMutation.mutate({ code, language: selectedLanguage });
  };

  const handleRunCode = async (codeToRun: string, language: string, input: string) => {
    // Mock code execution
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSubmit = async (codeToSubmit: string, language: string) => {
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Solution submitted!",
      description: "Your solution has been submitted successfully.",
    });
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (questionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/interview-prep">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Questions
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{displayQuestion.title}</h1>
            <div className="flex items-center space-x-4">
              <DifficultyBadge difficulty={displayQuestion.difficulty} />
              {displayQuestion.companyId && (
                <CompanyBadge company={{ name: 'Google', slug: 'google', color: '#4285f4' }} />
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            {displayQuestion.timeComplexity && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Time: {displayQuestion.timeComplexity}
              </div>
            )}
            {displayQuestion.spaceComplexity && (
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-1" />
                Space: {displayQuestion.spaceComplexity}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{displayQuestion.description}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="examples" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="examples">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {displayQuestion.testCases?.map((testCase: any, index: number) => (
                      <div key={index} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                        <div className="font-semibold mb-2">Example {index + 1}:</div>
                        <div className="space-y-1 text-sm">
                          <div><strong>Input:</strong> {testCase.input}</div>
                          <div><strong>Output:</strong> {testCase.expected}</div>
                          {testCase.explanation && (
                            <div><strong>Explanation:</strong> {testCase.explanation}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hints">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Hints
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {displayQuestion.hints ? (
                      <div className="space-y-3">
                        {displayQuestion.hints.map((hint: string, index: number) => (
                          <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                            <div className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                              Hint {index + 1}:
                            </div>
                            <p className="text-yellow-700 dark:text-yellow-200 text-sm">{hint}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">No hints available for this problem.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="solutions">
                <Card>
                  <CardHeader>
                    <CardTitle>Example Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {displaySolutions.map((solution: any, index: number) => (
                      <div key={solution.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {solution.languageId === '1' ? 'Python' : 'JavaScript'}
                            </Badge>
                            {solution.isOptimal && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Optimal
                              </Badge>
                            )}
                          </div>
                        </div>
                        <pre className="bg-slate-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{solution.code}</code>
                        </pre>
                        {solution.explanation && (
                          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            {solution.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <CodeEditor
              initialCode={code}
              initialLanguage={selectedLanguage}
              onCodeChange={setCode}
              onLanguageChange={setSelectedLanguage}
              onRun={handleRunCode}
              onSubmit={handleSubmit}
            />

            {/* AI Explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Code Explanation
                  </div>
                  <Button 
                    onClick={handleGetAiExplanation}
                    disabled={isLoadingExplanation}
                    size="sm"
                  >
                    {isLoadingExplanation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Explain Code
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingExplanation ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2">Generating explanation...</span>
                  </div>
                ) : aiExplanation ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Overview</h4>
                      <p className="text-gray-600 dark:text-gray-300">{aiExplanation.overview}</p>
                    </div>
                    
                    {aiExplanation.stepByStep?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Step-by-Step Breakdown</h4>
                        <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {aiExplanation.stepByStep.map((step: string, index: number) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Time Complexity</h4>
                        <Badge variant="outline">{aiExplanation.timeComplexity}</Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Space Complexity</h4>
                        <Badge variant="outline">{aiExplanation.spaceComplexity}</Badge>
                      </div>
                    </div>
                    
                    {aiExplanation.keyConcepts?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Concepts</h4>
                        <div className="flex flex-wrap gap-2">
                          {aiExplanation.keyConcepts.map((concept: string, index: number) => (
                            <Badge key={index} variant="secondary">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    Write some code and click "Explain Code" to get an AI-powered explanation of your solution.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CompanyBadge } from '@/components/ui/company-badge';
import { DifficultyBadge } from '@/components/ui/difficulty-badge';
import { Footer } from '@/components/navigation/footer';
import { 
  Building, 
  Search, 
  Filter,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

export default function InterviewPrep() {
  const [, setLocation] = useLocation();
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get URL params for initial filters
  const urlParams = new URLSearchParams(window.location.search);
  const companyParam = urlParams.get('company');

  // Set initial company filter from URL
  useState(() => {
    if (companyParam && companyParam !== selectedCompany) {
      setSelectedCompany(companyParam);
    }
  });

  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["/api/companies"],
    retry: false,
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ["/api/topics"],
    retry: false,
  });

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["/api/questions", selectedCompany, selectedTopic, selectedDifficulty],
    retry: false,
  });

  // Mock data for demonstration
  const defaultCompanies = [
    { id: '1', name: 'Google', slug: 'google', color: '#4285f4' },
    { id: '2', name: 'Amazon', slug: 'amazon', color: '#ff9900' },
    { id: '3', name: 'Microsoft', slug: 'microsoft', color: '#00bcf2' },
    { id: '4', name: 'Meta', slug: 'meta', color: '#1877f2' },
    { id: '5', name: 'Apple', slug: 'apple', color: '#007aff' },
  ];

  const defaultTopics = [
    { id: '1', name: 'Arrays', slug: 'arrays' },
    { id: '2', name: 'Linked Lists', slug: 'linked-lists' },
    { id: '3', name: 'Trees & Graphs', slug: 'trees-graphs' },
    { id: '4', name: 'Dynamic Programming', slug: 'dynamic-programming' },
    { id: '5', name: 'Sorting & Searching', slug: 'sorting-searching' },
  ];

  const defaultQuestions = [
    {
      id: '1',
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers, return indices of two numbers that add up to a target.',
      difficulty: 'Easy',
      companyId: '1',
      topicId: '1',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
    {
      id: '2',
      title: 'Valid Parentheses',
      slug: 'valid-parentheses',
      description: 'Determine if the input string of parentheses is valid using a stack data structure.',
      difficulty: 'Easy',
      companyId: '1',
      topicId: '2',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
    {
      id: '3',
      title: 'Maximum Subarray',
      slug: 'maximum-subarray',
      description: 'Find the contiguous subarray with the largest sum using Kadane\'s algorithm.',
      difficulty: 'Medium',
      companyId: '1',
      topicId: '4',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    {
      id: '4',
      title: 'Binary Tree Level Order',
      slug: 'binary-tree-level-order',
      description: 'Return the level order traversal of a binary tree using BFS algorithm.',
      difficulty: 'Medium',
      companyId: '1',
      topicId: '3',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  ];

  const displayCompanies = companies || defaultCompanies;
  const displayTopics = topics || defaultTopics;
  const displayQuestions = questions || defaultQuestions;

  // Filter questions based on selections
  const filteredQuestions = displayQuestions.filter((question: any) => {
    const matchesCompany = selectedCompany === 'all' || question.companyId === selectedCompany;
    const matchesTopic = selectedTopic === 'all' || question.topicId === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCompany && matchesTopic && matchesDifficulty && matchesSearch;
  });

  const getCompanyById = (id: string) => displayCompanies.find((c: any) => c.id === id);
  const getTopicById = (id: string) => displayTopics.find((t: any) => t.id === id);

  const stats = {
    totalQuestions: displayQuestions.length,
    companies: displayCompanies.length,
    solved: 0, // Would come from user progress
    avgTime: '45 min',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Company-Specific Interview Prep</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice with real interview questions from top tech companies. 
            Filter by company, topic, and difficulty to focus your preparation.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-violet-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.companies}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Companies</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.solved}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Solved</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgTime}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Company Filter Tabs */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Company</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCompany === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCompany('all')}
              className="rounded-full"
            >
              All Companies
            </Button>
            {displayCompanies.map((company: any) => (
              <Button
                key={company.id}
                variant={selectedCompany === company.id ? 'default' : 'outline'}
                onClick={() => setSelectedCompany(company.id)}
                className={`rounded-full ${
                  selectedCompany === company.id ? `company-${company.slug}` : ''
                }`}
              >
                {company.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {displayTopics.map((topic: any) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCompany('all');
                  setSelectedTopic('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Questions Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              Questions ({filteredQuestions.length})
            </h3>
          </div>
          
          {questionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters to see more questions.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedCompany('all');
                    setSelectedTopic('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredQuestions.map((question: any) => {
                const company = getCompanyById(question.companyId);
                const topic = getTopicById(question.topicId);
                
                return (
                  <Card key={question.id} className="hover:shadow-lg transition-shadow duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {question.title}
                        </h3>
                        <DifficultyBadge difficulty={question.difficulty} />
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {question.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {company && <CompanyBadge company={company} />}
                          {topic && (
                            <Badge variant="outline" className="text-xs">
                              {topic.name}
                            </Badge>
                          )}
                        </div>
                        
                        <Link href={`/questions/${question.slug}`}>
                          <Button variant="ghost" size="sm" className="group">
                            Solve
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                      
                      {(question.timeComplexity || question.spaceComplexity) && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            {question.timeComplexity && (
                              <span>Time: {question.timeComplexity}</span>
                            )}
                            {question.spaceComplexity && (
                              <span>Space: {question.spaceComplexity}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

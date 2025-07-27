import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Footer } from '@/components/navigation/footer';
import { 
  BookOpen, 
  Code, 
  Play, 
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { Link } from 'wouter';

export default function LanguageDetail() {
  const { slug } = useParams();

  const { data: language, isLoading: languageLoading } = useQuery({
    queryKey: ["/api/languages", slug],
    retry: false,
    enabled: !!slug,
  });

  const { data: tutorials } = useQuery({
    queryKey: ["/api/languages", language?.id, "tutorials"],
    retry: false,
    enabled: !!language?.id,
  });

  // Mock data for demonstration
  const mockLanguage = {
    id: '1',
    name: 'Python',
    slug: 'python',
    description: 'Python is a high-level, interpreted programming language with dynamic semantics. Its high-level built in data structures, combined with dynamic typing and dynamic binding, make it very attractive for Rapid Application Development, as well as for use as a scripting or glue language to connect existing components together.',
    color: '#3776ab',
    icon: '🐍',
    syntaxHighlight: 'python'
  };

  const mockTutorials = [
    {
      id: '1',
      title: 'Getting Started with Python',
      slug: 'getting-started',
      content: `# Welcome to Python!

Python is a beginner-friendly programming language that's perfect for learning programming concepts.

## Your First Python Program

Let's start with the classic "Hello, World!" program:

\`\`\`python
print("Hello, World!")
\`\`\`

This simple line of code will output "Hello, World!" to the console.

## Variables and Data Types

Python has several built-in data types:

\`\`\`python
# Strings
name = "Alice"
message = 'Hello there!'

# Numbers
age = 25
pi = 3.14159

# Booleans
is_student = True
is_graduated = False

# Lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
\`\`\`

## Basic Operations

Python supports standard mathematical operations:

\`\`\`python
# Arithmetic
result = 10 + 5    # Addition: 15
result = 10 - 3    # Subtraction: 7
result = 4 * 6     # Multiplication: 24
result = 15 / 3    # Division: 5.0

# String operations
greeting = "Hello" + " " + "World"  # Concatenation
repeated = "Python" * 3             # Repetition
\`\`\``,
      order: 1,
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Control Flow and Loops',
      slug: 'control-flow',
      content: `# Control Flow in Python

Control flow statements let you control the order in which your code executes.

## If Statements

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
\`\`\`

## For Loops

\`\`\`python
# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop through a range of numbers
for i in range(5):
    print(f"Number: {i}")

# Loop with enumerate to get index and value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

## While Loops

\`\`\`python
count = 0
while count < 5:
    print(f"Count is: {count}")
    count += 1
\`\`\``,
      order: 2,
      difficulty: 'Beginner'
    },
    {
      id: '3',
      title: 'Functions and Modules',
      slug: 'functions-modules',
      content: `# Functions and Modules

Functions help you organize your code into reusable blocks.

## Defining Functions

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

def add_numbers(a, b):
    return a + b

def calculate_area(length, width):
    """Calculate the area of a rectangle."""
    return length * width

# Using functions
message = greet("Alice")
sum_result = add_numbers(5, 3)
area = calculate_area(10, 5)
\`\`\`

## Default Parameters

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Using default parameter
print(greet("Bob"))              # Hello, Bob!
print(greet("Alice", "Hi"))      # Hi, Alice!
\`\`\`

## Lambda Functions

\`\`\`python
# Lambda functions are short, anonymous functions
square = lambda x: x ** 2
add = lambda x, y: x + y

print(square(5))    # 25
print(add(3, 4))    # 7

# Common use with map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
\`\`\``,
      order: 3,
      difficulty: 'Intermediate'
    }
  ];

  const displayLanguage = language || mockLanguage;
  const displayTutorials = tutorials || mockTutorials;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const learningStats = {
    totalTutorials: displayTutorials.length,
    completed: 0, // Would come from user progress
    timeToComplete: '8 hours',
    difficulty: 'Beginner-friendly'
  };

  const projects = [
    {
      title: 'Calculator App',
      description: 'Build a simple calculator with basic operations',
      difficulty: 'Beginner',
      estimatedTime: '2 hours'
    },
    {
      title: 'Todo List Manager',
      description: 'Create a command-line todo list application',
      difficulty: 'Intermediate',
      estimatedTime: '4 hours'
    },
    {
      title: 'Web Scraper',
      description: 'Build a web scraper using Beautiful Soup',
      difficulty: 'Advanced',
      estimatedTime: '6 hours'
    }
  ];

  if (languageLoading) {
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
          <Link href="/languages">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Languages
            </Button>
          </Link>
          
          <div className="flex items-center mb-6">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mr-6"
              style={{ backgroundColor: displayLanguage.color }}
            >
              {displayLanguage.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{displayLanguage.name}</h1>
              <Badge className={getDifficultyColor(learningStats.difficulty)}>
                {learningStats.difficulty}
              </Badge>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
            {displayLanguage.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningStats.totalTutorials}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tutorials</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningStats.completed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningStats.timeToComplete}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time to Complete</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-violet-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">50K+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tutorials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tutorials" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Learning Path</h2>
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </div>
              
              <div className="space-y-4">
                {displayTutorials.map((tutorial: any, index: number) => (
                  <Card key={tutorial.id} className="hover:shadow-lg transition-shadow duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {tutorial.order}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {tutorial.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getDifficultyColor(tutorial.difficulty)}>
                                {tutorial.difficulty}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                ~30 min read
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      {tutorial.content && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div className="prose dark:prose-invert max-w-none text-sm">
                            <div dangerouslySetInnerHTML={{ 
                              __html: tutorial.content.split('\n').slice(0, 3).join('<br/>') + '...' 
                            }} />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Practice Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(project.difficulty)}>
                          {project.difficulty}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {project.estimatedTime}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <Button className="w-full" variant="outline">
                        Start Project
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Progress</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tutorials Completed</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <Code className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Projects Built</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">0h</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Time Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Complete tutorials and projects to earn achievements!
                    </p>
                    <Button>Start Learning</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

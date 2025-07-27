import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, TrendingUp } from 'lucide-react';
import { Footer } from '@/components/navigation/footer';

export default function Languages() {
  const { data: languages, isLoading } = useQuery({
    queryKey: ["/api/languages"],
    retry: false,
  });

  // Mock data for demonstration
  const defaultLanguages = [
    {
      id: '1',
      name: 'Python',
      slug: 'python',
      description: 'Perfect for beginners, data science, and backend development. Easy to learn with clean syntax.',
      color: '#3776ab',
      icon: '🐍',
      tutorialCount: 180,
      difficulty: 'Beginner-friendly'
    },
    {
      id: '2',
      name: 'JavaScript',
      slug: 'javascript',
      description: 'Essential for web development, frontend frameworks, and modern full-stack applications.',
      color: '#f7df1e',
      icon: '⚡',
      tutorialCount: 220,
      difficulty: 'Beginner-friendly'
    },
    {
      id: '3',
      name: 'Java',
      slug: 'java',
      description: 'Industry standard for enterprise applications, Android development, and large-scale systems.',
      color: '#ed8b00',
      icon: '☕',
      tutorialCount: 160,
      difficulty: 'Intermediate'
    },
    {
      id: '4',
      name: 'C++',
      slug: 'cpp',
      description: 'High-performance computing, system programming, and competitive programming.',
      color: '#00599c',
      icon: '⚙️',
      tutorialCount: 140,
      difficulty: 'Advanced'
    },
    {
      id: '5',
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Strongly typed JavaScript for large-scale applications and better developer experience.',
      color: '#3178c6',
      icon: '📘',
      tutorialCount: 95,
      difficulty: 'Intermediate'
    },
    {
      id: '6',
      name: 'Go',
      slug: 'go',
      description: 'Modern language for cloud computing, microservices, and concurrent programming.',
      color: '#00add8',
      icon: '🐹',
      tutorialCount: 75,
      difficulty: 'Intermediate'
    }
  ];

  const displayLanguages = languages || defaultLanguages;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner-friendly':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const learningPaths = [
    {
      title: 'Web Development Path',
      description: 'Master frontend and backend web development',
      languages: ['JavaScript', 'TypeScript', 'Python'],
      duration: '12 weeks',
      level: 'Beginner to Advanced'
    },
    {
      title: 'Data Science Path',
      description: 'Learn data analysis, machine learning, and AI',
      languages: ['Python', 'R', 'SQL'],
      duration: '16 weeks',
      level: 'Intermediate'
    },
    {
      title: 'Mobile Development Path',
      description: 'Build native and cross-platform mobile apps',
      languages: ['Java', 'Kotlin', 'Swift'],
      duration: '14 weeks',
      level: 'Intermediate'
    },
    {
      title: 'Systems Programming Path',
      description: 'Low-level programming and performance optimization',
      languages: ['C++', 'Rust', 'Go'],
      duration: '18 weeks',
      level: 'Advanced'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Master Programming Languages</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from beginner to advanced with comprehensive tutorials, examples, and hands-on projects. 
            Choose your path and start coding today.
          </p>
        </div>

        {/* Language Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Code className="h-6 w-6 mr-2" />
            Popular Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayLanguages.map((language: any) => (
              <Link key={language.id} href={`/languages/${language.slug}`}>
                <Card className="h-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4"
                        style={{ backgroundColor: language.color || '#6b7280' }}
                      >
                        {language.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {language.name}
                        </h3>
                        <Badge className={getDifficultyColor(language.difficulty)}>
                          {language.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {language.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {language.tutorialCount}+ Tutorials
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">{path.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {path.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>📅 {path.duration}</span>
                      <span>🎯 {path.level}</span>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      Start Learning Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-200 dark:border-blue-700/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">New to Programming?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Start with Python - it's beginner-friendly, versatile, and widely used in the industry. 
              Our interactive tutorials will guide you from basic syntax to advanced concepts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/languages/python">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start with Python
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Take Quiz: Which Language?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

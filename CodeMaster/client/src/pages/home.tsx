import { useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Code, 
  Trophy, 
  Calendar,
  ArrowRight,
  Brain,
  Building
} from 'lucide-react';
import { Footer } from '@/components/navigation/footer';

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

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

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/user/progress"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: companies } = useQuery({
    queryKey: ["/api/companies"],
    retry: false,
  });

  const { data: languages } = useQuery({
    queryKey: ["/api/languages"],
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = {
    solved: userProgress?.filter((p: any) => p.solved).length || 0,
    total: userProgress?.length || 0,
    streak: 7, // Mock data
    xp: 1250, // Mock data
  };

  const recentActivity = [
    { type: 'solved', title: 'Two Sum', company: 'Google', difficulty: 'Easy', time: '2 hours ago' },
    { type: 'attempted', title: 'Valid Parentheses', company: 'Amazon', difficulty: 'Easy', time: '1 day ago' },
    { type: 'learned', title: 'Python Basics', topic: 'Variables', time: '2 days ago' },
  ];

  const recommendations = [
    { title: 'Maximum Subarray', company: 'Google', difficulty: 'Medium', topic: 'Dynamic Programming' },
    { title: 'Merge Two Sorted Lists', company: 'Amazon', difficulty: 'Easy', topic: 'Linked Lists' },
    { title: 'Binary Tree Inorder Traversal', company: 'Microsoft', difficulty: 'Medium', topic: 'Trees' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || 'Coder'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to continue your coding journey? Let's make today count!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Problems Solved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.solved}</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak} days</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total XP</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.xp}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/practice">
                    <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700">
                      <Code className="h-6 w-6" />
                      <span>Practice Coding</span>
                    </Button>
                  </Link>
                  
                  <Link href="/interview-prep">
                    <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-violet-600 hover:bg-violet-700">
                      <Building className="h-6 w-6" />
                      <span>Interview Prep</span>
                    </Button>
                  </Link>
                  
                  <Link href="/languages">
                    <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-emerald-600 hover:bg-emerald-700">
                      <BookOpen className="h-6 w-6" />
                      <span>Learn Languages</span>
                    </Button>
                  </Link>
                  
                  <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-orange-600 hover:bg-orange-700">
                    <Brain className="h-6 w-6" />
                    <span>AI Tutor</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'solved' ? 'bg-green-500' :
                          activity.type === 'attempted' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.company || activity.topic} • {activity.difficulty || 'Tutorial'}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%</span>
                  </div>
                  <Progress value={stats.total > 0 ? (stats.solved / stats.total) * 100 : 0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Easy Problems</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Medium Problems</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Hard Problems</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline">{rec.company}</Badge>
                        <Badge variant={rec.difficulty === 'Easy' ? 'default' : rec.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {rec.difficulty}
                        </Badge>
                        <span className="text-gray-500 dark:text-gray-400">{rec.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

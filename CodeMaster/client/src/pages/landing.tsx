import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Building, 
  Code, 
  TrendingUp, 
  Users, 
  Trophy,
  ArrowRight,
  Rocket,
  Bus,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { Footer } from '@/components/navigation/footer';

export default function Landing() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized explanations, visual algorithm breakdowns, and intelligent code analysis powered by advanced AI.',
      gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      border: 'border-blue-200 dark:border-blue-700/30',
      iconBg: 'bg-blue-600'
    },
    {
      icon: Building,
      title: 'Company-Specific Prep',
      description: 'Tailored interview preparation for Google, Amazon, Microsoft, Meta, and other top tech companies.',
      gradient: 'from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20',
      border: 'border-violet-200 dark:border-violet-700/30',
      iconBg: 'bg-violet-600'
    },
    {
      icon: Code,
      title: 'Interactive Coding',
      description: 'Practice with our advanced code editor, run tests, and get instant feedback on your solutions.',
      gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
      border: 'border-emerald-200 dark:border-emerald-700/30',
      iconBg: 'bg-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your learning progress, identify weak areas, and get personalized improvement recommendations.',
      gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      border: 'border-orange-200 dark:border-orange-700/30',
      iconBg: 'bg-orange-600'
    },
    {
      icon: Users,
      title: 'Mock Interviews',
      description: 'Practice live coding interviews with peers and get real-time feedback from experienced developers.',
      gradient: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      border: 'border-pink-200 dark:border-pink-700/30',
      iconBg: 'bg-pink-600'
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn XP, unlock achievements, maintain streaks, and compete on leaderboards to stay motivated.',
      gradient: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      border: 'border-indigo-200 dark:border-indigo-700/30',
      iconBg: 'bg-indigo-600'
    }
  ];

  const languages = [
    {
      name: 'Python',
      icon: '🐍',
      description: 'Perfect for beginners, data science, and backend development.',
      tutorials: '180+ Tutorials',
      color: 'bg-blue-600'
    },
    {
      name: 'JavaScript',
      icon: '⚡',
      description: 'Essential for web development and modern applications.',
      tutorials: '220+ Tutorials',
      color: 'bg-yellow-500'
    },
    {
      name: 'Java',
      icon: '☕',
      description: 'Industry standard for enterprise and Android development.',
      tutorials: '160+ Tutorials',
      color: 'bg-red-600'
    },
    {
      name: 'C++',
      icon: '⚙️',
      description: 'High-performance computing and system programming.',
      tutorials: '140+ Tutorials',
      color: 'bg-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Software Engineer at Google',
      content: 'CodePath helped me crack Google\'s interview! The AI explanations made complex algorithms finally click for me.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'SDE II at Amazon',
      content: 'The company-specific prep was amazing. I practiced Amazon\'s leadership principles alongside coding challenges.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Software Developer at Microsoft',
      content: 'From bootcamp to Microsoft in 6 months! The progress tracking kept me motivated throughout my journey.',
      avatar: '👨‍🔬'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI-powered learning work?',
      answer: 'Our AI analyzes your code submissions, identifies patterns in your learning, and provides personalized explanations for algorithms and data structures. It can break down complex problems step-by-step and suggest optimal learning paths based on your progress.'
    },
    {
      question: 'Are the interview questions from real companies?',
      answer: 'Yes! Our database contains thousands of questions that have been reported by candidates who interviewed at top companies. We regularly update our collection and organize them by company, difficulty, and topic to match real interview patterns.'
    },
    {
      question: 'Can I practice with friends?',
      answer: 'Absolutely! Our platform supports collaborative coding sessions, mock interviews with peers, and study groups. You can share your progress, compete on leaderboards, and even conduct live coding interviews with video chat integration.'
    },
    {
      question: 'Is CodePath suitable for beginners?',
      answer: 'Yes! We offer comprehensive tutorials starting from basic programming concepts to advanced algorithms. Our AI tutor adapts to your skill level and provides explanations at the appropriate complexity. You can start with fundamentals and gradually work your way up to interview-level problems.'
    }
  ];

  const handleGetStarted = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900/20 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22 width=%2232%22 height=%2232%22 fill=%22none%22 stroke=%22rgb(148 163 184 / 0.05)%22%3e%3cpath d=%22m0 .5 32 32M31.5 0 .5 32%22/%3e%3c/svg%3e')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                Learn to Code.
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Crack Your Dream Job.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master programming languages, solve interview challenges, and land your dream job at top tech companies with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={handleGetStarted}
              >
                <Rocket className="h-5 w-5 mr-2" />
                Start Learning
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 border-2 border-violet-600 text-violet-600 dark:text-violet-400 hover:bg-violet-600 hover:text-white text-lg font-semibold transition-all duration-300"
                onClick={handleGetStarted}
              >
                <Bus className="h-5 w-5 mr-2" />
                Practice Interviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CodePath?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to succeed in your coding journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} transform hover:-translate-y-1 transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Popular Languages</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Learn from beginner to advanced with comprehensive tutorials and examples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((language, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${language.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {language.icon}
                    </div>
                    <h3 className="text-xl font-semibold ml-4">{language.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{language.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{language.tutorials}</span>
                    <Link href="/languages" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Hear from developers who landed their dream jobs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-blue-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to know about CodePath</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800">
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-12">Join thousands of developers who've landed their dream jobs</p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={handleGetStarted}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

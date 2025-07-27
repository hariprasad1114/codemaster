import { Link } from 'wouter';
import { Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CodePath</span>
            </div>
            <p className="text-sm">
              Empowering developers to achieve their career goals through comprehensive coding education and interview preparation.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/languages/python" className="hover:text-blue-400 transition-colors">Python</Link></li>
              <li><Link href="/languages/javascript" className="hover:text-blue-400 transition-colors">JavaScript</Link></li>
              <li><Link href="/languages/java" className="hover:text-blue-400 transition-colors">Java</Link></li>
              <li><Link href="/languages/cpp" className="hover:text-blue-400 transition-colors">C++</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Interview Prep</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/interview-prep?company=google" className="hover:text-blue-400 transition-colors">Google</Link></li>
              <li><Link href="/interview-prep?company=amazon" className="hover:text-blue-400 transition-colors">Amazon</Link></li>
              <li><Link href="/interview-prep?company=microsoft" className="hover:text-blue-400 transition-colors">Microsoft</Link></li>
              <li><Link href="/interview-prep?company=meta" className="hover:text-blue-400 transition-colors">Meta</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 CodePath. All rights reserved. Empowering the next generation of developers.</p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, Loader2 } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  onRun?: (code: string, language: string, input: string) => void;
  onSubmit?: (code: string, language: string) => void;
  className?: string;
}

const languages = [
  { value: 'python', label: 'Python', defaultCode: '# Write your Python code here\ndef solution():\n    pass\n\nsolution()' },
  { value: 'javascript', label: 'JavaScript', defaultCode: '// Write your JavaScript code here\nfunction solution() {\n    // Your code here\n}\n\nsolution();' },
  { value: 'java', label: 'Java', defaultCode: '// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}' },
  { value: 'cpp', label: 'C++', defaultCode: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}' },
];

export function CodeEditor({
  initialCode,
  initialLanguage = 'python',
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  className = ''
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || languages.find(l => l.value === initialLanguage)?.defaultCode || '');
  const [language, setLanguage] = useState(initialLanguage);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    const langConfig = languages.find(l => l.value === newLanguage);
    if (langConfig && !code.trim()) {
      setCode(langConfig.defaultCode);
      onCodeChange?.(langConfig.defaultCode);
    }
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput('Code executed successfully!\n✓ All test cases passed');
      onRun?.(code, language, input);
    } catch (error) {
      setOutput('Error executing code: ' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleRun();
      onSubmit?.(code, language);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleRun} 
              disabled={isRunning || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isRunning || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
          {/* Code Editor */}
          <div className="bg-slate-900 text-gray-100 p-6 font-mono text-sm overflow-auto">
            <Textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full min-h-full bg-transparent border-none text-gray-100 font-mono text-sm resize-none focus:ring-0 focus:outline-none"
              placeholder="Write your code here..."
              style={{ 
                height: 'auto',
                minHeight: '300px',
                fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
              }}
            />
          </div>
          
          {/* Input/Output */}
          <div className="bg-gray-50 dark:bg-slate-800 flex flex-col">
            <div className="flex-1 p-6 border-b border-gray-200 dark:border-slate-600">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Input</h4>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 p-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg font-mono text-sm resize-none"
                placeholder="Enter test input..."
              />
            </div>
            <div className="flex-1 p-6">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Output</h4>
              <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-24 whitespace-pre-wrap">
                {output || "Run your code to see output..."}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

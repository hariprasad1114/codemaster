import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/navigation/navbar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Languages from "@/pages/languages";
import LanguageDetail from "@/pages/language-detail";
import InterviewPrep from "@/pages/interview-prep";
import QuestionDetail from "@/pages/question-detail";
import Practice from "@/pages/practice";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <Navbar />
      <Switch>
        {isLoading || !isAuthenticated ? (
          <Route path="/" component={Landing} />
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/languages" component={Languages} />
            <Route path="/languages/:slug" component={LanguageDetail} />
            <Route path="/interview-prep" component={InterviewPrep} />
            <Route path="/questions/:slug" component={QuestionDetail} />
            <Route path="/practice" component={Practice} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="codepath-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

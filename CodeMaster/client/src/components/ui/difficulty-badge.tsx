import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  className?: string;
}

const difficultyColors = {
  Easy: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
  Medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  Hard: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <Badge 
      variant="outline"
      className={cn(difficultyColors[difficulty], 'font-medium', className)}
    >
      {difficulty}
    </Badge>
  );
}

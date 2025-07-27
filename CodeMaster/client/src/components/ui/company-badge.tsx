import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CompanyBadgeProps {
  company: {
    name: string;
    slug: string;
    color: string;
  };
  className?: string;
}

const companyColors = {
  google: 'bg-blue-500 hover:bg-blue-600 text-white',
  amazon: 'bg-orange-500 hover:bg-orange-600 text-white',
  microsoft: 'bg-cyan-500 hover:bg-cyan-600 text-white',
  meta: 'bg-blue-600 hover:bg-blue-700 text-white',
  apple: 'bg-gray-800 hover:bg-gray-900 text-white',
  default: 'bg-gray-500 hover:bg-gray-600 text-white',
};

export function CompanyBadge({ company, className }: CompanyBadgeProps) {
  const colorClass = companyColors[company.slug as keyof typeof companyColors] || companyColors.default;

  return (
    <Badge 
      className={cn(colorClass, 'font-medium', className)}
      variant="secondary"
    >
      {company.name}
    </Badge>
  );
}

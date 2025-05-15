
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ProblemStatus } from '@/types/problem';
import { cn } from '@/lib/utils';

interface ProblemStatusBadgeProps {
  status: ProblemStatus;
  className?: string;
}

const ProblemStatusBadge = ({ status, className }: ProblemStatusBadgeProps) => {
  const getVariantForStatus = (status: ProblemStatus) => {
    switch (status) {
      case 'Reported':
        return 'outline';
      case 'Acknowledged':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'Resolved':
        return 'destructive'; // Using destructive for green color
      default:
        return 'outline';
    }
  };

  const getTextColorForStatus = (status: ProblemStatus) => {
    switch (status) {
      case 'Reported':
        return 'text-amber-500';
      case 'Acknowledged':
        return 'text-blue-500';
      case 'In Progress':
        return 'text-primary';
      case 'Resolved':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <Badge 
      variant={getVariantForStatus(status)}
      className={cn(
        getTextColorForStatus(status),
        status === 'Resolved' ? 'bg-green-100 hover:bg-green-200 border-green-200' : '',
        status === 'Reported' ? 'bg-amber-50 border-amber-200' : '',
        status === 'Acknowledged' ? 'bg-blue-50 text-blue-500 border-blue-200' : '',
        status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' : '',
        className
      )}
    >
      {status}
    </Badge>
  );
};

export default ProblemStatusBadge;

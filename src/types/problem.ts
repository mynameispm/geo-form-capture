
export type ProblemStatus = 'Reported' | 'Acknowledged' | 'In Progress' | 'Resolved';

export interface Problem {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    area: string;
  };
  reportedBy: string;
  reportedDate: string;
  status: ProblemStatus;
  images?: string[];
}

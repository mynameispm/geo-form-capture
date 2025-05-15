
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import ProblemStatusBadge from '@/components/ProblemStatusBadge';
import { mockProblems } from '@/data/mockProblems';
import { Problem } from '@/types/problem';

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [view, setView] = useState<'cards' | 'table'>('cards');

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Milaan Community Reports</h1>
          <p className="text-muted-foreground">Browse recent issues reported in your community</p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setView('cards')}
              className={`px-3 py-2 rounded-md flex items-center ${view === 'cards' ? 'bg-primary text-white' : 'bg-muted/40 text-muted-foreground'}`}
            >
              <span>Card View</span>
            </button>
            <button 
              onClick={() => setView('table')}
              className={`px-3 py-2 rounded-md flex items-center ${view === 'table' ? 'bg-primary text-white' : 'bg-muted/40 text-muted-foreground'}`}
            >
              <span>Table View</span>
            </button>
          </div>
        </div>

        {view === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <Link to={`/problem/${problem.id}`} key={problem.id}>
                <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold line-clamp-1">{problem.title}</CardTitle>
                      <ProblemStatusBadge status={problem.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{problem.location.area}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{problem.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(problem.reportedDate), 'PP')}
                      </div>
                      {problem.images && problem.images.length > 0 && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          <span>{problem.images.length}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Reported On</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {problems.map((problem) => (
                  <TableRow key={problem.id} className="cursor-pointer hover:bg-muted/60">
                    <TableCell className="font-medium">
                      <Link to={`/problem/${problem.id}`} className="hover:text-primary">
                        {problem.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{problem.location.area}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(problem.reportedDate), 'PP')}</TableCell>
                    <TableCell>
                      <ProblemStatusBadge status={problem.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;

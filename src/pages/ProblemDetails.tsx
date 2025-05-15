
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, ArrowLeft, Clock, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import ProblemStatusBadge from '@/components/ProblemStatusBadge';
import { mockProblems } from '@/data/mockProblems';

const ProblemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState(mockProblems.find(p => p.id === id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // In a real app, we would fetch the problem details from an API
  useEffect(() => {
    // Simulating an API call
    setProblem(mockProblems.find(p => p.id === id));
  }, [id]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-primary mb-2">Problem Not Found</h2>
                <p className="text-muted-foreground mb-6">The problem you're looking for could not be found.</p>
                <Link to="/problems">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Problems
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/problems" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Problems
          </Link>
        </div>
        
        <Card className="shadow-lg border-border/50 overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-border/20">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-primary">{problem.title}</CardTitle>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{problem.location.area}</span>
                </div>
              </div>
              <ProblemStatusBadge status={problem.status} className="ml-auto" />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Problem location map */}
            <div className="h-[300px] border-b border-border/20">
              <GoogleMapComponent 
                latitude={problem.location.latitude}
                longitude={problem.location.longitude}
                locationCaptured={true}
              />
            </div>
            
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Main content column */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Problem Description</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </div>
                  
                  {/* Images section */}
                  {problem.images && problem.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <ImageIcon className="h-5 w-5 mr-2" /> 
                        Attached Images
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {problem.images.map((img, index) => (
                          <div 
                            key={index} 
                            className="aspect-video bg-muted rounded-md overflow-hidden cursor-pointer border border-border/30 hover:border-primary/30 transition-colors"
                            onClick={() => setSelectedImage(img)}
                          >
                            <img 
                              src={img} 
                              alt={`Problem image ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sidebar with additional info */}
                <div className="space-y-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Report Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Reported on: {format(new Date(problem.reportedDate), 'PPP')}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Time: {format(new Date(problem.reportedDate), 'p')}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-3">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Address: {problem.location.address}</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <span className="text-muted-foreground">Reported by:</span>
                          <div className="font-medium">{problem.reportedBy}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Coordinates</h4>
                      <p className="text-xs text-muted-foreground">
                        Latitude: {problem.location.latitude.toFixed(6)}<br />
                        Longitude: {problem.location.longitude.toFixed(6)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/20 border-t border-border/20 px-6 py-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Problem ID: {problem.id}</span>
              <Link to={`/problems/${problem.id}/edit`}>
                <Button variant="outline">Update Status</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        {/* Image viewer modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
            <div className="max-w-4xl max-h-[90vh] w-full relative">
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-full object-contain rounded-md" 
              />
              <button 
                className="absolute top-2 right-2 bg-black/40 text-white p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;

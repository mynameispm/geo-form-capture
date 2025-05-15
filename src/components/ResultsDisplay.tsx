
import React from 'react';

interface ResultsDisplayProps {
  show: boolean;
  name: string;
  locationCaptured: boolean;
  latitude: number | null;
  longitude: number | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  show,
  name,
  locationCaptured,
  latitude,
  longitude
}) => {
  if (!show) return null;

  return (
    <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
      <h2 className="text-xl font-semibold mb-2 text-green-800">Form Submission Summary</h2>
      <p className="mb-1"><span className="font-medium">Name:</span> {name}</p>
      <p>
        <span className="font-medium">Location:</span> {locationCaptured ? 
          `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}` : 
          "Location not available"}
      </p>
    </div>
  );
};

export default ResultsDisplay;


import React from 'react';
import { Check, MapPin } from "lucide-react";

interface LocationStatusProps {
  locationStatus: string;
  locationCaptured: boolean;
}

const LocationStatus: React.FC<LocationStatusProps> = ({ locationStatus, locationCaptured }) => {
  return (
    <div className={`mb-6 p-3 rounded-lg flex items-center justify-center gap-2 ${
      locationCaptured ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
    }`}>
      {locationCaptured ? (
        <Check className="h-5 w-5" />
      ) : (
        <MapPin className="h-5 w-5 animate-pulse" />
      )}
      <p className="text-sm font-medium">{locationStatus}</p>
    </div>
  );
};

export default LocationStatus;

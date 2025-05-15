
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import LocationStatus from './LocationStatus';

interface LocationFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  latitude: number | null;
  longitude: number | null;
  locationStatus: string;
  locationCaptured: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationForm: React.FC<LocationFormProps> = ({
  name,
  setName,
  latitude,
  longitude,
  locationStatus,
  locationCaptured,
  setShowResults
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setShowResults(true);
    
    // In a real application, you might send this data to a server
    console.log("Form submitted with:", {
      name,
      location: locationCaptured ? { latitude, longitude } : null,
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border border-border/50">
      <LocationStatus 
        locationStatus={locationStatus}
        locationCaptured={locationCaptured}
      />

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          {/* Hidden fields for coordinates */}
          <input type="hidden" id="latitude-field" name="latitude" value={latitude || ''} />
          <input type="hidden" id="longitude-field" name="longitude" value={longitude || ''} />

          <Button type="submit" className="w-full" disabled={!locationCaptured}>
            {locationCaptured ? 'Submit Form' : 'Waiting for Location...'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LocationForm;

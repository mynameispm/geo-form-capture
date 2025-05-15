
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import GoogleMapComponent from "@/components/GoogleMapComponent";

const Index = () => {
  // State variables
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState('Waiting for location permission...');
  const [showResults, setShowResults] = useState(false);
  const [locationCaptured, setLocationCaptured] = useState(false);

  // Request location on page load
  useEffect(() => {
    getLocation();
  }, []);

  // Function to request user location
  const getLocation = () => {
    setLocationStatus('Requesting location access...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationCaptured(true);
          setLocationStatus('Location captured successfully ✓');
          toast.success("Location captured successfully");
        },
        // Error callback
        (error) => {
          let errorMessage = "Location error: ";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Permission denied by user";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information unavailable";
              break;
            case error.TIMEOUT:
              errorMessage += "Request timed out";
              break;
            default:
              errorMessage += "Unknown error occurred";
          }

          setLocationStatus(errorMessage);
          toast.error(errorMessage);
        },
        // Options
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } else {
      const errorMessage = "Error: Geolocation is not supported by this browser";
      setLocationStatus(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle form submission
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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Milaan Location-Based Form</h1>
          <p className="text-muted-foreground">Submit your information with precise location data</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border/50">
            {/* Status indicator */}
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

            {/* Form */}
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

            {/* Results display */}
            {showResults && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
                <h2 className="text-xl font-semibold mb-2 text-green-800">Form Submission Summary</h2>
                <p className="mb-1"><span className="font-medium">Name:</span> {name}</p>
                <p><span className="font-medium">Location:</span> {locationCaptured ? 
                  `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}` : 
                  "Location not available"}
                </p>
              </div>
            )}
          </div>

          {/* Map Component */}
          <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border/50 min-h-[400px]">
            <GoogleMapComponent 
              latitude={latitude} 
              longitude={longitude} 
              locationCaptured={locationCaptured}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

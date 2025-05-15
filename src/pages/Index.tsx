
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import GeotaggedImageUpload from "@/components/GeotaggedImageUpload";
import LocationForm from "@/components/LocationForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import LocationInfoSection from "@/components/LocationInfoSection";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Milaan Location-Based Form</h1>
          <p className="text-muted-foreground">Submit your information with precise location data</p>
          <div className="mt-4">
            <Link to="/problems">
              <Button variant="outline" className="gap-2">
                <List className="h-4 w-4" />
                Browse Community Problems
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Form Component */}
          <LocationForm 
            name={name}
            setName={setName}
            latitude={latitude}
            longitude={longitude}
            locationStatus={locationStatus}
            locationCaptured={locationCaptured}
            setShowResults={setShowResults}
          />
          
          {/* Map Component */}
          <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border/50 min-h-[400px]">
            <GoogleMapComponent 
              latitude={latitude} 
              longitude={longitude} 
              locationCaptured={locationCaptured}
            />
          </div>
        </div>
        
        {/* Results Display */}
        <ResultsDisplay 
          show={showResults}
          name={name}
          locationCaptured={locationCaptured}
          latitude={latitude}
          longitude={longitude}
        />
        
        {/* Image upload with geolocation */}
        <div className="mt-8">
          <GeotaggedImageUpload 
            latitude={latitude}
            longitude={longitude}
            locationCaptured={locationCaptured}
          />
        </div>
        
        {/* Information section */}
        <LocationInfoSection />
      </div>
    </div>
  );
};

export default Index;

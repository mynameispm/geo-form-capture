
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { MapPin, Check, Image as ImageIcon } from "lucide-react";
import GoogleMapComponent from "./GoogleMapComponent";

const CompressedLocationForm = () => {
  // State variables
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState('Waiting for location...');
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Request location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Function to request user location
  const getLocation = () => {
    setLocationStatus('Requesting location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationCaptured(true);
          setLocationStatus('Location captured ✓');
          toast.success("Location captured");
        },
        (error) => {
          let errorMessage = "Location error: ";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Permission denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location unavailable";
              break;
            case error.TIMEOUT:
              errorMessage += "Request timed out";
              break;
            default:
              errorMessage += "Unknown error";
          }
          setLocationStatus(errorMessage);
          toast.error(errorMessage);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } else {
      const errorMessage = "Geolocation not supported";
      setLocationStatus(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error("Please upload only JPEG or PNG images");
      return;
    }

    if (!locationCaptured) {
      toast.error("Please wait for location to be captured first");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setFileName(file.name);
    toast.success("Image uploaded with geolocation data");
  };

  // Remove uploaded image
  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setFileName("");
    }
  };

  // Submit form data
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Create data object for submission
    const formData = {
      name,
      location: locationCaptured ? { latitude, longitude } : null,
      image: selectedImage ? { url: selectedImage, name: fileName } : null,
    };

    console.log("Form submitted:", formData);
    toast.success("Form submitted successfully");
    
    // Expose form data to parent window if embedded
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: "MILAAN_FORM_SUBMISSION",
        data: formData
      }, "*");
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-blue-50 p-4 rounded-lg shadow-md max-w-md mx-auto font-sans">
      <div className="text-center mb-3">
        <h2 className="text-lg font-medium text-sky-700">Location Form</h2>
      </div>
      
      {/* Location status indicator */}
      <div className={`mb-3 p-2 rounded-md flex items-center justify-center gap-2 text-sm ${
        locationCaptured ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
      }`}>
        {locationCaptured ? <Check className="h-4 w-4" /> : <MapPin className="h-4 w-4 animate-pulse" />}
        <p>{locationStatus}</p>
      </div>

      {/* Compact form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm">Your Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-sm h-8"
          />
        </div>

        {/* Coordinates display */}
        {locationCaptured && latitude && longitude && (
          <div className="bg-blue-50 p-2 rounded-md text-xs text-blue-700">
            <p>Latitude: {latitude.toFixed(6)}</p>
            <p>Longitude: {longitude.toFixed(6)}</p>
          </div>
        )}

        {/* Compact map */}
        <div className="h-36 rounded-md overflow-hidden border border-gray-200">
          <GoogleMapComponent
            latitude={latitude}
            longitude={longitude}
            locationCaptured={locationCaptured}
          />
        </div>

        {/* Image upload section */}
        <div className="border border-dashed border-gray-300 rounded-md p-2">
          {!selectedImage ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs text-gray-500 mb-2">Upload an image (JPEG/PNG)</p>
              <input
                type="file"
                id="image-upload-compressed"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
                disabled={!locationCaptured}
              />
              <label
                htmlFor="image-upload-compressed"
                className={`px-3 py-1 text-xs rounded-md ${
                  locationCaptured
                  ? "bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Select Image
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Uploaded" 
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                  aria-label="Remove image"
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-600 truncate">
                <ImageIcon size={12} className="inline mr-1" />
                {fileName}
              </div>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full h-8 text-sm" disabled={!locationCaptured}>
          {locationCaptured ? 'Submit Form' : 'Waiting for Location...'}
        </Button>
      </form>
    </div>
  );
};

export default CompressedLocationForm;

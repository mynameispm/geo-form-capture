
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface GeotaggedImageUploadProps {
  latitude: number | null;
  longitude: number | null;
  locationCaptured: boolean;
}

const GeotaggedImageUpload = ({ latitude, longitude, locationCaptured }: GeotaggedImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check if file is a valid type (JPEG or PNG)
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error("Please upload only JPEG or PNG images");
      return;
    }

    // Check if location is captured
    if (!locationCaptured) {
      toast.error("Please wait for location to be captured before uploading an image");
      return;
    }

    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setFileName(file.name);

    toast.success("Image uploaded successfully with geolocation data");
  };

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setFileName("");
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border/50">
      <div className="bg-primary/10 p-3 flex items-center justify-center">
        <h2 className="text-lg font-medium text-primary">Upload Geotagged Photo</h2>
      </div>

      <div className="p-4">
        {!selectedImage ? (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-center mb-4">Upload a JPEG or PNG image to add geolocation data</p>
            
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={!locationCaptured}
              />
              <button 
                type="button"
                className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 ${
                  locationCaptured 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                disabled={!locationCaptured}
              >
                <Upload size={16} />
                Select Image
              </button>
            </div>
            
            {!locationCaptured && (
              <div className="flex items-center gap-2 mt-4 text-amber-600 text-sm">
                <AlertCircle size={16} />
                <p>Waiting for location data...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Uploaded" 
                className="w-full h-full object-contain"
              />
              
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                aria-label="Remove image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <ImageIcon size={14} />
                <span>Image with geolocation data</span>
              </div>
              <p className="text-xs mt-1">
                Location: {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeotaggedImageUpload;

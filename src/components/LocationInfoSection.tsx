
import React from 'react';

const LocationInfoSection: React.FC = () => {
  return (
    <div className="mt-12 bg-card rounded-xl shadow-lg overflow-hidden border border-border/50">
      <div className="bg-primary/10 p-4">
        <h2 className="text-xl font-semibold text-primary">About Location-Based Services</h2>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground">
          Location-based services (LBS) are software services that use geographic data to provide information
          or functionality to users. LBS applications use real-time geodata from a mobile device or smartphone
          to provide information, entertainment, or security.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <h3 className="text-lg font-medium mb-2">Privacy Considerations</h3>
            <p className="text-sm text-muted-foreground">
              Your location data is handled securely and only used for the purpose you've explicitly approved. 
              We do not store or share your location data without your consent.
            </p>
          </div>
          
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-sm text-muted-foreground">
              This application uses your device's GPS sensor or network-based location methods to determine your 
              current geographic coordinates (latitude and longitude).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoSection;

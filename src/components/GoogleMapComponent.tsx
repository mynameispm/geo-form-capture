
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapComponentProps {
  latitude: number | null;
  longitude: number | null;
  locationCaptured: boolean;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapComponent = ({ latitude, longitude, locationCaptured }: GoogleMapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBHOoIw3TvC9ZAApfaclywOeXNRCWxeI3A&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        // Script loaded but do nothing here - map will be initialized in the next useEffect
      };
      
      document.head.appendChild(script);
    }
  }, []);

  // Initialize or update map when coordinates change
  useEffect(() => {
    if (!mapRef.current || !window.google || !locationCaptured || latitude === null || longitude === null) return;

    const position = { lat: latitude, lng: longitude };
    
    // Initialize map if not already created
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: position,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }, { lightness: 17 }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }, { lightness: 18 }]
          }
        ]
      });
    } else {
      // Update map center if already initialized
      mapInstance.current.setCenter(position);
    }

    // Add or update marker
    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        title: 'Your Location',
        animation: window.google.maps.Animation.DROP
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px; text-align: center;">
          <h3 style="margin: 0; margin-bottom: 4px;">Your Current Location</h3>
          <p style="margin: 0;">${latitude.toFixed(6)}, ${longitude.toFixed(6)}</p>
        </div>`
      });

      markerRef.current.addListener('click', () => {
        infoWindow.open(mapInstance.current, markerRef.current);
      });
    }
    
  }, [latitude, longitude, locationCaptured]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary/10 p-3 flex items-center justify-center">
        <h2 className="text-lg font-medium text-primary">Your Location</h2>
      </div>
      {locationCaptured && latitude && longitude ? (
        <div ref={mapRef} className="flex-1 min-h-[350px]" />
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 bg-muted/30">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted mx-auto mb-3 animate-bounce" />
            <p className="text-muted-foreground">Waiting for location data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;

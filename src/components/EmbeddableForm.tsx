
import React from 'react';
import { createRoot } from 'react-dom/client';
import CompressedLocationForm from './CompressedLocationForm';
import { Toaster } from "@/components/ui/sonner";

// Create a self-contained component for embedding
const EmbeddableForm = () => {
  return (
    <div className="milaan-location-form-container">
      <Toaster position="bottom-center" />
      <CompressedLocationForm />
    </div>
  );
};

// Function to mount the component into a target element
export const mountForm = (targetElement: HTMLElement) => {
  try {
    const root = createRoot(targetElement);
    root.render(<EmbeddableForm />);
    return true;
  } catch (error) {
    console.error("Failed to mount Milaan Location Form:", error);
    return false;
  }
};

// Automatically mount to element with ID="milaan-form-container" if it exists
const autoMount = () => {
  const container = document.getElementById('milaan-form-container');
  if (container) {
    mountForm(container);
  }
};

// Run auto-mount on DOMContentLoaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
  
  // Expose the mountForm function globally
  (window as any).mountMilaanLocationForm = mountForm;
}

export default EmbeddableForm;

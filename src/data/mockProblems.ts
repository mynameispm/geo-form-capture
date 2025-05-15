
import { Problem } from "@/types/problem";

export const mockProblems: Problem[] = [
  {
    id: "p1",
    title: "Water Supply Disruption",
    description: "The main water pipeline has been damaged, causing no water supply to the eastern sector of the village since yesterday morning.",
    location: {
      latitude: 22.5726,
      longitude: 88.3639,
      area: "Eastern Kolkata",
      address: "23 Park Street, Eastern Sector"
    },
    reportedBy: "Amrita Singh",
    reportedDate: "2025-05-10T09:30:00",
    status: "Acknowledged",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "p2",
    title: "Road Damage After Monsoon",
    description: "Large potholes have formed on the main road after heavy rainfall, making it difficult for vehicles to pass safely.",
    location: {
      latitude: 22.5958,
      longitude: 88.3499,
      area: "North Kolkata",
      address: "45 Lake Road, North Sector"
    },
    reportedBy: "Rajesh Kumar",
    reportedDate: "2025-05-12T14:15:00",
    status: "In Progress",
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "p3",
    title: "Electrical Pole Damage",
    description: "An electrical pole is leaning dangerously after the storm, risking power lines falling onto the street.",
    location: {
      latitude: 22.5626,
      longitude: 88.3439,
      area: "South Kolkata",
      address: "78 Garden Reach, South Sector"
    },
    reportedBy: "Priya Sharma",
    reportedDate: "2025-05-14T11:45:00",
    status: "Reported",
    images: []
  },
  {
    id: "p4",
    title: "Public Light Outage",
    description: "Street lights in the central market area are not working for the past three nights, causing security concerns.",
    location: {
      latitude: 22.5826,
      longitude: 88.3539,
      area: "Central Kolkata",
      address: "12 Market Lane, Central District"
    },
    reportedBy: "Mohammed Khan",
    reportedDate: "2025-05-08T18:20:00",
    status: "Resolved",
    images: [
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "p5",
    title: "Garbage Disposal Issue",
    description: "Waste collection has been irregular, leading to garbage accumulation at the community bin area.",
    location: {
      latitude: 22.5426,
      longitude: 88.3739,
      area: "West Kolkata",
      address: "56 River View, Western Sector"
    },
    reportedBy: "Sunita Roy",
    reportedDate: "2025-05-13T08:10:00",
    status: "In Progress",
    images: [
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

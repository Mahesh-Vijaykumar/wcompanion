export interface User {
  id: string;
  email: string;
  displayName: string | null;
  role: 'user' | 'admin';
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface SafetyReport {
  id: string;
  userId: string;
  type: 'harassment' | 'theft' | 'unsafe_area' | 'other';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: Date;
  status: 'pending' | 'verified' | 'rejected';
  upvotes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}
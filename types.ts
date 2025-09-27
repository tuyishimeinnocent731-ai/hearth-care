// FIX: Import React types to resolve 'Cannot find namespace React' error.
import type { FC, SVGProps } from 'react';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  bio: string;
  rating: number;
  reviews: number;
  consultationFee: number;
  available: boolean;
  languages: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor' | 'system';
  timestamp: string;
  attachment?: {
    type: 'image' | 'video' | 'audio' | 'file';
    url: string;
    name?: string;
    size?: string;
  };
  status?: 'sent' | 'delivered' | 'read';
}

export type Page = 
  | 'doctor-selection'
  | 'symptom-form'
  | 'payment'
  | 'chat'
  | 'summary'
  | 'dashboard'
  | 'appointments'
  | 'schedule-appointment'
  | 'messages'
  | 'prescriptions'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'video-consultation'
  | 'ai-chat';

export interface Appointment {
    id: number;
    doctorName: string;
    specialty: string;
    date: string;
    type: 'Video Call' | 'Chat';
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  profilePicture: string;
  height?: number;
  weight?: number;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'N/A';
  allergies: string[];
  chronicConditions: string[];
  pastSurgeries: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  lifestyle: {
    smokingStatus: 'Not Specified' | 'Never' | 'Former' | 'Current';
    alcoholConsumption: 'Not Specified' | 'None' | 'Occasional' | 'Regular';
  };
}

export interface Conversation {
    id: number;
    doctor: Doctor;
    messages: Message[];
    unread: number;
    isTyping?: boolean;
}

export interface Prescription {
    id: number;
    medication: string;
    dosage: string;
    frequency: string;
    doctorName: string;
    dateIssued: string;
    status: 'Active' | 'Inactive';
    refillsLeft: number;
}

export interface HealthMetric {
    id: string;
    name: string;
    value: string;
    unit: string;
    // FIX: Use imported FC and SVGProps types.
    icon: FC<SVGProps<SVGSVGElement>>;
    trend: 'up' | 'down' | 'stable';
    target: string;
}

export interface HealthGoal {
    id: string;
    name: string;
    progress: number;
    target: string;
    // FIX: Use imported FC and SVGProps types.
    icon: FC<SVGProps<SVGSVGElement>>;
    color: string;
}

export interface Notification {
    id: number;
    title: string;
    description: string;
    date: string;
    read: boolean;
    type: 'appointment' | 'message' | 'prescription' | 'general';
}

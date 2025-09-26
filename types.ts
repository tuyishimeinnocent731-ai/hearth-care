
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

export type Page =
    | 'dashboard'
    | 'consultation-start'
    | 'symptom-form'
    | 'payment'
    | 'chat'
    | 'summary'
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
    dateIssued: string;
    doctorName: string;
    refillsLeft: number;
    status: 'Active' | 'Inactive';
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    category: 'appointment' | 'message' | 'system' | 'prescription';
}


export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  consultationFee: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor' | 'system';
  timestamp: string;
  attachment?: {
    type: 'image' | 'video';
    data: string; // base64 data URL
  };
}

export interface UserProfile {
  fullName: string;
  email: string;
  profilePicture: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  location: string;
  height?: number; // cm
  weight?: number; // kg
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

export interface ConsultationSummaryData {
  symptoms: string;
  diagnosis: string;
  prescription: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  advice: string;
}

export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string; // ISO string
  type: 'Video Call' | 'Chat';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface Prescription {
    id: number;
    medication: string;
    dosage: string;
    frequency: string;
    doctorName: string;
    dateIssued: string; // ISO string
    status: 'Active' | 'Inactive';
    refillsLeft: number;
}

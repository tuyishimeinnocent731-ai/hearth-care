// FIX: Define and export interfaces for Doctor and Message
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

export interface ConsultationSummaryData {
  symptoms: string;
  diagnosis: string;
  prescription: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  advice: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  profilePicture: string; // URL
  allergies: string[];
  chronicConditions: string[];
  pastSurgeries: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  lifestyle: {
    smokingStatus: 'Never' | 'Former' | 'Current' | 'Not Specified';
    alcoholConsumption: 'None' | 'Occasional' | 'Regular' | 'Not Specified';
  };
}
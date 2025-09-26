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

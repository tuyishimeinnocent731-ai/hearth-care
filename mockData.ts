
import type { UserProfile, Appointment, Prescription } from './types';

export const MOCK_USER_PROFILE: UserProfile = {
  fullName: 'Kamali Uwacu',
  email: 'kamali.uwacu@example.com',
  profilePicture: 'https://picsum.photos/seed/user1/200/200',
  phone: '0788123456',
  dob: '1990-05-15',
  location: 'Kigali, Rwanda',
  height: 175,
  weight: 70,
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Asthma'],
  pastSurgeries: ['Appendectomy (2015)'],
  emergencyContact: {
    name: 'Gatete Chris',
    phone: '0788654321',
  },
  lifestyle: {
    smokingStatus: 'Never',
    alcoholConsumption: 'Occasional',
  },
};

export const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 1,
        doctorName: 'Dr. Samuel Chen',
        specialty: 'Ubuvuzi Rusange',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Video Call',
        status: 'Upcoming',
    },
    {
        id: 2,
        doctorName: 'Dr. Isabella Monroe',
        specialty: 'Uruhu (Dermatologist)',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Chat',
        status: 'Upcoming',
    },
    {
        id: 3,
        doctorName: 'Dr. Evelyn Reed',
        specialty: 'Umutima (Cardiologist)',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Video Call',
        status: 'Completed',
    }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
    {
        id: 1,
        medication: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Twice a day',
        doctorName: 'Dr. Samuel Chen',
        dateIssued: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active',
        refillsLeft: 2,
    },
    {
        id: 2,
        medication: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'As needed for pain',
        doctorName: 'Dr. Ben Carter',
        dateIssued: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active',
        refillsLeft: 0,
    }
];

export const MOCK_MESSAGES_THREADS = [
    {
      id: 1,
      doctorName: 'Dr. Isabella Monroe',
      lastMessage: 'Yego, urakoze ku gisubizo. Nzagerageza...',
      timestamp: '10:45 AM',
      unread: 1,
      imageUrl: 'https://picsum.photos/seed/doc3/200/200',
    },
    {
      id: 2,
      doctorName: 'Dr. Samuel Chen',
      lastMessage: 'Urakoze cyane muganga. Ndumva meze neza.',
      timestamp: 'Yesterday',
      unread: 0,
      imageUrl: 'https://picsum.photos/seed/doc2/200/200',
    },
];

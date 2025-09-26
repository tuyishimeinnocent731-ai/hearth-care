
import type { Prescription, UserProfile, Appointment, Conversation } from './types';
import { DOCTORS } from './constants';

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 1,
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Inshuro 3 ku munsi',
    dateIssued: '2023-10-15',
    doctorName: 'Dr. Samuel Chen',
    refillsLeft: 1,
    status: 'Active',
  },
  {
    id: 2,
    medication: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'Buri masaha 4-6',
    dateIssued: '2023-09-20',
    doctorName: 'Dr. Ben Carter',
    refillsLeft: 0,
    status: 'Inactive',
  },
  {
    id: 3,
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Inshuro 1 ku munsi',
    dateIssued: '2023-05-01',
    doctorName: 'Dr. Evelyn Reed',
    refillsLeft: 3,
    status: 'Active',
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  fullName: 'Umutoni Aline',
  email: 'aline.umutoni@example.com',
  phone: '+250 788 123 456',
  dob: '1990-05-15',
  location: 'Kigali, Rwanda',
  profilePicture: 'https://picsum.photos/seed/user/200/200',
  height: 165,
  weight: 68,
  bloodType: 'O+',
  allergies: ['Penicillin', 'Dust Mites'],
  chronicConditions: ['Asthma'],
  pastSurgeries: ['Appendectomy (2015)'],
  emergencyContact: {
    name: 'Gatete Jean',
    phone: '+250 788 654 321',
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
        type: 'Chat',
        status: 'Upcoming',
    },
    {
        id: 2,
        doctorName: 'Dr. Evelyn Reed',
        specialty: 'Umutima (Cardiologist)',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Video Call',
        status: 'Upcoming',
    },
    {
        id: 3,
        doctorName: 'Dr. Ben Carter',
        specialty: 'Abana (Pediatrician)',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Chat',
        status: 'Completed',
    }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 1,
        doctor: DOCTORS[0],
        unread: 2,
        messages: [
            { id: '1a', text: "Muraho Dr. Reed, nashakaga kubaza ikibazo kijyanye n'umutima.", sender: 'user', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
            { id: '1b', text: "Muraho neza. Mumbwire, ikibazo cyanyu giteye gite?", sender: 'doctor', timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000).toISOString() },
            { id: '1c', text: "Ndumva umutima utera cyane mu gitondo.", sender: 'user', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
            { id: '1d', text: "Ibyo bimenyetso byatangiye ryari?", sender: 'doctor', timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString() }
        ],
        isTyping: true,
    },
    {
        id: 2,
        doctor: DOCTORS[1],
        unread: 0,
        messages: [
            { id: '2a', text: "Nabonye ibisubizo bya biriya bizamini?", sender: 'user', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: '2b', text: "Yego nabibonye, byose biri mu buryo.", sender: 'doctor', timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString() }
        ]
    },
     {
        id: 3,
        doctor: DOCTORS[3],
        unread: 0,
        messages: [
            { id: '3a', text: "Murakoze ku nama Dr. Carter. Umwana ameze neza ubu.", sender: 'user', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: '3b', text: "Nishimiye kubyumva! Muryoherwe n'umunsi.", sender: 'doctor', timestamp: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000).toISOString() }
        ]
    }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Gahunda Yegereje',
    message: "Gahunda yawe na Dr. Samuel Chen ni ejo saa 10:00 AM.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    category: 'appointment',
  },
  {
    id: 2,
    title: 'Ubutumwa Bushya',
    message: "Dr. Evelyn Reed yakwandikiye ubutumwa.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    category: 'message',
  },
  {
    id: 3,
    title: 'Imiti Yashyizweho',
    message: "Dr. Ben Carter yongeye ku rutonde rw'imiti yawe.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    category: 'prescription',
  },
   {
    id: 4,
    title: 'System Update',
    message: "Twavuguruye porogaramu yacu kugira ngo ikorere neza kurushaho.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    category: 'system',
  },
];

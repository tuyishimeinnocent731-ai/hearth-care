
import type { Appointment, Prescription, UserProfile, Conversation, HealthMetric, HealthGoal, Notification } from './types';
import { DOCTORS } from './constants';
import { HeartPulseIcon, DropletIcon, ActivityIcon, PillIcon, BedIcon, ZapIcon } from './components/IconComponents';

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
    doctorName: 'Dr. Evelyn Reed',
    specialty: 'Umutima (Cardiologist)',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'Chat',
    status: 'Upcoming',
  },
  {
    id: 3,
    doctorName: 'Dr. Ben Carter',
    specialty: 'Abana (Pediatrician)',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'Video Call',
    status: 'Completed',
    summaryNotes: 'Patient presented with a mild fever and cough. Advised rest and hydration. Prescribed child-safe Ibuprofen for fever management. Follow-up advised if symptoms worsen after 3 days.'
  },
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 1,
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Inshuro 3 ku munsi',
    doctorName: 'Dr. Samuel Chen',
    dateIssued: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
    refillsLeft: 2,
  },
  {
    id: 2,
    medication: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'Buri masaha 4-6',
    doctorName: 'Dr. Ben Carter',
    dateIssued: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
    refillsLeft: 0,
  },
    {
    id: 3,
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Inshuro 1 ku munsi',
    doctorName: 'Dr. Evelyn Reed',
    dateIssued: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Inactive',
    refillsLeft: 0,
  }
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
    name: 'Mugabo Jean',
    phone: '+250 788 654 321',
  },
  lifestyle: {
    smokingStatus: 'Never',
    alcoholConsumption: 'Occasional',
  },
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    doctor: DOCTORS[0],
    unread: 2,
    isTyping: false,
    messages: [
      { id: '1', text: "Muraho Dr. Reed, mfite ikibazo cy'umutima.", sender: 'user', timestamp: new Date(Date.now() - 60000 * 20).toISOString() },
      { id: '2', text: "Muraho, mbwira uko wumva umeze.", sender: 'doctor', timestamp: new Date(Date.now() - 60000 * 19).toISOString() },
      { id: '3', text: "Nkumva umutima utera cyane kandi ndaremerewe mu gatuza.", sender: 'user', timestamp: new Date(Date.now() - 60000 * 5).toISOString() },
      { id: '4', text: "Humura, reka dukore ibizamini. Byatangiye ryari?", sender: 'doctor', timestamp: new Date(Date.now() - 60000 * 4).toISOString() },
    ],
  },
  {
    id: 2,
    doctor: DOCTORS[1],
    unread: 0,
    isTyping: true,
    messages: [
      { id: '5', text: "Muraho neza Dr. Chen.", sender: 'user', timestamp: new Date(Date.now() - 60000 * 10).toISOString() },
      { id: '6', text: "Muraho, niteguye kugufasha.", sender: 'doctor', timestamp: new Date(Date.now() - 60000 * 9).toISOString() },
    ],
  },
   {
    id: 3,
    doctor: DOCTORS[3],
    unread: 0,
    messages: [
      { id: '7', text: "Dr. Carter, umwana wanjye afite umuriro.", sender: 'user', timestamp: new Date(Date.now() - 60000 * 60 * 24).toISOString() },
      { id: '8', text: "Mwatanga amakuru arambuye? Afite imyaka ingahe?", sender: 'doctor', timestamp: new Date(Date.now() - 60000 * 60 * 23).toISOString() },
    ],
  }
];

export const MOCK_HEALTH_METRICS: HealthMetric[] = [
    { id: 'heart_rate', name: 'Umuterere w\'Umutima', value: '72', unit: 'bpm', icon: HeartPulseIcon, trend: 'stable', target: '60-100 bpm' },
    { id: 'blood_pressure', name: 'Umuvuduko w\'Amaraso', value: '120/80', unit: 'mmHg', icon: DropletIcon, trend: 'stable', target: '< 130/80 mmHg' },
    { id: 'steps', name: 'Intambwe', value: '4,521', unit: '', icon: ActivityIcon, trend: 'up', target: '10,000' },
    { id: 'medication', name: 'Imiti Yafashwe', value: '100', unit: '%', icon: PillIcon, trend: 'stable', target: '100%' },
];

export const MOCK_HEALTH_GOALS: HealthGoal[] = [
    { id: 'water', name: 'Kunywa Amazi', progress: 75, target: '8 Ibirahuri', icon: DropletIcon, color: 'blue' },
    { id: 'steps', name: 'Kugenda n\'amaguru', progress: 45, target: '10,000 Intambwe', icon: ActivityIcon, color: 'green' },
    { id: 'sleep', name: 'Gusinzira', progress: 88, target: 'Amasaha 8', icon: BedIcon, color: 'indigo' },
    { id: 'exercise', name: 'Imyitozo Ngororamubiri', progress: 60, target: 'Iminota 30', icon: ZapIcon, color: 'yellow' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'Gahunda Yegereje', description: 'Wibuke gahunda yawe na Dr. Samuel Chen saa 3:00 PM.', date: new Date().toISOString(), read: false, type: 'appointment' },
    { id: 2, title: 'Ubutumwa bushya', description: 'Dr. Evelyn Reed yakwandikiye ubutumwa.', date: new Date(Date.now() - 3600000).toISOString(), read: false, type: 'message' },
    { id: 3, title: 'Ongeresha Imiti', description: 'Imiti yawe ya Amoxicillin isigaje iminsi 2.', date: new Date(Date.now() - 3600000 * 5).toISOString(), read: true, type: 'prescription' },
    { id: 4, title: 'Inama y\'ubuzima', description: 'Soma inama nshya ku kurwanya stress.', date: new Date(Date.now() - 3600000 * 24).toISOString(), read: true, type: 'general' },
];

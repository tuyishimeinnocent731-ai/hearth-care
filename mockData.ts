import type { Doctor } from './types';

export const MOCK_APPOINTMENTS = [
  {
    id: 1,
    doctorName: 'Dr. Samuel Chen',
    specialty: 'Ubuvuzi Rusange',
    date: '2024-08-15T15:00:00Z',
    status: 'Upcoming',
    type: 'Video Call'
  },
  {
    id: 2,
    doctorName: 'Dr. Isabella Monroe',
    specialty: 'Uruhu (Dermatologist)',
    date: '2024-07-28T11:30:00Z',
    status: 'Completed',
    type: 'Chat'
  },
   {
    id: 3,
    doctorName: 'Dr. Evelyn Reed',
    specialty: 'Umutima (Cardiologist)',
    date: '2024-07-20T09:00:00Z',
    status: 'Completed',
    type: 'Video Call'
  },
];

export const MOCK_PRESCRIPTIONS = [
  {
    id: 'p1',
    medication: 'Amoxicillin 500mg',
    dosage: '1 tablet',
    frequency: 'Inshuro 3 ku munsi',
    doctorName: 'Dr. Samuel Chen',
    dateIssued: '2024-07-28',
    refillsLeft: 0,
    status: 'Active'
  },
  {
    id: 'p2',
    medication: 'Ibuprofen 200mg',
    dosage: '2 tablets',
    frequency: 'Buri masaha 6, iyo bibaye ngombwa',
    doctorName: 'Dr. Julian Baker',
    dateIssued: '2024-06-15',
    refillsLeft: 2,
    status: 'Active'
  },
  {
    id: 'p3',
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet',
    frequency: 'Inshuro 1 ku munsi',
    doctorName: 'Dr. Evelyn Reed',
    dateIssued: '2024-07-20',
    refillsLeft: 1,
    status: 'Active'
  }
];

export const MOCK_CONVERSATIONS = [
    {
        id: 'conv1',
        doctor: {
            id: 3,
            name: 'Dr. Isabella Monroe',
            specialty: 'Uruhu (Dermatologist)',
            imageUrl: 'https://picsum.photos/seed/doc3/200/200',
        },
        lastMessage: "Yego, ukoreshe iyo miti hanyuma tuzongera kuvugana mu cyumweru kimwe.",
        timestamp: "2024-07-28T12:05:00Z",
        unreadCount: 0,
    },
    {
        id: 'conv2',
        doctor: {
            id: 1,
            name: 'Dr. Evelyn Reed',
            specialty: 'Umutima (Cardiologist)',
            imageUrl: 'https://picsum.photos/seed/doc1/200/200',
        },
        lastMessage: "Ndabona ibisubizo byawe. Reka mbisuzume neza.",
        timestamp: "2024-07-20T09:30:00Z",
        unreadCount: 0,
    },
    {
        id: 'conv3',
        doctor: {
            id: 4,
            name: 'Dr. Julian Baker',
            specialty: 'Abana (Pediatrician)',
            imageUrl: 'https://picsum.photos/seed/doc4/200/200',
        },
        lastMessage: "Muraho, ni gute umwana ameze uyu munsi?",
        timestamp: "2024-08-01T10:00:00Z",
        unreadCount: 2,
    }
]

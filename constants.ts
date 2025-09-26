import type { Doctor } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    specialty: 'Umutima (Cardiologist)',
    rating: 4.9,
    reviews: 182,
    imageUrl: 'https://picsum.photos/seed/doc1/200/200',
    consultationFee: 150000,
  },
  {
    id: 2,
    name: 'Dr. Samuel Chen',
    specialty: 'Ubuvuzi Rusange',
    rating: 4.8,
    reviews: 250,
    imageUrl: 'https://picsum.photos/seed/doc2/200/200',
    consultationFee: 80000,
  },
  {
    id: 3,
    name: 'Dr. Isabella Monroe',
    specialty: 'Uruhu (Dermatologist)',
    rating: 4.9,
    reviews: 215,
    imageUrl: 'https://picsum.photos/seed/doc3/200/200',
    consultationFee: 120000,
  },
  {
    id: 4,
    name: 'Dr. Julian Baker',
    specialty: 'Abana (Pediatrician)',
    rating: 5.0,
    reviews: 310,
    imageUrl: 'https://picsum.photos/seed/doc4/200/200',
    consultationFee: 100000,
  },
];
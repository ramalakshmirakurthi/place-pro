
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const BRANCHES = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics & Communication',
];

export const VIDEO_MODULES = [
  {
    id: '1',
    title: 'Data Structures and Algorithms - Full Course',
    branch: 'Computer Science',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-cs-dsa')?.imageUrl || 'https://picsum.photos/seed/101/600/400',
    videoUrl: 'https://www.youtube.com/embed/RBSGKlAvoiM',
    duration: '1h 45m',
    watched: false,
  },
  {
    id: '2',
    title: 'Thermodynamics Fundamentals',
    branch: 'Mechanical Engineering',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-mech-thermo')?.imageUrl || 'https://picsum.photos/seed/102/600/400',
    videoUrl: 'https://www.youtube.com/embed/9GMBz562v6A',
    duration: '55m',
    watched: true,
  },
  {
    id: '3',
    title: 'Digital Electronics Logic Gates',
    branch: 'Electronics & Communication',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-ece-logic')?.imageUrl || 'https://picsum.photos/seed/103/600/400',
    videoUrl: 'https://www.youtube.com/embed/95kv5BF2Zkg',
    duration: '40m',
    watched: false,
  },
  {
    id: '4',
    title: 'Power Systems Engineering',
    branch: 'Electrical Engineering',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-ee-power')?.imageUrl || 'https://picsum.photos/seed/104/600/400',
    videoUrl: 'https://www.youtube.com/embed/Q_f7mK_WpXk',
    duration: '1h 20m',
    watched: false,
  },
  {
    id: '5',
    title: 'Structural Analysis Intro',
    branch: 'Civil Engineering',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-civil-structural')?.imageUrl || 'https://picsum.photos/seed/105/600/400',
    videoUrl: 'https://www.youtube.com/embed/fD30G_vU81A',
    duration: '45m',
    watched: false,
  },
  {
    id: '6',
    title: 'Operating Systems & Process Management',
    branch: 'Computer Science',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-cs-os')?.imageUrl || 'https://picsum.photos/seed/106/600/400',
    videoUrl: 'https://www.youtube.com/embed/vBURTt97EkA',
    duration: '1h 15m',
    watched: false,
  },
  {
    id: '7',
    title: 'Fluid Mechanics: Bernoulli Principle',
    branch: 'Mechanical Engineering',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-mech-fluid')?.imageUrl || 'https://picsum.photos/seed/107/600/400',
    videoUrl: 'https://www.youtube.com/embed/DW4rVnNwGvw',
    duration: '50m',
    watched: false,
  },
  {
    id: '8',
    title: 'Analog Communication & Modulation',
    branch: 'Electronics & Communication',
    thumbnail: PlaceHolderImages.find(img => img.id === 'video-ece-comm')?.imageUrl || 'https://picsum.photos/seed/108/600/400',
    videoUrl: 'https://www.youtube.com/embed/pSj_O1_W93E',
    duration: '1h 05m',
    watched: false,
  },
];

export const CRT_CATEGORIES = [
  { id: 'quant', name: 'Quantitative Aptitude', icon: 'Calculator' },
  { id: 'logical', name: 'Logical Reasoning', icon: 'BrainCircuit' },
  { id: 'verbal', name: 'Verbal Ability', icon: 'Type' },
  { id: 'mock', name: 'Mock Tests', icon: 'GraduationCap' },
];

export const MOCK_TESTS = {
  quant: [
    {
      id: 'q1',
      question: 'A train 120m long passes a pole in 6 seconds. What is the speed of the train in km/hr?',
      options: ['60 km/hr', '72 km/hr', '80 km/hr', '84 km/hr'],
      answer: '72 km/hr',
    },
    {
      id: 'q2',
      question: 'If 20% of a = b, then b% of 20 is the same as:',
      options: ['4% of a', '5% of a', '20% of a', 'None of these'],
      answer: '4% of a',
    },
    {
      id: 'q3',
      question: 'A sum of money at compound interest amounts to thrice itself in 3 years. In how many years will it be 9 times itself?',
      options: ['6 years', '9 years', '12 years', '15 years'],
      answer: '6 years',
    },
    {
      id: 'q4',
      question: 'If the cost price of 12 items is equal to the selling price of 10 items, what is the profit percentage?',
      options: ['20%', '25%', '16.66%', '15%'],
      answer: '20%',
    },
  ],
  logical: [
    {
      id: 'l1',
      question: 'Which word does NOT belong with the others?',
      options: ['Tyre', 'Steering Wheel', 'Engine', 'Car'],
      answer: 'Car',
    },
    {
      id: 'l2',
      question: 'SCD, TEF, UGH, ____, WKL',
      options: ['CMN', 'UJI', 'VIJ', 'IJT'],
      answer: 'VIJ',
    },
    {
      id: 'l3',
      question: 'Pointed to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
      options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
      answer: 'His son\'s',
    },
    {
      id: 'l4',
      question: 'In a certain code, "COMPUTER" is written as "RFUVQNPC". How is "MEDICINE" written in that code?',
      options: ['EOJDJEFM', 'EOHDKFJM', 'MFEJDJOE', 'DJEFMEOJ'],
      answer: 'EOJDJEFM',
    },
  ],
  verbal: [
    {
      id: 'v1',
      question: 'Antonym of "Ambiguous"',
      options: ['Clear', 'Vague', 'Concealed', 'Shallow'],
      answer: 'Clear',
    },
    {
      id: 'v2',
      question: 'Find the correctly spelt word:',
      options: ['Accomodation', 'Accommodation', 'Acommodation', 'Accomodation'],
      answer: 'Accommodation',
    },
    {
      id: 'v3',
      question: 'He is ________ honest man.',
      options: ['a', 'an', 'the', 'none of these'],
      answer: 'an',
    },
  ],
  mock: [
    {
      id: 'm1',
      question: 'Complete the series: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '46'],
      answer: '42',
    },
    {
      id: 'm2',
      question: 'If "Red" is "Green", "Green" is "Yellow", and "Yellow" is "Blue", what is the color of a leaf?',
      options: ['Green', 'Red', 'Yellow', 'Blue'],
      answer: 'Yellow',
    },
    {
      id: 'm3',
      question: 'Choose the synonym for "Exuberant":',
      options: ['Depressed', 'Enthusiastic', 'Calm', 'Boring'],
      answer: 'Enthusiastic',
    },
  ]
};

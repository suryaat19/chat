export interface Contact {
  id: number;
  name: string;
  phone: string;
  colorClass: string;
}

export const contacts: Contact[] = [
  {
    id: 1,
    name: 'Sameer',
    phone: '+377*****5787',
    colorClass: 'bg-indigo-700',
  },
  {
    id: 2,
    name: 'Shreeja',
    phone: '+1 415***8234',
    colorClass: 'bg-green-500',
  },
  {
    id: 3,
    name: 'Akanksha Gupta',
    phone: '+44 20***1234',
    colorClass: 'bg-red-500',
  },
  {
    id: 4,
    name: 'Aubri Braig',
    phone: '+91 98***6543',
    colorClass: 'bg-orange-500',
  },
  {
    id: 5,
    name: 'Sophia Rossi',
    phone: '+39 06***9876',
    colorClass: 'bg-purple-500',
  },
  {
    id: 6,
    name: 'Kenji Tanaka',
    phone: '+81 3***4567',
    colorClass: 'bg-cyan-500',
  },
  {
    id: 7,
    name: 'Dr. Evelyn Reed',
    phone: '+1 212***1001',
    colorClass: 'bg-pink-500',
  },
];
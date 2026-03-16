export interface WorkoutSession {
  id: string;
  number: number;
  title: string;
  description: string;
  slug: string;
}

export const BOXING_WORKOUT_SESSIONS: WorkoutSession[] = [
  {
    id: 'session-1',
    number: 1,
    title: 'Boxing Fundamentals',
    description: 'Basic punches and movement to build strong foundations.',
    slug: 'session-1',
  },
  {
    id: 'session-2',
    number: 2,
    title: 'Jab Development',
    description: 'Improve speed, accuracy and control of the jab.',
    slug: 'session-2',
  },
  {
    id: 'session-3',
    number: 3,
    title: 'Footwork & Jab Control',
    description: 'Combine movement with jab timing.',
    slug: 'session-3',
  },
  {
    id: 'session-4',
    number: 4,
    title: 'Defence & Countering',
    description: 'Practice slipping, blocking and counter attacks.',
    slug: 'session-4',
  },
  {
    id: 'session-5',
    number: 5,
    title: 'Combination Fundamentals',
    description: 'Build simple combinations with rhythm.',
    slug: 'session-5',
  },
  {
    id: 'session-6',
    number: 6,
    title: 'Punch Volume & Conditioning',
    description: 'High output rounds to improve stamina.',
    slug: 'session-6',
  },
  {
    id: 'session-7',
    number: 7,
    title: 'Body Shot Training',
    description: 'Develop power and accuracy to the body.',
    slug: 'session-7',
  },
  {
    id: 'session-8',
    number: 8,
    title: 'Movement & Angles',
    description: 'Create openings using footwork and angles.',
    slug: 'session-8',
  },
  {
    id: 'session-9',
    number: 9,
    title: 'Combination Flow',
    description: 'Link combinations smoothly during rounds.',
    slug: 'session-9',
  },
  {
    id: 'session-10',
    number: 10,
    title: 'Pressure & Pace',
    description: 'Work at a higher tempo to simulate fight pressure.',
    slug: 'session-10',
  },
  {
    id: 'session-11',
    number: 11,
    title: 'Defence & Reaction',
    description: 'Improve reactions and defensive awareness.',
    slug: 'session-11',
  },
  {
    id: 'session-12',
    number: 12,
    title: 'Complete Boxing Session',
    description: 'Combine all skills into a full training workout.',
    slug: 'session-12',
  },
];

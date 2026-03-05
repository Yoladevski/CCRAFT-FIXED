export interface FoundationLesson {
  id: string;
  discipline: string;
  level: number;
  order: number;
  title: string;
}

export interface FoundationLevel {
  level: number;
  title: string;
  lessons: FoundationLesson[];
}

export const BOXING_FOUNDATIONS_LEVELS: FoundationLevel[] = [
  {
    level: 1,
    title: 'FOUNDATION',
    lessons: [
      { id: 'boxing-l1-1', discipline: 'boxing', level: 1, order: 1, title: 'Basic Stance' },
      { id: 'boxing-l1-2', discipline: 'boxing', level: 1, order: 2, title: 'Step Forward' },
      { id: 'boxing-l1-3', discipline: 'boxing', level: 1, order: 3, title: 'Step Back' },
      { id: 'boxing-l1-4', discipline: 'boxing', level: 1, order: 4, title: 'Jab' },
      { id: 'boxing-l1-5', discipline: 'boxing', level: 1, order: 5, title: 'Cross' },
      { id: 'boxing-l1-6', discipline: 'boxing', level: 1, order: 6, title: 'Jab Cross' },
      { id: 'boxing-l1-7', discipline: 'boxing', level: 1, order: 7, title: 'Close Guard' },
      { id: 'boxing-l1-8', discipline: 'boxing', level: 1, order: 8, title: 'Block' },
    ],
  },
  {
    level: 2,
    title: 'CONTROL',
    lessons: [
      { id: 'boxing-l2-1', discipline: 'boxing', level: 2, order: 1, title: 'Sidestep' },
      { id: 'boxing-l2-2', discipline: 'boxing', level: 2, order: 2, title: 'Pivot Front Foot' },
      { id: 'boxing-l2-3', discipline: 'boxing', level: 2, order: 3, title: 'Pivot Back Foot' },
      { id: 'boxing-l2-4', discipline: 'boxing', level: 2, order: 4, title: 'Double Jab' },
      { id: 'boxing-l2-5', discipline: 'boxing', level: 2, order: 5, title: 'Double Jab Cross' },
      { id: 'boxing-l2-6', discipline: 'boxing', level: 2, order: 6, title: 'Parry' },
      { id: 'boxing-l2-7', discipline: 'boxing', level: 2, order: 7, title: 'Slip' },
      { id: 'boxing-l2-8', discipline: 'boxing', level: 2, order: 8, title: 'Jab Cross Jab' },
    ],
  },
  {
    level: 3,
    title: 'ROTATION',
    lessons: [
      { id: 'boxing-l3-1', discipline: 'boxing', level: 3, order: 1, title: 'Lead Hook' },
      { id: 'boxing-l3-2', discipline: 'boxing', level: 3, order: 2, title: 'Rear Uppercut' },
      { id: 'boxing-l3-3', discipline: 'boxing', level: 3, order: 3, title: 'Rear Hook' },
      { id: 'boxing-l3-4', discipline: 'boxing', level: 3, order: 4, title: 'Double Jab Rear Hook' },
      { id: 'boxing-l3-5', discipline: 'boxing', level: 3, order: 5, title: 'Jab Cross Lead Hook Cross' },
      { id: 'boxing-l3-6', discipline: 'boxing', level: 3, order: 6, title: 'Bobbing and Weaving' },
    ],
  },
  {
    level: 4,
    title: 'FLOW AND REACTION',
    lessons: [
      { id: 'boxing-l4-1', discipline: 'boxing', level: 4, order: 1, title: 'Jab Cross Roll Cross' },
      { id: 'boxing-l4-2', discipline: 'boxing', level: 4, order: 2, title: 'Jab Cross Lead Hook Rear Uppercut' },
      { id: 'boxing-l4-3', discipline: 'boxing', level: 4, order: 3, title: 'Jab Cross Lead Hook Rear Hook' },
      { id: 'boxing-l4-4', discipline: 'boxing', level: 4, order: 4, title: 'Jab Cross Step Back Cross' },
      { id: 'boxing-l4-5', discipline: 'boxing', level: 4, order: 5, title: 'Advanced Combo Chain Drill' },
    ],
  },
  {
    level: 5,
    title: 'ADVANCED CONTROL',
    lessons: [
      { id: 'boxing-l5-1', discipline: 'boxing', level: 5, order: 1, title: 'Slip Pivot' },
      { id: 'boxing-l5-2', discipline: 'boxing', level: 5, order: 2, title: 'Clinch' },
      { id: 'boxing-l5-3', discipline: 'boxing', level: 5, order: 3, title: 'Jab Rear Uppercut Lead Hook Cross' },
      { id: 'boxing-l5-4', discipline: 'boxing', level: 5, order: 4, title: 'Jab Cross Step Back Cross' },
      { id: 'boxing-l5-5', discipline: 'boxing', level: 5, order: 5, title: 'Advanced Combo Chain Drill' },
    ],
  },
];

export function getLessonById(id: string): FoundationLesson | undefined {
  for (const level of BOXING_FOUNDATIONS_LEVELS) {
    const lesson = level.lessons.find(l => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getNextLesson(currentId: string): FoundationLesson | null {
  for (const level of BOXING_FOUNDATIONS_LEVELS) {
    const idx = level.lessons.findIndex(l => l.id === currentId);
    if (idx !== -1) {
      if (idx < level.lessons.length - 1) {
        return level.lessons[idx + 1];
      }
      return null;
    }
  }
  return null;
}

export function isLastLessonInLevel(lessonId: string): boolean {
  for (const level of BOXING_FOUNDATIONS_LEVELS) {
    const idx = level.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      return idx === level.lessons.length - 1;
    }
  }
  return false;
}

export function getLevelForLesson(lessonId: string): number {
  for (const level of BOXING_FOUNDATIONS_LEVELS) {
    if (level.lessons.some(l => l.id === lessonId)) {
      return level.level;
    }
  }
  return 1;
}

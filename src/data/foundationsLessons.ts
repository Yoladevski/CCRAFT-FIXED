export interface FoundationLesson {
  id: string;
  discipline: string;
  level: number;
  order: number;
  title: string;
  techniqueId?: string;
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
      { id: 'boxing-l1-1', discipline: 'boxing', level: 1, order: 1, title: 'Basic Stance', techniqueId: '5ab89cd3-ea17-47b4-ba96-839280ab997c' },
      { id: 'boxing-l1-2', discipline: 'boxing', level: 1, order: 2, title: 'Step Forward', techniqueId: '14aaadb5-34ad-4782-b071-f549851267c3' },
      { id: 'boxing-l1-3', discipline: 'boxing', level: 1, order: 3, title: 'Step Back', techniqueId: '69058d34-ccdf-4a60-9a42-89d1e8556a9d' },
      { id: 'boxing-l1-4', discipline: 'boxing', level: 1, order: 4, title: 'Jab', techniqueId: '81ac4f7b-7030-4911-a708-17b41448c267' },
      { id: 'boxing-l1-5', discipline: 'boxing', level: 1, order: 5, title: 'Cross', techniqueId: '5c3fafb1-bcf3-49d1-b3b0-369a754b72d6' },
      { id: 'boxing-l1-6', discipline: 'boxing', level: 1, order: 6, title: 'Jab Cross', techniqueId: 'f458a792-bccc-47ed-9d5b-f0afa9bf9e87' },
      { id: 'boxing-l1-7', discipline: 'boxing', level: 1, order: 7, title: 'Close Guard', techniqueId: 'd1a8db65-1c2a-4501-adfb-9fc40680d475' },
      { id: 'boxing-l1-8', discipline: 'boxing', level: 1, order: 8, title: 'Block', techniqueId: '09d564c6-2746-419a-8542-edabc56bac60' },
    ],
  },
  {
    level: 2,
    title: 'CONTROL',
    lessons: [
      { id: 'boxing-l2-1', discipline: 'boxing', level: 2, order: 1, title: 'Sidestep', techniqueId: '034fe2b8-16ee-4357-9609-903329bf82e8' },
      { id: 'boxing-l2-2', discipline: 'boxing', level: 2, order: 2, title: 'Pivot Front Foot', techniqueId: '17657fe5-6a53-4852-a8a7-fc56e38f9544' },
      { id: 'boxing-l2-3', discipline: 'boxing', level: 2, order: 3, title: 'Pivot Back Foot', techniqueId: 'd103b6d3-efdd-4e33-8bc6-ce9192d445d5' },
      { id: 'boxing-l2-4', discipline: 'boxing', level: 2, order: 4, title: 'Double Jab' },
      { id: 'boxing-l2-5', discipline: 'boxing', level: 2, order: 5, title: 'Double Jab Cross', techniqueId: 'cc173c23-e32f-4d21-bf85-881cc44d6ff9' },
      { id: 'boxing-l2-6', discipline: 'boxing', level: 2, order: 6, title: 'Parry', techniqueId: '27e05f5b-710e-4869-a4f2-5bd94c5fbcd0' },
      { id: 'boxing-l2-7', discipline: 'boxing', level: 2, order: 7, title: 'Slip', techniqueId: '456730ef-5114-43ba-a3e1-feaa67761719' },
      { id: 'boxing-l2-8', discipline: 'boxing', level: 2, order: 8, title: 'Jab Cross Jab', techniqueId: 'a82e643b-30f5-4f6a-9682-016591d8f188' },
    ],
  },
  {
    level: 3,
    title: 'ROTATION',
    lessons: [
      { id: 'boxing-l3-1', discipline: 'boxing', level: 3, order: 1, title: 'Lead Hook', techniqueId: '33d96054-f2f3-4ef1-8231-654cb92c9ba2' },
      { id: 'boxing-l3-2', discipline: 'boxing', level: 3, order: 2, title: 'Rear Uppercut', techniqueId: '5c04997d-c9d0-4a79-948a-9dc54dad267c' },
      { id: 'boxing-l3-3', discipline: 'boxing', level: 3, order: 3, title: 'Rear Hook', techniqueId: 'f790683e-f043-4b61-ab66-9eeba7da6a4d' },
      { id: 'boxing-l3-4', discipline: 'boxing', level: 3, order: 4, title: 'Double Jab Rear Hook', techniqueId: '5565936e-7235-4271-b824-9e577bdb6ee6' },
      { id: 'boxing-l3-5', discipline: 'boxing', level: 3, order: 5, title: 'Jab Cross Lead Hook Cross', techniqueId: '2fc4390a-3ffc-411b-af68-cc4ae8d36bf5' },
      { id: 'boxing-l3-6', discipline: 'boxing', level: 3, order: 6, title: 'Bobbing and Weaving', techniqueId: '211cbc7b-9abb-4e78-a1fe-47c9f05b9f03' },
    ],
  },
  {
    level: 4,
    title: 'FLOW AND REACTION',
    lessons: [
      { id: 'boxing-l4-1', discipline: 'boxing', level: 4, order: 1, title: 'Jab Cross Roll Cross', techniqueId: '7eba6c5b-4782-4f69-8e90-dd0b1dc25ba3' },
      { id: 'boxing-l4-2', discipline: 'boxing', level: 4, order: 2, title: 'Jab Cross Lead Hook Rear Uppercut', techniqueId: 'd15073a2-2ada-48dc-86f7-1d8f1a794f69' },
      { id: 'boxing-l4-3', discipline: 'boxing', level: 4, order: 3, title: 'Jab Cross Lead Hook Rear Hook', techniqueId: '427c22ba-7d3f-4742-addf-474a722406c7' },
      { id: 'boxing-l4-4', discipline: 'boxing', level: 4, order: 4, title: 'Jab Cross Step Back Cross', techniqueId: '700fd0a5-861a-47cc-9ada-923900487b5e' },
      { id: 'boxing-l4-5', discipline: 'boxing', level: 4, order: 5, title: 'Advanced Combo Chain Drill' },
    ],
  },
  {
    level: 5,
    title: 'ADVANCED CONTROL',
    lessons: [
      { id: 'boxing-l5-1', discipline: 'boxing', level: 5, order: 1, title: 'Slip Pivot', techniqueId: 'ed057f56-e78f-4898-9e5c-c8ed4c62e9f4' },
      { id: 'boxing-l5-2', discipline: 'boxing', level: 5, order: 2, title: 'Clinch', techniqueId: '310843db-de66-423d-8476-d3e8fa9b76ef' },
      { id: 'boxing-l5-3', discipline: 'boxing', level: 5, order: 3, title: 'Jab Rear Uppercut Lead Hook Cross', techniqueId: '452a6b62-d6d9-4e46-addf-c94ab6ccb56d' },
      { id: 'boxing-l5-4', discipline: 'boxing', level: 5, order: 4, title: 'Jab Cross Step Back Cross', techniqueId: '700fd0a5-861a-47cc-9ada-923900487b5e' },
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

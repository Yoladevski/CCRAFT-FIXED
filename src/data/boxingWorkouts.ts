export interface WorkoutRound {
  number: number;
  title: string;
  body: string;
}

export interface WorkoutSession {
  id: string;
  number: number;
  title: string;
  description: string;
  slug: string;
  totalRounds?: number;
  roundLength?: string;
  rest?: string;
  focus?: string;
  suitableFor?: string;
  coachsBrief?: string;
  rounds?: WorkoutRound[];
  closingNote?: string;
}

export const BOXING_WORKOUT_SESSIONS: WorkoutSession[] = [
  {
    id: 'session-1',
    number: 1,
    title: 'Boxing Fundamentals',
    description: 'Basic punches and movement to build strong foundations.',
    slug: 'session-1',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Movement, balance and clean straight punches',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "This opening session focuses on the core fundamentals of boxing. The aim is to develop good movement, balance and clean straight punches while building rhythm through structured rounds. Work at a controlled pace and prioritise technique throughout the session.",
    rounds: [
      {
        number: 1,
        title: 'Shadow Boxing Warm Up',
        body: "Begin with light shadow boxing focusing purely on stance and movement. Move forwards, backwards and side to side while keeping your guard high and your feet underneath you. Stay relaxed and focus on balance, breathing and smooth movement.",
      },
      {
        number: 2,
        title: 'Shadow Boxing Fundamentals',
        body: "Continue shadow boxing but now begin adding basic punches. Throw single jabs and occasional jab-cross combinations while maintaining your stance and movement. Focus on clean technique and bringing your hands straight back to guard after every punch.",
      },
      {
        number: 3,
        title: 'Jab Accuracy',
        body: "Work your jab consistently throughout the round. If using a heavy bag or pads, aim for accuracy and speed rather than power. If shadow boxing, focus on snapping the jab out quickly and returning it to guard immediately.",
      },
      {
        number: 4,
        title: 'Jab and Cross',
        body: "Introduce the basic one-two combination. Throw a jab followed by a straight cross while rotating your hips and shoulders. Reset your stance after every combination and maintain good balance between punches.",
      },
      {
        number: 5,
        title: 'Footwork and Punching',
        body: "Combine movement with your punches. Step forward with the jab, move back after the combination and practise controlling distance. Focus on staying balanced while punching and moving.",
      },
      {
        number: 6,
        title: 'Combination Flow',
        body: "Work simple flowing combinations such as jab-cross, double jab-cross and jab-cross-jab. Focus on rhythm and fluid movement rather than speed or power.",
      },
      {
        number: 7,
        title: 'Free Flow Round',
        body: "Finish the session by flowing freely between movement, jabs and combinations. Use everything practised during the session and keep your punches relaxed and controlled.",
      },
    ],
    closingNote:
      "Great work. You've completed the first CombatCraft workout session and started building your boxing foundations. Continue to the next session to develop your jab and improve your control of distance.",
  },
  {
    id: 'session-2',
    number: 2,
    title: 'Jab Development',
    description: 'Improve speed, accuracy and control of the jab.',
    slug: 'session-2',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Jab speed, distance control and rhythm',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "This session is designed to sharpen the jab and develop control over distance. Focus on speed, accuracy and snapping the hand back quickly after every punch. The jab should feel light, fast and repeatable rather than heavy and forced. Work at a steady pace and maintain good stance and balance throughout each round.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Rhythm)',
        body: "Begin with relaxed shadowboxing to warm the body and establish rhythm. Move around lightly on your feet while maintaining your boxing stance and guard position. Throw occasional light jabs while focusing on staying balanced and relaxed. The goal of this round is to prepare the body for training and reinforce good movement.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Jab Repetition)',
        body: "Continue shadowboxing while increasing the number of jabs you throw. Focus on clean, straight punches that travel directly from guard to target. Snap the hand back quickly to your face after each jab. Move around the space between punches and visualise an opponent in front of you. Keep the shoulders relaxed and breathing steady.",
      },
      {
        number: 3,
        title: 'Single Jab Control',
        body: "This round focuses on precise single jabs. Throw one jab at a time with strong technique and full extension before resetting your stance. Concentrate on accuracy and timing rather than power. If working on a heavy bag or pads, aim for clean, sharp contact. If shadowboxing, imagine touching your opponent from just outside their range.",
      },
      {
        number: 4,
        title: 'Double Jab Round',
        body: "Work the double jab throughout this round. Use the first jab to measure distance and the second jab to reinforce control. Maintain balance and keep your rear hand tight to your chin for defence. Focus on rhythm and quick hand recovery rather than forcing the punches.",
      },
      {
        number: 5,
        title: 'Jab With Movement',
        body: "Now combine the jab with forward movement. Step forward lightly as you throw the jab, then reset your stance before repeating. Occasionally add lateral movement to simulate controlling distance against an opponent. Focus on keeping your feet under you and maintaining good posture while punching.",
      },
      {
        number: 6,
        title: 'Jab Cross Combination',
        body: "Introduce the jab–cross combination again, but continue emphasising the jab as the setup punch. Fire the jab first, then rotate the hips and shoulders to deliver a clean cross. Focus on smooth technique and returning both hands quickly to guard. Avoid overcommitting to power and prioritise control.",
      },
      {
        number: 7,
        title: 'Jab Flow Round',
        body: "In the final round combine everything you have practised in this session. Move around freely while throwing single jabs, double jabs and occasional jab–cross combinations. Focus on fluid movement, good breathing and maintaining strong guard position. Imagine controlling the distance against an opponent using your jab.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 2. Continue developing your jab as it is the foundation for most boxing attacks and combinations. A fast, accurate jab allows you to control distance and set up stronger punches.",
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

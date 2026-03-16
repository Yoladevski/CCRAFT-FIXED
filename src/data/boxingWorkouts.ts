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
    focus: 'Stance, balance, movement and basic jab mechanics',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "This session introduces the core principles of boxing training. Focus on maintaining a strong stance, controlled movement and clean punching technique. Do not rush the rounds. The aim is to build good habits and establish rhythm before increasing intensity in later sessions.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Stance & Movement)',
        body: "Begin with relaxed shadowboxing while focusing on your boxing stance. Keep your feet shoulder-width apart with the lead foot slightly forward and knees lightly bent. Move around the space slowly while maintaining balance and keeping your guard high. Throw light punches occasionally but concentrate mainly on footwork and posture. The goal of this round is to warm up the body and establish good positioning.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Jab Introduction)',
        body: "Continue shadowboxing while introducing the jab. Throw light jabs toward an imaginary opponent while maintaining balance and keeping the rear hand protecting your chin. Focus on snapping the jab straight out and returning it quickly to guard. Move around between punches and stay relaxed. This round helps reinforce the basic mechanics of the jab while keeping the body warm.",
      },
      {
        number: 3,
        title: 'Jab Technique Round',
        body: "This round focuses entirely on clean jab technique. Work single jabs repeatedly while concentrating on accuracy and speed. Ensure the punch travels in a straight line and the lead shoulder rises slightly to protect the chin. If using a heavy bag or pads, aim for controlled, precise strikes rather than power. Return the hand quickly to guard after every jab.",
      },
      {
        number: 4,
        title: 'Double Jab Round',
        body: "Build on the previous round by throwing double jabs. Extend the first jab to measure distance, then quickly fire the second jab before resetting your stance. Focus on maintaining balance and keeping your guard tight. If shadowboxing, imagine pushing your opponent back with repeated jabs. If using a bag or pads, maintain rhythm and control.",
      },
      {
        number: 5,
        title: 'Jab With Movement',
        body: "Now begin combining the jab with footwork. Step forward as you throw the jab, then reset your stance before repeating. Mix forward steps with small lateral movements to simulate controlling distance against an opponent. The emphasis is on maintaining balance and keeping your feet underneath you while punching.",
      },
      {
        number: 6,
        title: 'Basic Combination Round',
        body: "Introduce a simple two-punch combination: jab followed by cross. Throw the jab first to set up the cross, then rotate your hips and shoulders to deliver the rear hand with controlled power. Focus on returning both hands quickly to guard after the combination. Maintain good posture and avoid overreaching with your punches.",
      },
      {
        number: 7,
        title: 'Controlled Flow Round',
        body: "In the final round, combine everything you have practised in this session. Move around freely while throwing jabs, double jabs and occasional jab–cross combinations. Focus on smooth movement, steady breathing and maintaining a strong guard position. The aim is to finish the session with fluid technique and controlled rhythm rather than maximum power.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 1. Continue focusing on strong fundamentals as these skills form the foundation for all future techniques. Consistent practice of stance, movement and the jab will improve every aspect of your boxing.",
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

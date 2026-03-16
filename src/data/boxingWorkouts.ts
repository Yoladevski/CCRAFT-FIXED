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
    title: 'Jab & Cross Fundamentals',
    description: 'Jab–cross coordination, rhythm and body rotation.',
    slug: 'session-3',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Jab–cross coordination, rhythm and body rotation',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "This session introduces the most fundamental combination in boxing: the jab followed by the cross. Focus on using the jab to set up the cross while maintaining strong stance and balance. The cross should rotate through the hips and shoulders rather than relying only on the arm. Prioritise clean technique and controlled movement over power.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Light Punching)',
        body: "Begin with relaxed shadowboxing while focusing on stance, guard and movement. Throw light punches such as the jab and occasional cross while moving around your training space. Keep the shoulders relaxed and concentrate on maintaining good balance. The goal of this round is to warm up the body and establish rhythm.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Jab–Cross Introduction)',
        body: "Continue shadowboxing while introducing the jab–cross combination. Throw the jab first, then follow immediately with the cross while rotating the hips and shoulders. Return both hands quickly to guard after the combination. Move around between combinations and stay relaxed.",
      },
      {
        number: 3,
        title: 'Jab–Cross Technique Round',
        body: "This round focuses on clean jab–cross mechanics. Throw the combination repeatedly while concentrating on proper rotation when delivering the cross. Ensure the jab travels straight to the target and the cross follows immediately behind it. Maintain balance after every combination and reset your stance before throwing again.",
      },
      {
        number: 4,
        title: 'Jab–Cross Rhythm Round',
        body: "Work the jab–cross combination at a steady rhythm throughout this round. Focus on smooth transitions between punches rather than forcing power. Keep your guard tight and your chin protected by the lead shoulder when throwing the jab. If using a heavy bag or pads, aim for accuracy and controlled impact.",
      },
      {
        number: 5,
        title: 'Jab–Cross With Movement',
        body: "Now combine the jab–cross combination with footwork. Step forward as you throw the jab, then rotate into the cross while maintaining balance. Reset your stance before repeating. Occasionally move laterally or pivot after the combination to simulate striking and moving away from an opponent.",
      },
      {
        number: 6,
        title: 'Double Jab–Cross Combination',
        body: "Introduce a variation by throwing a double jab before the cross. The first jab measures distance, the second jab reinforces control, and the cross delivers the finishing punch. Focus on quick hand recovery and maintaining a strong defensive guard.",
      },
      {
        number: 7,
        title: 'Combination Flow Round',
        body: "In the final round move freely while using the jab, double jab and jab–cross combinations. Visualise a live opponent and focus on controlling distance while maintaining smooth technique. Combine movement, punching and defensive awareness as you finish the session.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 3. The jab–cross combination is one of the most effective attacks in boxing, and mastering this combination will form the foundation for many advanced combinations.",
  },
  {
    id: 'session-4',
    number: 4,
    title: 'Footwork & Movement',
    description: 'Movement, balance and controlling distance.',
    slug: 'session-4',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Movement, balance and controlling distance',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "This session emphasises movement and positioning. Focus on keeping your stance stable while moving in all directions. Your feet should stay underneath you at all times so you remain balanced and ready to strike or defend. Avoid crossing your feet or standing too tall. Smooth, controlled movement is more important than speed.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Stance & Movement)',
        body: "Begin with relaxed shadowboxing while focusing on your stance and basic movement. Move lightly around your training space while maintaining your guard position. Step forward, step back and move laterally while staying balanced. Throw occasional light jabs to keep your rhythm flowing. The goal is to warm up the body and reinforce good movement habits.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Movement With Light Punching)',
        body: "Continue shadowboxing while combining movement with simple punches. Step forward with a jab, move back into stance and reset before repeating. Focus on staying balanced while moving and punching. Keep your guard tight and shoulders relaxed as you move around your imaginary opponent.",
      },
      {
        number: 3,
        title: 'Forward & Backward Movement',
        body: "This round focuses on stepping forward and backward while maintaining your boxing stance. Step forward with the lead foot first, then bring the rear foot with it to maintain balance. When stepping back, move the rear foot first before bringing the lead foot back into position. Occasionally throw a jab as you move forward to simulate closing distance on an opponent.",
      },
      {
        number: 4,
        title: 'Lateral Movement',
        body: "Work on side-to-side movement during this round. Step to the left or right while maintaining your stance and keeping your feet underneath you. Avoid crossing your feet and focus on smooth, controlled movement. Add occasional jabs while moving to practise punching without losing balance.",
      },
      {
        number: 5,
        title: 'Pivot Round',
        body: "This round introduces pivoting. Throw a jab or jab–cross combination, then pivot on the lead foot to change your angle before resetting your stance. Pivoting helps create new attacking angles and prevents you from standing directly in front of an opponent. Focus on small, controlled pivots rather than large spins.",
      },
      {
        number: 6,
        title: 'Movement With Combinations',
        body: "Now combine movement with simple combinations such as jab–cross or double jab–cross. Move forward, attack, then step away or pivot before attacking again. This round should feel like controlling space against an opponent rather than standing still and punching.",
      },
      {
        number: 7,
        title: 'Movement Flow Round',
        body: "In the final round combine all movement patterns practised in the session. Move forward, backward and laterally while throwing jabs and basic combinations. Use pivots to change angle and keep your guard strong at all times. Focus on staying relaxed and maintaining balance even as fatigue builds.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 4. Good footwork is essential for controlling distance and positioning in boxing. Continue practising smooth movement and balanced positioning as these skills will improve every aspect of your boxing.",
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

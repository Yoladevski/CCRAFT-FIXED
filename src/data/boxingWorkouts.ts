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
    title: 'Body Shot Development',
    description: 'Body shots, level changes and combination control.',
    slug: 'session-7',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Body shots, level changes and combination control',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "Body punches require controlled level changes and strong rotation through the hips. Keep your guard tight and bend your knees slightly when attacking the body rather than leaning forward. Focus on clean technique and returning quickly to guard after each punch.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Light Punching)',
        body: "Begin with relaxed shadowboxing while focusing on stance and movement. Move around lightly while throwing occasional jabs and crosses. Keep your shoulders relaxed and guard tight. The goal of this round is to warm up the body and establish rhythm before introducing body attacks.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Level Changes)',
        body: "Continue shadowboxing while introducing small level changes. Bend the knees slightly as if attacking the body before returning to your normal stance. Combine light jabs with these movements while visualising an opponent in front of you. This prepares the body for controlled body punching.",
      },
      {
        number: 3,
        title: 'Lead Hook to the Body',
        body: "Focus on the lead hook to the body during this round. Rotate your hips and shoulders while bending your knees slightly to lower your level. Aim for controlled body mechanics rather than power. Return quickly to guard after every punch.",
      },
      {
        number: 4,
        title: 'Jab–Body Hook Combination',
        body: "Work the jab followed by a lead hook to the body. Use the jab to establish distance and draw your opponent's attention upward before dropping the hook toward the body. Maintain good balance and avoid leaning too far forward.",
      },
      {
        number: 5,
        title: 'Head–Body Combination Round',
        body: "Introduce combinations that move from the head to the body. Examples include jab–cross–body hook or jab–body hook–cross. Focus on changing levels smoothly while maintaining strong guard position.",
      },
      {
        number: 6,
        title: 'Body Shot With Movement',
        body: "Combine body punches with footwork during this round. Step forward with a jab or jab–cross, then finish with a body hook before stepping away or pivoting. This builds the habit of attacking the body while staying mobile.",
      },
      {
        number: 7,
        title: 'Body Attack Flow Round',
        body: "In the final round move freely while mixing punches to the head and body. Use jabs, crosses and hooks while occasionally dropping a body shot into your combinations. Focus on smooth movement, controlled breathing and maintaining strong defensive posture.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 6. Body punches are an important part of boxing strategy and can break down an opponent over time. Continue practising controlled level changes and balanced technique.",
  },
  {
    id: 'session-8',
    number: 8,
    title: 'Angle & Pivot Training',
    description: 'Pivoting, angles and repositioning after punches.',
    slug: 'session-8',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Pivoting, angles and repositioning after punches',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "Good fighters rarely remain stationary after attacking. Pivoting allows you to change angle while maintaining balance and defensive positioning. Focus on small controlled pivots using the lead foot as the anchor. Stay relaxed and keep your guard tight as you move.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Balance)',
        body: "Begin with relaxed shadowboxing while focusing on stance and movement. Step forward, step back and move laterally while maintaining your guard. Throw occasional jabs to establish rhythm. The goal is to warm up the body and reinforce balanced movement.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Pivot Introduction)',
        body: "Continue shadowboxing while introducing pivoting. Throw a jab or jab–cross combination and then pivot on the lead foot to change your angle. Focus on small, controlled pivots while keeping your balance and guard position strong.",
      },
      {
        number: 3,
        title: 'Jab and Pivot',
        body: "This round focuses on throwing a jab followed immediately by a pivot to create a new angle. After pivoting, reset your stance before repeating. Maintain balance and avoid spinning too quickly. The movement should feel controlled and smooth.",
      },
      {
        number: 4,
        title: 'Jab–Cross and Pivot',
        body: "Work the jab–cross combination followed by a pivot to the outside. The pivot should move you slightly off the centre line as if avoiding a counter attack. Focus on maintaining balance and returning to guard quickly after each combination.",
      },
      {
        number: 5,
        title: 'Combination With Pivot Exit',
        body: "Throw combinations such as jab–cross–hook, then pivot out to create space. This teaches the habit of exiting at an angle after attacking rather than remaining in front of an opponent.",
      },
      {
        number: 6,
        title: 'Angle Creation Round',
        body: "Move around your training space while throwing jabs and combinations before pivoting to create new angles. Focus on keeping your feet underneath you and maintaining a strong defensive posture while repositioning.",
      },
      {
        number: 7,
        title: 'Angle Flow Round',
        body: "In the final round combine movement, punching and pivoting freely. Visualise an opponent and focus on attacking from different angles while maintaining balance and good guard position.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 10. Creating angles through pivots allows you to attack more effectively while staying safer from counters.",
  },
  {
    id: 'session-9',
    number: 9,
    title: 'Combination Flow',
    description: 'Punch combinations, rhythm and fluid movement.',
    slug: 'session-9',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Punch combinations, rhythm and fluid movement',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "Strong boxing combinations are built through rhythm and balance. Focus on letting punches flow naturally from one to the next rather than forcing power. Keep your feet underneath you and return your hands quickly to guard after each combination. Smooth transitions between punches are more important than speed or strength.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Light Punching)',
        body: "Begin with relaxed shadowboxing while focusing on movement and stance. Throw light punches such as jabs and jab–cross combinations while moving around your training space. Keep the shoulders relaxed and concentrate on maintaining balance. The goal is to warm up the body and establish rhythm before working longer combinations.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Short Combinations)',
        body: "Continue shadowboxing while throwing short combinations such as jab–cross or double jab–cross. Focus on smooth transitions between punches and returning to guard after each combination. Move around between combinations while maintaining a strong stance.",
      },
      {
        number: 3,
        title: 'Three Punch Combination',
        body: "This round focuses on a simple three-punch combination such as jab–cross–lead hook. Throw the punches in a controlled rhythm while maintaining balance and proper body rotation. Reset your stance after each combination before repeating.",
      },
      {
        number: 4,
        title: 'Combination Repetition Round',
        body: "Work the same combination repeatedly during this round to build rhythm and muscle memory. Focus on clean technique and smooth transitions between punches. If using a heavy bag or pads, aim for consistent accuracy rather than maximum power.",
      },
      {
        number: 5,
        title: 'Combination With Movement',
        body: "Now combine movement with your combinations. Step forward with the jab, follow with the rest of the combination, then step away or pivot before repeating. This encourages the habit of striking and repositioning rather than standing still.",
      },
      {
        number: 6,
        title: 'Mixed Combinations',
        body: "Introduce variety by mixing different combinations such as jab–cross–hook or double jab–cross–hook. Focus on maintaining balance and rhythm as you change combinations. Keep your guard tight and breathing steady.",
      },
      {
        number: 7,
        title: 'Free Combination Flow',
        body: "In the final round move freely while throwing combinations of three to four punches. Visualise an opponent and focus on flowing from one combination to the next while maintaining strong guard position and good movement.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 9. Developing combination flow will allow you to apply pressure, create openings and build effective offensive sequences.",
  },
  {
    id: 'session-10',
    number: 10,
    title: 'Pressure Fighting',
    description: 'Forward pressure, controlled attacks and distance management.',
    slug: 'session-10',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Forward pressure, controlled attacks and distance management',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "Pressure fighting is not about rushing forward aggressively. Instead, focus on steady forward movement while maintaining balance and a strong guard. Use the jab to control distance and follow with combinations when opportunities appear. Stay composed and keep your feet underneath you while advancing.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Rhythm)',
        body: "Begin with relaxed shadowboxing while focusing on stance, guard and movement. Move lightly around your training space while throwing occasional jabs. Concentrate on smooth footwork and balanced posture as you warm up.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Forward Movement)',
        body: "Continue shadowboxing while gradually moving forward. Step forward in your stance while throwing light jabs and resetting your feet before repeating. Focus on maintaining balance and keeping your guard tight while advancing.",
      },
      {
        number: 3,
        title: 'Jab Pressure Round',
        body: "This round focuses on using the jab to apply forward pressure. Step forward behind the jab while maintaining strong guard position. Reset your stance between attacks and focus on controlled, accurate punches rather than power.",
      },
      {
        number: 4,
        title: 'Jab–Cross Pressure',
        body: "Work the jab–cross combination while moving forward. Step forward behind the jab, rotate into the cross, then reset before repeating. Maintain steady pressure and avoid rushing the punches.",
      },
      {
        number: 5,
        title: 'Combination Pressure',
        body: "Introduce combinations such as jab–cross–hook while continuing to advance forward. Focus on balanced footwork and controlled punching as you apply pressure.",
      },
      {
        number: 6,
        title: 'Pressure With Angles',
        body: "Now combine forward pressure with pivots and small directional changes. Step forward with punches, then pivot slightly to create a new attacking angle before continuing the pressure.",
      },
      {
        number: 7,
        title: 'Pressure Flow Round',
        body: "In the final round move freely while applying controlled forward pressure. Use jabs, combinations and footwork to maintain offensive momentum while staying balanced and defensively aware.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 10. Pressure fighting allows you to control the pace of a fight and force your opponent into defensive reactions.",
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
    title: 'Reaction Training',
    description: 'Reaction speed, defence-to-attack transitions and awareness.',
    slug: 'session-12',
    totalRounds: 7,
    roundLength: '3 minutes',
    rest: '1 minute between rounds',
    focus: 'Reaction speed, defence-to-attack transitions and awareness',
    suitableFor: 'Shadowboxing / Heavy Bag / Pads',
    coachsBrief:
      "Reaction training develops the ability to respond instinctively during exchanges. Focus on visualising an opponent attacking and practise responding with defensive movement followed by a clean counter. Keep your movements small, controlled and balanced while maintaining strong guard position.",
    rounds: [
      {
        number: 1,
        title: 'Shadowboxing Warm Up (Movement & Awareness)',
        body: "Begin with relaxed shadowboxing while focusing on movement and guard position. Move around lightly while throwing occasional jabs and crosses. Stay relaxed and visualise an opponent in front of you. The goal is to warm up the body while preparing your mind for reaction-based training.",
      },
      {
        number: 2,
        title: 'Shadowboxing Warm Up (Defence & Response)',
        body: "Continue shadowboxing while introducing defensive reactions. Visualise incoming punches and practise slipping or rolling before returning a light jab. Focus on smooth transitions between defence and attack while maintaining balance.",
      },
      {
        number: 3,
        title: 'Slip and Counter Jab',
        body: "This round focuses on reacting to an imaginary straight punch. Slip slightly to the outside and immediately return a jab. Reset your stance before repeating the movement. Focus on quick reactions and controlled technique.",
      },
      {
        number: 4,
        title: 'Roll and Hook Counter',
        body: "Practise rolling under an imaginary hook before countering with a lead hook. Bend the knees slightly to roll under the punch and rotate the hips when delivering the hook. Maintain strong guard position and balance throughout the movement.",
      },
      {
        number: 5,
        title: 'Defensive Reaction With Combination',
        body: "React to an imaginary attack by slipping or rolling, then return with a short combination such as jab–cross. Focus on reacting smoothly rather than rushing the punches.",
      },
      {
        number: 6,
        title: 'Unpredictable Reaction Round',
        body: "During this round vary your defensive movements and counters. Slip and jab, roll and hook, or step back and return a jab–cross combination. The aim is to practise reacting to different situations rather than repeating the same movement each time.",
      },
      {
        number: 7,
        title: 'Reaction Flow Round',
        body: "In the final round combine all reaction movements practised during the session. Visualise an opponent attacking while you defend and respond with controlled counters and combinations. Focus on staying relaxed and balanced while reacting quickly.",
      },
    ],
    closingNote:
      "Well done. You have completed CombatCraft Session 12. Reaction training improves awareness and timing, helping you respond effectively to your opponent's actions.",
  },
];

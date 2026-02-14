/*
  # Populate Boxing Defence, Footwork, and Combos

  ## Overview
  Adds techniques for Defence, Footwork, and Combos categories in Boxing.

  ## New Techniques

  ### Defence
  - Slip
  - Roll
  - Parry
  - Block
  - Pull Counter

  ### Footwork
  - Basic Stance
  - Step and Slide
  - Pivot
  - Angle Work

  ### Combos
  - 1-2 (Jab-Cross)
  - 1-2-3 (Jab-Cross-Hook)
  - 1-1-2 (Double Jab-Cross)

  ## Notes
  - Sequential progression maintained
  - XP rewards scale with complexity
*/

-- Insert Defence techniques
INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Slip',
  1,
  'https://www.youtube.com/embed/ZbdIZveV07w',
  60,
  'Slipping is a fundamental defensive technique that allows you to avoid punches by moving your head off the centerline while maintaining your punching position.',
  'From your stance, bend slightly at the knees and waist to move your head to either side of an incoming straight punch. Your weight shifts to the corresponding leg. Keep your hands up and eyes on your opponent. Return to center quickly.',
  'Use to evade jabs and crosses. Most effective against straight punches. Creates immediate countering opportunities. Essential for inside fighting.',
  'Moving too far, dropping hands, not keeping eyes on opponent, not returning to center, being too slow or predictable.',
  'Slip outside the jab and counter with a cross. Slip inside and counter with a hook. Slip-roll combination for multiple punches. Create angles for power punches.',
  'Slip line drill: Practice slipping a rope or stick. Partner drill: Slip slow jabs, gradually increase speed. Shadow boxing: Add slips to all combinations.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Defence';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Roll',
  2,
  'https://www.youtube.com/embed/4vTdaJLMdFk',
  75,
  'The roll is a defensive movement that uses body rotation to evade hooks and power punches while staying in punching range.',
  'Bend at the knees and waist while rotating your upper body in a U-shape motion. Roll under the incoming punch, keeping your chin tucked and hands up. Your head moves in a circular path from one side to the other.',
  'Primary defense against hooks and overhand punches. Excellent for close-range fighting. Creates angles for devastating counters.',
  'Rolling too high, dropping hands completely, not watching opponent, being too slow, rolling the wrong direction.',
  'Roll under hooks and counter with uppercuts. Roll under the overhand and counter with hooks. Continuous rolling (slip-roll-slip) for combination defense.',
  'Slip rope drill with rolling. Heavy bag: Roll around imaginary hooks. Partner drill: Throw slow hooks for partner to roll under.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Defence';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Parry',
  3,
  'https://www.youtube.com/embed/w3fHgRRtjz8',
  60,
  'The parry redirects incoming punches with a quick hand movement, keeping you safe while maintaining offensive capability.',
  'Use an open hand to redirect the incoming punch across your body. The movement is quick and compact. Your opposite hand stays up for protection. Parry with the corresponding hand (lead hand parries lead hand, rear parries rear).',
  'Most effective against jabs and straight punches. Creates immediate countering opportunities. Conserves energy compared to blocking.',
  'Reaching too far, parrying too early or late, dropping the opposite hand, not following with counters, being too forceful.',
  'Parry the jab and counter with cross. Parry and catch to control opponent''s hand. Parry outside and step for angles. Lead to immediate combinations.',
  'Partner drill: Practice parrying slow punches. Focus mitts: Trainer throws light punches to parry. Speed: Gradually increase punch speed.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Defence';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Block',
  4,
  'https://www.youtube.com/embed/bv8Aj4PVkjM',
  50,
  'Blocking is using your gloves and arms to absorb or deflect incoming punches, essential for protecting yourself when evasion isn''t possible.',
  'Bring your gloves together to cover your face for high blocks. Tuck elbows to ribs for body blocks. Keep chin down. Absorb punches with your arms, not your face. Maintain tight defensive structure.',
  'Use when evasion isn''t possible. Essential when pressed against ropes. Primary defense when tired. Foundation for all defensive skills.',
  'Blocking without moving, keeping blocks up too long, poor elbow position for body shots, not countering after blocks, turtling up completely.',
  'Block and counter combinations. High block to protect from hooks. Philly shell variation. Block-slip combinations. Setting traps with your guard.',
  'Heavy bag: Practice blocking then countering. Partner drill: Block light combinations. Shell defense practice against multiple punches.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Defence';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Pull Counter',
  5,
  'https://www.youtube.com/embed/7xVxKyrgHPg',
  100,
  'The pull counter is an advanced defensive technique that creates distance while setting up devastating counter punches.',
  'As opponent throws a punch, pull your upper body back from the waist while keeping your feet in position. Let the punch fall short. Immediately lean back in with a power counter. Your rear hand stays up throughout.',
  'Excellent against aggressive opponents. Creates maximum countering power. Works best against straight punches. High-level defensive skill.',
  'Pulling back too far, poor balance, not countering immediately, pulling with feet instead of waist, dropping hands.',
  'Pull and counter with cross. Pull-roll combination. Set up by baiting opponent''s jab. Use when opponent overcommits. Create huge power on counters.',
  'Partner drill: Pull from light jabs. Shadow boxing: Visualize pull counters. Heavy bag: Pull back then explode with cross.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Defence';

-- Insert Footwork techniques
INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Basic Stance',
  1,
  'https://www.youtube.com/embed/IJ2vJUDxtPg',
  40,
  'Your stance is the foundation of all boxing technique. Proper stance ensures balance, power generation, and defensive capability.',
  'Feet shoulder-width apart, lead foot forward. Weight on balls of feet. Knees slightly bent. Rear heel slightly raised. Hands up protecting face. Chin tucked. Shoulders relaxed. Elbows protecting ribs.',
  'Maintain at all times during training and fighting. Return to after every punch or movement. Foundation for all techniques.',
  'Feet too close or wide, flat-footed, weight on heels, hands too low, standing too tall, tense shoulders, poor chin position.',
  'Your stance determines punching power, defensive ability, and mobility. Slight adjustments create different advantages. Foundation for all movement.',
  'Mirror work: Hold stance for 3-minute rounds. Shadow boxing: Focus on returning to stance. Partner check: Have someone test your balance.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Footwork';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Step and Slide',
  2,
  'https://www.youtube.com/embed/dEHJl5b4W9k',
  60,
  'Step and slide is the fundamental movement pattern in boxing, allowing you to maintain your stance while moving in any direction.',
  'To move forward: Lead foot steps, rear foot slides to maintain stance width. To move back: Rear foot steps back, lead foot slides back. Lateral movement: Step with direction foot, slide the other. Never cross feet. Stay on balls of feet.',
  'Advancing to create offense. Retreating to avoid pressure. Creating angles. Maintaining optimal distance. Moving in and out of range.',
  'Crossing feet, bouncing, moving flat-footed, feet too narrow or wide after movement, moving in predictable patterns.',
  'Advance to enter punching range. Retreat to reset and escape. Circle to create angles. Cut off the ring. Control distance and dictate pace.',
  'Ladder drills for foot speed. Step-slide around heavy bag. Partner drill: Mirror partner''s movement. Box step pattern (square movement).'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Footwork';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Pivot',
  3,
  'https://www.youtube.com/embed/qo9C6vjXF_M',
  80,
  'Pivoting allows you to quickly change angles, escape pressure, and create offensive opportunities by rotating on the ball of your foot.',
  'Plant weight on the ball of your lead or rear foot. Rotate your body by turning that foot. Your other foot swings around. Keep stance width. Stay on balls of feet. Hands stay up. Can pivot off either foot.',
  'Escape from corners or ropes. Create angles for power punches. Avoid pressure fighters. Reset positioning. Defensive and offensive tool.',
  'Pivoting flat-footed, crossing feet during pivot, poor balance, dropping hands, not maintaining stance width, predictable direction.',
  'Pivot out from corners. Pivot to create angles for hooks. Use with slips for maximum effect. Cut angles on aggressive opponents. Create separation.',
  'Pivot drill: Around heavy bag in both directions. Cone drill: Pivot around cones. Partner pressure: Practice pivoting away from pressure.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Footwork';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Angle Work',
  4,
  'https://www.youtube.com/embed/4hfGZfQc6_I',
  100,
  'Advanced footwork that combines steps, slides, and pivots to create attacking angles where your opponent can''t effectively defend or counter.',
  'Combine lateral movement with pivots. Step offline while opponent attacks. Create L or V-shaped angles. Move off centerline before and after combinations. Circular movement to control ring position.',
  'Against pressure fighters. To set up power shots. When opponent is against ropes. Creating entries for combinations. Advanced ring generalship.',
  'Moving in straight lines, being predictable, not coordinating with offense, poor timing, creating angles without punching.',
  'Angle for hooks after opponent jabs. Create angles to attack from blindside. Cut off ring while maintaining angles. Dominate ring positioning.',
  'Cone drill: Create angles around cones. Partner drill: Create angles then attack. Shadow boxing: Emphasize angle creation in combinations.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Footwork';

-- Insert Combo techniques
INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  '1-2 Combination',
  1,
  'https://www.youtube.com/embed/7RhgVjAQOJY',
  75,
  'The 1-2 (jab-cross) is the most fundamental combination in boxing. It sets up all other combinations and teaches proper sequencing, rhythm, and power generation.',
  'Throw a sharp jab to create an opening or gauge distance. Immediately follow with the cross, using hip rotation and rear foot pivot. The jab sets up the power punch. Snap both punches back to guard quickly.',
  'Opening combination for almost every offensive sequence. When opponent drops hands after your jab. To punish opponents who lean forward. Most versatile combination.',
  'Too slow between punches, telegraphing the cross, not resetting guard, poor weight transfer, throwing both at same speed instead of jab being faster.',
  'Double jab then cross. Jab-cross-move offline. Jab to body-cross to head. Use as setup for hooks. Essential for establishing timing.',
  'Heavy bag: 10 rounds of 2 minutes, only 1-2. Focus mitts: Speed work with 1-2. Shadow boxing: Perfect form and speed.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Combos';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  '1-2-3 Combination',
  2,
  'https://www.youtube.com/embed/X2jbYKGmv-s',
  100,
  'The 1-2-3 (jab-cross-lead hook) is a classic power combination. The straight punches set up the hook which comes from an unexpected angle.',
  'Execute a sharp jab-cross combination. As you throw the cross, your weight shifts. Immediately pivot and throw the lead hook, using the momentum from your cross. All three punches flow together smoothly.',
  'When opponent covers up from jab-cross. To attack from multiple angles. Against opponents with high guard. Combining straight and circular attacks.',
  'Pausing between punches, telegraphing the hook, not maintaining guard with rear hand, poor weight transfer, hook being too wide.',
  'Classic knockout combination. Vary targets (head-head-body). Use after establishing jab-cross. Forces opponent to defend multiple angles.',
  'Heavy bag: Power combinations. Focus mitts: Speed and accuracy. Shadow boxing: Smooth transitions between punches.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Combos';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  '1-1-2 Combination',
  3,
  'https://www.youtube.com/embed/Zce85h5jBBs',
  90,
  'The double jab-cross uses the second jab to disrupt timing and create a bigger opening for the power punch. More effective than single jab-cross against skilled opponents.',
  'Throw two quick jabs in succession, the second can target different height or angle. Immediately follow with the cross. The double jab keeps opponent thinking defense while you generate power.',
  'Against opponents who parry single jabs. To change rhythm. When opponent has good jab defense. To confuse timing before power punch.',
  'Second jab being too slow, telegraphing the cross, both jabs at same target, not using hip rotation on cross.',
  'First jab to face, second to body, then cross. Both jabs high then cross to body. Use to break opponent''s rhythm. Setup for combinations.',
  'Heavy bag: Practice rhythm changes. Focus mitts: Speed work. Shadow boxing: Vary jab heights and angles.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Combos';
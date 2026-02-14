/*
  # Populate Boxing Training Data

  ## Overview
  Populates the database with Boxing discipline, categories (Attacks, Defence, Footwork, Combos), 
  and techniques with comprehensive training content.

  ## New Data

  ### Disciplines
  - Boxing (active)

  ### Categories (for Boxing)
  - Attacks
  - Defence  
  - Footwork
  - Combos

  ### Techniques (for Attacks category)
  - Jab
  - Cross
  - Lead Hook
  - Rear Hook
  - Lead Uppercut
  - Rear Uppercut

  ## Notes
  - All techniques include comprehensive training details
  - Sequential unlock system enforced via order_index
  - XP rewards vary by technique complexity
*/

-- Insert Boxing discipline
INSERT INTO disciplines (name, is_active, description, order_index)
VALUES ('Boxing', true, 'The art of punching, footwork, and head movement', 1)
ON CONFLICT (name) DO NOTHING;

-- Insert categories for Boxing
INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT 
  d.id,
  'Attacks',
  1,
  true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT 
  d.id,
  'Defence',
  2,
  true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT 
  d.id,
  'Footwork',
  3,
  true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT 
  d.id,
  'Combos',
  4,
  true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

-- Insert techniques for Attacks category
INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Jab',
  1,
  'https://www.youtube.com/embed/0bRi6XcjEwI',
  50,
  'The Jab is one of the most important punches in boxing.
  1. The Jab controls distance and manages range. 
  2. It keeps opponents at the end of your reach.
  3. Sharp Jabs disrupts rhythm and timing.
  4. Jabbing breaks opponents flow and keeps them defencive.
  5. Clean jabs help to score points and impress judges
  6. The Jab creates openings and sets up for attacks
  7. The jab is faster, safer and less likely to leave you exposed
  8. A solid, consistant and scoring jab does not just physically hurt your opponent it also breaks their heart.'
  'Start in your boxing stance. Extend your lead hand straight out, rotating your fist so the palm faces down at full extension. Your shoulder should come up to protect your chin. Return the hand quickly to guard position. Keep your rear hand protecting your face.',
  'Use the jab to gauge distance, interrupt opponent attacks, set up power punches, and control the pace of the fight. It''s your most versatile tool.',
  'Common mistakes include: dropping the rear hand, not returning the jab quickly enough, telegraphing by pulling back before punching, not turning the fist over, and poor foot positioning.',
  'Jab to the body to bring the opponent''s guard down. Double or triple jab to create openings. Jab to set up the cross. Use it defensively to keep pressure fighters at bay.',
  'Shadow boxing: 3 rounds of 2 minutes, focusing only on jabs. Heavy bag: 100 jabs focusing on speed and snap. Partner drill: Touch sparring using only jabs.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Cross',
  2,
  'https://www.youtube.com/embed/BH9cWBu6sQk',
  75,
  'The cross is your rear hand power punch. It''s typically the strongest straight punch because it uses your entire body rotation and weight transfer. Essential for finishing combinations.',
  'From your stance, rotate your rear hip and shoulder forward. Extend your rear hand straight toward the target, turning the fist palm-down. Push off your rear foot, pivoting on the ball. Your rear shoulder should end up under your chin for protection.',
  'Throw the cross after the jab to capitalize on the opening created. Use it as a counter when your opponent commits to an attack. It''s your primary power punch for straight-line attacks.',
  'Common errors: Not pivoting the rear foot, arm-punching without body rotation, dropping the lead hand, overcommitting and losing balance, telegraphing by pulling back first.',
  'Jab-Cross combination is fundamental. Cross to the body when opponent raises their guard. Counter cross when opponent throws their jab. Use it to punish opponents who lean forward.',
  'Heavy bag: 5 sets of 20 crosses focusing on hip rotation. Focus mitts: Jab-Cross combinations for 3 rounds. Shadow boxing: Visualize countering with crosses.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Lead Hook',
  3,
  'https://www.youtube.com/embed/9GZ6xRlqgSY',
  100,
  'The lead hook is a devastating power punch that attacks from an angle. It targets the opponent''s temple, jaw, or body and is difficult to see coming when properly executed.',
  'Shift your weight to your lead leg. Rotate your lead hip and shoulder, keeping your elbow bent at 90 degrees. Your fist travels in a horizontal arc. Keep your rear hand up. The power comes from hip rotation, not arm swing.',
  'Use the hook after establishing your jab to create angles. Excellent for inside fighting. Throw to the body to drain your opponent''s stamina. Head hooks work well when opponent has their hands high.',
  'Swinging too wide (telegraphing), dropping the rear hand, not pivoting the lead foot, arm-punching without hip rotation, poor elbow position (too high or too low).',
  'Lead hook to the body under the opponent''s guard. Head hook after slipping a jab. Double hook (head-body or body-head). Use it to punish opponents who commit too heavily forward.',
  'Heavy bag: 50 lead hooks to head, 50 to body, focusing on tight form. Slip rope drill: Practice slipping then throwing lead hook. Partner drill: Light sparring focusing on hook openings.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Rear Hook',
  4,
  'https://www.youtube.com/embed/uSfAGO0RW2Q',
  100,
  'The rear hook is your most powerful circular punch. It generates maximum force through full body rotation and can be a fight-ending blow when landed cleanly.',
  'Pivot on the ball of your rear foot, rotating your rear hip forward explosively. Keep the elbow bent at 90 degrees as your fist travels in an arc. Your lead hand must stay up. Full body rotation is key - the punch is powered by your hips and legs.',
  'Most effective after the jab-cross combination. Use it when your opponent drops their lead hand. Excellent as a counter to an opponent''s jab. Works well at medium to close range.',
  'Over-rotating and spinning out, dropping the lead hand, telegraphing by pulling back, throwing before establishing position, not pivoting the rear foot, arm-punching.',
  'Classic 1-2-3 combination (jab-cross-rear hook). Body hook to slow down aggressive opponents. Counter rear hook when opponent commits to their jab. Double hooks (lead then rear).',
  'Heavy bag: 100 rear hooks focusing on hip rotation and power. Focus mitts: 1-2-3 combinations for speed. Shadow boxing: Full combinations ending with rear hook.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Lead Uppercut',
  5,
  'https://www.youtube.com/embed/rQUh91P9Ya8',
  125,
  'The lead uppercut is a devastating close-range power punch that travels upward through the opponent''s guard. It''s particularly effective in inside fighting and against opponents who lean forward.',
  'Slightly bend your knees to drop your level. Drive upward through your legs while rotating your lead hip. Your fist travels vertically upward with palm facing you. Keep your rear hand high for protection. The power comes from leg drive and hip rotation.',
  'Most effective at close range or inside fighting. Use when opponent leans forward with high guard. Excellent after body attacks that bring the guard down. Works well in combination after the cross.',
  'Dropping too low and telegraphing, not keeping the rear hand up, poor hip rotation, reaching too far, not driving through the legs, throwing from too far away.',
  'Body-head combinations: jab to body then lead uppercut to head. Counter when opponent ducks low. Works well after parrying opponent''s jab. Set up with the cross to bring hands up.',
  'Heavy bag: 50 lead uppercuts focusing on leg drive. Double-end bag: Practice timing uppercuts. Partner drill: Controlled sparring practicing close-range uppercuts after entries.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (category_id, name, order_index, video_url, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
SELECT 
  c.id,
  'Rear Uppercut',
  6,
  'https://www.youtube.com/embed/AYwS36GIaJI',
  125,
  'The rear uppercut is your most powerful vertical punch. It can end fights when landed cleanly to the chin or solar plexus. Essential for close-quarters combat.',
  'Slightly dip by bending your rear knee. Explosively drive upward through your rear leg while rotating your hip forward. Fist travels straight up with palm facing you. Keep your lead hand protecting your face. Maximum power comes from coordinated leg drive and hip rotation.',
  'Perfect for close range and inside fighting. Use when opponent has a high guard. Excellent for targeting the body at close range. Most effective after the lead hook or when countering ducking opponents.',
  'Telegraphing by dipping too much, dropping the lead hand, poor balance, not rotating the hip, reaching instead of closing distance first, throwing from too far away.',
  'Devastating in combination: lead hook to rear uppercut. Target the solar plexus in close. Counter opponents who duck low. Works after slipping outside an opponent''s jab.',
  'Heavy bag: 50 rear uppercuts, alternating head and body targets. Speed bag: Improve timing and hand-eye coordination. Partner drill: Close-range flow sparring focusing on uppercuts.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

/*
  # Populate Boxing Training Data

  ## Overview
  Populates the database with Boxing discipline, categories (Attacks, Defence, Footwork, Combos), 
  and techniques with comprehensive training content.

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
SELECT d.id, 'Attacks', 1, true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT d.id, 'Defence', 2, true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT d.id, 'Footwork', 3, true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

INSERT INTO categories (discipline_id, name, order_index, is_active)
SELECT d.id, 'Combos', 4, true
FROM disciplines d
WHERE d.name = 'Boxing'
ON CONFLICT DO NOTHING;

-- Insert techniques for Attacks category

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
SELECT 
  c.id,
  'Jab',
  1,
  'https://www.youtube.com/embed/0bRi6XcjEwI',
  50,
  'The Jab is one of the most important punches in boxing.

• The Jab controls distance and manages range.
• It keeps opponents at the end of your reach.
• The Jab creates openings and sets up for attacks.
• Sharp Jabs disrupt rhythm and timing.
• Clean jabs help to score points and impress judges.
• Jabbing breaks opponents flow and keeps them defensive.
• The jab is faster, safer and less likely to leave you exposed compared to power punches.
• A solid, consistant and scoring jab does not just physically hurt your opponent it also breaks their heart.',
  'Start in your boxing stance. Extend your lead hand straight out, rotating your fist so the palm faces down at full extension. Your shoulder should come up to protect your chin. Return the hand quickly to guard position. Keep your rear hand protecting your face.',
  'Use the jab to gauge distance, interrupt opponent attacks, set up power punches, and control the pace of the fight. It''s your most versatile tool.',
  'Common mistakes include: dropping the rear hand, not returning the jab quickly enough, telegraphing by pulling back before punching, not turning the fist over, and poor foot positioning.',
  'Jab to the body to bring the opponent''s guard down. Double or triple jab to create openings. Jab to set up the cross. Use it defensively to keep pressure fighters at bay.',
  'Shadow boxing: 3 rounds of 2 minutes, focusing only on jabs. Heavy bag: 100 jabs focusing on speed and snap. Partner drill: Touch sparring using only jabs.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
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

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
SELECT 
  c.id,
  'Lead Hook',
  3,
  'https://www.youtube.com/embed/9GZ6xRlqgSY',
  100,
  'The lead hook is a devastating power punch that attacks from an angle. It targets the opponent''s temple, jaw, or body and is difficult to see coming when properly executed.',
  'Shift your weight to your lead leg. Rotate your lead hip and shoulder, keeping your elbow bent at 90 degrees. Your fist travels in a horizontal arc. Keep your rear hand up. The power comes from hip rotation, not arm swing.',
  'Use the hook after establishing your jab to create angles. Excellent for inside fighting. Throw to the body to drain your opponent''s stamina. Head hooks work well when opponent has their hands high.',
  'Swinging too wide, dropping the rear hand, not pivoting the lead foot, arm-punching without hip rotation, poor elbow position.',
  'Lead hook to the body under the opponent''s guard. Head hook after slipping a jab. Double hook combinations. Use it to punish forward pressure.',
  'Heavy bag: 50 lead hooks to head, 50 to body. Slip rope drill: Slip then hook. Partner drill: Light sparring focusing on hook openings.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
SELECT 
  c.id,
  'Rear Hook',
  4,
  'https://www.youtube.com/embed/uSfAGO0RW2Q',
  100,
  'The rear hook is your most powerful circular punch. It generates maximum force through full body rotation and can be a fight-ending blow.',
  'Pivot on the ball of your rear foot, rotate the hip explosively, keep elbow bent 90 degrees. Full body rotation powers the strike.',
  'Most effective after jab-cross. Use when opponent drops their lead hand. Strong counter option.',
  'Over-rotating, dropping lead hand, telegraphing, not pivoting rear foot.',
  'Classic 1-2-3 combination. Body hook against aggressive fighters. Counter hook opportunities.',
  'Heavy bag: 100 rear hooks. Focus mitts: 1-2-3 combos. Shadow boxing: Full combinations.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
SELECT 
  c.id,
  'Lead Uppercut',
  5,
  'https://www.youtube.com/embed/rQUh91P9Ya8',
  125,
  'The lead uppercut is a devastating close-range punch that travels upward through the guard.',
  'Bend knees slightly, drive upward through legs, rotate hip, fist vertical. Rear hand protects face.',
  'Best at close range. Effective when opponent leans forward or keeps high guard.',
  'Dropping too low, not protecting chin, reaching, poor hip rotation.',
  'Body-head combos. Counter ducks. Use after cross.',
  'Heavy bag: 50 lead uppercuts. Double-end bag timing work. Close-range partner drill.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

INSERT INTO techniques (
  category_id, name, order_index, video_url, xp_reward,
  why, how, when_to_use, common_mistakes, tactical_uses, simple_drills
)
SELECT 
  c.id,
  'Rear Uppercut',
  6,
  'https://www.youtube.com/embed/AYwS36GIaJI',
  125,
  'The rear uppercut is your most powerful vertical punch. It can end fights cleanly to the chin or solar plexus.',
  'Dip slightly on rear knee, explode upward with leg drive and hip rotation. Lead hand stays protecting face.',
  'Perfect for close range and inside exchanges. Effective after hooks.',
  'Telegraphing dip, dropping lead hand, poor balance, throwing from too far.',
  'Lead hook to rear uppercut combo. Solar plexus targeting. Counter ducking opponents.',
  'Heavy bag: 50 rear uppercuts. Speed bag timing work. Close-range sparring flow.'
FROM categories c
JOIN disciplines d ON c.discipline_id = d.id
WHERE d.name = 'Boxing' AND c.name = 'Attacks';

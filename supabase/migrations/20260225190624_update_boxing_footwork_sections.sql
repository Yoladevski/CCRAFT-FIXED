/*
  # Update Boxing Footwork Sections

  1. Changes
    - Updates existing "Basic Stance" technique (keeps it at position 1)
    - Renames "Step and Slide" to "Step Forward" (position 2)
    - Creates new "Step Back" technique (position 3)
    - Creates new "Side Step" technique (position 4)
    - Renames "Pivot" to "Pivot Front Foot" (position 5)
    - Creates new "Pivot Back Foot" technique (position 6)
    - Removes "Angle Work" technique

  2. Notes
    - Maintains existing technique IDs where possible
    - Preserves user progress data for renamed techniques
    - New techniques will appear as incomplete for all users
*/

-- Get the Boxing Footwork category ID
DO $$
DECLARE
  v_category_id uuid;
  v_basic_stance_id uuid := '5ab89cd3-ea17-47b4-ba96-839280ab997c';
  v_step_slide_id uuid := '14aaadb5-34ad-4782-b071-f549851267c3';
  v_pivot_id uuid := '17657fe5-6a53-4852-a8a7-fc56e38f9544';
  v_angle_work_id uuid := '080db472-302c-4b22-9a7e-995d066ca9fd';
BEGIN
  -- Get category ID
  SELECT c.id INTO v_category_id
  FROM categories c
  JOIN disciplines d ON c.discipline_id = d.id
  WHERE d.name = 'Boxing' AND c.name = 'Footwork';

  -- 1. Keep Basic Stance as is (order_index = 1)
  -- Already exists with correct name and order

  -- 2. Rename "Step and Slide" to "Step Forward" (order_index = 2)
  UPDATE techniques
  SET name = 'Step Forward',
      order_index = 2
  WHERE id = v_step_slide_id;

  -- 3. Insert "Step Back" (order_index = 3)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, video_url, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_category_id,
    'Step Back',
    3,
    50,
    NULL,
    'Moving backward is essential for creating distance, avoiding attacks, and resetting position. Proper backward movement maintains balance and readiness while controlling range.',
    'Push off the front foot and step back with the rear foot first, then bring the front foot back to maintain stance width. Keep weight distributed, stay on the balls of your feet, and maintain your guard throughout the movement.',
    'Use when opponent is pressuring forward, when you need to create distance to counter, when avoiding incoming attacks, or when you need space to reset your positioning.',
    'Crossing feet while moving back, leaning backward and losing balance, taking steps that are too small or too large, dropping hands during the retreat, moving in a straight line predictably.',
    'Creates space for counter-punching, allows you to draw opponent forward into traps, helps control distance and tempo of the fight, useful for circling away from power hand.',
    'Practice 10 step backs maintaining perfect stance, shadow box while moving backward, partner drill with opponent advancing while you retreat and counter, ladder drills moving backward.'
  );

  -- 4. Insert "Side Step" (order_index = 4)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, video_url, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_category_id,
    'Side Step',
    4,
    50,
    NULL,
    'Lateral movement is crucial for creating angles, avoiding linear attacks, and positioning for effective counters. Side stepping keeps you out of your opponent''s power line while maintaining your offensive options.',
    'Push off the foot opposite to your direction (push off left to go right). Move your lead foot first in the direction you want to go, then bring the rear foot to maintain stance. Keep hips and shoulders square to opponent, maintain guard position.',
    'Use when opponent throws straight punches, when you want to create angles for counters, when escaping from corners or ropes, or when setting up combination attacks from new angles.',
    'Taking too wide a step and compromising balance, turning your back to opponent, moving without maintaining proper guard, stepping with rear foot first, crossing feet during movement.',
    'Creates angles for counter-punching, helps avoid opponent''s power hand, useful for ring generalship and controlling position, essential for combination punch setups from angles.',
    'Practice side steps in both directions maintaining stance, shadow box while side stepping, cone drills moving laterally, partner drill with opponent throwing jabs while you side step and counter.'
  );

  -- 5. Rename "Pivot" to "Pivot Front Foot" (order_index = 5)
  UPDATE techniques
  SET name = 'Pivot Front Foot',
      order_index = 5
  WHERE id = v_pivot_id;

  -- 6. Insert "Pivot Back Foot" (order_index = 6)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, video_url, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_category_id,
    'Pivot Back Foot',
    6,
    50,
    NULL,
    'The rear foot pivot allows you to rotate your body away from attacks while maintaining power position. This movement is essential for defense and creating sharp angles without losing your stance integrity.',
    'Keep front foot planted and pivot on the ball of your rear foot, rotating your hips and shoulders. Your rear foot should move in a semi-circular arc while maintaining stance width. Keep weight balanced and guard up.',
    'Use when slipping power punches, when rotating away from opponent''s attack line, when creating angles for hooks and uppercuts, or when escaping pressure against ropes.',
    'Lifting rear foot too high off ground, pivoting too far and losing power position, not rotating hips with the movement, dropping hands during pivot, losing balance.',
    'Quick defensive adjustment against straight punches, sets up powerful counter hooks, helps escape corners by rotating away, creates angles for body shots.',
    'Practice 10 rear pivots each direction maintaining balance, shadow box incorporating rear pivots after combinations, partner drill pivoting away from jab, cone drill pivoting around markers.'
  );

  -- 7. Delete "Angle Work" technique
  -- First delete any user progress associated with this technique
  DELETE FROM user_progress WHERE technique_id = v_angle_work_id;
  
  -- Then delete the technique
  DELETE FROM techniques WHERE id = v_angle_work_id;

END $$;

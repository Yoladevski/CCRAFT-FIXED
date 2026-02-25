/*
  # Update Boxing Defence and Combos Sections

  1. Defence Section Changes
    - Creates 10 defence techniques in the specified order:
      1. Closed Guard (new)
      2. Parry (existing - reordered)
      3. Block (existing - reordered)
      4. Slip (existing - reordered)
      5. Lean Back (new)
      6. Clinch (new)
      7. Bobbing & Weaving (new)
      8. Step Back (new)
      9. "L" Step (new)
      10. Slip Pivot (new)
    - Removes "Roll" and "Pull Counter" techniques

  2. Combos Section Changes
    - Creates 10 combo techniques in the specified order:
      1. Jab, Cross
      2. Jab, Cross, Jab
      3. Double Jab, Cross
      4. Double Jab, Rear Hook
      5. Jab, Cross, Lead Hook, Cross
      6. Jab, Cross, Lead Hook, Rear Uppercut
      7. Jab, Cross, Lead Hook, Rear Hook
      8. Jab, Rear Uppercut, Lead Hook, Cross
      9. Jab, Cross, Roll, Cross
      10. Jab, Cross, Step Back, Cross
    - Renames existing combos to match new structure
    - Adds 7 new combo techniques

  3. Notes
    - Preserves user progress for renamed/reordered techniques
    - Removes outdated techniques and their progress data
*/

DO $$
DECLARE
  v_defence_category_id uuid;
  v_combos_category_id uuid;
  
  -- Existing Defence IDs
  v_slip_id uuid := '456730ef-5114-43ba-a3e1-feaa67761719';
  v_roll_id uuid := 'cc39284f-65aa-4f0f-9872-9e0fbdc0a69f';
  v_parry_id uuid := '27e05f5b-710e-4869-a4f2-5bd94c5fbcd0';
  v_block_id uuid := '09d564c6-2746-419a-8542-edabc56bac60';
  v_pull_counter_id uuid := 'a0ce43a0-3c33-49c9-a885-a7243c4f4ce9';
  
  -- Existing Combos IDs
  v_1_2_id uuid := 'f458a792-bccc-47ed-9d5b-f0afa9bf9e87';
  v_1_2_3_id uuid := 'a82e643b-30f5-4f6a-9682-016591d8f188';
  v_1_1_2_id uuid := 'cc173c23-e32f-4d21-bf85-881cc44d6ff9';
BEGIN
  -- Get category IDs
  SELECT c.id INTO v_defence_category_id
  FROM categories c
  JOIN disciplines d ON c.discipline_id = d.id
  WHERE d.name = 'Boxing' AND c.name = 'Defence';

  SELECT c.id INTO v_combos_category_id
  FROM categories c
  JOIN disciplines d ON c.discipline_id = d.id
  WHERE d.name = 'Boxing' AND c.name = 'Combos';

  -- ============================================
  -- UPDATE DEFENCE SECTION
  -- ============================================

  -- 1. Insert "Closed Guard" (order 1)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Closed Guard', 1, 50,
    'The closed guard is your home base defensive position. Keeping your guard tight and high protects your head while maintaining readiness to attack or defend.',
    'Hands up at cheekbone level, elbows tucked close to ribs, chin tucked down behind the shoulder. Lead hand slightly forward, rear hand protecting jaw. Shoulders slightly raised to protect chin.',
    'Maintain throughout the fight as your default position, especially when opponent is in range, when resetting after combinations, when under pressure or tired.',
    'Dropping hands when tired, keeping elbows too wide leaving body exposed, holding guard too tight causing tension and slowing reactions, forgetting to keep chin tucked.',
    'Foundation for all defensive movements, protects against most incoming punches, maintains readiness to counter, conserves energy when implemented properly.',
    'Shadow box maintaining perfect guard for 3 minute rounds, partner taps gloves while you hold guard position, practice throwing punches and returning to closed guard immediately.'
  );

  -- 2. Update "Parry" (order 2)
  UPDATE techniques SET order_index = 2 WHERE id = v_parry_id;

  -- 3. Update "Block" (order 3)
  UPDATE techniques SET order_index = 3 WHERE id = v_block_id;

  -- 4. Update "Slip" (order 4)
  UPDATE techniques SET order_index = 4 WHERE id = v_slip_id;

  -- 5. Insert "Lean Back" (order 5)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Lean Back', 5, 50,
    'Leaning back creates distance from straight punches without moving your feet, keeping you in position to counter immediately. It''s a quick defensive adjustment that maintains your offensive positioning.',
    'Bend at the waist and lean upper body backward while keeping feet planted. Weight shifts to rear foot but both feet stay grounded. Keep hands up and eyes on opponent. Arch is controlled, not excessive.',
    'Against jabs and straight rights when you want to counter immediately, when you don''t have time to slip or block, when backed against ropes with no room to step back.',
    'Leaning too far back and losing balance, dropping hands while leaning, bending at knees instead of waist, staying leaned back too long, not being ready to counter.',
    'Quick defense that keeps you in punching range, sets up immediate counters, useful in close quarters, requires minimal energy and movement.',
    'Partner throws slow jabs while you lean back, shadow box lean backs then immediate counters, lean back against the ropes maintaining balance, practice for 30 second intervals.'
  );

  -- 6. Insert "Clinch" (order 6)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Clinch', 6, 50,
    'The clinch neutralizes your opponent''s offense by controlling their arms and creating a stalemate. It''s essential for recovery, breaking rhythm, and managing distance.',
    'Step inside opponent''s punches and wrap your arms around their shoulders or upper arms. Keep your head against their shoulder, not in front. Use your weight to lean on them. Control their arms to prevent punching.',
    'When hurt and need recovery time, when opponent is overwhelming you with combinations, when you''re tired and need to rest, when you want to break their rhythm.',
    'Holding with your head in front of opponent (dangerous), not controlling opponent''s arms, standing too upright, clinching from too far away, forgetting to work inside when legal.',
    'Provides recovery time when hurt, breaks opponent''s momentum, can tire aggressive opponents, strategic rest periods, legal in-fighting opportunities.',
    'Partner drill clinching and positioning properly, practice entering clinch from various distances, clinch and rest drill for 10 seconds each rep, work on clean clinch entries.'
  );

  -- 7. Insert "Bobbing & Weaving" (order 7)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Bobbing & Weaving', 7, 50,
    'Bobbing and weaving creates evasive head movement in a flowing pattern that makes you difficult to hit while keeping you in position to counter. It''s essential for aggressive, inside fighting.',
    'Bob by bending knees to dip down, weave by moving your head and upper body in a U-shape under imaginary punches. Keep hands up, stay balanced, use legs not just bending at waist. Flow continuously in smooth rhythm.',
    'When working inside against taller opponents, when slipping hooks and wide punches, when you want to close distance aggressively, during sustained exchanges.',
    'Bobbing too low and losing sight of opponent, weaving in predictable patterns, dropping hands during movement, using only upper body without leg bend, telegraphing direction.',
    'Makes you elusive target while advancing, sets up powerful counter hooks and uppercuts, essential for inside fighting, controls ring center against retreating opponents.',
    'Bob and weave under rope or stick for 2 minute rounds, shadow box incorporating bob and weave patterns, partner holds hands while you weave under, slip bag work focusing on fluid movement.'
  );

  -- 8. Insert "Step Back" (order 8)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Step Back', 8, 50,
    'Stepping back creates immediate distance from attacks while maintaining balance and position to counter. It''s a fundamental defensive movement that resets range and timing.',
    'Push off front foot and move rear foot back first, then bring front foot back to maintain stance. Keep weight balanced, stay on balls of feet, maintain guard throughout. Step should be quick but controlled.',
    'When opponent rushes forward, when you need distance to reset, when avoiding combination punches, when creating space to counter with straight punches.',
    'Stepping straight back predictably, crossing feet, taking too small or too large steps, leaning backward while stepping, dropping hands during movement.',
    'Creates counter-punching opportunities, controls distance and pace, helps manage aggressive opponents, allows you to draw opponent into traps.',
    'Practice 10 step backs maintaining stance, step back and counter drill, partner advances while you step back, mirror drill matching partner''s forward movement with your backward steps.'
  );

  -- 9. Insert "L Step" (order 9)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, '"L" Step', 9, 50,
    'The L-Step combines backward and lateral movement in an L-shape to escape linear attacks while creating angles. This movement takes you off your opponent''s attack line and positions you for counters.',
    'Step back with rear foot, then immediately step laterally (usually to your left) with lead foot, bringing rear foot to maintain stance. Movement forms an L-shape. Keep guard up and eyes on opponent throughout.',
    'When avoiding straight punches, when escaping corners or ropes, when opponent is rushing straight in, when you want to create counter angles.',
    'Telegraphing the movement, not completing both parts of the L, crossing feet during lateral step, turning away from opponent, dropping guard during movement.',
    'Escapes danger while creating counter opportunities, removes you from opponent''s power line, useful for ring generalship, sets up counter combinations from angles.',
    'Practice L-steps in both directions maintaining balance, shadow box L-steps followed by counters, partner throws straight punches while you L-step, cone drill marking the L-shape pattern.'
  );

  -- 10. Insert "Slip Pivot" (order 10)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_defence_category_id, 'Slip Pivot', 10, 50,
    'Combining a slip with a pivot creates maximum angle change while evading a punch. This advanced defensive move puts you in dominant position for powerful counters while completely avoiding the attack.',
    'Slip the punch first (move head off centerline), then immediately pivot on the ball of your lead foot, rotating your body. The slip and pivot should flow together. Keep guard up and maintain balance throughout.',
    'Against committed straight punches, when you want to create maximum angle for counters, when setting up hooks from angles, in close-quarter exchanges.',
    'Pivoting before completing the slip, over-rotating and losing balance, dropping hands during the movement, telegraphing the direction, not keeping eyes on opponent.',
    'Creates dominant angles for counter-punching, makes opponent miss badly and lose balance, sets up powerful hooks and crosses, essential for advanced counter-fighting.',
    'Partner throws jabs while you slip-pivot, shadow box incorporating slip-pivots, heavy bag work slipping and pivoting around bag, focus mitt drill with trainer calling slip-pivot combinations.'
  );

  -- Delete "Roll" and "Pull Counter"
  DELETE FROM user_progress WHERE technique_id IN (v_roll_id, v_pull_counter_id);
  DELETE FROM techniques WHERE id IN (v_roll_id, v_pull_counter_id);

  -- ============================================
  -- UPDATE COMBOS SECTION
  -- ============================================

  -- 1. Update "1-2 Combination" to "Jab, Cross" (order 1)
  UPDATE techniques 
  SET name = 'Jab, Cross', order_index = 1 
  WHERE id = v_1_2_id;

  -- 2. Update "1-2-3 Combination" to "Jab, Cross, Jab" (order 2)
  UPDATE techniques 
  SET name = 'Jab, Cross, Jab', order_index = 2 
  WHERE id = v_1_2_3_id;

  -- 3. Update "1-1-2 Combination" to "Double Jab, Cross" (order 3)
  UPDATE techniques 
  SET name = 'Double Jab, Cross', order_index = 3 
  WHERE id = v_1_1_2_id;

  -- 4. Insert "Double Jab, Rear Hook" (order 4)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Double Jab, Rear Hook', 4, 50,
    'The double jab sets up the rear hook by occupying the opponent''s vision and hands. The power hook follows naturally as the opponent focuses on the jabs.',
    'Throw two quick jabs to establish range and draw opponent''s guard up or forward. Immediately follow with rear hook, pivoting on rear foot and rotating hips. Keep first jab fast, second jab committed, hook thrown with full power.',
    'When opponent is guarding high, when you want to attack the head with power, after establishing jab timing, when opponent shells up behind guard.',
    'Telegraphing the hook, throwing weak jabs that don''t set up the hook, not rotating hips on hook, dropping lead hand when throwing hook, being too slow between punches.',
    'Breaks through high guards, creates rhythm then disrupts it with power, effective against defensive fighters, can target body or head with the hook.',
    'Heavy bag: double jab-rear hook for 3 minute rounds, focus mitts with trainer calling combination, shadow box focusing on smooth flow, double-end bag for timing and accuracy.'
  );

  -- 5. Insert "Jab, Cross, Lead Hook, Cross" (order 5)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Cross, Lead Hook, Cross', 5, 50,
    'This classic four-punch combination covers multiple angles and levels. It''s one of boxing''s most fundamental and effective combinations for offense and overwhelming opponents.',
    'Start with jab-cross to establish straight punches. Throw lead hook with hip rotation and pivot. Finish with cross, turning the punch over. All four punches should flow smoothly with proper weight transfer between each punch.',
    'As a primary offensive combination, when opponent is against ropes, when you have dominant position, to finish exchanges, when opponent is hurt.',
    'Rushing through the combination, not pivoting on lead hook, dropping hands between punches, not turning over the final cross, telegraphing the hook.',
    'High-pressure offense, works at multiple angles, difficult to defend all four punches, builds confidence and rhythm, staple combination for all levels.',
    'Heavy bag: drill this combination for 8 rounds, focus mitts with emphasis on clean technique, shadow box in mirror checking form, add movement between combinations.'
  );

  -- 6. Insert "Jab, Cross, Lead Hook, Rear Uppercut" (order 6)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Cross, Lead Hook, Rear Uppercut', 6, 50,
    'Ending with a rear uppercut brings a vertical attack after horizontal punches. The uppercut exploits the opening created by the hook and targets the chin or body effectively.',
    'Jab and cross set up the combination. Lead hook opens the opponent''s guard. Rear uppercut comes up through the middle, bending knees slightly and driving up through legs. Keep lead hand up for protection.',
    'When fighting inside or mid-range, when opponent drops guard after the hook, when attacking body then head, when opponent leans forward.',
    'Telegraphing the uppercut, not bending knees for power, dropping lead hand, throwing uppercut from too far away, not stepping in for range.',
    'Versatile for head and body attacks, effective in close quarters, uppercut is harder to see coming, great for inside fighting, can end fights when landed clean.',
    'Heavy bag focusing on uppercut power, focus mitt work with trainer, shadow box checking hand position, double-end bag for timing, practice body-head variations.'
  );

  -- 7. Insert "Jab, Cross, Lead Hook, Rear Hook" (order 7)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Cross, Lead Hook, Rear Hook', 7, 50,
    'This combination builds pressure with straight punches then unleashes hooks from both sides. The double hooks create a devastating finishing sequence.',
    'Jab-cross establishes range and commitment. Lead hook with full pivot and hip rotation. Rear hook follows immediately, pivoting opposite direction. Both hooks should be thrown with power, targeting head or mixing head-body.',
    'When opponent is hurt or retreating, when you have dominant position, against defensive fighters, when working inside, to finish rounds strong.',
    'Not fully committing to hooks, poor pivoting on hooks, dropping hands between punches, throwing hooks from wrong range, telegraphing the second hook.',
    'Maximum pressure combination, attacks from multiple angles, difficult to defend consecutive hooks, great for inside fighting, demoralizing for opponents.',
    'Heavy bag: practice double hooks specifically, focus mitts emphasizing hook technique, shadow box checking pivots, 3-minute rounds drilling this combination exclusively.'
  );

  -- 8. Insert "Jab, Rear Uppercut, Lead Hook, Cross" (order 8)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Rear Uppercut, Lead Hook, Cross', 8, 50,
    'This combination uses vertical and horizontal angles to confuse defense. The early uppercut after the jab catches opponents off guard, setting up the hook and cross.',
    'Jab to occupy vision. Rear uppercut comes quickly, bend knees and drive up. Lead hook with pivot. Finish with cross with full rotation. Focus on smooth transitions between different punch angles.',
    'When fighting at mid-range, when opponent guards high after jab, when you want to attack from unexpected angles, during exchanges.',
    'Throwing uppercut from too far away, telegraphing the uppercut wind-up, not recovering guard after uppercut, rushing the final cross, poor footwork between punches.',
    'Unpredictable pattern confuses defense, mixes levels and angles, effective against shell defense, good for setting up knockouts, develops timing and coordination.',
    'Focus mitts with trainer calling angles, shadow box slowly checking technique, heavy bag focusing on angle changes, speed bag for hand speed and transitions.'
  );

  -- 9. Insert "Jab, Cross, Roll, Cross" (order 9)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Cross, Roll, Cross', 9, 50,
    'This defensive combination incorporates a roll to evade the counter, then immediately fires back with another cross. It teaches defensive responsibility within offensive combinations.',
    'Throw jab and cross. Immediately roll (dip and rotate) to slip the expected counter. As you come up from the roll, throw the second cross with full power. The roll should be quick and tight.',
    'Against counter-punchers, when opponent has predictable counter patterns, to develop defensive offense habits, when you expect a hook counter.',
    'Rolling too slow, coming up from roll off-balance, not throwing the second cross immediately, telegraphing the roll, rolling in wrong direction.',
    'Develops counter-punching defense, safe aggressive fighting, teaches defensive reflexes, effective against counter-punchers, builds complete fighter skills.',
    'Partner drill: opponent throws hook counter after your cross, focus mitt work including the roll, shadow box emphasizing the roll timing, heavy bag with roll defense visualization.'
  );

  -- 10. Insert "Jab, Cross, Step Back, Cross" (order 10)
  INSERT INTO techniques (category_id, name, order_index, xp_reward, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES (
    v_combos_category_id, 'Jab, Cross, Step Back, Cross', 10, 50,
    'This combination teaches range management by attacking, creating distance, then countering. The step back draws the opponent forward into the counter cross.',
    'Throw jab and cross. Immediately step back to create distance and draw opponent forward. As they come forward, throw the counter cross, timing their forward movement. The step back should be quick and balanced.',
    'Against aggressive fighters, when you want to counter forward movement, to control ring center, when baiting opponent to come forward, to develop counter-punching skills.',
    'Stepping back too slow, not timing the counter cross properly, losing balance during step back, not maintaining guard during step back, counter cross lacks power.',
    'Controls aggressive opponents, teaches distance management, develops counter-punching timing, effective ring generalship, frustrates pressure fighters.',
    'Partner drill: partner comes forward after your cross, focus mitts with step back incorporated, shadow box visualizing opponent coming forward, footwork ladder drill with step backs.'
  );

END $$;

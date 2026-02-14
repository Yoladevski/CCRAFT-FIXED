/*
  # Populate Muay Thai Complete Content

  1. New Content
    - Categories: Attacks, Defence, Footwork, Combos
    - Techniques with full details (why, how, when_to_use, etc.)
    
  2. Categories Added
    - Attacks: Punches, elbows, knees, kicks (7 techniques)
    - Defence: Blocks, parries, checks (5 techniques)
    - Footwork: Stances and movement (5 techniques)
    - Combos: Combination techniques (4 techniques)
    
  3. Security
    - Uses existing RLS policies
*/

DO $$
DECLARE
  v_muay_thai_id uuid;
  v_attacks_id uuid;
  v_defence_id uuid;
  v_footwork_id uuid;
  v_combos_id uuid;
BEGIN
  SELECT id INTO v_muay_thai_id FROM disciplines WHERE name = 'Muay Thai';
  
  INSERT INTO categories (discipline_id, name, order_index, is_active)
  VALUES 
    (v_muay_thai_id, 'Attacks', 1, true),
    (v_muay_thai_id, 'Defence', 2, true),
    (v_muay_thai_id, 'Footwork', 3, true),
    (v_muay_thai_id, 'Combos', 4, true)
  ON CONFLICT DO NOTHING;
  
  SELECT id INTO v_attacks_id FROM categories WHERE discipline_id = v_muay_thai_id AND name = 'Attacks';
  SELECT id INTO v_defence_id FROM categories WHERE discipline_id = v_muay_thai_id AND name = 'Defence';
  SELECT id INTO v_footwork_id FROM categories WHERE discipline_id = v_muay_thai_id AND name = 'Footwork';
  SELECT id INTO v_combos_id FROM categories WHERE discipline_id = v_muay_thai_id AND name = 'Combos';
  
  -- ATTACKS
  INSERT INTO techniques (category_id, name, video_url, xp_reward, order_index, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES 
    (v_attacks_id, 'Jab (Mat Trong)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 1,
     'The jab is fundamental in Muay Thai for range finding and setting up your other weapons. It keeps opponents at bay while you prepare your devastating kicks, elbows, and knees.',
     'Extend your lead hand straight from your guard, rotating your fist palm-down. Keep your rear hand up protecting your face. Your shoulder should rise to protect your chin. Snap the punch out and back quickly.',
     'Use the jab to measure distance, disrupt opponent rhythm, set up kicks and elbows, and create openings for your power strikes.',
     'Dropping the rear hand, not returning the jab to guard quickly, overextending and losing balance, telegraphing the punch with shoulder movement.',
     'Control distance before throwing low kicks. Blind opponent before teeps. Set up elbow strikes. Interrupt opponent combinations.',
     'Shadow boxing jabs for 3 minutes. Jab the heavy bag 100 times focusing on speed. Partner drill: jab while partner moves.'),
    
    (v_attacks_id, 'Cross (Mat Kwaa)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 2,
     'The cross is your rear hand power punch, generating force from hip rotation. In Muay Thai, it often sets up devastating follow-up strikes with elbows or kicks.',
     'Rotate your rear hip forward explosively. Drive your rear hand straight out, palm facing down. Pivot on the ball of your rear foot. Your rear shoulder protects your chin. Return to guard immediately.',
     'Throw after the jab to penetrate defenses. Counter when opponent kicks. Set up clinch entries or elbow strikes.',
     'Not pivoting the rear foot, keeping weight on rear leg, dropping the lead hand, turning the punch into a hook, poor hip rotation.',
     'Follow low kicks with the cross. Counter opponent jabs. Set up knee strikes in clinch. Create openings for elbows.',
     'Cross on heavy bag 100 reps. Jab-cross combinations for 3 rounds. Focus mitts with trainer calling combinations.'),
    
    (v_attacks_id, 'Roundhouse Kick (Tae Tat)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 3,
     'The roundhouse kick is the signature weapon of Muay Thai. Using the shin instead of the foot, it delivers devastating power to legs, body, and head. This kick is what makes Muay Thai so effective.',
     'Pivot on your base foot, turning your hip over completely. Swing your leg in an arc, striking with the shin. Your arms swing opposite for balance. Rotate through the target, don''t just hit and stop. Chamber and return to stance.',
     'Attack the opponent''s lead leg to slow movement. Target the body to drain stamina. Throw to the head for knockouts. Use after setting up with punches.',
     'Kicking with the foot instead of shin, not pivoting the base foot, poor hip rotation, telegraphing with upper body, not committing weight forward.',
     'Low kick the lead leg repeatedly to compromise mobility. Body kick to break ribs and drain stamina. Head kick after lowering opponent''s guard. Counter opponent''s punches.',
     'Kick heavy bag 50 times each leg. Practice pivots without kicking. Slow-motion kicks focusing on form. Partner holds pads for power kicks.'),
    
    (v_attacks_id, 'Elbow Strike (Sok Ti)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 4,
     'Elbows are close-range weapons that can cut opponents and end fights. They''re devastating in the clinch and are one of the most dangerous tools in Muay Thai.',
     'From close range, drive your elbow downward in a chopping motion. Rotate your hip for power. Your fist should end near your opposite shoulder. Keep your other hand protecting your face. The point of the elbow should strike.',
     'Use in the clinch when too close for punches. Throw when breaking from a clinch. Counter opponent''s head movement. Cut and damage opponent.',
     'Using the forearm instead of elbow point, being too far away, not rotating hips, dropping opposite hand, telegraphing the strike.',
     'Follow up failed punches in close range. Punish opponent entering clinch. Strike from dominant clinch position. Cut opponent above eyes to impair vision.',
     'Shadow box elbows 100 reps each side. Strike heavy bag from clinch range. Partner drill: light contact elbow exchanges. Slow-motion form practice.'),
    
    (v_attacks_id, 'Knee Strike (Kao Trong)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 5,
     'The straight knee is a powerful weapon targeting the body and head. It''s especially effective in the clinch and can end fights when landed cleanly to the head or liver.',
     'Drive your knee straight up the center. Pull your opponent down if in clinch. Lean back slightly for balance. Point your toe down. Drive through the target. Keep hands up or controlling opponent.',
     'Use in the clinch to attack body and head. Throw when opponent bends forward. Counter opponent''s low kicks. Punish opponent attempting takedowns.',
     'Not leaning back for balance, jumping instead of driving through, letting go of clinch control, pointing toe up instead of down, not fully extending the knee.',
     'Dominant position in clinch for repeated knees. Counter opponent''s body punches. Punish forward pressure. Attack liver and solar plexus.',
     'Knee strike heavy bag 50 times each leg. Practice balance on one leg. Clinch with partner, slow knees. Jump rope for leg stamina.'),
    
    (v_attacks_id, 'Teep (Push Kick)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 6,
     'The teep is Muay Thai''s version of the jab with your leg. It creates distance, disrupts rhythm, and can be used offensively or defensively. It''s essential for range control.',
     'Lift your knee to your chest. Thrust your foot forward, striking with the ball of your foot. Push through the target. Lean back for balance. Retract the leg quickly to guard position.',
     'Create distance when opponent pressures. Interrupt opponent''s attacks. Off-balance your opponent. Set up kicks and punches. Control the ring.',
     'Leaning too far forward, not retracting quickly, pushing with toes instead of ball of foot, poor balance, telegraphing the kick.',
     'Stop opponent''s forward momentum. Push opponent into corners. Disrupt opponent''s rhythm before combinations. Counter aggressive attacks.',
     'Teep heavy bag 100 times total. Practice balance on one leg 30 seconds. Teep while partner advances. Shadow box teeps with footwork.'),
    
    (v_attacks_id, 'Spinning Elbow (Sok Klap)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 7,
     'The spinning elbow is one of the most spectacular and dangerous techniques in Muay Thai. When landed, it often results in knockouts or severe cuts. It requires excellent timing and commitment.',
     'Pivot on your lead foot, rotating your entire body. Keep your eyes on the target as long as possible. Whip your rear elbow around at head height. Follow through completely. The elbow should strike horizontally.',
     'Throw when opponent circles into the strike. Use as a surprise attack. Counter opponent''s aggressive forward pressure. Throw when opponent''s guard is down.',
     'Spinning without seeing target, telegraphing the rotation, being too far away, not committing fully, poor balance, spinning into opponent''s strong side.',
     'Surprise knockout technique. Counter opponent circling. Show early then throw later. Finish combinations with spinning elbow.',
     'Practice spins without striking for balance. Slow-motion spinning elbows. Hit heavy bag with spinning elbows 20 times. Shadow box focusing on head position.');
  
  -- DEFENCE
  INSERT INTO techniques (category_id, name, video_url, xp_reward, order_index, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES 
    (v_defence_id, 'Leg Check (Pad Jang)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 1,
     'The leg check is the fundamental defense against low kicks. Without it, your legs will be destroyed by repeated kicks. It''s essential for surviving in Muay Thai.',
     'Lift your leg slightly, rotating your shin outward to meet the kick. Point your toe down. Tighten your leg muscles. Stay balanced on your base leg. Use shin to shin contact. Keep hands up.',
     'Defend against all roundhouse kicks to your leg. Check early to discourage opponent. Use it reflexively when you see opponent''s hip turn.',
     'Lifting leg too high, not rotating shin outward, being off balance, dropping hands, checking too late, not tightening leg muscles.',
     'Counter opponent''s low kick strategy. Create opening when opponent kicks. Damage opponent''s shin. Discourage opponent from kicking.',
     'Partner throws slow kicks to check. Check heavy bag swinging toward leg. Shadow box kicks and checks. Balance drills on one leg.'),
    
    (v_defence_id, 'Long Guard', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 2,
     'The long guard is a unique Muay Thai defensive tool. It controls distance, blocks punches, and prevents opponents from entering clinch range on their terms.',
     'Extend your lead arm straight out, hand open or in a fist. Use it to frame against opponent''s shoulder or face. Keep rear hand protecting your face. Use it to measure and control distance.',
     'Defend against aggressive boxers. Control the clinch entry. Keep taller opponents at distance. Rest and recover. Set up counter kicks.',
     'Extending arm without support, letting opponent slip around it, not keeping rear hand up, being too stiff, over-relying on it.',
     'Control opponent''s head position. Prevent boxing combinations. Set up counters. Tire opponent by making them work around it.',
     'Partner tries to close distance while you long guard. Shadow box switching between guards. Hold heavy bag at arm''s length. Practice framing.'),
    
    (v_defence_id, 'Elbow Block', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 3,
     'The elbow block protects your body from kicks and knees. Properly executed, it can damage your opponent''s leg while defending, making them think twice about body attacks.',
     'Bring your elbow tight to your ribs on the side being attacked. Point elbow down slightly. Tighten your core. Keep your other hand up protecting your head. Meet the kick with the point of your elbow.',
     'Defend against body kicks. Protect ribs from knees in clinch. Counter aggressive body attacks. Damage opponent''s shin.',
     'Not bringing elbow tight enough, leaving ribs exposed, dropping other hand, poor timing, not angling elbow correctly.',
     'Make opponent pay for body kicks. Protect liver and ribs. Counter in the clinch. Damage opponent''s legs over time.',
     'Partner throws slow body kicks. Practice elbow positioning on heavy bag. Shadow box offense and defense. Film yourself to check form.'),
    
    (v_defence_id, 'Clinch Defense', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 20, 4,
     'Clinch defense is critical in Muay Thai where the clinch game is dominant. You must know how to defend, escape, and reverse position to avoid taking repeated knees and elbows.',
     'Keep your head up and posture strong. Fight for inside control of opponent''s arms. Break grips by rotating elbows up and out. Step back or circle out. Create frames with forearms. Don''t panic.',
     'When opponent secures clinch position. When taking knees or elbows. When being controlled. To create space for strikes or escape.',
     'Bending forward, dropping head, panicking and using too much energy, not fighting for position, giving up back, poor foot position.',
     'Escape dominant positions. Reverse position for your knees. Create space for elbow strikes. Tire opponent by making them work.',
     'Partner clinches while you defend and escape. Positional sparring in clinch only. Grip fighting drills. Practice with heavier partner.'),
    
    (v_defence_id, 'Catch and Counter', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 5,
     'Catching kicks and countering is an advanced technique that can completely shut down a kicker''s game plan while creating opportunities for devastating counters.',
     'As kick comes in, step into it slightly. Trap their leg with your arm, hugging it to your body. Immediately counter with punches or kicks to their standing leg. You can also sweep or dump them.',
     'When opponent throws predictable kicks. Against repeated low kicks. To demoralize kickers. As a fight-ending counter.',
     'Catching too late, not securing the leg, slow counters, being too far away, telegraphing the catch, not having counter ready.',
     'Punish kick-heavy opponents. Sweep or dump for damage. Land free strikes while they balance. Force opponent to abandon kicks.',
     'Partner throws slow kicks to catch. Practice catch and immediate counter. Catch and sweep drills. Build grip strength.');
  
  -- FOOTWORK
  INSERT INTO techniques (category_id, name, video_url, xp_reward, order_index, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES 
    (v_footwork_id, 'Fighting Stance', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5, 1,
     'The Muay Thai stance is your foundation. It must allow you to throw all eight weapons while maintaining balance and defensive capabilities. Everything starts from proper stance.',
     'Stand with feet shoulder-width apart, lead foot pointed forward, rear foot at 45 degrees. Weight 50/50 or slightly on rear leg. Hands up protecting face. Chin down. Stay on balls of feet. Relaxed but ready.',
     'This is your default position always. Return to stance after every technique. Maintain it while moving. Use it to stay balanced and ready.',
     'Weight too far forward or back, feet too close together, flat-footed, hands too low, too tense, feet on same line, not staying light.',
     'Proper stance enables all techniques. Maintain balance for defense. Stay mobile and ready. Control distance effectively.',
     'Hold stance for 3 minutes. Shadow box maintaining stance. Partner pushes you to test balance. Practice stance switches.'),
    
    (v_footwork_id, 'Forward Step', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 2,
     'Forward steps allow you to pressure opponents and close distance to land your strikes. Proper forward movement maintains your stance and keeps you ready to attack or defend.',
     'Lead foot steps forward first, then rear foot follows maintaining stance width. Stay on balls of feet. Don''t cross feet. Keep hands up. Move smoothly, not bouncing. Return to proper stance after each step.',
     'Close distance to strike. Pressure opponent into ropes or corners. Cut off the ring. Follow up after successful combinations.',
     'Crossing feet, bouncing steps, hands dropping, losing stance, stepping too far, being too slow, telegraphing movement.',
     'Maintain forward pressure. Set up kick combinations. Enter clinch range. Control the ring space.',
     'Step forward and back for 3 minutes. Shadow box with deliberate steps. Partner retreat as you advance. Footwork ladder drills.'),
    
    (v_footwork_id, 'Backward Step', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10, 3,
     'Retreating properly keeps you safe while maintaining the ability to counter. It''s essential for dealing with aggressive opponents and creating space for your kicks.',
     'Rear foot steps back first, then lead foot follows. Maintain stance width and guard. Stay on balls of feet. Keep eyes on opponent. Be ready to counter or block while moving.',
     'Create space from aggressive opponents. Escape from corners. Set up counter kicks or teeps. Recover and reset. Control distance.',
     'Lead foot stepping first, crossing feet, dropping hands, looking down, moving straight back into corners, losing balance.',
     'Counter aggressive fighters. Create kick distance. Escape bad positions. Draw opponent forward into traps.',
     'Shadow box backward movement. Partner advances as you retreat and counter. Practice backward movement with kicks. Triangle foot drill.'),
    
    (v_footwork_id, 'Pivot Step', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 4,
     'Pivoting allows you to angle off and escape linear attacks. It creates angles for counter strikes and gets you off the center line where you''re most vulnerable.',
     'Push off rear foot and pivot on lead foot, rotating 45-90 degrees to either side. Maintain stance and guard. Stay balanced. Be ready to strike immediately after pivoting.',
     'Angle off from straight attacks. Escape from corners or ropes. Create angles for kicks. Get off center line. Set up counters.',
     'Pivoting too far, losing balance, dropping hands, not being ready to counter, pivoting into opponent''s power side, crossing feet.',
     'Counter boxer''s straight punches. Escape pressure. Set up head kicks from angles. Avoid getting cornered.',
     'Pivot drills in both directions. Partner throws jab, you pivot and counter. Shadow box with pivots. Footwork triangle pattern.'),
    
    (v_footwork_id, 'Switch Step', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, 5,
     'The switch step allows you to throw your rear leg with full power by switching your stance quickly. It''s essential for throwing powerful kicks from your strong side.',
     'Quickly hop and switch your feet positions, rear foot becoming lead and vice versa. Stay light on feet. Maintain balance. Immediately throw technique, usually a rear kick or knee.',
     'Throw power kick with rear leg. Surprise opponent with stance change. Set up different angles. Generate more power in kicks.',
     'Telegraphing the switch, losing balance, being too slow, not immediately attacking after switch, bouncing too high.',
     'Power up your strong leg kick. Surprise opponents. Mix up your attack patterns. Generate maximum power in kicks.',
     'Practice switches without striking. Switch step into kicks on bag. Shadow box with switches. Switch step footwork drill 3 minutes.');
  
  -- COMBOS
  INSERT INTO techniques (category_id, name, video_url, xp_reward, order_index, why, how, when_to_use, common_mistakes, tactical_uses, simple_drills)
  VALUES 
    (v_combos_id, 'Jab-Cross-Low Kick', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 20, 1,
     'This is the bread and butter combination of Muay Thai. The punches get your opponent''s hands up and attention high, while the low kick attacks their base. It''s effective, simple, and fundamental.',
     'Throw a quick jab to set up. Immediately follow with a cross. As the cross lands, pivot and throw a rear leg low kick. The punches hide the kick. Flow smoothly between all three techniques.',
     'Use as your primary combination. Open exchanges with it. Wear down opponent''s legs. Attack after opponent''s committed attack. Use it repeatedly.',
     'Pausing between techniques, telegraphing the kick, not pivoting properly, poor balance, dropping hands during kick, not flowing smoothly.',
     'Punches blind the low kick. Repeatedly attack same leg. Build damage over time. Fundamental combination for all skill levels.',
     'Heavy bag combo 50 reps. Shadow box focusing on flow. Mitts with trainer. Slow motion to perfect form.'),
    
    (v_combos_id, 'Teep-Cross-Hook', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 20, 2,
     'This combination uses the teep to create a reaction, then capitalizes with power punches. The teep can freeze or back up the opponent, creating openings for your hands.',
     'Fire a teep to opponent''s body or face. As they react and you land back in stance, immediately throw a cross. Follow up with a hook. Keep pressure and flow between techniques.',
     'Against aggressive opponents. When you need space first. Counter opponent''s forward pressure. Mix up your attack patterns.',
     'Being too far for punches after teep, pausing between techniques, not landing back in proper stance, poor punch technique.',
     'Create space then attack. Surprise opponents. Counter forward pressure. Mix kicks and punches effectively.',
     'Shadow box the combination. Partner holds kick shield then mitts. Heavy bag drills. Practice landing in stance after teep.'),
    
    (v_combos_id, 'Elbow-Knee Combo', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 3,
     'This devastating close-range combination is pure Muay Thai. When you''re in clinch range or very close, this combo can end fights. It''s about using all close-range weapons together.',
     'From clinch or close range, throw a downward elbow. Immediately follow with a straight knee or clinch and knee. Pull opponent into your strikes. Be explosive. Chain multiple elbows and knees together.',
     'In the clinch. When very close range. After blocking and countering. Against opponent''s who pressure. To finish hurt opponents.',
     'Being too far away, not rotating hips, poor balance, telegraphing strikes, not controlling opponent, pausing between strikes.',
     'Dominant clinch position offense. Close range finishing. Counter pressure fighters. Maximum damage in tight spaces.',
     'Heavy bag close range work. Partner clinch drills light contact. Shadow box focusing on flow. Build endurance with rounds.'),
    
    (v_combos_id, 'Left Kick-Right Kick', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 4,
     'Double kicks are spectacular and effective, allowing you to attack with both legs in succession. This shows technical mastery and can catch opponents off guard while delivering double damage.',
     'Throw lead leg kick (typically a switch kick for power). Land in opposite stance. Immediately throw rear leg kick. Or use step-through footwork between kicks. Maintain balance throughout.',
     'Surprise opponents. Double the leg damage. Show technical skill. Against defensive opponents. Mix up your attack patterns.',
     'Poor balance between kicks, being too slow, telegraphing second kick, not maintaining guard, weak kicks due to poor technique.',
     'Overwhelm opponent''s defense. Double damage to legs. Flashy technique. Keep opponent guessing. Attack both sides of body.',
     'Shadow box double kicks. Switch kick into kick on bag. Practice balance between kicks. Build leg stamina and endurance.');
     
END $$;
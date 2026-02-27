/*
  # Populate Boxing Coaches' Tips

  1. Updates
    - Add coaches' tips content for all boxing techniques across all categories
    - Includes practical coaching advice for jabs, crosses, hooks, uppercuts, defense, footwork, and combinations
*/

-- JAB techniques
UPDATE techniques SET coaches_tips = 'Focus on speed over power initially. The jab is about touch and timing, not knockout power. Keep your shoulder up to protect your chin throughout the entire motion. Practice shadowboxing in front of a mirror to ensure your jab returns to guard position immediately after extension.'
WHERE name = 'Basic Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Jab');

UPDATE techniques SET coaches_tips = 'The double jab is about rhythm disruption. Throw the first jab to gauge distance and draw a reaction, then capitalize with the second. Keep both jabs crisp and fast—don''t telegraph the second one by dropping your hand after the first.'
WHERE name = 'Double Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Jab');

UPDATE techniques SET coaches_tips = 'Power in the jab comes from hip rotation and forward momentum, not just arm extension. Step forward as you punch to transfer your body weight. This jab should snap out and snap back—think of a piston motion rather than a pushing motion.'
WHERE name = 'Power Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Jab');

-- CROSS techniques
UPDATE techniques SET coaches_tips = 'The cross generates maximum power from full body rotation. Your back heel should pivot completely, allowing your hips and shoulders to turn fully. Many beginners try to muscle the punch with just their arm—the power comes from the ground up through proper rotation.'
WHERE name = 'Basic Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Cross');

UPDATE techniques SET coaches_tips = 'After throwing the cross, snap your hand back to guard position as quickly as you extended it. The return is just as important as the throw. Practice this movement slowly at first to build muscle memory, then gradually increase speed while maintaining form.'
WHERE name = 'Cross with Return' AND category_id IN (SELECT id FROM categories WHERE name = 'Cross');

UPDATE techniques SET coaches_tips = 'The feint cross is all about selling the fake. Dip your shoulder and shift your weight as if you''re really throwing the cross. Watch your opponent''s reaction—are they raising their guard? Leaning back? This information tells you what openings to exploit with your real punches.'
WHERE name = 'Feint Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Cross');

-- HOOK techniques
UPDATE techniques SET coaches_tips = 'Think of the lead hook as a horizontal punch, not a looping swing. Your elbow should stay at shoulder height, creating a 90-degree angle. The power comes from rotating your hips and pivoting your front foot—imagine you''re swinging a baseball bat from your core, not your arm.'
WHERE name = 'Lead Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Hook');

UPDATE techniques SET coaches_tips = 'The rear hook requires complete weight transfer. As you pivot on your back foot, your weight shifts from back leg to front leg. Keep your rear hand up to protect your chin—many fighters drop their guard when throwing this punch. Practice slowly to maintain balance throughout the motion.'
WHERE name = 'Rear Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Hook');

UPDATE techniques SET coaches_tips = 'The body hook is one of the most underutilized punches in boxing. Bend your knees to lower your level—don''t just bend at the waist. Keep your eyes on your opponent even while targeting the body. This punch sets up devastating head shots because it forces opponents to lower their guard.'
WHERE name = 'Body Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Hook');

-- UPPERCUT techniques
UPDATE techniques SET coaches_tips = 'Generate uppercut power from your legs, not your back. Dip slightly by bending your knees, then drive upward through your legs as you punch. Your palm should face you at the start and remain facing you throughout the motion. Don''t overextend or you''ll be off-balance and vulnerable.'
WHERE name = 'Lead Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Uppercut');

UPDATE techniques SET coaches_tips = 'The rear uppercut is your knockout weapon in close range. Pivot your back foot hard to generate torque through your entire body. Keep your lead hand high to protect against counters. This punch works best when your opponent is leaning forward or has their guard high.'
WHERE name = 'Rear Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Uppercut');

UPDATE techniques SET coaches_tips = 'Body uppercuts are devastating in close exchanges. Aim for the solar plexus or ribs. Keep your free hand up because you''re in dangerous counter range. Many fighters forget that uppercuts aren''t just head shots—body uppercuts can take the wind out of your opponent and slow them down significantly.'
WHERE name = 'Body Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Uppercut');

-- DEFENCE techniques
UPDATE techniques SET coaches_tips = 'The slip is about minimal movement—just enough to make them miss. Keep your eyes on your opponent and your hands up. Don''t slip too early or you''ll telegraph the move. Practice slipping to both sides equally, even though it might feel awkward at first. The slip is the foundation of all defensive movement.'
WHERE name = 'Slip' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

UPDATE techniques SET coaches_tips = 'Pull back just far enough to make the punch miss by an inch—no more. Overextending your pull takes you out of counter-punching range. Keep your weight centered so you can immediately return fire. Pull back is most effective against straight punches like jabs and crosses.'
WHERE name = 'Pull' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

UPDATE techniques SET coaches_tips = 'Duck low enough to avoid the punch but not so low that you''re vulnerable to uppercuts or can''t see follow-up punches. Keep your eyes up and hands protecting your head. Use your legs to duck, not your back. Spring back up immediately after the punch passes—don''t stay in the ducked position.'
WHERE name = 'Duck' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

UPDATE techniques SET coaches_tips = 'Block with intention—use your gloves to deflect punches, not just absorb them. Angle your gloves to redirect incoming shots away from your head. Keep your elbows tight to your ribs to protect your body. Don''t just cover up; use blocks as a setup for counters.'
WHERE name = 'Block' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

UPDATE techniques SET coaches_tips = 'Parry by making contact with the inside of your opponent''s glove, pushing the punch past your head. Timing is everything—parry too early and they can adjust, too late and you get hit. A good parry leaves your opponent off-balance and open for counters. Practice this with a partner throwing slow punches first.'
WHERE name = 'Parry' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

UPDATE techniques SET coaches_tips = 'The shoulder roll is an advanced technique that requires excellent timing and shoulder mobility. Your lead shoulder rises to deflect jabs while your rear hand protects your chin. Keep your weight on your back foot, ready to counter. Don''t try to shoulder roll hooks or uppercuts—this defense is specifically for straight punches.'
WHERE name = 'Shoulder Roll' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence');

-- FOOTWORK techniques
UPDATE techniques SET coaches_tips = 'Your stance is your foundation—everything else falls apart if this isn''t solid. Keep your weight on the balls of your feet, never flat-footed. Your knees should have a slight bend, never locked. Practice holding this stance for extended periods to build leg endurance. A strong stance allows you to punch with power and move with speed.'
WHERE name = 'Basic Stance' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

UPDATE techniques SET coaches_tips = 'Step with your lead foot first, then bring your rear foot to maintain your stance width. Don''t cross your feet or hop. Each step should be deliberate and controlled. Moving forward aggressively is important, but always maintain your balance—never lunge or overcommit where you can''t defend yourself.'
WHERE name = 'Forward Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

UPDATE techniques SET coaches_tips = 'Moving backward is not retreating in fear—it''s tactical positioning. Step back with your rear foot first, then bring your lead foot back. Don''t backpedal in straight lines; this makes you an easy target. Use backward movement to draw your opponent forward into traps and create counter-punching opportunities.'
WHERE name = 'Backward Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

UPDATE techniques SET coaches_tips = 'Lateral movement is how you create angles and make opponents miss. Push off with the opposite foot from the direction you want to go—push off your left foot to move right. Keep your stance intact as you move. Circle away from your opponent''s power hand (generally to your left against an orthodox fighter).'
WHERE name = 'Lateral Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

UPDATE techniques SET coaches_tips = 'The pivot is your escape tool when backed against the ropes or in the corner. Pivot on your lead foot while swinging your rear foot around. This move requires practice to execute smoothly under pressure. Always pivot to the outside of your opponent''s lead hand to stay safe from their power punches.'
WHERE name = 'Pivot' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

UPDATE techniques SET coaches_tips = 'Circle by taking small steps rather than large sweeping movements. Stay on the balls of your feet. Moving in a circle keeps you off the center line and makes your opponent constantly reset their position. Circle in both directions equally in practice—don''t develop a predictable pattern.'
WHERE name = 'Circle Movement' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork');

-- COMBOS techniques
UPDATE techniques SET coaches_tips = 'The 1-2 is the most fundamental combination in boxing—master this before moving to anything else. The jab sets up distance and distracts, while the cross delivers power. Return to your guard after each punch. Practice this combination thousands of times until it becomes automatic. Speed comes from relaxation, not tension.'
WHERE name = '1-2 (Jab-Cross)' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

UPDATE techniques SET coaches_tips = 'This three-punch combination teaches you to punch in angles. After the cross, your weight is forward—perfect for the lead hook. Pivot your front foot and rotate your hips hard. Don''t telegraph the hook by dropping your hand or pulling back. Each punch should flow naturally into the next without reset.'
WHERE name = '1-2-3 (Jab-Cross-Hook)' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

UPDATE techniques SET coaches_tips = 'Body attacks change levels and break down your opponent''s defense. After the cross goes high, dip your knees (not your waist) to throw the body hook. Keep your head off the center line when you dip. This combination is excellent for slowing down aggressive opponents and opening up head shots later in the fight.'
WHERE name = '1-2-3 to Body' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

UPDATE techniques SET coaches_tips = 'The uppercut finishes this combination perfectly because your opponent is likely bringing their guard back up after defending the hook. The rear uppercut comes from your back leg driving upward. Don''t wind up—the power comes from the drive, not the swing. This is a knockout combination when landed clean.'
WHERE name = '1-2-3-4 (Jab-Cross-Hook-Uppercut)' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

UPDATE techniques SET coaches_tips = 'Double jabs are about rhythm and control. Use them to establish distance, break timing, and set up power punches. Vary the speed and power of each jab—sometimes throw both fast, sometimes pause between them. The uncertainty keeps your opponent from timing their counters. This is a range-finding combination before committing to power shots.'
WHERE name = 'Double Jab-Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

UPDATE techniques SET coaches_tips = 'This combination is all about overwhelming speed and volume. Don''t load up on any single punch—throw all four with speed and snap. The goal is to land some, make them miss others, and keep constant pressure. Beginners often slow down after the first two punches—maintain pace throughout all four. Return to guard immediately after the last hook.'
WHERE name = 'Speed Combo (1-2-3-2)' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos');

/*
  # Update Boxing Techniques with Coaches' Tips

  1. Updates
    - Add coaches' tips for all Boxing techniques using correct technique names from database
    - Covers Punches, Defence, Footwork, and Combinations categories
*/

-- PUNCHES CATEGORY
UPDATE techniques SET coaches_tips = 'Focus on speed over power initially. The jab is about touch and timing, not knockout power. Keep your shoulder up to protect your chin throughout the entire motion. Practice shadowboxing in front of a mirror to ensure your jab returns to guard position immediately after extension.'
WHERE name = 'Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'The cross generates maximum power from full body rotation. Your back heel should pivot completely, allowing your hips and shoulders to turn fully. Many beginners try to muscle the punch with just their arm—the power comes from the ground up through proper rotation.'
WHERE name = 'Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Think of the lead hook as a horizontal punch, not a looping swing. Your elbow should stay at shoulder height, creating a 90-degree angle. The power comes from rotating your hips and pivoting your front foot—imagine you''re swinging a baseball bat from your core, not your arm.'
WHERE name = 'Lead Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'The rear hook requires complete weight transfer. As you pivot on your back foot, your weight shifts from back leg to front leg. Keep your rear hand up to protect your chin—many fighters drop their guard when throwing this punch. Practice slowly to maintain balance throughout the motion.'
WHERE name = 'Rear Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Generate uppercut power from your legs, not your back. Dip slightly by bending your knees, then drive upward through your legs as you punch. Your palm should face you at the start and remain facing you throughout the motion. Don''t overextend or you''ll be off-balance and vulnerable.'
WHERE name = 'Lead Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'The rear uppercut is your knockout weapon in close range. Pivot your back foot hard to generate torque through your entire body. Keep your lead hand high to protect against counters. This punch works best when your opponent is leaning forward or has their guard high.'
WHERE name = 'Rear Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

-- DEFENCE CATEGORY
UPDATE techniques SET coaches_tips = 'The slip is about minimal movement—just enough to make them miss. Keep your eyes on your opponent and your hands up. Don''t slip too early or you''ll telegraph the move. Practice slipping to both sides equally, even though it might feel awkward at first. The slip is the foundation of all defensive movement.'
WHERE name = 'Slip' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Pull back just far enough to make the punch miss by an inch—no more. Overextending your pull takes you out of counter-punching range. Keep your weight centered so you can immediately return fire. Pull back is most effective against straight punches like jabs and crosses.'
WHERE name = 'Pull Back' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Duck low enough to avoid the punch but not so low that you''re vulnerable to uppercuts or can''t see follow-up punches. Keep your eyes up and hands protecting your head. Use your legs to duck, not your back. Spring back up immediately after the punch passes—don''t stay in the ducked position.'
WHERE name = 'Duck' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Block with intention—use your gloves to deflect punches, not just absorb them. Angle your gloves to redirect incoming shots away from your head. Keep your elbows tight to your ribs to protect your body. Don''t just cover up; use blocks as a setup for counters.'
WHERE name = 'Block' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Parry by making contact with the inside of your opponent''s glove, pushing the punch past your head. Timing is everything—parry too early and they can adjust, too late and you get hit. A good parry leaves your opponent off-balance and open for counters. Practice this with a partner throwing slow punches first.'
WHERE name = 'Parry' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Rolling under punches is an advanced defensive technique that flows your body under hooks and crosses. Keep your knees bent and use your legs to create the rolling motion—don''t just bend at the waist. Your head moves in a U-shape, slipping offline while staying in punching range. Time the roll to flow with the incoming punch.'
WHERE name = 'Roll' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

-- FOOTWORK CATEGORY
UPDATE techniques SET coaches_tips = 'Your stance is your foundation—everything else falls apart if this isn''t solid. Keep your weight on the balls of your feet, never flat-footed. Your knees should have a slight bend, never locked. Practice holding this stance for extended periods to build leg endurance. A strong stance allows you to punch with power and move with speed.'
WHERE name = 'Basic Stance' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Step with your lead foot first, then bring your rear foot to maintain your stance width. Don''t cross your feet or hop. Each step should be deliberate and controlled. Moving forward aggressively is important, but always maintain your balance—never lunge or overcommit where you can''t defend yourself.'
WHERE name = 'Step Forward' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Moving backward is not retreating in fear—it''s tactical positioning. Step back with your rear foot first, then bring your lead foot back. Don''t backpedal in straight lines; this makes you an easy target. Use backward movement to draw your opponent forward into traps and create counter-punching opportunities.'
WHERE name = 'Step Backward' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Lateral movement is how you create angles and make opponents miss. Push off with the opposite foot from the direction you want to go—push off your left foot to move right. Keep your stance intact as you move. Circle away from your opponent''s power hand (generally to your left against an orthodox fighter).'
WHERE name = 'Side Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'The pivot is your escape tool when backed against the ropes or in the corner. Pivot on your lead foot while swinging your rear foot around. This move requires practice to execute smoothly under pressure. Always pivot to the outside of your opponent''s lead hand to stay safe from their power punches.'
WHERE name = 'Pivot' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

-- COMBINATIONS CATEGORY
UPDATE techniques SET coaches_tips = 'The jab-cross is the most fundamental combination in boxing—master this before moving to anything else. The jab sets up distance and distracts, while the cross delivers power. Return to your guard after each punch. Practice this combination thousands of times until it becomes automatic. Speed comes from relaxation, not tension.'
WHERE name = 'Jab, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination teaches rhythm and variation. Use the jab to establish distance, the cross for power, then another jab to keep them honest. Don''t throw all three at the same speed—vary your timing to keep your opponent guessing. The final jab can also set up your next combination.'
WHERE name = 'Jab, Cross, Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'Double jabs are about rhythm and control. Use them to establish distance, break timing, and set up power punches. Vary the speed and power of each jab—sometimes throw both fast, sometimes pause between them. The uncertainty keeps your opponent from timing their counters. This is a range-finding combination before committing to power shots.'
WHERE name = 'Double Jab, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination uses the double jab to set up a powerful hook. The jabs create a rhythm and raise the guard, then the rear hook comes around the side. Make sure to pivot your back foot fully on the hook for maximum power. The double jab makes the hook less predictable.'
WHERE name = 'Double Jab, Rear Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This four-punch combination teaches you to punch in angles. After the cross, your weight is forward—perfect for the lead hook, then finish with another cross. Each punch should flow naturally into the next without reset. Don''t telegraph the hook by dropping your hand or pulling back. This is a volume combination that overwhelms opponents.'
WHERE name = 'Jab, Cross, Lead Hook, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'The uppercut finishes this combination perfectly because your opponent is likely bringing their guard back up after defending the hook. The rear uppercut comes from your back leg driving upward. Don''t wind up—the power comes from the drive, not the swing. This is a knockout combination when landed clean.'
WHERE name = 'Jab, Cross, Lead Hook, Rear Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination attacks both sides of the head with hooks. After the jab and cross, throw the lead hook then immediately follow with the rear hook. Your hips should rotate smoothly through both hooks—don''t stop and reset between them. Keep your elbows at shoulder height for both hooks. This combination is devastating at close range.'
WHERE name = 'Jab, Cross, Lead Hook, Rear Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination starts with a jab, then surprises with a rear uppercut instead of the expected cross. The uppercut often catches opponents because they''re expecting straight punches. Follow with a lead hook and finish with a cross. The uppercut-hook-cross sequence is particularly effective when your opponent has a high guard.'
WHERE name = 'Jab, Rear Uppercut, Lead Hook, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination incorporates defensive movement. Throw the jab-cross, then roll under their counter-punch (usually a hook), and come up firing another cross. The roll makes you hard to hit while keeping you in punching range. Time the roll to flow with their counter—don''t roll randomly. This teaches punch-defense-punch flow.'
WHERE name = 'Jab, Cross, Roll, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

UPDATE techniques SET coaches_tips = 'This combination uses footwork to create angles. Throw jab-cross, then step back to make them miss or create space, then fire another cross as they step forward. The backward step draws them into your power hand. Don''t just step back passively—make them commit forward, then counter. This teaches range control and counter-punching.'
WHERE name = 'Jab, Cross, Step Back, Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Combinations' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing'));

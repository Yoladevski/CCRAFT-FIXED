/*
  # Update Muay Thai Techniques with Coaches' Tips

  1. Updates
    - Add coaches' tips for all Muay Thai techniques using correct technique names from database
    - Covers Attacks, Defence, Footwork, and Combos categories
*/

-- ATTACKS CATEGORY
UPDATE techniques SET coaches_tips = 'In Muay Thai, the jab is often used more for distance control than damage. Keep your rear hand near your chin and your lead shoulder up. Unlike boxing, you need to be aware of kicks coming back at you after throwing a jab. Use the jab to set up kicks and knees, not just punches.'
WHERE name = 'Jab (Mat Trong)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The cross in Muay Thai is thrown with more of a downward angle than in boxing, anticipating the taller Muay Thai stance. Turn your hip over completely and pivot your back foot. After throwing, immediately check for incoming kicks. This punch works beautifully when your opponent is kicking—catch their kick and counter with the cross.'
WHERE name = 'Cross (Mat Kwaa)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The roundhouse kick is Muay Thai''s signature weapon. Turn your hip completely over—think of kicking through your target, not at it. Your support foot should pivot 180 degrees, with your heel pointing at your target. Keep your hands up to protect against counters. Practice on heavy bags to build shin conditioning.'
WHERE name = 'Roundhouse Kick (Tae Tat)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Elbow strikes cut like a blade. Keep your hand of the striking arm near your ear for maximum power and to protect your head. Step in as you throw—distance is critical for elbows. Aim for the eyebrow or temple area. This elbow is excellent for creating cuts and is one of the most dangerous strikes in Muay Thai.'
WHERE name = 'Elbow Strike (Sok Ti)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The straight knee is a close-range power weapon. Drive through your hips and lean back slightly for balance. Pull your opponent down as you drive your knee up—use their body as leverage. Aim for the solar plexus or ribs. Don''t just kick with your knee; drive your entire leg through the target like a spear.'
WHERE name = 'Knee Strike (Kao Trong)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The teep is your range weapon—use it to control distance and disrupt your opponent''s rhythm. Push through your target rather than snapping back. Chamber your knee high before extending. The teep can target the stomach, chest, or face. Use it to stop forward pressure and create space for your power kicks.'
WHERE name = 'Teep (Push Kick)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The spinning elbow is a gamble—if you miss, you''ve turned your back. Use this when your opponent is stunned or you''ve created a specific opening. Spin quickly and spot your target as you turn. The power comes from the centrifugal force of your spin. This elbow often creates spectacular knockouts but should be used sparingly and strategically.'
WHERE name = 'Spinning Elbow (Sok Klap)' AND category_id IN (SELECT id FROM categories WHERE name = 'Attacks' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

-- DEFENCE CATEGORY
UPDATE techniques SET coaches_tips = 'Checking kicks is fundamental Muay Thai defense. Lift your leg and turn your shin to meet their shin. Keep your hands up for balance and protection. The check should be firm—meet their kick, don''t just lift your leg weakly. A good check can break your opponent''s foot or seriously damage their shin. Practice checking with both legs equally.'
WHERE name = 'Leg Check (Pad Jang)' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The long guard is a Muay Thai-specific defense where you extend one arm to frame and control distance. Use this to jam punches, control their head, and measure distance for counters. The extended arm isn''t passive—it should be active, posting and parrying. This guard is excellent against aggressive boxers and sets up teeps and knees perfectly.'
WHERE name = 'Long Guard' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Using your elbow to block kicks and punches creates a hard, painful surface for your opponent to hit. Bring your elbow up and out to meet strikes. This is particularly effective against roundhouse kicks to the head—turn your elbow into the kick. Be careful not to block with your elbow too early or they''ll adjust their angle.'
WHERE name = 'Elbow Block' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Breaking the clinch requires explosive movement. Frame against their body with your forearms, create space with your hips, then push or circle out. Don''t just push straight back—this uses too much energy and rarely works. Instead, push and turn to create an angle. After breaking, immediately reset your guard and create distance.'
WHERE name = 'Clinch Defense' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Catching kicks requires timing and commitment. Scoop their leg with your arm, trapping it against your body. Immediately take a dominant position—step forward and off-balance them, or throw a counter strike before they can recover. Don''t hold the leg too long or you''ll be off-balance yourself. Either sweep them or strike, then release.'
WHERE name = 'Catch and Counter' AND category_id IN (SELECT id FROM categories WHERE name = 'Defence' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

-- FOOTWORK CATEGORY
UPDATE techniques SET coaches_tips = 'The Muay Thai stance is slightly more upright and squared than boxing, allowing for better kick defense and execution. Keep your weight evenly distributed and hands high. Your stance should be solid but not rigid—you need to be able to check kicks instantly. Practice holding this stance while shadowboxing kicks and punches.'
WHERE name = 'Fighting Stance' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Moving forward in Muay Thai requires constant awareness of incoming kicks. Step with your lead foot first, maintaining your stance width. Don''t square up as you move forward—keep your stance angle. Be ready to check kicks at any moment. Forward movement is about controlled aggression, not reckless rushing.'
WHERE name = 'Forward Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Backward movement creates distance from dangerous strikes. Step back with your rear foot first, then bring your lead foot back. Keep your hands high and be ready to check kicks or counter. Moving backward is tactical—you''re creating space to land teeps or set up counter kicks. Don''t retreat in panic; retreat with purpose.'
WHERE name = 'Backward Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The pivot is your escape tool when pressured or in the clinch. Pivot on your lead foot while swinging your rear foot around to create a new angle. This move is excellent for getting off the ropes or out of corners. After pivoting, you can strike or create more distance. Practice pivoting both directions equally.'
WHERE name = 'Pivot Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The switch step quickly changes your stance to attack from the opposite side. Use it to set up switch kicks or to change your lead. The switch should be quick and subtle—don''t telegraph it by bouncing. You''re vulnerable during the switch, so time it when your opponent isn''t attacking. Practice switching and immediately kicking or punching.'
WHERE name = 'Switch Step' AND category_id IN (SELECT id FROM categories WHERE name = 'Footwork' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

-- COMBOS CATEGORY
UPDATE techniques SET coaches_tips = 'This classic combination mixes punches and kicks beautifully. The jab-cross sets up the low kick by getting their hands up. After throwing the cross, immediately pivot and throw the low kick. Your opponent will be focused on defending punches, making the low kick more likely to land. Aim for the thigh or calf to accumulate damage.'
WHERE name = 'Jab-Cross-Low Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Start with a teep to create distance or push them off balance, then close the distance with a cross-hook combination. The teep disrupts their rhythm and creates an opening for your punches. Time the cross as you step forward after the teep. This combo teaches range control—knowing when to kick and when to punch.'
WHERE name = 'Teep-Cross-Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'This devastating close-range combination is typically used in the clinch. Throw the elbow first to stun them or create an opening, then immediately drive a knee into their body or head. The elbow-knee combination is extremely dangerous and can end fights quickly. Control their head with your free hand to guide them into both strikes.'
WHERE name = 'Elbow-Knee Combo' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Throwing kicks to both sides tests your opponent''s ability to switch their defense quickly. After landing the left kick, quickly reset and throw the right kick (or vice versa). Don''t drop your hands between kicks—maintain your guard throughout. This combination works best when you mix up the targets: low-high, high-low, or both to the same level.'
WHERE name = 'Left Kick-Right Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Combos' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

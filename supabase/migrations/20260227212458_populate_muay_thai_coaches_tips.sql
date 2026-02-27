/*
  # Populate Muay Thai Coaches' Tips

  1. Updates
    - Add coaches' tips content for all Muay Thai techniques
    - Includes practical coaching advice for punches, kicks, knees, elbows, clinch, and defense
*/

-- PUNCHES
UPDATE techniques SET coaches_tips = 'In Muay Thai, the jab is often used more for distance control than damage. Keep your rear hand near your chin and your lead shoulder up. Unlike boxing, you need to be aware of kicks coming back at you after throwing a jab. Use the jab to set up kicks and knees, not just punches.'
WHERE name = 'Jab' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The cross in Muay Thai is thrown with more of a downward angle than in boxing, anticipating the taller Muay Thai stance. Turn your hip over completely and pivot your back foot. After throwing, immediately check for incoming kicks. This punch works beautifully when your opponent is kicking—catch their kick and counter with the cross.'
WHERE name = 'Cross' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Keep your hook tight and compact. In Muay Thai, the hook is often used in combination with clinch entries. After throwing the hook, be prepared to grab or check kicks. Don''t loop the hook wide—this leaves you vulnerable to knees and elbows. Use this punch when exiting the clinch or when your opponent steps in.'
WHERE name = 'Hook' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Uppercuts in Muay Thai are high-risk but high-reward, especially when entering the clinch. Keep the uppercut short and tight. After throwing, immediately look to establish clinch control or exit safely. This punch is excellent when your opponent has high elbows or is tucked up defensively. Time it when they step in.'
WHERE name = 'Uppercut' AND category_id IN (SELECT id FROM categories WHERE name = 'Punches' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

-- KICKS
UPDATE techniques SET coaches_tips = 'The roundhouse kick is Muay Thai''s signature weapon. Turn your hip completely over—think of kicking through your target, not at it. Your support foot should pivot 180 degrees, with your heel pointing at your target. Keep your hands up to protect against counters. Practice on heavy bags to build shin conditioning.'
WHERE name = 'Roundhouse Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Kicks');

UPDATE techniques SET coaches_tips = 'The teep is your range weapon—use it to control distance and disrupt your opponent''s rhythm. Push through your target rather than snapping back. Chamber your knee high before extending. The teep can target the stomach, chest, or face. Use it to stop forward pressure and create space for your power kicks.'
WHERE name = 'Teep (Push Kick)' AND category_id IN (SELECT id FROM categories WHERE name = 'Kicks');

UPDATE techniques SET coaches_tips = 'Low kicks are the body punch of Muay Thai—they accumulate damage and slow your opponent down. Aim for the common peroneal nerve on the outer thigh (the "dead leg" spot). Turn your hip fully and follow through. After landing, return to stance quickly—don''t admire your work. Mix up your targets between thigh and calf to keep them guessing.'
WHERE name = 'Low Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Kicks');

UPDATE techniques SET coaches_tips = 'Head kicks require excellent balance and hip flexibility. Chamber high and turn your hip completely. Don''t telegraph by dropping your hands or leaning back first. Set up head kicks with body kicks and punches—never throw them cold. If your opponent catches your head kick, you''re in serious trouble, so only throw it when you''re confident.'
WHERE name = 'High Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Kicks');

UPDATE techniques SET coaches_tips = 'The switch kick is all about deception—make it look like you''re setting your stance, not winding up for a power kick. The switch should be quick and subtle. Use the switch to generate extra power and to attack from an unexpected angle. This kick often catches opponents off guard because it comes from your traditionally weaker side.'
WHERE name = 'Switch Kick' AND category_id IN (SELECT id FROM categories WHERE name = 'Kicks');

-- KNEES
UPDATE techniques SET coaches_tips = 'The straight knee is a close-range power weapon. Drive through your hips and lean back slightly for balance. Pull your opponent down as you drive your knee up—use their body as leverage. Aim for the solar plexus or ribs. Don''t just kick with your knee; drive your entire leg through the target like a spear.'
WHERE name = 'Straight Knee' AND category_id IN (SELECT id FROM categories WHERE name = 'Knees');

UPDATE techniques SET coaches_tips = 'The diagonal knee requires hip rotation similar to a roundhouse kick but delivered at knee range. Turn your hip over and drive the knee across your body. This angle makes it harder to defend against than straight knees. Use your hands on your opponent''s head or neck to control their posture and prevent them from pulling away.'
WHERE name = 'Diagonal Knee' AND category_id IN (SELECT id FROM categories WHERE name = 'Knees');

UPDATE techniques SET coaches_tips = 'Jumping knees are highlight reel techniques but risky—only use them when you''ve created the right setup. Use the jump to close distance and add impact. Lead with your hands to control their head and guide them into the knee. Time this when your opponent is backing up or off-balance. Missing leaves you vulnerable.'
WHERE name = 'Jumping Knee' AND category_id IN (SELECT id FROM categories WHERE name = 'Knees');

UPDATE techniques SET coaches_tips = 'Flying knees are all about timing and commitment. You''re airborne and vulnerable, so you must land this. Launch when your opponent is moving forward or has their head down. Use your hands to grab behind their head mid-flight and pull them onto the knee. This is a finish move, not a technique to throw casually.'
WHERE name = 'Flying Knee' AND category_id IN (SELECT id FROM categories WHERE name = 'Knees');

-- ELBOWS
UPDATE techniques SET coaches_tips = 'The horizontal elbow cuts like a blade. Keep your hand of the striking arm near your ear for maximum power and to protect your head. Step in as you throw—distance is critical for elbows. Aim for the eyebrow or temple area. This elbow is excellent for creating cuts and is one of the most commonly used elbows in Muay Thai.'
WHERE name = 'Horizontal Elbow' AND category_id IN (SELECT id FROM categories WHERE name = 'Elbows');

UPDATE techniques SET coaches_tips = 'The uppercut elbow is devastating in the clinch. Drive upward through your legs while pulling your opponent''s head down. The elbow should travel straight up under their chin. Keep your non-striking hand controlling their head or arm. This elbow can knock opponents out cold and is most effective when they''re bent forward or tucked defensively.'
WHERE name = 'Uppercut Elbow' AND category_id IN (SELECT id FROM categories WHERE name = 'Elbows');

UPDATE techniques SET coaches_tips = 'Downward elbows are finishers when you have top control or catch your opponent ducking. Raise your elbow high and drive straight down through your target. Your entire body weight should be behind this strike. This is commonly used when your opponent shoots in for a takedown or when you''ve pulled them into a bent-over position.'
WHERE name = 'Downward Elbow' AND category_id IN (SELECT id FROM categories WHERE name = 'Elbows');

UPDATE techniques SET coaches_tips = 'The spinning elbow is a gamble—if you miss, you''ve turned your back. Use this when your opponent is stunned or you''ve created a specific opening. Spin quickly and spot your target as you turn. The power comes from the centrifugal force of your spin. This elbow often creates spectacular knockouts but should be used sparingly and strategically.'
WHERE name = 'Spinning Elbow' AND category_id IN (SELECT id FROM categories WHERE name = 'Elbows');

-- CLINCH
UPDATE techniques SET coaches_tips = 'Clinch control is about head and arm position. Get your hands behind their head (the "plum clinch") while keeping your elbows tight. Don''t just grab—actively pull their head down and off-balance them. Keep your hips close to take away their leverage. Good clinch control is exhausting but essential for landing knees and controlling the fight.'
WHERE name = 'Basic Clinch Position' AND category_id IN (SELECT id FROM categories WHERE name = 'Clinch');

UPDATE techniques SET coaches_tips = 'Knee control in the clinch is about timing and off-balancing. Pull your opponent down as you drive your knee up—double the impact. Don''t throw knees at a person who''s balanced and ready; off-balance them first by pushing, pulling, or rotating them. Knees from the clinch are your highest percentage scoring technique.'
WHERE name = 'Clinch Knee Strike' AND category_id IN (SELECT id FROM categories WHERE name = 'Clinch');

UPDATE techniques SET coaches_tips = 'The clinch throw (sweep) is about leverage and timing, not strength. Catch them when they''re off-balance or stepping. Use your leg to block theirs while pushing or pulling with your upper body. Don''t force it—wait for the right moment when they''re weighted on one leg. Scoring a clean throw wins favor with judges and demoralizes opponents.'
WHERE name = 'Clinch Throw' AND category_id IN (SELECT id FROM categories WHERE name = 'Clinch');

UPDATE techniques SET coaches_tips = 'Breaking the clinch requires explosive movement. Frame against their body with your forearms, create space with your hips, then push or circle out. Don''t just push straight back—this uses too much energy and rarely works. Instead, push and turn to create an angle. After breaking, immediately reset your guard and create distance.'
WHERE name = 'Clinch Break' AND category_id IN (SELECT id FROM categories WHERE name = 'Clinch');

-- DEFENSE
UPDATE techniques SET coaches_tips = 'Checking kicks is fundamental Muay Thai defense. Lift your leg and turn your shin to meet their shin. Keep your hands up for balance and protection. The check should be firm—meet their kick, don''t just lift your leg weakly. A good check can break your opponent''s foot or seriously damage their shin. Practice checking with both legs equally.'
WHERE name = 'Kick Check' AND category_id IN (SELECT id FROM categories WHERE name = 'Defense' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Catching kicks requires timing and commitment. Scoop their leg with your arm, trapping it against your body. Immediately take a dominant position—step forward and off-balance them, or throw a counter strike before they can recover. Don''t hold the leg too long or you''ll be off-balance yourself. Either sweep them or strike, then release.'
WHERE name = 'Catch and Counter' AND category_id IN (SELECT id FROM categories WHERE name = 'Defense' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'The long guard is a Muay Thai-specific defense where you extend one arm to frame and control distance. Use this to jam punches, control their head, and measure distance for counters. The extended arm isn''t passive—it should be active, posting and parrying. This guard is excellent against aggressive boxers and sets up teeps and knees perfectly.'
WHERE name = 'Long Guard' AND category_id IN (SELECT id FROM categories WHERE name = 'Defense' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

UPDATE techniques SET coaches_tips = 'Covering up is your emergency defense when you''re overwhelmed. Bring both gloves to your head, tuck your elbows tight to your body, and turn slightly to make yourself a smaller target. This isn''t sustainable—you''re just surviving momentarily. While covered, look for opportunities to clinch, pivot out, or time a counter. Don''t just turtle up indefinitely.'
WHERE name = 'Cover and Block' AND category_id IN (SELECT id FROM categories WHERE name = 'Defense' AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Muay Thai'));

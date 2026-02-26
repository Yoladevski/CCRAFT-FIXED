/*
  # Update Boxing Footwork Section - Complete Content
  
  1. Changes
    - Updates all 6 footwork techniques with complete content
    - Adds proper "Why use" sections for each technique
    - Ensures all common mistakes and drills are properly formatted
    - Maintains proper order and structure
  
  2. Techniques Updated
    - Basic Stance
    - Step Forward
    - Step Back
    - Side Step
    - Pivot on the Front Foot
    - Pivot on the Back Foot
*/

-- Update Basic Stance
UPDATE techniques
SET 
  why = 'Provides balance and stability. Allows quick movement in all directions. Enables efficient rotation for punches. Forms the foundation of all offence and defence.',
  how = '1. Stand with feet shoulder-width apart.
2. Step your lead foot forward.
3. Keep your rear heel slightly raised.
4. Bend your knees slightly for balance.
5. Distribute weight evenly between both legs.
6. Keep hands up in guard and chin tucked.',
  common_mistakes = 'Standing too tall
Reduces mobility and balance.
How to fix: Keep a slight bend in your knees.
Think: "Athletic, not stiff."

Feet too narrow or too wide
Affects balance and movement.
How to fix: Maintain shoulder-width distance.
Think: "Strong base."

Too square to the opponent
Limits defence and rotation.
How to fix: Keep lead shoulder slightly forward.
Think: "Bladed, not square."',
  simple_drills = '**Stance stability drill**
Hold your stance for 2 minutes while moving lightly in place.

Focus on:
Balance and relaxation.

Coach''s Tip:
Everything in boxing starts with your stance. Get this right first.'
WHERE name = 'Basic Stance' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

-- Update Step Forward
UPDATE techniques
SET 
  why = 'Close distance safely. Apply pressure. Set up attacks.',
  how = '1. Push lightly off your rear foot.
2. Move your lead foot forward first.
3. Slide your rear foot forward the same distance.
4. Maintain stance width.
5. Keep guard up and balance steady.',
  common_mistakes = 'Crossing feet
Destroys balance and defence.
How to fix: Move one foot at a time.
Think: "Step and slide."

Leaning forward
Makes you vulnerable to counters.
How to fix: Keep your head centered over your base.
Think: "Move the feet, not the body."',
  simple_drills = '**Step–Jab drill**
Step forward and throw a jab.

Focus on:
Coordination and balance.

Coach''s Tip:
Pressure comes from controlled movement, not rushing.'
WHERE name = 'Step Forward' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

-- Update Step Back
UPDATE techniques
SET 
  why = 'Create space quickly. Reset position. Draw opponents into counters.',
  how = '1. Push lightly off your lead foot.
2. Move your rear foot backward first.
3. Slide your lead foot back to reset stance.
4. Keep your hands up and chin tucked.',
  common_mistakes = 'Crossing feet while retreating
Leads to instability.
How to fix: Rear foot moves first.
Think: "Back foot leads."

Standing upright
Slows reactions.
How to fix: Stay in a slight knee bend.
Think: "Stay ready."',
  simple_drills = '**Step back–Cross drill**
Step back then fire a cross.

Focus on:
Distance control and timing.

Coach''s Tip:
Step back to control range — not to escape in panic.'
WHERE name = 'Step Back' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

-- Update Side Step
UPDATE techniques
SET 
  why = 'Move off the centre line. Create new attack angles. Avoid straight-line pressure.',
  how = '1. From stance, push off the opposite foot.
2. Move your lead foot sideways first.
3. Slide your rear foot to reset stance width.
4. Keep your guard high and posture balanced.',
  common_mistakes = 'Crossing feet sideways
Causes imbalance.
How to fix: Step then slide.
Think: "Side and settle."

Overstepping
Takes you out of range.
How to fix: Keep movement compact.
Think: "Small move, sharp angle."',
  simple_drills = '**Side step–Jab drill**
Side step then throw a jab.

Focus on:
Angle creation and balance.

Coach''s Tip:
Angles beat speed in most exchanges.'
WHERE name = 'Side Step' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

-- Update Pivot Front Foot (rename to match your content)
UPDATE techniques
SET 
  name = 'Pivot on the Front Foot',
  why = 'Change angle quickly. Exit pressure safely. Set up hooks and counters.',
  how = '1. Plant your lead foot firmly.
2. Slightly shift weight to that foot.
3. Rotate hips and shoulders around the lead foot.
4. Allow rear foot to follow naturally.
5. Maintain guard and balance.',
  common_mistakes = 'Over-rotating
Leaves you off balance.
How to fix: Rotate only enough to change angle.
Think: "Small turn, big angle."

Dropping hands during pivot
Leaves you open.
How to fix: Keep guard tight throughout.
Think: "Turn and guard."',
  simple_drills = '**Pivot–Hook drill**
Pivot then throw a lead hook.

Focus on:
Smooth rotation and balance.

Coach''s Tip:
The pivot is about position, not spinning fast.'
WHERE name = 'Pivot Front Foot' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

-- Update Pivot Back Foot (rename to match your content)
UPDATE techniques
SET 
  name = 'Pivot on the Back Foot',
  why = 'Realign quickly under pressure. Adjust angle for straight punches. Maintain balance during exchanges.',
  how = '1. Shift slight weight onto your rear foot.
2. Plant the rear foot firmly.
3. Rotate hips and shoulders around that foot.
4. Let the lead foot adjust naturally.
5. Stay balanced and ready to strike.',
  common_mistakes = 'Turning too wide
Takes you off line and out of range.
How to fix: Keep the pivot tight and controlled.
Think: "Tight turn."

Losing stance width
Reduces stability.
How to fix: Maintain shoulder-width base.
Think: "Protect your base."',
  simple_drills = '**Pivot–Cross drill**
Pivot then throw a cross.

Focus on:
Controlled rotation and balance.

Coach''s Tip:
Good footwork makes punches easier and defence sharper.'
WHERE name = 'Pivot Back Foot' 
AND category_id = '4721e283-2cd9-4d97-8660-981cc69bd91d';

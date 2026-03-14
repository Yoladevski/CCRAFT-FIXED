/*
  # Update Footwork Step Back technique content

  ## Changes
  - Updates Step Back in the Footwork category (id: 3a788850-13ea-4b85-af28-6fe3ec2f49cd)
    with full premium CombatCraft lesson content matching the same format used across all techniques.

  ## Note
  This is the Footwork category version of Step Back which previously had only
  placeholder/abbreviated content. The Defence category version was already updated.
*/

UPDATE techniques
SET
  why = E'• Creates defensive space\nStepping back removes you from danger without panicking or turning away.\n\n• Resets distance intelligently\nIt allows you to regain control of range before re-engaging.\n\n• Sets up counters\nMany effective counter punches come immediately after a controlled step back.\n\n• Maintains structure under pressure\nInstead of leaning or falling away, proper footwork keeps you balanced.\n\n• Preserves energy\nEfficient backward movement prevents scrambling and unnecessary fatigue.',
  how = E'1. Start in your boxing stance\nFeet shoulder-width apart, knees slightly bent, hands in guard.\n\n2. Move your rear foot first\nSlide your rear foot straight back a small distance.\n\n3. Push lightly off your lead foot\nYour lead foot follows immediately to restore stance width.\n\n4. Maintain stance alignment\nDo not let your feet come too close together or too far apart.\n\n5. Keep your knees slightly bent\nStay in an athletic position while moving.\n\n6. Hands remain tight to your cheeks\n\n7. Finish balanced and ready to counter',
  common_mistakes = E'Crossing your feet\nThis destroys balance and reaction time.\nHow to fix: Rear foot moves first, lead foot follows.\nThink: "Back foot leads."\n\nLeaning backward instead of stepping\nCompromises balance and exposes you to follow-up attacks.\nHow to fix: Move your feet before your upper body.\nThink: "Feet first."\n\nTaking a step that is too large\nMakes recovery slow and unbalanced.\nHow to fix: Keep steps small and controlled.\nThink: "Short and sharp."\n\nStanding upright during movement\nReduces readiness and defensive ability.\nHow to fix: Maintain slight knee bend.\nThink: "Stay loaded."\n\nDropping your guard while retreating\nLeaves your chin exposed.\nHow to fix: Keep both hands tight to your face.\nThink: "Move protected."',
  simple_drills = E'**Shadow Retreat Drill**\nStep back repeatedly while maintaining stance shape.\n\nFocus on:\nBalance and controlled movement.\n\n**Counter Step Drill**\nStep back and immediately throw a cross.\n\nFocus on:\nSmooth transition from defence to offence.\n\n**Distance Control Drill**\nHave a partner move forward slowly while you control range with step backs.\n\nFocus on:\nStaying composed under pressure.',
  coaches_tips = E'Stepping back should feel controlled, not reactive.\n\nIf you can retreat and fire a punch immediately without adjusting your stance, your movement is correct.\n\nDistance control is a skill — not a retreat.'
WHERE id = '3a788850-13ea-4b85-af28-6fe3ec2f49cd';

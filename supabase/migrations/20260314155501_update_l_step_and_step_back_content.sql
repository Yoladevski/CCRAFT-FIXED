/*
  # Update L-Step and Step Back technique content

  ## Changes
  - Replaces placeholder content for "L" Step (id: 9e69e7e3-8b60-423d-a71c-6785218539af)
    with full premium CombatCraft lesson content
  - Replaces placeholder content for Step Back (id: 69058d34-ccdf-4a60-9a42-89d1e8556a9d)
    with full premium CombatCraft lesson content

  ## Format
  Both techniques follow the same structured format used across all other techniques:
  - why: bullet points with heading + body line
  - how: numbered steps with optional sub-detail line
  - common_mistakes: paragraph-style with Fix and Think lines
  - simple_drills: bold drill name + focus line
  - coaches_tips: short paragraph
*/

UPDATE techniques
SET
  why = E'• Creates a sharp escape angle\nThe L-Step removes you from direct pressure and places you at a new angle instantly.\n\n• Breaks aggressive forward momentum\nHighly effective against opponents who rush straight in.\n\n• Blends footwork with defence\nIt''s not just stepping away — it''s repositioning strategically.\n\n• Sets up clean counters\nAfter the angle change, you are often lined up for a cross or hook.\n\n• Improves ring IQ\nTeaches you to move diagonally instead of retreating straight back.',
  how = E'1. Start in your boxing stance\nFeet shoulder-width apart, knees slightly bent, hands in guard.\n\n2. Step your lead foot slightly back\nCreate a small backward adjustment.\n\n3. Immediately step your rear foot out to the side\nThis creates the "L" shape movement.\n\n4. Rotate your hips and shoulders as you reposition\nYou should now be at an angle to your opponent.\n\n5. Maintain stance width throughout\n\n6. Keep your guard tight during movement\n\n7. Finish balanced and ready to counter',
  common_mistakes = E'Crossing your feet during movement\nDestroys balance and recovery speed.\nHow to fix: Keep stance width consistent.\nThink: "No crossing."\n\nTaking exaggerated steps\nMakes you slow and unstable.\nHow to fix: Keep movements compact and sharp.\nThink: "Small and sharp."\n\nStanding upright during the step\nReduces readiness to counter.\nHow to fix: Maintain slight knee bend.\nThink: "Stay loaded."\n\nDropping hands while moving\nLeaves you open to follow-up punches.\nHow to fix: Guard stays tight.\nThink: "Move protected."\n\nFailing to counter after repositioning\nMisses the advantage gained.\nHow to fix: Fire immediately once you create the angle.\nThink: "Angle then attack."',
  simple_drills = E'**Shadow Angle Drill**\nPractise stepping into the L position repeatedly.\n\nFocus on:\nSmooth diagonal movement and balance.\n\n**Pressure Escape Drill**\nHave a partner step forward while you L-Step away.\n\nFocus on:\nBreaking forward pressure.\n\n**L-Step and Cross Drill**\nPerform L-Step and immediately throw a cross.\n\nFocus on:\nStriking from new angle.',
  coaches_tips = E'The L-Step is about repositioning — not running.\n\nIf you can escape pressure and strike without adjusting your stance, your L-Step is correct.\n\nCreate the angle. Control the exchange.'
WHERE id = '9e69e7e3-8b60-423d-a71c-6785218539af';

UPDATE techniques
SET
  why = E'• Creates defensive space\nStepping back removes you from danger without panicking or turning away.\n\n• Resets distance intelligently\nIt allows you to regain control of range before re-engaging.\n\n• Sets up counters\nMany effective counter punches come immediately after a controlled step back.\n\n• Maintains structure under pressure\nInstead of leaning or falling away, proper footwork keeps you balanced.\n\n• Preserves energy\nEfficient backward movement prevents scrambling and unnecessary fatigue.',
  how = E'1. Start in your boxing stance\nFeet shoulder-width apart, knees slightly bent, hands in guard.\n\n2. Move your rear foot first\nSlide your rear foot straight back a small distance.\n\n3. Push lightly off your lead foot\nYour lead foot follows immediately to restore stance width.\n\n4. Maintain stance alignment\nDo not let your feet come too close together or too far apart.\n\n5. Keep your knees slightly bent\nStay in an athletic position while moving.\n\n6. Hands remain tight to your cheeks\n\n7. Finish balanced and ready to counter',
  common_mistakes = E'Crossing your feet\nThis destroys balance and reaction time.\nHow to fix: Rear foot moves first, lead foot follows.\nThink: "Back foot leads."\n\nLeaning backward instead of stepping\nCompromises balance and exposes you to follow-up attacks.\nHow to fix: Move your feet before your upper body.\nThink: "Feet first."\n\nTaking a step that is too large\nMakes recovery slow and unbalanced.\nHow to fix: Keep steps small and controlled.\nThink: "Short and sharp."\n\nStanding upright during movement\nReduces readiness and defensive ability.\nHow to fix: Maintain slight knee bend.\nThink: "Stay loaded."\n\nDropping your guard while retreating\nLeaves your chin exposed.\nHow to fix: Keep both hands tight to your face.\nThink: "Move protected."',
  simple_drills = E'**Shadow Retreat Drill**\nStep back repeatedly while maintaining stance shape.\n\nFocus on:\nBalance and controlled movement.\n\n**Counter Step Drill**\nStep back and immediately throw a cross.\n\nFocus on:\nSmooth transition from defence to offence.\n\n**Distance Control Drill**\nHave a partner move forward slowly while you control range with step backs.\n\nFocus on:\nStaying composed under pressure.',
  coaches_tips = E'Stepping back should feel controlled, not reactive.\n\nIf you can retreat and fire a punch immediately without adjusting your stance, your movement is correct.\n\nDistance control is a skill — not a retreat.'
WHERE id = '69058d34-ccdf-4a60-9a42-89d1e8556a9d';

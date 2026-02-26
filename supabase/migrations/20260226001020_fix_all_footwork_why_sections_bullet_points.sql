/*
  # Fix All Footwork Why Sections - Convert to Bullet Points
  
  1. Changes
    - Updates all footwork "why" sections to use proper bullet point format
    - Converts paragraph text to bullet points for consistency
    - Each technique in Footwork category now has consistent formatting
*/

-- Update Fighting Stance (Muay Thai)
UPDATE techniques
SET 
  why = '• Provides foundation for all eight weapons
• Maintains balance for offense and defense
• Enables quick transitions between techniques
• Forms the base of proper Muay Thai mechanics'
WHERE name = 'Fighting Stance' 
AND why LIKE '%The Muay Thai stance is your foundation%';

-- Update Forward Step (Muay Thai)
UPDATE techniques
SET 
  why = '• Pressure opponents effectively
• Close distance to land strikes
• Maintains stance while advancing
• Keeps you ready to attack or defend'
WHERE name = 'Forward Step' 
AND why LIKE '%Forward steps allow you to pressure%';

-- Update Backward Step (Muay Thai)
UPDATE techniques
SET 
  why = '• Keep safe while maintaining counter ability
• Deal with aggressive opponents
• Create space for kicks
• Retreat without losing defensive readiness'
WHERE name = 'Backward Step' 
AND why LIKE '%Retreating properly keeps you safe%';

-- Update Pivot Step (Muay Thai)
UPDATE techniques
SET 
  why = '• Angle off and escape linear attacks
• Create angles for counter strikes
• Get off the center line
• Avoid vulnerable positions'
WHERE name = 'Pivot Step' 
AND why LIKE '%Pivoting allows you to angle off%';

-- Update Switch Step (Muay Thai)
UPDATE techniques
SET 
  why = '• Throw rear leg with full power
• Switch stance quickly
• Generate power kicks from strong side
• Add versatility to your kicking arsenal'
WHERE name = 'Switch Step' 
AND why LIKE '%The switch step allows you to throw%';

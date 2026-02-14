/*
  # Add Muay Thai Discipline

  1. Changes
    - Adds Muay Thai as a new discipline
    - Sets is_active to true (unlocked)
    - Orders it after Boxing

  2. Security
    - No RLS changes needed, existing policies apply
*/

INSERT INTO disciplines (name, description, is_active, order_index)
VALUES (
  'Muay Thai',
  'The Art of Eight Limbs. Master devastating strikes with fists, elbows, knees, and shins.',
  true,
  2
)
ON CONFLICT (name) DO UPDATE
SET is_active = true;
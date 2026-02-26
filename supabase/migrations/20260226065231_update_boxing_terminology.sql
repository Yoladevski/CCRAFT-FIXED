/*
  # Update Boxing Terminology

  1. Changes
    - Rename "Attacks" category to "Punches" in Boxing discipline
    - Rename "Combos" category to "Combinations" in Boxing discipline
  
  2. Important Notes
    - This only affects the Boxing discipline
    - Other disciplines remain unchanged
    - The category IDs remain the same, only the names are updated
*/

-- Update "Attacks" to "Punches" in Boxing
UPDATE categories
SET name = 'Punches'
WHERE name = 'Attacks'
  AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing');

-- Update "Combos" to "Combinations" in Boxing
UPDATE categories
SET name = 'Combinations'
WHERE name = 'Combos'
  AND discipline_id = (SELECT id FROM disciplines WHERE name = 'Boxing');
/*
  # Recalculate Power Level from Foundations Progress Only

  ## Summary
  Power level and rank should only be based on foundation pathway completions,
  not technique library completions. This migration recalculates every user's
  power_level to equal 50 XP per completed foundation lesson.

  ## Changes
  1. Recalculates all profiles' power_level based on foundations_progress count
  2. Each completed foundation lesson = 50 XP
  3. The existing update_rank trigger will automatically update rank based on new power_level

  ## Important Notes
  - Users who earned XP only from the technique library will have their power_level adjusted
  - Users who completed foundation lessons will retain the correct XP amount
  - Rank is automatically recalculated by the existing database trigger
*/

UPDATE profiles
SET power_level = COALESCE(
  (
    SELECT COUNT(*) * 50
    FROM foundations_progress fp
    WHERE fp.user_id = profiles.user_id
      AND fp.completed = true
  ),
  0
);

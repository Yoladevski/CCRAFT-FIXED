/*
  # Add Training Streak Columns to Profiles

  ## Summary
  Adds streak tracking fields to the profiles table so each user's training streak
  persists across sessions.

  ## Changes to profiles table
  - `current_streak` (integer, default 0) – number of consecutive training days
  - `last_training_date` (date, nullable) – the most recent date the user completed a training action

  ## Notes
  - A streak increases only when a user completes a lesson or workout session on a new day
  - Logging in alone does NOT increase the streak
  - If the user misses a full day the streak resets to 1 on the next training action
  - No destructive changes; uses IF NOT EXISTS guards
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'current_streak'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_streak integer NOT NULL DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_training_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_training_date date;
  END IF;
END $$;

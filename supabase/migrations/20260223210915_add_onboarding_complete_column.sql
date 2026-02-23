/*
  # Add onboarding_complete column to profiles

  1. Changes
    - Add `onboarding_complete` boolean column to profiles table
    - Default value is false
    - This tracks whether a user has completed the profile setup process
  
  2. Purpose
    - Prevents dashboard access until profile is complete
    - Ensures users complete onboarding flow after email verification
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'onboarding_complete'
  ) THEN
    ALTER TABLE profiles ADD COLUMN onboarding_complete boolean DEFAULT false;
  END IF;
END $$;
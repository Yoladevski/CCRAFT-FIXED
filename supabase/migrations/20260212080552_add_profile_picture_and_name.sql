/*
  # Add Profile Picture and Name Fields

  1. Changes
    - Add `profile_picture_url` column to profiles table for storing profile image URLs
    - Add `full_name` column to profiles table for storing user's full name
    - Add `referral_code` column for unique referral codes
    - Add index on referral_code for quick lookups

  2. Security
    - No changes to RLS policies needed
    - Fields are part of existing profiles table with existing policies
*/

-- Add profile picture URL column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'profile_picture_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_picture_url text;
  END IF;
END $$;

-- Add full name column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN full_name text;
  END IF;
END $$;

-- Add referral code column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'referral_code'
  ) THEN
    ALTER TABLE profiles ADD COLUMN referral_code text UNIQUE;
  END IF;
END $$;

-- Create index on referral code for quick lookups
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'profiles' AND indexname = 'idx_profiles_referral_code'
  ) THEN
    CREATE INDEX idx_profiles_referral_code ON profiles(referral_code);
  END IF;
END $$;

-- Generate random referral codes for existing users
UPDATE profiles
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::text || id::text) FROM 1 FOR 8))
WHERE referral_code IS NULL;
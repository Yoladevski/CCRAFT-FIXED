/*
  # Fix profiles RLS policies for authenticated users

  1. Changes
    - Drop existing restrictive policies on profiles table
    - Add new policies allowing authenticated users to:
      - SELECT their own profile
      - INSERT their own profile
      - UPDATE their own profile
      - DELETE their own profile (soft delete only)
  
  2. Security
    - All policies check auth.uid() = user_id
    - No public access allowed
    - Users can only access their own data
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;

-- Allow users to SELECT their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to INSERT their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to UPDATE their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to DELETE their own profile (for soft deletes)
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
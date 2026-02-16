/*
  # Create user legal acceptance table

  1. New Tables
    - `user_legal_acceptance`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key to auth.users) - User who accepted
      - `waiver_version` (text) - Version identifier (e.g., "1.0_Jan_2026")
      - `accepted_at` (timestamptz) - When the waiver was accepted
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `user_legal_acceptance` table
    - Add policy for authenticated users to read their own acceptance records
    - Add policy for authenticated users to insert their own acceptance records
*/

CREATE TABLE IF NOT EXISTS user_legal_acceptance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  waiver_version text NOT NULL,
  accepted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, waiver_version)
);

ALTER TABLE user_legal_acceptance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own acceptance records"
  ON user_legal_acceptance
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own acceptance records"
  ON user_legal_acceptance
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

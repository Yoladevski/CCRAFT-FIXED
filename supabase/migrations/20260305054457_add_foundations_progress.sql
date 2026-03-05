/*
  # Add Foundations Pathway Progress Table

  1. New Tables
    - `foundations_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `discipline` (text, e.g. 'boxing')
      - `level` (integer, 1-5)
      - `lesson_id` (text, the lesson identifier)
      - `completed` (boolean)
      - `completed_at` (timestamptz)

  2. Security
    - Enable RLS on `foundations_progress` table
    - Users can only read and write their own progress
*/

CREATE TABLE IF NOT EXISTS foundations_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discipline text NOT NULL DEFAULT 'boxing',
  level integer NOT NULL,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE foundations_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own foundations progress"
  ON foundations_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own foundations progress"
  ON foundations_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own foundations progress"
  ON foundations_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

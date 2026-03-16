/*
  # Create workout_completions table

  ## Summary
  Tracks when a user completes a daily workout session.

  ## New Tables
  - `workout_completions`
    - `id` (uuid, primary key)
    - `user_id` (uuid, FK to auth.users)
    - `session_slug` (text) – e.g. "session-1"
    - `completed_date` (date) – calendar date of completion (YYYY-MM-DD)
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Users can only insert/select their own rows
*/

CREATE TABLE IF NOT EXISTS workout_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_slug text NOT NULL,
  completed_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workout_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workout completions"
  ON workout_completions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workout completions"
  ON workout_completions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE UNIQUE INDEX IF NOT EXISTS workout_completions_user_date_slug_idx
  ON workout_completions (user_id, completed_date, session_slug);

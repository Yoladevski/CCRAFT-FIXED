/*
  # Add Section Tracking to User Progress

  1. Changes
    - Add sections_read JSONB column to track which sections users have read
    - This enables progressive learning tracking for each technique

  2. Schema Changes
    - `sections_read` (jsonb): Stores which sections have been read
      Example: {"why": true, "how": true, "when": false, "mistakes": false, "tactical": false, "drills": false}

  3. Security
    - Uses existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_progress' AND column_name = 'sections_read'
  ) THEN
    ALTER TABLE user_progress 
    ADD COLUMN sections_read jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;
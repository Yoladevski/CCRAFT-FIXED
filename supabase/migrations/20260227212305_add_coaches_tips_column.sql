/*
  # Add Coaches' Tips Column to Techniques

  1. Changes
    - Add `coaches_tips` column to `techniques` table
    - Column is nullable text field for storing coaching tips for each technique
  
  2. Notes
    - Uses IF NOT EXISTS pattern to prevent errors if column already exists
    - Coaches' tips will be populated in subsequent data migrations
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'techniques' AND column_name = 'coaches_tips'
  ) THEN
    ALTER TABLE techniques ADD COLUMN coaches_tips text;
  END IF;
END $$;

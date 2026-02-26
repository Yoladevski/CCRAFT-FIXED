/*
  # Create content_blocks table for inline content editing

  1. New Tables
    - `content_blocks`
      - `id` (uuid, primary key) - Unique identifier
      - `content_key` (text, unique) - Unique key to identify content sections
      - `html_content` (text) - The HTML content to display
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp
  
  2. Security
    - Enable RLS on `content_blocks` table
    - Allow all authenticated users to read content (SELECT)
    - ONLY allow user with email 'belterdevelopment26@gmail.com' to insert/update/delete content
    - This ensures only the specific admin can edit content while everyone can view it
  
  3. Important Notes
    - The content_key must be unique to prevent duplicate content blocks
    - HTML content will be sanitized on the frontend before saving
    - The admin email check is enforced at the database level for security
*/

-- Create content_blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key text UNIQUE NOT NULL,
  html_content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read content
CREATE POLICY "Anyone can read content blocks"
  ON content_blocks
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow public users to read content blocks (for non-authenticated views)
CREATE POLICY "Public can read content blocks"
  ON content_blocks
  FOR SELECT
  TO anon
  USING (true);

-- Only allow specific admin email to insert content
CREATE POLICY "Only specific admin can insert content"
  ON content_blocks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.jwt()->>'email') = 'belterdevelopment26@gmail.com'
  );

-- Only allow specific admin email to update content
CREATE POLICY "Only specific admin can update content"
  ON content_blocks
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT auth.jwt()->>'email') = 'belterdevelopment26@gmail.com'
  )
  WITH CHECK (
    (SELECT auth.jwt()->>'email') = 'belterdevelopment26@gmail.com'
  );

-- Only allow specific admin email to delete content
CREATE POLICY "Only specific admin can delete content"
  ON content_blocks
  FOR DELETE
  TO authenticated
  USING (
    (SELECT auth.jwt()->>'email') = 'belterdevelopment26@gmail.com'
  );

-- Create index on content_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_content_blocks_content_key ON content_blocks(content_key);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_content_blocks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on content changes
DROP TRIGGER IF EXISTS trigger_update_content_blocks_updated_at ON content_blocks;
CREATE TRIGGER trigger_update_content_blocks_updated_at
  BEFORE UPDATE ON content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_content_blocks_updated_at();
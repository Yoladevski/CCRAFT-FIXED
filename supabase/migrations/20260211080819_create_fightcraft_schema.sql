/*
  # FIGHTCRAFT Database Schema

  ## Overview
  Creates the complete database structure for FIGHTCRAFT combat training platform
  with structured progression, gamified ranking, and discipline-based training paths.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key) - Profile identifier
  - `user_id` (uuid, foreign key to auth.users) - Links to authenticated user
  - `weight` (integer) - User weight in pounds/kg
  - `height` (integer) - User height in inches/cm
  - `experience_level` (text) - Training experience (Beginner, Intermediate, Advanced)
  - `preferred_discipline` (text) - User's preferred martial art
  - `power_level` (integer) - Total XP accumulated, default 0
  - `rank` (text) - Current rank based on power_level, default 'Amateur'
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `disciplines`
  - `id` (uuid, primary key) - Discipline identifier
  - `name` (text) - Discipline name (e.g., Boxing, Muay Thai)
  - `is_active` (boolean) - Whether discipline is available
  - `description` (text) - Brief description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp

  ### `categories`
  - `id` (uuid, primary key) - Category identifier
  - `discipline_id` (uuid, foreign key) - Parent discipline
  - `name` (text) - Category name (e.g., Attacks, Defence)
  - `order_index` (integer) - Display order within discipline
  - `is_active` (boolean) - Whether category is available
  - `created_at` (timestamptz) - Record creation timestamp

  ### `techniques`
  - `id` (uuid, primary key) - Technique identifier
  - `category_id` (uuid, foreign key) - Parent category
  - `name` (text) - Technique name (e.g., Jab, Cross)
  - `order_index` (integer) - Sequential order (determines unlock progression)
  - `video_url` (text) - Training video URL
  - `xp_reward` (integer) - XP gained upon completion, default 50
  - `why` (text) - Why this technique matters
  - `how` (text) - How to execute the technique
  - `when` (text) - When to use this technique
  - `common_mistakes` (text) - Common errors to avoid
  - `tactical_uses` (text) - Tactical applications
  - `simple_drills` (text) - Practice drills
  - `created_at` (timestamptz) - Record creation timestamp

  ### `user_progress`
  - `id` (uuid, primary key) - Progress record identifier
  - `user_id` (uuid, foreign key to auth.users) - User who completed technique
  - `technique_id` (uuid, foreign key) - Completed technique
  - `completed` (boolean) - Completion status, default true
  - `completed_at` (timestamptz) - Completion timestamp, default now()

  ## Security
  - Enable RLS on all tables
  - Users can read all disciplines, categories, and techniques
  - Users can only view/edit their own profile and progress
  - Authenticated users required for all operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  weight integer,
  height integer,
  experience_level text DEFAULT 'Beginner',
  preferred_discipline text,
  power_level integer DEFAULT 0,
  rank text DEFAULT 'Amateur',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create disciplines table
CREATE TABLE IF NOT EXISTS disciplines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  is_active boolean DEFAULT false,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discipline_id uuid REFERENCES disciplines(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  order_index integer NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create techniques table
CREATE TABLE IF NOT EXISTS techniques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  order_index integer NOT NULL,
  video_url text,
  xp_reward integer DEFAULT 50,
  why text,
  how text,
  when_to_use text,
  common_mistakes text,
  tactical_uses text,
  simple_drills text,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  technique_id uuid REFERENCES techniques(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT true,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, technique_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Disciplines policies (public read)
CREATE POLICY "Anyone can view disciplines"
  ON disciplines FOR SELECT
  TO authenticated
  USING (true);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Techniques policies (public read)
CREATE POLICY "Anyone can view techniques"
  ON techniques FOR SELECT
  TO authenticated
  USING (true);

-- User progress policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to auto-update rank based on power_level
CREATE OR REPLACE FUNCTION update_rank()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.power_level >= 2000 THEN
    NEW.rank := 'Champion';
  ELSIF NEW.power_level >= 1000 THEN
    NEW.rank := 'Elite';
  ELSIF NEW.power_level >= 500 THEN
    NEW.rank := 'Challenger';
  ELSIF NEW.power_level >= 200 THEN
    NEW.rank := 'Contender';
  ELSE
    NEW.rank := 'Amateur';
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update rank
DROP TRIGGER IF EXISTS update_rank_trigger ON profiles;
CREATE TRIGGER update_rank_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (OLD.power_level IS DISTINCT FROM NEW.power_level)
  EXECUTE FUNCTION update_rank();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_discipline_id ON categories(discipline_id);
CREATE INDEX IF NOT EXISTS idx_techniques_category_id ON techniques(category_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_technique_id ON user_progress(technique_id);
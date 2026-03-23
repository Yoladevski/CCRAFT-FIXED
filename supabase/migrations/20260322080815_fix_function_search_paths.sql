/*
  # Fix Mutable Search Path on Functions

  ## Summary
  Three functions had a mutable search_path, which is a security risk as it allows
  search path injection attacks. Adding `SET search_path = ''` to each function and
  using fully qualified names (schema.object) to prevent this vulnerability.

  ## Functions Fixed
  - `public.update_content_blocks_updated_at`
  - `public.update_rank`
  - `public.is_admin`
*/

CREATE OR REPLACE FUNCTION public.update_content_blocks_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_rank()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.power_level >= 1000 THEN
    NEW.rank = 'Legend';
  ELSIF NEW.power_level >= 500 THEN
    NEW.rank = 'Master';
  ELSIF NEW.power_level >= 250 THEN
    NEW.rank = 'Expert';
  ELSIF NEW.power_level >= 100 THEN
    NEW.rank = 'Intermediate';
  ELSE
    NEW.rank = 'Beginner';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE public.profiles.user_id = $1 AND public.profiles.role = 'admin'
  );
END;
$$;

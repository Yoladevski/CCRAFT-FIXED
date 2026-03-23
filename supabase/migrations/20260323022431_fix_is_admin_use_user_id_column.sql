/*
  # Fix public.is_admin(): use profiles.user_id not profiles.id

  ## Problem
  Migration 20260322080815 introduced a bug when adding SET search_path = '' to
  public.is_admin(). The WHERE clause was changed to `WHERE id = user_id`, which
  compares profiles.id (the row primary key UUID) against the function's user_id
  parameter. profiles.id is never equal to auth.uid(), so every admin check
  returned false — no user was ever recognized as admin.

  ## Fix
  Replace `WHERE id = user_id` with `WHERE public.profiles.user_id = $1` using
  the fully-qualified column name and positional parameter ($1) to eliminate any
  name ambiguity with the function parameter. profiles.user_id is the column that
  references auth.users and is the correct field for admin authorization lookup.

  ## Verification
  - Admin users (profiles.role = 'admin') are correctly recognized
  - Non-admin users are not recognized as admin
  - profiles.id is no longer used for auth/admin lookup
*/

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

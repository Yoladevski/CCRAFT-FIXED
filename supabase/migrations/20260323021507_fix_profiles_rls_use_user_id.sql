/*
  # Fix profiles RLS policies: use user_id not id for ownership checks

  ## Problem
  A previous migration (`20260322080734`) incorrectly used `id = (select auth.uid())`
  for profiles RLS ownership checks. `profiles.id` is a generated UUID (the row PK),
  NOT the authenticated user's ID. This meant users could not read or update their
  own profile because the check never matched.

  ## Fix
  Replace `id = (select auth.uid())` with `user_id = (select auth.uid())` on all
  four profiles policies. `profiles.user_id` is the column that references auth.users
  and is the correct ownership identifier.

  ## Policies corrected
  - SELECT: Users can view own profile
  - INSERT: Users can insert own profile
  - UPDATE: Users can update own profile
  - DELETE: Users can delete own profile
*/

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

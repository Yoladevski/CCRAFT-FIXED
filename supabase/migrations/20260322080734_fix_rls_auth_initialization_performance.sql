/*
  # Fix RLS Auth Initialization Performance

  ## Summary
  Replaces direct `auth.uid()` calls in RLS policies with `(select auth.uid())` subqueries.
  This ensures the auth function is evaluated once per query rather than once per row,
  significantly improving performance at scale.

  ## Tables Affected
  - `public.profiles` - 4 policies updated
  - `public.content_blocks` - 3 policies updated
  - `public.foundations_progress` - 3 policies updated
  - `public.workout_completions` - 2 policies updated

  ## Changes
  All policies now use `(select auth.uid())` instead of `auth.uid()` to prevent
  per-row re-evaluation of the auth function.
*/

-- ============================================================
-- profiles table
-- ============================================================

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (id = (select auth.uid()));

-- ============================================================
-- content_blocks table
-- ============================================================

DROP POLICY IF EXISTS "Only specific admin can insert content" ON public.content_blocks;
DROP POLICY IF EXISTS "Only specific admin can update content" ON public.content_blocks;
DROP POLICY IF EXISTS "Only specific admin can delete content" ON public.content_blocks;

CREATE POLICY "Only specific admin can insert content"
  ON public.content_blocks FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin((select auth.uid())));

CREATE POLICY "Only specific admin can update content"
  ON public.content_blocks FOR UPDATE
  TO authenticated
  USING (public.is_admin((select auth.uid())))
  WITH CHECK (public.is_admin((select auth.uid())));

CREATE POLICY "Only specific admin can delete content"
  ON public.content_blocks FOR DELETE
  TO authenticated
  USING (public.is_admin((select auth.uid())));

-- ============================================================
-- foundations_progress table
-- ============================================================

DROP POLICY IF EXISTS "Users can view own foundations progress" ON public.foundations_progress;
DROP POLICY IF EXISTS "Users can insert own foundations progress" ON public.foundations_progress;
DROP POLICY IF EXISTS "Users can update own foundations progress" ON public.foundations_progress;

CREATE POLICY "Users can view own foundations progress"
  ON public.foundations_progress FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own foundations progress"
  ON public.foundations_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own foundations progress"
  ON public.foundations_progress FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- ============================================================
-- workout_completions table
-- ============================================================

DROP POLICY IF EXISTS "Users can view own workout completions" ON public.workout_completions;
DROP POLICY IF EXISTS "Users can insert own workout completions" ON public.workout_completions;

CREATE POLICY "Users can view own workout completions"
  ON public.workout_completions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own workout completions"
  ON public.workout_completions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

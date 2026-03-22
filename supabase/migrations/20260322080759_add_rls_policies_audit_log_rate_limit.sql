/*
  # Add RLS Policies for audit_log and rate_limit Tables

  ## Summary
  These tables had RLS enabled but no policies, meaning no one could access them.
  Adding explicit restrictive policies that only allow admin users to read these
  internal/security tables. No direct insert/update/delete is permitted via RLS
  (these tables are written to by server-side functions only).

  ## Tables
  - `public.audit_log` - admin read-only
  - `public.rate_limit` - admin read-only
*/

-- audit_log: admin read only
CREATE POLICY "Admins can view audit log"
  ON public.audit_log FOR SELECT
  TO authenticated
  USING (public.is_admin((select auth.uid())));

-- rate_limit: admin read only
CREATE POLICY "Admins can view rate limit"
  ON public.rate_limit FOR SELECT
  TO authenticated
  USING (public.is_admin((select auth.uid())));

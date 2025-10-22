-- Drop all existing policies on applications table
DROP POLICY IF EXISTS "Allow service role delete" ON public.applications;
DROP POLICY IF EXISTS "Allow service role inserts" ON public.applications;
DROP POLICY IF EXISTS "Allow service role select" ON public.applications;
DROP POLICY IF EXISTS "Allow service role update" ON public.applications;
DROP POLICY IF EXISTS "deny all" ON public.applications;
DROP POLICY IF EXISTS "server insert" ON public.applications;

-- Create a single permissive policy that allows service role to do everything
CREATE POLICY "service_role_all_access" ON public.applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create a policy that allows public inserts (since your API is making the request)
CREATE POLICY "allow_insert" ON public.applications
  FOR INSERT
  TO public
  WITH CHECK (true);


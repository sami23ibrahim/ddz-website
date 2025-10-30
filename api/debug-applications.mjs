// /api/debug-applications.mjs
// Debug endpoint to see what's in the applications table
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Get all applications with their job codes
    const { data: applications, error: appsError } = await supabase
      .from('applications')
      .select('job_code, applicant_name, created_at')
      .order('created_at', { ascending: false });

    if (appsError) throw appsError;

    // Get all jobs with their job codes
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('job_code, title')
      .eq('status', 'active');

    if (jobsError) throw jobsError;

    // Count applications per job code
    const applicationCounts = {};
    applications.forEach(app => {
      applicationCounts[app.job_code] = (applicationCounts[app.job_code] || 0) + 1;
    });

    return res.status(200).json({ 
      ok: true, 
      debug: {
        total_applications: applications.length,
        total_jobs: jobs.length,
        applications: applications,
        jobs: jobs,
        application_counts: applicationCounts
      }
    });
  } catch (e) {
    console.error('[debug-applications] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

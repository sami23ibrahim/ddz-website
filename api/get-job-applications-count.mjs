// /api/get-job-applications-count.mjs
// Get all jobs with their application counts
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
    // Get all active jobs
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (jobsError) throw jobsError;

    // Get application counts for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const { count, error: countError } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true })
          .eq('job_code', job.job_code);

        if (countError) {
          console.error(`[get-job-applications-count] Error counting for ${job.job_code}:`, countError);
          return { ...job, application_count: 0 };
        }

        return { ...job, application_count: count || 0 };
      })
    );

    return res.status(200).json({ 
      ok: true, 
      jobs: jobsWithCounts 
    });
  } catch (e) {
    console.error('[get-job-applications-count] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


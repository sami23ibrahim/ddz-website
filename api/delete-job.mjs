// /api/delete-job.mjs
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { job_id } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: 'job_id is required' });
    }

    // Step 1: Get the job to find its job_code
    const { data: jobData, error: jobError } = await supabase
      .from('jobs')
      .select('job_code, title')
      .eq('id', job_id)
      .single();

    if (jobError || !jobData) {
      console.error('[delete-job] Job not found:', jobError);
      return res.status(404).json({ error: 'Job not found' });
    }

    const { job_code, title } = jobData;
    console.log(`[delete-job] Deleting job: ${job_code} (${title})`);

    // Step 2: Get all applications for this job_code to delete their files
    const { data: applications, error: appsError } = await supabase
      .from('applications')
      .select('cv_path, cover_path')
      .eq('job_code', job_code);

    if (appsError) {
      console.error('[delete-job] Error fetching applications:', appsError);
      // Continue anyway - we'll still delete the job and applications
    }

    // Step 3: Delete files from Supabase storage
    if (applications && applications.length > 0) {
      console.log(`[delete-job] Deleting ${applications.length} application files`);
      
      const filesToDelete = [];
      applications.forEach(app => {
        if (app.cv_path) filesToDelete.push(app.cv_path);
        if (app.cover_path) filesToDelete.push(app.cover_path);
      });

      if (filesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('applications')
          .remove(filesToDelete);

        if (storageError) {
          console.error('[delete-job] Storage deletion error:', storageError);
          // Continue anyway - we'll still delete the database records
        } else {
          console.log(`[delete-job] Deleted ${filesToDelete.length} files from storage`);
        }
      }
    }

    // Step 4: Delete all applications with this job_code
    const { error: deleteAppsError } = await supabase
      .from('applications')
      .delete()
      .eq('job_code', job_code);

    if (deleteAppsError) {
      console.error('[delete-job] Error deleting applications:', deleteAppsError);
      return res.status(500).json({ error: 'Failed to delete applications' });
    }

    console.log(`[delete-job] Deleted all applications for job_code: ${job_code}`);

    // Step 5: Delete the job itself
    const { error: deleteJobError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', job_id);

    if (deleteJobError) {
      console.error('[delete-job] Error deleting job:', deleteJobError);
      return res.status(500).json({ error: 'Failed to delete job' });
    }

    console.log(`[delete-job] Successfully deleted job: ${job_code} (${title})`);

    return res.status(200).json({ 
      ok: true, 
      message: `Job "${title}" and all related applications have been permanently deleted`,
      deleted: {
        job_code,
        title,
        applications_count: applications?.length || 0
      }
    });
  } catch (e) {
    console.error('[delete-job] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


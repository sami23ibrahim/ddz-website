// /api/jobs.mjs
// Combined job management API: create, delete, hide, unhide jobs
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { action } = req.query;

  try {
    switch (action) {
      case 'create':
        return await createJob(req, res);
      case 'delete':
        return await deleteJob(req, res);
      case 'hide':
        return await hideJob(req, res);
      case 'unhide':
        return await unhideJob(req, res);
      case 'list':
        return await listJobsWithCounts(req, res);
      default:
        return res.status(400).json({ error: 'Invalid action. Use: create, delete, hide, unhide, list' });
    }
  } catch (e) {
    console.error('[jobs] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

// Create new job
async function createJob(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    job_code, title, description, location, type, 
    experience_level, department, responsibilities, 
    requirements, benefits
  } = req.body;

  if (!job_code || !title || !description) {
    return res.status(400).json({ 
      error: 'job_code, title, and description are required' 
    });
  }

  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      job_code, title, description,
      location: location || null, type: type || null,
      experience_level: experience_level || 'Alle Level', 
      department: department || 'Gesundheitswesen',
      responsibilities: responsibilities || [], 
      requirements: requirements || [], 
      benefits: benefits || [],
      status: 'active'
    }])
    .select('*');

  if (error) throw error;
  return res.status(201).json({ ok: true, job: data[0] });
}

// Delete job permanently
async function deleteJob(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job_id } = req.body;
  if (!job_id) {
    return res.status(400).json({ error: 'job_id is required' });
  }

  // Get job details
  const { data: jobData, error: jobError } = await supabase
    .from('jobs')
    .select('job_code, title')
    .eq('id', job_id)
    .single();

  if (jobError || !jobData) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const { job_code, title } = jobData;

  // Get applications to delete files
  const { data: applications } = await supabase
    .from('applications')
    .select('cv_path, cover_path')
    .eq('job_code', job_code);

  // Delete files from storage
  if (applications && applications.length > 0) {
    const filesToDelete = [];
    applications.forEach(app => {
      if (app.cv_path) filesToDelete.push(app.cv_path);
      if (app.cover_path) filesToDelete.push(app.cover_path);
    });

    if (filesToDelete.length > 0) {
      await supabase.storage.from('applications').remove(filesToDelete);
    }
  }

  // Delete applications
  await supabase.from('applications').delete().eq('job_code', job_code);

  // Delete job
  const { error: deleteJobError } = await supabase
    .from('jobs')
    .delete()
    .eq('id', job_id);

  if (deleteJobError) throw deleteJobError;

  return res.status(200).json({ 
    ok: true, 
    message: `Job "${title}" and all related applications have been permanently deleted`,
    deleted: { job_code, title, applications_count: applications?.length || 0 }
  });
}

// Hide job (soft delete)
async function hideJob(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job_id } = req.body;
  if (!job_id) {
    return res.status(400).json({ error: 'job_id is required' });
  }

  const { data, error } = await supabase
    .from('jobs')
    .update({ status: 'inactive' })
    .eq('id', job_id)
    .select('job_code, title, status')
    .single();

  if (error) throw error;
  if (!data) return res.status(404).json({ error: 'Job not found' });

  return res.status(200).json({ 
    ok: true, 
    message: `Job "${data.title}" is now hidden from public view`,
    job: data
  });
}

// Unhide job (make active)
async function unhideJob(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job_id } = req.body;
  if (!job_id) {
    return res.status(400).json({ error: 'job_id is required' });
  }

  const { data, error } = await supabase
    .from('jobs')
    .update({ status: 'active' })
    .eq('id', job_id)
    .select('job_code, title, status')
    .single();

  if (error) throw error;
  if (!data) return res.status(404).json({ error: 'Job not found' });

  return res.status(200).json({ 
    ok: true, 
    message: `Job "${data.title}" is now visible to applicants`,
    job: data
  });
}

// List jobs with application counts
async function listJobsWithCounts(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get all jobs (for HR dashboard) or only active jobs (for public)
  const { include_inactive } = req.query;
  let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });
  
  if (!include_inactive) {
    query = query.eq('status', 'active');
  }

  const { data: jobs, error: jobsError } = await query;
  if (jobsError) throw jobsError;

  // Get application counts
  const jobsWithCounts = await Promise.all(
    jobs.map(async (job) => {
      const { count, error: countError } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_code', job.job_code);

      return { ...job, application_count: count || 0 };
    })
  );

  return res.status(200).json({ ok: true, jobs: jobsWithCounts });
}

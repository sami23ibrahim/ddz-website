// /api/applications.mjs
// Combined application management API: init, save, get applications
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { action } = req.query;

  try {
    switch (action) {
      case 'init':
        return await initApplication(req, res);
      case 'save':
        return await saveApplication(req, res);
      case 'get':
        return await getApplications(req, res);
      default:
        return res.status(400).json({ error: 'Invalid action. Use: init, save, get' });
    }
  } catch (e) {
    console.error('[applications] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

// Initialize application (create signed URLs for file upload)
async function initApplication(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobCode, cvFile, coverFile } = req.body;

  console.log('[init-application] Request body:', { jobCode, cvFile, coverFile });

  if (!jobCode || !cvFile || !cvFile.name) {
    return res.status(400).json({ error: 'jobCode and cvFile with name are required' });
  }

  const applicationId = randomUUID();
  const cvExt = cvFile.name.split('.').pop();
  const cvPath = `applications/${jobCode}/${applicationId}/cv.${cvExt}`;

  let coverPath = null;
  if (coverFile && coverFile.name) {
    const coverExt = coverFile.name.split('.').pop();
    coverPath = `applications/${jobCode}/${applicationId}/cover.${coverExt}`;
  }

  // Create signed URLs
  const { data: cvSignedUrl, error: cvError } = await supabase.storage
    .from('cvs')
    .createSignedUploadUrl(cvPath);

  if (cvError) throw cvError;

  let coverSignedUrl = null;
  if (coverPath) {
    const { data: coverSigned, error: coverError } = await supabase.storage
      .from('cvs')
      .createSignedUploadUrl(coverPath);
    
    if (coverError) throw coverError;
    coverSignedUrl = coverSigned;
  }

  return res.status(200).json({
    ok: true,
    applicationId,
    cv: { url: cvSignedUrl.signedUrl, path: cvPath },
    cover: coverSignedUrl ? { url: coverSignedUrl.signedUrl, path: coverPath } : null
  });
}

// Save application to database
async function saveApplication(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    applicationId, jobCode, fullName, email, phone,
    keepOnFile, cvPath, coverPath
  } = req.body;

  if (!applicationId || !jobCode || !fullName || !email || !cvPath) {
    return res.status(400).json({ 
      error: 'applicationId, jobCode, fullName, email, and cvPath are required' 
    });
  }

  const { data, error } = await supabase
    .from('applications')
    .insert([{
      id: applicationId,
      job_code: jobCode,
      full_name: fullName,
      email: email,
      phone: phone || null,
      storage_path: cvPath,
      cover_path: coverPath || null,
      keep_on_file: keepOnFile || false,
      status: 'new'
    }])
    .select('*');

  if (error) throw error;

  return res.status(201).json({ ok: true, application: data[0] });
}

// Get applications for a job
async function getApplications(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job_code } = req.query;
  if (!job_code) {
    return res.status(400).json({ error: 'job_code is required' });
  }

  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .eq('job_code', job_code)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return res.status(200).json({ ok: true, applications });
}

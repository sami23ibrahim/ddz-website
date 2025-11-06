// /api/download-cv.mjs
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

const BUCKET = process.env.SUPABASE_BUCKET || 'cvs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { file_path, application_id, file_type } = req.body;

    if (!file_path) {
      return res.status(400).json({ error: 'file_path is required' });
    }

    // Generate a signed URL valid for 1 hour
    const { data, error } = await supabase
      .storage
      .from(BUCKET)
      .createSignedUrl(file_path, 3600);

    if (error) {
      console.error('[download-cv] Supabase error:', error);
      throw error;
    }

    // Track download and update status if application_id is provided
    if (application_id) {
      await trackDownload(application_id, file_type);
    }

    return res.status(200).json({ 
      ok: true, 
      url: data.signedUrl,
      expires_in: 3600
    });
  } catch (e) {
    console.error('[download-cv] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

// Track download and update application status
async function trackDownload(applicationId, fileType) {
  try {
    // Determine which field to update based on file type
    const updateField = fileType === 'cover' ? 'cover_downloaded_at' : 'cv_downloaded_at';
    
    // Get current application to check if it's first download
    const { data: currentApp, error: fetchError } = await supabase
      .from('applications')
      .select('status, cv_downloaded_at, cover_downloaded_at')
      .eq('id', applicationId)
      .single();

    if (fetchError) {
      console.error('[trackDownload] Fetch error:', fetchError);
      return;
    }

    // Prepare update data
    const updateData = {
      [updateField]: new Date().toISOString()
    };

    // If this is the first download of any file, change status to 'downloaded'
    const isFirstDownload = !currentApp.cv_downloaded_at && !currentApp.cover_downloaded_at;
    if (isFirstDownload && currentApp.status === 'new') {
      updateData.status = 'downloaded';
    }

    // Update the application
    const { error: updateError } = await supabase
      .from('applications')
      .update(updateData)
      .eq('id', applicationId);

    if (updateError) {
      console.error('[trackDownload] Update error:', updateError);
    } else {
      console.log(`[trackDownload] Updated ${updateField} for application ${applicationId}`);
    }
  } catch (e) {
    console.error('[trackDownload] Error:', e);
  }
}


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
    const { file_path } = req.body;

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


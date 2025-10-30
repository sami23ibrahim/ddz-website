// /api/get-applications.mjs
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
    const { job_code } = req.query;

    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by job_code if provided
    if (job_code) {
      query = query.eq('job_code', job_code);
    }

    const { data: applications, error } = await query;

    if (error) {
      console.error('[get-applications] Supabase error:', error);
      throw error;
    }

    return res.status(200).json({ 
      ok: true, 
      applications,
      count: applications.length 
    });
  } catch (e) {
    console.error('[get-applications] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


// /api/get-jobs.mjs
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
    // Fetch all active jobs, ordered by creation date (newest first)
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[get-jobs] Supabase error:', error);
      throw error;
    }

    return res.status(200).json({ ok: true, jobs });
  } catch (e) {
    console.error('[get-jobs] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


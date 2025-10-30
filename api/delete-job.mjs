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

    // Soft delete: Set status to 'inactive' instead of deleting
    // This preserves the job record for existing applications
    const { data, error } = await supabase
      .from('jobs')
      .update({ status: 'inactive' })
      .eq('id', job_id)
      .select('*');

    if (error) {
      console.error('[delete-job] Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.status(200).json({ ok: true, job: data[0] });
  } catch (e) {
    console.error('[delete-job] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


// /api/hide-job.mjs
// Hide job from public view (soft delete) - sets status to 'inactive'
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { job_id } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: 'job_id is required' });
    }

    // Soft delete: Set status to 'inactive' 
    // This hides the job from public view but preserves all data
    const { data, error } = await supabase
      .from('jobs')
      .update({ status: 'inactive' })
      .eq('id', job_id)
      .select('job_code, title, status')
      .single();

    if (error) {
      console.error('[hide-job] Supabase error:', error);
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Job not found' });
    }

    console.log(`[hide-job] Hidden job: ${data.job_code} (${data.title})`);

    return res.status(200).json({ 
      ok: true, 
      message: `Job "${data.title}" is now hidden from public view`,
      job: {
        job_code: data.job_code,
        title: data.title,
        status: data.status
      }
    });
  } catch (e) {
    console.error('[hide-job] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

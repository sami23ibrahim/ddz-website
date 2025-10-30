// /api/create-job.mjs
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
    const {
      job_code,
      title,
      title_ar,
      title_de,
      title_tr,
      description,
      description_ar,
      description_de,
      description_tr,
      location,
      type,
      experience_level,
      department,
      responsibilities,
      requirements,
      benefits
    } = req.body;

    // Validate required fields
    if (!job_code || !title || !description) {
      return res.status(400).json({ 
        error: 'job_code, title, and description are required' 
      });
    }

    // Insert new job
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          job_code,
          title,
          title_ar: title_ar || null,
          title_de: title_de || null,
          title_tr: title_tr || null,
          description,
          description_ar: description_ar || null,
          description_de: description_de || null,
          description_tr: description_tr || null,
          location: location || null,
          type: type || null,
          experience_level: experience_level || 'All levels',
          department: department || 'Healthcare',
          responsibilities: responsibilities || [],
          requirements: requirements || [],
          benefits: benefits || [],
          status: 'active'
        }
      ])
      .select('*');

    if (error) {
      console.error('[create-job] Supabase error:', error);
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Job code already exists' });
      }
      throw error;
    }

    return res.status(200).json({ ok: true, job: data[0] });
  } catch (e) {
    console.error('[create-job] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}


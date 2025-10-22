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
      applicationId,
      jobCode,
      fullName,
      email,
      phone,
      keepOnFile,
      cvPath,
      coverPath
    } = req.body;

    const { data, error } = await supabase.from('applications').insert([
      {
        id: applicationId,
        job_code: jobCode,
        full_name: fullName,
        email,
        phone,
        keep_on_file: keepOnFile || false,
        storage_path: cvPath,
        cover_path: coverPath || null,
        status: 'submitted'
      }
    ])
    .select('*'); // ← add this

    if (error) throw error;

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}

// /api/init-application.mjs
// /api/init-application.mjs
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,               // use server-side URL
  process.env.SUPABASE_SERVICE_ROLE_KEY,   // service role key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);


const BUCKET = process.env.SUPABASE_BUCKET || 'cvs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { jobCode, cvFilename, coverFilename } = req.body || {};
    if (!jobCode || !cvFilename) return res.status(400).json({ error: 'jobCode and cvFilename are required' });

    const applicationId = cryptoRandomUUID();

    const getExt = (n) => (n && n.includes('.') ? n.split('.').pop().toLowerCase() : 'pdf');
    const cvPath = `applications/${jobCode}/${applicationId}/cv.${getExt(cvFilename)}`;
    const coverPath = coverFilename
      ? `applications/${jobCode}/${applicationId}/cover.${getExt(coverFilename)}`
      : null;

    // Diagnostic: Check if storage bucket is accessible
    const probe = await supabase.storage.from(BUCKET).list('', { limit: 1 });
    if (probe.error) {
      console.error('[storage probe] ', probe.error);
      return res.status(500).json({ error: 'storage list failed: ' + (probe.error.message || String(probe.error)) });
    }

    const { data: cvSigned, error: cvErr } =
      await supabase.storage.from(BUCKET).createSignedUploadUrl(cvPath, 3600); // 1 hour for testing
    if (cvErr) throw cvErr;

    let coverSigned = null;
    if (coverPath) {
      const { data, error } =
        await supabase.storage.from(BUCKET).createSignedUploadUrl(coverPath, 3600); // 1 hour for testing
      if (error) throw error;
      coverSigned = data;
    }

    return res.json({
      applicationId,
      cv: { path: cvPath, url: cvSigned.signedUrl },
      cover: coverSigned ? { path: coverPath, url: coverSigned.signedUrl } : null
    });
  } catch (e) {
    console.error('[init-application] error:', e);
    return res.status(500).json({ error: e?.message || String(e) || 'init failed' });
  }
  
}

// Small polyfill for Node <19 environments on Vercel
function cryptoRandomUUID() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

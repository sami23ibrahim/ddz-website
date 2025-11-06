// /api/application-management.mjs
// API for managing application status, starring, and notes
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { action } = req.query;

  try {
    switch (action) {
      case 'update-status':
        return await updateStatus(req, res);
      case 'toggle-star':
        return await toggleStar(req, res);
      case 'update-notes':
        return await updateNotes(req, res);
      default:
        return res.status(400).json({ error: 'Invalid action. Use: update-status, toggle-star, update-notes' });
    }
  } catch (e) {
    console.error('[application-management] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

// Update application status
async function updateStatus(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { application_id, status } = req.body;

  if (!application_id || !status) {
    return res.status(400).json({ error: 'application_id and status are required' });
  }

  // Validate status values
  const validStatuses = ['new', 'downloaded', 'reviewed', 'rejected', 'hired'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
  }

  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', application_id)
    .select('*')
    .single();

  if (error) throw error;

  return res.status(200).json({ ok: true, application: data });
}

// Toggle star status
async function toggleStar(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { application_id } = req.body;

  if (!application_id) {
    return res.status(400).json({ error: 'application_id is required' });
  }

  // First get current starred status
  const { data: currentApp, error: fetchError } = await supabase
    .from('applications')
    .select('starred')
    .eq('id', application_id)
    .single();

  if (fetchError) throw fetchError;

  // Toggle the starred status
  const newStarredStatus = !currentApp.starred;

  const { data, error } = await supabase
    .from('applications')
    .update({ starred: newStarredStatus })
    .eq('id', application_id)
    .select('*')
    .single();

  if (error) throw error;

  return res.status(200).json({ 
    ok: true, 
    application: data,
    starred: newStarredStatus
  });
}

// Update notes
async function updateNotes(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { application_id, notes } = req.body;

  if (!application_id) {
    return res.status(400).json({ error: 'application_id is required' });
  }

  // Notes can be empty string to clear notes
  const { data, error } = await supabase
    .from('applications')
    .update({ notes: notes || null })
    .eq('id', application_id)
    .select('*')
    .single();

  if (error) throw error;

  return res.status(200).json({ ok: true, application: data });
}

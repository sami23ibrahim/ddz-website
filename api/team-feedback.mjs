// /api/team-feedback.mjs
// API for team feedback/complaints system
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { action } = req.query;

  try {
    switch (action) {
      case 'submit':
        return await submitFeedback(req, res);
      case 'list':
        return await listFeedback(req, res);
      default:
        return res.status(400).json({ error: 'Invalid action. Use: submit, list' });
    }
  } catch (e) {
    console.error('[team-feedback] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}

// Submit new feedback
async function submitFeedback(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, author_name, is_anonymous, feedback_type } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  // Validate feedback_type
  const validTypes = ['positive', 'neutral', 'complaint'];
  const type = validTypes.includes(feedback_type) ? feedback_type : 'complaint';

  // Determine if anonymous based on provided flag or if no name given
  const anonymous = is_anonymous === true || !author_name || author_name.trim().length === 0;
  const name = anonymous ? null : author_name.trim();

  const { data, error } = await supabase
    .from('team_feedback')
    .insert([{
      message: message.trim(),
      author_name: name,
      is_anonymous: anonymous,
      feedback_type: type
    }])
    .select('*')
    .single();

  if (error) throw error;

  return res.status(201).json({ 
    ok: true, 
    feedback: data,
    message: 'Feedback submitted successfully'
  });
}

// List all feedback (newest first)
async function listFeedback(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('team_feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return res.status(200).json({ 
    ok: true, 
    feedback: data || [],
    count: data?.length || 0
  });
}


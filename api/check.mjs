export default function handler(req, res) {
    res.status(200).json({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
      hasAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      bucket: process.env.SUPABASE_BUCKET || null
    });
  }
  
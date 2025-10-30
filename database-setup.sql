-- HR Dashboard Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  title_de TEXT,
  title_tr TEXT,
  description TEXT NOT NULL,
  description_ar TEXT,
  description_de TEXT,
  description_tr TEXT,
  location TEXT,
  type TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index on job_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_jobs_job_code ON jobs(job_code);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 4. Create policy to allow public read access to active jobs
CREATE POLICY "Allow public read access to active jobs"
ON jobs FOR SELECT
USING (status = 'active');

-- 5. Create policy to allow service role full access
CREATE POLICY "Allow service role full access to jobs"
ON jobs FOR ALL
USING (true);

-- 6. Add index on applications table for job_code (if not exists)
CREATE INDEX IF NOT EXISTS idx_applications_job_code ON applications(job_code);

-- Done! Your database is ready.


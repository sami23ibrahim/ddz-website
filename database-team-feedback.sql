-- Team Feedback Table - Anonymous Complaining System
-- Run this SQL in your Supabase SQL Editor

-- Create team_feedback table
CREATE TABLE IF NOT EXISTS team_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  author_name TEXT, -- NULL for anonymous, or real name if provided
  is_anonymous BOOLEAN DEFAULT true,
  is_positive BOOLEAN DEFAULT false, -- true = positive (green), false = negative/complaint (red)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries (newest first)
CREATE INDEX IF NOT EXISTS idx_team_feedback_created_at ON team_feedback(created_at DESC);

-- Add comment for clarity
COMMENT ON TABLE team_feedback IS 'Team-only anonymous feedback and complaints system';
COMMENT ON COLUMN team_feedback.is_positive IS 'true = positive feedback (green), false = complaint/negative (red)';
COMMENT ON COLUMN team_feedback.is_anonymous IS 'true = anonymous, false = author_name provided';
COMMENT ON COLUMN team_feedback.author_name IS 'NULL if anonymous, otherwise the real name of the author';

-- Enable Row Level Security (RLS) - allow all reads and inserts (public access for team)
ALTER TABLE team_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read feedback (team members can view)
CREATE POLICY "Allow public read access" ON team_feedback
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to insert feedback (team members can submit)
CREATE POLICY "Allow public insert access" ON team_feedback
  FOR INSERT
  WITH CHECK (true);

-- Done! Team feedback table is ready.
-- Access at: https://www.diedreizahnaerzte.berlin/secrets


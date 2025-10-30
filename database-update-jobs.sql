-- Update jobs table to add missing fields
-- Run this SQL in your Supabase SQL Editor

-- Add new columns to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS experience_level TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS responsibilities TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS requirements TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS benefits TEXT[];

-- Add some default values for existing jobs
UPDATE jobs 
SET 
  experience_level = 'All levels',
  department = 'Healthcare'
WHERE experience_level IS NULL;

-- Done! Your jobs table now has all the required fields.

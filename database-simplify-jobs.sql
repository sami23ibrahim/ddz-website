-- Simplify Jobs Table - Remove Multilingual Fields
-- Run this SQL in your Supabase SQL Editor

-- 1. Remove multilingual columns from jobs table
ALTER TABLE jobs 
DROP COLUMN IF EXISTS title_ar,
DROP COLUMN IF EXISTS title_de, 
DROP COLUMN IF EXISTS title_tr,
DROP COLUMN IF EXISTS description_ar,
DROP COLUMN IF EXISTS description_de,
DROP COLUMN IF EXISTS description_tr;

-- 2. Add comments for clarity
COMMENT ON COLUMN jobs.title IS 'Job title in any language (HR choice)';
COMMENT ON COLUMN jobs.description IS 'Job description in any language (HR choice)';

-- 3. Verify the simplified structure
-- The jobs table now has:
-- - id (UUID, primary key)
-- - job_code (TEXT, unique, required)
-- - title (TEXT, required) - any language
-- - description (TEXT, required) - any language  
-- - location (TEXT)
-- - type (TEXT)
-- - status (TEXT, default 'active')
-- - created_at (TIMESTAMP)
-- - experience_level (TEXT)
-- - department (TEXT)
-- - responsibilities (JSONB array)
-- - requirements (JSONB array)
-- - benefits (JSONB array)

-- Done! Jobs table is now simplified for single-language input.

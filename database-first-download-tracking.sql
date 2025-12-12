-- First Download Tracking ONLY
-- Run this SQL in your Supabase SQL Editor to add FIXED first download tracking

-- 1. Add new columns to track FIRST download times (NEVER changes)
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS first_cv_downloaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS first_cover_downloaded_at TIMESTAMP WITH TIME ZONE;

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_first_cv_downloaded ON applications(first_cv_downloaded_at);
CREATE INDEX IF NOT EXISTS idx_applications_first_cover_downloaded ON applications(first_cover_downloaded_at);

-- 3. For EXISTING applications that were already downloaded, set first download time
-- (We don't have historical data, so we assume the existing download time was the first)
UPDATE applications
SET first_cv_downloaded_at = cv_downloaded_at
WHERE cv_downloaded_at IS NOT NULL AND first_cv_downloaded_at IS NULL;

UPDATE applications
SET first_cover_downloaded_at = cover_downloaded_at
WHERE cover_downloaded_at IS NOT NULL AND first_cover_downloaded_at IS NULL;

-- 4. Add comments for documentation
COMMENT ON COLUMN applications.first_cv_downloaded_at IS 'Timestamp when CV was FIRST downloaded by HR (FIXED - never changes)';
COMMENT ON COLUMN applications.first_cover_downloaded_at IS 'Timestamp when cover letter was FIRST downloaded by HR (FIXED - never changes)';

-- Done! Now only FIRST download times are tracked - they never change on re-downloads!

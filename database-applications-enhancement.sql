-- HR Dashboard Applications Enhancement
-- Run this SQL in your Supabase SQL Editor to add new features

-- 1. Add new columns to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS cv_downloaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cover_downloaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS starred BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_starred ON applications(starred);
CREATE INDEX IF NOT EXISTS idx_applications_cv_downloaded ON applications(cv_downloaded_at);
CREATE INDEX IF NOT EXISTS idx_applications_last_updated ON applications(last_updated);

-- 3. Create trigger to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger
DROP TRIGGER IF EXISTS applications_updated_at_trigger ON applications;
CREATE TRIGGER applications_updated_at_trigger
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_applications_updated_at();

-- 5. Update existing applications to have proper status
-- Change 'new' status to be more descriptive
UPDATE applications 
SET status = 'new' 
WHERE status IS NULL OR status = '';

-- 6. Add comments for documentation
COMMENT ON COLUMN applications.cv_downloaded_at IS 'Timestamp when CV was first downloaded by HR';
COMMENT ON COLUMN applications.cover_downloaded_at IS 'Timestamp when cover letter was first downloaded by HR';
COMMENT ON COLUMN applications.starred IS 'Whether application is starred/highlighted by HR';
COMMENT ON COLUMN applications.notes IS 'HR notes about the application';
COMMENT ON COLUMN applications.last_updated IS 'Automatically updated timestamp for any changes';

-- Done! Applications table now supports:
-- - Download tracking (cv_downloaded_at, cover_downloaded_at)
-- - Starring system (starred)
-- - Notes system (notes)
-- - Automatic status updates based on downloads
-- - Last updated tracking

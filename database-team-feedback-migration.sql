-- Migration Script: Update team_feedback table to support Neutral option
-- Run this ONLY if you already created the table with the old schema (is_positive column)
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Add the new feedback_type column
ALTER TABLE team_feedback 
  ADD COLUMN IF NOT EXISTS feedback_type TEXT DEFAULT 'complaint';

-- Step 2: Migrate existing data from is_positive to feedback_type
UPDATE team_feedback 
SET feedback_type = CASE 
  WHEN is_positive = true THEN 'positive' 
  ELSE 'complaint' 
END 
WHERE feedback_type IS NULL OR feedback_type = 'complaint';

-- Step 3: Remove the old is_positive column (optional - you can keep it for backup)
-- Uncomment the line below if you want to remove the old column:
-- ALTER TABLE team_feedback DROP COLUMN IF EXISTS is_positive;

-- Step 4: Update comments
COMMENT ON COLUMN team_feedback.feedback_type IS 'Type of feedback: positive (green), neutral (gray), or complaint (red)';

-- Done! Your table now supports Positive, Neutral, and Complaint options.


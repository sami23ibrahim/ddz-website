# HR DASHBOARD & JOB MANAGEMENT SYSTEM - IMPLEMENTATION PLAN

## Overview
Building a complete HR management system where HR can post/delete jobs, and view applications for each job. Users can see posted jobs and submit applications. HR can download CVs and cover letters.

---

## PHASE 1: DATABASE SETUP

### ✅ Step 1: Create 'jobs' table in Supabase
**Status:** 🟡 In Progress - USER NEEDS TO RUN SQL

**Database Schema:**
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Notes:**
- 

---

## PHASE 2: BACKEND API ENDPOINTS

### ✅ Step 2: Create /api/get-jobs.mjs
**Status:** 🟢 Completed

**Purpose:** Fetch all active jobs from database

**Endpoint:** `GET /api/get-jobs`

**Response:**
```json
{
  "jobs": [
    {
      "id": "uuid",
      "job_code": "DA-2025-01",
      "title": "Dental Assistant",
      "description": "...",
      "location": "Berlin",
      "type": "Full-time",
      "created_at": "2025-01-01"
    }
  ]
}
```

**Notes:**
- 

---

### ✅ Step 3: Create /api/create-job.mjs
**Status:** 🟢 Completed

**Purpose:** Insert new job into database

**Endpoint:** `POST /api/create-job`

**Request Body:**
```json
{
  "job_code": "DA-2025-02",
  "title": "Dental Assistant",
  "title_ar": "مساعد أسنان",
  "title_de": "Zahnarzthelfer",
  "title_tr": "Diş Asistanı",
  "description": "...",
  "description_ar": "...",
  "description_de": "...",
  "description_tr": "...",
  "location": "Berlin",
  "type": "Full-time"
}
```

**Notes:**
- 

---

### ✅ Step 4: Create /api/delete-job.mjs
**Status:** 🟢 Completed

**Purpose:** Delete job by ID or set status to 'inactive'

**Endpoint:** `DELETE /api/delete-job`

**Request Body:**
```json
{
  "job_id": "uuid"
}
```

**Notes:**
- Consider soft delete (set status='inactive') vs hard delete
- 

---

### ✅ Step 5: Create /api/get-applications.mjs
**Status:** 🟢 Completed

**Purpose:** Get applications filtered by job_code with counts

**Endpoint:** `GET /api/get-applications?job_code=DA-2025-01`

**Response:**
```json
{
  "applications": [
    {
      "id": "uuid",
      "job_code": "DA-2025-01",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "123456789",
      "storage_path": "applications/DA-2025-01/uuid/cv.pdf",
      "cover_path": "applications/DA-2025-01/uuid/cover.pdf",
      "status": "submitted",
      "created_at": "2025-01-15"
    }
  ],
  "count": 5
}
```

**Notes:**
- 

---

### ✅ Step 6: Create /api/download-cv.mjs
**Status:** 🟢 Completed

**Purpose:** Generate signed URLs for downloading CVs/cover letters from storage

**Endpoint:** `POST /api/download-cv`

**Request Body:**
```json
{
  "file_path": "applications/DA-2025-01/uuid/cv.pdf"
}
```

**Response:**
```json
{
  "url": "https://supabase-signed-url...",
  "expires_in": 3600
}
```

**Notes:**
- 

---

## PHASE 3: HR DASHBOARD FRONTEND

### ✅ Step 7: Create HRDashboard.js page
**Status:** 🟢 Completed

**Purpose:** Main dashboard showing all jobs with application counts

**Location:** `src/pages/HRDashboard.js`

**Features:**
- List all jobs
- Show application count for each job
- Button to create new job
- Button to delete job
- Click job to view applications

**Notes:**
- 

---

### ✅ Step 8: Create JobForm component
**Status:** 🟢 Completed

**Purpose:** Form for HR to post new jobs (with multilingual fields)

**Location:** `src/Components/JobForm.js`

**Features:**
- Input fields for all languages (EN, AR, DE, TR)
- Job code input
- Location and type dropdowns
- Submit button

**Notes:**
- 

---

### ✅ Step 9: Create ApplicationsList component
**Status:** 🟢 Completed

**Purpose:** Display applications for each job with download buttons

**Location:** `src/Components/ApplicationsList.js`

**Features:**
- Table showing all applications for selected job
- Download CV button
- Download cover letter button (if exists)
- Show applicant details (name, email, phone, date)
- Show status

**Notes:**
- 

---

### ✅ Step 10: Add /hr-admin route to App.js
**Status:** 🟢 Completed

**Purpose:** Make HR Dashboard accessible via route

**Changes:**
```javascript
import HRDashboard from './pages/HRDashboard';

<Route path="/hr-admin" element={<HRDashboard />} />
```

**Notes:**
- 

---

## PHASE 4: UPDATE EXISTING PAGES

### ✅ Step 11: Update Jobs page to fetch from database
**Status:** 🟢 Completed

**Purpose:** Replace static jobContent.js with dynamic data from database

**Location:** `src/pages/Jobs.js` or `src/pages/JobsPage.jsx`

**Changes:**
- Remove import of jobContent.js
- Add useEffect to fetch jobs from /api/get-jobs
- Update state management

**Notes:**
- 

---

## PHASE 5: SECURITY & TESTING

### ✅ Step 12: Add password protection for HR Dashboard (OPTIONAL)
**Status:** 🔴 Not Started

**Options:**
1. Simple password check (localStorage)
2. Basic auth
3. Full authentication system

**Notes:**
- 

---

### ✅ Step 13: Test complete flow
**Status:** 🔴 Not Started

**Test Cases:**
1. HR posts a new job → Job appears in database
2. Job appears on public jobs page
3. User submits application → Application saved with files
4. HR sees application in dashboard
5. HR can download CV and cover letter
6. HR can delete job

**Notes:**
- 

---

## Progress Tracking

- **Total Steps:** 13
- **Completed:** 10
- **In Progress:** 1
- **Not Started:** 2
- **Last Updated:** 2025-10-28

---

## Notes & Issues

### General Notes:
- Current applications table already has job_code field ✅
- Current storage structure: `applications/{job_code}/{uuid}/cv.pdf` ✅
- Website supports 4 languages: EN, AR, DE, TR

### Issues Encountered:
- None yet

### Future Enhancements:
- Email notifications to HR when new application submitted
- Status updates (new, reviewed, rejected, hired)
- Search/filter applications
- Export applications to CSV
- Analytics dashboard


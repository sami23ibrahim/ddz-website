// src/pages/HRDashboard.js
import { useState, useEffect } from 'react';
import JobForm from '../Components/JobForm';
import ApplicationsList from '../Components/ApplicationsList';

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('jobs'); // 'jobs' or 'applications'

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/get-job-applications-count');
      const result = await response.json();

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setJobs(result.jobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId, jobCode) => {
    if (!window.confirm(`Are you sure you want to delete job ${jobCode}?`)) {
      return;
    }

    try {
      const response = await fetch('/api/delete-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: jobId })
      });

      const result = await response.json();

      if (!result.ok) {
        alert(`Error: ${result.error}`);
        return;
      }

      alert('Job deleted successfully!');
      fetchJobs();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleJobCreated = (newJob) => {
    setShowJobForm(false);
    fetchJobs();
  };

  const handleViewApplications = (job) => {
    setSelectedJob(job);
    setView('applications');
  };

  const handleBackToJobs = () => {
    setView('jobs');
    setSelectedJob(null);
  };

  if (showJobForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <JobForm 
          onJobCreated={handleJobCreated}
          onCancel={() => setShowJobForm(false)}
        />
      </div>
    );
  }

  if (view === 'applications' && selectedJob) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBackToJobs}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Jobs
        </button>
        <ApplicationsList 
          jobCode={selectedJob.job_code}
          jobTitle={selectedJob.title}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <button
            onClick={() => setShowJobForm(true)}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            + Post New Job
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">Loading jobs...</div>
        )}

        {error && (
          <div className="text-red-600 py-4">Error: {error}</div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No jobs posted yet. Click "Post New Job" to create one.
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.job_code}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteJob(job.id, job.job_code)}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Delete job"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <p>{job.location || 'No location'} • {job.type || 'N/A'}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Posted: {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="border-t pt-3">
                    <button
                      onClick={() => handleViewApplications(job)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Applications ({job.application_count || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={fetchJobs}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}


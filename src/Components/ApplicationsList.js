// src/Components/ApplicationsList.js
import { useState, useEffect } from 'react';

export default function ApplicationsList({ jobCode, jobTitle }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingFile, setDownloadingFile] = useState('');
  const [editingNotes, setEditingNotes] = useState('');
  const [notesText, setNotesText] = useState('');

  useEffect(() => {
    if (jobCode) {
      fetchApplications();
    }
  }, [jobCode]);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/applications?action=get&job_code=${jobCode}`);
      const result = await response.json();

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setApplications(result.applications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filePath, fileName, applicationId, fileType) => {
    if (!filePath) return;
    
    setDownloadingFile(filePath);
    
    try {
      const response = await fetch('/api/download-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          file_path: filePath,
          application_id: applicationId,
          file_type: fileType
        })
      });

      const result = await response.json();

      if (!result.ok) {
        alert(`Download failed: ${result.error}`);
        return;
      }

      // Open the signed URL in a new tab
      window.open(result.url, '_blank');
      
      // Refresh applications to show updated status
      setTimeout(() => {
        fetchApplications();
      }, 1000);
    } catch (err) {
      alert(`Download error: ${err.message}`);
    } finally {
      setDownloadingFile('');
    }
  };

  const handleToggleStar = async (applicationId) => {
    try {
      const response = await fetch('/api/application-management?action=toggle-star', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: applicationId })
      });

      const result = await response.json();

      if (!result.ok) {
        alert(`Error: ${result.error}`);
        return;
      }

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, starred: result.starred }
          : app
      ));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleNotesEdit = (applicationId, currentNotes) => {
    setEditingNotes(applicationId);
    setNotesText(currentNotes || '');
  };

  const handleNotesSave = async (applicationId) => {
    try {
      const response = await fetch('/api/application-management?action=update-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          application_id: applicationId,
          notes: notesText
        })
      });

      const result = await response.json();

      if (!result.ok) {
        alert(`Error: ${result.error}`);
        return;
      }

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, notes: notesText }
          : app
      ));

      setEditingNotes('');
      setNotesText('');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleNotesCancel = () => {
    setEditingNotes('');
    setNotesText('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-4">Error: {error}</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No applications yet for this job.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Applications for {jobTitle} ({applications.length})
        </h2>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-center p-3">⭐</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Status</th>
              <th className="text-center p-3">CV</th>
              <th className="text-center p-3">Cover Letter</th>
              <th className="text-center p-3">Keep on File</th>
              <th className="text-left p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className={`border-b hover:bg-gray-50 ${app.starred ? 'bg-yellow-50' : ''}`}>
                {/* Star Column */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggleStar(app.id)}
                    className={`text-xl hover:scale-110 transition-transform ${
                      app.starred ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    title={app.starred ? 'Remove star' : 'Add star'}
                  >
                    ⭐
                  </button>
                </td>
                
                {/* Date Column */}
                <td className="p-3 text-sm">
                  {formatDate(app.created_at)}
                </td>
                
                {/* Name Column */}
                <td className="p-3 font-semibold">{app.full_name}</td>
                
                {/* Email Column */}
                <td className="p-3 text-sm">{app.email}</td>
                
                {/* Phone Column */}
                <td className="p-3 text-sm">{app.phone || '-'}</td>
                
                {/* Status Column - Enhanced Logic */}
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    app.status === 'new' ? 'bg-green-100 text-green-800' :
                    app.status === 'downloaded' ? 'bg-red-100 text-red-800' :
                    app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'rejected' ? 'bg-gray-100 text-gray-800' :
                    app.status === 'hired' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                  {(app.cv_downloaded_at || app.cover_downloaded_at) && (
                    <div className="text-xs text-gray-500 mt-1">
                      Downloaded: {formatDate(app.cv_downloaded_at || app.cover_downloaded_at)}
                    </div>
                  )}
                </td>
                
                {/* CV Column */}
                <td className="p-3 text-center">
                  {app.storage_path ? (
                    <button
                      onClick={() => handleDownload(app.storage_path, 'CV', app.id, 'cv')}
                      disabled={downloadingFile === app.storage_path}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {downloadingFile === app.storage_path ? 'Loading...' : 'Download'}
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                
                {/* Cover Letter Column */}
                <td className="p-3 text-center">
                  {app.cover_path ? (
                    <button
                      onClick={() => handleDownload(app.cover_path, 'Cover', app.id, 'cover')}
                      disabled={downloadingFile === app.cover_path}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {downloadingFile === app.cover_path ? 'Loading...' : 'Download'}
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                
                {/* Keep on File Column */}
                <td className="p-3 text-center">
                  {app.keep_on_file ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                
                {/* Notes Column */}
                <td className="p-3">
                  {editingNotes === app.id ? (
                    <div className="flex flex-col space-y-2">
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        className="w-full p-2 border rounded text-sm resize-none"
                        rows="2"
                        placeholder="Add notes..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNotesSave(app.id)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleNotesCancel}
                          className="px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleNotesEdit(app.id, app.notes)}
                      className="cursor-pointer min-h-[20px] p-1 rounded hover:bg-gray-100"
                      title="Click to edit notes"
                    >
                      {app.notes ? (
                        <span className="text-sm">{app.notes}</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Click to add notes...</span>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


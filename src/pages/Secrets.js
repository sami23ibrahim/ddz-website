import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Components/Navbar';

export default function Secrets() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [message, setMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isPositive, setIsPositive] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team-feedback?action=list');
      const result = await response.json();

      if (!result.ok) {
        setError(result.error || 'Failed to load feedback');
        return;
      }

      setFeedback(result.feedback || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/team-feedback?action=submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          author_name: isAnonymous ? null : authorName.trim(),
          is_anonymous: isAnonymous,
          is_positive: isPositive
        })
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.error || 'Failed to submit feedback');
        return;
      }

      setSuccess('Feedback submitted successfully!');
      setMessage('');
      setAuthorName('');
      setIsAnonymous(true);
      setIsPositive(false);
      
      // Refresh the feedback list
      await fetchFeedback();
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Team Secrets - Die Drei Zahnärzte</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      <div className="min-h-screen bg-[#e8e2d4] py-16 px-4 pt-24">
        <div className="container mx-auto max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#422f40] mb-4">
              Team Secrets
            </h1>
            <p className="text-lg text-[#422f40] max-w-2xl mx-auto">
              Share your thoughts, feedback, or concerns. Anonymous or with your name - your choice.
            </p>
          </div>

          {/* Submit Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#422f40] mb-6">Share Your Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#422f40] mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#422f40] focus:border-transparent resize-none"
                  placeholder="Write your feedback, complaint, or suggestion here..."
                  required
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => {
                    setIsAnonymous(e.target.checked);
                    if (e.target.checked) {
                      setAuthorName('');
                    }
                  }}
                  className="w-5 h-5 text-[#422f40] border-gray-300 rounded focus:ring-[#422f40]"
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-[#422f40]">
                  Post anonymously
                </label>
              </div>

              {/* Name Input (if not anonymous) */}
              {!isAnonymous && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#422f40] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#422f40] focus:border-transparent"
                    placeholder="Enter your name (optional)"
                  />
                </div>
              )}

              {/* Positive/Negative Toggle */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-[#422f40]">Type:</span>
                <button
                  type="button"
                  onClick={() => setIsPositive(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isPositive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                  }`}
                >
                  Positive
                </button>
                <button
                  type="button"
                  onClick={() => setIsPositive(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !isPositive
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                  }`}
                >
                  Complaint
                </button>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full bg-[#422f40] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5a3f57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          {/* Feedback Feed */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#422f40] mb-6">Recent Feedback</h2>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#422f40]">Loading feedback...</p>
              </div>
            ) : feedback.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#422f40]">No feedback yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      item.is_positive
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              item.is_positive
                                ? 'bg-green-200 text-green-800'
                                : 'bg-red-200 text-red-800'
                            }`}
                          >
                            {item.is_positive ? 'Positive' : 'Complaint'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {item.is_anonymous ? 'Anonymous' : item.author_name || 'Anonymous'}
                          </span>
                        </div>
                        <p className="text-[#422f40] whitespace-pre-wrap">{item.message}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


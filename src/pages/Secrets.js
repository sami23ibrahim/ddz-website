import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Components/Navbar';

export default function Secrets() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form state
  const [message, setMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [feedbackType, setFeedbackType] = useState('complaint'); // 'positive', 'neutral', or 'complaint'

  // Check if already logged in on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('secrets_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedback();
    }
  }, [isAuthenticated]);

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = '10999';
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('secrets_authenticated', 'true');
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

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
          feedback_type: feedbackType
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
      setFeedbackType('complaint');
      
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

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Team Secrets - Die Drei Zahnärzte</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <Navbar />
        <div className="min-h-screen bg-[#e8e2d4] flex items-center justify-center px-4 pt-20 sm:pt-24">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#422f40] mb-4 text-center">
              Team Access
            </h2>
            <p className="text-sm sm:text-base text-[#422f40] mb-6 text-center">
              Please enter the password to access this page.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#422f40] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#422f40] focus:border-transparent"
                  placeholder="Enter password"
                  required
                  autoFocus
                />
              </div>
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#422f40] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5a3f57] transition-colors"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Team Secrets - Die Drei Zahnärzte</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      <div className="min-h-screen bg-[#e8e2d4] py-8 sm:py-16 px-4 pt-20 sm:pt-24">
        <div className="container mx-auto max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#422f40] mb-3 sm:mb-4 px-2">
              die drei zahnaerzte und Team
            </h1>
            <p className="text-base sm:text-lg text-[#422f40] max-w-2xl mx-auto px-4 leading-relaxed">
              This space is for our team — a place to speak freely, safely, and anonymously.
              <br />
              <br />
              Let's be kind, respectful, and supportive as we build a better workplace for everyone. ❤️
            </p>
          </div>

          {/* Submit Form */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#422f40] mb-4 sm:mb-6">Share Your Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#422f40] focus:border-transparent resize-none"
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
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#422f40] border-gray-300 rounded focus:ring-[#422f40] cursor-pointer"
                />
                <label htmlFor="anonymous" className="text-sm sm:text-base font-medium text-[#422f40] cursor-pointer">
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#422f40] focus:border-transparent"
                    placeholder="Enter your name (optional)"
                  />
                </div>
              )}

              {/* Feedback Type Selection - Mobile Friendly */}
              <div>
                <label className="block text-sm font-medium text-[#422f40] mb-3">Type:</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('positive')}
                    className={`flex-1 min-w-[100px] sm:flex-none sm:px-4 sm:py-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      feedbackType === 'positive'
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-100 active:bg-green-200'
                    }`}
                  >
                    Positive
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('neutral')}
                    className={`flex-1 min-w-[100px] sm:flex-none sm:px-4 sm:py-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      feedbackType === 'neutral'
                        ? 'bg-gray-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
                    }`}
                  >
                    Neutral
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('complaint')}
                    className={`flex-1 min-w-[100px] sm:flex-none sm:px-4 sm:py-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      feedbackType === 'complaint'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-red-100 active:bg-red-200'
                    }`}
                  >
                    Complaint
                  </button>
                </div>
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
                className="w-full bg-[#422f40] text-white py-3 sm:py-3.5 px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#5a3f57] active:bg-[#4a3548] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          {/* Feedback Feed */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#422f40] mb-4 sm:mb-6">Recent Feedback</h2>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#422f40] text-sm sm:text-base">Loading feedback...</p>
              </div>
            ) : feedback.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#422f40] text-sm sm:text-base">No feedback yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {feedback.map((item) => {
                  const type = item.feedback_type || (item.is_positive ? 'positive' : 'complaint');
                  const typeConfig = {
                    positive: {
                      bg: 'bg-green-50',
                      border: 'border-green-500',
                      badge: 'bg-green-200 text-green-800',
                      label: 'Positive'
                    },
                    neutral: {
                      bg: 'bg-gray-50',
                      border: 'border-gray-400',
                      badge: 'bg-gray-200 text-gray-800',
                      label: 'Neutral'
                    },
                    complaint: {
                      bg: 'bg-red-50',
                      border: 'border-red-500',
                      badge: 'bg-red-200 text-red-800',
                      label: 'Complaint'
                    }
                  };
                  const config = typeConfig[type] || typeConfig.complaint;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-lg border-l-4 ${config.bg} ${config.border}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${config.badge}`}
                            >
                              {config.label}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600">
                              {item.is_anonymous ? 'Anonymous' : item.author_name || 'Anonymous'}
                            </span>
                          </div>
                          <p className="text-[#422f40] text-sm sm:text-base whitespace-pre-wrap break-words">{item.message}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


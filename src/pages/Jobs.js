import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";

const Jobs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs?action=list');
      const result = await response.json();

      if (!result.ok) {
        setError(result.error);
        return;
      }

      // Map database jobs to display format
      const mappedJobs = result.jobs.map(job => ({
        key: job.job_code,
        code: job.job_code,
        title: job.title,
        description: job.description,
        location: job.location || 'Berlin-Kreuzberg',
        type: job.type || 'Vollzeit',
        department: job.department || 'Gesundheitswesen',
        experience: job.experience_level || 'Alle Level',
        postedDate: job.created_at
      }));

      setJobs(mappedJobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Career Opportunities - Die Drei Zahnärzte</title>
        <meta name="description" content="Join our team at Die Drei Zahnärzte. Explore career opportunities in dental care, administration, and support roles in Berlin-Kreuzberg." />
        <meta property="og:title" content="Career Opportunities - Die Drei Zahnärzte" />
        <meta property="og:description" content="Join our team at Die Drei Zahnärzte. Explore career opportunities in dental care, administration, and support roles in Berlin-Kreuzberg." />
        <meta property="og:image" content="/Assets/logo2.png" />
      </Helmet>
      
      <Navbar />
      <div className="min-h-screen bg-[#e8e2d4] py-16 px-4 pt-24 overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#422f40] mb-6 text-center break-words px-2">
              {t('jobs.title', 'Career Opportunities')}
            </h1>
            <p className={`text-lg sm:text-xl text-[#422f40] max-w-3xl mx-auto leading-relaxed text-center px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('jobs.subtitle', 'Join our team at Die Drei Zahnärzte and be part of providing exceptional dental care in Berlin-Kreuzberg.')}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-xl text-[#422f40]">Loading opportunities...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-xl text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Job Listings */}
          {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Link
                key={job.key}
                to={`/jobs/${job.key}`}
                className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Job Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#422f40] mb-2 group-hover:text-[#5a3d54] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{job.type}</span>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#422f40] text-white text-xs rounded-full">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                        {job.experience}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Veröffentlicht: {new Date(job.postedDate).toLocaleDateString()}</span>
                    <span className="text-[#422f40] font-semibold group-hover:text-[#5a3d54] transition-colors">
                      Details ansehen →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* No Jobs Message */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-[#422f40] mb-4">
                {t('jobs.no_positions', 'No positions available at the moment')}
              </h3>
              <p className="text-gray-600">
                {t('jobs.check_back', 'Please check back later for new opportunities.')}
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Jobs; 
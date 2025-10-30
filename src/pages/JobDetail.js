import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import ApplyForm from "../Components/ApplyForm";

const JobDetail = () => {
  const { slug } = useParams(); // This is the job_code
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      const response = await fetch('/api/jobs?action=list');
      const result = await response.json();

      if (!result.ok) {
        setError(result.error);
        return;
      }

      // Debug: Log what we're looking for and what we found
      console.log('Looking for job_code:', slug);
      console.log('Available jobs:', result.jobs.map(j => ({ job_code: j.job_code, title: j.title })));

      // Find the job with matching job_code
      const foundJob = result.jobs.find(j => j.job_code === slug);
      
      if (!foundJob) {
        setError(`Job not found. Looking for job_code: ${slug}`);
        return;
      }

      // Map database job to display format
      const mappedJob = {
        code: foundJob.job_code,
        title: getTitleByLanguage(foundJob, i18n.language),
        description: getDescriptionByLanguage(foundJob, i18n.language),
        location: foundJob.location || 'Berlin-Kreuzberg',
        type: foundJob.type || 'Full-time',
        department: foundJob.department || 'Healthcare',
        experience: foundJob.experience_level || 'All levels',
        postedDate: foundJob.created_at,
        responsibilities: foundJob.responsibilities && foundJob.responsibilities.length > 0 
          ? foundJob.responsibilities.filter(r => r.trim() !== '')
          : ['Provide excellent patient care', 'Maintain professional standards'],
        requirements: foundJob.requirements && foundJob.requirements.length > 0 
          ? foundJob.requirements.filter(r => r.trim() !== '')
          : ['Relevant qualifications in the field', 'Strong communication skills'],
        benefits: foundJob.benefits && foundJob.benefits.length > 0 
          ? foundJob.benefits.filter(b => b.trim() !== '')
          : ['Competitive salary', 'Professional development opportunities']
      };

      setJob(mappedJob);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTitleByLanguage = (job, lang) => {
    switch (lang) {
      case 'ar': return job.title_ar || job.title;
      case 'de': return job.title_de || job.title;
      case 'tr': return job.title_tr || job.title;
      default: return job.title;
    }
  };

  const getDescriptionByLanguage = (job, lang) => {
    switch (lang) {
      case 'ar': return job.description_ar || job.description;
      case 'de': return job.description_de || job.description;
      case 'tr': return job.description_tr || job.description;
      default: return job.description;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8e2d4]">
        <p className="text-xl text-[#422f40]">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8e2d4]">
        <h1 className="text-4xl font-bold text-[#422f40] mb-6">Job Not Found</h1>
        <p className="text-xl text-[#422f40] mb-8">The job you're looking for doesn't exist.</p>
        <Link 
          to="/jobs" 
          className="bg-[#422f40] hover:bg-[#5a3d54] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }


  return (
    <>
      <Helmet>
        <title>{job.title} - Die Drei Zahnärzte</title>
        <meta name="description" content={`Apply for ${job.title} position at Die Drei Zahnärzte in Berlin-Kreuzberg. ${job.description}`} />
        <meta property="og:title" content={`${job.title} - Die Drei Zahnärzte`} />
        <meta property="og:description" content={`Apply for ${job.title} position at Die Drei Zahnärzte in Berlin-Kreuzberg.`} />
        <meta property="og:image" content="/Assets/logo2.png" />
      </Helmet>

      <div className="min-h-screen bg-[#e8e2d4] py-16 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/jobs" 
              className="inline-flex items-center text-[#422f40] hover:text-[#5a3d54] transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Jobs
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                {/* Job Header */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-[#422f40] mb-4">{job.title}</h1>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#422f40] text-white text-sm rounded-full">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#422f40] mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#422f40] mb-4">Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#422f40] mb-4">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#422f40] mb-4">Benefits</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-[#422f40] mb-6">Apply Now</h2>
                <ApplyForm initialJobCode={job.code} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;

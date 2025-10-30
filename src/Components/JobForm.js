// src/Components/JobForm.js
import { useState } from 'react';

export default function JobForm({ onJobCreated, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [formData, setFormData] = useState({
    job_code: '',
    title: '',
    title_ar: '',
    title_de: '',
    title_tr: '',
    description: '',
    description_ar: '',
    description_de: '',
    description_tr: '',
    location: '',
    type: 'Full-time'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await fetch('/api/create-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!result.ok) {
        setMsg(`Error: ${result.error}`);
        setLoading(false);
        return;
      }

      setMsg('✅ Job posted successfully!');
      setTimeout(() => {
        if (onJobCreated) onJobCreated(result.job);
      }, 1000);
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post New Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Code and Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Job Code *</label>
            <input
              type="text"
              name="job_code"
              value={formData.job_code}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="e.g., DA-2025-01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="e.g., Berlin"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Job Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* English */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">English *</h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Job title in English"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows="4"
                placeholder="Job description in English"
                required
              />
            </div>
          </div>
        </div>

        {/* Arabic */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-green-600">Arabic (العربية)</h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1">العنوان</label>
              <input
                type="text"
                name="title_ar"
                value={formData.title_ar}
                onChange={handleChange}
                className="border p-2 w-full rounded text-right"
                placeholder="عنوان الوظيفة بالعربية"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1">الوصف</label>
              <textarea
                name="description_ar"
                value={formData.description_ar}
                onChange={handleChange}
                className="border p-2 w-full rounded text-right"
                rows="4"
                placeholder="وصف الوظيفة بالعربية"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* German */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-yellow-600">German (Deutsch)</h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1">Titel</label>
              <input
                type="text"
                name="title_de"
                value={formData.title_de}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Berufsbezeichnung auf Deutsch"
              />
            </div>
            <div>
              <label className="block mb-1">Beschreibung</label>
              <textarea
                name="description_de"
                value={formData.description_de}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows="4"
                placeholder="Stellenbeschreibung auf Deutsch"
              />
            </div>
          </div>
        </div>

        {/* Turkish */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-red-600">Turkish (Türkçe)</h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1">Başlık</label>
              <input
                type="text"
                name="title_tr"
                value={formData.title_tr}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Türkçe iş unvanı"
              />
            </div>
            <div>
              <label className="block mb-1">Açıklama</label>
              <textarea
                name="description_tr"
                value={formData.description_tr}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows="4"
                placeholder="Türkçe iş açıklaması"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 border-t pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>

        {msg && (
          <p className={`text-sm ${msg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}


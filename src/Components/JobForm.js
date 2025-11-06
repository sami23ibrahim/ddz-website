// src/Components/JobForm.js
import { useState } from 'react';

export default function JobForm({ onJobCreated, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [formData, setFormData] = useState({
    job_code: '',
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    experience_level: 'All levels',
    department: 'Healthcare',
    responsibilities: [''],
    requirements: [''],
    benefits: ['']
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : ['']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await fetch('/api/jobs?action=create', {
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
      <h2 className="text-2xl font-bold mb-6">Neue Stelle erstellen</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Code and Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Stellencode *</label>
            <input
              type="text"
              name="job_code"
              value={formData.job_code}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="z.B. DA-2025-01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Standort</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="z.B. Berlin"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Beschäftigungsart</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="Vollzeit">Vollzeit</option>
              <option value="Teilzeit">Teilzeit</option>
              <option value="Befristet">Befristet</option>
              <option value="Praktikum">Praktikum</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Erfahrungslevel</label>
            <input
              type="text"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="z.B. Berufseinsteiger, Erfahren, Senior, Alle Level"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Abteilung</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="z.B. Gesundheitswesen, Verwaltung, Rezeption, Management"
          />
        </div>

        {/* Title and Description */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">Stellendetails</h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold">Stellentitel *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Stellentitel (in beliebiger Sprache)"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Stellenbeschreibung *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows="6"
                placeholder="Detaillierte Stellenbeschreibung (in beliebiger Sprache)"
                required
              />
            </div>
          </div>
        </div>

        {/* Job Details Arrays */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-purple-600">Weitere Details</h3>
          
          {/* Responsibilities */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Aufgaben</label>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                  className="border p-2 flex-1 rounded"
                  placeholder={`Aufgabe ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('responsibilities', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={formData.responsibilities.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              + Aufgabe hinzufügen
            </button>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Anforderungen</label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  className="border p-2 flex-1 rounded"
                  placeholder={`Anforderung ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('requirements', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={formData.requirements.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              + Anforderung hinzufügen
            </button>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Vorteile</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  className="border p-2 flex-1 rounded"
                  placeholder={`Vorteil ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('benefits', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={formData.benefits.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              + Vorteil hinzufügen
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 border-t pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Wird erstellt...' : 'Stelle erstellen'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Abbrechen
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


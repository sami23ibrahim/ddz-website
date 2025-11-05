// src/components/ApplyForm.jsx
import { useState, useEffect } from 'react';

export default function ApplyForm({ jobCode: initialJobCode }) {
  const [jobCode, setJobCode] = useState(initialJobCode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [keep, setKeep] = useState(false);
  const [cv, setCv] = useState(null);
  const [cover, setCover] = useState(null);
  const [cvError, setCvError] = useState('');
  const [coverError, setCoverError] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Update jobCode when initialJobCode prop changes
  useEffect(() => {
    setJobCode(initialJobCode);
  }, [initialJobCode]);

  // File validation helpers
  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file || !file.type) {
      return 'Invalid file selected';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'File must be a PDF, DOC, or DOCX';
    }

    if (file.size > maxSize) {
      return `File size must be 10MB or less (current: ${Math.round(file.size / 1024 / 1024)}MB)`;
    }

    if (file.size === 0) {
      return 'File appears to be empty';
    }

    return null;
  };

  const handleFileChange = (file, setter, errorSetter) => {
    if (file) {
      const error = validateFile(file);
      if (error) {
        errorSetter(error);
        setter(null);
      } else {
        errorSetter(null);
        setter(file);
      }
    } else {
      setter(null);
      errorSetter(null);
    }
  };

  async function initApplication(jobCode, cvFile, coverFile) {
    const r = await fetch('/api/applications?action=init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobCode,
        cvFile: { name: cvFile.name, size: cvFile.size, type: cvFile.type },
        coverFile: coverFile ? { name: coverFile.name, size: coverFile.size, type: coverFile.type } : null
      })
    });
    if (!r.ok) throw new Error('Init failed');
    return r.json();
  }
  async function uploadToSignedUrl(url, file) {
    try {
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

      const r = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!r.ok) {
        const errorText = await r.text();
        console.error('Upload failed:', r.status, errorText);
        throw new Error(`Upload failed: ${r.status} - ${errorText}`);
      }

      console.log('Upload successful');
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted! CV:', cv, 'JobCode:', jobCode);
    if (!cv) return setMsg('Please attach your CV.');
    setLoading(true); setMsg('');
  
    try {
      // 1) init
      const init = await initApplication(jobCode, cv, cover);
  
      // 2) upload (separate try so upload errors are clear)
      try {
        await uploadToSignedUrl(init.cv.url, cv);
        if (cover && init.cover?.url) {
          await uploadToSignedUrl(init.cover.url, cover);
        }
      } catch (uploadErr) {
        setMsg(`Upload failed: ${uploadErr?.message || 'unknown error'}`);
        setLoading(false);
        return;
      }
  
      // 3) save (separate so save errors are clear)
      const saveData = {
        applicationId: init.applicationId,
        jobCode,
        fullName,
        email,
        phone,
        keepOnFile: keep,
        cvPath: init.cv.path,
        coverPath: init.cover?.path || null
      };
      
      console.log('Submitting application with data:', saveData);
      
      const save = await fetch('/api/applications?action=save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      }).then(r => r.json());
  
      if (!save?.ok) {
        setMsg(`Save failed: ${save?.error || 'unknown error'}`);
        setLoading(false);
        return;
      }
  
      setMsg('✅ Application submitted. Thank you!');
      setFullName(''); setEmail(''); setPhone(''); setKeep(false);
      setCv(null); setCover(null);
    } catch (err) {
      setMsg(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3">
      <input className="border p-2 w-full" placeholder="Full name"
             value={fullName} onChange={e=>setFullName(e.target.value)} required />
      <input className="border p-2 w-full" type="email" placeholder="Email"
             value={email} onChange={e=>setEmail(e.target.value)} required />
      <input className="border p-2 w-full" placeholder="Phone"
             value={phone} onChange={e=>setPhone(e.target.value)} />
      {/* Hidden job code field - users should not edit this */}
      <input type="hidden" value={jobCode} />
      
      {/* Show job code for reference only (read-only) */}
      <div className="bg-gray-100 p-2 rounded border">
        <label className="block text-sm text-gray-600 mb-1">Applying for position:</label>
        <span className="font-medium">{jobCode}</span>
      </div>

      <div>
        <label className="block mb-1">CV (PDF/DOC) *</label>
        <input type="file" accept=".pdf,.doc,.docx"
               onChange={e => handleFileChange(e.target.files?.[0] || null, setCv, setCvError)} required />
        {cvError && <p className="text-red-500 text-sm mt-1">{cvError}</p>}
      </div>
      <div>
        <label className="block mb-1">Cover letter (optional)</label>
        <input type="file" accept=".pdf,.doc,.docx"
               onChange={e => handleFileChange(e.target.files?.[0] || null, setCover, setCoverError)} />
        {coverError && <p className="text-red-500 text-sm mt-1">{coverError}</p>}
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={keep} onChange={e=>setKeep(e.target.checked)} />
        Keep my application for 6 months (see Privacy Policy).
      </label>

      <button disabled={loading}
              className="px-4 py-2 rounded bg-black text-white w-full">
        {loading ? 'Submitting…' : 'Submit'}
      </button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}

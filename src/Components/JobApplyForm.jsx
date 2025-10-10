// src/components/ApplyForm.jsx
import { useState } from 'react';

export default function ApplyForm() {
  const [jobCode, setJobCode] = useState('DA-2025-01');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [keep, setKeep] = useState(false);
  const [cv, setCv] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function initApplication(jobCode, cvFile, coverFile) {
    const r = await fetch('/api/init-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobCode,
        cvFilename: cvFile?.name,
        coverFilename: coverFile?.name || null
      })
    });
    if (!r.ok) throw new Error('Init failed');
    return r.json();
  }
  async function uploadToSignedUrl(url, file) {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch(url, { method: 'POST', body: fd });
    if (!r.ok) throw new Error('Upload failed');
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!cv) return setMsg('Please attach your CV.');
    setLoading(true); setMsg('');
    try {
      // 1) get signed URLs
      const init = await initApplication(jobCode, cv, cover);
      // 2) upload files
      await uploadToSignedUrl(init.cv.url, cv);
      if (cover && init.cover?.url) await uploadToSignedUrl(init.cover.url, cover);
      // 3) save application row
      const save = await fetch('/api/save-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: init.applicationId,
          jobCode,
          fullName,
          email,
          phone,
          keepOnFile: keep,
          cvPath: init.cv.path,
          coverPath: init.cover?.path || null
        })
      }).then(r => r.json());
      if (!save?.ok) throw new Error('Save failed');
      setMsg('✅ Application submitted. Thank you!');
      // optional: reset form
      setFullName(''); setEmail(''); setPhone(''); setKeep(false);
      setCv(null); setCover(null);
    } catch (err) {
      setMsg(err.message || 'Something went wrong');
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
      <input className="border p-2 w-full" placeholder="Job code"
             value={jobCode} onChange={e=>setJobCode(e.target.value)} required />

      <div>
        <label className="block mb-1">CV (PDF/DOC)</label>
        <input type="file" accept=".pdf,.doc,.docx"
               onChange={e=>setCv(e.target.files?.[0] || null)} required />
      </div>
      <div>
        <label className="block mb-1">Cover letter (optional)</label>
        <input type="file" accept=".pdf,.doc,.docx"
               onChange={e=>setCover(e.target.files?.[0] || null)} />
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

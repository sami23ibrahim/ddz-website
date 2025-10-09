// src/utils/upload.js
export async function initApplication(jobCode, cvFile, coverFile) {
    const res = await fetch('/api/init-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobCode,
        cvFilename: cvFile?.name,
        coverFilename: coverFile?.name
      }),
    });
    if (!res.ok) throw new Error('Init request failed');
    return await res.json();
  }
  
  export async function uploadToSignedUrl(signedUrl, file) {
    const form = new FormData();
    form.append('file', file);
    const r = await fetch(signedUrl, { method: 'POST', body: form });
    if (!r.ok) throw new Error('Upload failed');
  }
  
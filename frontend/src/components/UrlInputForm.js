import React, { useState } from 'react';
import UrlStatusTable from './UrlStatusTable';

const UrlInputForm = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urls = input
      .split(/[\n,]+/)
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // Validate each URL
    const invalidUrls = urls.filter(url => {
      try {
        new URL(url);
        return false;
      } catch (e) {
        return true;
      }
    });
    if (invalidUrls.length > 0) {
      setStatus(`Invalid URL(s): ${invalidUrls.join(', ')}`);
      return;
    }

    if (urls.length === 0) {
      setStatus('Please enter at least one URL.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/check-urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data); // Expecting array of {url, status, responseTime, checkedAt}
        setStatus('URLs checked!');
        setInput('');
      } else {
        setStatus('Failed to submit URLs.');
        setResults([]);
      }
    } catch (err) {
      setStatus('Error connecting to backend.');
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <label htmlFor="urls" style={{ fontWeight: 500, color: '#374151', marginBottom: 4 }}>
          Enter URLs <span style={{ color: '#7b8794', fontWeight: 400 }}>(comma-separated or one per line)</span>:
        </label>
        <textarea
          id="urls"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={5}
          style={{
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            padding: '10px 12px',
            fontSize: 16,
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: 80,
            background: '#f8fafc',
            outline: 'none',
            marginBottom: 4,
          }}
          placeholder="https://example.com, https://another.com"
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 0',
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            marginTop: 4,
            boxShadow: '0 2px 8px 0 rgba(80, 120, 200, 0.08)',
            transition: 'background 0.2s',
          }}
        >
          Check URLs
        </button>
        {status && (
          <div style={{
            marginTop: 4,
            color: status.startsWith('Invalid') || status.startsWith('Failed') || status.startsWith('Error') ? '#ef4444' : '#059669',
            fontWeight: 500,
            minHeight: 24,
          }}>{status}</div>
        )}
      </form>
      <UrlStatusTable results={results} />
    </div>
  );
};

export default UrlInputForm;

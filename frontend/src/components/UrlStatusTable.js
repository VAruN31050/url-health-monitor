import React from 'react';

const UrlStatusTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <table style={{ width: '100%', marginTop: 24, borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: 8 }}>URL</th>
          <th style={{ border: '1px solid #ddd', padding: 8 }}>Status</th>
          <th style={{ border: '1px solid #ddd', padding: 8 }}>Response Time (ms)</th>
          <th style={{ border: '1px solid #ddd', padding: 8 }}>Checked At</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item, idx) => (
          <tr key={idx}>
            <td style={{ border: '1px solid #ddd', padding: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: item.status === 'UP' ? 'green' : 'red',
                marginRight: 8
              }}></span>
              {item.url}
            </td>
            <td style={{ border: '1px solid #ddd', padding: 8, color: item.status === 'UP' ? 'green' : 'red' }}>
              {item.status}
            </td>
            <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.responseTime}</td>
            <td style={{ border: '1px solid #ddd', padding: 8 }}>
              {new Date(item.checkedAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UrlStatusTable;

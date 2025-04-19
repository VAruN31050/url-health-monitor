import React from 'react';
import UrlInputForm from './components/UrlInputForm';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px 0 rgba(80, 120, 200, 0.10)',
        padding: '40px 32px',
        minWidth: 380,
        maxWidth: 540,
        width: '90%',
        margin: '32px 0',
      }}>
        <h1 style={{
          color: '#2d3a4a',
          fontWeight: 700,
          letterSpacing: 1,
          fontSize: 32,
          textAlign: 'center',
          marginBottom: 28,
        }}>
          <span role="img" aria-label="monitor">🔎</span> URL Health Monitor
        </h1>
        <UrlInputForm />
      </div>
      <footer style={{ color: '#7b8794', fontSize: 14, marginTop: 12 }}>
        &copy; {new Date().getFullYear()} URL Health Monitor
      </footer>
    </div>
  );
}

export default App;

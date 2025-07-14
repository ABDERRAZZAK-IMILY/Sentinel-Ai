import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeEmail = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error connecting to the server');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Detect Email Body</h2>

      <textarea
        rows={6}
        style={{
          width: '100%',
          fontSize: 16,
          padding: 10,
          borderRadius: 5,
          border: '1px solid #ccc',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
        placeholder="Copy email body here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={analyzeEmail}
        disabled={loading || !message.trim()}
        style={{
          marginTop: 15,
          padding: '12px 25px',
          fontSize: 16,
          borderRadius: 5,
          border: 'none',
          backgroundColor: loading || !message.trim() ? '#ccc' : '#007BFF',
          color: '#fff',
          cursor: loading || !message.trim() ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
          display: 'block',
          width: '100%',
        }}
      >
        {loading ? 'Loading...' : 'Run Analysis'}
      </button>

      {result && (
        <div
          style={{
            marginTop: 25,
            padding: 15,
            backgroundColor: '#e7f5ff',
            borderRadius: 5,
            fontSize: 18,
            fontWeight: 'bold',
            color: result === 'Safe Email' ? 'green' : 'red',
            textAlign: 'center',
          }}
        >
          Result: {result}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: 25,
            padding: 15,
            backgroundColor: '#ffe6e6',
            borderRadius: 5,
            fontSize: 16,
            color: '#d8000c',
            textAlign: 'center',
          }}
        >
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default App;

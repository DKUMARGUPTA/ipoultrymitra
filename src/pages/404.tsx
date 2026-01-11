import Link from 'next/link';
import { useState, useEffect } from 'react';

const Custom404 = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setIsDark(prefersDark);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? '#1a1a1a'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: isDark ? '#fff' : '#fff',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '32px',
            marginBottom: '20px',
            fontWeight: '600',
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: '18px',
            marginBottom: '30px',
            opacity: 0.9,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link href="/">
            <button
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                backgroundColor: '#fff',
                color: '#667eea',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Back to Home
            </button>
          </Link>
          <Link href="/dashboard">
            <button
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;

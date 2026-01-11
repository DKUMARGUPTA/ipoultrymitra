import Link from 'next/link';

const Custom500 = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: '#fff',
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
          500
        </h1>
        <h2
          style={{
            fontSize: '32px',
            marginBottom: '20px',
            fontWeight: '600',
          }}
        >
          Internal Server Error
        </h2>
        <p
          style={{
            fontSize: '18px',
            marginBottom: '30px',
            opacity: 0.9,
          }}
        >
          Something went wrong on our end. We're working to fix it.
        </p>
        <Link href="/">
          <button
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              backgroundColor: '#fff',
              color: '#f5576c',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Custom500;

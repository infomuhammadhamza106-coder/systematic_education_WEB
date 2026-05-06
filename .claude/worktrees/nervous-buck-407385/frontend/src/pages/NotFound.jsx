import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: '60px 24px',
    }}>
      <div>
        <div style={{
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '2.5px',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '20px',
        }}>
          404 — Page Not Found
        </div>
        <h1 style={{
          fontFamily: 'Libre Baskerville, serif', fontSize: '2.2rem',
          color: 'var(--navy)', marginBottom: '14px', fontWeight: 700,
        }}>
          This page doesn't exist
        </h1>
        <p style={{ color: 'var(--slate)', marginBottom: '32px', maxWidth: '400px', lineHeight: 1.75 }}>
          Browse our ACCA &amp; CIMA study materials or return to the homepage.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/shop" className="btn btn-outline">Browse Books</Link>
        </div>
      </div>
    </section>
  )
}

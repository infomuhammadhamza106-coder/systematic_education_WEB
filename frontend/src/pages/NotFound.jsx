import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 24px' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>📚</div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', color: '#0D1B3E', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: '#475569', marginBottom: '28px', maxWidth: '400px' }}>The page you're looking for doesn't exist. Browse our ACCA & CIMA study materials below.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">🏠 Go Home</Link>
          <Link to="/shop" className="btn btn-outline">📚 Browse Books</Link>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

const steps = [
  { num: 1, title: 'Visit MyKaplan', desc: 'Go to the official MyKaplan website and log in with your registered email.' },
  { num: 2, title: 'Select Your Course', desc: 'On your dashboard, select the relevant course tile for the paper you purchased.' },
  { num: 3, title: 'Open Digital Materials', desc: 'Navigate to the "Materials" or "Digital Materials" section of your course page.' },
  { num: 4, title: 'Launch BibliU', desc: 'Click "Access your BibliU digital materials". Your Study Text or Exam Kit opens in the BibliU bookshelf.' },
]

export default function Ebooks() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><span className="badge">Digital Access</span><h1>eBook Access Guide</h1><p>Access your study materials anytime, anywhere — on desktop, tablet or mobile.</p></div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '60px' }}>
            <div>
              <span className="badge">What are ACCA eBooks?</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Digital Study Materials</h2>
              <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: '16px' }}>ACCA eBooks are digital versions of official study materials designed for ACCA and CIMA exams. They offer the same content as printed books but with added digital tools.</p>
              <ul style={{ color: '#475569', lineHeight: 2.2, fontSize: '0.92rem' }}>
                {['Highlighting and annotation tools','Full-text search functionality','Note-taking within the book','Access on desktop, tablet and mobile','Same content as the physical book','Instant delivery via email/WhatsApp'].map(f => <li key={f}>✅ {f}</li>)}
              </ul>
            </div>
            <div><img src="/images/cima_ebook.png" alt="ACCA eBook" style={{ borderRadius: '16px', boxShadow: '0 16px 40px rgba(27,63,139,0.18)' }} /></div>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#1B3F8B,#2563A8)', borderRadius: '16px', padding: '32px', color: '#fff', marginBottom: '48px' }}>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', marginBottom: '8px' }}>📨 Digital Delivery Process</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>After verifying your payment receipt, your eBook access code will be sent via <strong>email or WhatsApp within 24 hours</strong>.</p>
          </div>

          <div className="section-header"><span className="badge">Step-by-Step</span><h2 className="section-title">How to Access Your ACCA eBooks</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '24px', marginBottom: '48px' }}>
            {steps.map(s => (
              <div key={s.num} style={{ background: '#fff', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 2px 8px rgba(27,63,139,0.08)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#1B3F8B,#2563A8)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem' }}>{s.num}</div>
                <h4 style={{ fontFamily: 'Outfit', color: '#0D1B3E', marginBottom: '8px' }}>{s.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', background: '#F5F8FF', borderRadius: '16px', padding: '40px' }}>
            <h3 style={{ fontFamily: 'Outfit', color: '#0D1B3E', marginBottom: '8px' }}>Ready to get your eBook?</h3>
            <p style={{ color: '#475569', marginBottom: '24px' }}>Contact us to order your ACCA or CIMA eBook access today.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-green">💬 Order via WhatsApp</a>
              <Link to="/shop" className="btn btn-primary">📚 Browse ACCA Books</Link>
              <Link to="/cima" className="btn btn-outline">📱 Browse CIMA eBooks</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

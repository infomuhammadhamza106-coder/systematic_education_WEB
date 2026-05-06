import { Link } from 'react-router-dom'
import './Ebooks.css'

const steps = [
  { num: '01', title: 'Visit MyKaplan',         desc: 'Go to the official MyKaplan website and log in with your registered email.' },
  { num: '02', title: 'Select Your Course',      desc: 'On your dashboard, select the relevant course tile for the paper you purchased.' },
  { num: '03', title: 'Open Digital Materials',  desc: 'Navigate to the "Materials" or "Digital Materials" section of your course page.' },
  { num: '04', title: 'Launch BibliU',           desc: 'Click "Access your BibliU digital materials". Your Study Text or Exam Kit opens in the BibliU bookshelf.' },
]

const features = [
  'Highlighting and annotation tools',
  'Full-text search functionality',
  'Note-taking within the book',
  'Access on desktop, tablet and mobile',
  'Same content as the physical book',
  'Instant delivery via email or WhatsApp',
]

export default function Ebooks() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">Digital Access</span>
          <h1>eBook Access Guide</h1>
          <p>Access your study materials anytime, anywhere — on desktop, tablet or mobile.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Intro */}
          <div className="ebook-intro-grid">
            <div>
              <span className="section-label" style={{ textAlign: 'left', marginBottom: '12px' }}>What are ACCA eBooks?</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>Digital Study Materials</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.85, marginBottom: '20px', fontSize: '0.95rem' }}>
                ACCA eBooks are digital versions of official study materials. They offer the same content as printed books with added digital tools.
              </p>
              <ul className="ebook-features-list">
                {features.map(f => (
                  <li key={f}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ebook-img-wrap">
              <img src="/images/cima_ebook.png" alt="ACCA eBook" />
            </div>
          </div>

          {/* Delivery notice */}
          <div className="ebook-delivery-notice">
            <h3>Digital Delivery Process</h3>
            <p>
              After verifying your payment receipt, your eBook access code will be sent via
              <strong> email or WhatsApp within 24 hours</strong>.
            </p>
          </div>

          {/* Steps */}
          <div className="section-header" style={{ marginTop: '56px' }}>
            <span className="section-label">Step-by-Step</span>
            <h2 className="section-title">How to Access Your ACCA eBooks</h2>
          </div>

          <div className="ebook-steps-grid">
            {steps.map(s => (
              <div key={s.num} className="ebook-step-card">
                <div className="ebook-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ebook-cta">
            <h3>Ready to get your eBook?</h3>
            <p>Contact us to order your ACCA or CIMA eBook access today.</p>
            <div className="ebook-cta-actions">
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-white">
                Order via WhatsApp
              </a>
              <Link to="/shop" className="btn btn-ghost-white">Browse ACCA Books</Link>
              <Link to="/cima" className="btn btn-ghost-white">Browse CIMA eBooks</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

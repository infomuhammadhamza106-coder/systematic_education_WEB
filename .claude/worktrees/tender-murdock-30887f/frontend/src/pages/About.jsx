import { Link } from 'react-router-dom'
import './About.css'

const whyItems = [
  {
    title: '100% Genuine Books',
    desc: 'All materials are ACCA-approved publications with the official Approved Content seal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Nationwide Delivery',
    desc: 'Fast and reliable delivery across Pakistan via TCS and Leopard Courier.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: 'Expert Authors',
    desc: 'Written by subject specialists with 20+ years of ACCA teaching experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    title: 'Student Support',
    desc: 'Dedicated support via WhatsApp — we usually reply within an hour.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    title: 'Latest Editions',
    desc: 'Always stocked with the newest 2025–26 syllabus editions from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
  },
]

export default function About() {
  return (
    <>
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="page-hero-label">Since 1998</span>
          <h1>About Systematics Education</h1>
          <p>27 years of empowering Pakistani ACCA students with world-class study materials.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Story */}
          <div className="about-story-grid">
            <div className="about-story-img">
              <img src="/images/study-text-acca-sbl61e42e3e-0f82-41df-b99b-a88e39e1f2bc.webp" alt="ACCA Study Materials" />
            </div>
            <div>
              <span className="section-label" style={{ textAlign: 'left', display: 'block', marginBottom: '12px' }}>Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Pakistan's Trusted ACCA Partner</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.85, marginBottom: '14px', fontSize: '0.95rem' }}>
                Systematics Education has been Pakistan's trusted source for ACCA and CIMA study materials since <strong>1998</strong> — over 27 years of serving students across the country.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.85, marginBottom: '14px', fontSize: '0.95rem' }}>
                As an <strong>authorised Kaplan distributor</strong>, we supply 100% genuine, ACCA-approved Study Texts and Exam Kits — delivered to your door from Karachi to Gilgit.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.85, marginBottom: '28px', fontSize: '0.95rem' }}>
                With over <strong>15,000 students</strong> supported, we are committed to making world-class study resources accessible to every student in Pakistan.
              </p>
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats">
            <div className="stats-grid">
              <div className="stat-item"><div className="stat-num">25+</div><div className="stat-label">Years serving ACCA students since 1998</div></div>
              <div className="stat-item"><div className="stat-num">15,000+</div><div className="stat-label">Students supported across Pakistan</div></div>
              <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Genuine ACCA Approved publications</div></div>
            </div>
          </div>

          {/* Why */}
          <div className="section-header" style={{ marginTop: '0' }}>
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Why Choose Systematics Education</h2>
          </div>
          <div className="why-grid">
            {whyItems.map(card => (
              <div key={card.title} className="why-card">
                <div className="why-icon-wrap">{card.icon}</div>
                <h4 className="why-title">{card.title}</h4>
                <p className="why-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

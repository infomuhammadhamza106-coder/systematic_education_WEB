import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge">Since 1998</span>
          <h1>About Systematics Education</h1>
          <p>25 years of empowering Pakistani ACCA students with world-class study materials.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
            <div>
              <img src="/images/acca_strategic.png" alt="Systematics Education" style={{ borderRadius: '20px', boxShadow: '0 16px 40px rgba(27,63,139,0.18)' }} />
            </div>
            <div>
              <span className="badge">Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Pakistan's Trusted ACCA Partner</h2>
              <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: '16px' }}>Systematics Education (SMC-PVT) LTD has been Pakistan's trusted partner for ACCA students for over <strong>25 years</strong>. Founded in 1998, we set out with one mission: to make world-class professional study resources accessible to every student in Pakistan.</p>
              <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: '16px' }}>As an <strong>authorised ACCA study material distributor</strong> — we deliver 100% genuine, ACCA-approved publications nationwide, from Karachi to Gilgit.</p>
              <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: '28px' }}>Our mission is simple: help every Pakistani student qualify with confidence by giving them the same world-class resources used by top achievers globally. With over <strong>15,000 students</strong> supported, we are proud to be the most trusted name in the industry.</p>
              <Link to="/contact" className="btn btn-primary">📞 Get in Touch</Link>
            </div>
          </div>
          <div style={{ background: '#F5F8FF', borderRadius: '16px', padding: '48px 0', marginBottom: '60px' }}>
            <div className="stats-grid">
              <div className="stat-item"><div className="stat-num">25+</div><div className="stat-label">Years serving ACCA students since 1998</div></div>
              <div className="stat-item"><div className="stat-num">15,000+</div><div className="stat-label">Students supported across Pakistan</div></div>
              <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Genuine ACCA Approved publications</div></div>
            </div>
          </div>
          <div className="section-header">
            <span className="badge">Why Us</span>
            <h2 className="section-title">Why Choose Systematics Education</h2>
          </div>
          <div className="why-grid">
            {[['📚','100% Genuine Books','All materials are ACCA-approved publications with the official Approved Content seal.'],
              ['🚚','Nationwide Delivery','Fast and reliable delivery across Pakistan. Order from anywhere.'],
              ['✍️','Expert Authors','Written by subject specialists with 20+ years of ACCA teaching experience.'],
              ['💬','Student Support','Dedicated support via WhatsApp — we usually reply within an hour.'],
              ['🔄','Latest Editions','Always stocked with the newest 2025–26 syllabus editions.'],
            ].map(([icon,title,desc]) => (
              <div key={title} className="why-card">
                <div className="why-icon">{icon}</div>
                <h4 className="why-title">{title}</h4>
                <p className="why-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

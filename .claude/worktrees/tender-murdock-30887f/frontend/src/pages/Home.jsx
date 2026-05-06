import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getAccaProducts } from '../services/api'
import './Home.css'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    getAccaProducts().then(r => setFeatured(r.data.data.slice(0, 6))).catch(() => {})
  }, [])

  const filtered = activeTab === 'all' ? featured : featured.filter(p => p.category === activeTab)

  const faqs = [
    { q: 'How long does delivery take?', a: 'Orders within Lahore are delivered in 1–2 working days. Nationwide takes 3–5 working days via TCS or Leopard Courier.' },
    { q: 'What payment methods do you accept?', a: 'Cash on Delivery for Lahore only. All other cities require bank transfer (UBL) before dispatch.' },
    { q: 'Are these books 100% genuine and ACCA-approved?', a: 'Yes. We are an authorised ACCA study material distributor. Every book carries the official ACCA Approved Content seal.' },
    { q: 'Can I order in bulk for a college or study group?', a: 'Absolutely. Contact us on WhatsApp 0321 8488802 or email madiha@systematics.com.pk for a custom institutional quote.' },
    { q: 'What if I receive a damaged book?', a: 'Inspect your parcel on delivery. If damaged, contact us within 48 hours and we will arrange a free replacement at no cost.' },
  ]

  const whyCards = [
    {
      title: '100% Genuine Books',
      desc:  'All materials carry the official ACCA Approved Content seal — sourced directly from Kaplan Publishing.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      title: 'Nationwide Delivery',
      desc:  'Fast and reliable delivery across all major cities via TCS and Leopard Courier.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      title: 'Expert Authors',
      desc:  'Written by subject specialists with 20+ years of ACCA teaching experience and examiner insight.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
    },
    {
      title: 'Dedicated Support',
      desc:  'Our team replies within one hour via WhatsApp — for orders, enquiries, or study guidance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      title: 'Latest 2025–26 Editions',
      desc:  'Always stocked with the newest syllabus editions — ready from day one of each exam session.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
      ),
    },
  ]

  const tabs = [
    { key: 'all',          label: 'All Books' },
    { key: 'knowledge',    label: 'Applied Knowledge' },
    { key: 'skills',       label: 'Applied Skills' },
    { key: 'professional', label: 'Strategic Professional' },
  ]

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-grid-overlay" />
        </div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-dot" />
                Official ACCA Approved Distributor — Pakistan
              </div>
              <h1 className="hero-title">
                ACCA &amp; CIMA<br />
                <span className="hero-title-accent">Study Materials</span><br />
                2025–26 Edition
              </h1>
              <p className="hero-desc">
                Pakistan's most trusted source for ACCA and CIMA study materials.
                Genuine Kaplan publications, delivered nationwide — trusted by over
                15,000 students for 25+ years.
              </p>
              <div className="hero-actions">
                <Link to="/shop" className="btn btn-green hero-btn-primary">
                  Browse ACCA Books
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/price-list" className="btn btn-ghost">
                  View Price List
                </Link>
              </div>
              <div className="hero-trust">
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ACCA Approved
                </div>
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Free WhatsApp Support
                </div>
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Nationwide Delivery
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-stack">
                <div className="hero-card hero-card-back" />
                <div className="hero-card hero-card-mid" />
                <div className="hero-card hero-card-front">
                  <img src="/images/acca_skills.png" alt="ACCA Study Materials 2025-26" />
                </div>
                <div className="hero-floating-badge badge-students">
                  <div className="fb-num">15,000+</div>
                  <div className="fb-label">Students</div>
                </div>
                <div className="hero-floating-badge badge-approved">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ACCA Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num">25+</div>
              <div className="stat-label">Years serving ACCA students since 1998</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">15,000+</div>
              <div className="stat-label">Students supported across Pakistan</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">Genuine ACCA Approved publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOOKS ───────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">2025–26 Editions Available</div>
            <h2 className="section-title">Featured Study Materials</h2>
            <p className="section-sub">Browse our most popular ACCA study texts and exam kits — all 100% ACCA-approved.</p>
          </div>

          <div className="home-tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`home-tab ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/shop" className="btn btn-primary">
              View All ACCA Books
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ───────────────────────────── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Our Promise</div>
            <h2 className="section-title">Why Choose Systematics Education</h2>
            <p className="section-sub">We have been Pakistan's trusted ACCA study material partner for over 25 years.</p>
          </div>
          <div className="why-grid">
            {whyCards.map(card => (
              <div key={card.title} className="why-card">
                <div className="why-icon">{card.icon}</div>
                <h4 className="why-title">{card.title}</h4>
                <p className="why-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section className="home-cta-banner">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Ready to start your ACCA journey?</h2>
              <p>Order your 2025–26 study materials today. Delivered to your door across Pakistan.</p>
            </div>
            <div className="cta-actions">
              <Link to="/shop" className="btn btn-green">Browse Books</Link>
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-ghost">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Quick Answers</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>
    </>
  )
}

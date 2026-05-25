import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { getCimaProducts } from '../services/api'
import './Cima.css'

const TABS = [
  { key: 'all',         label: 'All' },
  { key: 'fundamentals', label: 'Certificate' },
  { key: 'operational',  label: 'Professional Operational' },
  { key: 'management',   label: 'Professional Management' },
  { key: 'strategic',    label: 'Professional Strategic' },
]

const SECTIONS = [
  { key: 'fundamentals', label: 'Certificate',               color: '#15803d' },
  { key: 'operational',  label: 'Professional Operational',  color: '#1d4ed8' },
  { key: 'management',   label: 'Professional Management',   color: '#7c3aed' },
  { key: 'strategic',    label: 'Professional Strategic',    color: '#0f2044' },
]

export default function Cima() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    getCimaProducts().then(r => setProducts(r.data?.data ?? [])).catch(() => setProducts([])).finally(() => setLoading(false))
  }, [])

  const grouped = key => products.filter(p => p.category === key)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">eBook Only</span>
          <h1>CIMA Study Materials</h1>
          <p>Official CIMA study materials available as eBooks in Pakistan. Sold as complete sets.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Info banner */}
          <div className="cima-info-banner">
            <div className="cima-info-text">
              <h3>eBook Only — Complete Sets</h3>
              <p>
                CIMA books are available as eBooks only.
                Study Texts: <strong>Rs. 6,000</strong> each &nbsp;|&nbsp; Exam Kits: <strong>Rs. 4,000</strong> each.
                Contact us for complete set bundle pricing.
              </p>
            </div>
            <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-white">
              Get Bundle Price
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Tabs */}
          <div className="cima-tabs">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`cima-tab${activeTab === t.key ? ' active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {loading && (
            <p style={{ textAlign: 'center', color: 'var(--slate)', padding: '48px 0', fontSize: '0.875rem' }}>
              Loading CIMA products...
            </p>
          )}

          {!loading && activeTab === 'all' && (
            <>
              {SECTIONS.map(s => {
                const items = grouped(s.key)
                if (!items.length) return null
                return (
                  <div key={s.key} className="cima-section">
                    <div className="cima-section-header">
                      <div className="cima-section-bar" style={{ background: s.color }} />
                      <h2 className="cima-section-title">{s.label}</h2>
                      <span className="cima-section-count">{items.length} papers</span>
                    </div>
                    <div className="products-grid">
                      {items.map(p => <ProductCard key={p.id} product={p} type="cima" />)}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {!loading && activeTab !== 'all' && (
            <div className="products-grid">
              {products.filter(p => p.category === activeTab).map(p => (
                <ProductCard key={p.id} product={p} type="cima" />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}

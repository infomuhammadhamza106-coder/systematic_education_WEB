import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { getCimaProducts } from '../services/api'
import './Cima.css'

export default function Cima() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    getCimaProducts().then(r => setProducts(r.data.data)).catch(() => []).finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'all' ? products : products.filter(p => p.category === activeTab)

  const tabs = [
    ['all', 'All Papers'],
    ['fundamentals', 'Certificate'],
    ['management', 'Management'],
    ['strategic', 'Strategic'],
  ]

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
            {tabs.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`cima-tab${activeTab === key ? ' active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {loading
            ? <p style={{ textAlign: 'center', color: 'var(--slate)', padding: '48px 0', fontSize: '0.875rem' }}>Loading CIMA products...</p>
            : (
              <div className="products-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} type="cima" />)}
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

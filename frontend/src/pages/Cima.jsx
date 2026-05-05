import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { getCimaProducts } from '../services/api'

export default function Cima() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    getCimaProducts().then(r => setProducts(r.data.data)).catch(() => []).finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'all' ? products : products.filter(p => p.category === activeTab)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="badge">eBook Only</span>
          <h1>CIMA Study Materials</h1>
          <p>Official CIMA study materials available as eBooks in Pakistan. Sold as complete sets.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,#1a5c4e,#1B3F8B)', borderRadius: '16px', padding: '28px 32px', color: '#fff', marginBottom: '40px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', marginBottom: '8px' }}>📱 eBook Only — Complete Sets</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>CIMA books are available as eBooks only. Study Texts: <strong>Rs. 6,000</strong> each | Exam Kits: <strong>Rs. 4,000</strong> each. Contact us for complete set bundle pricing.</p>
            </div>
            <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-green">💬 Get Bundle Price</a>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[['all','All Papers'],['fundamentals','Certificate'],['management','Management'],['strategic','Strategic']].map(([key,label]) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{ padding: '9px 22px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 600, border: '2px solid', borderColor: activeTab === key ? '#1B3F8B' : '#E2E8F0', background: activeTab === key ? '#1B3F8B' : '#fff', color: activeTab === key ? '#fff' : '#475569', cursor: 'pointer', transition: 'all 0.3s' }}>
                {label}
              </button>
            ))}
          </div>
          {loading ? <p style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>Loading CIMA products...</p> : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} type="cima" />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

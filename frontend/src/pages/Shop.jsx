import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getAccaProducts } from '../services/api'
import './Shop.css'

const CATEGORIES = [
  { key: 'all',          label: 'All Books'            },
  { key: 'knowledge',    label: 'Applied Knowledge'    },
  { key: 'skills',       label: 'Applied Skills'       },
  { key: 'professional', label: 'Strategic Professional' },
]

const SECTION_META = {
  knowledge:    { color: 'var(--green)',  label: 'Applied Knowledge',      desc: 'BT, MA & FA — foundation level papers' },
  skills:       { color: 'var(--blue)',   label: 'Applied Skills',         desc: 'LW, PM, TX, FR, AA & FM' },
  professional: { color: 'var(--navy)',   label: 'Strategic Professional', desc: 'SBL, SBR, AFM, APM, ATX & AAA' },
}

export default function Shop() {
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [searchParams]            = useSearchParams()

  useEffect(() => {
    const q        = searchParams.get('q')        || ''
    const category = searchParams.get('category') || ''
    if (category) setActiveTab(category)
    setLoading(true)
    getAccaProducts({ q, category: category || undefined })
      .then(r  => setProducts(r.data.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [searchParams])

  const filtered     = activeTab === 'all' ? products : products.filter(p => p.category === activeTab)
  const knowledge    = filtered.filter(p => p.category === 'knowledge')
  const skills       = filtered.filter(p => p.category === 'skills')
  const professional = filtered.filter(p => p.category === 'professional')

  const sectionGroups = [
    { key: 'knowledge',    items: knowledge    },
    { key: 'skills',       items: skills       },
    { key: 'professional', items: professional },
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">2025–26 Editions</span>
          <h1>ACCA Study Materials</h1>
          <p>Genuine Kaplan ACCA Study Texts &amp; Exam Kits for 2025–26. 100% ACCA-approved — physical books and eBook access.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Tabs */}
          <div className="shop-tabs">
            {CATEGORIES.map(t => (
              <button
                key={t.key}
                className={`shop-tab ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="shop-loading">
              <div className="shop-spinner" />
              <p>Loading products...</p>
            </div>
          )}

          {/* Product sections */}
          {!loading && (
            <>
              {sectionGroups.map(({ key, items }) => {
                if (activeTab !== 'all' && activeTab !== key) return null
                if (!items.length) return null
                const meta = SECTION_META[key]
                return (
                  <div key={key} className="shop-section">
                    <div className="shop-section-header">
                      <div className="shop-section-bar" style={{ background: meta.color }} />
                      <h2 className="shop-section-title">{meta.label}</h2>
                      <span className="shop-section-count">{items.length} books</span>
                    </div>
                    <div className="products-grid">
                      {items.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </section>
    </>
  )
}

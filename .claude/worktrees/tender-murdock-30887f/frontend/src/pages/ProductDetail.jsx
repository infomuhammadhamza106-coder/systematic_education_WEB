import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import './ProductDetail.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function ProductDetail() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading]  = useState(true)
  const [added, setAdded]      = useState({})
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    axios.get(`${API}/products/cima`)
      .then(r => {
        const found = r.data.data?.find(p => p.id === productId)
        setProduct(found || null)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [productId])

  const handleAdd = (book) => {
    addToCart({ ...product, name: `${product.code} – ${book.type}`, price: book.price }, book.typeCode)
    setAdded(prev => ({ ...prev, [book.typeCode]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [book.typeCode]: false })), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: '#64748B' }}>
      <div className="pd-spinner" />
      <p>Loading product...</p>
    </div>
  )

  if (!product) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h2>Product not found</h2>
      <Link to="/cima" className="btn btn-primary">Back to CIMA</Link>
    </div>
  )

  const books = product.books || [
    { type: 'Study Text',       typeCode: 'text', price: product.textPrice, img: product.img, desc: product.desc },
    { type: 'Exam Practice Kit', typeCode: 'kit', price: product.kitPrice,  img: product.img, desc: product.desc },
  ]

  const waMsg = `Hi! I want to enquire about CIMA ${product.code} – ${product.title}`

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div className="pd-lightbox" onClick={() => setLightbox(null)}>
          <button className="pd-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Book cover" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container">
          <Link to="/cima"><ArrowLeft /> CIMA Books</Link>
          <span>/</span>
          <span>{product.code} – {product.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pd-hero">
        <div className="container">
          <div className="pd-hero-inner">
            <div className="pd-hero-img-wrap">
              <img
                src={books[0]?.img || product.img}
                alt={product.title}
                className="pd-hero-img"
                onClick={() => setLightbox(books[0]?.img || product.img)}
              />
              <div className="pd-hero-img-hint">Click to enlarge</div>
            </div>
            <div className="pd-hero-info">
              <div className="pd-eyebrow">{product.level}</div>
              <h1 className="pd-title">CIMA {product.code}<br />{product.title}</h1>
              <p className="pd-desc">{product.desc}</p>
              <div className="pd-badges">
                <span className="pd-badge"><CheckIcon /> eBook Format</span>
                <span className="pd-badge"><CheckIcon /> CIMA Official</span>
                <span className="pd-badge"><CheckIcon /> Kaplan Publishing</span>
              </div>
              <a
                href={`https://wa.me/923218488802?text=${encodeURIComponent(waMsg)}`}
                target="_blank" rel="noreferrer"
                className="btn btn-green"
              >
                <WAIcon /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="section">
        <div className="container">
          <div className="pd-section-header">
            <h2>Available Formats</h2>
            <p>Choose the format that suits your study style</p>
          </div>

          <div className="pd-books-grid">
            {books.map(book => (
              <div key={book.typeCode} className="pd-book-card">
                <div className="pd-book-img-wrap">
                  <img
                    src={book.img}
                    alt={`${product.title} – ${book.type}`}
                    className="pd-book-img"
                    onClick={() => setLightbox(book.img)}
                  />
                  <div className="pd-book-zoom-hint">Click to zoom</div>
                </div>
                <div className="pd-book-body">
                  <div className="pd-book-type">{book.type}</div>
                  <div className="pd-book-code">{product.code} — {book.type}</div>
                  <p className="pd-book-desc">{book.desc}</p>
                  <div className="pd-book-price">
                    <span className="pd-price-label">Price</span>
                    <span className="pd-price-val">Rs. {book.price.toLocaleString()}</span>
                  </div>
                  <button
                    className={`pd-add-btn ${added[book.typeCode] ? 'added' : ''}`}
                    onClick={() => handleAdd(book)}
                  >
                    {added[book.typeCode]
                      ? <><CheckIcon /> Added to Cart</>
                      : <><CartIcon /> Add to Cart</>
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import './AccaProductDetail.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function AccaProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading]  = useState(true)
  const [added, setAdded]      = useState({})
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    axios.get(`${API}/products/acca/${id}`)
      .then(r => setProduct(r.data.data || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = (typeCode, price) => {
    addToCart({ ...product, price }, typeCode)
    setAdded(prev => ({ ...prev, [typeCode]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [typeCode]: false })), 2000)
  }

  if (loading) return (
    <div className="apd-center">
      <div className="apd-spinner" />
      <p>Loading product…</p>
    </div>
  )

  if (!product) return (
    <div className="apd-center">
      <h2>Product not found</h2>
      <a href="/shop" className="apd-back-btn">Back to Shop</a>
    </div>
  )

  const fallbackImg = product.category === 'knowledge'
    ? '/images/acca_knowledge.png'
    : product.category === 'skills'
    ? '/images/acca_skills.png'
    : '/images/acca_strategic.png'

  const books = [
    {
      typeCode: 'text',
      label: 'Study Text',
      img: product.img || fallbackImg,
      desc: product.textDesc || product.desc,
      price: product.textPrice,
    },
    {
      typeCode: 'kit',
      label: 'Exam Kit',
      img: product.kitImg || fallbackImg,
      desc: product.kitDesc || product.desc,
      price: product.kitPrice,
    },
  ]

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div className="apd-lightbox" onClick={() => setLightbox(null)}>
          <button className="apd-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Book cover" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Hero */}
      <section className="apd-hero">
        <div className="apd-hero-deco deco-1" />
        <div className="apd-hero-deco deco-2" />
        <div className="container apd-hero-inner">
          <div className="apd-hero-badge">
            <span className="apd-acca-badge">ACCA</span>
            <span className="apd-approved-text">Approved Content</span>
          </div>
          <h1 className="apd-hero-title">
            ACCA {product.title}<br />
            <span className="apd-hero-code">({product.code})</span>
          </h1>
          <p className="apd-hero-desc">{product.desc}</p>
          <div className="apd-hero-meta">
            <span><CheckIcon /> Printed &amp; eBook</span>
            <span><CheckIcon /> Kaplan Publishing</span>
            <span><CheckIcon /> Valid until {product.validUntil}</span>
          </div>
        </div>
      </section>

      {/* Book Rows */}
      <section className="apd-books-section">
        <div className="container">
          {books.map(book => (
            <div key={book.typeCode} className="apd-book-row">
              <div className="apd-book-img-wrap" onClick={() => setLightbox(book.img)}>
                <img src={book.img} alt={`${product.title} ${book.label}`} className="apd-book-img" />
              </div>
              <div className="apd-book-body">
                <div className="apd-book-meta">
                  <span className="apd-code-badge">{product.code}</span>
                  <span className="apd-type-badge">
                    {book.typeCode === 'text'
                      ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    }
                    {book.label}
                  </span>
                </div>
                <h2 className="apd-book-title">{product.title}</h2>
                <p className="apd-book-session">For exams valid until <strong>{product.validUntil}</strong></p>
                <p className="apd-book-desc">{book.desc}</p>
                <div className="apd-book-footer">
                  <div className="apd-price">Rs. {book.price.toLocaleString()}</div>
                  <button
                    className={`apd-add-btn ${added[book.typeCode] ? 'added' : ''}`}
                    onClick={() => handleAdd(book.typeCode, book.price)}
                  >
                    {added[book.typeCode]
                      ? <><CheckIcon /> Added to Cart</>
                      : <><CartIcon /> Add to Cart</>
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

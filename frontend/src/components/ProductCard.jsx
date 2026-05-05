import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product, type = 'acca' }) {
  const { addToCart } = useCart()
  const [toast, setToast] = useState(false)

  const handleAdd = (bookType) => {
    addToCart(product, bookType)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const img = type === 'cima'
    ? '/images/cima_ebook.png'
    : product.category === 'knowledge'
    ? '/images/acca_knowledge.png'
    : product.category === 'skills'
    ? '/images/acca_skills.png'
    : '/images/acca_strategic.png'

  return (
    <div className="product-card">
      {toast && <div className="card-toast">Added to cart</div>}
      <div className="product-card-img">
        <img src={img} alt={product.title} />
        <span className={`product-badge ${type === 'cima' ? 'ebook' : 'physical'}`}>
          {type === 'cima' ? 'eBook Only' : 'Physical + eBook'}
        </span>
      </div>
      <div className="product-card-body">
        <div className="product-level">{product.level}</div>
        <h3 className="product-title">{product.code} — {product.title}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-avail">{product.availability}</div>
        {product.validUntil && (
          <div className="product-meta">Valid until: <strong>{product.validUntil}</strong></div>
        )}
        <div className="product-footer">
          <div className="product-prices">
            <div className="price-row">
              <span className="price-label">Study Text</span>
              <span className="price-val">Rs. {product.textPrice.toLocaleString()}</span>
              <button className="add-btn" onClick={() => handleAdd('text')}>+ Add</button>
            </div>
            <div className="price-row">
              <span className="price-label">Exam Kit</span>
              <span className="price-val">Rs. {product.kitPrice.toLocaleString()}</span>
              <button className="add-btn add-btn-outline" onClick={() => handleAdd('kit')}>+ Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
